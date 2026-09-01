import { ShieldCheck, AlertCircle, ChevronRight, Info, TrendingDown, FileText } from 'lucide-react';
import { Card, Badge, formatINR, formatINRFull } from '@/components/ui';
import { ScoreGauge } from '@/components/ScoreGauge';
import type { TabId } from '@/components/BottomNav';
import { loans } from '@/data';

export function HomeScreen({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const overdueLoans = loans.filter((l) => l.status === 'Overdue');
  const totalOverdue = overdueLoans.reduce((sum, l) => sum + l.overdueAmount, 0);
  const totalDebt = loans.reduce((sum, l) => sum + l.principal, totalOverdue);

  return (
    <div className="px-4 pt-3 pb-4 space-y-4 animate-fade-in">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 font-medium">Good evening</p>
          <h1 className="text-xl font-bold text-slate-800">Rahul 👋</h1>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
          R
        </div>
      </div>

      {/* Diagnosis card */}
      <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-base leading-tight">Credit Situation</h2>
            <p className="text-brand-100 text-xs mt-0.5">Updated 2 hours ago</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-brand-50">
          You have{' '}
          <span className="font-bold text-white">{overdueLoans.length} overdue accounts</span>{' '}
          totaling{' '}
          <span className="font-bold text-white">{formatINR(totalOverdue)}</span>. No legal
          notices have been issued yet — this is the right time to act.
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-brand-100 text-xs">
          <Info size={13} />
          <span>Acting now can prevent further score damage</span>
        </div>
      </Card>

      {/* Score gauge card */}
      <Card>
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-bold text-slate-800 text-base">Credit Score</h2>
          <Badge variant="warning">
            <TrendingDown size={12} /> Down 24 pts
          </Badge>
        </div>
        <div className="flex justify-center my-2">
          <ScoreGauge score={582} />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 font-medium px-2">
          <span>Poor</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
        <div className="mt-4 p-3 bg-amber-50 rounded-2xl flex items-start gap-2">
          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Your score is in the "Needs Work" band. Resolving overdue accounts can
            recover 40–60 points over 6 months.
          </p>
        </div>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card padded className="p-4">
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-2">
            <AlertCircle size={18} className="text-orange-500" />
          </div>
          <p className="text-xs text-slate-400 font-medium">Total Overdue</p>
          <p className="text-lg font-bold text-slate-800">{formatINRFull(totalOverdue)}</p>
        </Card>
        <Card padded className="p-4">
          <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center mb-2">
            <FileText size={18} className="text-brand-600" />
          </div>
          <p className="text-xs text-slate-400 font-medium">Total Debt</p>
          <p className="text-lg font-bold text-slate-800">{formatINRFull(totalDebt)}</p>
        </Card>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate('loans')}
        className="w-full bg-brand-600 text-white rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all duration-200 active:scale-[0.98] group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div className="text-left">
            <p className="font-bold text-sm">See Your Loans</p>
            <p className="text-brand-100 text-xs">View all {loans.length} accounts</p>
          </div>
        </div>
        <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Tip card */}
      <Card className="bg-mint-50 border border-mint-100">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-mint-100 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-mint-600" />
          </div>
          <div>
            <p className="font-bold text-mint-800 text-sm">You're not alone</p>
            <p className="text-mint-700 text-xs mt-1 leading-relaxed">
              Over 50 million Indians have overdue credit accounts. Structured
              resolution is a proven path back to financial health.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
