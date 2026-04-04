<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AGENTS.md - Project Intelligence

## Project Context

This is a high-performance personal portfolio. It must be visually striking but technically "boring" (stable, fast, and SEO-optimized).

## Agent Constraints

- **Minimalism:** Do not suggest heavy libraries (like Framer Motion) unless specifically asked. Stick to Tailwind transitions first.
- **Performance:** Always prioritize Image optimization and LCP (Largest Contentful Paint).
- **Project Structure:**
  - `src/app`: Routes and Pages.
  - `src/components`: Reusable UI pieces.
  - `src/lib`: Utility functions and shared logic.
  - `src/assets`: Local images/icons.

## High-Level Rules

1. **Check Sibling Files:** Before creating a new component, check `src/components` to see if a similar pattern already exists.
2. **No Hallucinations:** If a library version is unknown (e.g., a specific Shadcn component), ask for the documentation or check the local file.
3. **Portfolio Polish:** Ensure all buttons have hover states and all images have `alt` text.
<!-- END:nextjs-agent-rules -->
