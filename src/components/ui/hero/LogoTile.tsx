"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

type Mode = "experience" | "engineering";

const SVG_PATH =
  "M529.4,0C522.375,22.426 513.397,44.192 502.57,65.05C501.237,67.683 499.853,70.313 498.42,72.94C494.82,79.607 491.02,86.273 487.02,92.94C482.88,99.833 478.547,106.69 474.02,113.51L473.8,113.84C469.8,119.84 465.617,125.82 461.25,131.78C428.782,176.176 390.002,215.593 346.14,248.78C335.247,256.927 324.05,264.683 312.55,272.05L312.24,272.24C288.453,287.492 263.353,300.594 237.24,311.39C225.187,316.363 212.947,320.767 200.52,324.6L200.41,324.6C192.803,326.973 185.1,329.107 177.3,331L177.3,64.34L176.94,64.41L173.65,65.05C156.935,68.256 140.051,70.51 123.08,71.8L122.8,71.8L121.98,71.86C115.58,72.353 109.14,72.707 102.66,72.92C98.08,73.08 93.477,73.163 88.85,73.17C83.017,73.17 77.22,73.087 71.46,72.92C65.7,72.753 59.97,72.46 54.27,72.04C44.45,71.373 34.727,70.373 25.1,69.04L24.98,69.04C16.607,67.92 8.313,66.587 0.1,65.04L0,65.04L0,412.26C2.253,412.353 4.503,412.43 6.75,412.49C13.983,412.71 21.247,412.803 28.54,412.77L29.08,412.77C34.227,412.77 39.363,412.677 44.49,412.49C47.73,412.4 50.97,412.28 54.19,412.12C77.155,411.133 100.047,408.866 122.76,405.33L122.99,405.33C141.23,402.497 159.2,398.903 176.9,394.55L177.21,394.48C179.48,393.92 181.73,393.35 183.98,392.76C202.009,388.078 219.788,382.484 237.25,376C257.019,368.694 276.34,360.226 295.11,350.64C312.629,341.703 329.654,331.829 346.11,321.06C398.11,287.06 444.42,244.62 487.03,195.54L487.03,281.54L486.75,281.82C462.22,307.23 436.63,330.22 408.65,350.59C404.65,353.477 400.65,356.313 396.65,359.1L393.53,361.21C378.28,371.486 362.462,380.891 346.15,389.38C337.177,394.047 327.94,398.49 318.44,402.71L316.9,403.4C309.807,406.52 302.557,409.52 295.15,412.4C288.59,414.94 281.887,417.387 275.04,419.74C263.353,423.74 251.223,427.473 238.65,430.94L237.31,431.31L237.31,465.01C250.31,468.557 262.85,472.41 274.93,476.57C281.283,478.75 287.517,481.013 293.63,483.36C302.397,486.733 310.94,490.267 319.26,493.96L320.45,494.5C329.25,498.42 337.81,502.537 346.13,506.85C368.084,518.178 389.145,531.158 409.13,545.68C417.923,552.053 426.467,558.687 434.76,565.58L437,567.44C454.587,582.296 471.283,598.177 487,615L487.05,615L487.05,700.84L487,700.78C444.36,651.68 398.08,609.27 346.08,575.29C329.664,564.546 312.683,554.692 295.21,545.77C276.395,536.156 257.028,527.665 237.21,520.34C219.834,513.905 202.145,508.348 184.21,503.69C181.9,503.09 179.59,502.5 177.26,501.93L176.93,501.85C159.25,497.51 141.287,493.923 123.04,491.09L122.79,491.09C100.075,487.567 77.184,485.297 54.22,484.29C42.173,483.763 30.053,483.577 17.86,483.73C16.03,483.73 14.18,483.78 12.35,483.85L0,484.74L0,838.54C15.637,835.546 31.418,833.363 47.28,832L47.91,832C50.01,831.82 52.113,831.66 54.22,831.52C61.28,831 68.383,830.667 75.53,830.52C77.35,830.52 79.17,830.44 80.99,830.42C86.617,830.353 92.23,830.383 97.83,830.51L98.18,830.51C106.44,830.697 114.643,831.11 122.79,831.75L123.02,831.75C140.548,833.106 157.983,835.467 175.24,838.82L176.93,839.15L177.24,839.21L177.24,565.41C183.16,566.83 189.04,568.373 194.88,570.04L195,570.04C209.319,574.143 223.418,578.979 237.24,584.53C276.062,600.241 312.66,620.967 346.1,646.18C377.79,669.988 406.74,697.238 432.42,727.43C433.28,728.43 434.13,729.43 434.97,730.43C446.11,743.697 456.55,757.403 466.29,771.55C472.817,781.023 479.007,790.653 484.86,800.44C485.59,801.65 486.3,802.87 487.02,804.09C487.66,805.18 488.29,806.27 488.92,807.36C493.327,814.993 497.523,822.697 501.51,830.47C502.923,833.23 504.31,836.007 505.67,838.8C514.051,855.942 521.397,873.57 527.67,891.59C527.673,891.627 527.673,891.663 527.67,891.7C528.23,893.287 528.773,894.877 529.3,896.47L542.1,896.47L542.1,577.22L541.59,576.77C529.21,566.26 516.59,555.92 503.5,545.77C498.067,541.557 492.55,537.377 486.95,533.23C476.43,525.45 465.55,517.783 454.31,510.23L452.77,509.23C450.963,508.017 449.143,506.813 447.31,505.62L444.23,503.62L443.99,503.47C433.517,496.69 422.647,490.023 411.38,483.47C399.8,476.743 387.723,470.13 375.15,463.63L369.23,460.63L369.02,460.53C366.973,459.49 364.92,458.46 362.86,457.44C357.293,454.673 351.683,451.967 346.03,449.32L343.83,448.32L346.05,447.32C370.32,436.13 392.47,424.55 413.05,412.6C438.62,397.684 463.31,381.311 487,363.56C491.16,360.46 495.27,357.34 499.33,354.2L499.78,353.85C501.153,352.797 502.513,351.74 503.86,350.68C516.76,340.59 529.23,330.29 541.52,319.79L542.22,319.19L542.22,0L529.4,0ZM102.77,131.59C109.437,131.377 116.103,131.043 122.77,130.59L123.09,130.59L123.09,343.1L122.79,343.1C106.003,345.98 88.97,348.117 71.69,349.51L71.27,349.51C65.617,349.963 59.95,350.327 54.27,350.6L54.27,130.82C62.83,131.36 71.443,131.693 80.11,131.82C83.11,131.86 86.11,131.86 89.11,131.82L93.39,131.82C95.957,131.82 98.527,131.77 101.1,131.67L102.77,131.59ZM80.31,771.74C71.57,771.86 62.88,772.193 54.24,772.74L54.24,545.74C60.047,546.02 65.837,546.39 71.61,546.85L71.97,546.85C89.13,548.217 106.073,550.343 122.8,553.23L123.08,553.28L123.08,773L122.78,773C108.767,771.987 94.61,771.567 80.31,771.74Z";

