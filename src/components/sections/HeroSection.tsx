"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { LogoTicker } from '@/components/sections/LogoTicker';

// Simplified MorphHeadline
function MorphHeadline({ mode }: { mode: 'experience' | 'engineering' }) {
    return (
        <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight transition-all duration-500 ${mode === 'experience' ? 'text-brand' : 'text-white'}`}>
            {mode === 'experience' ? 'Architecting the story.' : 'Engineering the reality.'}
        </h1>
    );
}

// Sleek Mobile-Friendly Sliding Toggle
function SlidingToggle({ activeMode, onChange }: { activeMode: 'experience' | 'engineering', onChange: (v: 'experience' | 'engineering') => void }) {
    return (
        <div className="relative flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full p-1 shadow-inner border border-zinc-200 dark:border-zinc-800">
            {/* Sliding Background Pill */}
            <div 
                className="absolute w-1/2 h-[calc(100%-8px)] rounded-full bg-white dark:bg-zinc-800 shadow-sm transition-transform duration-300 ease-out"
                style={{ transform: activeMode === 'experience' ? 'translateX(0%)' : 'translateX(100%)' }}
            />
            
            <button
                onClick={() => onChange('experience')}
                className={`relative z-10 w-32 md:w-40 py-2 text-xs md:text-sm font-semibold tracking-wide transition-colors duration-300 ${activeMode === 'experience' ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
            >
                The Experience
            </button>
            <button
                onClick={() => onChange('engineering')}
                className={`relative z-10 w-32 md:w-40 py-2 text-xs md:text-sm font-semibold tracking-wide transition-colors duration-300 ${activeMode === 'engineering' ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
            >
                The Engine
            </button>
        </div>
    );
}

type Props = {
    mode?: 'experience' | 'engineering';
    onModeChange?: (mode: 'experience' | 'engineering') => void;
}

const DESCRIPTIONS = {
    experience: "I don't just design interfaces; I architect how people feel and flow through a narrative. My deepest expertise lies in heavy interaction design and high-stakes visual storytelling.",
    engineering: "I write the expressive, resilient code that makes deep interactions possible. From precise custom animations to scalable systems, I bring the craft of purposeful design into the logic of development.",
};

export function HeroSection({ mode = 'experience', onModeChange }: Props) {
    const [activeMode, setActiveMode] = useState<'experience' | 'engineering'>(mode);
    const { setTheme } = useTheme();

    // Ensure theme matches initial mode on mount
    useEffect(() => {
        setTheme(mode === 'experience' ? 'light' : 'dark');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleModeChange = (value: 'experience' | 'engineering') => {
        setActiveMode(value);
        setTheme(value === 'experience' ? 'light' : 'dark');
        onModeChange?.(value);
    };

    return (
        <div className="h-[95dvh] flex flex-col pb-12">
            <div className="flex-1 space-y-4 px-6 md:px-12 max-w-4xl mx-auto flex flex-col justify-center">
                <div className="flex items-center">
                    <SlidingToggle activeMode={activeMode} onChange={handleModeChange} />
                </div>

                <MorphHeadline mode={activeMode} />

                <p className={`max-w-xl text-lg md:text-xl leading-relaxed ${activeMode === 'experience' ? 'text-foreground opacity-90' : 'text-zinc-400'}`}>
                    {DESCRIPTIONS[activeMode]}
                </p>
            </div>

            <LogoTicker />
        </div>
    );
}
