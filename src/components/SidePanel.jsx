import { motion } from 'framer-motion';

const LEVEL_GRADIENT = {
  beginner: 'from-emerald-400 to-emerald-600',
  intermediate: 'from-blue-400 to-blue-600',
  advanced: 'from-purple-400 to-purple-600',
  expert: 'from-amber-400 to-amber-600',
};

const LEVEL_COLOR = {
  beginner: '#34d399',
  intermediate: '#60a5fa',
  advanced: '#c084fc',
  expert: '#fbbf24',
};

export default function SidePanel({ node, isCompleted, onClose, onToggleComplete }) {
  const levelColor = LEVEL_COLOR[node.level] || LEVEL_COLOR.beginner;
  const levelGradient = LEVEL_GRADIENT[node.level] || LEVEL_GRADIENT.beginner;

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 bottom-0 w-full max-w-md z-40 flex flex-col"
    >
      {/* Backdrop blur overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm -z-10"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative h-full glass-strong border-l border-white/[0.06] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white/80 transition-colors z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Header area */}
        <div className="relative px-6 pt-8 pb-6">
          {/* Decorative glow */}
          <div
            className="absolute top-0 left-0 right-0 h-48 opacity-30"
            style={{
              background: `radial-gradient(ellipse at top center, ${levelColor}20, transparent 70%)`,
            }}
          />

          {/* Icon */}
          <div className="relative mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: `linear-gradient(135deg, ${levelColor}20, ${levelColor}05)`,
                border: `1px solid ${levelColor}30`,
              }}
            >
              {node.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-2 pr-8">{node.name}</h2>

          {/* Level + Time badges */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gradient-to-r ${levelGradient} text-white`}
            >
              {node.level}
            </span>
            <span className="text-[11px] text-white/40 font-medium flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {node.est}
            </span>
            {isCompleted && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ✓ Completed
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed">
            {node.description}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Mini Project Section */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white/80">Mini Project</h3>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[13px] text-white/60 leading-relaxed">{node.project}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Resources Section */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white/80">Resources</h3>
          </div>
          <div className="space-y-2">
            {node.resources?.map((resource, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50 group-hover:bg-purple-400 transition-colors" />
                <span className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors">{resource}</span>
                <svg className="ml-auto w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-8" />

        {/* Action buttons */}
        <div className="sticky bottom-0 px-6 py-5 bg-gradient-to-t from-[#0a0a20] via-[#0a0a20] to-transparent">
          <motion.button
            onClick={onToggleComplete}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30'
            }`}
          >
            {isCompleted ? '✓ Mark as Incomplete' : 'Mark as Complete'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
