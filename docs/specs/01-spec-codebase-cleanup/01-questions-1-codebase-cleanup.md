# 01 Questions Round 1 - Codebase Cleanup

Please answer each question below (select one or more options, or add your own notes). Feel free to add additional context under any question.

## 1. Unmerged worktree commit

The worktree at `.claude/worktrees/interesting-aryabhata` has one commit that is not on `main`: `cec60ce Add Lead Delivery Consultant role at Liatrio`, which changes `src/data/experience.json` and `src/data/profile.json`. Its tests are also being picked up by Vitest, which doubles the test run.

- [x] (A) Cherry-pick `cec60ce` onto `main`, then remove the worktree
- [ ] (B) Discard the commit and remove the worktree
- [ ] (C) Leave the worktree, only exclude `.claude/**` from Vitest
- [ ] (D) Other (describe)

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- The commit looks like a real content update (a new role), so throwing it away risks losing work.
- `(C)` fixes the doubled test run but leaves a stale checkout around. Either way, the spec will add `.claude/**` to the Vitest excludes so future worktrees don't leak in.

## 2. Committed generated output

`playwright-report/` and `test-results/` are committed, and they change on every end-to-end run.

- [x] (A) Remove them from git and add them to `.gitignore`
- [ ] (B) Keep them committed
- [ ] (C) Other (describe)

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- They are generated output with no value in history, and they create noisy diffs (one earlier commit touched 14k lines of them).

## 3. Untracked AI tooling files

`.agents/`, `.claude/skills/`, `.kiro/skills/` and `skills-lock.json` (the spec-driven-workflow skill) are untracked. `.claude/worktrees/` is also untracked.

- [x] (A) Commit the skill files and `skills-lock.json`, and gitignore `.claude/worktrees/`
- [ ] (B) Gitignore all of them (keep them local only)
- [ ] (C) Leave them untracked, no change
- [ ] (D) Other (describe)

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- The specs this workflow produces (`docs/specs/`) depend on the skill, so committing the skill and lockfile keeps the workflow reproducible.
- Worktrees are throwaway local checkouts and should never be committed.
- Choose `(B)` if you consider this tooling personal and not part of the project.

## 4. Demo files and implementation notes

`src/components/sections/` has 9 `*.demo.tsx` files and 8 `*_IMPLEMENTATION.md` files. Nothing imports the demo files. The notes describe the original build-out and may be out of date. There are also `src/app/PERFORMANCE_TESTING.md` and `src/app/SEO_IMPLEMENTATION.md`.

- [x] (A) Delete all demo files and in-source implementation notes
- [ ] (B) Delete the demo files and move the notes to `docs/`
- [ ] (C) Keep both
- [ ] (D) Other (describe)

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Unused demo files have to be updated during every refactor, and they will drift out of date.
- The notes record how things were first built, which is already in git history. Moving them (`(B)`) keeps docs nobody maintains.

## 5. Root documentation

The root has `README.md`, `CONTRIBUTING.md`, `CONTENT_GUIDE.md`, `DEPLOYMENT.md` and `PERFORMANCE.md` (about 47 KB in total). They were written in October 2025 and have not been reviewed since.

- [ ] (A) Keep `README.md`, `CONTENT_GUIDE.md` and `DEPLOYMENT.md`. Update them to match the code after cleanup. Delete `CONTRIBUTING.md` and `PERFORMANCE.md`.
- [ ] (B) Keep all five and update each one for accuracy
- [x] (C) Combine everything into a single concise `README.md`
- [ ] (D) Don't touch the docs in this spec
- [ ] (E) Other (describe)

**Recommended answer(s):** [(C)]

**Why these are recommended:**

- For a one-person personal site, a single short README covering setup, editing content, testing and deployment is easier to keep accurate than five long files.
- `(A)` is a reasonable middle ground if you like having a separate content guide.

## 6. Dark mode

Only the 7 lazy-load placeholders in `page.tsx` have `dark:` styles. Every section uses fixed light colors (`bg-white`, `text-gray-900`, and so on). The site displays light-only today.

- [x] (A) Light-only: remove the stray `dark:` classes
- [ ] (B) Add full dark-mode support that follows the system setting
- [ ] (C) Other (describe)

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- `(A)` is a cleanup and matches what the site looks like today.
- `(B)` is a visual redesign of every section and needs its own design pass. It is better as a separate spec than mixed into a refactor.

## 7. Data loading and type safety

Most sections receive data as props from `page.tsx`, but `WorkProjects` and `PersonalProjects` import their own JSON. All JSON is cast with `as Type`, so a typo in the data (such as a misspelled `status`) only shows up as a rendering bug.

- [ ] (A) Make it consistent: load all data in one place and pass it as props. Keep the TypeScript casts.
- [x] (B) Same as (A), plus a unit test that checks every JSON file against its type's required fields and allowed values
- [ ] (C) Same as (A), plus validation when the data loads, using a schema library (for example Zod)
- [ ] (D) Other (describe)

**Recommended answer(s):** [(B)]

**Why these are recommended:**

- The site's content lives in JSON, so catching data mistakes in tests is the most valuable guardrail you can add.
- `(B)` gets that without adding a runtime dependency to the bundle. `(C)` is more robust but adds a library for data that only changes when you edit it yourself.

## 8. Dependency scope

Cleanup includes removing the deprecated `swcMinify` option and the `react-icons` reference to a package that isn't installed. Current Next.js docs confirm `swcMinify` is removed in v15+. A bigger question is upgrading the framework itself (Next 14 → 15/16, React 18 → 19, Tailwind 3 → 4).

- [x] (A) Cleanup only: fix the config leftovers and align `@next/bundle-analyzer` to v14. No framework upgrades.
- [ ] (B) Include the framework upgrades in this spec
- [ ] (C) Other (describe)

**Current best-practice context:** Next.js removed the `swcMinify` flag in v15 (SWC minification is always on), so the option should be deleted either way. A major-version upgrade to Next, React and Tailwind is a migration with its own breaking changes.

**Recommended answer(s):** [(A)]

**Why these are recommended:**

- Doing the cleanup first gives the upgrade a smaller, fully-passing codebase to start from, and a clean place to go back to if the upgrade fails.
- The spec template treats framework migrations as their own spec. A follow-up `02-spec-framework-upgrade` would be a natural next step.

## 9. Other leftovers

Select everything you want included.

- [x] (A) Remove the placeholder Google verification code from `layout.tsx`. If you have a real code, write it under this question and I'll use it instead.
- [x] (B) Replace the raw `<img>` in `PersonalProjectCard` with the project's `OptimizedImage` / `next/image`
- [x] (C) Remove the unused magenta `accent` color scale from `tailwind.config.ts`
- [x] (D) Pull the duplicated date formatting (Experience, Education, Volunteering, PersonalProjectCard) and the repeated loading placeholder into shared helpers
- [x] (E) Fix the 26 TypeScript errors in tests by adding Vitest-compatible typing for the axe matcher, so `tsc --noEmit` passes
- [ ] (F) Other (describe)

**Current best-practice context:** `@types/jest-axe` extends Jest's types, not Vitest's. The usual Vitest approach is to call `expect.extend` with the matcher and declare the matcher type for Vitest (or switch to `vitest-axe`).

**Recommended answer(s):** [(A), (B), (C), (D), (E)]

**Why these are recommended:**

- Each one is small, easy to check, and directly from the review. Together they bring lint warnings, type errors and duplicated code to zero, which gives the spec a clear finish line.

---

**User response (2026-10-17):** Use recommended answers for all.
