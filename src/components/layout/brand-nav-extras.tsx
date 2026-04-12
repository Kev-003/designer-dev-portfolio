import { 
  GithubLogo, 
  EnvelopeSimple, 
  FacebookLogo, 
  InstagramLogo, 
  LinkedinLogo 
} from "@phosphor-icons/react";

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
    const socials = [
        { Icon: GithubLogo, href: "https://github.com/Kev-003", label: "GitHub" },
        { Icon: EnvelopeSimple, href: "mailto:kevern.design@gmail.com", label: "Email" },
        { Icon: FacebookLogo, href: "https://www.facebook.com/kevernjoebert.angeles", label: "Facebook" },
        { Icon: InstagramLogo, href: "https://www.instagram.com/kvrn_03/", label: "Instagram" },
        { Icon: LinkedinLogo, href: "https://ph.linkedin.com/in/kevangeles", label: "LinkedIn" },
    ];

    return (
        <div ref={containerRef} className="pb-10 pl-0 sm:pl-16 md:pl-24 flex gap-8 text-2xl md:text-3xl">
            {socials.map(({ Icon, href, label }) => (
                <a 
                    key={href}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand transition-colors duration-300"
                    aria-label={label}
                >
                    <Icon weight="bold" />
                </a>
            ))}
        </div>
    );
}
