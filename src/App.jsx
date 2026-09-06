import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NodeGraph from './components/NodeGraph';
import SidePanel from './components/SidePanel';
import HeroInput from './components/HeroInput';
import ParticleField from './components/ParticleField';
import StatsBar from './components/StatsBar';
import { generateSkillGraph } from './data/skillGenerator';

export default function App() {
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [completedNodes, setCompletedNodes] = useState(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const containerRef = useRef(null);

  const handleGenerate = useCallback((goal) => {
    setIsGenerating(true);
    setSelectedNode(null);
    setCompletedNodes(new Set());

    // Simulated generation delay for dramatic effect
    setTimeout(() => {
      const data = generateSkillGraph(goal);
      setGraphData(data);
      setIsGenerating(false);
    }, 1200);
  }, []);

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleToggleComplete = useCallback((nodeId) => {
    setCompletedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setGraphData(null);
    setSelectedNode(null);
    setCompletedNodes(new Set());
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050510] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      <ParticleField />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full bg-purple-500/[0.04] blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/[0.02] blur-[200px]" />
      </div>

      {/* Header */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4">
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-md -z-10" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Nexus Flow
            </h1>
            <p className="text-[10px] font-medium text-white/30 tracking-widest uppercase -mt-0.5">
              Skill Graph Engine
            </p>
          </div>
        </motion.div>

        {graphData && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <StatsBar
              total={graphData.nodes.length}
              completed={completedNodes.size}
              category={graphData.category}
            />
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg glass text-xs font-medium text-white/60 hover:text-white/90 transition-colors"
            >
              New Goal
            </motion.button>
          </motion.div>
        )}
      </header>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!graphData ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <HeroInput onGenerate={handleGenerate} isGenerating={isGenerating} />
          </motion.div>
        ) : (
          <motion.div
            key="graph"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10"
          >
            <NodeGraph
              nodes={graphData.nodes}
              edges={graphData.edges}
              graphColor={graphData.color}
              completedNodes={completedNodes}
              selectedNodeId={selectedNode?.id}
              onNodeClick={handleNodeClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {selectedNode && (
          <SidePanel
            node={selectedNode}
            isCompleted={completedNodes.has(selectedNode.id)}
            onClose={handleClosePanel}
            onToggleComplete={() => handleToggleComplete(selectedNode.id)}
          />
        )}
      </AnimatePresence>

      {/* Generation overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-1 rounded-full border-2 border-purple-400/50 border-t-transparent"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border-2 border-cyan-300/70 border-b-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <motion.p
                className="text-sm font-medium text-white/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Decomposing your goal into micro-skills...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
