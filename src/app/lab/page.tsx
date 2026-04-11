"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const COMING_ITEMS = [
  {
    label: "Motion & Animation",
    desc: "GSAP experiments, After Effects explorations",
  },
  {
    label: "Type & Identity",
    desc: "Lettering experiments, wordmark sketches, color studies",
  },
  {
    label: "Dev Components",
    desc: "Isolated UI experiments, interactive builds, weird inputs",
  },
  {
    label: "Strawberry Sweets",
    desc: "Band artwork, posters, visual assets that didn't fit a case study",
  },
  {
    label: "Generative Stuff",
    desc: "Anything playful made for the joy of making it",
  },
];

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

export default function LabPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tick, setTick] = useState(0);

  // Animated noise grid background
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
          const noise = Math.random();
          if (noise > 0.97) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
            ctx.fillRect(c * 28, r * 28, 28, 28);
          }
        }
      }

      // Scan line
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
    <main className="relative min-h-screen bg-zinc-950 overflow-hidden flex flex-col">
      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-white/10 z-10" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-white/10 z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-white/10 z-10" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-white/10 z-10" />

      {/* Nav */}
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
          Under Construction
        </span>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-20 py-20 text-center">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
            Experiments Loading
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(4rem,14vw,12rem)] font-extrabold leading-none tracking-tighter text-white mb-6 select-none">
          <GlitchText text="LAB" />
        </h1>

        <p className="font-mono text-zinc-500 text-xs md:text-sm tracking-widest uppercase mb-4">
          A sketchbook made public
        </p>

        <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed mb-20 font-light">
          This space is for things made for the joy of making them — motion
          experiments, type explorations, weird components, and anything else
          that doesn&apos;t fit a case study.
        </p>

        {/* Coming soon items */}
        <div className="w-full max-w-2xl text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-6 text-center">
            What&apos;s coming
          </p>

          <div className="flex flex-col">
            {COMING_ITEMS.map((item, i) => (
              <div
                key={i}
                className="group flex items-start gap-6 py-5 border-b border-zinc-800/60 last:border-0"
              >
                <span className="font-mono text-[10px] text-zinc-700 mt-1 shrink-0 w-5 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm md:text-base group-hover:text-brand transition-colors duration-300">
                    {item.label}
                  </p>
                  <p className="text-zinc-500 text-xs md:text-sm mt-1 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-700 mt-1 shrink-0">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
