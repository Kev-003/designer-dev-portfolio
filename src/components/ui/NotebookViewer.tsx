"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2, AlertTriangle } from "lucide-react";

type Cell = {
  cell_type: "markdown" | "code" | "raw";
  source: string[];
  outputs?: Output[];
};

type Output = {
  output_type: string;
  text?: string[];
  data?: {
    "text/plain"?: string[];
    "text/html"?: string | string[];
    "image/png"?: string | string[];
    "image/jpeg"?: string | string[];
  };
};

type NotebookViewerProps = {
  rawUrl: string;
  colabUrl?: string;
};

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "success"; cells: Cell[] }
  | { status: "error"; message: string };

function CodeCell({ source }: { source: string[] }) {
  return (
    <div className="rounded-lg overflow-hidden border border-zinc-800 my-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
          code
        </span>
      </div>
      <pre className="bg-zinc-950 px-4 py-3 overflow-x-auto text-zinc-300 font-mono text-xs leading-relaxed">
        <code>{source.join("")}</code>
      </pre>
    </div>
  );
}

function OutputCell({ outputs }: { outputs: Output[] }) {
  if (!outputs.length) return null;

  return (
    <div className="ml-4 border-l-2 border-zinc-800 pl-4 my-2 flex flex-col gap-2">
      {outputs.map((out, j) => {
        const cellKey = `output-${j}`;
        // ── Image (matplotlib, seaborn, etc.) ─────────────────────────────
        const imgData = out.data?.["image/png"] || out.data?.["image/jpeg"];
        if (imgData) {
          const mime = out.data?.["image/png"] ? "image/png" : "image/jpeg";
          const src = `data:${mime};base64,${Array.isArray(imgData) ? imgData.join("") : imgData}`;
          return (
            <img
              key={cellKey}
              src={src}
              alt={`Output ${j + 1}`}
              className="max-w-full h-auto rounded-lg border border-zinc-800"
            />
          );
        }

        // ── HTML (DataFrames, tables) ──────────────────────────────────────
        const html = out.data?.["text/html"];
        if (html) {
          const raw = Array.isArray(html) ? html.join("") : html;
          return (
            <div
              key={cellKey}
              className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950"
            >
              <style>{`
                .nb-table table { width: 100%; border-collapse: collapse; font-size: 11px; font-family: monospace; }
                .nb-table th { background: #27272a; color: #a1a1aa; padding: 6px 12px; text-align: left; border-bottom: 1px solid #3f3f46; font-weight: 500; white-space: nowrap; }
                .nb-table td { color: #d4d4d8; padding: 5px 12px; border-bottom: 1px solid #27272a; white-space: nowrap; }
                .nb-table tr:last-child td { border-bottom: none; }
                .nb-table tr:hover td { background: #27272a; }
              `}</style>
              <div
                className="nb-table p-2"
                dangerouslySetInnerHTML={{ __html: raw }}
              />
            </div>
          );
        }

        // ── Plain text fallback ────────────────────────────────────────────
        const text =
          out.text?.join("") ?? out.data?.["text/plain"]?.join("") ?? "";
        if (!text) return null;
        return (
          <pre
            key={cellKey}
            className="font-mono text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed"
          >
            {text}
          </pre>
        );
      })}
    </div>
  );
}

function parseMarkdownTable(lines: string[]): string {
  const rows = lines.map((l) =>
    l
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim()),
  );
  const [header, , ...body] = rows; // skip separator row
  const th = header.map((c) => `<th>${c}</th>`).join("");
  const trs = body
    .map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("");
  return `<table><thead><tr>${th}</tr></thead><tbody>${trs}</tbody></table>`;
}

