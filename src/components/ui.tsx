import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
  onClick,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padded?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl shadow-card transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:shadow-card-hover active:scale-[0.99]' : ''
      } ${padded ? 'p-5' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div>
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

type BadgeVariant = 'overdue' | 'active' | 'resolution' | 'neutral' | 'success' | 'warning';

const badgeStyles: Record<BadgeVariant, string> = {
  overdue: 'bg-orange-50 text-orange-700 border-orange-200',
  active: 'bg-mint-50 text-mint-700 border-mint-200',
  resolution: 'bg-brand-50 text-brand-700 border-brand-200',
  neutral: 'bg-slate-100 text-slate-600 border-slate-200',
  success: 'bg-mint-50 text-mint-700 border-mint-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
};

export function Badge({
  children,
  variant = 'neutral',
  className = '',
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  max = 100,
  color = 'bg-brand-500',
  height = 'h-2',
}: {
  value: number;
  max?: number;
  color?: string;
  height?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden`}>
      <div
        className={`${height} ${color} rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Avatar({
  initial,
  color = 'bg-brand-600',
  size = 'w-11 h-11',
}: {
  initial: string;
  color?: string;
  size?: string;
}) {
  return (
    <div
      className={`${size} ${color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0`}
    >
      {initial}
    </div>
  );
}

export function formatINR(amount: number): string {
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1);
    return `₹${lakhs}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatINRFull(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
