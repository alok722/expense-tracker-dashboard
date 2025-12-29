import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { MonthData } from '@/types';
import { formatCurrency } from '@/utils/calculations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Wallet, ArrowRight } from 'lucide-react';

interface MonthCardProps {
  month: MonthData;
}

export function MonthCard({ month }: MonthCardProps) {
  const navigate = useNavigate();
  const { currency } = useApp();
  const isPositive = month.carryForward >= 0;

  return (
    <Card
      className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/month/${month._id}`)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">
            {month.monthName}
          </CardTitle>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
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
  );
}

