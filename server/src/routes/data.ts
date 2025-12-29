import { Router, Request, Response } from "express";
import {
  MonthData,
  RecurringExpense,
  IIncomeItem,
  IIncomeEntry,
  IExpenseItem,
  IExpenseEntry,
} from "../models";
import { generateId } from "../utils/idGenerator";
import { recalculateMonthTotals } from "../utils/monthCalculations";
import { logger } from "../config/logger";

const router = Router();

// Get all months data for a user
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }
    const userMonths = await MonthData.find({ userId }).sort({
      year: -1,
      month: -1,
    });

    res.json(userMonths);
  } catch (error) {
    logger.error("Error fetching months:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Get a specific month
router.get("/month/:monthId", async (req: Request, res: Response) => {
  try {
    const month = await MonthData.findById(req.params.monthId);

    if (!month) {
      logger.warn(`Month not found: ${req.params.monthId}`);
      res.status(404).json({ error: "Month not found" });
      return;
    }

    res.json(month);
  } catch (error) {
    logger.error("Error fetching month:", error);
    res.status(500).json({ error: "Failed to fetch month data" });
  }
});

// Add new month
router.post("/month", async (req: Request, res: Response) => {
  try {
    const { userId, year, month } = req.body;
    if (!userId || !year || month === undefined) {
      res.status(400).json({ error: "userId, year, and month are required" });
      return;
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Check if month already exists for this user
    const existingMonth = await MonthData.findOne({ userId, year, month });
    if (existingMonth) {
      res.status(400).json({ error: "Month already exists" });
      return;
    }

    // Find the immediately previous month (chronologically) to carry forward surplus
    let carryForwardAmount = 0;

    // Calculate the previous month and year
    let prevMonth = month - 1;
    let prevYear = year;

    if (prevMonth < 0) {
      prevMonth = 11; // December
      prevYear = year - 1;
    }

    // Check if the immediately previous month exists
    const previousMonth = await MonthData.findOne({
      userId,
      year: prevYear,
      month: prevMonth,
    });

    if (previousMonth) {
      carryForwardAmount = previousMonth.carryForward;
    }

    const monthName = `${monthNames[month]} ${year}`;

    // Create income with carry forward only if there's an amount
    const incomeCategories: IIncomeItem[] =
      carryForwardAmount > 0
        ? [
            {
              id: generateId("inc"),
              category: "Carry Forward",
              amount: carryForwardAmount,
              comment: "",
            },
          ]
        : [];

    // Auto-apply recurring expenses
    const userRecurringExpenses = await RecurringExpense.find({ userId });

    const recurringExpenseItems: IExpenseItem[] = userRecurringExpenses.map(
      (template) => {
        const entry: IExpenseEntry = {
          id: generateId("entry"),
          amount: template.amount,
          note: template.note,
          tag: template.tag,
        };

        const expenseItem: IExpenseItem = {
          id: generateId("exp"),
          category: template.category,
          amount: template.amount,
          comment: `${template.amount}(${template.note})`,
          entries: [entry],
        };

        return expenseItem;
      }
    );

    const totalExpense = recurringExpenseItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const newMonth = await MonthData.create({
      userId,
      monthName,
      year,
      month,
      income: incomeCategories,
      expenses: recurringExpenseItems,
      totalIncome: carryForwardAmount,
      totalExpense,
      carryForward: carryForwardAmount - totalExpense,
    });

    res.status(201).json(newMonth);
  } catch (error) {
    logger.error("Error creating month:", error);
    res.status(500).json({ error: "Failed to create month" });
  }
});

// Add income entry (new streamlined approach)
router.post("/income/entry", async (req: Request, res: Response) => {
  try {
    const { monthId, category, amount, note } = req.body;
    if (!monthId || !category || amount === undefined) {
      res
        .status(400)
        .json({ error: "monthId, category, and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    // Initialize income array if undefined
    if (!month.income) {
      month.income = [];
    }

    // Find existing income for this category
    const incomeIndex = month.income.findIndex((i) => i.category === category);

    const newEntry: IIncomeEntry = {
      id: generateId("entry"),
      amount: Number(amount),
      note: note || "",
    };

    if (incomeIndex !== -1) {
      // Category exists - add entry to it
      const income = month.income[incomeIndex];
      if (!income.entries) {
        income.entries = [];
      }

      income.entries.push(newEntry);

      // Recalculate total for this category
      income.amount = income.entries.reduce(
        (sum, entry) => sum + entry.amount,
        0
      );

      // Update the breakdown comment
      income.comment = income.entries
        .map((e) => `${e.amount}(${e.note || "No note"})`)
        .join("+");
    } else {
      // New category - create income with entry
      const newIncome: IIncomeItem = {
        id: generateId("inc"),
        category,
        amount: Number(amount),
        comment: `${amount}(${note || "No note"})`,
        entries: [newEntry],
      };
      month.income.push(newIncome);
    }

    recalculateMonthTotals(month);
    month.markModified("income"); // Mark nested array as modified for Mongoose
    await month.save();
    res.status(201).json(month);
  } catch (error) {
    logger.error("Error adding income entry:", error);
    res.status(500).json({ error: "Failed to add income entry" });
  }
});

// Add income entry (legacy)
router.post("/income", async (req: Request, res: Response) => {
  try {
    const { monthId, category, amount, comment } = req.body;
    if (!monthId || !category || amount === undefined) {
      res
        .status(400)
        .json({ error: "monthId, category, and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    const newIncome: IIncomeItem = {
      id: generateId("inc"),
      category,
      amount: Number(amount),
      comment: comment || "",
    };

    month.income.push(newIncome);
    recalculateMonthTotals(month);
    month.markModified("income");
    await month.save();
    res.status(201).json(month);
  } catch (error) {
    logger.error("Error adding income:", error);
    res.status(500).json({ error: "Failed to add income" });
  }
});

// Update income (legacy format)
router.put("/income/:incomeId", async (req: Request, res: Response) => {
  try {
    const { incomeId } = req.params;
    const { monthId, category, amount, comment } = req.body;

    if (!monthId || !category || amount === undefined) {
      res
        .status(400)
        .json({ error: "monthId, category, and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    const incomeIndex = month.income.findIndex((i) => i.id === incomeId);
    if (incomeIndex === -1) {
      res.status(404).json({ error: "Income not found" });
      return;
    }

    month.income[incomeIndex] = {
      ...month.income[incomeIndex],
      category,
      amount: Number(amount),
      comment: comment || "",
    };

    recalculateMonthTotals(month);
    month.markModified("income");
    await month.save();
    res.json(month);
  } catch (error) {
    logger.error("Error updating income:", error);
    res.status(500).json({ error: "Failed to update income" });
  }
});

// Delete income (legacy format)
router.delete("/income/:incomeId", async (req: Request, res: Response) => {
  try {
    const { incomeId } = req.params;
    const { monthId } = req.body;

    if (!monthId) {
      res.status(400).json({ error: "monthId is required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    month.income = month.income.filter((i) => i.id !== incomeId);
    recalculateMonthTotals(month);
    month.markModified("income");
    await month.save();
    res.json(month);
  } catch (error) {
    logger.error("Error deleting income:", error);
    res.status(500).json({ error: "Failed to delete income" });
  }
});

// Update income entry
router.put("/income/entry/:entryId", async (req: Request, res: Response) => {
  try {
    const { entryId } = req.params;
    const { monthId, amount, note } = req.body;

    if (!monthId || amount === undefined) {
      res.status(400).json({ error: "monthId and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    // Find the income item containing this entry
    let found = false;
    for (const income of month.income) {
      if (income.entries) {
        const entryIndex = income.entries.findIndex((e) => e.id === entryId);
        if (entryIndex !== -1) {
          // Update the entry
          income.entries[entryIndex] = {
            ...income.entries[entryIndex],
            amount: Number(amount),
            note: note || "",
          };

          // Recalculate category total
          income.amount = income.entries.reduce(
            (sum, entry) => sum + entry.amount,
            0
          );

          // Update breakdown comment
          income.comment = income.entries
            .map((e) => `${e.amount}(${e.note || "No note"})`)
            .join("+");

          found = true;
          break;
        }
      }
    }

    if (!found) {
      res.status(404).json({ error: "Income entry not found" });
      return;
    }

    recalculateMonthTotals(month);
    month.markModified("income");
    await month.save();
    res.json(month);
  } catch (error) {
    logger.error("Error updating income entry:", error);
    res.status(500).json({ error: "Failed to update income entry" });
  }
});

// Delete income entry
router.delete("/income/entry/:entryId", async (req: Request, res: Response) => {
  try {
    const { entryId } = req.params;
    const { monthId } = req.body;

    logger.info(
      `🗑️  DELETE income entry: entryId=${entryId}, monthId=${monthId}`
    );

    if (!monthId) {
      res.status(400).json({ error: "monthId is required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    // Find and remove the entry
    let found = false;
    for (let i = 0; i < month.income.length; i++) {
      const income = month.income[i];
      if (income.entries) {
        const entryIndex = income.entries.findIndex((e) => e.id === entryId);
        if (entryIndex !== -1) {
          income.entries.splice(entryIndex, 1);

          // If no entries left, remove the income category
          if (income.entries.length === 0) {
            month.income.splice(i, 1);
          } else {
            // Recalculate category total
            income.amount = income.entries.reduce(
              (sum, entry) => sum + entry.amount,
              0
            );

            // Update breakdown comment
            income.comment = income.entries
              .map((e) => `${e.amount}(${e.note || "No note"})`)
              .join("+");
          }

          found = true;
          break;
        }
      }
    }

    if (!found) {
      res.status(404).json({ error: "Income entry not found" });
      return;
    }

    recalculateMonthTotals(month);
    month.markModified("income");
    await month.save();
    res.json(month);
  } catch (error) {
    logger.error("Error deleting income entry:", error);
    res.status(500).json({ error: "Failed to delete income entry" });
  }
});

// Add expense entry (new streamlined approach)
router.post("/expense/entry", async (req: Request, res: Response) => {
  try {
    const { monthId, category, amount, note, tag } = req.body;
    if (!monthId || !category || amount === undefined) {
      res
        .status(400)
        .json({ error: "monthId, category, and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    // Initialize expenses array if undefined
    if (!month.expenses) {
      month.expenses = [];
    }

    // Find existing expense for this category
    const expenseIndex = month.expenses.findIndex(
      (e) => e.category === category
    );

    const newEntry: IExpenseEntry = {
      id: generateId("entry"),
      amount: Number(amount),
      note: note || "",
      tag: tag || "neutral",
    };

    if (expenseIndex !== -1) {
      // Category exists - add entry to it
      const expense = month.expenses[expenseIndex];
      if (!expense.entries) {
        expense.entries = [];
      }

      expense.entries.push(newEntry);

      // Recalculate total for this category
      expense.amount = expense.entries.reduce(
        (sum, entry) => sum + entry.amount,
        0
      );

      // Update the breakdown comment
      expense.comment = expense.entries
        .map((e) => `${e.amount}(${e.note || "No note"})`)
        .join("+");
    } else {
      // New category - create expense with entry
      const newExpense: IExpenseItem = {
        id: generateId("exp"),
        category,
        amount: Number(amount),
        comment: `${amount}(${note || "No note"})`,
        entries: [newEntry],
      };
      month.expenses.push(newExpense);
    }

    recalculateMonthTotals(month);
    month.markModified("expenses"); // Mark nested array as modified for Mongoose
    await month.save();
    res.status(201).json(month);
  } catch (error) {
    logger.error("Error adding expense entry:", error);
    res.status(500).json({ error: "Failed to add expense entry" });
  }
});

// Add expense (legacy format)
router.post("/expense", async (req: Request, res: Response) => {
  try {
    const { monthId, category, amount, comment } = req.body;
    if (!monthId || !category || amount === undefined) {
      res
        .status(400)
        .json({ error: "monthId, category, and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    const newExpense: IExpenseItem = {
      id: generateId("exp"),
      category,
      amount: Number(amount),
      comment: comment || "",
    };

    month.expenses.push(newExpense);
    recalculateMonthTotals(month);
    month.markModified("expenses");
    await month.save();
    res.status(201).json(month);
  } catch (error) {
    logger.error("Error adding expense:", error);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// Update expense (legacy format)
router.put("/expense/:expenseId", async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const { monthId, category, amount, comment } = req.body;

    if (!monthId || !category || amount === undefined) {
      res
        .status(400)
        .json({ error: "monthId, category, and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    const expenseIndex = month.expenses.findIndex((e) => e.id === expenseId);
    if (expenseIndex === -1) {
      res.status(404).json({ error: "Expense not found" });
      return;
    }

    month.expenses[expenseIndex] = {
      ...month.expenses[expenseIndex],
      category,
      amount: Number(amount),
      comment: comment || "",
    };

    recalculateMonthTotals(month);
    month.markModified("expenses");
    await month.save();
    res.json(month);
  } catch (error) {
    logger.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// Delete expense (legacy format)
router.delete("/expense/:expenseId", async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const { monthId } = req.body;

    if (!monthId) {
      res.status(400).json({ error: "monthId is required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    month.expenses = month.expenses.filter((e) => e.id !== expenseId);
    recalculateMonthTotals(month);
    month.markModified("expenses");
    await month.save();
    res.json(month);
  } catch (error) {
    logger.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// Update expense entry
router.put("/expense/entry/:entryId", async (req: Request, res: Response) => {
  try {
    const { entryId } = req.params;
    const { monthId, amount, note, tag } = req.body;

    if (!monthId || amount === undefined) {
      res.status(400).json({ error: "monthId and amount are required" });
      return;
    }

    const month = await MonthData.findById(monthId);
    if (!month) {
      res.status(404).json({ error: "Month not found" });
      return;
    }

    // Find the expense item containing this entry
    let found = false;
    for (const expense of month.expenses) {
      if (expense.entries) {
        const entryIndex = expense.entries.findIndex((e) => e.id === entryId);
        if (entryIndex !== -1) {
          // Update the entry
          expense.entries[entryIndex] = {
            ...expense.entries[entryIndex],
            amount: Number(amount),
            note: note || "",
            tag: tag || expense.entries[entryIndex].tag,
          };

          // Recalculate category total
          expense.amount = expense.entries.reduce(
            (sum, entry) => sum + entry.amount,
            0
          );

          // Update breakdown comment
          expense.comment = expense.entries
            .map((e) => `${e.amount}(${e.note || "No note"})`)
            .join("+");

          found = true;
          break;
        }
      }
    }

    if (!found) {
      res.status(404).json({ error: "Expense entry not found" });
      return;
    }

    recalculateMonthTotals(month);
    month.markModified("expenses");
    await month.save();
    res.json(month);
  } catch (error) {
    logger.error("Error updating expense entry:", error);
    res.status(500).json({ error: "Failed to update expense entry" });
  }
});

// Delete expense entry
router.delete(
  "/expense/entry/:entryId",
  async (req: Request, res: Response) => {
    try {
      const { entryId } = req.params;
      const { monthId } = req.body;

      if (!monthId) {
        res.status(400).json({ error: "monthId is required" });
        return;
      }

      const month = await MonthData.findById(monthId);
      if (!month) {
        res.status(404).json({ error: "Month not found" });
        return;
      }

      // Find and remove the entry
      let found = false;
      for (let i = 0; i < month.expenses.length; i++) {
        const expense = month.expenses[i];
        if (expense.entries) {
          const entryIndex = expense.entries.findIndex((e) => e.id === entryId);
          if (entryIndex !== -1) {
            expense.entries.splice(entryIndex, 1);

            // If no entries left, remove the expense category
            if (expense.entries.length === 0) {
              month.expenses.splice(i, 1);
            } else {
              // Recalculate category total
              expense.amount = expense.entries.reduce(
                (sum, entry) => sum + entry.amount,
                0
              );

              // Update breakdown comment
              expense.comment = expense.entries
                .map((e) => `${e.amount}(${e.note || "No note"})`)
                .join("+");
            }

            found = true;
            break;
          }
        }
      }

      if (!found) {
        res.status(404).json({ error: "Expense entry not found" });
        return;
      }

      recalculateMonthTotals(month);
      month.markModified("expenses");
      await month.save();
      res.json(month);
    } catch (error) {
      logger.error("Error deleting expense entry:", error);
      res.status(500).json({ error: "Failed to delete expense entry" });
    }
  }
);

export default router;
