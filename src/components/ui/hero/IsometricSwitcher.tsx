"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Palette, Terminal, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoTile } from "./LogoTile";

type Mode = "experience" | "engineering";

interface IsometricSwitcherProps {
  activeMode: Mode;
  onChange: (mode: Mode) => void;
  className?: string;
}

export function IsometricSwitcher({
  activeMode,
  onChange,
  className,
}: IsometricSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTileRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isExperience = activeMode === "experience";

      // Move active tile - following the grid tiles
      // The first button is at x=0, second at x=80 (64px + 16px gap)
      gsap.to(activeTileRef.current, {
        x: isExperience ? 0 : 80,
        duration: 0.6,
        ease: "expo.out",
      });

      // Sliding text animation
      gsap.to(textRef.current, {
        y: isExperience ? 0 : -64, // 64px is our tile height
        duration: 0.7,
        ease: "expo.inOut",
      });
    },
    { dependencies: [activeMode], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn("py-12 px-0", className)}
      style={{ perspective: "1200px" }}
    >
      {/* The Isometric Grid Context */}
      <div
        className="relative flex flex-col gap-4"
        style={{
          transform: "rotateX(55deg) rotateZ(-35deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Decorative Fading Grid Background */}
        <div
          className="absolute -inset-[320px] -z-20 pointer-events-none opacity-[0.5] lg:opacity-[0.8] dark:opacity-[0.4] lg:dark:opacity-[0.1] [--mask-size:20%] lg:[--mask-size:40%] [--mask-fade:60%] lg:[--mask-fade:60%]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px", // 64px tile + 16px gap
            backgroundPosition: "-8px -2px", // Nudged left for alignment
            maskImage:
              "radial-gradient(circle at center, black var(--mask-size), transparent var(--mask-fade))",
            WebkitMaskImage:
              "radial-gradient(circle at center, black var(--mask-size), transparent var(--mask-fade))",
            color: "var(--border)",
          }}
        />

        {/* Main Interaction Row */}
        <div
          className="flex items-center gap-4 relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Active Highlight Tile (Underneath) */}
          <div
            ref={activeTileRef}
            className="absolute w-16 h-16 bg-brand/30 dark:bg-brand/50 border border-brand/60 rounded-sm shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.6)] pointer-events-none"
            style={{ transform: "translateZ(-4px)", zIndex: 0 }}
          />

          {/* Switcher Buttons */}
          <div
            className="flex gap-4 relative z-30"
            style={{ transformStyle: "preserve-3d" }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("experience");
              }}
              className={cn(
                "group relative w-16 h-16 flex items-center justify-center rounded-sm border transition-all duration-500 cursor-pointer overflow-visible",
                activeMode === "experience"
                  ? "bg-white dark:bg-zinc-800 border-brand text-brand scale-105 -translate-y-1 shadow-[0_10px_20px_-5px_rgba(var(--brand-primary-rgb),0.3)]"
                  : "bg-white/40 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-zinc-800/50 text-zinc-400 grayscale hover:grayscale-0 hover:bg-white/60 dark:hover:bg-zinc-800/60",
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Palette size={24} className="relative z-10" />
              {/* Larger Hit Area */}
              <div className="absolute inset-[-8px] z-0" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("engineering");
              }}
              className={cn(
                "group relative w-16 h-16 flex items-center justify-center rounded-sm border transition-all duration-500 cursor-pointer overflow-visible",
                activeMode === "engineering"
                  ? "bg-white dark:bg-zinc-800 border-brand text-brand scale-105 -translate-y-1 shadow-[0_10px_20px_-5px_rgba(var(--brand-primary-rgb),0.3)]"
                  : "bg-white/40 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-zinc-800/50 text-zinc-400 grayscale hover:grayscale-0 hover:bg-white/60 dark:hover:bg-zinc-800/60",
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Terminal size={24} className="relative z-10" />
              {/* Larger Hit Area */}
              <div className="absolute inset-[-8px] z-0" />
            </button>
          </div>

          {/* Masked Text Slot Tile */}
          <div className="w-64 h-19 overflow-hidden bg-white dark:bg-black backdrop-blur-md z-10">
            <div ref={textRef} className="flex flex-col">
              {/* Option 1 */}
              <div className="h-16 flex items-center px-6 shrink-0">
                <span
                  className={cn(
                    "text-md font-bold tracking-[0.2em] uppercase transition-colors duration-500 whitespace-nowrap",
                    activeMode === "experience"
                      ? "text-brand"
                      : "text-zinc-500",
                  )}
                >
                  The Experience
                </span>
              </div>
              {/* Option 2 */}
              <div className="h-16 flex items-center px-6 shrink-0">
                <span
                  className={cn(
                    "text-md font-bold tracking-[0.2em] uppercase transition-colors duration-500 whitespace-nowrap",
                    activeMode === "engineering"
                      ? "text-brand"
                      : "text-zinc-500",
                  )}
                >
                  The Engine
                </span>
              </div>
            </div>
          </div>
        </div>

        


        {/* Email CTA - Bottom Right of the grid context */}
        <div
          className="hidden lg:flex justify-end mt-48 pr-0 lg:translate-x-32"
          style={{ transform: "translateZ(10px)" }}
        >
          <a
            href="mailto:kevern.design@gmail.com"
            className="group relative flex items-center gap-4 px-6 py-3 bg-white/5 dark:bg-zinc-800/10 border border-zinc-200/20 dark:border-zinc-800/30 rounded-sm backdrop-blur-md transition-all duration-500 hover:bg-brand/10 hover:border-brand/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(var(--brand-primary-rgb),0.3)] shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] pointer-events-auto"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold group-hover:text-brand/70 transition-colors">
                Available for projects
              </span>
              <span className="text-sm font-bold tracking-widest text-foreground dark:text-zinc-200">
                GET IN TOUCH
              </span>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand/10 border border-brand/20 text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white">
              <Mail
                size={18}
                className="transition-transform group-hover:scale-110"
              />
            </div>
          </a>
        </div>

        {/* Logo Tile */}
        <div className="mt-30">
        <LogoTile mode={activeMode} />
        </div>
      </div>
    </div>
  );
}
