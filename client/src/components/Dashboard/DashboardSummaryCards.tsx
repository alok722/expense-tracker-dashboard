import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import { formatCurrency } from "@/utils/calculations";

interface DashboardSummaryCardsProps {
  totalRecords: number;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  currency: "USD" | "INR";
  avgIncome: number;
  avgExpense: number;
}

export function DashboardSummaryCards({
  totalRecords,
  totalIncome,
  totalExpense,
  netBalance,
  currency,
  avgIncome,
  avgExpense,
}: DashboardSummaryCardsProps) {
  const balancePercentage = totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Income Card */}
      <Card className="group relative overflow-hidden bg-slate-800/90 backdrop-blur-sm border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <CardContent className="p-4 relative">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-all">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium px-2 py-0.5 bg-emerald-500/10 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              Income
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-slate-400 font-medium">Total Income</p>
            <p className="text-2xl font-bold text-emerald-400 tracking-tight">
              {formatCurrency(totalIncome, currency)}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3" />
              Avg: {formatCurrency(avgIncome, currency)}/mo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total Expense Card */}
      <Card className="group relative overflow-hidden bg-slate-800/90 backdrop-blur-sm border-slate-700/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <CardContent className="p-4 relative">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-all">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex items-center gap-1 text-red-400 text-xs font-medium px-2 py-0.5 bg-red-500/10 rounded-full">
              <ArrowDownRight className="w-3 h-3" />
              Expense
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-slate-400 font-medium">Total Expense</p>
            <p className="text-2xl font-bold text-red-400 tracking-tight">
              {formatCurrency(totalExpense, currency)}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3" />
              Avg: {formatCurrency(avgExpense, currency)}/mo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Net Balance Card */}
      <Card className={`group relative overflow-hidden bg-slate-800/90 backdrop-blur-sm border-slate-700/50 ${
        netBalance >= 0 
          ? 'hover:border-blue-500/50 hover:shadow-blue-500/20'
          : 'hover:border-orange-500/50 hover:shadow-orange-500/20'
      } transition-all duration-300 hover:shadow-lg`}>
        <div className={`absolute top-0 right-0 w-32 h-32 ${
          netBalance >= 0 ? 'bg-blue-500/10' : 'bg-orange-500/10'
        } rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
        <CardContent className="p-4 relative">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg transition-all ${
              netBalance >= 0 ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 'bg-orange-500/10 group-hover:bg-orange-500/20'
            }`}>
              <Wallet className={`w-5 h-5 ${netBalance >= 0 ? 'text-blue-400' : 'text-orange-400'}`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
              netBalance >= 0 ? 'text-blue-400 bg-blue-500/10' : 'text-orange-400 bg-orange-500/10'
            }`}>
              {netBalance >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              Balance
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-slate-400 font-medium">Net Balance</p>
            <p className={`text-2xl font-bold tracking-tight ${
              netBalance >= 0 ? 'text-blue-400' : 'text-orange-400'
            }`}>
              {formatCurrency(netBalance, currency)}
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <Target className="w-3 h-3" />
              {balancePercentage.toFixed(1)}% of income
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Score Card */}
      <Card className="group relative overflow-hidden bg-slate-800/90 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <CardContent className="p-4 relative">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex items-center gap-1 text-purple-400 text-xs font-medium px-2 py-0.5 bg-purple-500/10 rounded-full">
              <Activity className="w-3 h-3" />
              Score
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium">Financial Health</p>
            <div className="flex items-end gap-1.5">
              <p className="text-2xl font-bold text-purple-400 tracking-tight">
                {totalRecords > 0 ? Math.min(Math.round((balancePercentage + 100) / 2), 100) : 0}
              </p>
              <span className="text-sm text-slate-500 font-medium mb-0.5">/100</span>
            </div>
            <div className="w-full bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${totalRecords > 0 ? Math.min(Math.round((balancePercentage + 100) / 2), 100) : 0}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">
              Tracking {totalRecords} period{totalRecords !== 1 ? 's' : ''}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