function MarkdownCell({ source }: { source: string[] }) {
  const text = source.join("");
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Table detection ───────────────────────────────────────────────────
    if (/^\|/.test(line) && lines[i + 1] && /^\|[-| :]+\|/.test(lines[i + 1])) {
      const tableLines: string[] = [];
      const tableStartIndex = i;
      while (i < lines.length && /^\|/.test(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      const html = parseMarkdownTable(tableLines);
      elements.push(
        <div
          key={`table-${tableStartIndex}`}
          className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 my-4"
        >
          <style>{`
            .nb-md-table table { width: 100%; border-collapse: collapse; font-size: 11px; font-family: monospace; }
            .nb-md-table th { background: #27272a; color: #a1a1aa; padding: 6px 12px; text-align: left; border-bottom: 1px solid #3f3f46; font-weight: 500; white-space: nowrap; }
            .nb-md-table td { color: #d4d4d8; padding: 5px 12px; border-bottom: 1px solid #27272a; }
            .nb-md-table tr:last-child td { border-bottom: none; }
            .nb-md-table tr:hover td { background: #27272a; }
          `}</style>
          <div
            className="nb-md-table p-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>,
      );
      continue;
    }

    // ── Headings ──────────────────────────────────────────────────────────
    const elementKey = `line-${i}`;
    if (/^### (.+)/.test(line)) {
      elements.push(
        <h3
          key={elementKey}
          className="text-white font-semibold text-base mt-5 mb-1"
        >
          {line.replace(/^### /, "")}
        </h3>,
      );
    } else if (/^## (.+)/.test(line)) {
      elements.push(
        <h2
          key={elementKey}
          className="text-white font-bold text-lg mt-6 mb-2 border-b border-zinc-800 pb-2"
        >
          {line.replace(/^## /, "")}
        </h2>,
      );
    } else if (/^# (.+)/.test(line)) {
      elements.push(
        <h1
          key={elementKey}
          className="text-white font-extrabold text-xl mt-6 mb-2 border-b border-zinc-700 pb-2"
        >
          {line.replace(/^# /, "")}
        </h1>,
      );
    } else if (line.trim() === "") {
      elements.push(<div key={elementKey} className="h-2" />);
    } else {
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(
          /`(.+?)`/g,
          '<code class="bg-zinc-800 px-1 py-0.5 rounded text-[11px] text-zinc-300 font-mono">$1</code>',
        );
      elements.push(
        <p
          key={elementKey}
          className="text-zinc-300 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />,
      );
    }
    i++;
  }

  return <div className="my-3">{elements}</div>;
}

export default function NotebookViewer({
  rawUrl,
  colabUrl,
}: NotebookViewerProps) {
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    setState({ status: "loading" });
    fetch(rawUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setState({ status: "success", cells: data.cells ?? [] }))
      .catch((err) => setState({ status: "error", message: err.message }));
  }, [rawUrl]);

  if (state.status === "idle" || state.status === "loading") {
    return (
      <div className="flex items-center justify-center gap-3 py-16 text-zinc-600">
        <Loader2 size={16} className="animate-spin" />
        <span className="font-mono text-[10px] uppercase tracking-widest">
          Loading notebook…
        </span>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-zinc-500">
        <AlertTriangle size={16} className="text-amber-500" />
        <p className="font-mono text-[10px] uppercase tracking-widest">
          {state.message}
        </p>
        {colabUrl && (
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-200 transition-colors mt-2"
          >
            <ExternalLink size={11} /> Open in Colab
          </a>
        )}
      </div>
    );
  }

  // EXPLICIT TYPE GUARD: Forces TypeScript to know state is purely "success" below this line.
  if (state.status !== "success") return null;

  return (
    <div className="flex flex-col">
      {state.cells.map((cell, i) => (
        <div key={i}>
          {cell.cell_type === "markdown" && (
            <MarkdownCell source={cell.source} />
          )}
          {cell.cell_type === "code" && (
            <>
              <CodeCell source={cell.source} />
              {cell.outputs && <OutputCell outputs={cell.outputs} />}
            </>
          )}
        </div>
      ))}

      {colabUrl && (
        <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ExternalLink size={10} /> Open in Colab
          </a>
        </div>
      )}
    </div>
  );
}
