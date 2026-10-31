# Spec: Jordan Glass portfolio

## Goal

A small, fast portfolio site that a recruiter or hiring manager can read in under a minute and come away knowing who Jordan is, what he builds, and where to see it running. It is also a work sample: the code should be clean enough that a reviewer opening the GitHub repo is impressed too.

Audience: recruiters, hiring managers, and engineers at large companies and government agencies, reviewing applications for software engineering and customer-facing engineering roles (forward-deployed, solutions, and sales engineering). The site should read as one person with one story: an engineer who builds production software and works well with the people who use it.

## Pages

### 1. About (`/`)

- Headshot (`public/images/headshot.jpg`, placeholder until Jordan adds one)
- Name and one-line role: "Software engineer"
- Short bio, 2 to 3 short paragraphs. Draft (Jordan will edit):
  > I'm a software engineer finishing my MS in Computer Science at Northeastern. Most recently I built production REST APIs in TypeScript, NestJS, and PostgreSQL at Hydrow, shipping weekly through CI/CD.
  >
  > Before engineering, I spent four years running operations for an $8M/yr retail business, where I built an online sales channel and worked directly with customers and vendors every day.
  >
  > I'm looking for roles where I build software and work directly with the people who use it, whether that's on a product team or as a forward-deployed, solutions, or sales engineer.
- Links: GitHub, LinkedIn, email. Optional: résumé PDF.
- A clear path to the Projects page.

### 2. Projects (`/projects`)

Two projects to start, structured so adding a third is just a new entry in `src/content/projects.ts`.

Each project shows:
- Name
- One-sentence description of what it does, in plain language
- 2 to 4 sentences or short bullets on how it was built and the interesting technical decisions
- Tech stack (list of tags)
- Link to the live site
- Link to the source on GitHub (optional per project)
- Screenshot (optional per project)

Suggested type:

```ts
export type Project = {
  slug: string;
  name: string;
  summary: string;        // one sentence, what it does
  details: string[];      // how it was built, key decisions
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
  image?: { src: string; alt: string };
};
```

## Content to fill in

Use these placeholders until Jordan provides real values. Leave a `TODO(jordan)` comment next to each.

| Field | Value |
| --- | --- |
| Name | Jordan Glass |
| Email | jordanglass421@gmail.com |
| GitHub | https://github.com/jordanglass21 |
| LinkedIn | https://www.linkedin.com/in/jordan-glass-one |
| Headshot | `public/images/headshot.jpg` (TODO) |
| Project 1 | name, summary, details, stack, live URL, repo URL (TODO) |
| Project 2 | name, summary, details, stack, live URL, repo URL (TODO) |

## Design direction

### Tone

Modern and confident, in the spirit of Linear, Vercel, and Stripe, with the restraint that enterprise and government reviewers expect. There is one signature interactive element, the field lines in the About hero, and everything else is calm, precise, and fast. Nothing gimmicky or themed: no fake terminals, fake APIs, joke status pages, cursor trails, or 3D scenes.

### Signature element: field lines (About hero)

A field of short line segments behind the hero text that turn to point toward the visitor's cursor. It should feel ambient: the page looks finished when nobody touches it, and it quietly rewards anyone who does.

- `src/components/FieldLines.tsx`, a client component that renders a single `<canvas aria-hidden="true">` absolutely positioned behind the hero content. Plain Canvas 2D, no libraries.
- Segments sit on a grid every 22px. Each one rotates to point at a target point. Length (about 5 to 14px), stroke width, and opacity (about 0.16 to 0.86) all increase as the segment gets closer to the target, falling off over a radius of about 230px.
- The target follows the pointer with easing (move about 14% of the remaining distance per frame). The animation loop runs only while the target is settling and stops once it's idle. No continuous animation.
- At rest (on load, after the pointer leaves, on touch devices), the target sits at about 78% across and 60% down the hero, so the field looks intentional when untouched.
- Segments behind the headline are dimmed (about 45% of their normal opacity) so text contrast stays WCAG AA.
- Use pointer events so touch works too.
- With `prefers-reduced-motion: reduce`, skip the easing: the field updates directly to the pointer position with no animated movement.
- Handle `devicePixelRatio` for sharp lines, redraw on resize (`ResizeObserver`), and skip work while the hero is off-screen (`IntersectionObserver`).
- Read the line color from a CSS variable so it works in both color schemes.

