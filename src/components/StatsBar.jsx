import { motion } from 'framer-motion';

export default function StatsBar({ total, completed, category }) {
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4">
      {/* Category badge */}
      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-[11px] font-semibold text-purple-300/70 uppercase tracking-wider">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        {category}
      </span>

      {/* Progress pill */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg glass">
        <span className="text-[11px] font-semibold text-white/50">
          {completed}/{total}
        </span>
        <div className="w-20 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          />
        </div>
        <span className="text-[10px] font-bold text-cyan-400/60">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
