import { useState } from 'react';
import {
  Send,
  MessageSquare,
  Handshake,
  CheckCircle2,
  CreditCard,
  Percent,
  CheckCircle,
  Calendar,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';
import { Card, Badge, Avatar, ProgressBar, formatINRFull, SectionHeader } from '@/components/ui';
import { resolutionProgress, creditScoreTimeline, rebuildTips } from '@/data';
import type { ResolutionStage } from '@/data';

const stages: { key: ResolutionStage; label: string; icon: typeof Send }[] = [
  { key: 'Requested', label: 'Requested', icon: Send },
  { key: 'Negotiating', label: 'Negotiating', icon: MessageSquare },
  { key: 'Agreed', label: 'Agreed', icon: Handshake },
  { key: 'Closed', label: 'Closed', icon: CheckCircle2 },
];

function stageIndex(stage: ResolutionStage): number {
  return stages.findIndex((s) => s.key === stage);
}

const tipIcons: Record<string, typeof CreditCard> = {
  'credit-card': CreditCard,
  percent: Percent,
  'check-circle': CheckCircle,
};

function ProgressTrackerCard({
  item,
}: {
  item: (typeof resolutionProgress)[number];
}) {
  const currentIdx = stageIndex(item.stage);
  const progressPct = ((currentIdx + 1) / stages.length) * 100;

  return (
    <Card className="mb-3">
      <div className="flex items-center gap-3 mb-4">
        <Avatar initial={item.lender[0]} color="bg-brand-600" size="w-10 h-10" />
        <div className="flex-1">
          <h3 className="font-bold text-slate-800 text-sm">{item.lender}</h3>
          <p className="text-xs text-slate-400">{item.type} · {item.pathway}</p>
        </div>
        <Badge variant="resolution">{item.stage}</Badge>
      </div>

      {/* Stage pipeline */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx <= currentIdx;
            const isCurrent = idx === currentIdx;
            return (
              <div key={stage.key} className="flex flex-col items-center gap-1.5 flex-1 relative z-10">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isDone
                      ? isCurrent
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 scale-110'
                        : 'bg-mint-500 text-white'
                      : 'bg-slate-100 text-slate-300'
                  }`}
                >
                  <Icon size={16} />
                </div>
                <span
                  className={`text-[10px] font-semibold text-center ${
                    isDone ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
        {/* Connector line */}
        <div className="absolute top-[18px] left-0 right-0 h-0.5 bg-slate-100 -z-0" style={{ margin: '0 12%' }}>
          <div
            className="h-full bg-mint-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-slate-400 font-medium">Target Settlement</p>
          <p className="text-sm font-bold text-slate-800">{formatINRFull(item.targetAmount)}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-slate-400 font-medium">Expected Close</p>
          <p className="text-sm font-bold text-brand-600">{item.expectedClose}</p>
        </div>
      </div>
    </Card>
  );
}

function ScoreTimelineChart() {
  const maxScore = 900;
  const minScore = 300;
  const range = maxScore - minScore;
  const chartHeight = 120;
  const chartWidth = 300;
  const stepX = chartWidth / (creditScoreTimeline.length - 1);

  const points = creditScoreTimeline.map((d, i) => ({
    x: i * stepX,
    y: chartHeight - ((d.score - minScore) / range) * chartHeight,
    ...d,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="relative">
      <svg width={chartWidth} height={chartHeight + 20} viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`} className="w-full">
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3479fb" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3479fb" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1="0"
            y1={chartHeight * p}
            x2={chartWidth}
            y2={chartHeight * p}
            stroke="#eef2f7"
            strokeWidth="1"
          />
        ))}
        {/* Area */}
        <path d={areaD} fill="url(#scoreGrad)" />
        {/* Line */}
        <path d={pathD} fill="none" stroke="#3479fb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#3479fb" strokeWidth="2" />
            <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-[9px] font-bold fill-slate-700">
              {p.score}
            </text>
          </g>
        ))}
        {/* Month labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={chartHeight + 14}
            textAnchor="middle"
            className="text-[8px] fill-slate-400 font-medium"
          >
            {i === 0 ? 'Now' : `M${i}`}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function ProgressScreen() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'rebuild'>('tracker');

  return (
    <div className="px-4 pt-3 pb-4 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Progress</h1>
        <p className="text-sm text-slate-400 mt-0.5">Track resolution & rebuild your score</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex bg-slate-100 rounded-2xl p-1">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'tracker' ? 'bg-white text-brand-600 shadow-soft' : 'text-slate-400'
          }`}
        >
          Resolution Tracker
        </button>
        <button
          onClick={() => setActiveTab('rebuild')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === 'rebuild' ? 'bg-white text-brand-600 shadow-soft' : 'text-slate-400'
          }`}
        >
          Rebuild Plan
        </button>
      </div>

      {activeTab === 'tracker' ? (
        <div className="animate-fade-in">
          <SectionHeader
            title="Loans in Resolution"
            subtitle={`${resolutionProgress.length} active resolutions`}
          />
          {resolutionProgress.map((item) => (
            <ProgressTrackerCard key={item.loanId} item={item} />
          ))}

          <Card className="bg-mint-50 border border-mint-100 mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-mint-100 flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-mint-600" />
              </div>
              <div>
                <p className="font-bold text-mint-800 text-sm">1 loan fully closed</p>
                <p className="text-mint-700 text-xs mt-0.5">SBI Card · Settled Aug 2026</p>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="animate-fade-in space-y-4">
          {/* Score projection chart */}
          <Card>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-slate-800 text-base">Score Recovery</h2>
              <Badge variant="success">
                <TrendingUp size={12} /> +96 pts projected
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mb-3">Projected over 6 months</p>
            <ScoreTimelineChart />
            <div className="flex items-center gap-2 mt-3 p-3 bg-brand-50 rounded-2xl">
              <Calendar size={15} className="text-brand-600 shrink-0" />
              <p className="text-xs text-brand-700 leading-relaxed">
                Based on your current pathway, your score should reach{' '}
                <span className="font-bold">678</span> by Month 6 — entering the "Fair" band.
              </p>
            </div>
          </Card>

          {/* Rebuild tips */}
          <div>
            <SectionHeader title="Actionable Tips" subtitle="Do these to speed up recovery" />
            {rebuildTips.map((tip, idx) => {
              const Icon = tipIcons[tip.icon] ?? Lightbulb;
              return (
                <Card key={idx} className="mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-mint-50 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-mint-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-sm">{tip.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{tip.detail}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Milestone timeline */}
          <Card className="bg-gradient-to-br from-mint-600 to-mint-800 text-white border-0">
            <h3 className="font-bold text-sm mb-3">Your Recovery Milestones</h3>
            <div className="space-y-3">
              {creditScoreTimeline.slice(1).map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{m.label}</p>
                    <p className="text-mint-100 text-xs">{m.month} · Score {m.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
