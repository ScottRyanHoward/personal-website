# 01-spec-codebase-cleanup.md

## Introduction/Overview

The personal website (scottryanhoward.info) works and its unit tests pass, but the codebase has picked up inconsistencies and leftovers. Data loading differs between sections, code is duplicated, generated files are committed, `tsc` fails in test files, config is out of date, and docs are stale. This spec cleans all of that up **without changing what visitors see**. The goal is a smaller, consistent codebase that passes every check, ready for later work such as a framework upgrade or dark mode.

## Goals

- `git status` on a fresh clone shows a clean tree. No generated test output or worktrees are tracked, and no project tooling is left untracked.
- `npx tsc --noEmit`, `npm run lint` and `npm run build` all finish with **zero errors and zero warnings**.
- Every page section receives its data the same way (as props from one loading module), and a unit test checks every JSON content file.
- Date formatting and the lazy-load placeholder each exist in exactly one place.
- One accurate `README.md` replaces the five root docs and the in-source implementation notes.

## User Stories

- **As the site owner**, I want my unmerged "Lead Delivery Consultant" content update merged into `main`, so the live site reflects my current role.
- **As the site owner**, I want a mistake in a JSON content file (missing field, misspelled status, broken project-to-role link) to fail a test, so I don't publish a broken section.
- **As the site owner**, I want all sections to load data the same way, so adding or editing a section follows one obvious pattern.
- **As a future maintainer (human or AI agent)**, I want type checking, linting and tests to pass cleanly, so a new failure clearly means something broke.
- **As a future maintainer**, I want a single, accurate README, so I can set up, edit content, test and deploy without reading outdated docs.

## Demoable Units of Work

### Unit 1: Repository Hygiene

**Purpose:** Make the repository contain only source, content and intentional tooling, and bring in the pending content commit.

**Functional Requirements:**

- The system shall include the changes from commit `cec60ce` ("Add Lead Delivery Consultant role at Liatrio") on `main`, via cherry-pick.
- The system shall no longer have the `.claude/worktrees/interesting-aryabhata` worktree registered (`git worktree list` shows only the main checkout).
- The system shall ignore `playwright-report/`, `test-results/` and `.claude/worktrees/` in `.gitignore`. Files previously committed under `playwright-report/` and `test-results/` shall be removed from git.
- The system shall track `.agents/`, `.claude/skills/`, `.kiro/skills/` and `skills-lock.json` in git.
- The unit test configuration shall exclude `.claude/**` (and any other worktree locations) so only the main source tree's tests run.
- The system shall delete every `src/components/sections/*.demo.tsx`, every `src/components/sections/*_IMPLEMENTATION.md`, `src/app/PERFORMANCE_TESTING.md`, `src/app/SEO_IMPLEMENTATION.md` and `e2e/TEST_RESULTS.md`.

**Proof Artifacts:**

- CLI: `git log --oneline -3` shows the Lead Delivery Consultant change on `main`. This shows the pending content was kept.
- CLI: `git worktree list` lists one entry. This shows the stale worktree is gone.
- CLI: `git status --porcelain` is empty after a full unit and e2e test run. This shows generated output is ignored and tooling is tracked.
- CLI: `npx vitest run` summary shows about half the previous 54 test files, all passing, with no paths under `.claude/`. This shows tests no longer run twice.

### Unit 2: Consistent Data Loading and Content Validation

**Purpose:** Give every section the same data pattern, and catch content mistakes in tests rather than on the live site.

**Functional Requirements:**

- The system shall have a single data module (for example `src/lib/content.ts`) that imports every `src/data/*.json` file and exports typed values. It shall be the only place in the app that imports from `src/data/`.
- `WorkProjects` and `PersonalProjects` shall receive their data as props from `page.tsx`, like every other section. They shall not import JSON directly.
- `page.tsx`, `layout.tsx` and `StructuredData` shall read content through the data module.
- The system shall include a unit test that fails if any content entry:
  - is missing a required field defined in `src/types/index.ts`
  - uses a value outside an allowed set (for example `PersonalProject.status`, `Skill.proficiency`)
  - has a date not in `YYYY-MM` format (or the literal `Present` where allowed)
  - has a duplicate `id` within its file
  - links to something that doesn't exist (a work project's `experienceId` or an experience's `relatedProjects` entry)
  - references an image path that doesn't exist under `public/`
- The rendered page shall be visually unchanged.

