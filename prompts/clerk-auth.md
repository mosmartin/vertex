# Add Clerk Authentication

## Goal
Wire up Clerk auth (sign-in, sign-up, signed-in state) into the Vertex Next.js app, per AGENTS.md section 5 ("Auth is Clerk, wired through Next.js middleware/proxy. It gates whatever a feature marks as private, keeps its secret key on the server, and exposes only its publishable key to the browser") and section 7 ("Authentication is Clerk. Do not use Sanity's auth or roll your own. Keep browsing public and gate only what a feature marks as protected.").

This is infra/auth plumbing only — no protected routes exist yet (no course/lesson/progress pages built), so there is nothing to gate today. This task installs Clerk, wires the provider + proxy, and gives the existing Navbar real sign-in/sign-up/user-button controls in place of its static placeholder icon.

## Skills read
- `clerk-setup` (invoked by user) — CLI-driven quickstart flow.
- AGENTS.md (project instructions) — confirms Clerk is the mandated auth provider, server/client boundary rules (secret key never in browser), and that UI should reuse existing components/patterns rather than redesign.

## Code inspected
- Root is a single Next.js 16.3.3 app (App Router) — no monorepo split into `studio`/`web` yet, so "the web workspace" from AGENTS.md section 5 is just the repo root today.
- [package.json](package.json) — no `@clerk/nextjs` dependency yet. React 19.2.8, Next 16.3.3.
- [src/app/layout.tsx](src/app/layout.tsx) — root layout, no providers wrapping `children` yet. Fonts (Playfair Display, Inter) set as CSS variables on `<html>`.
- [src/components/navigation/Navbar.tsx](src/components/navigation/Navbar.tsx) — has a static placeholder user avatar (`<span>` with a user icon, line 31-33) and a notification bell. This is where signed-in/signed-out controls belong.
- No `proxy.ts` or `middleware.ts` exists yet.
- No `.env.example` exists yet.
- Confirmed via `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`: Next 16 renamed `middleware.ts` → `proxy.ts` (the `middleware` file convention is deprecated). The Clerk CLI's matcher-verification step (written for `middleware.ts`/`proxy.ts` interchangeably) needs to target `proxy.ts` here — `clerkMiddleware()` from `@clerk/nextjs/server` is exported inside a `proxy.ts` file's default/named `proxy` export, not a `middleware.ts` file.
- Clerk CLI is not installed locally (`command -v clerk` found nothing).

## Decisions / assumptions
- Follow the `clerk-setup` skill's flow as-is: install/update Clerk CLI → `clerk auth login` → `clerk init` (existing project, so no `--framework`/`--pm` flags) → verify proxy matcher → add auth controls → `clerk doctor` → run dev server.
- No `--app <id>` pin — the generic clerk-setup skill (not the app-linking variant) was what loaded, so `clerk init` will prompt to select/create a Clerk application interactively.
- Since Next 16 uses `proxy.ts`, after `clerk init` I will explicitly check for `proxy.ts` (not just `middleware.ts`) and confirm it wraps `clerkMiddleware()` with a matcher that includes `'/__clerk/:path*'` after the API/tRPC matcher. If `clerk init`'s scaffolding assumed `middleware.ts` (older Next), I will rename/adjust it to `proxy.ts` manually so it actually runs.
- `ClerkProvider` goes inside `<body>` in [src/app/layout.tsx](src/app/layout.tsx), not wrapping `<html>`, per the skill's critical rules.
- Replace the static avatar placeholder in [Navbar.tsx](src/components/navigation/Navbar.tsx) with Clerk's `Show`/`SignInButton`/`SignUpButton`/`UserButton`, matching the existing icon sizing/spacing (h-9 w-9 rounded-full slot) rather than introducing new visual styling — per AGENTS.md's "reuse the components and Tailwind patterns already in the project" and "do not restyle or improve beyond the reference." No sign-in/sign-up screens are custom-designed yet, so this uses Clerk's default hosted components (`SignInButton`/`SignUpButton` as modal triggers) rather than building dedicated `/sign-in`/`/sign-up` pages — nothing in the design reference calls for custom auth pages.
- No routes are marked protected in this task, so `proxy.ts` will only run Clerk's own required matcher (auth handshake + `/__clerk/:path*`) — it will not redirect/gate any page. Route protection is deferred to whichever future task introduces the first private page (e.g. My Learning, progress).
- `.env.example` will be created (currently missing) listing `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` as placeholders, since AGENTS.md section 12 requires a committed `.env.example` as the canonical env list. Actual key values come from `clerk init`/CLI output, never typed or echoed by me.

## Files expected to touch
- `package.json` / lockfile — add `@clerk/nextjs` (via `clerk init`).
- `src/app/layout.tsx` — wrap `children` in `<ClerkProvider>` inside `<body>`.
- `proxy.ts` (new, project root or `src/`) — `clerkMiddleware()` export + matcher including `'/__clerk/:path*'`.
- `src/components/navigation/Navbar.tsx` — swap static avatar for `Show`/`SignInButton`/`SignUpButton`/`UserButton`.
- `.env.example` (new) — canonical env var list, no real secrets.
- `.env.local` (new, gitignored) — actual keys from Clerk CLI, not committed.

## Requirements
- Secret key (`CLERK_SECRET_KEY`) never reaches client code or gets logged/printed.
- Only `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is referenced from browser-rendered code.
- Auth logic lives in `proxy.ts` at the project root (Next 16 convention), not a `middleware.ts` file.
- Browsing stays public — no page redirects to sign-in as a side effect of this change.
- Navbar visually matches existing spacing/sizing conventions; no unrelated restyling.

## Security considerations
- Do not print or persist `CLERK_SECRET_KEY` in any file this agent writes into chat, prompts, or logs.
- `.env.local` must stay gitignored (verify `.gitignore` already covers `.env*.local` — confirm before writing).
- Proxy matcher must not accidentally exclude Clerk's own `/__clerk/:path*` handshake path, and must not accidentally protect/block static assets.

## Acceptance criteria
- `@clerk/nextjs` installed and `clerk doctor` reports no errors.
- Dev server starts cleanly with `ClerkProvider` mounted.
- Navbar shows Sign in / Sign up controls when signed out, and a `UserButton` when signed in, in the same slot the placeholder avatar occupied.
- Signing up creates a test user and the Navbar updates to show `UserButton`.
- No secret key appears in any client bundle (spot check: grep built output / browser devtools network tab is out of scope here, but confirm `CLERK_SECRET_KEY` isn't imported in any `"use client"` file).

## Checks to run
- `npm run lint`
- `npx tsc --noEmit` (type check)
- `npm run build` (routes/config changed — proxy.ts + layout.tsx)
- `clerk doctor`
- `npm run dev` and manual test below

## Manual test steps
1. Run `npm run dev`, open `http://localhost:3000`.
2. Confirm the Navbar shows Sign in / Sign up controls (not the old gray placeholder avatar) while signed out.
3. Click Sign up, complete the flow with a test email, confirm you land back on the site.
4. Confirm the Navbar now shows a `UserButton` avatar; click it and confirm the Clerk user menu opens (profile, sign out).
5. Sign out, confirm Navbar reverts to signed-out controls.
6. Confirm no console errors and that other pages (e.g. `/design-system`) still load without being gated.
