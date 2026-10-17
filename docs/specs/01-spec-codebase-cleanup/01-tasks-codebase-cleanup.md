# 01-tasks-codebase-cleanup.md

Spec: [01-spec-codebase-cleanup.md](./01-spec-codebase-cleanup.md)

## Standards Evidence

| Source File | Read | Standards Extracted | Conflicts |
| --- | --- | --- | --- |
| `AGENTS.md` | not found | — | — |
| `CLAUDE.md` | not found | — | — |
| `README.md` | yes | Scripts: `test:run`, `test:e2e`, `lint`, `build`. Content edited via `src/data/*.json`. Vercel deploy. | none |
| `CONTRIBUTING.md` | yes | Components in PascalCase, non-component files in kebab-case. Tailwind utilities only, mobile-first. Unit and e2e tests plus lint must pass before merge. | Asks for Conventional Commits (`feat(scope): …`), but git history uses plain sentence-case messages ("Add Subaru work"). |
| `.github/pull_request_template.md` | not found | — | — |
| `.pre-commit-config.yaml` / CI workflows | not found | No automated quality gate. Checks are run by hand. | — |
| `.eslintrc.json` | yes | `next/core-web-vitals` (includes `no-img-element`) | none |
| `package.json` scripts | yes | `vitest`, `playwright test`, `next lint`, `next build` | none |
| `tsconfig.json` / `vitest.config.ts` | yes | strict TS, `@/` alias, jsdom env, `src/test/setup.ts` | none |

**Decision on the conflict:** use the **sentence-case imperative** style from git history. `CONTRIBUTING.md` is deleted in 5.0 and was never followed. All work happens on `main`, matching history, unless the user asks for a branch.

## Planning Assumptions (resolved during sub-task generation)

These came up while reading the code and clarify how the spec applies. They do not add scope.

