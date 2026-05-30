"use client";

import React from "react";

// Deterministic color per tag — centralized for all sections
const TAG_COLORS: Record<string, string> = {
  "Visual Systems Architecture": "bg-brand/10 text-brand border-brand/20",
  "Frontend Engineering": "bg-sky-500/10 text-sky-400 border-sky-500/25",
  "Full-Stack Engineering":
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  "Data Visualization": "bg-amber-500/10 text-amber-400 border-amber-500/25",
  "Content Architecture": "bg-rose-500/10 text-rose-400 border-rose-500/25",
  "Systems Design": "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
  "System Architecture": "bg-blue-500/10 text-blue-400 border-blue-500/25",
  "Database Design": "bg-violet-500/10 text-violet-400 border-violet-500/25",
  "Database Modeling": "bg-purple-500/10 text-purple-400 border-purple-500/25",
};

const TAG_DEFAULT = "bg-zinc-800/60 text-zinc-400 border-zinc-700";

interface ProjectTagProps {
  tag: string;
  className?: string;
}

export function ProjectTag({ tag, className = "" }: ProjectTagProps) {
  const colorStyles = TAG_COLORS[tag] ?? TAG_DEFAULT;

  return (
    <span
      className={`text-[10px] text-center uppercase tracking-widest font-mono px-2 py-0.5 rounded-sm border whitespace-nowrap transition-colors duration-300 ${colorStyles} ${className}`}
    >
      {tag}
    </span>
  );
}
