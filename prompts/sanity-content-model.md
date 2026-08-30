# Build the Core Sanity Content Model + Standalone Studio

## Goal
Build the foundational Sanity content model — course, module, lesson, instructor, category — per AGENTS.md section 8, as a **standalone Studio workspace** (`studio/`) per AGENTS.md section 5/6 and the sanity-best-practices skill, plus the server-only read data layer (client, fetch helper, GROQ queries, TypeGen) per section 5 ("Data access is a server only Sanity client and fetch helper, reading a private dataset with a token"). This is the "get started with Sanity" kickoff task.

This prompt documents what was actually built, after two scope changes mid-task:
1. User initially chose to keep the embedded Studio scaffold, then reversed that decision to "move to standalone studio."
2. User expanded scope from schema-only to schema + server-side data layer.

Scoped out on purpose (separate, later tasks called out elsewhere in AGENTS.md):
- The `video` document (transcript/chapter ingestion) — section 9, offline pipeline work.
- The agent context document (search config) — section 10, built with the `dial-your-context` skill once the Context MCP is being wired up.
- The progress record — section 5/7, a Clerk-gated server-route concern, not schema-first.
- Any actual page/component consuming the queries (catalog, course, lesson, instructor pages) — this task builds the data layer only, not UI, and there's no design reference yet.
- Visual Editing / Live Content API (`defineLive`, `<SanityLive/>`) — deliberately dropped, see Decisions below.

## Skills read
- `sanity-best-practices` — `references/schema.md` (strict `defineType`/`defineField`/`defineArrayMember` syntax, references vs nested objects, icon import pattern, validation patterns), `references/project-structure.md` (studio/ + web/ monorepo layout, embedded Studio flagged legacy), `references/nextjs.md` (standalone Studio setup command, manual `sanityFetch` helper pattern, why embedded is discouraged), `references/typegen.md` (CLI-based typegen config, monorepo path config, tsconfig `include` requirement).
- AGENTS.md sections 5, 6, 8, 12.

## Code inspected
- [package.json](package.json) — `sanity` 5.31.2, `@sanity/vision`, `next-sanity` 13.3.3 were installed as **web app** dependencies (leftover from the embedded scaffold); removed once Studio moved out.
- Original [sanity.config.ts](sanity.config.ts) / [sanity.cli.ts](sanity.cli.ts) at repo root and `src/app/studio/[[...tool]]/page.tsx` — the `create-next-app` + Sanity template's embedded-Studio output. Confirmed via the sanity-best-practices skill this is explicitly the "legacy, not recommended" pattern.
- `src/sanity/schemaTypes/index.ts` was `types: []` — blank slate, nothing to preserve.
- `src/sanity/env.ts`, `src/sanity/lib/client.ts`, `src/sanity/lib/image.ts` — already wired to real env vars; `.env.local` has a real `NEXT_PUBLIC_SANITY_PROJECT_ID` (`8z3o4juu`) / `NEXT_PUBLIC_SANITY_DATASET` (`production`) from an existing Sanity project.
- `src/sanity/lib/live.ts` — scaffolded `defineLive`/`SanityLive`, unused anywhere in the app (confirmed via grep). Deleted — see Decisions.
- Confirmed `npx sanity projects list` was already authenticated (`mosmartin5@gmail.com`) and resolves project `8z3o4juu` ("vertex") — no new Sanity project needed, this is the existing one.
- Checked `@sanity/icons` root exports directly in each workspace's own `node_modules` (3.8.0 was in the old web deps, 5.2.1 ended up in `studio/`) rather than trusting the skill's subpath-import guidance, which is for a different major — confirmed `BookIcon`, `PlayIcon`, `UserIcon`, `TagIcon`, `StackIcon`, `CheckmarkCircleIcon`, `LinkIcon` all exist as root named exports in both.

## Decisions / assumptions

### Studio placement
- Scaffolded a **real** standalone Studio via `npm create sanity@latest -- --project 8z3o4juu --dataset production --template clean --typescript --output-path studio --no-git --no-import-dataset --no-skills --no-mcp` (the exact command `references/nextjs.md` documents), rather than hand-authoring `studio/package.json`/`sanity.config.ts`/`tsconfig.json` from scratch — lower risk of a subtly wrong Vite/Sanity toolchain config. `--no-import-dataset` was critical: without it the generator offers to import template sample content into the real `production` dataset.
- Had to run the generator from a scratch directory outside the repo and then move the result into `studio/` — running it directly against `vertex/studio` inside the existing repo (which has its own root `package.json`) threw `ENOENT` reading `studio/package.json`, apparently because the generator's monorepo-detection logic got confused by the existing root project. Moved everything except `node_modules`, then ran `npm install` fresh inside `studio/` to avoid any absolute-path issues in symlinked binaries.
- **Web app stays at the repo root** rather than moving into a `web/` folder. AGENTS.md section 5 requires two independent workspaces, not a specific folder name — moving the entire existing Next.js app (with working Clerk auth, git history, etc.) into a `web/` subfolder is high-blast-radius and wasn't part of what was asked. This matches the note already left in `prompts/clerk-auth.md` ("no monorepo split into studio/web yet, so 'the web workspace' from AGENTS.md section 5 is just the repo root today"). Root `package.json` gets a `studio:dev` convenience script (`npm --prefix studio run dev`) so both workspaces are runnable from one place without merging them.
- `studio/package.json` name changed from the generator's default (`vertex`, colliding with the root app's package name) to `vertex-studio`.
- Deleted from the web app: root `sanity.config.ts`, `sanity.cli.ts`, `src/app/studio/[[...tool]]/page.tsx` (and the now-empty `src/app/studio/` dir), `src/sanity/schemaTypes/`, `src/sanity/structure.ts` — schema and desk structure now live only in `studio/`. Removed `sanity`, `@sanity/vision`, and `styled-components` from the web app's `package.json` (confirmed via grep: nothing in `src/` imported any of them — they were only needed for the embedded `<NextStudio/>` route).
- Root `tsconfig.json` and `eslint.config.mjs` both now explicitly exclude `studio/` — it has its own toolchain and its own `tsconfig.json`/`eslint.config.mjs` (from the generator), and letting the web app's TypeScript program pull in Studio files would type-check them against the wrong `sanity` package version (or a missing one, now that it's removed from the web app).

