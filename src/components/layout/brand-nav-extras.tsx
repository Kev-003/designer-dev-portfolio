export function BrandNavToggle({ label, className, onClick }: { label: string, className?: string, onClick: () => void }) {
    return (
        <button 
            onClick={onClick} 
            className={`absolute top-5 right-5 z-50 px-4 py-2 font-mono uppercase tracking-widest mix-blend-difference ${className || 'text-white'}`}
        >
            {label}
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
