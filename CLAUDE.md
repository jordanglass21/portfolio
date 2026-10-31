# CLAUDE.md

Personal portfolio site for Jordan Glass, a software engineer looking for engineering roles, including software, forward-deployed, solutions, and sales engineering. Two pages: About (home) and Projects. Static content only, no backend, no database, no auth.

## Stack

- Next.js (latest stable, App Router) with TypeScript in strict mode
- Tailwind CSS for styling
- `next/font` for self-hosted fonts, `next/image` for the headshot and project screenshots
- Deployed on Vercel (Git integration: every PR gets a preview URL, `main` deploys to production)
- Package manager: npm
- Signature element: the `FieldLines` canvas in the About hero (see `SPEC.md`). It is the only ambient effect on the site.

Do not add Supabase, a database, an API route, a CMS, or a UI component library unless Jordan asks for it. All content lives in typed TypeScript files in the repo.

## Commands

- `npm run dev` starts the local dev server
- `npm run build` runs a production build (must pass before shipping)
- `npm run lint` runs ESLint
- `npm run typecheck` runs `next typegen && tsc --noEmit` (route types like `LayoutProps` are generated)

## Structure

```
src/
  app/
    layout.tsx          # fonts, metadata, site header/nav, footer
    page.tsx            # About (home)
    projects/page.tsx   # Projects
    not-found.tsx
  components/           # small presentational components only
  content/
    profile.ts          # name, bio, headshot path, social links
    projects.ts         # project list (typed array)
public/
  images/               # headshot, project screenshots
  resume.pdf            # optional, linked from About
```

Content is data, components are layout. To change copy or add a project, edit `src/content/*` only; no component changes should be needed.

## Conventions

- Server Components by default. Add `"use client"` only for real interactivity (the `FieldLines` canvas, a mobile nav toggle).
- Every external link opens in a new tab with `rel="noopener noreferrer"` and has an accessible label.
- Every image has meaningful `alt` text. Decorative images use `alt=""`.
- Meet WCAG 2.1 AA (Section 508 aligned): color contrast, semantic HTML, landmarks, heading order.
- Responsive from 360px wide upward. Visible keyboard focus. Respect `prefers-reduced-motion`. The site is deliberately dark-only (one navy palette for every visitor, Jordan's choice); don't add a light scheme unless Jordan asks.
- Set page `metadata` (title, description, Open Graph) on both pages.
- Keep dependencies minimal. Ask before adding any package.

## Workflow

- Work on a feature branch, never commit directly to `main`.
- Use the **ship** skill for committing, opening pull requests, and merging. Do not hand-roll `git push` / `gh pr create` flows.
- Before shipping: `npm run lint && npm run typecheck && npm run build` must all pass.
- Keep PRs small and focused on one change.

## Spec

The full spec (pages, content, design direction, acceptance criteria) is in `SPEC.md`. Read it before starting new work.

Next.js-specific agent notes (this Next.js version has breaking changes from older releases) are in `AGENTS.md`.
