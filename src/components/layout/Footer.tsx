"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export function Footer() {
  const onCard1Hover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      filter: "invert(1) brightness(1.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onCard1Leave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      filter: "invert(0) brightness(1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onCard2Hover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.02,
      filter: "invert(1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onCard2Leave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      filter: "invert(0)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <footer className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 px-5 md:pl-24 md:pr-10 py-10 mt-auto">
      {/* First Card */}
      <div
        onMouseEnter={onCard1Hover}
        onMouseLeave={onCard1Leave}
        className="relative cursor-pointer col-span-1 bg-black dark:bg-white text-white dark:text-black border flex flex-col justify-between px-4 py-6 md:px-6 md:py-8 rounded-xl md:rounded-2xl min-h-[220px] md:min-h-[400px]"
      >
        <div>
          <p className="font-light tracking-widest text-[8px] md:text-sm uppercase opacity-70">
            Projects
          </p>
          <h2 className="text-sm md:text-5xl font-light mt-3 md:mt-7 leading-tight font-sans">
            See What Else I’ve Been Working On
          </h2>
        </div>

        <div className="flex justify-between items-end mt-4 md:mt-12 gap-2">
          <p className="font-light text-[8px] md:text-xs opacity-70 uppercase tracking-widest max-w-[120px] md:max-w-[200px]">
            Branding | Digital | Print | UI/UX
          </p>
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            className="flex-shrink-0 md:w-6 md:h-6"
          />
        </div>
      </div>

      {/* Second Card */}
      <div
        onMouseEnter={onCard2Hover}
        onMouseLeave={onCard2Leave}
        onClick={() =>
          window.open(
            "https://mail.google.com/mail/?view=cm&fs=1&to=kevern.design@gmail.com",
            "_blank",
            "noopener,noreferrer",
          )
        }
        className="relative cursor-pointer col-span-1 md:col-span-2 bg-brand text-white flex flex-col justify-between px-4 py-6 md:px-6 md:py-8 rounded-xl md:rounded-2xl min-h-[220px] md:min-h-[400px]"
      >
        <div>
          <p className="font-light tracking-widest text-[8px] md:text-sm uppercase opacity-70">
            Get In Touch
          </p>
          <h2 className="text-sm md:text-5xl font-light mt-3 md:mt-7 leading-tight max-w-md font-sans">
            Got An Idea In Mind?
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-4 md:mt-12 gap-3 md:gap-6">
          <h1 className="font-medium text-2xl md:text-8xl tracking-tight leading-[0.85] font-sans">
            Start a Project
          </h1>
          <ArrowUpRight
            size={20}
            strokeWidth={2}
            className="flex-shrink-0 md:w-8 md:h-8"
          />
        </div>
      </div>
    </footer>
  );
}