### Schema
- Folder layout inside `studio/schemaTypes/`: `documents/` (course, lesson, instructor, category), `objects/` (module, learningOutcome, resource, blockContent), `index.ts` aggregates both, per `project-structure.md`.
- **Module** stays a nested `object` array member on `course.modules`, not its own document type, per AGENTS.md ("A module is an embedded object inside a course, not its own document"). Module/lesson numbering (e.g. "Module 5", "Lesson 5.1") is derived from array order in the frontend later — not stored fields.
- **Lesson** does not store a parent-course reference, per spec. Course→lesson stays one-directional via `course.modules[].lessons[]` references; the data layer's `COURSE_FOR_LESSON_QUERY` derives the reverse relationship.
- `notes` on lesson uses a small reusable `blockContent` object (array of `block` + `image`, no exotic embeds — nothing beyond what's specified) rather than inline array-of-block, so it's reusable if other rich-text fields show up later.
- `duration` on lesson is a plain display string (e.g. `"12:34"`), not seconds-as-number — distinct from the (out-of-scope) video document's `startSeconds` precision. No UI reference exists yet to force a seconds+formatting approach. Judgment call, flagged here.
- `freePreview` and `popular` stay booleans — both are genuinely binary flags, not values likely to grow a third state, so the schema-skill's "prefer list over boolean" guidance doesn't apply.
- `level` on course uses `options.list` (Beginner/Intermediate/Advanced) with radio layout — fixed small enum.
- `learningOutcomes[].icon` is a plain string (icon identifier), not an image — no icon set is specified yet, so a string keeps it presentation-agnostic.
- `resources[].type` uses `options.list` with a small fixed set (`link`, `pdf`, `video`, `article`, `download`) — extendable later without a migration.
- Every document/object gets an `@sanity/icons` icon and a `preview.select`/`prepare` where it meaningfully improves the Studio list view.
- `structure.ts` groups the four document types explicitly (Course → Lesson → Instructor → Category) instead of the default alphabetical `S.documentTypeListItems()`.

### Data layer
- `src/sanity/lib/live.ts` (`defineLive`/`<SanityLive/>`) is **deleted**, not reused. `defineLive`'s `browserToken` puts a Sanity token in the client bundle for its real-time SSE stream — that violates AGENTS.md section 12 ("Keep the read token on the server, never expose it to the client") and there's no Visual-Editing/real-time requirement in scope. Confirmed nothing imported `live.ts`.
- Replaced with a plain **manual `sanityFetch` helper** (`src/sanity/lib/fetch.ts`) — the pattern `references/nextjs.md` documents for exactly this case: a thin wrapper around `client.fetch()` with Next's `next: { revalidate, tags }` caching, generic over the query string so TypeGen's `overloadClientMethods` inference still passes through.
- `src/sanity/lib/token.ts` (new): reads `SANITY_API_READ_TOKEN`, imports the `server-only` package so an accidental import from a Client Component fails the build. Throws at import time if unset — fail-fast instead of a silent `undefined` token producing confusing 401s later. Nothing imports `client.ts`/`token.ts` yet (no pages built), so this doesn't break `dev`/`build` before the token is provisioned.
- `client.ts` updated to pass `token`, `perspective: 'published'` (no draft leakage — no draft-mode route in scope), and a `server-only` import guard.
- `src/sanity/lib/queries.ts` (new) covers exactly the reads the pages named in AGENTS.md section 1 will need: catalog listing + slugs, course detail by slug, lesson detail by slug, the lesson's parent course (reverse-reference lookup — returns `modules[]` with lesson refs so the frontend can locate module/lesson index itself, since numbering is derived not queried), instructor by slug + slugs + their courses, categories. No `getCourses()`-style wrapper functions on top — AGENTS.md section 5 says the data layer is "a server only Sanity client and fetch helper" (singular); pages will call `sanityFetch({ query: COURSES_QUERY })` directly.
- TypeGen wired in `studio/sanity.cli.ts` (`typegen.enabled: true`, `path: '../src/**/*.{ts,tsx}'`, `generates: '../sanity.types.ts'`, `overloadClientMethods: true`) and ran end-to-end: `sanity schemas extract --enforce-required-fields --force` then `sanity typegen generate` → generated `sanity.types.ts` at repo root (10 queries, 23 schema types). Root `tsconfig.json` `include` extended with `sanity.types.ts` to make sure it's picked up (the `**/*.ts` glob already covered it, but making it explicit per the skill's warning).
- I cannot generate a real `SANITY_API_READ_TOKEN` (needs a human with Sanity project access, created in Manage with Viewer/read permissions) or add the web app's origin to Sanity CORS origins (`npx sanity cors add http://localhost:3000 --credentials`) — both are manual steps for the user, listed below.

