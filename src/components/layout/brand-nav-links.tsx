import Link from "next/link";

export type BrandNavLinkItem = {
    label: string;
    href: string;
};

type Props = {
    items: BrandNavLinkItem[];
    onSelect?: () => void;
    containerRef?: React.Ref<HTMLDivElement>;
};

export function BrandNavLinks({ items, onSelect, containerRef }: Props) {
    return (
        <div
            ref={containerRef}
            className="mb-6 flex flex-col items-start gap-6 pl-0 text-5xl font-bold sm:gap-4 sm:pl-16 md:mb-0 md:flex-1 md:justify-center md:gap-6 md:pl-24 md:text-6xl lg:text-8xl"
        >
            {items.map((item) => (
                <div key={item.href}>
                    <Link
                        href={item.href}
                        className="text-black dark:text-white hover:opacity-75 transition-opacity"
                        onClick={onSelect}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </div>
    );
}
