"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import TextPressure from "@/components/ui/TextPressure";

// Register ScrollTrigger to handle scroll-based animations
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  // Real resume data
  const skills = [
    "ReactJS",
    "Next.js",
    "TailwindCSS",
    "AlpineJS",
    "JavaScript",
    "Laravel",
    "PostgreSQL",
    "MySQL",
    "Java",
    "Python",
    "Figma",
    "Adobe After Effects",
    "Premiere Pro",
    "DaVinci Resolve",
    "Adobe Illustrator",
    "Photoshop",
    "HubSpot",
    "Visual Basic",
  ];

  const experiences = [
    {
      role: "Full-Stack Developer / System Analyst / Technical Documentation Lead",
      company: "Provincial Government of Bataan",
      year: "2026",
      desc: "Built a full-stack Laravel governance platform for document requests and NFC walk-ins, and independently led requirements writing and data architectural design.",
    },
    {
      role: "Web Developer & Digital Ops",
      company:
        "Northeastern Property Management Solutions / Rymer Realty Group",
      year: "2025",
      desc: "Designed high-conversion landing pages and managed CRM lead capture workflows to streamline client inquiries and operations.",
    },
    {
      role: "Print & Publication Designer",
      company: "Lawn Rover",
      year: "2025",
      desc: "Developed reusable on-brand quote templates and visually engaging promotional brochures to enhance marketing presence.",
    },
    {
      role: "Front-End Dev & Founding Designer",
      company: "Courant",
      year: "2024 - Present",
      desc: "Built the company's entire visual identity from the ground up and developed the product experience end-to-end through cohesive UI/UX and front-end code.",
    },
    {
      role: "Creative Director / Multimedia",
      company:
        "Various Organizations (SSITE, CCST Digital Arts, Church So Blessed)",
      year: "2023 - Present",
      desc: "Led design teams and directed continuous event visuals, motion graphics, and social media content to boost organizational community engagement.",
    },
    {
      role: "Freelance Graphic Designer",
      company: "Self-Employed",
      year: "2022 - Present",
      desc: "Developed distinctive logos, cohesive branding guidelines, and impactful presentation templates for businesses and university organizations.",
    },
  ];

  const education = [
    {
      role: "BS Computer Science (Software Development)",
      company: "Bataan Peninsula State University",
      year: "2022 - Present",
      desc: "",
    },
  ];

  const certifications = [
    {
      role: "IT Specialist – Cybersecurity",
      company: "Certiport",
      year: "May 2025",
      desc: "",
    },
    {
      role: "Cyber Threat Management",
      company: "Cisco",
      year: "Mar 2025",
      desc: "",
    },
    {
      role: "IT Specialist – Software Development",
      company: "Certiport",
      year: "Dec 2024",
      desc: "",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Intro animation for header text
      gsap.fromTo(
        textRefs.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.1,
        },
      );

      // Subtle continuous floating effect for the photo slot
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          y: -15,
          rotation: 1,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      // Timeline reveal animation for experience items
      gsap.utils.toArray<HTMLElement>(".resume-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            },
          },
        );
      });

      // Interactive pop-in for skill pills
      gsap.fromTo(
        ".skill-pill",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interactive hover effects for the photo slot
  const handlePhotoHover = () => {
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        scale: 1.05,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handlePhotoLeave = () => {
    if (photoRef.current) {
      gsap.to(photoRef.current, {
        scale: 1,
        rotation: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      // Resume the float animation after leaving
      gsap.to(photoRef.current, {
        y: -15,
        rotation: 1,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-32 pb-24 px-6 md:px-24 mx-auto w-full"
    >
      {/* Header Section */}
      <header className="mb-20 md:mb-32">
        {/* <h1 
                    ref={el => { textRefs.current[0] = el; }} 
                    className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6"
                >
                    About Me
                </h1> */}
        <div className="relative h-[150px] md:h-[250px] w-full overflow-visible mb-6">
          <TextPressure
            text="about me"
            flex={true}
            scale={true}
            textColor="var(--brand-primary)"
          />
        </div>
        <p
          ref={(el) => {
            textRefs.current[1] = el;
          }}
          className="text-xl md:text-3xl font-light text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed"
        >
          I blur the lines between design and engineering to build digital
          experiences that feel alive.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 relative">
        {/* Left Column: Photo & Bio */}
        <div className="md:col-span-5 flex flex-col gap-12">
          <div
            ref={photoRef}
            onMouseEnter={handlePhotoHover}
            onMouseLeave={handlePhotoLeave}
            className="relative w-full max-w-sm aspect-[4/5] bg-zinc-100 dark:bg-[#111] rounded-2xl overflow-hidden cursor-crosshair transform-gpu border border-zinc-200 dark:border-zinc-800 shadow-xl"
          >
            {/* Placeholder for Photo - Replace this div with an actual <Image /> tag when ready */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 font-mono text-sm tracking-widest border-2 border-dashed border-zinc-300 dark:border-zinc-700 m-4 rounded-xl transition-all duration-300 hover:border-brand hover:text-brand">
              <span className="mb-2">📸</span>
              <span>[ INSERT PHOTO ]</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-medium tracking-tight">The Story</h3>
            <div className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed space-y-4">
              <p>
                With a background in both visual design and frontend
                development, I approach every project with a dual mindset. I
                believe that the best products are built when aesthetics and
                performance are treated with equal importance.
              </p>
              <p>
                When I&apos;m not pushing pixels or writing logic, you can
                usually find me exploring new interactive libraries, diving into
                creative coding, or continuously refining my craft to build
                immersive interfaces.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <a
              href="mailto:kevern.design@gmail.com"
              className="group inline-flex items-center gap-3 text-xl font-medium hover:text-brand transition-colors"
            >
              Let&apos;s collaborate
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: Experience & Skills */}
        <div className="md:col-span-7 flex flex-col gap-20">
          {/* Experience Section */}
          <section>
            <h3 className="text-sm font-mono tracking-[0.2em] text-brand uppercase mb-12 block flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand inline-block"></span>
              Experience
            </h3>
            <div className="flex flex-col gap-12">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="resume-item group border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 md:pl-10 pb-4 relative hover:border-brand transition-colors duration-300"
                >
                  {/* Timeline dot */}
                  <div className="absolute w-4 h-4 bg-white dark:bg-black border-2 border-zinc-300 dark:border-zinc-700 rounded-full -left-[9px] top-1.5 group-hover:border-brand group-hover:scale-125 transition-all duration-300" />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-3">
                    <h4 className="text-2xl md:text-3xl font-medium tracking-tight">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.year}
                    </span>
                  </div>

                  <h5 className="text-xl text-brand font-light mb-5">
                    {exp.company}
                  </h5>

                  {exp.desc && (
                    <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-xl">
                      {exp.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education Section
          <section>
            <h3 className="text-sm font-mono tracking-[0.2em] text-brand uppercase mb-12 block flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand inline-block"></span>
              Education
            </h3>
            <div className="flex flex-col gap-12">
              {education.map((exp, idx) => (
                <div
                  key={idx}
                  className="resume-item group border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 md:pl-10 pb-4 relative hover:border-brand transition-colors duration-300"
                >
                  <div className="absolute w-4 h-4 bg-white dark:bg-black border-2 border-zinc-300 dark:border-zinc-700 rounded-full -left-[9px] top-1.5 group-hover:border-brand group-hover:scale-125 transition-all duration-300" />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-3">
                    <h4 className="text-2xl md:text-3xl font-medium tracking-tight">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.year}
                    </span>
                  </div>

                  <h5 className="text-xl text-brand font-light mb-5">
                    {exp.company}
                  </h5>

                  {exp.desc && (
                    <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-xl">
                      {exp.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-mono tracking-[0.2em] text-brand uppercase mb-12 block flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand inline-block"></span>
              Certifications
            </h3>
            <div className="flex flex-col gap-12">
              {certifications.map((exp, idx) => (
                <div
                  key={idx}
                  className="resume-item group border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 md:pl-10 pb-4 relative hover:border-brand transition-colors duration-300"
                >
                  <div className="absolute w-4 h-4 bg-white dark:bg-black border-2 border-zinc-300 dark:border-zinc-700 rounded-full -left-[9px] top-1.5 group-hover:border-brand group-hover:scale-125 transition-all duration-300" />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-3">
                    <h4 className="text-2xl md:text-3xl font-medium tracking-tight">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.year}
                    </span>
                  </div>

                  <h5 className="text-xl text-brand font-light mb-5">
                    {exp.company}
                  </h5>

                  {exp.desc && (
                    <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-xl">
                      {exp.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section> */}

          {/* Skills Section */}
          <section className="skills-container">
            <h3 className="text-sm font-mono tracking-[0.2em] text-brand uppercase mb-10 block flex items-center gap-4">
              <span className="w-8 h-[1px] bg-brand inline-block"></span>
              Toolkit
            </h3>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="skill-pill px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 cursor-crosshair hover:-translate-y-1 shadow-sm hover:shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
