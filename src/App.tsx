import { useState } from 'react';
import { BottomNav, type TabId } from '@/components/BottomNav';
import { HomeScreen } from '@/screens/HomeScreen';
import { LoansScreen } from '@/screens/LoansScreen';
import { ResolveScreen } from '@/screens/ResolveScreen';
import { ProgressScreen } from '@/screens/ProgressScreen';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
      {/* Phone frame — full-width on mobile, centered frame on >=480px */}
      <div className="relative w-full min-h-screen bg-slate-50 overflow-hidden min-[480px]:w-[390px] min-[480px]:h-[844px] min-[480px]:min-h-0 min-[480px]:rounded-[24px] min-[480px]:shadow-lg min-[480px]:border min-[480px]:border-slate-800/50">
        {/* Notch — desktop only */}
        <div className="hidden min-[480px]:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900/80 rounded-b-2xl z-50" />

        {/* Status bar — desktop only */}
        <div className="hidden min-[480px]:flex absolute top-0 left-0 right-0 h-11 z-40 items-center justify-between px-8 pt-2">
          <span className="text-xs font-semibold text-slate-800">9:41</span>
          <div className="flex items-center gap-1.5 text-slate-800">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <rect x="0" y="3" width="3" height="4" rx="0.5" fill="currentColor" />
              <rect x="4.5" y="2" width="3" height="5" rx="0.5" fill="currentColor" />
              <rect x="9" y="1" width="3" height="6" rx="0.5" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="7" rx="0.5" fill="currentColor" />
            </svg>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <path d="M8 2.5C9.5 2.5 10.9 3.1 12 4L13 3C11.6 1.7 9.9 1 8 1C6.1 1 4.4 1.7 3 3L4 4C5.1 3.1 6.5 2.5 8 2.5Z" fill="currentColor"/>
              <path d="M8 5.5C8.8 5.5 9.5 5.8 10 6.3L11 5.3C10.2 4.5 9.1 4 8 4C6.9 4 5.8 4.5 5 5.3L6 6.3C6.5 5.8 7.2 5.5 8 5.5Z" fill="currentColor"/>
              <circle cx="8" cy="8.5" r="1.5" fill="currentColor"/>
            </svg>
            <div className="flex items-center">
              <div className="w-6 h-3 border border-slate-800 rounded-[3px] relative">
                <div className="absolute inset-0.5 bg-slate-800 rounded-[1px]" style={{ width: '70%' }} />
              </div>
              <div className="w-0.5 h-1.5 bg-slate-800 rounded-r-sm" />
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="absolute top-0 bottom-[68px] left-0 right-0 overflow-y-auto no-scrollbar min-[480px]:top-11">
          {activeTab === 'home' && <HomeScreen onNavigate={setActiveTab} />}
          {activeTab === 'loans' && <LoansScreen onNavigate={setActiveTab} />}
          {activeTab === 'resolve' && <ResolveScreen />}
          {activeTab === 'progress' && <ProgressScreen />}
        </div>

        {/* Bottom navigation */}
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
