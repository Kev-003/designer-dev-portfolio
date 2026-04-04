import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type UseBrandNavAnimationArgs = {
    isOpen: boolean;
};

export function useBrandNavAnimation({ isOpen }: UseBrandNavAnimationArgs) {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const menuItemsRef = useRef<HTMLDivElement | null>(null);
    const socialsRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const overlay = overlayRef.current;

        if (!overlay) {
            return;
        }

        if (!timelineRef.current) {
            const menuItems = menuItemsRef.current?.children ?? [];
            const socials = socialsRef.current?.children ?? [];

            const tl = gsap.timeline({ paused: true });

            tl.fromTo(
                overlay,
                { yPercent: -100, opacity: 1 },
                { yPercent: 0, duration: 0.35, ease: 'circ.out' },
            );

            if (menuItems.length > 0) {
                tl.fromTo(
                    menuItems,
                    { 
                        opacity: 0.5,
                        y: -20,
                        filter: 'blur(100px)',
                    },
                    { 
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        stagger: 0.1,
                        duration: 0.7,
                        ease: 'power3.out',
                    },
                    '-=0.1'
                );
            }

            if (socials.length > 0) {
                tl.fromTo(
                    socials,
                    { opacity: 0, y: -10 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.08,
                        duration: 0.4,
                        ease: 'power3.out',
                    },
                    '-=0.25',
                );
            }

            timelineRef.current = tl;
        }

        if (isOpen) {
            timelineRef.current.play();
        } else {
            timelineRef.current.reverse();
        }
    }, [isOpen]);

    return {
        overlayRef,
        menuItemsRef,
        socialsRef,
    };
}
