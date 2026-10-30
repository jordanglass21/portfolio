# jordanglass.dev

[![CI](https://github.com/jordanglass21/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/jordanglass21/portfolio/actions/workflows/ci.yml)

My personal portfolio: who I am, what I've built, and where to see it running.

**Live at [jordanglass.dev](https://jordanglass.dev)**

[![Screenshot of the About page hero](https://jordanglass.dev/opengraph-image)](https://jordanglass.dev)

## Stack

Next.js (App Router, static prerendering) · TypeScript (strict) · Tailwind CSS · Vercel

No database, API routes, CMS, or UI library. Both pages prerender to static HTML.

## How it's built

- **Content is data.** Everything on the site lives in typed files in [`src/content/`](src/content). Adding a project means appending to [`projects.ts`](src/content/projects.ts); no component changes.
- **Field lines.** The About hero's one interactive element, [`FieldLines.tsx`](src/components/FieldLines.tsx), is a plain Canvas 2D grid of segments that turn toward the pointer.
  - The animation loop runs only while the target is easing and stops when idle. It pauses while off-screen (`IntersectionObserver`).
  - Segments are batched into intensity levels, so each frame is a handful of strokes rather than thousands.
  - It honors `prefers-reduced-motion`, handles `devicePixelRatio`, and dims segments behind the headline to keep text contrast at WCAG AA.
- **Accessibility.** Semantic landmarks and headings, a skip link, visible focus, AA contrast in light and dark schemes, and screen reader labels on links that open new tabs.
- **Metadata.** Generated Open Graph image (`next/og`), sitemap, and robots file from the App Router file conventions.

Lighthouse: 98–100 for Performance and 100 for Accessibility, Best Practices, and SEO on both pages.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # next typegen && tsc --noEmit
npm run build      # production build
```

CI runs lint, typecheck, and build on every pull request. Vercel deploys a preview for each PR and deploys `main` to production.

See [`SPEC.md`](SPEC.md) for the full spec and [`CLAUDE.md`](CLAUDE.md) for project conventions.
