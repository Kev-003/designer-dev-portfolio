"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandNavLinks, type BrandNavLinkItem } from "@/components/layout/brand-nav-links";
import { BrandNavFooter, BrandNavToggle } from "@/components/layout/brand-nav-extras";
import { useBrandNavAnimation } from "@/hooks/use-brand-nav-animation";
import { useBrandNavTyping } from "@/hooks/use-brand-nav-typing";
import Image from "next/image";

const navItems: BrandNavLinkItem[] = [
    { label: "about me.", href: "/about" },
    { label: "projects.", href: "/projects" },
    { label: "services.", href: "/services" },
];

export function BrandNav() {
    const [isOpen, setIsOpen] = useState(false);
    
    const label = useBrandNavTyping({
        isActive: isOpen,
        activeText: "close",
        inactiveText: "menu",
    });

    const { overlayRef, menuItemsRef, socialsRef } = useBrandNavAnimation({
        isOpen,
    });

    const handleClose = () => setIsOpen(false);

    return (
        <div className="relative w-full z-50">
            <BrandNavToggle
                label={label}
                className={isOpen ? "text-black dark:text-white" : "text-black dark:text-white"}
                onClick={() => setIsOpen((prev) => !prev)}
            />

            <div
                ref={overlayRef}
                className={`fixed inset-0 z-40 flex h-screen flex-col justify-between overflow-y-auto bg-white/95 dark:bg-black/95 backdrop-blur-lg p-5 text-black dark:text-white md:p-10 ${
                    isOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                aria-hidden={isOpen ? "false" : "true"}
            >
                <div className="flex items-start justify-start">
                    <Link
                        href="/"
                        onClick={handleClose}
                        className="text-3xl font-bold"
                    >
                        <Image
                            src="/next.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="select-none scale-70 md:scale-100 dark:invert"
                            style={{ width: "auto", height: "auto" }}
                        />
                    </Link>
                </div>

                <div className="flex flex-1 flex-col justify-end pt-6 md:justify-between">
                    <BrandNavLinks
                        items={navItems}
                        onSelect={handleClose}
                        containerRef={menuItemsRef}
                    />
                    <BrandNavFooter containerRef={socialsRef} />
                </div>
            </div>
        </div>
    );
}
