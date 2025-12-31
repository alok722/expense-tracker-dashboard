import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MonthData } from '@/types';
import { formatCurrency } from '@/utils/calculations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { TrendingUp, TrendingDown, Wallet, ArrowRight, Trash2 } from 'lucide-react';
import { useSwipe } from '@/hooks/useSwipe';
import { toast } from 'sonner';

interface MonthCardProps {
  month: MonthData;
}

export function MonthCard({ month }: MonthCardProps) {
  const navigate = useNavigate();
  const { currency, deleteMonth } = useApp();
  const isPositive = month.carryForward >= 0;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { handlers, swipeState } = useSwipe({
    onSwipeLeft: () => {
      setDeleteDialogOpen(true);
    },
    threshold: 80,
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMonth(month._id);
      toast.success(`${month.monthName} deleted successfully`);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete month:', error);
      toast.error('Failed to delete month. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking delete button or dialog is open
    if ((e.target as HTMLElement).closest('button') || deleteDialogOpen) {
      return;
    }
    navigate(`/month/${month._id}`);
  };

  return (
    <>
      <div className="relative overflow-hidden rounded-lg" {...handlers}>
        {/* Delete background (revealed on swipe) */}
        <div
          className="absolute inset-0 bg-red-500/90 flex items-center justify-end px-6 pointer-events-none"
          style={{
            opacity: Math.min(Math.abs(swipeState.swipeProgress) / 80, 1),
          }}
        >
          <Trash2 className="w-6 h-6 text-white" />
        </div>

        {/* Card content */}
        <Card
          className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-300 cursor-pointer group relative"
          style={{
            transform: `translateX(${swipeState.swipeProgress}px)`,
            transition: swipeState.isSwiping ? 'none' : 'transform 0.3s ease-out',
          }}
          onClick={handleCardClick}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">
                {month.monthName}
              </CardTitle>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all md:block" />
                
                {/* Desktop delete button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 opacity-0 group-hover:opacity-100 hidden md:flex"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteDialogOpen(true);
                  }}
                  title="Delete month"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Income
                </div>
                <p className="text-xl font-bold text-emerald-400">
                  {formatCurrency(month.totalIncome, currency)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                  Expense
                </div>
                <p className="text-xl font-bold text-red-400">
                  {formatCurrency(month.totalExpense, currency)}
                </p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Wallet className="w-4 h-4" />
                  Carry Forward
                </div>
                <Badge variant={isPositive ? 'success' : 'destructive'} className="text-sm">
                  {isPositive ? '+' : ''}{formatCurrency(month.carryForward, currency)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Month"
        description={`Are you sure you want to delete ${month.monthName}? This will permanently remove all income and expense data for this period. This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </>
  );
}

