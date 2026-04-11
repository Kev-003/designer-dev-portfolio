"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { PROJECTS, type Project } from "@/lib/projects";
import { ProjectTag } from "@/components/ui/ProjectTag";
import { ArrowRight } from "lucide-react";
import TextPressure from "@/components/ui/TextPressure";

import { useGSAP } from "@gsap/react";

// ─── Project Row Component ──────────────────────────────────────────────────

function ProjectRow({ project }: { project: Project }) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current) return;

      // Background transition
      gsap.to(containerRef.current, {
        backgroundColor: isHovered ? project.brandColor : "transparent",
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });

      // Height and Opacity transition
      gsap.to(contentRef.current, {
        height: isHovered ? "auto" : 0,
        opacity: isHovered ? 1 : 0,
        marginTop: isHovered ? (window.innerWidth >= 768 ? 32 : 24) : 0,
        duration: 0.5,
        ease: isHovered ? "power3.out" : "power3.inOut",
        overwrite: true,
      });
    },
    {
      dependencies: [isHovered, project.brandColor],
      scope: containerRef,
      revertOnUpdate: false,
    },
  );

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
          <ArrowRight
            size={24}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>

      {/* Expanded Content */}
      <div
        ref={contentRef}
        className="relative z-10 overflow-hidden mt-0 opacity-0 h-0"
      >
        <div className="flex flex-col gap-8 items-start justify-between w-full">
          <div className="max-w-full flex flex-col gap-4 lg:mt-auto">
            <p className="text-xl md:text-2xl font-medium leading-snug text-white/90">
              {project.mission}
            </p>
            <div className="w-full h-px bg-white/10" />
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <ProjectTag
                  key={tag}
                  tag={tag}
                  className="bg-white/10 text-white border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Media Showcase Grid */}
          {project.assets.showcase && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-3 shrink-0">
              {/* Main Highlight (Video or Image) - Spans 2 columns */}
              <div className="sm:col-span-2 aspect-video rounded-lg overflow-hidden bg-zinc-900/50 border border-white/10 relative">
                {project.assets.showcase.highlight.type === "video" ? (
                  <video
                    src={project.assets.showcase.highlight.url}
                    preload="none"
                    loop
                    muted
                    playsInline
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={project.assets.showcase.highlight.url}
                    alt={`${project.name} Highlight`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Supporting Images - Column of 2 images */}
              <div className="grid grid-cols-2 gap-3 col-span-2">
                <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900/50 border border-white/10 relative">
                  <Image
                    src={project.assets.showcase.images[0]}
                    alt={`${project.name} Media 1`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-zinc-900/50 border border-white/10 relative">
                  <Image
                    src={project.assets.showcase.images[1]}
                    alt={`${project.name} Media 2`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

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
          {isMounted && (
            <TextPressure
              text="portfolio"
              flex={true}
              scale={true}
              textColor="#FFFFFF"
            />
          )}
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
