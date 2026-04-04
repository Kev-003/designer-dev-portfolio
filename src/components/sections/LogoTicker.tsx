import React from 'react';

const BRANDS = [
  "Bataan Global",
  "Acme Corp",
  "Nexus Dynamics",
  "Elevate Studio",
  "Vanguard Industries",
  "Quantum Labs",
  "Courant Agency",
];

export function LogoTicker() {
    return (
        <div className="border-y border-zinc-200 dark:border-zinc-800 w-full flex pl-30 items-center h-[120px] relative overflow-hidden">
            {/* Static Text Area */}
            <div className="hidden md:flex flex-col justify-center bg-white dark:bg-[#0a0a0a] z-10 pr-8 h-full">
                <p className="font-mono uppercase text-[10px] tracking-widest leading-relaxed text-zinc-500 font-semibold whitespace-nowrap">
                    Collaborating with<br/>
                    forward-thinking brands
                </p>
            </div>

            {/* Scrolling Marquee Container with edge fades */}
            <div className="flex-1 relative flex items-center h-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black)]">
                <div className="flex whitespace-nowrap animate-marquee w-max">
                     {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
                        <div key={idx} className="flex items-center px-10">
                            <span className="font-sans font-bold text-xl tracking-tight text-zinc-400 dark:text-zinc-600 transition-colors uppercase">
                                {brand}
                            </span>
                        </div>
                     ))}
                </div>
            </div>
        </div>
    );
}
