# Implementation prompt: Vertex homepage

## Goal
Implement the marketing homepage (`/`) to match `design/vertex-home.png` pixel-for-pixel in layout, spacing, typography, and color, responsive down to mobile per AGENTS.md section 3. This replaces the current placeholder content in `src/app/page.tsx`.

## Skills / docs read
- AGENTS.md sections 2, 3, 5, 6, 7 (workflow, UI rules, architecture boundaries, decisions already made).
- No Sanity/Clerk/PostHog skill needed — no backend exists yet (confirmed below), so this is static markup only.

## Code inspected
- `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css` — existing placeholder home, fonts (`font-display` = Playfair Display, `font-sans` = Inter), color/radius/shadow tokens already defined as Tailwind theme vars.
- `src/app/design-system/page.tsx` — canonical reference for how existing primitives are composed.
- `src/components/navigation/Navbar.tsx` — logo + Courses/My Learning links only, no bell/avatar.
- `src/components/cards/CourseCard.tsx` — takes a single `initial` letter rendered in a black square; no way to customize icon background/content.
- `src/components/ui/{Icon,Button,Input,Badge}.tsx` — existing primitives to reuse. `Icon` has no `star` glyph. `SearchInput` already matches the hero search bar shape (icon left, shortcut chip right). `Button` primary variant already matches the "Explore Courses" pill.
- Confirmed via `find`: no `studio/` workspace, no Sanity/Clerk/PostHog packages in `package.json`, no `prompts/` dir existed yet. This is the design-system-only phase of the build — homepage is static/presentational, no data fetching, no auth gating.

## Decisions & assumptions
1. **No real backend yet** — course data (Next.js/Docker/TypeScript cards) is hardcoded static content in `page.tsx`, matching the reference image. When the Sanity content model exists, this section will be swapped for a live query; not part of this task.
2. **Course icons**: the reference shows a plain "N" glyph, a Docker whale illustration, and a "TS" glyph. There's no logo asset in the repo and none was supplied. I'll extend `CourseCard` to accept an optional custom icon node + background class (default stays the existing black square + initial, so the design-system page's usage keeps working unchanged), and pass a small inline whale SVG for Docker and a "TS" initial on a blue square for TypeScript. This gets close visual fidelity without fabricating an external logo asset.
3. **Navbar avatar**: the reference shows a real photo. No Clerk auth is wired up yet and no image asset exists, so I'll render a neutral placeholder avatar (icon-in-circle) in the same position/size, not a fabricated photo. Bell icon has no unread state (no data source).
4. **New `star` icon**: needed for the "New courses and lessons added every week" strip; adding it to the shared `Icon` glyph set (outline style, consistent with the existing 24×24/1.6 stroke convention).
5. **Hero pill badge** ("INTELLIGENT LEARNING") and the decorative bottom bar-chart graphic are one-off homepage elements, built inline in `page.tsx` with existing Tailwind tokens rather than added to the shared `Badge` component (different shape/purpose from its card-tag use).
6. Reused as-is: `Navbar` (extended), `SearchInput`, `Button` (variant="primary", icon="chevron-right"), `CourseCard` (extended).

## Files to touch
- `src/components/ui/Icon.tsx` — add `star` glyph.
- `src/components/navigation/Navbar.tsx` — add bell button + avatar placeholder on the right side.
- `src/components/cards/CourseCard.tsx` — add optional `icon`/`iconClassName` props, default behavior unchanged.
- `src/app/page.tsx` — full homepage: hero, search, "All Courses" grid (3 static cards), "New courses..." divider strip, decorative bottom graphic.

## Requirements (from the reference image)
- Navbar: logo mark + "Vertex" wordmark, "Courses" (current/active) and "My Learning" links, bell icon, circular avatar — all as today, right-aligned icons added.
- Hero: centered "INTELLIGENT LEARNING" pill badge (outlined, primary color), two-line serif display headline "Search your learning in plain English.", centered supporting copy, "Explore Courses" primary button with trailing arrow, then a wide centered search bar with placeholder "Ask anything about your learning..." and a "⌘ K" shortcut chip.
- Full-width divider below the hero.
- "All Courses" section: heading left, "View all courses →" link right (primary color), 3-column responsive card grid (1 col mobile, 3 col desktop) using the extended `CourseCard` with the three static courses shown (Next.js for Production / Docker Essentials / TypeScript Deep Dive) with their level/duration/module-count metadata exactly as pictured.
- Centered divider strip: star icon + "New courses and lessons added every week." flanked by horizontal rules, constrained to the content max-width (not edge-to-edge).
- Decorative gradient bar-chart illustration at the very bottom of the page, primary-toned, purely visual (`aria-hidden`).
- Fully responsive: stack/scale hero text, single-column cards, and shrink the search bar on mobile; no separate mobile reference exists so adapt sensibly per AGENTS.md section 3.

## Security considerations
None — fully static, no user input is submitted anywhere, no external network calls, no secrets involved. The search input has no `action`/handler yet (out of scope; search wiring is a separate task per AGENTS.md section 11).

## Acceptance criteria
- Homepage visually matches `design/vertex-home.png` at desktop width (layout, spacing, type, color).
- Responsive and usable down to a narrow mobile viewport (no horizontal scroll, no overlapping elements).
- No new dependencies added; only existing tokens/components (extended, not duplicated) are used.
- `CourseCard`'s existing usage in `src/app/design-system/page.tsx` still renders unchanged (backward-compatible prop extension).

## Checks to run
- `npm run lint`
- `npx tsc --noEmit` (type check; no dedicated `typecheck` script exists)
- `npm run dev` and manually verify in browser

## Manual test steps
1. `npm run dev`, open `http://localhost:3000/`.
2. Compare against `design/vertex-home.png` side by side at a desktop viewport (~1440px).
3. Resize the browser down to ~375px width and confirm: nav collapses sensibly, hero text/button/search bar remain centered and don't overflow, course cards stack to one column, the divider strip and bottom graphic still render without horizontal scrollbars.
4. Open `http://localhost:3000/design-system` and confirm the "Cards" section's `CourseCard` example is unchanged (still shows the black "N" square).
5. Click "Explore Courses" and "View all courses" — both are plain links for now (no `/courses` route exists yet), so confirm they render as expected without throwing (a 404 on click is acceptable at this stage).
