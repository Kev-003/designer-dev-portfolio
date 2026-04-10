import { type Node, type Edge } from '@xyflow/react';

type ParsedGraph = { nodes: Node[]; edges: Edge[] };

const toId = (label: string) =>
  label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export function parseMindMap(dsl: string): ParsedGraph {
  const lines = dsl
    .split('\n')
    .map(l => l.trimEnd())
    .filter(l => l.trim().length > 0);

  if (lines.length === 0) return { nodes: [], edges: [] };

  // Find the minimum indent and use it as baseline
  const nonCrossLines = lines.filter(l => !l.trim().includes('>'));
  const minIndent = Math.min(...nonCrossLines.map(l => l.search(/\S/)));

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const labelToId = new Map<string, string>();
  const depthCount: Record<number, number> = {};
  const stack: { id: string; indent: number }[] = [];

  for (const line of lines) {
    if (line.trim().includes('>')) continue;

    const indent = line.search(/\S/) - minIndent; // normalize
    const label = line.trim();
    const id = toId(label);
    const depth = indent / 2;

    // Track vertical position for this depth
    depthCount[depth] = (depthCount[depth] ?? 0);
    const yIndex = depthCount[depth];
    depthCount[depth]++;

    labelToId.set(label, id);

    // Create the node
    nodes.push({
      id,
      data: { label },
      position: { x: depth * 250, y: yIndex * 100 },
      type: depth === 0 ? 'root' : 'concept',
    });

    // Resolve hierarchy: Pop stack to find the parent
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    // Add edge to parent
    if (stack.length > 0) {
      const parent = stack[stack.length - 1];
      edges.push({
        id: `e-${parent.id}-${id}`,
        source: parent.id,
        target: id,
        type: 'default',
      });
    }

    stack.push({ id, indent });
  }

  // Second pass — cross-connections with ">"
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.includes('>')) continue;

    const [fromLabel, toLabel] = trimmed.split('>').map(s => s.trim());
    const fromId = labelToId.get(fromLabel);
    const toId2 = labelToId.get(toLabel);

    if (fromId && toId2) {
      edges.push({
        id: `cross-${fromId}-${toId2}`,
        source: fromId,
        target: toId2,
        type: 'default',
        style: { strokeDasharray: '4 2', opacity: 0.5 },
      });
    }
  }

  return { nodes, edges };
}