**Proof Artifacts:**

- CLI: `grep -rn "@/data/" src --include=*.tsx --include=*.ts` (excluding tests) matches only the data module. This shows a single loading path.
- Test: the content validation test passes on current data. Temporarily changing one project's `status` to an invalid value makes it fail with a message naming the file, entry `id` and field. This shows the guardrail works.
- Screenshot: full-page captures at desktop and mobile widths before and after this unit, with no visible differences. This shows there were no regressions.

### Unit 3: Shared Helpers, Config and Type-Safety Fixes

**Purpose:** Remove duplicated code and leftovers so every check runs clean.

**Functional Requirements:**

- The system shall have one date-formatting helper module (for example `src/lib/dates.ts`) used by `Experience`, `Education`, `Volunteering` and `PersonalProjectCard`. Each component's rendered date text shall stay exactly as it is today.
- The system shall have one loading-placeholder component used by every lazy-loaded section in `page.tsx`. That component shall have no `dark:` classes.
- The system shall contain no `dark:` Tailwind classes in non-test source (the site is light-only).
- `PersonalProjectCard` shall render its image through the project's `OptimizedImage` / `next/image` instead of a raw `<img>`.
- `tailwind.config.ts` shall no longer define the unused `accent` color scale.
- `next.config.js` shall no longer contain `swcMinify` or `optimizePackageImports: ['react-icons']`.
- `@next/bundle-analyzer` shall be on the same major version as `next` (14.x).
- `layout.tsx` shall no longer contain the placeholder `google-site-verification-code`.
- Unit tests that use `toHaveNoViolations` shall have Vitest-compatible matcher registration and typing (in `src/test/setup.ts` and a type declaration, or by switching to `vitest-axe`), so that `npx tsc --noEmit` reports zero errors.

**Proof Artifacts:**

- CLI: `npx tsc --noEmit` exits 0 with no output. This shows the 26 test type errors are fixed.
- CLI: `npm run lint` reports no warnings or errors. This shows the `<img>` warnings are gone.
- CLI: `npm run build` succeeds with no `next.config.js` warnings. This shows the config leftovers are gone.
- CLI: `grep -rn "dark:" src` (excluding tests) and `grep -rn "accent-" src` return nothing. This shows the stray classes and the unused scale are gone.
- Test: the full `npx vitest run` passes, including new unit tests for the date helper that cover `YYYY-MM`, `Present` and a missing end date. This shows the shared behavior matches what each component did before.

### Unit 4: Consolidated Documentation

**Purpose:** Replace stale, overlapping docs with one short README that matches the cleaned-up code.

**Functional Requirements:**

- The system shall have a single root `README.md` covering:
  - project overview and tech stack
  - local setup and scripts
  - editing content (file per section, field reference, adding images, how the content validation test helps)
  - testing (unit, e2e, type check, lint)
  - deployment (Vercel, domain, resume PDF)
- The system shall delete `CONTRIBUTING.md`, `CONTENT_GUIDE.md`, `DEPLOYMENT.md` and `PERFORMANCE.md`. Anything in them that is still accurate and useful shall be moved into `README.md`.
- Every command and file path mentioned in `README.md` shall exist and work as described.

**Proof Artifacts:**

- CLI: `ls *.md` at the repo root lists only `README.md` (and `LICENSE`). This shows the docs are consolidated.
- Manual check: each `npm run` script and file path in `README.md` is run or opened successfully. This shows the README is accurate.

## Non-Goals (Out of Scope)

1. **Framework upgrades:** No major-version upgrades of Next.js, React or Tailwind. Planned as a follow-up spec (`02-spec-framework-upgrade`).
2. **Dark mode:** No dark theme. The site stays light-only. Dark mode would need its own design spec.
3. **Runtime schema validation:** No schema library (for example Zod) added to the app bundle. Content is checked in tests only.
4. **Content changes:** No edits to resume content, apart from bringing in the existing `cec60ce` commit and normalizing date formats in content files (for example `YYYY-MM-DD` → `YYYY-MM`) where the displayed text does not change.
5. **Visual or UX redesign:** No layout, color, spacing or copy changes visible to visitors.
6. **E2E test rewrites:** Playwright specs change only where needed to keep passing after this refactor.

## Design Considerations

No new design requirements. The rendered site must look the same at mobile (375px), tablet (768px) and desktop (1280px+) widths before and after this work. The existing olive-green `primary` palette and the light-only appearance stay as they are.

