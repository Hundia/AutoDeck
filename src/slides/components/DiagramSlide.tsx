import { motion } from 'framer-motion';
import type { SlideComponentProps } from '../../engine/types';

interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  col: number;
  row: number;
  color?: 'blue' | 'violet' | 'emerald' | 'amber' | 'cyan' | 'slate';
}

interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

interface DiagramSlideData {
  type: 'diagram';
  mode: 'arch' | 'sequence' | 'er';
  title: string;
  subtitle?: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

const NODE_W = 140;
const NODE_H = 50;
const NODE_H_ER = 80;

const colorMap: Record<string, { fill: string; stroke: string }> = {
  blue:    { fill: '#1e3a5f', stroke: '#3b82f6' },
  violet:  { fill: '#2d1b4e', stroke: '#8b5cf6' },
  emerald: { fill: '#064e3b', stroke: '#10b981' },
  amber:   { fill: '#451a03', stroke: '#f59e0b' },
  cyan:    { fill: '#0c3344', stroke: '#06b6d4' },
  slate:   { fill: '#1e293b', stroke: '#475569' },
};

function nodeCenter(node: DiagramNode, erMode = false): { x: number; y: number } {
  const h = erMode ? NODE_H_ER : NODE_H;
  return {
    x: node.col * 200 + 80 + NODE_W / 2,
    y: node.row * 120 + 60 + h / 2,
  };
}

function cubicBezierPath(
  x1: number, y1: number,
  x2: number, y2: number
): string {
  const dx = Math.abs(x2 - x1);
  const cx1 = x1 + dx * 0.5;
  const cx2 = x2 - dx * 0.5;
  return `M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`;
}

export default function DiagramSlide({ data }: SlideComponentProps<DiagramSlideData>) {
  const isER = data.mode === 'er';
  const isSequence = data.mode === 'sequence';

  const nodeMap = new Map<string, DiagramNode>(data.nodes.map(n => [n.id, n]));

  return (
    <div className="max-w-5xl mx-auto w-full">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-3 text-white"
      >
        {data.title}
      </motion.h2>

      {data.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 text-lg mb-6"
        >
          {data.subtitle}
        </motion.p>
      )}

      <div className="relative">
        {/* Mode badge */}
        <span className="absolute top-2 right-2 text-xs font-mono bg-slate-800/80 border border-slate-700 px-2 py-1 rounded text-slate-400 uppercase z-10">
          {data.mode}
        </span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/80 rounded-xl border border-slate-700/60 overflow-hidden"
        >
          <svg viewBox="0 0 800 500" className="w-full h-auto">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#64748b" />
              </marker>
            </defs>

            {/* Sequence mode: vertical dashed lifelines */}
            {isSequence && data.nodes.map(node => {
              const cx = node.col * 200 + 80 + NODE_W / 2;
              const topY = 60 + NODE_H;
              return (
                <line
                  key={`lifeline-${node.id}`}
                  x1={cx} y1={topY}
                  x2={cx} y2={topY + 400}
                  stroke="#475569"
                  strokeWidth="1"
                  strokeDasharray="6 4"
                />
              );
            })}

            {/* Nodes */}
            {data.nodes.map(node => {
              const colors = colorMap[node.color ?? 'slate'];
              const rx = node.col * 200 + 80;
              const ry = node.row * 120 + 60;
              const nodeH = isER ? NODE_H_ER : NODE_H;
              const cx = rx + NODE_W / 2;

              if (isER) {
                const fields = node.sublabel ? node.sublabel.split(',').map(f => f.trim()) : [];
                const headerH = 26;
                const fieldRowH = 18;
                const totalH = headerH + fields.length * fieldRowH + 8;

                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {/* Outer rect */}
                    <rect
                      x={rx} y={ry}
                      width={NODE_W} height={totalH}
                      rx={6}
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth="1.5"
                    />
                    {/* Header bar */}
                    <rect
                      x={rx} y={ry}
                      width={NODE_W} height={headerH}
                      rx={6}
                      fill={colors.stroke}
                      fillOpacity="0.25"
                    />
                    {/* Fix rounded bottom of header bar */}
                    <rect
                      x={rx} y={ry + headerH - 4}
                      width={NODE_W} height={4}
                      fill={colors.stroke}
                      fillOpacity="0.25"
                    />
                    {/* Header divider */}
                    <line
                      x1={rx} y1={ry + headerH}
                      x2={rx + NODE_W} y2={ry + headerH}
                      stroke={colors.stroke}
                      strokeWidth="1"
                      strokeOpacity="0.5"
                    />
                    {/* Entity label */}
                    <text
                      x={cx} y={ry + 17}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.label}
                    </text>
                    {/* Fields */}
                    {fields.map((field, fi) => (
                      <text
                        key={fi}
                        x={rx + 8} y={ry + headerH + 14 + fi * fieldRowH}
                        textAnchor="start"
                        fill="#94a3b8"
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {field}
                      </text>
                    ))}
                  </motion.g>
                );
              }

              // arch / sequence node
              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <rect
                    x={rx} y={ry}
                    width={NODE_W} height={nodeH}
                    rx={8}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth="1.5"
                  />
                  <text
                    x={cx} y={ry + nodeH / 2 + (node.sublabel ? -6 : 5)}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="Inter, sans-serif"
                  >
                    {node.label}
                  </text>
                  {node.sublabel && !isER && (
                    <text
                      x={cx} y={ry + nodeH / 2 + 10}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.sublabel}
                    </text>
                  )}
                </motion.g>
              );
            })}

            {/* Edges */}
            {data.edges.map((edge, idx) => {
              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);
              if (!fromNode || !toNode) return null;

              if (isSequence) {
                // Horizontal message arrows at stepped y positions
                const fromCx = fromNode.col * 200 + 80 + NODE_W / 2;
                const toCx = toNode.col * 200 + 80 + NODE_W / 2;
                const arrowY = idx * 80 + 100 + NODE_H;
                const midX = (fromCx + toCx) / 2;

                return (
                  <g key={`edge-${idx}`}>
                    <motion.line
                      x1={fromCx} y1={arrowY}
                      x2={toCx} y2={arrowY}
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeDasharray={edge.dashed ? '6 3' : undefined}
                      markerEnd="url(#arrow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
                    />
                    {edge.label && (
                      <text
                        x={midX} y={arrowY - 6}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="9"
                        fontFamily="Inter, sans-serif"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              }

              // arch / er edges — cubic bezier
              const from = nodeCenter(fromNode, isER);
              const to = nodeCenter(toNode, isER);
              const pathD = cubicBezierPath(from.x, from.y, to.x, to.y);
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2;

              return (
                <g key={`edge-${idx}`}>
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray={edge.dashed ? '6 3' : undefined}
                    markerEnd="url(#arrow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
                  />
                  {edge.label && (
                    <text
                      x={midX} y={midY - 6}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontFamily="Inter, sans-serif"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
