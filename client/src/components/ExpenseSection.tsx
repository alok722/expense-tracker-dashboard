import { useState, useMemo } from "react";
import { ExpenseItem, ExpenseEntry } from "@/types";
import { useApp } from "@/context/AppContext";
import { formatCurrency } from "@/utils/calculations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Trash2,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Filter,
} from "lucide-react";
import { CategoryIcon } from "@/components/Tables/CategoryIcon";
import { BreakdownTooltip } from "@/components/Tables/BreakdownTooltip";

interface ExpenseSectionProps {
  monthId: string;
  expenses: ExpenseItem[];
  totalExpense: number;
}

interface ExpenseFormData {
  category: string;
  amount: string;
  note: string;
  tag: "need" | "want" | "neutral";
  isRecurring: boolean;
}

const EXPENSE_CATEGORIES = [
  "Rent",
  "EMIs",
  "Groceries",
  "Shopping",
  "Food & Drinks",
  "Credit Card",
  "Bills & Utility",
  "Transportation",
  "Medical",
  "Personal Care",
  "Insurance",
  "Investment",
  "Miscellaneous",
];

export function ExpenseSection({
  monthId,
  expenses,
  totalExpense,
}: ExpenseSectionProps) {
  const { addExpenseEntry, deleteExpense, editExpenseEntry, deleteExpenseEntry, currency, createRecurringExpense } =
    useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormData>({
    category: "",
    amount: "",
    note: "",
    tag: "neutral",
    isRecurring: false,
  });

  // Search, filter, and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"category" | "amount" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [tagFilter, setTagFilter] = useState<Set<"need" | "want" | "neutral">>(
    new Set()
  );

  // Group expenses by category
  const groupedExpenses = (expenses || []).reduce((acc, expense) => {
    const existing = acc.find((e) => e.category === expense.category);
    if (existing) {
      // Merge entries if category exists
      if (expense.entries && expense.entries.length > 0) {
        existing.entries = [...(existing.entries || []), ...expense.entries];
      } else if (expense.amount > 0 || expense.comment) {
        // Legacy format - convert to entry
        existing.entries = existing.entries || [];
        existing.entries.push({
          id: expense.id,
          amount: expense.amount,
          note: expense.comment,
        });
      }
      existing.amount += expense.amount;
    } else {
      // New category
      const entries: ExpenseEntry[] =
        expense.entries && expense.entries.length > 0
          ? expense.entries
          : expense.amount > 0 || expense.comment
          ? [
              {
                id: expense.id,
                amount: expense.amount,
                note: expense.comment,
              },
            ]
          : [];

      acc.push({
        ...expense,
        entries,
      });
    }
    return acc;
  }, [] as ExpenseItem[]);

  // Filter out zero-amount categories with no entries
  const displayExpenses = groupedExpenses.filter(
    (expense) =>
      expense.amount > 0 || (expense.entries && expense.entries.length > 0)
  );

  // Filter and sort expenses
  const processedExpenses = useMemo(() => {
    let filtered = displayExpenses;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (expense) =>
          expense.category.toLowerCase().includes(query) ||
          expense.entries?.some((e) => e.note.toLowerCase().includes(query))
      );
    }

    // Apply tag filter
    if (tagFilter.size > 0) {
      filtered = filtered.filter((expense) =>
        expense.entries?.some((entry) => tagFilter.has(entry.tag || "neutral"))
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let compareValue = 0;
        if (sortBy === "category") {
          compareValue = a.category.localeCompare(b.category);
        } else if (sortBy === "amount") {
          compareValue = a.amount - b.amount;
        }
        return sortOrder === "asc" ? compareValue : -compareValue;
      });
    }

    return filtered;
  }, [displayExpenses, searchQuery, sortBy, sortOrder, tagFilter]);

  const handleSort = (column: "category" | "amount") => {
    if (sortBy === column) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortBy(null);
        setSortOrder("asc");
      }
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: "category" | "amount") => {
    if (sortBy !== column)
      return <ArrowUpDown className="w-3.5 h-3.5 ml-1 opacity-50" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 ml-1" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 ml-1" />
    );
  };

  const toggleTagFilter = (tag: "need" | "want" | "neutral") => {
    const newFilter = new Set(tagFilter);
    if (newFilter.has(tag)) {
      newFilter.delete(tag);
    } else {
      newFilter.add(tag);
    }
    setTagFilter(newFilter);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setTagFilter(new Set());
    setSortBy(null);
    setSortOrder("asc");
  };

  const hasActiveFilters = searchQuery.trim() || tagFilter.size > 0 || sortBy;

  const handleAddExpense = async () => {
    if (!formData.category.trim()) {
      alert("Please enter a category");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    if (!formData.note.trim()) {
      alert("Please enter a note");
      return;
    }

    try {
      // Add to current month
      await addExpenseEntry(
        monthId,
        formData.category.trim(),
        amount,
        formData.note.trim(),
        formData.tag
      );

      // If recurring, save as template
      if (formData.isRecurring) {
        await createRecurringExpense(
          formData.category.trim(),
          amount,
          formData.note.trim(),
          formData.tag
        );
      }

      setFormData({
        category: "",
        amount: "",
        note: "",
        tag: "neutral",
        isRecurring: false,
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add expense:", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  const handleDeleteCategory = async (expense: ExpenseItem) => {
    if (
      !confirm(
        `Are you sure you want to delete all "${expense.category}" expenses?`
      )
    )
      return;

    try {
      await deleteExpense(expense.id, monthId);
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Failed to delete expense. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-lg font-semibold text-white">Expenses</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 h-9"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          )}
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            size="sm"
            className="bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all duration-200 hover:shadow-red-500/30"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search by category or note..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-red-500/50 focus:ring-red-500/20 transition-all"
        />
      </div>

      {/* Tag Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filter:</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toggleTagFilter("need")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              tagFilter.has("need")
                ? "bg-red-500/20 text-red-400 border border-red-500/50 shadow-sm"
                : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            🔴 Need
            {tagFilter.has("need") && <span className="text-red-400">✓</span>}
          </button>
          <button
            onClick={() => toggleTagFilter("want")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              tagFilter.has("want")
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 shadow-sm"
                : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            🟡 Want
            {tagFilter.has("want") && (
              <span className="text-yellow-400">✓</span>
            )}
          </button>
          <button
            onClick={() => toggleTagFilter("neutral")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              tagFilter.has("neutral")
                ? "bg-slate-500/20 text-slate-300 border border-slate-500/50 shadow-sm"
                : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600 hover:text-slate-300"
            }`}
          >
            ⚪ Neutral
            {tagFilter.has("neutral") && (
              <span className="text-slate-300">✓</span>
            )}
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-700/50 overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-slate-800/50 bg-slate-800/30">
              <TableHead
                className="text-slate-300 font-semibold cursor-pointer hover:text-red-400 transition-colors select-none w-1/4"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {getSortIcon("category")}
                </div>
              </TableHead>
              <TableHead
                className="text-slate-300 text-right font-semibold cursor-pointer hover:text-red-400 transition-colors select-none w-32"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end">
                  Amount
                  {getSortIcon("amount")}
                </div>
              </TableHead>
              <TableHead className="text-slate-300 font-semibold">
                Breakdown
              </TableHead>
              <TableHead className="text-slate-300 text-right w-20 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedExpenses.length === 0 ? (
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="text-center text-slate-400 py-12"
                >
                  {searchQuery || tagFilter.size > 0 ? (
                    <div className="space-y-2">
                      <div className="text-lg">No results found</div>
                      <div className="text-sm">Try adjusting your filters</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-lg">No expense entries yet</div>
                      <div className="text-sm">
                        Click "Add Expense" to get started
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              processedExpenses.map((expense, index) => (
                <TableRow
                  key={expense.id}
                  className="border-slate-700/50 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-800/50 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-white font-medium">
                    <div className="flex items-center gap-3">
                      <CategoryIcon
                        category={expense.category}
                        type="expense"
                      />
                      <span className="text-sm">{expense.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-red-400 text-right font-semibold font-mono text-base">
                    {formatCurrency(expense.amount, currency)}
                  </TableCell>
                  <TableCell>
                    <BreakdownTooltip
                      entries={expense.entries}
                      currency={currency}
                      type="expense"
                      maxPreviewEntries={2}
                      onEdit={async (entryId, amount, note, tag) => {
                        try {
                          await editExpenseEntry(entryId, monthId, amount, note, tag);
                        } catch (error) {
                          console.error('Failed to edit expense entry:', error);
                        }
                      }}
                      onDelete={async (entryId) => {
                        try {
                          await deleteExpenseEntry(entryId, monthId);
                        } catch (error) {
                          console.error('Failed to delete expense entry:', error);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      onClick={() => handleDeleteCategory(expense)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter className="bg-slate-800/50 backdrop-blur-sm">
            <TableRow className="border-slate-700/50 hover:bg-slate-800/70">
              <TableCell className="text-white font-semibold">Total</TableCell>
              <TableCell className="text-red-400 text-right font-bold text-lg font-mono">
                {formatCurrency(totalExpense, currency)}
              </TableCell>
              <TableCell colSpan={2}>
                <div className="text-xs text-slate-500 text-right">
                  {displayExpenses.length}{" "}
                  {displayExpenses.length === 1 ? "category" : "categories"}
                  {(searchQuery || tagFilter.size > 0) &&
                    ` • ${processedExpenses.length} visible`}
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter the expense details. You can add multiple entries to the
              same category.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-300">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-white focus:bg-slate-700 focus:text-white"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-300">
                Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 1619"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="bg-slate-800 border-slate-700 text-white"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-slate-300">
                Note
              </Label>
              <Input
                id="note"
                placeholder="e.g., IRCTC, Uber ride, Grocery store"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag" className="text-slate-300">
                Tag
              </Label>
              <Select
                value={formData.tag}
                onValueChange={(value: "need" | "want" | "neutral") =>
                  setFormData({ ...formData, tag: value })
                }
              >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem
                    value="need"
                    className="text-white focus:bg-slate-700 focus:text-white"
                  >
                    🔴 Need
                  </SelectItem>
                  <SelectItem
                    value="want"
                    className="text-white focus:bg-slate-700 focus:text-white"
                  >
                    🟡 Want
                  </SelectItem>
                  <SelectItem
                    value="neutral"
                    className="text-white focus:bg-slate-700 focus:text-white"
                  >
                    ⚪ Neutral
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={formData.isRecurring}
                  onChange={(e) =>
                    setFormData({ ...formData, isRecurring: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500"
                />
                <Label
                  htmlFor="isRecurring"
                  className="text-slate-300 cursor-pointer"
                >
                  Make it recurring (auto-add to future months)
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAddDialogOpen(false);
                setFormData({
                  category: "",
                  amount: "",
                  note: "",
                  tag: "neutral",
                  isRecurring: false,
                });
              }}
              className="text-slate-400 "
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddExpense}
              className="bg-red-500 hover:bg-red-600"
            >
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
