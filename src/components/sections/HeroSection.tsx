"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { IsometricSwitcher } from "@/components/ui/hero/IsometricSwitcher";
import gsap from "gsap";

const HEADLINES = {
  experience: { text: "Architecting the story." },
  engineering: { text: "Engineering the reality." },
};

// Simplified MorphHeadline
function MorphHeadline({ mode }: { mode: "experience" | "engineering" }) {
  const hlRef = useRef<HTMLHeadingElement>(null);
  const currentMode = useRef(mode);
  const busy = useRef(false);

  // Seed words on first mount
  useEffect(() => {
    const el = hlRef.current;
    if (!el) return;
    el.innerHTML = wordSpans(HEADLINES[mode].text);
    gsap.set(el.querySelectorAll(".word"), { opacity: 1, y: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate on mode change
  useEffect(() => {
    const el = hlRef.current;
    if (!el || currentMode.current === mode || busy.current) return;

    busy.current = true;
    currentMode.current = mode;
    const oldWords = el.querySelectorAll<HTMLElement>(".word");
    const { text } = HEADLINES[mode];

    gsap.to(oldWords, {
      y: -32,
      opacity: 0,
      duration: 0.22,
      stagger: 0.04,
      ease: "power2.in",
      onComplete() {
        el.innerHTML = wordSpans(text);
        const newWords = el.querySelectorAll<HTMLElement>(".word");
        gsap.fromTo(
          newWords,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.055,
            ease: "back.out(1.4)",
            onComplete() {
              busy.current = false;
            },
          },
        );
      },
    });
  }, [mode]);

  return (
    <h1
      ref={hlRef}
      className={`text-4xl md:text-6xl font-extrabold tracking-tight text-balance overflow-hidden
        transition-colors duration-300 pb-5
        ${mode === "experience" ? "text-brand" : "text-white"}`}
    />
  );
}

function wordSpans(text: string) {
  return text
    .split(" ")
    .map(
      (w) =>
        `<span class="word inline-block mr-[0.22em] will-change-transform">${w}</span>`,
    )
    .join("");
}

type Props = {
  mode?: "experience" | "engineering";
  onModeChange?: (mode: "experience" | "engineering") => void;
};

const DESCRIPTIONS = {
  experience:
    "I don't just design interfaces; I architect how people feel and flow through a narrative. My deepest expertise lies in heavy interaction design and high-stakes visual storytelling.",
  engineering:
    "I write the expressive, resilient code that makes deep interactions possible. From precise custom animations to scalable systems, I bring the craft of purposeful design into the logic of development.",
};

export function HeroSection({ mode = "experience", onModeChange }: Props) {
  const [activeMode, setActiveMode] = useState<"experience" | "engineering">(
    mode,
  );
  const { setTheme } = useTheme();

  // Ensure theme matches initial mode on mount
  useEffect(() => {
    setTheme(mode === "experience" ? "light" : "dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModeChange = (value: "experience" | "engineering") => {
    setActiveMode(value);
    setTheme(value === "experience" ? "light" : "dark");
    onModeChange?.(value);
  };

  return (
    <div className="min-h-[95dvh] flex flex-col pt-24 md:pt-0 pb-12 overflow-hidden">
      <div className="flex-1 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-6 md:gap-30 pb-10">
        {/* Isometric Switcher Container - Left aligned on mobile, right on desktop */}
        <div className="relative z-40 flex items-start mr-0 lg:-mr-20 justify-start order-1 md:order-2 overflow-visible pointer-events-auto origin-left scale-65 sm:scale-75 md:scale-100 lg:scale-110">
          <IsometricSwitcher
            activeMode={activeMode}
            onChange={handleModeChange}
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col order-2 md:order-1 flex-1 text-left ml-0 lg:-ml-100 mr-20">
          <MorphHeadline mode={activeMode} />

          <p
            className={`mt-4 max-w-xl text-lg md:text-xl leading-relaxed ${activeMode === "experience" ? "text-foreground opacity-90" : "text-zinc-400"} mr-20`}
          >
            {DESCRIPTIONS[activeMode]}
          </p>
        </div>
      </div>

      <LogoTicker />
    </div>
  );
}
