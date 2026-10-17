# Task 01 Proofs - Repository hygiene

## Task Summary

This task cleans up the repository without changing how the site works. It brings the pending "Lead Delivery Consultant" content commit into `main`, removes the stale agent worktree and its branch, stops tracking generated Playwright output, commits the spec-driven-development tooling, and deletes 19 dead demo, notes and report files. It also captures the e2e and visual baselines used by later tasks.

## What This Task Proves

- The pending content commit (`cec60ce`) is on `main` as `d5d1243`, and the live page shows the new role.
- Only one worktree and one branch (`main`) remain.
- Vitest no longer collects worktree tests. The suite went from 54 files / 996 tests to 27 / 498, all passing.
- Generated Playwright output is ignored, and the tooling (`.agents/`, `.claude/skills/`, `.kiro/skills/`, `skills-lock.json`) is tracked.
- Dead files are gone, and nothing referenced them.
- E2E results are the same as before: the same 18 tests that failed before any change still fail, and no new failures appeared.
- Full-page screenshots are deterministic (0 differing pixels between two captures), so later 0-pixel diffs are meaningful.

## Evidence Summary

| Check | Result |
| --- | --- |
| Cherry-pick on `main` | `d5d1243 Add Lead Delivery Consultant role at Liatrio` |
| `git worktree list` / `git branch` | 1 worktree / `main` only |
| Vitest | 27 files, 498 tests passed, 0 `.claude/` paths (was 54 / 996) |
| E2E | 72 passed / 18 failed, identical failure set to baseline |
| Generated output | `playwright-report/`, `test-results/` show as ignored (`!!`) after test runs |
| Dead files | 0 `demo`/`IMPLEMENTATION` files left in `sections/`. App notes and `e2e/TEST_RESULTS.md` deleted |
| Tooling secrets scan | Only matches are instructional text in the skill docs. Symlinks are relative (`../../.agents/skills/sdd`) |
| Screenshot determinism | 0 differing pixels at 375 / 768 / 1280 |

## Artifact: Pending content merged

**What it proves:** the worktree's unmerged commit is now part of `main` (Spec Unit 1, FR 1).

**Why it matters:** it was the only real work at risk from removing the worktree.

**Command:** `git log --oneline -3`

**Result summary:** the cherry-picked commit is on `main`, directly after the planning commit.

```
d5d1243 Add Lead Delivery Consultant role at Liatrio
8091016 Add codebase cleanup spec, task list, and planning audit
6b76a69 Add Subaru work
```

## Artifact: Stale worktree and branch removed

**What it proves:** the worktree is unregistered and its branch is deleted (FR 2). The worktree had no uncommitted changes before removal.

**Command:** `git worktree list && git branch`

```
/Users/<user>/…/personal-website  d5d1243 [main]
* main
```

## Artifact: Unit tests collected once

**What it proves:** the `'**/.claude/**'` Vitest exclude stops duplicate collection (FR 5).

**Why it matters:** the doubled count hid the real suite size, and stale worktree tests could mask or fake failures.

**Artifact paths:** `01-proofs/1.0-vitest-baseline.txt` (before), `01-proofs/1.0-vitest.txt` (after)

**Result summary:** before, 54 files / 996 tests with 41 `.claude/worktrees` lines. After, 27 files / 498 tests, all passing, with 0 `.claude` lines.

```
before:  Test Files  54 passed (54)   Tests  996 passed (996)
after:   Test Files  27 passed (27)   Tests  498 passed (498)
```

## Artifact: Generated output ignored, tooling tracked

**What it proves:** `.gitignore` covers test output and worktrees, and previously committed reports are removed from git (FR 3, FR 4).

**Command:** `git status --porcelain --ignored playwright-report test-results .claude` (after running both test suites, before commit)

**Result summary:** the old tracked report files show as deleted (`D`) and the newly generated directories show as ignored (`!!`). After the commit, `git status --porcelain` is empty (verified below the commit).

```
A  .claude/skills/sdd
D  playwright-report/data/6382eeabcddbe25336740d08622aa0a8de74f985.md
D  playwright-report/index.html
D  test-results/.last-run.json
D  test-results/full-page-flow-…-chromium/error-context.md
!! playwright-report/
!! test-results/
```

## Artifact: Dead files deleted

**What it proves:** all 9 demos, 7 section notes, 2 app notes and `e2e/TEST_RESULTS.md` are gone (FR 6), and `grep -rn "\.demo" src e2e` matches only the unrelated `demoUrl` field.

**Command:** `ls` on a sample of each deleted group

```
ls: src/components/sections/Hero.demo.tsx: No such file or directory
ls: src/components/sections/HERO_IMPLEMENTATION.md: No such file or directory
ls: src/app/SEO_IMPLEMENTATION.md: No such file or directory
ls: src/app/PERFORMANCE_TESTING.md: No such file or directory
ls: e2e/TEST_RESULTS.md: No such file or directory
$ ls src/components/sections/ | grep -cE "demo|IMPLEMENTATION"
0
```

## Artifact: E2E baseline and no-regression check

**What it proves:** the e2e suite already had 18 failures on the untouched `main` (spec Open Question 2), and this task introduced none.

**Why it matters:** later tasks are judged against this exact failure set, not against "all green".

**Artifact paths:** `01-proofs/1.0-e2e-baseline.txt` (before), `01-proofs/1.0-e2e.txt` (after)

**Result summary:** both runs show 72 passed / 18 failed. A sorted `diff` of the failing-test lists is empty ("SAME FAILURE SET"). Most failures are on `mobile-chromium` (resume download, smooth scrolling) and come from the existing tests, not from this cleanup.

