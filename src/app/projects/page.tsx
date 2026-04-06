"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { PROJECTS, type Project } from "@/lib/projects";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { ArrowRight } from "lucide-react";
import TextPressure from "@/components/ui/TextPressure";

// ─── Project Row Component ──────────────────────────────────────────────────

function ProjectRow({ project }: { project: Project }) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background and height transition
      gsap.to(containerRef.current, {
        backgroundColor: isHovered ? project.brandColor : "transparent",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        height: isHovered ? "auto" : 0,
        opacity: isHovered ? 1 : 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [isHovered, project.brandColor]);

  return (
    <Link
      href={`/projects/${project.slug}`}
      ref={containerRef}
      className="group relative block border-b border-zinc-800 transition-colors py-8 md:py-12 px-6 md:px-20 overflow-hidden no-underline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Basic Info */}
        <div>
          <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase group-hover:text-white/70 transition-colors">
            {project.year}
          </span>
          <h2 className="mt-1 text-4xl md:text-6xl font-bold tracking-tight text-white transition-transform group-hover:translate-x-2 duration-500">
            {project.name}
          </h2>
        </div>

        {/* Action Icon */}
        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700 text-zinc-400 group-hover:border-white/30 group-hover:text-white transition-all">
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Expanded Content */}
      <div ref={contentRef} className="relative z-10 overflow-hidden h-0 opacity-0 mt-6 md:mt-8">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-medium leading-snug text-white/90">
              {project.mission}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <ProjectTag 
                  key={tag} 
                  tag={tag} 
                  className="bg-white/10 text-white border-white/20" 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags for the filter
  const allTags = Array.from(new Set(PROJECTS.flatMap((p) => p.tags)));

  const filteredProjects = selectedTag
    ? PROJECTS.filter((p) => p.tags.includes(selectedTag))
    : PROJECTS;

  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-20">
      {/* Header */}
      <section className="px-6 md:px-20 mb-16 md:mb-24">
        <span className="font-mono text-[11px] tracking-[0.3em] text-brand uppercase block mb-4">
          Selected Works
        </span>
        <div className="relative h-[200px] md:h-[300px] w-full -ml-3 mt-10 overflow-visible">
          <TextPressure 
            text="portfolio" 
            flex={true} 
            scale={true} 
            textColor="#FFFFFF"

          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mt-12 md:mt-16 border-b border-zinc-800 pb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest border transition-all ${
              selectedTag === null
                ? "bg-brand border-brand text-white shadow-[0_0_20px_rgba(72,50,213,0.3)]"
                : "bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            All Projects
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest border transition-all ${
                selectedTag === tag
                  ? "bg-brand border-brand text-white shadow-[0_0_20px_rgba(72,50,213,0.3)]"
                  : "bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Projects List */}
      <section className="border-t border-zinc-800">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))
        ) : (
          <div className="px-6 md:px-20 py-20 text-zinc-500 font-mono italic">
            No projects found in this category.
          </div>
        )}
      </section>
    </main>
  );
}
