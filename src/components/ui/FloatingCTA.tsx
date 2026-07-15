"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Mail, X } from "lucide-react";

export function FloatingCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // If not on home page, it's always visible initially
    if (pathname !== "/") {
      setIsVisible(true);
      return;
    }

    // On home page, wait for scroll
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Also uncollapse it if we scroll back up so it's fresh next time
        if (window.scrollY === 0) {
          setIsCollapsed(false);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-14 h-14 bg-brand text-zinc-100 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
          aria-label="Show Contact Form"
        >
          <Mail size={24} />
        </button>
      ) : (
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 transform origin-bottom-right">
          <button
            onClick={() => setIsCollapsed(true)}
            className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            aria-label="Hide Contact Button"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col gap-2 pr-8">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1">
              Start a project
            </h3>
            <p className="text-sm text-brand-white max-w-[200px] leading-relaxed mb-1">
              I build thoughtful digital experiences. Let&apos;s work together.
            </p>
            <a
              href="mailto:kevern.design@gmail.com"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-brand text-zinc-100 text-sm font-semibold rounded-full hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              <Mail size={16} />
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