// ASCII chars from dense to light
const ASCII_CHARS = "█▓▒░@#S%?*+;:,.  ";

interface LogoTileProps {
  mode: Mode;
}

// --- Experience: Glow Tracer ---
function GlowTracer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const trailRef = useRef<SVGCircleElement[]>([]);
  const glowRef = useRef<SVGCircleElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const path = svgRef.current?.querySelector<SVGPathElement>("#trace-path");
    if (!path || !dotRef.current || !glowRef.current) return;

    const totalLength = path.getTotalLength();
    const TRAIL_COUNT = 12;

    // Animate main dot along path
    const obj = { t: 0 };
    tlRef.current = gsap.timeline({ repeat: -1 });

    tlRef.current.to(obj, {
      t: 1,
      duration: 30,
      ease: "none",
      repeat: -1,
      onUpdate() {
        const pt = path.getPointAtLength(obj.t * totalLength);
        if (dotRef.current) {
          dotRef.current.setAttribute("cx", String(pt.x));
          dotRef.current.setAttribute("cy", String(pt.y));
        }
        if (glowRef.current) {
          glowRef.current.setAttribute("cx", String(pt.x));
          glowRef.current.setAttribute("cy", String(pt.y));
        }
        // Trail dots
        trailRef.current.forEach((trail, i) => {
          const offset = (obj.t - (i + 1) * 0.015 + 1) % 1;
          const tpt = path.getPointAtLength(offset * totalLength);
          trail.setAttribute("cx", String(tpt.x));
          trail.setAttribute("cy", String(tpt.y));
          trail.setAttribute("opacity", String(1 - (i + 1) / TRAIL_COUNT));
        });
      },
    });

    // Slow pulse on glow filter
    gsap.to("#glow-blur", {
      attr: { stdDeviation: "18 18" },
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tlRef.current?.kill();
      gsap.killTweensOf(obj);
      gsap.killTweensOf("#glow-blur");
    };
  }, []);

  const TRAIL_COUNT = 12;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 543 897"
      className="w-full h-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur
            id="glow-blur"
            in="SourceGraphic"
            stdDeviation="10 10"
            result="blur"
          />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="dot-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base outline — very faint */}
      <g transform="matrix(0.975459,0,0,0.975459,6.653229,11)">
        <path
          id="trace-path"
          d={SVG_PATH}
          fill="none"
          stroke="rgba(var(--brand-primary-rgb), 0.12)"
          strokeWidth="4"
        />
      </g>

      {/* Trail dots */}
      <g transform="matrix(0.975459,0,0,0.975459,6.653229,11)">
        {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              if (el) trailRef.current[i] = el;
            }}
            r={3 - i * 0.18}
            fill={`rgba(var(--brand-primary-rgb), 0.6)`}
            filter="url(#dot-glow)"
          />
        ))}
      </g>

      {/* Glow halo */}
      <g transform="matrix(0.975459,0,0,0.975459,6.653229,11)">
        <circle
          ref={glowRef}
          r={22}
          fill="rgba(var(--brand-primary-rgb), 0.18)"
          filter="url(#glow-filter)"
        />
      </g>

      {/* Main dot */}
      <g transform="matrix(0.975459,0,0,0.975459,6.653229,11)">
        <circle
          ref={dotRef}
          r={4.5}
          fill="rgba(var(--brand-primary-rgb), 1)"
          filter="url(#dot-glow)"
        />
      </g>
    </svg>
  );
}

