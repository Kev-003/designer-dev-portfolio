"use client";
import React, { useMemo, useCallback, useEffect } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  ReactFlowProvider,
  useReactFlow,
  type NodeProps,
  type EdgeProps,
  BaseEdge,
  getSmoothStepPath,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { parseMindMap } from "@/lib/mind-map";

// ─── Dynamic Edge ─────────────────────────────────────────────────────────────

function ConceptEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
}: EdgeProps) {
  // Pick source/target positions based on relative angle
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  let sourcePos: Position;
  let targetPos: Position;

  if (absDx > absDy) {
    sourcePos = dx > 0 ? Position.Right : Position.Left;
    targetPos = dx > 0 ? Position.Left : Position.Right;
  } else {
    sourcePos = dy > 0 ? Position.Bottom : Position.Top;
    targetPos = dy > 0 ? Position.Top : Position.Bottom;
  }

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: sourcePos,
    targetX,
    targetY,
    targetPosition: targetPos,
    borderRadius: 6,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ stroke: "#3f3f46", strokeWidth: 1.5, ...style }}
    />
  );
}

// ─── Nodes ────────────────────────────────────────────────────────────────────

function RootNode({ data }: NodeProps) {
  return (
    <div className="px-5 py-2.5 rounded-xl bg-brand text-white font-bold text-sm tracking-wide shadow-lg shadow-brand/20 border border-brand/40 whitespace-nowrap relative">
      {data.label as string}
      <Handle
        type="source"
        position={Position.Right}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="source"
        position={Position.Top}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!opacity-0 !w-1 !h-1"
      />
    </div>
  );
}

function ConceptNode({ data }: NodeProps) {
  return (
    <div className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-[11px] uppercase tracking-widest whitespace-nowrap relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="!opacity-0 !w-1 !h-1"
      />
      {data.label as string}
      <Handle
        type="source"
        position={Position.Right}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="source"
        position={Position.Top}
        className="!opacity-0 !w-1 !h-1"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!opacity-0 !w-1 !h-1"
      />
    </div>
  );
}

// ─── Config ───────────────────────────────────────────────────────────────────

const nodeTypes = { root: RootNode, concept: ConceptNode };
const edgeTypes = { default: ConceptEdge };
const elk = new ELK();

const elkOptions = {
  "elk.algorithm": "org.eclipse.elk.radial",
  "elk.radial.center": "true",
  "elk.spacing.nodeNode": "30", // was 100
  "elk.radial.radius": "120", // was 250
  "elk.radial.compactor": "WEDGE",
};

// ─── Inner ────────────────────────────────────────────────────────────────────

function MindMapInner({ dsl }: { dsl: string }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => parseMindMap(dsl),
    [dsl],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView, getNodes, getEdges } = useReactFlow();
  const [isLayouted, setIsLayouted] = React.useState(false);

  const performLayout = useCallback(async () => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();

    const graph = {
      id: "root",
      layoutOptions: elkOptions,
      children: currentNodes.map((node) => ({
        ...node,
        width: node.measured?.width ?? 120,
        height: node.measured?.height ?? 36,
      })),
      edges: currentEdges.map((edge) => ({
        ...edge,
        sources: [edge.source],
        targets: [edge.target],
      })),
    };

    try {
      const layouted = await elk.layout(graph);
      const newNodes = currentNodes.map((n) => {
        const ln = layouted.children?.find((c) => c.id === n.id);
        return { ...n, position: { x: ln?.x ?? 0, y: ln?.y ?? 0 } };
      });
      setNodes(newNodes);
      setIsLayouted(true);
      window.requestAnimationFrame(() =>
        fitView({ duration: 600, padding: 0.25 }),
      );
    } catch (err) {
      console.error("ELK layout failed:", err);
    }
  }, [fitView, getNodes, getEdges, setNodes]);

  useEffect(() => {
    if (isLayouted) return;
    const hasMeasurements = nodes.every((n) => n.measured?.width);
    if (hasMeasurements) performLayout();
  }, [nodes, performLayout, isLayouted]);

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: "default",
          style: { stroke: "#3f3f46", strokeWidth: 1.5 },
        }}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        proOptions={{ hideAttribution: true }}
        colorMode="dark"
      >
        <Background color="#27272a" gap={24} size={1} />
      </ReactFlow>
    </div>
  );
}

export function MindMap({ dsl }: { dsl: string }) {
  return (
    <ReactFlowProvider>
      <MindMapInner dsl={dsl} />
    </ReactFlowProvider>
  );
}