```
18 failed
[chromium] › e2e/full-page-flow.spec.ts:173:7 › Full Page Navigation Flow › should display all critical content sections
[chromium] › e2e/resume-download.spec.ts:33:7 › Resume Download › should display download icon on button
[mobile-chromium] › e2e/full-page-flow.spec.ts:4:7 › Full Page Navigation Flow › should complete full user journey through the website
[mobile-chromium] › e2e/full-page-flow.spec.ts:148:7 › Full Page Navigation Flow › should handle keyboard-only navigation flow
[mobile-chromium] › e2e/full-page-flow.spec.ts:173:7 › Full Page Navigation Flow › should display all critical content sections
[mobile-chromium] › e2e/full-page-flow.spec.ts:208:7 › Full Page Navigation Flow › should handle browser back/forward navigation
[mobile-chromium] › e2e/resume-download.spec.ts:11:7 › Resume Download › should display download resume button
[mobile-chromium] › e2e/resume-download.spec.ts:22:7 › Resume Download › should have accessible label for download button
[mobile-chromium] › e2e/resume-download.spec.ts:33:7 › Resume Download › should display download icon on button
[mobile-chromium] › e2e/resume-download.spec.ts:45:7 › Resume Download › should trigger download when button is clicked
[mobile-chromium] › e2e/resume-download.spec.ts:73:7 › Resume Download › should be keyboard accessible
[mobile-chromium] › e2e/resume-download.spec.ts:104:7 › Resume Download › should have visible focus indicator on download button
[mobile-chromium] › e2e/resume-download.spec.ts:119:7 › Resume Download › should display download section with proper heading
[mobile-chromium] › e2e/resume-download.spec.ts:130:7 › Resume Download › should display descriptive text about resume download
[mobile-chromium] › e2e/smooth-scrolling.spec.ts:9:7 › Smooth Scrolling › should smoothly scroll between sections
[mobile-chromium] › e2e/smooth-scrolling.spec.ts:44:7 › Smooth Scrolling › should maintain smooth scroll behavior across multiple sections
[mobile-chromium] › e2e/smooth-scrolling.spec.ts:58:7 › Smooth Scrolling › should handle rapid navigation clicks gracefully
[mobile-chromium] › e2e/smooth-scrolling.spec.ts:75:7 › Smooth Scrolling › should scroll to section with proper offset for fixed header
72 passed
```

## Artifact: Visual baseline screenshots

**What it proves:** the full-page capture method is deterministic, so the 2.0 and 3.0 pixel diffs can expect exactly 0.

**Why it matters:** the first attempt differed by about 1% because `scroll-behavior: smooth` and the header's scroll state changed between runs. The capture script now forces instant scrolling and waits for `scrollY === 0` plus the header transition before capturing.

**Artifact path:** `01-proofs/1.0-screenshot-determinism.txt`

**Result summary:** two independent captures of a production build (`npm run build && npm run start`, taken after the cherry-pick) are pixel-identical at all three widths.

```
before-375.png  vs run2: 0 differing pixels (identical)
before-768.png  vs run2: 0 differing pixels (identical)
before-1280.png vs run2: 0 differing pixels (identical)
```

`01-proofs/before-375.png`

![Mobile 375px full-page baseline](before-375.png)

`01-proofs/before-768.png`

![Tablet 768px full-page baseline](before-768.png)

`01-proofs/before-1280.png`

![Desktop 1280px full-page baseline showing Lead Delivery Consultant at Liatrio](before-1280.png)

### Capture and diff scripts (kept in the session scratchpad, reproduced here)

`shots.cjs`, Playwright Chromium full-page capture:

```js
// Usage: node shots.cjs <outDir> <prefix> [baseURL]
const path = require('path');
const ROOT = '<repo>';
const { chromium } = require(path.join(ROOT, 'node_modules/playwright-core'));
const [outDir, prefix, base = 'http://localhost:3000'] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  for (const width of [375, 768, 1280]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
    // Scroll through the page so lazy images load, then return to top
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 600) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(150); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() => window.scrollY === 0);
    await page.waitForTimeout(800); // let header scroll-state transitions finish
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))));
    await page.waitForTimeout(500);
    const file = path.join(outDir, `${prefix}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: 'disabled', caret: 'hide' });
    console.log('saved', file);
    await ctx.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
```

`diff.cjs`, Playwright's built-in PNG comparator (the same engine as `toHaveScreenshot()`), with `threshold: 0`:

```js
// Usage: node diff.cjs <a.png> <b.png> [diffOut.png]
const fs = require('fs');
const ROOT = '<repo>';
const { getComparator } = require(ROOT + '/node_modules/playwright-core/lib/server/utils/comparators.js');
const [a, b, out] = process.argv.slice(2);
const r = getComparator('image/png')(fs.readFileSync(b), fs.readFileSync(a), { threshold: 0, maxDiffPixels: 0 });
if (!r) { console.log(`${a} vs ${b}: 0 differing pixels (identical)`); process.exit(0); }
if (out && r.diff) fs.writeFileSync(out, r.diff);
console.log(`${a} vs ${b}: ${r.errorMessage}`);
process.exit(1);
```

## Reviewer Conclusion

The repository now holds only source, content and intentional tooling. Pending content is merged, the duplicate test run is gone, and generated output can't be committed again. Both unit and e2e results are unchanged from the baseline, which shows nothing broke. The deterministic screenshots give tasks 2.0 and 3.0 an exact visual baseline.
