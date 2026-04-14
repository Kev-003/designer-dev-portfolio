"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Volume2,
  VolumeX,
  ArrowUpRight,
} from "lucide-react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import dynamic from "next/dynamic";
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false },
);
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/projects";
import { ProjectTag } from "@/components/ui/ProjectTag";
//import { MindMap } from "../ui/MindMap";
const MindMap = dynamic(() => import("../ui/MindMap").then((m) => m.MindMap), {
  ssr: false,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

type LightboxState = {
  images: string[];
  category: string;
  index: number;
} | null;

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  state,
  onClose,
  onNavigate,
}: {
  state: NonNullable<LightboxState>;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const prevIndex = useRef<number>(state.index);
  const isClosing = useRef(false);

  const total = state.images.length;
  const onPrev = () => onNavigate((state.index - 1 + total) % total);
  const onNext = () => onNavigate((state.index + 1) % total);

  // Enter animation on mount
  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    );
    gsap.fromTo(
      panelRef.current,
      { scale: 0.94, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "power3.out", delay: 0.05 },
    );
  }, []);

  // Slide animation on index change
  useEffect(() => {
    if (prevIndex.current === state.index) return;
    const dir = state.index > prevIndex.current ? 1 : -1;
    prevIndex.current = state.index;
    gsap.fromTo(
      imgRef.current,
      { x: dir * 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
    );
  }, [state.index]);

  const handleClose = useCallback(() => {
    if (isClosing.current) return;
    isClosing.current = true;
    gsap.to(panelRef.current, {
      scale: 0.94,
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

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose, state.index, total]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        className="relative flex flex-col max-w-5xl w-full bg-zinc-950 rounded-xl overflow-hidden shadow-2xl border border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 shrink-0">
          <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
            {state.category} — {state.index + 1} / {total}
          </span>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>
        </div>

        {/* Image area */}
        <div className="relative flex items-center justify-center bg-zinc-900 min-h-[45vh] max-h-[72vh]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={state.images[state.index]}
            alt={`${state.category} ${state.index + 1}`}
            className="max-w-full max-h-[72vh] object-contain"
          />
          {total > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={onNext}
                className="absolute right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-t border-zinc-800 shrink-0">
            {state.images.map((img, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`shrink-0 w-14 h-9 rounded overflow-hidden ring-2 transition-all ${
                  i === state.index
                    ? "ring-brand opacity-100"
                    : "ring-transparent opacity-40 hover:opacity-70"
                }`}
                aria-label={`Go to image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Documentation Section ──────────────────────────────────────────────────

function DocumentationSection({
  docs,
}: {
  docs: NonNullable<Project["assets"]["mdxDocs"]>;
}) {
  return (
    <section className="bg-zinc-950 border-t border-zinc-800 py-20 px-6 md:px-20">
      <div className="mb-12">
        <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-4">
          Documentation
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-100 tracking-tight">
          Read the Docs
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((doc, i) => (
          <Link
            key={i}
            href={doc.url}
            className="group block p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-brand/50 hover:bg-zinc-900/80 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                0{i + 1}
              </span>
              <ArrowUpRight
                size={16}
                className="text-zinc-600 group-hover:text-brand transition-colors group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
            <h3 className="text-lg font-bold text-zinc-200 mb-2 group-hover:text-white transition-colors">
              {doc.title}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
              {doc.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

function GallerySection({
  label,
  images,
  onOpen,
}: {
  label: string;
  images: string[];
  onOpen: (index: number) => void;
}) {
  if (!images.length) return null;

  const isOtherAssets = label === "Other Assets";

  // Split into two independent columns — odd indices left, even right
  const leftCol = images.filter((_, i) => i % 2 === 0);
  const rightCol = images.filter((_, i) => i % 2 !== 0);

  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase shrink-0">
          {label}
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </div>

      {isOtherAssets ? (
        <div className="flex gap-3 items-start">
          {[leftCol, rightCol].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3 flex-1 min-w-0">
              {col.map((src, i) => {
                const globalIdx = colIdx === 0 ? i * 2 : i * 2 + 1;
                return (
                  <button
                    key={globalIdx}
                    onClick={() => onOpen(globalIdx)}
                    className="group relative w-full overflow-hidden rounded-lg bg-zinc-900 p-8 focus-visible:ring-2 focus-visible:ring-brand block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${label} ${globalIdx + 1}`}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102"
                      draggable={false}
                    />
                    <div className="absolute inset-0 flex items-end p-3 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => onOpen(i)}
              className="group relative overflow-hidden rounded-lg bg-zinc-900 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <img
                src={src}
                alt={`${label} ${i + 1}`}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 flex items-end p-3 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                <span className="font-mono text-[10px] tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Meta Chip ────────────────────────────────────────────────────────────────

function MetaChip({
  label,
  variant,
}: {
  label: string;
  variant: "tool" | "tech" | "keyword";
}) {
  const styles = {
    tool: "bg-brand/10 text-brand border-brand/20",
    tech: "bg-emerald-500/10 text-teal-400 border-emerald-500/20",
    keyword: "bg-zinc-800/60 text-zinc-400 border-zinc-700",
  };
  return (
    <span
      className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm border whitespace-nowrap ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

// ─── Brand Identity Components ────────────────────────────────────────────────

function BrandAssetCard({
  src,
  label,
  type,
  projectName,
}: {
  src: string;
  label: string;
  type: string;
  projectName: string;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <div className="group flex flex-col gap-4">
      <div
        className={`relative aspect-square rounded-xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-2xl flex flex-col overflow-hidden border ${
          theme === "dark"
            ? "bg-zinc-900 border-zinc-800 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            : "bg-white border-zinc-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        }`}
      >
        {/* Theme Toggle Overlay */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-black/20 backdrop-blur-md p-1 rounded-full border border-white/10">
          <button
            onClick={() => setTheme("light")}
            className={`w-5 h-5 rounded-full border border-white/20 transition-all ${
              theme === "light" ? "bg-white scale-110" : "bg-white/40"
            }`}
          />
          <button
            onClick={() => setTheme("dark")}
            className={`w-5 h-5 rounded-full border border-white/20 transition-all ${
              theme === "dark" ? "bg-zinc-900 scale-110" : "bg-zinc-900/40"
            }`}
          />
        </div>

        {/* Asset Display */}
        <div className="flex-1 flex items-center justify-center p-12 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${projectName} ${label}`}
            className={`max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110 ${
              theme === "light" ? "brightness-100" : ""
            }`}
          />
        </div>

        {/* Download Hint */}
        <div className="absolute bottom-4 left-0 right-0 text-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em]">
            Click to View Full
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end px-1">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-none mb-1">
            {label}
          </span>
          <span className="text-[9px] text-zinc-600 font-medium uppercase tracking-wider italic">
            {type}
          </span>
        </div>
      </div>
    </div>
  );
}

function ColorPalette({ colors }: { colors: string[] }) {
  return (
    <div className="mt-20 pt-12 border-t border-zinc-900">
      <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-10">
        Color Palette
      </span>
      <div className="flex w-full h-32 rounded-xl overflow-hidden shadow-2xl border border-zinc-800/50 group">
        {colors.map((color, i) => (
          <div
            key={i}
            className="group relative flex-1 hover:flex-[1.5] transition-all duration-500 ease-out"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-md">
              <span className="font-mono text-[10px] text-white uppercase tracking-widest">
                {color}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographySpecimen({
  family,
  weights,
  usage,
}: {
  family: string;
  weights: string[];
  usage?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 group">
      <div className="flex flex-col">
        <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
          {usage ?? "Font Family"}
        </span>
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white group-hover:text-brand transition-colors duration-500">
          {family}
        </h3>
      </div>

      <div className="flex-1 flex flex-col md:items-end">
        <div
          className="text-[100px] md:text-[140px] leading-none font-bold text-zinc-800/20 mb-4 select-none group-hover:text-zinc-800/40 transition-colors duration-700 whitespace-nowrap"
          style={{ fontFamily: family }}
        >
          AaBbCc
        </div>
        <div className="flex flex-wrap gap-4 md:justify-end">
          {weights.map((w) => (
            <span
              key={w}
              className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest px-3 py-1 border border-zinc-800 rounded-full group-hover:border-zinc-700 transition-colors"
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessSequence({
  sketches,
  vectorization,
  finalMark,
  projectName,
  mindMap,
  conclusion,
  liveUrl,
}: {
  sketches?: string[];
  vectorization?: string[];
  finalMark?: string;
  projectName: string;
  mindMap?: { nodes: string };
  conclusion?: string;
  liveUrl?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      typeof window === "undefined" ||
      !containerRef.current ||
      !trackRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 800px)", () => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        const getScrollWidth = () => track.scrollWidth - window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, { scaleX: self.progress });
              }
            },
          },
        });

        tl.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [sketches, vectorization, finalMark, mindMap]);

  if (!sketches?.length && !vectorization?.length && !finalMark && !mindMap)
    return null;

  return (
    <section
      ref={containerRef}
      className="relative bg-zinc-950 overflow-hidden border-t border-zinc-900"
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-900 z-50 hidden md:block">
        <div
          ref={progressRef}
          className="h-full bg-brand origin-left scale-x-0"
        />
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row h-auto md:h-screen items-center will-change-transform"
      >
        {/* 1.1. Sketches */}
        {sketches && sketches.length > 0 && (
          <div className="flex-shrink-0 w-full md:w-screen h-auto md:h-full flex flex-col justify-center px-6 md:px-20 py-20 md:py-0 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-900">
            <span className="font-mono text-[11px] tracking-[0.3em] text-zinc-600 uppercase mb-12">
              01 — Ideation &amp; Sketches
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-12 md:gap-20 items-center">
              <div className="flex flex-col gap-6">
                <div className="w-12 h-px bg-brand/40" />
                <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  The Genesis of the Mark
                </h4>
                <p className="text-zinc-400 leading-relaxed text-lg max-w-sm">
                  Every brand identity begins with the raw translation of
                  thoughts to paper. This phase is about unregulated
                  experimentation—exploring the intersection of the
                  project&apos;s core mission and its ultimate visual form.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-10">
                {sketches.slice(0, 4).map((s, i) => (
                  <div
                    key={i}
                    className={`relative aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-700 shadow-2xl ${
                      i % 2 === 0
                        ? "rotate-1 md:rotate-2 md:translate-y-4"
                        : "-rotate-1 md:-rotate-2 md:-translate-y-4"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s}
                      alt={`${projectName} Sketch ${i + 1}`}
                      className="w-full h-full object-cover grayscale sepia(0.2) opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 02. Mind Map */}
        {mindMap && (
          <div className="flex-shrink-0 w-full md:w-screen h-auto md:h-full flex flex-col justify-center px-6 md:px-20 py-20 md:py-0 bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-900">
            <span className="font-mono text-[11px] tracking-[0.3em] text-zinc-600 uppercase mb-12">
              02 — Conceptualization
            </span>
            <div className="w-full max-w-5xl mx-auto">
              <MindMap dsl={mindMap.nodes} />
            </div>
          </div>
        )}

        {/* 03. Vectorization */}
        {vectorization && vectorization.length > 0 && (
          <div className="flex-shrink-0 w-full md:w-screen h-auto md:h-full flex flex-col justify-center px-6 md:px-20 py-20 md:py-0 bg-zinc-900/30 backdrop-blur-sm border-b md:border-b-0 md:border-r border-zinc-900">
            <span className="font-mono text-[11px] tracking-[0.3em] text-zinc-600 uppercase mb-12">
              03 — Refinement &amp; Vectorization
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800 p-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={vectorization[0]}
                  alt={`${projectName} Vectorization`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-3xl font-bold text-white tracking-tight">
                  From Rough to Refined
                </h4>
                <p className="text-zinc-400 leading-relaxed text-lg max-w-md">
                  Transitioning conceptual sketches into a clean, geometric
                  framework. This phase focuses on precision, balance, and
                  scalability.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 04. Final Mark */}
        {finalMark && (
          <div className="flex-shrink-0 w-full md:w-screen h-auto md:h-full flex flex-col items-center justify-center bg-zinc-950 px-6 py-20 md:py-0 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute inset-0 bg-brand/5 blur-[120px] rounded-full scale-150 animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

            <span className="font-mono text-[11px] tracking-[0.3em] text-brand uppercase mb-16 relative z-10">
              04 — The Conclusion
            </span>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-5xl w-full">
              {/* Mark */}
              <div className="relative w-56 md:w-72 aspect-square flex-shrink-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-brand/10 rounded-full blur-[80px] animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-brand/10" />
                <div className="absolute inset-8 rounded-full border border-brand/5" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={finalMark}
                  alt={`${projectName} Final Mark`}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(93,69,253,0.3)]"
                />
              </div>

              {/* Text + CTA */}
              <div className="flex flex-col items-center lg:items-start gap-8 text-center lg:text-left">
                {conclusion && (
                  <>
                    <div className="w-8 h-px bg-brand/40" />
                    <p className="text-zinc-300 leading-relaxed text-base md:text-lg max-w-sm italic">
                      &quot;{conclusion}&quot;
                    </p>
                  </>
                )}

                {/* CTA */}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-2 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-brand/30 bg-brand/5 hover:bg-brand/10 hover:border-brand/60 transition-all duration-300"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                      View Live Site
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <path
                        d="M2 12L12 2M12 2H5M12 2V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * RevealText: Animates words from gray to white based on scroll position.
 * - Desktop: Animated word-by-word via ScrollTrigger.
 * - Mobile: Static white text, smaller font size, uses aboutMobile if provided.
 */
function RevealText({
  text,
  mobileText,
}: {
  text: string;
  mobileText?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".reveal-word");
      if (!words) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 800px)", () => {
        // Desktop: Animation
        gsap.fromTo(
          words,
          { color: "#52525b" }, // zinc-600
          {
            color: "#f4f4f5", // zinc-100
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 66%",
              end: "top 33%",
              scrub: true,
            },
          },
        );
      });

      mm.add("(max-width: 799px)", () => {
        // Mobile: No animation, keep white
        gsap.set(words, { color: "#f4f4f5" });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [text]);

  return (
    <p
      ref={containerRef}
      className="mt-4 text-xl md:text-3xl font-medium leading-snug"
    >
      <span className="hidden md:inline">
        {text.split(" ").map((word, i) => (
          <span key={i} className="reveal-word inline-block mr-[0.25em]">
            {word}
          </span>
        ))}
      </span>
      <span className="inline md:hidden text-zinc-100">
        {(mobileText ?? text).split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em]">
            {word}
          </span>
        ))}
      </span>
    </p>
  );
}

// ─── Project Layout (main export) ─────────────────────────────────────────────

export function ProjectLayout({ project }: { project: Project }) {
  const {
    name,
    year,
    mission,
    description,
    aboutMobile,
    tags,
    keywords,
    tools,
    technologies,
    brandColors,
    brandColor,
    typography,
    assets,
  } = project;

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lottieOverlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [isMuted, setIsMuted] = useState(true);
  const MAX_VOLUME = 0.6; // Cap volume as requested

  // Dynamic Font Loading
  useEffect(() => {
    if (!typography) return;

    const styleId = `fonts-${project.slug}`;
    let styleTag = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const css = typography
      .filter((t) => t.fontFile)
      .map((t) => {
        const ext = t.fontFile!.split(".").pop()?.toLowerCase();
        const format =
          ext === "otf" ? "opentype" : ext === "ttf" ? "truetype" : ext;
        return `
          @font-face {
            font-family: '${t.fontFamily}';
            src: url('${t.fontFile}') format('${format}');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `;
      })
      .join("\n");

    styleTag.textContent = css;

    return () => {
      // We keep the fonts loaded to prevent flicker when returning,
      // but they are scoped by id if needed.
    };
  }, [typography, project.slug]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      videoRef.current.volume = MAX_VOLUME;
      setIsMuted(newMuted);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title slide up
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      // Lottie reveal
      if (lottieOverlayRef.current) {
        gsap.to(lottieOverlayRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 1,
          ease: "expo.inOut",
          delay: 2,
          onComplete: () => {
            gsap.set(lottieOverlayRef.current, { display: "none" });
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Global refresh after everything is rendered — critical for pinning
  useLayoutEffect(() => {
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    // Multiple pings to catch images, fonts, and MindMap layout
    const t1 = setTimeout(refresh, 100);
    const t2 = setTimeout(refresh, 1000);
    const t3 = setTimeout(refresh, 3000);

    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", refresh);
    };
  }, []);

  const openLightbox = (images: string[], category: string, index: number) =>
    setLightbox({ images, category, index });

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const navigateLightbox = useCallback(
    (index: number) =>
      setLightbox((prev) => (prev ? { ...prev, index } : null)),
    [],
  );

  // Build gallery categories — only non-empty
  type GalleryItem = { label: string; images: string[] };
  const gallerySections: GalleryItem[] = (
    [
      { label: "Final Work", images: assets.mockups ?? [] },
      {
        label: "Alternative Sketches",
        images: (assets.sketches ?? []).slice(4),
      },
      {
        label: "Detailed Vectorization",
        images: (assets.vectorization ?? []).slice(1),
      },
      { label: "System Architecture", images: assets.erd ?? [] },
      { label: "Documentation", images: assets.documentation ?? [] },
      { label: "Code & Snippets", images: assets.snippets ?? [] },
      { label: "Other Assets", images: assets.extras ?? [] },
    ] as GalleryItem[]
  ).filter((s) => s.images.length > 0);

  const hasGallery = gallerySections.length > 0;
  const hasMeta = !!(tools?.length || technologies?.length || keywords?.length);

  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden relative">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div
        ref={heroRef}
        className="relative min-h-[85vh] md:min-h-screen flex flex-col bg-zinc-950 overflow-hidden"
      >
        {/* ── Lottie Reveal Overlay ── */}
        {assets.animation && (
          <div
            ref={lottieOverlayRef}
            className="absolute inset-0 z-40 bg-zinc-950 flex items-center justify-center pointer-events-none overflow-hidden"
          >
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]">
              <DotLottieReact
                src={assets.animation}
                loop
                autoplay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Cover background */}
        {assets.cover && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.cover}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />
          </>
        )}

        {/* Top nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-20 py-7">
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
        </nav>

        {/* Bottom content */}
        <div className="relative z-10 mt-auto px-6 md:px-20 pb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
              {year}
            </span>
            <h1
              ref={titleRef}
              className="mt-3 text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-100 leading-none"
            >
              {name}
            </h1>
            <p className="mt-5 text-zinc-400 text-base leading-relaxed max-w-lg">
              {mission}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-1.5 shrink-0">
            {tags.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Overview ──────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 border-t border-zinc-800 py-20 md:py-28 px-6 md:px-20">
        <div
          className={`grid gap-16 ${hasMeta ? "md:grid-cols-[1fr_280px]" : ""}`}
        >
          {/* Description / mission */}
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase">
              About
            </span>
            <RevealText
              text={description ?? mission}
              mobileText={aboutMobile}
            />
          </div>

          {/* Meta sidebar */}
          {hasMeta && (
            <div className="space-y-8 pt-1">
              {assets.liveUrl && (
                <a
                  href={assets.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-100">
                    Live Site
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-zinc-500 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              )}
              {tools && tools.length > 0 && (
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-3">
                    Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.map((t) => (
                      <MetaChip key={t} label={t} variant="tool" />
                    ))}
                  </div>
                </div>
              )}
              {technologies && technologies.length > 0 && (
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-3">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {technologies.map((t) => (
                      <MetaChip key={t} label={t} variant="tech" />
                    ))}
                  </div>
                </div>
              )}
              {keywords && keywords.length > 0 && (
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-3">
                    Keywords
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {keywords.map((k) => (
                      <MetaChip key={k} label={k} variant="keyword" />
                    ))}
                  </div>
                </div>
              )}
              {project.team && project.team.length > 0 && (
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-3">
                    Team
                  </span>
                  <div className="flex flex-col gap-2">
                    {project.team.map((member) => (
                      <div key={member.name} className="flex flex-col">
                        <span className="text-[11px] text-zinc-300 font-medium">
                          {member.name}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Showcase ──────────────────────────────────────────────────── */}
      {assets.showcase && (
        <section className="bg-zinc-950 border-t border-zinc-800 py-20 md:py-28 px-6 md:px-20 overflow-hidden">
          <div className="w-full flex flex-col gap-4">
            {/* Primary Highlight */}
            <div
              className="w-full md:w-[75vw] items-center justify-center mx-auto aspect-video rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800 relative group cursor-none"
              onClick={toggleMute}
              onMouseMove={handleMouseMove}
            >
              {assets.showcase.highlight.type === "video" ? (
                <>
                  <video
                    ref={videoRef}
                    src={assets.showcase.highlight.url}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Custom Cursor Prompt */}
                  <div
                    ref={cursorRef}
                    className="absolute top-0 left-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <div className="bg-zinc-950/80 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 shadow-2xl">
                      {isMuted ? (
                        <VolumeX size={14} className="text-zinc-400" />
                      ) : (
                        <Volume2 size={14} className="text-brand" />
                      )}
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-100">
                        {isMuted
                          ? "Click to enable audio"
                          : "Audio Active (60%)"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={assets.showcase.highlight.url}
                  alt={`${name} Highlight`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Full Webpage Capture ───────────────────────────────────────── */}
      {assets.fullPage && (
        <section
          className="py-20 md:py-32 border-t border-zinc-900/30"
          style={{ backgroundColor: brandColor }}
        >
          <div className="max-w-6xl mx-auto px-6 overflow-hidden">
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.fullPage}
                alt={`${name} Full Webpage Capture`}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Brand Identity Section ───────────────────────────────────── */}
      {(assets.logo ||
        assets.logotype ||
        assets.icon ||
        brandColors ||
        typography) && (
        <section className="bg-zinc-950 border-t border-zinc-800 py-20 px-6 md:px-20">
          {/* Asset Cards */}
          {(assets.logo || assets.logotype || assets.icon) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {assets.logo && (
                <BrandAssetCard
                  src={assets.logo}
                  label="Logomark"
                  type="Symbolic Icon"
                  projectName={name}
                />
              )}
              {assets.logotype && (
                <BrandAssetCard
                  src={assets.logotype}
                  label="Wordmark"
                  type="Full Logotype"
                  projectName={name}
                />
              )}
              {assets.icon && (
                <BrandAssetCard
                  src={assets.icon}
                  label="App Icon"
                  type="Simplified Mark"
                  projectName={name}
                />
              )}
            </div>
          )}

          {/* Colors */}
          {brandColors && <ColorPalette colors={brandColors} />}

          {/* Typography */}
          {typography && (
            <div className="mt-20 pt-12 border-t border-zinc-900 mb-20">
              <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-12">
                Typography
              </span>
              <div className="flex flex-col gap-24">
                {typography.map((spec, i) => (
                  <TypographySpecimen
                    key={i}
                    family={spec.fontFamily}
                    weights={spec.weights}
                    usage={spec.usage}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── Process ─────────────────────────────────────────────────── */}
      <ProcessSequence
        sketches={assets.sketches}
        vectorization={assets.vectorization}
        finalMark={assets.logo}
        projectName={name}
        mindMap={assets.mindMap}
        conclusion={assets.conclusions}
        liveUrl={assets.liveUrl}
      />

      {/* ── MDX Documentation ─────────────────────────────────────────── */}
      {assets.mdxDocs && assets.mdxDocs.length > 0 && (
        <DocumentationSection docs={assets.mdxDocs} />
      )}

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      {hasGallery && (
        <section className="bg-zinc-950 border-t border-zinc-800 py-20 md:py-28 px-6 md:px-20">
          {gallerySections.map((cat) => (
            <GallerySection
              key={cat.label}
              label={cat.label}
              images={cat.images}
              onOpen={(i) => openLightbox(cat.images, cat.label, i)}
            />
          ))}
        </section>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightbox && (
        <Lightbox
          state={lightbox}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </main>
  );
}
