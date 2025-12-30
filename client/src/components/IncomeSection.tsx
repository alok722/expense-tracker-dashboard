import { useState, useMemo } from "react";
import { IncomeItem } from "@/types";
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
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import { CategoryIcon } from "@/components/Tables/CategoryIcon";
import { BreakdownTooltip } from "@/components/Tables/BreakdownTooltip";

interface IncomeSectionProps {
  monthId: string;
  income: IncomeItem[];
  totalIncome: number;
}

interface IncomeFormData {
  category: string;
  amount: string;
  note: string;
}

const INCOME_CATEGORIES = [
  "Salary",
  "Carry Forward",
  "Bonus",
  "Freelance",
  "Investment Returns",
  "Rental Income",
  "Others",
];

export function IncomeSection({
  monthId,
  income,
  totalIncome,
}: IncomeSectionProps) {
  const { addIncomeEntry, deleteIncome, editIncomeEntry, deleteIncomeEntry, currency } = useApp();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState<IncomeFormData>({
    category: "",
    amount: "",
    note: "",
  });

  // Confirmation dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    item: IncomeItem | null;
  }>({ open: false, item: null });

  // Search and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"category" | "amount" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Group income by category (similar to expenses)
  const groupedIncome = (income || []).reduce((acc, item) => {
    const existing = acc.find((i) => i.category === item.category);
    if (existing) {
      if (item.entries && item.entries.length > 0) {
        existing.entries = [...(existing.entries || []), ...item.entries];
      } else if (item.amount > 0 || item.comment) {
        existing.entries = existing.entries || [];
        existing.entries.push({
          id: item.id,
          amount: item.amount,
          note: item.comment,
        });
      }
      existing.amount += item.amount;
    } else {
      const entries =
        item.entries && item.entries.length > 0
          ? item.entries
          : item.amount > 0 || item.comment
          ? [
              {
                id: item.id,
                amount: item.amount,
                note: item.comment,
              },
            ]
          : [];

      acc.push({
        ...item,
        entries,
      });
    }
    return acc;
  }, [] as any[]);

  const displayIncome = groupedIncome.filter(
    (item) => item.amount > 0 || (item.entries && item.entries.length > 0)
  );

  // Filter and sort income
  const processedIncome = useMemo(() => {
    let filtered = displayIncome;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase().includes(query) ||
          item.entries?.some((e: { note: string }) =>
            e.note.toLowerCase().includes(query)
          )
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
  }, [displayIncome, searchQuery, sortBy, sortOrder]);

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

  const clearFilters = () => {
    setSearchQuery("");
    setSortBy(null);
    setSortOrder("asc");
  };

  const hasActiveFilters = searchQuery.trim() || sortBy;

  const handleAddIncome = async () => {
    if (!formData.category.trim()) {
      alert("Please select a category");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    if (!formData.note.trim()) {
      toast.error("Please enter a note");
      return;
    }

    try {
      await addIncomeEntry(
        monthId,
        formData.category.trim(),
        amount,
        formData.note.trim()
      );
      setFormData({ category: "", amount: "", note: "" });
      setIsAddDialogOpen(false);
      toast.success("Income added successfully");
    } catch (error) {
      console.error("Failed to add income:", error);
      toast.error("Failed to add income. Please try again.");
    }
  };

  const handleDeleteCategory = async (item: IncomeItem) => {
    try {
      await deleteIncome(item.id, monthId);
      toast.success(`Income category "${item.category}" deleted`);
      setDeleteDialog({ open: false, item: null });
    } catch (error) {
      console.error("Failed to delete income:", error);
      toast.error("Failed to delete income. Please try again.");
    }
  };

  const formatBreakdown = (entries: any[] | undefined): string => {
    if (!entries || entries.length === 0) return "";

    return entries
      .map((entry) => `${entry.amount}(${entry.note || "No note"})`)
      .join(" + ");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-lg font-semibold text-white">Income</h3>
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
            className="bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:shadow-emerald-500/30"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Income
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
          className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all"
        />
      </div>

      <div className="rounded-lg border border-slate-700/50 overflow-hidden shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-slate-800/50 bg-slate-800/30">
              <TableHead
                className="text-slate-300 font-semibold cursor-pointer hover:text-emerald-400 transition-colors select-none w-1/4"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {getSortIcon("category")}
                </div>
              </TableHead>
              <TableHead
                className="text-slate-300 text-right font-semibold cursor-pointer hover:text-emerald-400 transition-colors select-none w-32"
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
            {processedIncome.length === 0 ? (
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="text-center text-slate-400 py-12"
                >
                  {searchQuery ? (
                    <div className="space-y-2">
                      <div className="text-lg">No results found</div>
                      <div className="text-sm">Try adjusting your search</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-lg">No income entries yet</div>
                      <div className="text-sm">
                        Click "Add Income" to get started
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              processedIncome.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="border-slate-700/50 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-800/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="text-white font-medium">
                    <div className="flex items-center gap-3">
                      <CategoryIcon category={item.category} type="income" />
                      <span className="text-sm">{item.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-emerald-400 text-right font-semibold font-mono text-base">
                    {formatCurrency(item.amount, currency)}
                  </TableCell>
                  <TableCell>
                    <BreakdownTooltip
                      entries={item.entries}
                      currency={currency}
                      type="income"
                      maxPreviewEntries={2}
                      onEdit={async (entryId, amount, note) => {
                        try {
                          await editIncomeEntry(entryId, monthId, amount, note);
                        } catch (error) {
                          console.error('Failed to edit income entry:', error);
                        }
                      }}
                      onDelete={async (entryId) => {
                        try {
                          await deleteIncomeEntry(entryId, monthId);
                        } catch (error) {
                          console.error('Failed to delete income entry:', error);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      onClick={() => setDeleteDialog({ open: true, item })}
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
              <TableCell className="text-emerald-400 text-right font-bold text-lg font-mono">
                {formatCurrency(totalIncome, currency)}
              </TableCell>
              <TableCell colSpan={2}>
                <div className="text-xs text-slate-500 text-right">
                  {displayIncome.length}{" "}
                  {displayIncome.length === 1 ? "category" : "categories"}
                  {searchQuery && ` • ${processedIncome.length} visible`}
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Add Income Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Add New Income</DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter the income details. You can add multiple entries to the same
              category.
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
                  {INCOME_CATEGORIES.map((cat) => (
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
                placeholder="e.g., 50000"
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
                placeholder="e.g., Monthly salary, Freelance project"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAddDialogOpen(false);
                setFormData({ category: "", amount: "", note: "" });
              }}
              className="text-slate-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddIncome}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              Add Income
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Income Category Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, item: deleteDialog.item })
        }
        title="Delete Income Category"
        description={`Are you sure you want to delete all "${deleteDialog.item?.category}" income entries? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={() => {
          if (deleteDialog.item) {
            handleDeleteCategory(deleteDialog.item);
          }
        }}
      />
    </div>
  );
}
