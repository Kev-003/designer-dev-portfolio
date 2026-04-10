export function BrandNavToggle({ label, className, onClick }: { label: string, className?: string, onClick: () => void }) {
    const defaultClasses = "z-50 px-4 py-2 font-mono uppercase tracking-widest transition-colors duration-300";
    
    return (
        <button 
            onClick={onClick} 
            className={`${defaultClasses} ${className || ''}`}
        >
            {label}
            <span className="inline-block w-[3px] h-[1.2em] bg-current animate-blink ml-1.5 align-middle" />
        </button>
    );
}

export function BrandNavFooter({ containerRef }: { containerRef?: React.Ref<HTMLDivElement> }) {
    return (
        <div ref={containerRef} className="pb-10 pl-0 sm:pl-16 md:pl-24 flex gap-6 text-xl">
            <a href="#" className="hover:opacity-75">Twitter</a>
            <a href="#" className="hover:opacity-75">GitHub</a>
        </div>
    );
}
