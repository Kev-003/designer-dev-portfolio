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
            ease: "power2.out"
        });
    };

    const onCard1Leave = (e: React.MouseEvent) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            filter: "invert(0) brightness(1)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const onCard2Hover = (e: React.MouseEvent) => {
        gsap.to(e.currentTarget, {
            scale: 1.02,
            filter: "invert(1)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const onCard2Leave = (e: React.MouseEvent) => {
        gsap.to(e.currentTarget, {
            scale: 1,
            filter: "invert(0)",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    return (
        <footer className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 px-5 md:pl-24 md:pr-10 py-10 mt-auto">
            {/* First Card */}
            <div
                onMouseEnter={onCard1Hover}
                onMouseLeave={onCard1Leave}
                className="relative cursor-pointer col-span-1 bg-black dark:bg-white text-white dark:text-black border flex flex-col justify-between px-6 py-8 rounded-2xl min-h-[400px]"
            >
                <div>
                    <p className="font-light tracking-widest text-sm uppercase opacity-70">
                        Projects
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-light mt-7 leading-tight"
                    >
                        See What Else I’ve Been Working On
                    </h2>
                </div>

                <div className="flex justify-between items-end mt-12 gap-4">
                    <p className="font-light text-xs opacity-70 uppercase tracking-widest max-w-[200px]">
                        Branding | Digital Design | Print Design | UI/UX Design
                    </p>
                    <ArrowUpRight size={24} strokeWidth={1.5} className="flex-shrink-0" />
                </div>
            </div>

            {/* Second Card */}
            <div
                onMouseEnter={onCard2Hover}
                onMouseLeave={onCard2Leave}
                onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=kevern.design@gmail.com", "_blank", "noopener,noreferrer")}
                className="relative cursor-pointer col-span-1 md:col-span-2 bg-brand text-white flex flex-col justify-between px-6 py-8 rounded-2xl min-h-[400px]"
            >
                <div>
                    <p className="font-light tracking-widest text-sm uppercase opacity-70">
                        Get In Touch
                    </p>
                    <h2
                        className="text-4xl md:text-5xl font-light mt-7 leading-tight max-w-md"
                    >
                        Got An Idea In Mind?
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 gap-6">
                    <h1 className="font-medium text-6xl md:text-8xl tracking-tight leading-[0.85]">
                        Start a Project
                    </h1>
                    <ArrowUpRight size={32} strokeWidth={2} className="flex-shrink-0" />
                </div>
            </div>
        </footer>
    );
}
