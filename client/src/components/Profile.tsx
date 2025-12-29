import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Loader2, CheckCircle2, Trash2, Pencil } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";
import type { RecurringExpense } from "@/types";

export function Profile() {
  const {
    user,
    currency,
    updateProfile,
    recurringExpenses,
    deleteRecurringExpense,
    updateRecurringExpense,
  } = useApp();
  const [name, setName] = useState(user?.name || user?.username || "");
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "INR">(
    currency
  );
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Edit recurring expense state
  const [editingExpense, setEditingExpense] = useState<RecurringExpense | null>(
    null
  );
  const [editForm, setEditForm] = useState({
    category: "",
    amount: 0,
    note: "",
    tag: "neutral" as "need" | "want" | "neutral",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      await updateProfile(name, selectedCurrency);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (_err) {
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRecurring = async (id: string, category: string) => {
    if (!confirm(`Delete recurring expense for ${category}?`)) return;
    try {
      await deleteRecurringExpense(id);
    } catch (error) {
      console.error("Failed to delete recurring expense:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  const handleEditClick = (expense: RecurringExpense) => {
    setEditingExpense(expense);
    setEditForm({
      category: expense.category,
      amount: expense.amount,
      note: expense.note,
      tag: expense.tag,
    });
  };

  const handleEditSubmit = async () => {
    if (!editingExpense) return;

    try {
      await updateRecurringExpense(editingExpense._id, editForm);
      setEditingExpense(null);
    } catch (error) {
      console.error("Failed to update recurring expense:", error);
      alert("Failed to update. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-slate-400">Manage your account preferences</p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
          <CardDescription className="text-slate-400">
            Update your display name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={user?.username || ""}
                disabled
                className="bg-slate-900/50 border-slate-600 text-slate-500"
              />
              <p className="text-xs text-slate-500">
                Username cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Display Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="currency"
                className="text-slate-300 flex items-center gap-2"
              >
                Default Currency
              </Label>
              <Select
                value={selectedCurrency}
                onValueChange={(value: "USD" | "INR") =>
                  setSelectedCurrency(value)
                }
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white focus:border-emerald-500 focus:ring-emerald-500/20">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="INR" className="text-white">
                    ₹ Indian Rupees (INR)
                  </SelectItem>
                  <SelectItem value="USD" className="text-white">
                    $ US Dollars (USD)
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                This will be used throughout the application for displaying
                amounts
              </p>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-md p-3">
                {error}
              </div>
            )}

            {success && (
              <div className="text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-md p-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Profile updated successfully!
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recurring Expenses Section */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Recurring Expenses</CardTitle>
          <CardDescription className="text-slate-400">
            These expenses will be automatically added when you create a new
            month
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recurringExpenses.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No recurring expenses yet. Mark an expense as recurring when
              creating it.
            </div>
          ) : (
            <div className="space-y-2">
              {recurringExpenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/30"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {expense.category}
                      </span>
                      <span className="text-xs">
                        {expense.tag === "need"
                          ? "🔴"
                          : expense.tag === "want"
                          ? "🟡"
                          : "⚪"}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {expense.note}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-red-400">
                      {formatCurrency(expense.amount, currency)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(expense)}
                      className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDeleteRecurring(expense._id, expense.category)
                      }
                      className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">
                    Total recurring per month:
                  </span>
                  <span className="font-bold text-red-400 text-lg">
                    {formatCurrency(
                      (recurringExpenses || []).reduce(
                        (sum, e) => sum + e.amount,
                        0
                      ),
                      currency
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Recurring Expense Dialog */}
      <Dialog
        open={!!editingExpense}
        onOpenChange={(open) => !open && setEditingExpense(null)}
      >
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Recurring Expense</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update the details of this recurring expense
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category" className="text-slate-300">
                Category
              </Label>
              <Input
                id="edit-category"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="bg-slate-900/50 border-slate-600 text-white"
                placeholder="e.g., Netflix, Rent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-amount" className="text-slate-300">
                Amount
              </Label>
              <Input
                id="edit-amount"
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm({ ...editForm, amount: Number(e.target.value) })
                }
                className="bg-slate-900/50 border-slate-600 text-white"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-note" className="text-slate-300">
                Note
              </Label>
              <Input
                id="edit-note"
                value={editForm.note}
                onChange={(e) =>
                  setEditForm({ ...editForm, note: e.target.value })
                }
                className="bg-slate-900/50 border-slate-600 text-white"
                placeholder="Add a note"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tag" className="text-slate-300">
                Tag
              </Label>
              <Select
                value={editForm.tag}
                onValueChange={(value: "need" | "want" | "neutral") =>
                  setEditForm({ ...editForm, tag: value })
                }
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="need" className="text-white">
                    🔴 Need
                  </SelectItem>
                  <SelectItem value="want" className="text-white">
                    🟡 Want
                  </SelectItem>
                  <SelectItem value="neutral" className="text-white">
                    ⚪ Neutral
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setEditingExpense(null)}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
