import Link from "next/link";
import React from "react";

export function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg hover:opacity-80 transition-opacity">
          Kevern
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            About
          </Link>
          <a href="#" className="text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            Projects
          </a>
        </div>
      </div>
    </nav>
  );
}
