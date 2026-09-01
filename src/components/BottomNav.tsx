import { Home, Wallet, Compass, TrendingUp } from 'lucide-react';

export type TabId = 'home' | 'loans' | 'resolve' | 'progress';

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'loans', label: 'Loans', icon: Wallet },
  { id: 'resolve', label: 'Resolve', icon: Compass },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 safe-bottom z-50">
      <div className="flex items-center justify-around px-2 pt-2 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 transition-all duration-200"
            >
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 scale-105'
                    : 'text-slate-400 scale-100'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[11px] font-semibold tracking-tight transition-colors duration-200 ${
                  isActive ? 'text-brand-600' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