// --- Engineering: ASCII Scramble ---
function AsciiScramble() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const COLS = 38;
    const ROWS = 62;
    const cw = W / COLS;
    const ch = H / ROWS;

    // Rasterize the SVG path to get a pixel mask
    const offscreen = document.createElement("canvas");
    offscreen.width = W;
    offscreen.height = H;
    const octx = offscreen.getContext("2d");
    if (!octx) return;

    const img = new Image();
    const svgBlob = new Blob(
      [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 543 897" width="${W}" height="${H}">
          <g transform="matrix(0.975459,0,0,0.975459,6.653229,11)">
            <path d="${SVG_PATH}" fill="white" stroke="white" stroke-width="8"/>
          </g>
        </svg>`,
      ],
      { type: "image/svg+xml" },
    );
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      octx.drawImage(img, 0, 0, W, H);
      URL.revokeObjectURL(url);

      const imageData = octx.getImageData(0, 0, W, H);
      const pixels = imageData.data;

      // Build density map: for each cell, sample brightness
      const density: number[][] = [];
      for (let row = 0; row < ROWS; row++) {
        density[row] = [];
        for (let col = 0; col < COLS; col++) {
          let sum = 0;
          let count = 0;
          for (let dy = 0; dy < ch; dy++) {
            for (let dx = 0; dx < cw; dx++) {
              const px = Math.floor(col * cw + dx);
              const py = Math.floor(row * ch + dy);
              const idx = (py * W + px) * 4;
              sum += pixels[idx]; // red channel (grayscale)
              count++;
            }
          }
          density[row][col] = sum / count / 255; // 0..1
        }
      }

      // Scramble state: each cell has a char and a noise offset
      const cells: { char: string; noise: number; speed: number }[][] = [];
      for (let row = 0; row < ROWS; row++) {
        cells[row] = [];
        for (let col = 0; col < COLS; col++) {
          cells[row][col] = {
            char: " ",
            noise: Math.random() * Math.PI * 2,
            speed: 0.03 + Math.random() * 0.05,
          };
        }
      }

      const BRAND_COLOR = "var(--brand-primary)"; // fallback brand purple
      const DIM_COLOR = "rgba(139,92,246,0.25)";

      function draw(timestamp: number) {
        if (!ctx || !canvas) return;
        timeRef.current = timestamp * 0.001;
        ctx.clearRect(0, 0, W, H);
        ctx.font = `bold ${Math.floor(ch * 0.72)}px "JetBrains Mono", "Fira Code", monospace`;

        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const d = density[row][col];
            if (d < 0.04) continue; // fully outside shape

            const cell = cells[row][col];
            cell.noise += cell.speed;

            // Map density to char index with time-based noise
            const noise = Math.sin(cell.noise) * 0.5 + 0.5;
            const charIdx = Math.floor(
              (1 - (d * 0.7 + noise * 0.3)) * (ASCII_CHARS.length - 1),
            );
            cell.char = ASCII_CHARS[Math.max(0, Math.min(ASCII_CHARS.length - 1, charIdx))];

            // Brightness: dense areas brighter, edges dimmer
            const bright = d > 0.5;
            ctx.fillStyle = bright ? BRAND_COLOR : DIM_COLOR;
            ctx.fillText(
              cell.char,
              col * cw,
              row * ch + ch * 0.85,
            );
          }
        }

        frameRef.current = requestAnimationFrame(draw);
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    img.src = url;

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={495}
      className="w-full h-full px-10"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export function LogoTile({ mode }: LogoTileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !glowRef.current || !asciiRef.current) return;

    const isExperience = mode === "experience";

    gsap.to(glowRef.current, {
      opacity: isExperience ? 1 : 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
    gsap.to(asciiRef.current, {
      opacity: isExperience ? 0 : 1,
      duration: 0.6,
      ease: "power2.inOut",
    });
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="relative w-86 h-110 rounded-sm border overflow-hidden hidden md:flex items-center justify-center"
      style={{
        background:
          mode === "experience"
            ? "var(--background)"
            : "var(--background)",
        borderColor:
          mode === "experience"
            ? "rgba(var(--brand-primary-rgb), 0.3)"
            : "rgba(var(--brand-primary-rgb), 0.2)",
        backdropFilter: "blur(8px)",
        boxShadow:
          mode === "experience"
            ? "0 0 40px rgba(var(--brand-primary-rgb), 0.15)"
            : "0 0 30px rgba(var(--brand-primary-rgb), 0.08), inset 0 0 60px rgba(0,0,0,0.4)",
        transition: "background 0.6s, border-color 0.6s, box-shadow 0.6s",
      }}
    >
      {/* Experience: SVG glow tracer */}
      <div
        ref={glowRef}
        className="absolute inset-3"
        style={{ opacity: mode === "experience" ? 1 : 0 }}
      >
        <GlowTracer />
      </div>

      {/* Engineering: ASCII canvas */}
      <div
        ref={asciiRef}
        className="absolute inset-2"
        style={{ opacity: mode === "engineering" ? 1 : 0 }}
      >
        <AsciiScramble />
      </div>

      {/* Scanline overlay for engineering mode */}
      {mode === "engineering" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}