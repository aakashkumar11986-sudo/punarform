import { useState } from 'react';
import {
  Handshake,
  RefreshCw,
  LockOpen,
  ChevronDown,
  CheckCircle2,
  Circle,
  TrendingDown,
  TrendingUp,
  Minus,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Card, Badge, Avatar, formatINRFull, SectionHeader } from '@/components/ui';
import { loans, pathways } from '@/data';
import type { PathwayType } from '@/data';

const iconMap: Record<string, typeof Handshake> = {
  handshake: Handshake,
  refresh: RefreshCw,
  'lock-open': LockOpen,
};

function ScoreImpactBadge({ impact, trend }: { impact: string; trend: 'down' | 'neutral' | 'up' }) {
  const Icon = trend === 'down' ? TrendingDown : trend === 'up' ? TrendingUp : Minus;
  const color =
    trend === 'down'
      ? 'bg-orange-50 text-orange-600 border-orange-200'
      : trend === 'up'
      ? 'bg-mint-50 text-mint-600 border-mint-200'
      : 'bg-slate-100 text-slate-600 border-slate-200';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}>
      <Icon size={12} />
      {impact}
    </span>
  );
}

function PathwayCard({
  pathway,
  isExpanded,
  onToggle,
}: {
  pathway: (typeof pathways)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = iconMap[pathway.icon] ?? Handshake;

  return (
    <Card className="mb-3">
      <button onClick={onToggle} className="w-full text-left">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand-50 flex items-center justify-center shrink-0">
            <Icon size={22} className="text-brand-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">{pathway.type}</h3>
              <ChevronDown
                size={18}
                className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{pathway.tagline}</p>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in">
          <p className="text-sm text-slate-600 leading-relaxed">{pathway.description}</p>

          <div className="flex items-center gap-3 mt-3">
            <ScoreImpactBadge impact={pathway.scoreImpact} trend={pathway.scoreTrend} />
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
              <Clock size={12} />
              {pathway.timeline}
            </span>
          </div>

          {/* Checklist sections */}
          <div className="mt-4 space-y-4">
            {pathway.checklist.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                  {section.title}
                </p>
                <div className="space-y-2">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {idx === 0 && section.title === 'Preparation' ? (
                        <CheckCircle2 size={16} className="text-mint-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle size={16} className="text-slate-300 shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-slate-600 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-brand-600 text-white rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors active:scale-[0.98]">
            Start This Pathway
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </Card>
  );
}

export function ResolveScreen() {
  const overdueLoans = loans.filter((l) => l.status === 'Overdue');
  const [selectedLoanId, setSelectedLoanId] = useState(overdueLoans[0]?.id ?? loans[0].id);
  const [expandedPathway, setExpandedPathway] = useState<PathwayType | null>('Settlement');

  const selectedLoan = loans.find((l) => l.id === selectedLoanId) ?? loans[0];

  return (
    <div className="px-4 pt-3 pb-4 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Resolve</h1>
        <p className="text-sm text-slate-400 mt-0.5">Choose a path for each overdue loan</p>
      </div>

      {/* Loan selector */}
      <div>
        <SectionHeader title="Select Loan" subtitle="Which account to resolve?" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {overdueLoans.map((loan) => {
            const isActive = loan.id === selectedLoanId;
            return (
              <button
                key={loan.id}
                onClick={() => setSelectedLoanId(loan.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl border transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
                    isActive ? 'bg-white/20' : loan.lenderColor
                  }`}
                >
                  {loan.lenderInitial}
                </div>
                <div className="text-left">
                  <p className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {loan.lender}
                  </p>
                  <p className={`text-[11px] ${isActive ? 'text-brand-100' : 'text-slate-400'}`}>
                    {formatINRFull(loan.overdueAmount)} overdue
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected loan detail */}
      <Card className="bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-3">
          <Avatar initial={selectedLoan.lenderInitial} color={selectedLoan.lenderColor} />
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-sm">{selectedLoan.lender}</h3>
            <p className="text-xs text-slate-400">{selectedLoan.type} · {selectedLoan.daysPastDue} days past due</p>
          </div>
          <Badge variant="overdue">{formatINRFull(selectedLoan.overdueAmount)}</Badge>
        </div>
      </Card>

      {/* Pathways */}
      <div>
        <SectionHeader
          title="Resolution Pathways"
          subtitle="Tap a card to see the negotiation toolkit"
        />
        {pathways.map((pathway) => (
          <PathwayCard
            key={pathway.type}
            pathway={pathway}
            isExpanded={expandedPathway === pathway.type}
            onToggle={() =>
              setExpandedPathway(expandedPathway === pathway.type ? null : pathway.type)
            }
          />
        ))}
      </div>
    </div>
  );
}
