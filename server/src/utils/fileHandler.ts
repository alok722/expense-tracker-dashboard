import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../../data/data.json");

export interface User {
  id: number;
  username: string;
  password: string;
  name?: string;
  currency?: 'USD' | 'INR';
}

export interface IncomeEntry {
  id: string;
  amount: number;
  note: string;
}

export interface IncomeItem {
  id: string;
  category: string;
  amount: number;
  comment: string;
  entries?: IncomeEntry[];
}

export interface ExpenseEntry {
  id: string;
  amount: number;
  note: string;
  tag?: 'need' | 'want' | 'neutral';
}

export interface ExpenseItem {
  id: string;
  category: string;
  amount: number;
  comment: string;
  entries?: ExpenseEntry[];
}

export interface MonthData {
  id: string;
  userId: number;
  monthName: string;
  year: number;
  month: number;
  income: IncomeItem[];
  expenses: ExpenseItem[];
  totalIncome: number;
  totalExpense: number;
  carryForward: number;
}

export interface RecurringExpense {
  id: string;
  userId: number;
  category: string;
  amount: number;
  note: string;
  tag: 'need' | 'want' | 'neutral';
  createdAt: string;
}

export interface AppData {
  users: User[];
  months: MonthData[];
  recurringExpenses: RecurringExpense[];
}

export function readData(): AppData {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const parsedData = JSON.parse(data);
    // Add default empty array if field doesn't exist for backward compatibility
    if (!parsedData.recurringExpenses) {
      parsedData.recurringExpenses = [];
    }
    return parsedData as AppData;
  } catch (error) {
    console.error("Error reading data file:", error);
    throw new Error("Failed to read data file");
  }
}

export function writeData(data: AppData): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing data file:", error);
    throw new Error("Failed to write data file");
  }
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
