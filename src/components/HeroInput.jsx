import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  'Build a full-stack web app with React and Node.js',
  'Train a deep learning model for image classification',
  'Build a compiler from scratch',
  'Create a cross-platform mobile app with Flutter',
  'Design a distributed systems architecture',
  'Master machine learning for NLP',
  'Build a real-time multiplayer game engine',
  'Create a container orchestration platform',
];

export default function HeroInput({ onGenerate, isGenerating }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !isGenerating) {
      onGenerate(value.trim());
    }
  };

  const handleSuggestion = (text) => {
    setValue(text);
    onGenerate(text);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl w-full px-6">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-medium text-cyan-300/80 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AI-Powered Skill Decomposition
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-5xl sm:text-6xl font-extrabold text-center mb-4 leading-[1.1]"
      >
        <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
          Map Your Path to
        </span>
        <br />
        <span className="bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease-in-out_infinite]">
          Mastery
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-base text-white/40 text-center mb-10 max-w-lg leading-relaxed"
      >
        Enter any engineering or coding goal. Nexus Flow decomposes it into an interactive skill graph with actionable micro-projects.
      </motion.p>

      {/* Input */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative w-full max-w-xl mb-8"
      >
        <div className="relative group">
          {/* Glow border */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center glass-strong rounded-2xl">
            <div className="pl-5 pr-3 text-white/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g., Build a full-stack web app with React..."
              disabled={isGenerating}
              className="flex-1 bg-transparent py-4.5 pr-4 text-[15px] text-white placeholder-white/25 focus:outline-none disabled:opacity-50 font-medium"
              id="goal-input"
            />
            <motion.button
              type="submit"
              disabled={!value.trim() || isGenerating}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mr-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
            >
              {isGenerating ? 'Mapping...' : 'Generate'}
            </motion.button>
          </div>
        </div>
      </motion.form>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2 max-w-2xl"
      >
        {SUGGESTIONS.slice(0, 4).map((suggestion, i) => (
          <motion.button
            key={i}
            onClick={() => handleSuggestion(suggestion)}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl glass text-[12px] text-white/40 hover:text-white/70 transition-all duration-300 hover:border-white/10 disabled:opacity-30"
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