Build this component first, on a bare page, and get Jordan's sign-off on how it feels before building the pages around it.

### Color tokens

Light is the primary design (chosen from the design-direction mocks: "split portrait"). Follow the visitor's system setting, with a teal-tinted dark scheme as the counterpart.

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#FFFFFF` | `#0B1315` |
| `--surface` (photo backdrop) | `#EEF3F3` | `#121D20` |
| `--text` | `#101820` | `#E6EEEE` |
| `--text-muted` | `#56616C` | `#9DB0B2` |
| `--accent` (links, primary button) | `#0F766E` teal | `#2CC4B0` |
| `--accent-text` (text on accent) | `#FFFFFF` | `#04201D` |
| `--field` (line color) | `#0F766E` | `#3FD0BD` |
| `--border` | `#DFE6E8` | `#1F2C2F` |

Every text and background pairing meets WCAG AA.

### Typography

Plus Jakarta Sans via `next/font`, one family throughout. The hero name is extra-bold (800) with tight tracking (about -0.035em); section headings bold (700); body at 400 with comfortable line height. Keep body line length under about 75 characters.

### Layout

- **About:** a split hero. The headshot fills the left 38% (stacked on top on phones); the right side holds "Hi, I'm", the name, the headline, role and location, and pill buttons (Résumé filled in the accent; GitHub, LinkedIn, and the click-to-copy email outlined). The field lines run behind the text side only. Below: the bio, then Selected work (featured projects only).
- **Projects:** same palette and type, no second ambient effect. Each project is a row with its name and links on the left and its summary, screenshot, details, and stack on the right.

### Avoid

The common tells of a generated site: identical rounded cards with soft shadows for every project, gradient washes, ALL-CAPS eyebrow labels over every heading, `01 / 02` numbering on non-sequential content, fade-up animation on every section, `→` appended to every link.

### Copy

Plain, active voice. Link text says where it goes ("View live site", "Source on GitHub").

## Build phases

Each phase is its own branch and PR, shipped with the ship skill.

1. **Scaffold**: `create-next-app` with TypeScript, Tailwind, ESLint, App Router, `src/` dir. Add a `typecheck` script. Clean out boilerplate. Commit `CLAUDE.md` and this spec.
2. **Content layer**: `src/content/profile.ts` and `src/content/projects.ts` with types and placeholder data.
3. **Tokens and field lines**: set up the color tokens and font, then build `FieldLines` on a bare page. Wait for Jordan's sign-off on the feel.
4. **Layout and About page**: root layout, nav, footer, and the About page with the field-lines hero.
5. **Projects page**: propose the layout, then render it from `projects.ts`.
6. **Polish**: metadata and Open Graph image, favicon, `not-found` page, accessibility pass, Lighthouse check.
7. **Deploy**: connect the repo to Vercel and confirm preview and production deploys work. Custom domain later if Jordan wants one.

## Acceptance criteria

- `npm run lint`, `npm run typecheck`, and `npm run build` pass with no warnings.
- Both pages work and look right from 360px to wide desktop, in light and dark mode.
- All links work; external links open in a new tab.
- Lighthouse scores of 95+ for Performance, Accessibility, Best Practices, and SEO on both pages.
- Adding a third project requires editing only `src/content/projects.ts` (and adding an image, if any).
- No database, API routes, or client-side data fetching.

## Out of scope for now

Blog, contact form, CMS, and any motion or interactive effects beyond the field lines. (Vercel Web Analytics was added later at Jordan's request.) If Jordan later wants a contact form, prefer a simple form service or a single Vercel function over adding a database.
