import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="text-3xl font-extrabold tracking-tight mt-0 mb-6 pb-4 border-b border-border"
        {...props}
      />
    ),
    h2: (props) => (
      <h2 className="text-xl font-bold mt-10 mb-4 scroll-mt-20" {...props} />
    ),
    h3: (props) => (
      <h3
        className="text-base font-semibold mt-6 mb-3 scroll-mt-20"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-sm text-muted-foreground leading-relaxed mb-4"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="list-disc list-outside pl-5 mb-4 space-y-1.5 text-sm text-muted-foreground"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal list-outside pl-5 mb-4 space-y-1.5 text-sm text-muted-foreground"
        {...props}
      />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-2 border-brand/40 pl-4 my-4 text-sm text-muted-foreground italic"
        {...props}
      />
    ),
    code: ({ className, children, ...props }: any) => {
      const isBlock =
        (typeof children === "string" && children.includes("\n")) ||
        (className && className.includes("language-"));

      const baseClasses = "font-mono text-xs";
      const inlineClasses = "bg-muted px-1.5 py-0.5 rounded text-foreground";
      const blockClasses = "bg-transparent text-inherit p-0";

      return (
        <code
          className={`${baseClasses} ${isBlock ? blockClasses : inlineClasses} ${className || ""}`}
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: (props) => (
      <pre
        className="bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 rounded-md p-4 overflow-x-auto my-6 text-xs font-mono text-zinc-300 leading-relaxed [&>code]:!bg-transparent [&>code]:!text-inherit [&>code]:!p-0"
        {...props}
      />
    ),
    hr: () => <hr className="border-border my-8" />,
    table: (props) => (
      <div className="overflow-x-auto my-6 rounded-md border border-border">
        <table className="w-full text-xs border-collapse" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-muted/60" {...props} />,
    th: (props) => (
      <th
        className="text-left px-3 py-2 font-semibold text-foreground border-b border-border"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-3 py-2 text-muted-foreground border-b border-border/50 align-top"
        {...props}
      />
    ),
    tr: (props) => (
      <tr className="hover:bg-muted/30 transition-colors" {...props} />
    ),
    ...components,
  };
}
