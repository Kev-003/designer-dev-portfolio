"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import gsap from "gsap";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Mode = "exp" | "eng";

type LifecycleStep = {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  modes: Mode[];
};

const STEPS: LifecycleStep[] = [
  {
    step: "01",
    title: "Discovery Arc",
    subtitle: "Intake & Strategic Foundation",
    description:
      "Before a single line is drawn or written, the project is understood. Goals are clarified, constraints are surfaced, and the right questions are asked.",
    points: [
      "Client questionnaires & initial briefs",
      "System analysis & stakeholder mapping",
      "Defining the Why and the Who",
    ],
    modes: ["exp", "eng"],
  },
  {
    step: "02",
    title: "Narrative Framework",
    subtitle: "Conceptualization",
    description:
      "The invisible architecture — the story the user walks through, and the logic that needs to support it from beneath.",
    points: [
      "Mind mapping & moodboard curation",
      "User stories & feature planning",
      "Information architecture & user flow diagrams",
    ],
    modes: ["exp", "eng"],
  },
  {
    step: "03",
    title: "Structural Build",
    subtitle: "The Skeleton",
    description:
      "Ideas take their first physical form — on paper and in schema. Visual layout and data relationships are determined simultaneously.",
    points: [
      "Analog sketching & layout exploration",
      "Database schema & relational design",
      "Wireframes that double as technical specifications",
    ],
    modes: ["exp", "eng"],
  },
  {
    step: "04",
    title: "Production Phase",
    subtitle: "Execution",
    description:
      "The heaviest phase. Design becomes pixel-perfect; logic becomes performant, maintainable code. Neither waits for the other.",
    points: [
      "Vectorization & high-fidelity mockups",
      "Full-stack development & API design",
      "Motion & interaction prototyping",
    ],
    modes: ["exp", "eng"],
  },
  {
    step: "05",
    title: "The Synthesis",
    subtitle: "Delivery",
    description:
      "Both sides converge. The presentation is polished. The system is live and built to last long after handoff.",
    points: [
      "Initial presentation & client feedback loops",
      "Deployment, optimization & performance audits",
      "Handoff documentation & long-term scalability planning",
    ],
    modes: ["exp", "eng"],
  },
];

// ─── Accordion Item ────────────────────────────────────────────────────────────

function AccordionItem({
  step,
  isOpen,
  onToggle,
}: {
  step: LifecycleStep;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const isMounted = useRef(false);
  const contentId = useId();

  useEffect(() => {
    const content = contentRef.current;
    const icon = iconRef.current;
    if (!content || !icon) return;

    if (!isMounted.current) {
      // Set initial state without animation on mount
      gsap.set(content, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      });
      gsap.set(icon, { rotation: isOpen ? 45 : 0 });
      isMounted.current = true;
      return;
    }

    if (isOpen) {
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(icon, { rotation: 45, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
      gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [isOpen]);

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 last:border-b">
      {/* Header row — the trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls={contentId}
        className="group w-full grid grid-cols-[2.5rem_1fr_auto_1.5rem] md:grid-cols-[3rem_1fr_auto_1.5rem] items-center gap-4 py-5 md:py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-sm"
      >
        {/* Step number */}
        <span className="font-mono text-xs tracking-widest text-zinc-400 dark:text-zinc-600 font-semibold tabular-nums">
          {step.step}
        </span>

        {/* Title */}
        <span
          className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-200 ${
            isOpen
              ? "text-zinc-900 dark:text-zinc-100"
              : "text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
          }`}
        >
          {step.title}
        </span>

        {/* Mode pills — hidden on very small screens */}
        {/* <span className="hidden sm:flex items-center gap-1.5">
          {step.modes.map((mode) => (
            <span
              key={mode}
              className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono tracking-widest font-semibold uppercase border transition-all duration-300 ${
                mode === "exp"
                  ? "bg-brand/10 text-brand border-brand/20"
                  : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              {mode === "exp" ? "Experience" : "Engineering"}
            </span>
          ))}
        </span> */}

        {/* Toggle icon — a "+" that rotates 45° to become "×" */}
        <span
          ref={iconRef}
          aria-hidden
          className="text-xl leading-none text-zinc-400 dark:text-zinc-500 font-light select-none"
        >
          +
        </span>
      </button>

      {/* Expandable content */}
      <div
        id={contentId}
        ref={contentRef}
        role="region"
        className="overflow-hidden h-0 opacity-0"
      >
        {/* Indent to align with the title column */}
        <div className="grid grid-cols-1 md:grid-cols-[2.5rem_1fr] md:gap-4 pb-8">
          <div className="hidden md:block" aria-hidden /> {/* spacer */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Subtitle + description */}
            <div className="flex-1 space-y-3">
              <p className="font-mono text-sm text-brand opacity-75 tracking-wide">
                {step.subtitle}
              </p>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-prose">
                {step.description}
              </p>
            </div>

            {/* Bullet points */}
            <ul className="flex-1 flex flex-col gap-2.5">
              {step.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-zinc-500 dark:text-zinc-500"
                >
                  <span className="mt-[7px] shrink-0 w-1 h-1 rounded-full bg-brand/40" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export function ProcessSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="py-20 md:py-28 pl-6 md:pl-30">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase font-semibold">
              How I Work
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              The Project Lifecycle.
            </h2>
          </div>
          <p className="md:max-w-xs text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Design thinking and engineering logic — never separated, always
            synchronized.
          </p>
        </div>

        {/* Accordion */}
        <div>
          {STEPS.map((step, index) => (
            <AccordionItem
              key={step.step}
              step={step}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