- **A1 — Date format in `personalProjects.json`:** this file uses `YYYY-MM-DD` (for example `"2025-05-01"`), while every other file uses `YYYY-MM`. The spec's validation rule is `YYYY-MM`, so 2.0 changes these values to `YYYY-MM`. The displayed month does not change.
- **A2 — Timezone bug in `PersonalProjectCard`:** it parses dates with `new Date("2023-01")`, which JavaScript reads as UTC midnight. The live site renders on Vercel's servers in UTC, so it shows the correct month (`Jan 2023`). In tests run in a US timezone it shows the previous month (`Dec 2022`), and the current test expects that wrong value (`PersonalProjectCard.test.tsx:64,70`). The shared helper parses year and month directly, without timezones. **Production output is unchanged.** Only those two test expectations change, to the correct `Jan 2023 - Jun 2023`. This is the one allowed exception to "expected date strings are unchanged".
- **A3 — Open-ended ranges differ by section, and stay that way:** when there's no end date, `Volunteering` shows `"Start - Present"` and `PersonalProjectCard` shows only `"Start"`. The helper supports both behaviors through an option.
- **A5 — Empty experience description (found in 2.7):** `experience.json` `exp-0` (Lead Delivery Consultant, from `cec60ce`) has `description: ""` and empty lists. The content test still fails when `description` is *missing*, but allows it to be *empty* for experience entries, so a role can be listed before its summary is written. Writing the description is content work for the site owner (non-goal 4).
- **A6 — A2 also applies to `PersonalProjects.test.tsx`:** its `renders date ranges for projects` test expects the same timezone-shifted months (`May 2022 - Dec 2022` for `2022-06`..`2023-01`). Task 3.4 corrects this expectation as well.
- **A7 — Correction to A2, found in 3.8:** the page is prerendered at **build** time, so the shifted months appear wherever the build runs west of UTC. A local build in US Eastern time showed `Apr/Jan/Sep 2025` for `2025-05/02/10`. The live site (built on Vercel in UTC) shows `May/Feb/Oct 2025` (checked with `curl`). The 3.0 output matches the live site exactly: 0 differing pixels against the 2.0 code built with `TZ=UTC`. Against the local Eastern-time baseline, only those three month labels differ (643 px).
- **A8 — Clean builds for visual proofs:** an incremental `next build` that reused a stale `.next/cache` produced HTML and CSS with different `next/font` hashes (`__className_f367f3` vs `__className_d8ebd1`), so the page fell back to system fonts. Clean rebuilds don't reproduce this with either import style. Proof builds now always start with `rm -rf .next`. `page.tsx` imports `SectionPlaceholder` from its own file, so the page doesn't pull in the client-component barrel.
- **A9 — Two more raw `<img>` tags (found in 4.8):** `Education.tsx` (institution logos) and `Volunteering.tsx` (organization logos) also used raw `<img>`, which the review missed. The spec's zero-lint-warnings goal requires fixing them. They now use `OptimizedImage` with `unoptimized` and `placeholder="empty"`, so the browser gets the same file as before. Running them through the local optimizer (no `sharp`) changed logo pixels, including a green corner on the BSides logo. The three `<img>` tags inside `next/image` test mocks keep a scoped `eslint-disable-next-line`.
- **A10 — Axe matcher types:** `@types/jest-axe` was not installed, because it depends on `@types/jest` (globals clash with Vitest) and `axe-core@^3`. Two local declarations replace it: `src/test/jest-axe.d.ts` describes the module and `src/test/vitest-axe.d.ts` adds the Vitest matcher. `seo.test.tsx` now uses `toEqual`/`toMatchObject` instead of `if`-guarded property access. That fixes its 7 type errors and stops it passing silently when the metadata changes shape. `performance.test.tsx`'s `swcMinify: true` check is now a check that deprecated keys are absent.
- **4.3 note:** `npm run analyze` wasn't run, because the analyzer opens browser tabs. Running `ANALYZE=true` against the config showed the v14 plugin loads and wraps the webpack config. The regular build exercises the same plugin.
- **A11 — Found in 5.0:** `vercel.json` redirects `/resume` to a `/resume.pdf` that doesn't exist, so the live `/resume` URL returns 404 (checked with `curl`). This is out of scope (it would change production behavior) and is documented as a known issue in `README.md`. `performance.test.tsx` had a test requiring `PERFORMANCE.md`, which was removed along with the approved doc deletion. The redundant `DEPLOYMENT.md` line in `.vercelignore` is removed.
- **Follow-up (out of scope):** `globals.css` still has a `prefers-color-scheme: dark` block for the CSS variables. In a dark OS scheme the page is pixel-identical (every section paints its own background), so the only effect is the custom scrollbar colors. It's left as is.
- **A4 — SVG images:** `PersonalProjectCard` uses a raw `<img>` only for `.svg` files. The replacement is `OptimizedImage` with `unoptimized` (SVGs aren't resized by Next), keeping the current `object-contain p-4` styling.

## Relevant Files

| File | Why It Is Relevant |
| --- | --- |
| `.gitignore` | Add `playwright-report/`, `test-results/`, `.claude/worktrees/`, `.claude/settings.local.json`. |
| `vitest.config.ts` | Exclude `.claude/**` so worktree tests aren't collected. |
| `playwright-report/**`, `test-results/**` | Generated output to remove from git. |
| `.agents/`, `.claude/skills/`, `.kiro/skills/`, `skills-lock.json` | Untracked tooling to commit (after a secrets check). |
| `src/components/sections/*.demo.tsx` (9) | Dead demo files to delete. |
| `src/components/sections/*_IMPLEMENTATION.md` (7), `src/app/PERFORMANCE_TESTING.md`, `src/app/SEO_IMPLEMENTATION.md`, `e2e/TEST_RESULTS.md` | Stale notes and reports to delete. |
| `src/data/experience.json`, `src/data/profile.json` | Changed by the cherry-pick of `cec60ce`. |
| `src/data/personalProjects.json` | Dates changed to `YYYY-MM` (A1). |
| `src/lib/content.ts` | **New.** The only module that imports `src/data/*.json`, exporting typed content. |
| `src/lib/content.test.ts` | **New.** Content validation test (required fields, allowed values, dates, unique ids, cross-references, image paths). |
| `src/lib/dates.ts` | **New.** Shared `formatMonthYear` / `formatDateRange` helpers. |
| `src/lib/dates.test.ts` | **New.** Unit tests for the date helpers. |
| `src/app/page.tsx` | Read from `content.ts`, pass props to every section, use the shared placeholder. |
| `src/app/layout.tsx` | Read from `content.ts`, remove the placeholder Google verification code. |
| `src/test/responsive-design.test.tsx` | Renders `WorkProjects` with real content, so it now passes `workProjects` and `experiences` from `@/lib/content`. |
| `src/app/page.test.tsx`, `src/app/seo.test.tsx` | Update mocks and imports for the new data path and props. |
| `src/components/ui/SectionPlaceholder.tsx` | **New.** Shared lazy-load placeholder (light-only). |
| `src/components/ui/SectionPlaceholder.test.tsx` | **New.** Renders with the expected classes and `aria-hidden`. |
| `src/components/ui/index.ts` | Export `SectionPlaceholder`. |
| `src/components/sections/WorkProjects.tsx` / `.test.tsx` | Switch to props (`workProjects`, `experiences`). Tests pass fixtures as props instead of mocking JSON. |
| `src/components/sections/PersonalProjects.tsx` / `.test.tsx` | Switch to props (`personalProjects`). Tests pass fixtures as props. |
| `src/components/sections/Experience.tsx`, `Education.tsx`, `Volunteering.tsx` | Use the shared date helpers. |
| `src/components/ui/PersonalProjectCard.tsx` / `.test.tsx` | Use the shared date helper (A2, A3) and `OptimizedImage` for SVGs (A4). |
| `tailwind.config.ts` | Remove the `accent` scale. |
| `next.config.js` | Remove `swcMinify` and `experimental.optimizePackageImports`. |
| `package.json`, `package-lock.json` | Pin `@next/bundle-analyzer` to `^14.2.0`. |
| `src/test/setup.ts` | Register the axe matcher once, globally. |
| `src/test/vitest-axe.d.ts` | **New.** Extend Vitest's `Assertion` type with `toHaveNoViolations`. |
| `src/test/jest-axe.d.ts` | **New.** Minimal module types for `jest-axe` (A10). |
| `src/components/sections/Education.tsx`, `Volunteering.tsx` | Logos moved from raw `<img>` to `OptimizedImage` (A9). |
| `src/test/performance.test.tsx` | Config and placeholder assertions updated to the new expectations. |
| `src/test/accessibility.test.tsx`, `src/test/status-badge-visual-regression.test.tsx` | Remove per-file `expect.extend`. |
| `README.md` | Rewritten as the single consolidated doc. |
| `CONTRIBUTING.md`, `CONTENT_GUIDE.md`, `DEPLOYMENT.md`, `PERFORMANCE.md` | Deleted after their useful content moves into `README.md`. |
| `e2e/README.md` | Kept. Updated for accuracy and linked from `README.md > Testing` (spec Open Question 1). |
| `docs/specs/01-spec-codebase-cleanup/01-proofs/` | **New.** Proof artifacts (CLI output and screenshots). |

### Notes

- Unit tests live next to their source (`content.ts` → `content.test.ts`). Cross-cutting tests stay in `src/test/`.
- Run unit tests with `npx vitest run [path]`, e2e with `npm run test:e2e`, type check with `npx tsc --noEmit`, lint with `npm run lint`.
- Follow existing component style: named exports, `React.FC<Props>` with an exported `Props` interface, `@/` imports, Tailwind utilities only.
- Commit at the end of each parent task (or logical sub-step) using sentence-case imperative messages, ending with the `Co-Authored-By` trailer.
- Save each proof's CLI output to `docs/specs/01-spec-codebase-cleanup/01-proofs/<task>-<name>.txt`. Screenshots go in the same folder.
- **Visual comparison:** ImageMagick isn't installed, so screenshots are taken with Playwright's Chromium and compared with Playwright's built-in image comparator (`playwright-core/lib/server/utils/comparators.js`, the same engine `toHaveScreenshot()` uses). This runs from a script in the session scratchpad that is not committed. Each diff records the number of differing pixels; the expected value is 0. Animations are disabled and lazy sections are scrolled into view before capture.
- **Known issue, out of scope:** `OptimizedImage`'s default `fallbackSrc` (`/images/project-placeholder.svg`) does not exist in `public/`. It's recorded for a follow-up and not fixed here (non-goal: no visible changes).

## Tasks

### [x] 1.0 Repository hygiene: merge pending content, remove stale worktree, untrack generated output, delete dead files

#### 1.0 Proof Artifact(s)

- CLI: `npm run test:e2e` output captured **before** any changes → `01-proofs/1.0-e2e-baseline.txt`. Shows the e2e baseline. Pre-existing failures are listed and not counted as regressions (Spec Open Question 2).
- CLI: `git log --oneline -3` shows the cherry-picked "Add Lead Delivery Consultant role at Liatrio" commit on `main`. Shows the pending content was kept.
- CLI: `git worktree list` shows one entry, and `git branch` no longer lists `claude/interesting-aryabhata`. Shows the stale worktree and branch are gone.
- CLI: `git status --porcelain` is empty after `npm run test:run && npm run test:e2e`. Shows generated output is ignored and tooling is tracked.
- CLI: `npx vitest run` summary shows about 27 test files, all passing, with no `.claude/` paths → `01-proofs/1.0-vitest.txt`. Shows tests no longer run twice.
- CLI: `ls src/components/sections/*.demo.tsx src/components/sections/*_IMPLEMENTATION.md src/app/*.md e2e/TEST_RESULTS.md` reports "No such file" for each. Shows dead files were deleted.

#### 1.0 Tasks

- [x] 1.1 Run `npm run test:e2e` and `npx vitest run` on the untouched `main`. Save the output to `01-proofs/1.0-e2e-baseline.txt` and `01-proofs/1.0-vitest-baseline.txt`, noting every failing test by name.
- [x] 1.2 Take full-page screenshots of a production build (`npm run build && npm run start`) at 375px, 768px and 1280px widths. Save them as `01-proofs/before-375.png`, `before-768.png`, `before-1280.png` (the baseline for 2.0 and 3.0). Capture twice and pixel-diff the two runs to confirm the capture is deterministic (0 differing pixels). _Implementation note: the baseline was re-captured at the end of 1.0, after the 1.3 cherry-pick, because that commit changes visible content (new role). The 2.0 and 3.0 diffs therefore measure only code changes._
- [x] 1.3 Cherry-pick `cec60ce` onto `main` (`git cherry-pick cec60ce`). If there are conflicts in `experience.json` or `profile.json`, keep the incoming content. Run `npx vitest run` and confirm everything passes.
- [x] 1.4 Remove the worktree (`git worktree remove .claude/worktrees/interesting-aryabhata`) and delete its branch (`git branch -D claude/interesting-aryabhata`) once 1.3 is confirmed on `main`.
- [x] 1.5 Add `'**/.claude/**'` to the `exclude` array in `vitest.config.ts`.
- [x] 1.6 Add `playwright-report/`, `test-results/`, `.claude/worktrees/` and `.claude/settings.local.json` to `.gitignore`. Run `git rm -r --cached playwright-report test-results`.
- [x] 1.7 Delete the 9 `src/components/sections/*.demo.tsx` files, the 7 `src/components/sections/*_IMPLEMENTATION.md` files, `src/app/PERFORMANCE_TESTING.md`, `src/app/SEO_IMPLEMENTATION.md` and `e2e/TEST_RESULTS.md`. Run `grep -rn "\.demo" src` and confirm there are no remaining references.
- [x] 1.8 Check `.agents/`, `.claude/skills/`, `.kiro/skills/` and `skills-lock.json` for secrets (`grep -rniE "token|secret|api[_-]?key|password"`), then `git add` them.
- [x] 1.9 Run `npx vitest run` → `01-proofs/1.0-vitest.txt`, then the e2e suite, then `git status --porcelain`, and capture the 1.0 proofs. Commit: "Clean up repository: merge pending content, ignore generated output, remove dead files".

### [x] 2.0 Consistent data loading through one content module, plus a content validation test

#### 2.0 Proof Artifact(s)

- CLI: `grep -rln "@/data/" src --include='*.ts' --include='*.tsx' | grep -v '\.test\.'` prints only `src/lib/content.ts`. Shows a single loading path.
- Test: `npx vitest run src/lib/content.test.ts` passes on current data → `01-proofs/2.0-content-test.txt`. Shows all content is valid.
- CLI: temporarily set `personalProjects.json` entry `status` to `"done"`. `npx vitest run src/lib/content.test.ts` fails with a message containing `personalProjects.json`, the entry `id` and `status` → `01-proofs/2.0-content-test-negative.txt` (then reverted). Shows the guardrail catches bad data.
- Test: `WorkProjects.test.tsx` and `PersonalProjects.test.tsx` pass with fixture props and no `vi.mock('@/data/...')`. Shows the props-based pattern works.
- Screenshot + pixel diff: `01-proofs/after-2.0-{375,768,1280}.png` compared with `before-*` reports 0 differing pixels at each width → `01-proofs/2.0-pixel-diff.txt`. Shows there were no visual regressions.

#### 2.0 Tasks

- [x] 2.1 Change the three `startDate` values in `src/data/personalProjects.json` from `YYYY-MM-DD` to `YYYY-MM` (A1).
- [x] 2.2 Create `src/lib/content.ts`. Import every `src/data/*.json` file and export typed constants: `profile`, `experiences`, `skillCategories`, `degrees`, `certifications`, `workProjects`, `personalProjects`, `volunteering`. Cast only in this file.
- [x] 2.3 Change `WorkProjects` to accept `workProjects: WorkProject[]` and `experiences: Experience[]` props (keeping `onViewExperience`), and remove its JSON imports. Update `WorkProjects.test.tsx` to pass fixture arrays as props and drop the `vi.mock('@/data/...')` calls.
- [x] 2.4 Change `PersonalProjects` to accept a `personalProjects: PersonalProject[]` prop and remove its JSON import. Update `PersonalProjects.test.tsx` to pass fixtures as props. Replace the `vi.doMock` empty-data test with `render(<PersonalProjects personalProjects={[]} />)`.
- [x] 2.5 Update `src/app/page.tsx` to import from `@/lib/content` and pass props to every section, including `WorkProjects` and `PersonalProjects`. Remove the per-call `as Type` casts. Update `src/app/page.test.tsx` mocks to match.
- [x] 2.6 Update `src/app/layout.tsx` to read `profile` from `@/lib/content`. Leave `seo.test.tsx` importing the JSON directly, since tests may still read raw data.
- [x] 2.7 Write `src/lib/content.test.ts`, with one `describe` per content file, covering:
  - required fields from `src/types/index.ts` are present and non-empty
  - `PersonalProject.status` ∈ {`ideation`, `in-progress`, `completed`} and `Skill.proficiency` (when set) ∈ {`beginner`, `intermediate`, `advanced`, `expert`}
  - every date matches `^\d{4}-(0[1-9]|1[0-2])$`, or is `Present` where the type allows it
  - `startDate` ≤ `endDate` when both are dates
  - `id` values are unique within each file
  - every `WorkProject.experienceId` exists in `experiences`, and every `Experience.relatedProjects` entry exists in `workProjects`
  - every image path (`profileImage`, `companyLogo`, `institutionLogo`, `organizationLogo`, `images[]`) exists under `public/` (checked with `fs.existsSync`)

  Failure messages must name the file, entry `id` and field.
- [x] 2.8 Run the negative check (invalid `status`), save the failing output, and revert. Run the full `npx vitest run`.
- [x] 2.9 Take after screenshots at the three widths and pixel-diff them against `before-*` (expect 0; investigate and document any non-zero result). Capture the 2.0 proofs and commit: "Load all content through one module and validate content data".

### [x] 3.0 Shared date helper and loading placeholder, light-only styling, image and theme cleanup

#### 3.0 Proof Artifact(s)

- Test: `npx vitest run src/lib/dates.test.ts` passes, covering `YYYY-MM`, `Present`, an undefined end date with each open-ended option, and a timezone-independence case. Output → `01-proofs/3.0-dates-test.txt`. Shows the helper behaves the same as the old formatters.
- Test: `Experience`, `Education`, `Volunteering` and `page` tests pass with unchanged expected date strings. `PersonalProjectCard.test.tsx` changes only the two lines documented in A2. Shows the rendered dates are unchanged.
- CLI: `grep -rn "dark:" src --include='*.tsx' | grep -v '\.test\.'` and `grep -rn "accent-" src` return nothing. Shows the stray classes and the unused scale are gone.
- CLI: `grep -c "min-h-\[400px\] animate-pulse" src/app/page.tsx` returns `0`, and `grep -rn "toLocaleDateString" src --include='*.tsx' | grep -v '\.test\.'` returns nothing. Shows the duplicated code is gone.
- CLI: `npm run lint 2>&1 | grep -c no-img-element` returns `0` for `PersonalProjectCard.tsx`. Shows `next/image` is used.
- Screenshot + pixel diff: `01-proofs/after-3.0-{375,768,1280}.png` compared with `before-*` reports 0 differing pixels at each width → `01-proofs/3.0-pixel-diff.txt`. Shows there were no visual regressions, including the SVG image swap (A4).

#### 3.0 Tasks

- [x] 3.1 Create `src/lib/dates.ts` with:
  - `formatMonthYear(value: string): string`, which returns `"Present"` unchanged and otherwise splits `YYYY-MM` into numbers and formats `new Date(year, month - 1)` with `{ month: 'short', year: 'numeric' }`, `en-US`
  - `formatDateRange(start: string, end?: string, options?: { openEnded?: 'present' | 'omit' }): string`, which returns `"Start - End"`, `"Start - Present"` (`present`, the default) or `"Start"` (`omit`)
- [x] 3.2 Write `src/lib/dates.test.ts` covering: `2023-01` → `Jan 2023`, `Present` → `Present`, closed range, open range for both options, and the same output under `process.env.TZ` set to `America/New_York` and to `UTC`.
- [x] 3.3 Replace the local formatters in `Experience.tsx`, `Education.tsx` (including cert `Issued:` and `Expires:`) and `Volunteering.tsx` with the shared helpers. Run their tests and confirm the expected strings are unchanged.
- [x] 3.4 Replace `formatDateRange` in `PersonalProjectCard.tsx` with the shared helper using `{ openEnded: 'omit' }`. Update only `PersonalProjectCard.test.tsx` lines 64 and 70 to `Jan 2023 - Jun 2023` / `Jan 2023` (A2), and the `PersonalProjects.test.tsx` date-range test to `Jun 2022 - Jan 2023` / `Mar 2023` (A6), each with a one-line comment explaining the timezone fix.
- [x] 3.5 In `PersonalProjectCard.tsx`, replace the raw `<img>` SVG branch with `<OptimizedImage src=… alt=… fill unoptimized className="object-contain p-4" />` (A4). Confirm `PersonalProjectCard.test.tsx` and the `kiro.svg` card still render.
- [x] 3.6 Create `src/components/ui/SectionPlaceholder.tsx`, which renders `<div aria-hidden="true" className="min-h-[400px] animate-pulse bg-gray-100" />`. Export it from `src/components/ui/index.ts`, add `SectionPlaceholder.test.tsx`, and use it for all 7 `loading:` options in `page.tsx`. This removes every `dark:` class.
- [x] 3.7 Remove the `accent` color block from `tailwind.config.ts`. Confirm `grep -rn "accent-" src` is empty.
- [x] 3.8 Run `npx vitest run`, take the after screenshots, pixel-diff them against `before-*` (expect 0), capture the 3.0 proofs and commit: "Share date formatting and loading placeholder, remove unused styles".

### [x] 4.0 Config leftovers and type safety: `tsc`, lint and build all clean

#### 4.0 Proof Artifact(s)

- CLI: `npx tsc --noEmit; echo "exit=$?"` prints only `exit=0` → `01-proofs/4.0-tsc.txt`. Shows the 26 test type errors are fixed.
- CLI: `npm run lint` prints "No ESLint warnings or errors" → `01-proofs/4.0-lint.txt`. Shows lint is clean.
- CLI: `npm run build` succeeds, and `grep -iE "swcMinify|invalid next.config|unrecognized key"` on its output returns nothing → `01-proofs/4.0-build.txt`. Shows the config is cleaned up.
- CLI: `grep -n "swcMinify\|react-icons" next.config.js` and `grep -n "google-site-verification-code" src/app/layout.tsx` return nothing, and `npm ls @next/bundle-analyzer` shows `14.x`. Shows each leftover is removed.
- Test: `npx vitest run src/test/accessibility.test.tsx src/test/status-badge-visual-regression.test.tsx` passes. Also, temporarily rendering an `<img>` without `alt` in one axe test makes it fail (then reverted). Shows the matcher works and still catches violations.

#### 4.0 Tasks

- [x] 4.1 Remove `swcMinify: true` and the `experimental.optimizePackageImports` block from `next.config.js`.
- [x] 4.2 Remove the `verification` block (placeholder `google-site-verification-code`) from `src/app/layout.tsx`. Update `seo.test.tsx` if it asserts on it.
- [x] 4.3 Run `npm install -D @next/bundle-analyzer@^14.2.0` and confirm `npm run analyze` still starts a build.
- [x] 4.4 Move axe matcher registration into `src/test/setup.ts` (`import { toHaveNoViolations } from 'jest-axe'; expect.extend(toHaveNoViolations);`) and delete the per-file `expect.extend` lines in the two axe test files.
- [x] 4.5 Add `src/test/vitest-axe.d.ts`, which extends Vitest's `Assertion<T>` and `AsymmetricMatchersContaining` with `toHaveNoViolations(): void`. If the `jest-axe` module itself has no types, also install `@types/jest-axe`. Make sure `tsconfig.json` `include` covers the file.
- [x] 4.6 Run `npx tsc --noEmit` and fix any remaining errors at their source (no `@ts-ignore`).
- [x] 4.7 Do the axe negative check (temporarily add a missing-`alt` image, confirm the test fails, then revert).
- [x] 4.8 Run `npm run lint` and `npm run build`. Capture the 4.0 proofs and commit: "Remove config leftovers and fix test type errors".

### [x] 5.0 Consolidated README replaces the root docs

#### 5.0 Proof Artifact(s)

- CLI: `ls *.md` at the repo root prints only `README.md`, and `ls e2e/*.md` prints only `e2e/README.md`. Shows the root docs are consolidated and the e2e guide is kept (spec Open Question 1).
- CLI: `grep -n "e2e/README.md" README.md` returns a match in the Testing section. Shows the e2e guide is linked.
- CLI: a script lists every `npm run <name>` in `README.md` and checks each against `package.json` `scripts` (`node -e` or `grep`). It also runs `ls` on every repo path in `README.md`. All found → `01-proofs/5.0-readme-check.txt`. Shows the README is accurate.
- Diff: `README.md` contains `## Overview`, `## Setup`, `## Editing Content`, `## Testing` and `## Deployment` headings. Shows the required coverage.

#### 5.0 Tasks

- [x] 5.1 Read `README.md`, `CONTENT_GUIDE.md`, `DEPLOYMENT.md`, `PERFORMANCE.md`, `CONTRIBUTING.md` and `e2e/README.md`. List which facts are still accurate after 1.0–4.0.
- [x] 5.2 Rewrite `README.md` with these sections:
  - **Overview:** stack and live URL
  - **Setup:** prerequisites, install, `dev`
  - **Editing Content:** one row per `src/data/*.json` file and the section it drives, date format `YYYY-MM`, adding images under `public/images/`, and how `content.test.ts` catches mistakes
  - **Testing:** unit, e2e, `tsc`, lint, with a link to `e2e/README.md` for e2e details
  - **Deployment:** Vercel, domain, `/resume` → `Scott_Howard_Resume.pdf`
  - **Project Structure:** short tree including `src/lib/`

  Keep it concise and drop anything that's no longer true.
- [x] 5.3 Delete `CONTRIBUTING.md`, `CONTENT_GUIDE.md`, `DEPLOYMENT.md` and `PERFORMANCE.md`. Update `e2e/README.md` in place: remove stale content (for example references to the deleted `TEST_RESULTS.md`) and make sure its commands match `package.json`.
- [x] 5.4 Run the README accuracy check script on both `README.md` and `e2e/README.md` and fix any missing script or path. Capture the 5.0 proofs.
- [x] 5.5 Run the final full check (`npx vitest run`, `npm run test:e2e`, `npx tsc --noEmit`, `npm run lint`, `npm run build`) and compare e2e results with the 1.1 baseline. Commit: "Consolidate documentation into README".
