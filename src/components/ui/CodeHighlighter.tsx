"use client";

import React, { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeHighlighterProps {
  code: string;
  lang: string;
}

export function CodeHighlighter({ code, lang }: CodeHighlighterProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    let isMounted = true;
    
    // Map generic lang names to valid shiki langs
    const language = lang.toLowerCase() === "vbnet" ? "vb" : lang;

    codeToHtml(code, {
      lang: language as any,
      theme: "vitesse-dark",
    })
      .then((out) => {
        if (isMounted) setHtml(out);
      })
      .catch((err) => {
        console.error("Shiki highlight error", err);
        if (isMounted) {
          // Fallback to plain text on error
          setHtml(`<pre><code>${code}</code></pre>`);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre className="font-mono text-[11px] md:text-xs text-zinc-300 leading-relaxed whitespace-pre tab-size-4 opacity-50 transition-opacity duration-300">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className="shiki-wrapper font-mono text-[11px] md:text-xs leading-relaxed tab-size-4 [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 [&>pre]:!whitespace-pre"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
