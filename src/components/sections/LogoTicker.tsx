"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";

// Slug utility — converts "Bataeno Pass" → "bataeno-pass"
const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

type Brand = {
  name: string;
  // Set to true for logos whose primary colors are white/light (meant for dark
  // backgrounds). The component will load logo-dark.svg in dark mode and fall
  // back to logo.svg in light mode where the logo already uses dark colors.
  lightInvert?: boolean;
};

const BRANDS: Brand[] = [
  { name: "Courant" },
  { name: "Bataeno Pass" },
  { name: "Edmer Software" },
  { name: "Strawberry Sweets" },
  { name: "Imbento", lightInvert: true },
  { name: "Rymer Realty", lightInvert: true },
  { name: "INSA" },
];

// Renders the brand logo, falling back to a text label if the SVG is missing.
//
// lightInvert=true signals that the logo uses white/light colors (designed for
// dark backgrounds). In that case:
//   • Dark mode  → logo-dark.svg  (white logo, visible on dark)
//   • Light mode → logo.svg       (the dark-colored variant you provide)
function BrandLogo({ name, lightInvert, isDark }: Brand & { isDark: boolean }) {
  const slug = toSlug(name);
  const src =
    lightInvert && isDark
      ? `/projects/${slug}/logo-dark.svg`
      : `/projects/${slug}/logo.svg`;
  // Track which src has errored so the flag auto-resets when src changes
  const [erroredSrc, setErroredSrc] = useState<string | null>(null);
  const errored = erroredSrc === src;

  if (errored) {
    return (
      <span className="font-sans font-bold text-xl tracking-tight text-zinc-400 dark:text-zinc-600 uppercase">
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setErroredSrc(src)}
      className="h-10 w-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
      draggable={false}
    />
  );
}

export function LogoTicker() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Duplicate once — GSAP loops by animating 0 → -50% of total width
  const items = [...BRANDS, ...BRANDS];

  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Animate translateX from 0% to -50% (one full set width), repeat infinitely
    tweenRef.current = gsap.to(track, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    // Kill any in-flight timeScale tween, then ease down to 0
    scaleRef.current?.kill();
    scaleRef.current = gsap.to(tweenRef.current, {
      timeScale: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    // Kill any in-flight timeScale tween, then ease back to full speed
    scaleRef.current?.kill();
    scaleRef.current = gsap.to(tweenRef.current, {
      timeScale: 1,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      className="border-y border-zinc-200 dark:border-zinc-800 w-full flex pl-30 items-center h-[120px] relative overflow-hidden z-30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static label */}
      <div className="hidden lg:flex flex-col justify-center bg-background z-10 pr-8 h-full shrink-0">
        <p className="font-mono uppercase text-[10px] tracking-widest leading-relaxed text-zinc-500 font-semibold whitespace-nowrap">
          Collaborating with
          <br />
          forward-thinking brands
        </p>
      </div>

      {/* Scrolling marquee */}
      <div className="flex-1 relative flex items-center h-full overflow-display lg:overflow-hidden lg:[mask-image:linear-gradient(to_right,transparent,black_15%,black)]">
        <div
          ref={trackRef}
          className="flex items-center w-max will-change-transform"
        >
          {items.map((brand, idx) => (
            <div key={idx} className="flex items-center px-10 shrink-0">
              <BrandLogo {...brand} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
