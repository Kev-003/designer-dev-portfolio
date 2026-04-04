@AGENTS.md

# CLAUDE.md - Portfolio Project

## Build & Development

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Code Style Guidelines

- **Framework:** Next.js 14+ (App Router).
- **Components:** Use React Server Components by default. Use `'use client'` only for hooks (useState, useEffect) or interactivity.
- **Styling:** Tailwind CSS using utility classes. Avoid CSS modules unless necessary.
- **Icons:** Use `lucide-react`.
- **TypeScript:** Strict mode. Define interfaces for props. Use `public` folder for static assets.
- **Formatting:** Standard Prettier rules. 2-space intent. No semi-colons (if preferred).

## Common Patterns

- **Data Fetching:** Fetch in Server Components using `fetch` or direct DB calls.
- **Navigation:** Use `next/link` for internal links and `next/image` for optimized images.
- **Metadata:** Use the `metadata` object in `layout.tsx` or `page.tsx` for SEO.
