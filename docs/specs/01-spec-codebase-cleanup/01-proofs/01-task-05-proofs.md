# Task 05 Proofs - Consolidated documentation and final verification

## Task Summary

Five overlapping root docs (about 47 KB, last reviewed October 2025) are replaced by one `README.md` that matches the code after tasks 1–4. `e2e/README.md` is kept (spec Open Question 1), corrected, and linked from the README. A final run of every check confirms the whole spec is done with no regressions.

## What This Task Proves

- The repo root has only `README.md` as documentation. `e2e/README.md` is kept and linked (Spec Unit 4, FR 1–2).
- Every `npm` script and repo path named in either README exists (FR 3).
- The README has the required Overview, Setup, Editing Content, Testing and Deployment sections, plus Project Structure.
- Final state: unit, type, lint and build all pass. E2E matches the 1.0 baseline exactly.

## Evidence Summary

| Check | Result |
| --- | --- |
| Root docs | `README.md` only (deleted: `CONTRIBUTING.md`, `CONTENT_GUIDE.md`, `DEPLOYMENT.md`, `PERFORMANCE.md`) |
| `e2e/README.md` | kept, 2 stale details fixed, "Known Failures" section added, linked from README |
| README accuracy | 14 scripts + 25 paths in README, 5 scripts + 8 paths in e2e README: all resolve |
| Unit suite | 30 files, 538 tests passed |
| `tsc --noEmit` | exit 0 |
| Lint | ✔ No ESLint warnings or errors |
| Clean build | exit 0, 0 warning lines, `/` 98.4 kB First Load JS |
| E2E | 72 passed / 18 failed, identical failure set to the 1.0 baseline |

## Stale Facts Corrected

Each of these was checked against the code or the live site before it was dropped or rewritten:

| Old docs said | Actually |
| --- | --- |
| Resume at `public/resume.pdf` | `public/Scott_Howard_Resume.pdf` (buttons in `Hero.tsx` and `Contact.tsx`) |
| 8 supported social platforms | `Footer`, `About` and `Contact` render icons for `linkedin`, `github` and `twitter` only |
| Images in `public/images/companies/` and `projects/` subfolders | all images are directly in `public/images/` |
| `NEXT_PUBLIC_SITE_URL` etc. needed in `.env.local` | no source file reads them, only `NODE_ENV` is used |
| Content files list (6) | 7 files, `volunteering.json` was missing |
| Node 18+ | Next 14 requires 18.17+ |
| e2e project `--project=mobile`, device "iPhone 12" | `mobile-chromium`, Pixel 5 (`playwright.config.ts`) |
| `npm run test:run -- --clearCache` | not a Vitest option, removed |

The new README also documents the content rules enforced by `src/lib/content.test.ts`, with a real error message as an example.

## Findings During Implementation

- **`/resume` returns 404 on the live site.** `vercel.json` redirects `/resume` to `/resume.pdf`, which doesn't exist. Checked with `curl -L https://scottryanhoward.info/resume` (404 at `/resume.pdf`), while `/Scott_Howard_Resume.pdf` returns 200. The on-page buttons are unaffected. Fixing it would change production behavior, which is out of scope, so it's written up as a known issue in the README and reported to the user.
- `src/test/performance.test.tsx` had a test that required `PERFORMANCE.md` to exist and contain certain headings. That file's deletion was approved (questions round 1, Q5 → C), and the test checked documentation rather than behavior, so it was removed. The unit test count drops from 539 to 538.
- `.vercelignore` named `DEPLOYMENT.md` explicitly. That line was redundant with `*.md` / `!README.md` and is removed.

## Artifact: Documentation consolidated

**Command:** `ls *.md; ls e2e/*.md; grep -n "^## " README.md; grep -n "e2e/README.md" README.md`

**Artifact path:** `01-proofs/5.0-final-checks.txt`

```
$ ls *.md
README.md
$ ls e2e/*.md
e2e/README.md
$ grep -n "^## " README.md
3:## Overview
13:## Setup
39:## Editing Content
72:## Testing
84:## Deployment
98:## Project Structure
119:## License
$ grep -n "e2e/README.md" README.md
82:- End-to-end specs live in `e2e/`. See [`e2e/README.md`](./e2e/README.md) for …
```

## Artifact: README accuracy check

**What it proves:** every command and path a reader is told to use exists.

**Why it matters:** the old docs pointed to a resume file, image folders and env vars that don't exist.

**Command:** a Python checker (session scratchpad) that extracts `npm run …`, `npm test` / `npm start` and backticked `test:*` names and checks them against `package.json` `scripts`. It also extracts backticked or linked repo paths and checks them on disk, resolving bare names against the repo root, the doc's folder and `src/data/`.

**Artifact path:** `01-proofs/5.0-readme-check.txt`

```
== README.md
  script analyze / build / dev / lighthouse / lint / start / test / test:e2e{,:debug,:headed,:report,:ui} / test:run / test:ui   OK (14)
  path   LICENSE, e2e/README.md, next.config.js, vercel.json, public/Scott_Howard_Resume.pdf, public/images/,
         public/robots.txt, public/sitemap.xml, src/data/, src/lib/content.ts, src/lib/content.test.ts,
         src/test/, src/test/setup.ts, src/types/index.ts, and the 7 data files (src/data)                      OK
== e2e/README.md
  script test:e2e{,:debug,:headed,:report,:ui}                                                             OK (5)
  path   6 spec files, playwright.config.ts, docs/specs/…/1.0-e2e-baseline.txt                             OK
ALL OK
```

## Artifact: Final verification run

**What it proves:** the full spec is done with every quality check passing and no regressions.

**Artifact paths:** `01-proofs/5.0-final-checks.txt`, `01-proofs/5.0-e2e.txt`

```
$ npx vitest run
 Test Files  30 passed (30)
      Tests  538 passed (538)
$ npx tsc --noEmit
exit=0
$ npm run lint
✔ No ESLint warnings or errors
$ rm -rf .next && npm run build
exit=0 warnings=0
┌ ○ /                                    11.2 kB        98.4 kB
$ npm run test:e2e
  18 failed
  72 passed (2.5m)
  e2e failure set vs 1.0 baseline: SAME (no new failures)
```

## Spec Success Metrics: Final Status

| Metric (spec) | Target | Result |
| --- | --- | --- |
| Clean checks | `tsc` 0 errors (from 26), lint 0 warnings, build without config warnings | 0 errors, 0 warnings, 0 build warning lines |
| Test suite | 100% unit pass, file count roughly halved, content and date tests added | 538/538. 54 → 30 files (27 + `content`, `dates`, `SectionPlaceholder`) |
| Less code and docs | 18 in-source files + 4 root docs removed, 1 data module, 1 formatter, 1 placeholder | 18 + `e2e/TEST_RESULTS.md` + 4 root docs removed. 1 / 1 / 1 |
| No visual regressions | pixel-identical at 3 widths | 0 px vs production-equivalent (UTC) build. Only the corrected month labels differ from a local US-timezone build (task 3 A7) |

## Reviewer Conclusion

The documentation now matches the codebase and lives in two maintained files. The final run shows every spec goal met: clean type check, lint and build, a passing and smaller unit suite with new content and date checks, and an end-to-end suite unchanged from baseline.
