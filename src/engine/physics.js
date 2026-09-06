// ─── Physics Engine ───
// A simple Verlet-style force-directed layout for the node graph.
// Handles: repulsion between nodes, spring forces on edges, boundary collision, damping.

const REPULSION_STRENGTH = 8000;
const SPRING_STRENGTH = 0.003;
const SPRING_LENGTH = 220;
const DAMPING = 0.92;
const CENTER_GRAVITY = 0.0005;
const BOUNDARY_PADDING = 80;
const MAX_VELOCITY = 8;

/**
 * Initialize node positions in a circular + randomized layout
 */
export function initializePositions(nodes, width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.3;
  
  return nodes.map((node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length;
    const jitterX = (Math.random() - 0.5) * 120;
    const jitterY = (Math.random() - 0.5) * 120;
    
    return {
      ...node,
      x: cx + Math.cos(angle) * radius + jitterX,
      y: cy + Math.sin(angle) * radius + jitterY,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    };
  });
}

/**
 * Run one tick of the physics simulation
 */
export function simulateTick(nodes, edges, width, height, draggedId = null) {
  const updated = nodes.map(n => ({ ...n }));
  
  // ─── Repulsion (Coulomb's Law) ───
  for (let i = 0; i < updated.length; i++) {
    for (let j = i + 1; j < updated.length; j++) {
      const dx = updated[j].x - updated[i].x;
      const dy = updated[j].y - updated[i].y;
      const distSq = dx * dx + dy * dy + 1;
      const dist = Math.sqrt(distSq);
      
      const force = REPULSION_STRENGTH / distSq;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      
      if (updated[i].id !== draggedId) {
        updated[i].vx -= fx;
        updated[i].vy -= fy;
      }
      if (updated[j].id !== draggedId) {
        updated[j].vx += fx;
        updated[j].vy += fy;
      }
    }
  }

  // ─── Spring Forces (Hooke's Law) ───
  const nodeMap = {};
  updated.forEach(n => { nodeMap[n.id] = n; });
  
  for (const edge of edges) {
    const source = nodeMap[edge.source];
    const target = nodeMap[edge.target];
    if (!source || !target) continue;
    
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dist = Math.sqrt(dx * dx + dy * dy) + 1;
    
    const displacement = dist - SPRING_LENGTH;
    const force = SPRING_STRENGTH * displacement;
    
    const fx = (dx / dist) * force;
    const fy = (dy / dist) * force;
    
    if (source.id !== draggedId) {
      source.vx += fx;
      source.vy += fy;
    }
    if (target.id !== draggedId) {
      target.vx -= fx;
      target.vy -= fy;
    }
  }

  // ─── Center Gravity ───
  const cx = width / 2;
  const cy = height / 2;
  
  for (const node of updated) {
    if (node.id === draggedId) continue;
    
    node.vx += (cx - node.x) * CENTER_GRAVITY;
    node.vy += (cy - node.y) * CENTER_GRAVITY;
  }

  // ─── Integration + Damping ───
  for (const node of updated) {
    if (node.id === draggedId) {
      node.vx = 0;
      node.vy = 0;
      continue;
    }
    
    // Clamp velocity
    const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    if (speed > MAX_VELOCITY) {
      node.vx = (node.vx / speed) * MAX_VELOCITY;
      node.vy = (node.vy / speed) * MAX_VELOCITY;
    }
    
    node.vx *= DAMPING;
    node.vy *= DAMPING;
    
    node.x += node.vx;
    node.y += node.vy;
    
    // Boundary collision
    if (node.x < BOUNDARY_PADDING) {
      node.x = BOUNDARY_PADDING;
      node.vx *= -0.5;
    }
    if (node.x > width - BOUNDARY_PADDING) {
      node.x = width - BOUNDARY_PADDING;
      node.vx *= -0.5;
    }
    if (node.y < BOUNDARY_PADDING) {
      node.y = BOUNDARY_PADDING;
      node.vy *= -0.5;
    }
    if (node.y > height - BOUNDARY_PADDING) {
      node.y = height - BOUNDARY_PADDING;
      node.vy *= -0.5;
    }
  }
  
  return updated;
}

/**
 * Calculate total kinetic energy for convergence detection
 */
export function kineticEnergy(nodes) {
  return nodes.reduce((sum, n) => sum + n.vx * n.vx + n.vy * n.vy, 0);
}
