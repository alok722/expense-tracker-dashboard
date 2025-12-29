import axios from "axios";
import { AuthUser, MonthData, RecurringExpense } from "@/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth
export async function login(
  username: string,
  password: string
): Promise<AuthUser> {
  const response = await api.post<AuthUser>("/auth/login", {
    username,
    password,
  });
  return response.data;
}

export async function register(
  username: string,
  password: string,
  name?: string
): Promise<AuthUser> {
  const response = await api.post<AuthUser>("/auth/register", {
    username,
    password,
    name,
  });
  return response.data;
}

export async function updateProfile(
  userId: string,
  name?: string,
  currency?: "USD" | "INR"
): Promise<AuthUser> {
  const response = await api.put<AuthUser>("/auth/profile", {
    userId,
    name,
    currency,
  });
  return response.data;
}

// Data
export async function fetchMonthsData(userId: string): Promise<MonthData[]> {
  const response = await api.get<MonthData[]>("/data", {
    params: { userId },
  });
  return response.data;
}

export async function fetchMonth(monthId: string): Promise<MonthData> {
  const response = await api.get<MonthData>(`/data/month/${monthId}`);
  return response.data;
}

export async function createMonth(
  userId: string,
  year: number,
  month: number
): Promise<MonthData> {
  const response = await api.post<MonthData>("/data/month", {
    userId,
    year,
    month,
  });
  return response.data;
}

// Income
export async function addIncome(
  monthId: string,
  category: string,
  amount: number,
  comment: string
): Promise<MonthData> {
  const response = await api.post<MonthData>("/data/income", {
    monthId,
    category,
    amount,
    comment,
  });
  return response.data;
}

export async function addIncomeEntry(
  monthId: string,
  category: string,
  amount: number,
  note: string
): Promise<MonthData> {
  const response = await api.post<MonthData>("/data/income/entry", {
    monthId,
    category,
    amount,
    note,
  });
  return response.data;
}

export async function editIncome(
  incomeId: string,
  monthId: string,
  category: string,
  amount: number,
  comment: string
): Promise<MonthData> {
  const response = await api.put<MonthData>(`/data/income/${incomeId}`, {
    monthId,
    category,
    amount,
    comment,
  });
  return response.data;
}

export async function deleteIncome(
  incomeId: string,
  monthId: string
): Promise<MonthData> {
  const response = await api.delete<MonthData>(`/data/income/${incomeId}`, {
    data: { monthId },
  });
  return response.data;
}

// Edit income entry
export async function editIncomeEntry(
  entryId: string,
  monthId: string,
  amount: number,
  note: string
): Promise<MonthData> {
  const response = await api.put<MonthData>(`/data/income/entry/${entryId}`, {
    monthId,
    amount,
    note,
  });
  return response.data;
}

// Delete income entry
export async function deleteIncomeEntry(
  entryId: string,
  monthId: string
): Promise<MonthData> {
  const response = await api.delete<MonthData>(
    `/data/income/entry/${entryId}`,
    {
      data: { monthId },
    }
  );
  return response.data;
}

// Expense
export async function addExpense(
  monthId: string,
  category: string,
  amount: number,
  comment: string
): Promise<MonthData> {
  const response = await api.post<MonthData>("/data/expense", {
    monthId,
    category,
    amount,
    comment,
  });
  return response.data;
}

export async function addExpenseEntry(
  monthId: string,
  category: string,
  amount: number,
  note: string,
  tag?: "need" | "want" | "neutral"
): Promise<MonthData> {
  const response = await api.post<MonthData>("/data/expense/entry", {
    monthId,
    category,
    amount,
    note,
    tag,
  });
  return response.data;
}

export async function editExpense(
  expenseId: string,
  monthId: string,
  category: string,
  amount: number,
  comment: string
): Promise<MonthData> {
  const response = await api.put<MonthData>(`/data/expense/${expenseId}`, {
    monthId,
    category,
    amount,
    comment,
  });
  return response.data;
}

export async function deleteExpense(
  expenseId: string,
  monthId: string
): Promise<MonthData> {
  const response = await api.delete<MonthData>(`/data/expense/${expenseId}`, {
    data: { monthId },
  });
  return response.data;
}

// Edit expense entry
export async function editExpenseEntry(
  entryId: string,
  monthId: string,
  amount: number,
  note: string,
  tag?: "need" | "want" | "neutral"
): Promise<MonthData> {
  const response = await api.put<MonthData>(`/data/expense/entry/${entryId}`, {
    monthId,
    amount,
    note,
    tag,
  });
  return response.data;
}

// Delete expense entry
export async function deleteExpenseEntry(
  entryId: string,
  monthId: string
): Promise<MonthData> {
  const response = await api.delete<MonthData>(
    `/data/expense/entry/${entryId}`,
    {
      data: { monthId },
    }
  );
  return response.data;
}

// Recurring Expenses
export async function fetchRecurringExpenses(
  userId: string
): Promise<RecurringExpense[]> {
  const response = await api.get<RecurringExpense[]>("/recurring", {
    params: { userId },
  });
  return response.data;
}

export async function createRecurringExpense(
  userId: string,
  category: string,
  amount: number,
  note: string,
  tag: "need" | "want" | "neutral"
): Promise<RecurringExpense> {
  const response = await api.post<RecurringExpense>("/recurring", {
    userId,
    category,
    amount,
    note,
    tag,
  });
  return response.data;
}

export async function deleteRecurringExpense(id: string): Promise<void> {
  await api.delete(`/recurring/${id}`);
}

export async function updateRecurringExpense(
  id: string,
  updates: { category?: string; amount?: number; note?: string; tag?: string }
): Promise<RecurringExpense> {
  const response = await api.put(`/recurring/${id}`, updates);
  return response.data;
}
