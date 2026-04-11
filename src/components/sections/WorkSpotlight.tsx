"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/lib/projects";
import { ProjectTag } from "@/components/ui/ProjectTag";

gsap.registerPlugin(ScrollTrigger);

// Must match --brand-primary in globals.css
const BRAND_HEX = "#4832d5";

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [imgError, setImgError] = useState(false);

  const enter = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.55,
      ease: "power2.out",
    });
    gsap.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(titleRef.current, {
      color: BRAND_HEX,
      x: 8,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const leave = () => {
    gsap.to(imgRef.current, {
      scale: 1.1,
      duration: 0.55,
      ease: "power2.inOut",
    });
    gsap.to(overlayRef.current, {
      scaleY: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(titleRef.current, { color: "#f4f4f5", x: 0, duration: 0.25 });
    gsap.to(arrowRef.current, { opacity: 0, x: -10, duration: 0.2 });
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block shrink-0 select-none w-[65vw] sm:w-[500px] md:w-[640px]"
      onMouseEnter={enter}
      onMouseLeave={leave}
      draggable={false}
    >
      {/* ── Mobile "Story" Layout (Visible only on < sm) ── */}
      <div className="sm:hidden relative w-full aspect-[3/4.5] overflow-hidden rounded-xl bg-zinc-900 shadow-2xl group active:scale-95 transition-transform duration-300">
        <img
          src={project.assets.cover}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

        {/* Story Content - Bottom Anchored */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <ProjectTag
                key={tag}
                tag={tag}
                className="bg-white/10 text-white border-white/20 backdrop-blur-md !py-0.5 !px-2 rounded-full !text-[9px]"
              />
            ))}
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
            {project.name}
          </h3>
        </div>
      </div>

      {/* ── Desktop Default Layout (Hidden on mobile) ── */}
      <div className="hidden sm:block">
        {/* Cover image */}
        <div
          ref={imgWrapRef}
          className="overflow-hidden w-full aspect-[16/10] bg-zinc-900 relative"
        >
          {!imgError && (
            <img
              ref={imgRef}
              src={project.assets.cover}
              alt={project.name}
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover" // remove scale-[1.1] from className — let GSAP own it entirely
              draggable={false}
            />
          )}
        </div>

        {/* Title row — the white overlay rises here on hover */}
        <div className="relative overflow-hidden mt-4 py-1 border-b border-zinc-800">
          <div
            ref={overlayRef}
            aria-hidden
            className="absolute inset-0 bg-white origin-bottom pointer-events-none scale-y-0"
          />
          <div className="relative flex items-center justify-between gap-4 mr-3">
            <h3
              ref={titleRef}
              className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-zinc-100"
            >
              {project.name}
            </h3>
            <span
              ref={arrowRef}
              aria-hidden
              className="shrink-0 opacity-0 -translate-x-2.5 text-brand"
            >
              <MoveRight size={32} strokeWidth={1.5} />
            </span>
          </div>
        </div>

        {/* Mission + meta */}
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-6">
          <p className="text-sm text-zinc-500 leading-relaxed">
            {project.mission}
          </p>
          <div className="flex flex-col items-end gap-2 min-w-[140px]">
            <span className="font-mono text-xs text-zinc-600">
              {project.year}
            </span>
            <div className="grid grid-cols-2 gap-1 w-full">
              {project.tags.map((tag, i) => {
                const isTrailing =
                  i === project.tags.length - 1 &&
                  project.tags.length % 2 === 1;
                return (
                  <ProjectTag
                    key={tag}
                    tag={tag}
                    className={isTrailing ? "col-start-2" : ""}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export function WorkSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Drag-to-scroll state (refs to avoid re-renders on every mouse move)
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollLeftStart = useRef(0);
  const didDrag = useRef(false);
  const velocityRef = useRef(0); // px/frame at moment of release
  const lastXRef = useRef(0); // previous mouse X for velocity calc
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading: slide up + fade in as section enters view
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Drag handlers ────────────────────────────────────────────────────────────

  const handleMouseDown = (e: React.MouseEvent) => {
    // Cancel any in-flight momentum
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    isDragging.current = true;
    didDrag.current = false;
    velocityRef.current = 0;
    lastXRef.current = e.pageX;
    dragStartX.current = e.pageX - scrollRef.current!.offsetLeft;
    scrollLeftStart.current = scrollRef.current!.scrollLeft;
    scrollRef.current!.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    // Velocity = how far the pointer moved since last event
    velocityRef.current = e.pageX - lastXRef.current;
    lastXRef.current = e.pageX;
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const delta = dragStartX.current - x;
    if (Math.abs(delta) > 3) didDrag.current = true;
    scrollRef.current!.scrollLeft = scrollLeftStart.current + delta;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";

    // Momentum deceleration after release
    let vel = -velocityRef.current; // invert: drag right → scroll left
    const decelerate = () => {
      if (!scrollRef.current || Math.abs(vel) < 0.5) return;
      scrollRef.current.scrollLeft += vel;
      vel *= 0.93; // friction — higher = more glide
      rafRef.current = requestAnimationFrame(decelerate);
    };
    rafRef.current = requestAnimationFrame(decelerate);
  };

  // Intercept any click bubbling up from cards if we were dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (didDrag.current) {
      e.preventDefault();
      e.stopPropagation();
      didDrag.current = false;
    }
  };

  return (
    // Always dark — cinema / showcase aesthetic regardless of theme
    <section
      ref={sectionRef}
      className="bg-zinc-950 py-20 md:py-28 overflow-hidden"
    >
      {/* ── Section header ─────────────────────────────── */}
      <div className="px-6 md:pl-30 md:pr-12 mb-10 md:mb-14 flex flex-col justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-600 uppercase font-semibold">
            Selected Work
          </span>
          <h2
            ref={headingRef}
            className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-100"
          >
            Spotlight.
          </h2>
        </div>

        <p className="md:max-w-xs text-base text-zinc-500 leading-relaxed">
          Where purpose meets design.
        </p>
      </div>

      {/* ── Horizontal draggable scroll ─────────────────── */}
      <div
        ref={scrollRef}
        className="no-scrollbar [&::-webkit-scrollbar]:hidden flex flex-row gap-6 overflow-x-auto cursor-grab px-6 md:pl-30 md:pr-12 pb-2"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClickCapture={handleClickCapture}
      >
        {PROJECTS.filter((p) => p.isSpotlight).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}

        {/* End spacer so last card isn't flush with the edge */}
        <div className="shrink-0 w-6 md:w-12" aria-hidden />
      </div>
    </section>
  );
}
