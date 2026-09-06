import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { initializePositions, simulateTick, kineticEnergy } from '../engine/physics';

const LEVEL_COLORS = {
  beginner: { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)', text: '#34d399', glow: 'rgba(16, 185, 129, 0.15)' },
  intermediate: { bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)', text: '#60a5fa', glow: 'rgba(59, 130, 246, 0.15)' },
  advanced: { bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)', text: '#c084fc', glow: 'rgba(168, 85, 247, 0.15)' },
  expert: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', text: '#fbbf24', glow: 'rgba(245, 158, 11, 0.15)' },
};

export default function NodeGraph({ nodes: initialNodes, edges, graphColor, completedNodes, selectedNodeId, onNodeClick }) {
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const [physicsNodes, setPhysicsNodes] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [draggedNode, setDraggedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const nodesRef = useRef([]);
  const dragRef = useRef(null);
  const isSimulating = useRef(true);

  // Initialize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    setDimensions({ width: w, height: h });

    const positioned = initializePositions(initialNodes, w, h);
    nodesRef.current = positioned;
    setPhysicsNodes(positioned);
    isSimulating.current = true;
  }, [initialNodes]);

  // Physics loop
  useEffect(() => {
    if (dimensions.width === 0) return;

    let frameCount = 0;
    const loop = () => {
      const updated = simulateTick(
        nodesRef.current,
        edges,
        dimensions.width,
        dimensions.height,
        dragRef.current
      );
      nodesRef.current = updated;
      frameCount++;

      // Only re-render React state every 2 frames for performance
      if (frameCount % 2 === 0) {
        setPhysicsNodes([...updated]);
      }

      // Slow down simulation if energy is low
      const energy = kineticEnergy(updated);
      if (energy < 0.01 && !dragRef.current) {
        isSimulating.current = false;
      }

      if (isSimulating.current || dragRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
      } else {
        // Keep a slow check loop
        setTimeout(() => {
          isSimulating.current = true;
          animFrameRef.current = requestAnimationFrame(loop);
        }, 500);
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [dimensions, edges]);

  // Drag handling
  const handlePointerDown = useCallback((e, node) => {
    e.stopPropagation();
    e.preventDefault();
    dragRef.current = node.id;
    setDraggedNode(node.id);
    isSimulating.current = true;

    const onMove = (ev) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      nodesRef.current = nodesRef.current.map(n =>
        n.id === node.id ? { ...n, x, y, vx: 0, vy: 0 } : n
      );
    };

    const onUp = () => {
      dragRef.current = null;
      setDraggedNode(null);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, []);

  // Build node map for edge rendering
  const nodeMap = {};
  physicsNodes.forEach(n => { nodeMap[n.id] = n; });

  return (
    <div ref={containerRef} className="absolute inset-0 top-16 canvas-grab">
      {/* SVG edges layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.4" />
          </linearGradient>
          <filter id="edgeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {edges.map((edge, i) => {
          const source = nodeMap[edge.source];
          const target = nodeMap[edge.target];
          if (!source || !target) return null;

          const isActive = hoveredNode === edge.source || hoveredNode === edge.target ||
                          selectedNodeId === edge.source || selectedNodeId === edge.target;

          return (
            <line
              key={`edge-${i}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="url(#edgeGradient)"
              strokeWidth={isActive ? 2 : 1}
              opacity={isActive ? 0.6 : 0.15}
              filter={isActive ? 'url(#edgeGlow)' : undefined}
              style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
            />
          );
        })}
      </svg>

      {/* Nodes layer */}
      {physicsNodes.map((node, i) => {
        const colors = LEVEL_COLORS[node.level] || LEVEL_COLORS.beginner;
        const isSelected = selectedNodeId === node.id;
        const isCompleted = completedNodes.has(node.id);
        const isHovered = hoveredNode === node.id;
        const isDragging = draggedNode === node.id;

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: isDragging ? 1.15 : isSelected ? 1.1 : isHovered ? 1.05 : 1,
            }}
            transition={{
              opacity: { delay: i * 0.05, duration: 0.5 },
              scale: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            className="absolute select-none"
            style={{
              left: node.x,
              top: node.y,
              transform: 'translate(-50%, -50%)',
              zIndex: isDragging ? 50 : isSelected ? 40 : isHovered ? 30 : 2,
              cursor: isDragging ? 'grabbing' : 'pointer',
            }}
            onPointerDown={(e) => handlePointerDown(e, node)}
            onClick={() => onNodeClick(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-3 rounded-2xl transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
                opacity: isSelected || isHovered ? 1 : 0,
              }}
            />

            {/* Node card */}
            <div
              className="relative px-4 py-3 rounded-xl transition-all duration-200"
              style={{
                background: isCompleted
                  ? 'rgba(16, 185, 129, 0.15)'
                  : colors.bg,
                border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.4)' : isSelected ? colors.text : colors.border}`,
                backdropFilter: 'blur(16px)',
                boxShadow: isSelected || isHovered
                  ? `0 0 30px ${colors.glow}, 0 8px 32px rgba(0,0,0,0.3)`
                  : '0 4px 16px rgba(0,0,0,0.2)',
                minWidth: '120px',
                maxWidth: '180px',
              }}
            >
              {/* Completion check */}
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg leading-none">{node.icon}</span>
                <span
                  className="text-[12px] font-semibold leading-tight"
                  style={{ color: isCompleted ? '#34d399' : colors.text }}
                >
                  {node.name}
                </span>
              </div>

              {/* Level badge */}
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                  style={{
                    background: colors.bg,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {node.level}
                </span>
                <span className="text-[10px] text-white/30 font-medium">{node.est}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
