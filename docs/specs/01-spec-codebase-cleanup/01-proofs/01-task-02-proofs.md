# Task 02 Proofs - One content module and content validation

## Task Summary

All site content now flows through a single module, `src/lib/content.ts`, and reaches every section as props. `WorkProjects` and `PersonalProjects` used to import their JSON directly; they now follow the same pattern as the other sections. A new test, `src/lib/content.test.ts`, checks every `src/data/*.json` file and reports each problem with the file, entry `id` and field. The page renders pixel-for-pixel the same as before.

## What This Task Proves

- Only one non-test file imports from `src/data/` (Spec Unit 2, FR 1–3).
- `WorkProjects` and `PersonalProjects` render from props, including proper empty-state tests that weren't possible with module mocks (FR 2).
- The content test checks required fields, allowed values, `YYYY-MM` dates and their order, unique ids, cross-file links, and image paths. It passes on real data and fails with a clear message on bad data (FR 4).
- The rendered page is unchanged: 0 differing pixels at 375, 768 and 1280px (FR 5).
- No regressions: 28 unit test files and 525 tests pass. E2E has the same 18 failures as the baseline. The type checker still reports exactly the original 26 errors (fixed in 4.0).

## Evidence Summary

| Check | Result |
| --- | --- |
| Non-test files importing `@/data/` | `src/lib/content.ts` only |
| Content test (real data) | 27 / 27 passed |
| Content test (invalid `status` injected) | fails, naming `personalProjects.json [riveter-infrastructure-drift-detection] status` |
| Unit suite | 28 files, 525 tests passed (+1 file, +27 tests vs 1.0) |
| Pixel diff vs baseline | 0 / 0 / 0 differing pixels |
| E2E | 72 passed / 18 failed, same failure set as baseline |

## Decisions Made During Implementation

- **A1, date normalization:** the three `personalProjects.json` `startDate` values changed from `YYYY-MM-01` to `YYYY-MM`. The displayed months are unchanged, and the pixel diff confirms it.
- **A5, empty experience description:** the content test first failed on real data: `experience.json [exp-0] description: empty`. `exp-0` is the newly added "Lead Delivery Consultant" role, which has only a title. A *missing* `description` still fails, but an *empty* one is allowed for experience entries, so a role can be listed before its summary is written. Filling it in is the site owner's content work (non-goal 4).
- **A6:** `PersonalProjects.test.tsx` has the same timezone-shifted date expectations as A2. These are corrected in task 3.4, not here, because this task doesn't change date rendering.
- `src/test/responsive-design.test.tsx` rendered `WorkProjects` with the real data, so it now passes `workProjects` and `experiences` from `@/lib/content`, keeping its original intent.

## Artifact: Single content loading path

**What it proves:** `src/lib/content.ts` is the only application file that reads the JSON content.

**Why it matters:** adding or changing a section now follows one obvious pattern, and type casts live in one place.

**Command:** `grep -rln "@/data/" src --include='*.ts' --include='*.tsx' | grep -v '\.test\.'`

```
src/lib/content.ts
```

`page.tsx` now passes every section its data:

```tsx
<WorkProjects workProjects={workProjects} experiences={experiences} />
<PersonalProjects personalProjects={personalProjects} />
<Education degrees={degrees} certifications={certifications} />
```

## Artifact: Content validation passes on real data

**What it proves:** every content file satisfies the rules the components rely on.

**Command:** `npx vitest run src/lib/content.test.ts --reporter=verbose`

**Artifact path:** `01-proofs/2.0-content-test.txt`

**Result summary:** 27 checks across all seven content files pass.

```
✓ content: profile.json > has all required fields
✓ content: profile.json > references images that exist
✓ content: experience.json > has all required fields
✓ content: experience.json > has valid dates
✓ content: experience.json > has unique ids
✓ content: experience.json > links relatedProjects to existing work projects
✓ content: experience.json > references images that exist
✓ content: skills.json > has all required fields
✓ content: skills.json > uses allowed proficiency values
✓ content: education.json > has all required fields / has valid dates / has unique ids / references images that exist
✓ content: workProjects.json > has all required fields / has valid dates / has unique ids
✓ content: workProjects.json > links experienceId to an existing experience
✓ content: workProjects.json > references images that exist
✓ content: personalProjects.json > has all required fields / uses allowed status values / has valid dates / has unique ids / references images that exist
✓ content: volunteering.json > has all required fields / has valid dates / has unique ids / references images that exist
Tests  27 passed (27)
```

## Artifact: Content validation catches bad data

**What it proves:** a realistic content mistake fails the test with a message that says exactly what to fix.

**Why it matters:** before this task, an invalid `status` would only show up as a wrong badge on the live site.

**Command:** temporarily change one `personalProjects.json` `status` from `"in-progress"` to `"done"`, run `npx vitest run src/lib/content.test.ts`, then restore the file (`git diff --stat` afterwards shows only the 3 A1 date lines).

**Artifact path:** `01-proofs/2.0-content-test-negative.txt`

```
FAIL  src/lib/content.test.ts > content: personalProjects.json > uses allowed status values
- Expected
+ Received

- []
+ [
+   "personalProjects.json [riveter-infrastructure-drift-detection] status: \"done\" is not one of ideation, in-progress, completed",
+ ]

Tests  1 failed | 26 passed (27)
```

## Artifact: Sections render from props

**What it proves:** the refactored sections work with injected data, including the empty state.

**Command:** `npx vitest run` (full suite)

**Artifact path:** `01-proofs/2.0-vitest.txt`

**Result summary:** all 28 files and 525 tests pass. `WorkProjects.test.tsx` (14) and `PersonalProjects.test.tsx` (16) pass fixtures as props with no `vi.mock('@/data/...')`. Both now have a real empty-state test (`workProjects={[]}`, `personalProjects={[]}`), replacing a placeholder test and a fragile `vi.doMock` + cache-busting re-import. `page.test.tsx` checks that the counts from `@/lib/content` reach both sections.

```
Test Files  28 passed (28)
     Tests  525 passed (525)
```

## Artifact: No visual change

**What it proves:** the data refactor and the A1 date change have no visible effect at any breakpoint.

**Command:** `npm run build && npm run start`, then `node shots.cjs … after-2.0` and `node diff.cjs before-<w>.png after-2.0-<w>.png` (scripts in `01-task-01-proofs.md`)

**Artifact path:** `01-proofs/2.0-pixel-diff.txt`

```
before-375.png  vs after-2.0-375.png:  0 differing pixels (identical)
before-768.png  vs after-2.0-768.png:  0 differing pixels (identical)
before-1280.png vs after-2.0-1280.png: 0 differing pixels (identical)
```

`01-proofs/after-2.0-375.png`

![Mobile 375px page after the content refactor, identical to baseline](after-2.0-375.png)

`01-proofs/after-2.0-768.png`

![Tablet 768px page after the content refactor, identical to baseline](after-2.0-768.png)

`01-proofs/after-2.0-1280.png`

![Desktop 1280px page after the content refactor, identical to baseline](after-2.0-1280.png)

## Artifact: E2E unchanged

**Artifact path:** `01-proofs/2.0-e2e.txt`

**Result summary:** 72 passed / 18 failed. A sorted diff of the failing tests against `1.0-e2e-baseline.txt` is empty.

## Reviewer Conclusion

Content loading is consistent and centralized. Content mistakes now fail a fast unit test with an exact location, and that test already caught one real gap (the empty `exp-0` description). The rendered site is pixel-identical and no test regressed.
