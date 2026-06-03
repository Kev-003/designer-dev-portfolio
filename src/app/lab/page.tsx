"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, X, ExternalLink, Code2 } from "lucide-react";
import gsap from "gsap";
import {
  LAB_ITEMS,
  LAB_TYPE_LABELS,
  LAB_STATUS_LABELS,
  LAB_STATUS_COLORS,
  type LabItem,
  type LabType,
} from "@/lib/lab";
import NotebookViewer from "@/components/ui/NotebookViewer";
import { CodeHighlighter } from "@/components/ui/CodeHighlighter";

// ─── Glitch Text ──────────────────────────────────────────────────────────────

const GLITCH_CHARS = "!@#$%^&*[]{}|<>?/\\~`±§";

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const glitch = () => {
    let iterations = 0;
    const maxIter = text.length * 3;
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterations / 3) return char;
            return GLITCH_CHARS[
              Math.floor(Math.random() * GLITCH_CHARS.length)
            ];
          })
          .join(""),
      );
      iterations++;
      if (iterations >= maxIter) {
        clearInterval(intervalRef.current!);
        setDisplay(text);
      }
    }, 30);
  };

  useEffect(() => {
    const timeout = setTimeout(glitch, 400);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span className={className} onMouseEnter={glitch}>
      {display}
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LabItem["status"] }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm border font-mono text-[9px] uppercase tracking-widest ${LAB_STATUS_COLORS[status]}`}
    >
      {status === "wip" && (
        <span className="w-1 h-1 rounded-full bg-amber-400 mr-1.5 animate-pulse" />
      )}
      {LAB_STATUS_LABELS[status]}
    </span>
  );
}

// ─── Type Badge ───────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: LabType }) {
  return (
    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
      {LAB_TYPE_LABELS[type]}
    </span>
  );
}

// ─── Lab Card ─────────────────────────────────────────────────────────────────

function LabCard({
  item,
  onClick,
  index,
}: {
  item: LabItem;
  onClick: (item: LabItem) => void;
  index: number;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const accent = item.accentColor ?? "#ffffff";

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: index * 0.06,
      },
    );
  }, [index]);

  const hasMedia =
    item.media.kind === "image" ||
    item.media.kind === "images" ||
    item.media.kind === "video";

  return (
    <button
      ref={cardRef}
      onClick={() => onClick(item)}
      className="group relative w-full text-left bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand backdrop-blur-sm"
    >
      <div
        className="h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ backgroundColor: accent }}
      />

      {hasMedia && (
        <div className="relative w-full aspect-video bg-zinc-800 overflow-hidden">
          {item.media.kind === "image" && (
            <Image
              src={item.media.url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {item.media.kind === "images" && (
            <Image
              src={item.media.urls[0]}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {item.media.kind === "video" && (
            <video
              src={item.media.url}
              muted
              loop
              playsInline
              autoPlay
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {!hasMedia && (
        <div
          className="w-full h-px"
          style={{ backgroundColor: `${accent}22` }}
        />
      )}

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <TypeBadge type={item.type} />
            <h3 className="text-white font-semibold text-base leading-snug">
              {item.title}
            </h3>
          </div>
          <StatusBadge status={item.status} />
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-1">
          <span className="font-mono text-[10px] text-zinc-600">
            {item.year}
          </span>
          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap justify-end">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-wider text-zinc-600 px-1.5 py-0.5 border border-zinc-800 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function LabLightbox({
  item,
  onClose,
}: {
  item: LabItem;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isClosing = useRef(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [notebookIndex, setNotebookIndex] = useState(0);

  const isNotebook = item.media.kind === "notebook";
  // Widen panel if it contains structured programmatic context like notebooks or code snippets
  const panelWidth = isNotebook || item.content ? "max-w-4xl" : "max-w-2xl";

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: "power2.out" },
    );
    gsap.fromTo(
      panelRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power3.out", delay: 0.05 },
    );
  }, []);

  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    gsap.to(panelRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      delay: 0.05,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  const images =
    item.media.kind === "images"
      ? item.media.urls
      : item.media.kind === "image"
        ? [item.media.url]
        : [];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end md:items-center justify-center p-4 md:p-8"
      onClick={handleClose}
    >
      <div
        box-id="lightbox-panel"
        ref={panelRef}
        className={`relative w-full ${panelWidth} bg-zinc-950 border border-zinc-800/50 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl max-h-[85vh] md:max-h-[90vh] flex flex-col transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <TypeBadge type={item.type} />
            <span className="text-zinc-700 text-xs">·</span>
            <StatusBadge status={item.status} />
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1el">
          {/* Video */}
          {item.media.kind === "video" && (
            <div className="aspect-video bg-zinc-900">
              <video
                src={item.media.url}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Image(s) */}
          {images.length > 0 && (
            <div className="relative aspect-video bg-zinc-900">
              <Image
                src={images[imageIndex]}
                alt={item.title}
                fill
                className="object-contain"
              />
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === imageIndex ? "bg-white scale-125" : "bg-zinc-600 hover:bg-zinc-400"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Embed */}
          {item.media.kind === "embed" && (
            <div className="aspect-video bg-zinc-900">
              <iframe
                src={item.media.url}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}

          {/* Meta section */}
          <div className="px-6 py-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-white text-2xl font-bold leading-tight">
                {item.title}
              </h2>
              <span className="font-mono text-xs text-zinc-600 shrink-0 mt-1">
                {item.year}
              </span>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed">
              {item.description}
            </p>

            {item.note && (
              <div className="border-l-2 border-zinc-800 pl-4">
                <p className="text-zinc-500 text-sm leading-relaxed italic">
                  {item.note}
                </p>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 px-2 py-1 border border-zinc-800 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Extra links */}
            {item.links && item.links.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                  Also in this project
                </span>
                {item.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors font-mono text-xs uppercase tracking-widest"
                  >
                    <ExternalLink size={11} />
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Plain link kind */}
            {item.media.kind === "link" && (
              <a
                href={item.media.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition-colors font-mono text-xs uppercase tracking-widest mt-2"
              >
                <ExternalLink size={12} />
                {(item.media as { label?: string }).label ?? "Open Link"}
              </a>
            )}

            {/* Storytelling Content Renderer */}
            {item.content && item.content.length > 0 && (
              <div className="mt-8 flex flex-col gap-10 border-t border-zinc-800 pt-8">
                {item.content.map((block, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    {block.title && (
                      <h3 className="text-white text-lg font-semibold tracking-tight">
                        {block.title}
                      </h3>
                    )}
                    {block.text && (
                      <div className="text-zinc-300 text-sm leading-relaxed space-y-4">
                        {block.text.split("\n\n").map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}
                    {block.codeSnippets && block.codeSnippets.length > 0 && (
                      <div className="flex flex-col gap-6 mt-2">
                        {block.codeSnippets.map((snippet, idx) => (
                          <div key={idx} className="flex flex-col gap-3">
                            {snippet.description && (
                              <p className="text-zinc-400 text-sm leading-relaxed italic border-l-2 border-zinc-700 pl-3 py-0.5">
                                {snippet.description}
                              </p>
                            )}
                            <div className="flex flex-col rounded-xl border border-zinc-800/80 bg-zinc-900/10 overflow-hidden">
                              {/* Editor Top Bar Header */}
                              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/70 border-b border-zinc-800/80 font-mono text-xs text-zinc-400 select-none">
                                <div className="flex items-center gap-2.5">
                                  <Code2 size={13} className="text-zinc-500" />
                                  <span className="tracking-wide text-zinc-300 font-medium">
                                    {snippet.title}
                                  </span>
                                </div>
                                <span className="text-[10px] uppercase text-zinc-600 tracking-widest font-bold">
                                  {snippet.lang}
                                </span>
                              </div>
                              {/* Scrollable Code Area */}
                              <div className="p-5 overflow-x-auto max-h-[28rem] bg-zinc-950/60 custom-scrollbar">
                                <CodeHighlighter code={snippet.snippet} lang={snippet.lang} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inline notebook renderer */}
          {item.media.kind === "notebook" && (
            <div className="px-6 pb-8 border-t border-zinc-800 pt-6 flex flex-col gap-4">
              {item.media.notebooks && item.media.notebooks.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  {item.media.notebooks.map((nb, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNotebookIndex(idx)}
                      className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-colors ${
                        idx === notebookIndex
                          ? "bg-white text-black"
                          : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {nb.label}
                    </button>
                  ))}
                </div>
              )}
              {item.media.notebooks && item.media.notebooks[notebookIndex] && (
                <NotebookViewer
                  rawUrl={item.media.notebooks[notebookIndex].rawUrl}
                  colabUrl={item.media.notebooks[notebookIndex].colabUrl}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LabPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<LabItem | null>(null);
  const closeLightbox = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let raf: number;

    const draw = () => {
      frame++;
      if (frame % 3 !== 0) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / 28);
      const rows = Math.ceil(canvas.height / 28);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.97) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
            ctx.fillRect(c * 28, r * 28, 28, 28);
          }
        }
      }

      const scanY = ((frame * 1.5) % (canvas.height + 40)) - 20;
      ctx.fillStyle = "rgba(255,255,255,0.015)";
      ctx.fillRect(0, scanY, canvas.width, 2);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-zinc-950 overflow-x-hidden pb-24">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="fixed top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-white/10 z-10 pointer-events-none" />
      <div className="fixed top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-white/10 z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-white/10 z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-white/10 z-10 pointer-events-none" />

      <nav className="relative z-20 flex items-center justify-between px-6 md:px-20 py-7">
        <Link
          href="/"
          className="group flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-mono text-xs uppercase tracking-widest">
            Back
          </span>
        </Link>
        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
          Experiments
        </span>
      </nav>

      <section className="relative z-10 px-6 md:px-20 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
            {LAB_ITEMS.length} {LAB_ITEMS.length === 1 ? "item" : "items"}{" "}
            dumped
          </span>
        </div>

        <h1 className="text-[clamp(4rem,14vw,12rem)] font-extrabold leading-none tracking-tighter text-white mb-6 select-none">
          <GlitchText text="LAB" />
        </h1>

        <p className="font-mono text-zinc-500 text-xs md:text-sm tracking-widest uppercase mb-4">
          A sketchbook made public
        </p>

        <p className="text-zinc-400 text-base md:text-lg max-w-md mx-auto leading-relaxed font-light">
          Scrapped brands, half-built apps, motion experiments, notebooks, and
          anything else made for the joy of making it. No case studies — just
          output.
        </p>
      </section>

      <section className="relative z-10 px-6 md:px-20 mt-10">
        {LAB_ITEMS.length === 0 ? (
          <div className="border border-zinc-800 rounded-xl py-24 flex flex-col items-center justify-center gap-3 bg-zinc-900/40 backdrop-blur-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-700">
              Nothing here yet
            </span>
            <p className="text-zinc-600 text-sm">First experiment incoming.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {LAB_ITEMS.map((item, i) => (
              <div key={item.id} className="break-inside-avoid">
                <LabCard item={item} onClick={setSelected} index={i} />
              </div>
            ))}
          </div>
        )}
      </section>

      {selected && <LabLightbox item={selected} onClose={closeLightbox} />}
    </main>
  );
}
