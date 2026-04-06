"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/projects";
import { ProjectTag } from "@/components/ui/ProjectTag";

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
  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase shrink-0">
          {label}
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => onOpen(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900 focus-visible:ring-2 focus-visible:ring-brand"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${label} ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </button>
        ))}
      </div>
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
    assets,
  } = project;

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lottieOverlayRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

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
      { label: "Sketches", images: assets.sketches ?? [] },
      { label: "Vectorization", images: assets.vectorization ?? [] },
      { label: "System Architecture", images: assets.erd ?? [] },
      { label: "Documentation", images: assets.documentation ?? [] },
      { label: "Code & Snippets", images: assets.snippets ?? [] },
      { label: "Other", images: assets.extras ?? [] },
    ] as GalleryItem[]
  ).filter((s) => s.images.length > 0);

  const hasGallery = gallerySections.length > 0;
  const hasMeta = !!(tools?.length || technologies?.length || keywords?.length);

  return (
    <>
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
            </div>
          )}
        </div>

        {/* Brand asset row (logo / logotype / icon) */}
        {(assets.logo || assets.logotype || assets.icon) && (
          <div className="mt-16 pt-12 border-t border-zinc-800">
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-8">
              Brand Assets
            </span>
            <div className="flex flex-wrap gap-8 items-center">
              {[
                { src: assets.logo, label: "Mark" },
                { src: assets.logotype, label: "Wordmark" },
                { src: assets.icon, label: "Icon" },
              ]
                .filter((a) => a.src)
                .map((a) => (
                  <div
                    key={a.label}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="bg-zinc-900 rounded-lg p-6 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.src!}
                        alt={`${name} ${a.label}`}
                        className="h-16 w-auto"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                      {a.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      {hasGallery && (
        <section className="bg-zinc-950 border-t border-zinc-800 py-20 md:py-28 px-6 md:px-20">
          <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase block mb-12">
            Process &amp; Work
          </span>
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
    </>
  );
}
