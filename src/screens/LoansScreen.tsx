import { Clock, ChevronRight, Wallet } from 'lucide-react';
import { Card, Badge, Avatar, formatINR, formatINRFull, SectionHeader } from '@/components/ui';
import type { TabId } from '@/components/BottomNav';
import { loans } from '@/data';
import type { Loan } from '@/data';

function statusBadge(status: Loan['status']) {
  if (status === 'Overdue') return <Badge variant="overdue">Overdue</Badge>;
  if (status === 'In Resolution') return <Badge variant="resolution">In Resolution</Badge>;
  return <Badge variant="active">Active</Badge>;
}

function LoanCard({ loan, onResolve }: { loan: Loan; onResolve: () => void }) {
  return (
    <Card onClick={onResolve} className="mb-3">
      <div className="flex items-start gap-3">
        <Avatar initial={loan.lenderInitial} color={loan.lenderColor} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm truncate">{loan.lender}</h3>
            {statusBadge(loan.status)}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{loan.type}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Outstanding</p>
          <p className="text-sm font-bold text-slate-800">{formatINR(loan.principal)}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Overdue</p>
          <p className={`text-sm font-bold ${loan.overdueAmount > 0 ? 'text-orange-600' : 'text-slate-800'}`}>
            {loan.overdueAmount > 0 ? formatINRFull(loan.overdueAmount) : '—'}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Days Past Due</p>
          <p className={`text-sm font-bold ${loan.daysPastDue > 0 ? 'text-orange-600' : 'text-slate-800'}`}>
            {loan.daysPastDue > 0 ? `${loan.daysPastDue} days` : 'Current'}
          </p>
        </div>
      </div>

      {loan.status === 'Overdue' && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={13} />
            <span>Monthly EMI: {formatINRFull(loan.monthlyEMI)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-brand-600">
            <span>Resolve</span>
            <ChevronRight size={14} />
          </div>
        </div>
      )}
    </Card>
  );
}

export function LoansScreen({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const overdueCount = loans.filter((l) => l.status === 'Overdue').length;
  const totalOverdue = loans
    .filter((l) => l.status === 'Overdue')
    .reduce((sum, l) => sum + l.overdueAmount, 0);
  const totalDebt = loans.reduce((sum, l) => sum + l.principal, 0);

  return (
    <div className="px-4 pt-3 pb-4 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Your Loans</h1>
        <p className="text-sm text-slate-400 mt-0.5">All active credit obligations</p>
      </div>

      {/* Summary card */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Accounts</p>
            <p className="text-xl font-bold mt-1">{loans.length}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Overdue</p>
            <p className="text-xl font-bold mt-1 text-orange-400">{overdueCount}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Debt</p>
            <p className="text-xl font-bold mt-1">{formatINR(totalDebt)}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">Total overdue amount</span>
          <span className="text-sm font-bold text-orange-400">{formatINRFull(totalOverdue)}</span>
        </div>
      </Card>

      {/* Loan list */}
      <div>
        <SectionHeader title="All Accounts" subtitle="Tap to view resolution options" />
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} onResolve={() => onNavigate('resolve')} />
        ))}
      </div>

      {/* Empty state hint */}
      <Card className="bg-brand-50 border border-brand-100">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
            <Wallet size={18} className="text-brand-600" />
          </div>
          <div>
            <p className="font-bold text-brand-800 text-sm">Need help managing?</p>
            <p className="text-brand-700 text-xs mt-1 leading-relaxed">
              Go to the Resolve tab to see personalized pathways for each overdue loan.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
