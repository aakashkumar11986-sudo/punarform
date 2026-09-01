export function ScoreGauge({ score }: { score: number }) {
  const radius = 72;
  const circumference = Math.PI * radius; // semicircle
  // Map 300–900 to 0–100%
  const pct = Math.max(0, Math.min(100, ((score - 300) / (900 - 300)) * 100));
  const offset = circumference - (pct / 100) * circumference;

  // Color based on score band
  const band = score >= 750
    ? { color: '#22a27c', label: 'Good', bg: 'text-mint-600' }
    : score >= 650
      ? { color: '#48bd97', label: 'Fair', bg: 'text-mint-500' }
      : score >= 550
      ? { color: '#e0992a', label: 'Needs Work', bg: 'text-amber-500' }
      : { color: '#c0563a', label: 'Poor', bg: 'text-orange-600' };

  return (
    <div className="relative flex flex-col items-center">
      <svg width="180" height="104" viewBox="0 0 180 104" className="overflow-visible">
        {/* Track */}
        <path
          d="M 18 94 A 72 72 0 0 1 162 94"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d="M 18 94 A 72 72 0 0 1 162 94"
          fill="none"
          stroke={band.color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        {/* Tick marks */}
        {[300, 500, 700, 900].map((tick) => {
          const angle = ((tick - 300) / 600) * Math.PI;
          const x1 = 90 - Math.cos(angle) * 64;
          const y1 = 94 - Math.sin(angle) * 64;
          const x2 = 90 - Math.cos(angle) * 58;
          const y2 = 94 - Math.sin(angle) * 58;
          return (
            <line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="absolute top-7 flex flex-col items-center">
        <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{score}</span>
        <span className={`text-xs font-semibold ${band.bg}`}>{band.label}</span>
      </div>
    </div>
  );
}