## Repository Standards

- **Stack and layout:** Next.js 14 App Router, TypeScript (strict), Tailwind CSS 3. Components go in `src/components/{layout,sections,ui}` with barrel `index.ts` exports. Shared non-UI code goes in `src/lib/`. Types go in `src/types/index.ts`. Imports use the `@/` alias.
- **Components:** named exports, `React.FC<Props>` with an exported `Props` interface, and `'use client'` only where the component needs interactivity.
- **Testing:** Vitest + Testing Library + jest-axe. Unit tests sit next to their component as `*.test.tsx`. Cross-cutting tests live in `src/test/`. Playwright e2e specs live in `e2e/`. Existing assertions about rendered output should keep passing without changes. Update them only where the import or prop shape changes.
- **Commits:** short, sentence-case, imperative messages (for example "Add Subaru work", "Update color scheme and tests"). Make one commit per demoable unit or logical sub-step.
- **Deployment:** Vercel (`vercel.json`). `npm run build` must succeed.

## Technical Considerations

- **Order:** Unit 1 goes first because the worktree exclusion fixes test counts and the cherry-pick changes `experience.json`, which Unit 2 validates. Units 2 and 3 are independent of each other. Unit 4 goes last so the docs describe the final state.
- **Cherry-pick:** `cec60ce` touches only `src/data/experience.json` and `src/data/profile.json`. Settle any conflicts in favor of the incoming content, then run the tests.
- **`swcMinify`:** Next.js removed this flag in v15 (SWC minification is always on and can't be configured). Deleting it now has no effect on behavior in v14 and avoids an "Unrecognized key" error later in the upgrade.
- **Axe matcher typing:** `@types/jest-axe` extends Jest's matcher types, not Vitest's. Either call `expect.extend({ toHaveNoViolations })` in `src/test/setup.ts` and add a declaration that extends Vitest's `Assertion` interface, or switch to `vitest-axe` with its matchers. Pick whichever needs fewer changes to existing tests.
- **Data module:** Keep the existing TypeScript types as the source of truth. The validation test can check required fields and allowed values with plain TypeScript and `fs`. No new runtime dependency is needed.
- **`next/dynamic` mock:** `src/test/setup.ts` mocks `next/dynamic` to load synchronously. The shared placeholder component must keep working with that mock.
- **Image migration:** `next/image` needs `width`/`height` or `fill` with a sized parent. Keep the current card image aspect ratio so the layout doesn't shift.
- **Date helper:** Before merging the formatters, compare the existing ones. If they produce different output today (for example `Jan 2024` vs `January 2024`), the helper takes a format option, so each component keeps its current output.

## Security Considerations

- Removing the placeholder Google verification meta tag has no security impact. A real verification code, if added later, is public by design.
- Committed tooling (`.agents/`, `.claude/skills/`, `.kiro/skills/`) must be checked for secrets or personal tokens before committing. `.claude/settings.local.json` (if present) must not be committed.
- Proof artifacts (screenshots and CLI output) contain only public site content. Do not commit `.env*` files.

## Success Metrics

1. **Clean checks:** `tsc --noEmit` 0 errors (from 26), `npm run lint` 0 warnings (from 2+), `npm run build` passes with no config warnings.
2. **Test suite:** 100% of unit tests pass, the file count roughly halves (no duplicate worktree runs), and the new content validation and date helper tests are added.
3. **Less code and docs:** 18 in-source demo and note files (9 demos, 7 section notes, 2 app notes) and 4 root docs removed. Data imports reduced to one module. One date formatter and one placeholder.
4. **No visual regressions:** before and after screenshots at three widths show no differences.

## Open Questions

1. ~~`e2e/README.md` and `e2e/TEST_RESULTS.md`~~ **Resolved (planning audit, 2026-10-17):** keep `e2e/README.md` (166 lines, too long to merge), update it and link it from `README.md`. Delete `e2e/TEST_RESULTS.md`.
2. The last committed Playwright output shows a failing `full-page-flow` "critical content sections" test. The e2e baseline should be checked at the start of Unit 1. If it fails before any changes, record it as a pre-existing failure, not a regression caused by this work.
3. The old Kiro spec at `.kiro/specs/personal-website/` is left in place for now. It may be removed in a later cleanup now that `docs/specs/` is the active spec location.