## Files touched
- New: `studio/` (entire standalone Studio app — `package.json`, `sanity.config.ts`, `sanity.cli.ts`, `structure.ts`, `schemaTypes/{documents,objects}/*.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, `schema.json`).
- New: `sanity.types.ts` (repo root, generated).
- New: `src/sanity/lib/token.ts`, `src/sanity/lib/fetch.ts`, `src/sanity/lib/queries.ts`.
- Modified: `src/sanity/lib/client.ts` (token + perspective + `server-only` guard).
- Deleted: `sanity.config.ts`, `sanity.cli.ts`, `src/app/studio/`, `src/sanity/schemaTypes/`, `src/sanity/structure.ts`, `src/sanity/lib/live.ts`.
- Modified: `package.json` (removed `sanity`/`@sanity/vision`/`styled-components`, added `studio:dev` script), `tsconfig.json` (exclude `studio/`, include `sanity.types.ts`), `eslint.config.mjs` (ignore `studio/**`), `.env.example` (added Sanity vars).

## Requirements
- Every schema type uses `defineType`/`defineField`/`defineArrayMember`.
- References (`instructor`, `category`, `lessons` inside modules) use `reference`, never duplicate embedded data.
- No field name encodes presentation. Content stays structured: `notes` is Portable Text, never markdown/plain text.
- Web app never imports a Sanity token into client-bundled code; `client.ts`/`token.ts`/`fetch.ts` are all `server-only`-guarded.
- Studio and web app type-check/lint independently, with no cross-contamination.

## Security considerations
- `SANITY_API_READ_TOKEN` stays server-only (`server-only` import guard on every module that touches it), never referenced from a file importable by a Client Component.
- Dataset perspective is `published` — no draft content is ever fetched by this client.
- No secret values were printed, logged, or written into any file by me. The token itself still needs to be created by the user.

## Acceptance criteria
- `npm run dev` (web, root) builds and runs; `npm run studio:dev` (or `cd studio && npm run dev`) boots the Studio at `localhost:3333` — verified directly, HTTP 200, schema loaded, TypeGen watch mode active.
- `/studio` route no longer exists on the Next.js app (verified via `npm run build` route list).
- Root `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass clean (verified).
- `studio`'s own `npx tsc --noEmit` and `npx eslint .` pass clean (verified).
- `sanity schemas extract` + `sanity typegen generate` succeed and produce `sanity.types.ts` (verified — 10 queries, 23 types).

## Checks run
- `cd studio && npx tsc --noEmit` — clean.
- `cd studio && npx eslint .` — clean.
- `cd studio && npx sanity schemas extract --enforce-required-fields --force && npx sanity typegen generate` — succeeded.
- Root `npx tsc --noEmit` — clean.
- Root `npm run lint` — clean (pre-existing unrelated warnings only, in `.agents/`/`agent/` skill template files).
- Root `npm run build` — succeeded, confirmed `/studio` route is gone.
- `npm run dev` inside `studio/` — booted, `curl localhost:3333` → 200, then stopped.

## Manual test steps (for the user)
1. Create a `SANITY_API_READ_TOKEN` in [Sanity Manage](https://www.sanity.io/manage/project/8z3o4juu/api) (Viewer permission is enough for reads) and add it to `.env.local`.
2. Run `npx sanity cors add http://localhost:3000 --credentials` (from `studio/`, or via Sanity Manage) so the web app's origin can call the API once pages start fetching.
3. Run `cd studio && npm run dev`, open `http://localhost:3333`. Confirm the sidebar lists Course, Lesson, Instructor, Category (in that order), no error banner.
4. Create a Category (title only) → Publish.
5. Create an Instructor (name, photo, expertise, bio) → confirm slug auto-generates → Publish.
6. Create a Lesson (title, slug, video URL, duration, key points, notes with rich text, at least one resource) → Publish.
7. Create a Course: title, slug, summary, cover image, level, price, the Instructor/Category from steps 4/5, one module referencing the Lesson from step 6, one learning outcome → Publish.
8. Reopen the Course, confirm the module's lesson reference and the instructor/category references resolve (not broken references).
9. In a separate terminal, `npm run dev` at the repo root and confirm the Next.js app still builds/runs with no Sanity-related errors (nothing calls `sanityFetch` yet, so this just confirms no import-time breakage).
