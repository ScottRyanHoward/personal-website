# Personal Website - Scott Ryan Howard

## Overview

Single-page portfolio and resume site, live at [scottryanhoward.info](https://scottryanhoward.info).

- **Framework:** Next.js 14 (App Router), React 18, TypeScript (strict)
- **Styling:** Tailwind CSS 3, light theme with a custom olive-green `primary` palette
- **Content:** JSON files in `src/data/`, with no CMS or backend
- **Testing:** Vitest + Testing Library + jest-axe (unit and accessibility), Playwright (end-to-end)
- **Hosting:** Vercel

## Setup

Requires Node.js 18.17 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

No environment variables are required.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also runs lint and type checks) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Vitest once |
| `npm run test:ui` | Vitest UI |
| `npm run test:e2e` | Playwright end-to-end tests (`test:e2e:ui`, `test:e2e:headed`, `test:e2e:debug`, `test:e2e:report` are variants) |
| `npm run analyze` | Production build with the bundle analyzer (opens reports in the browser) |
| `npm run lighthouse` | Build, start, and run a Lighthouse audit |

If a build behaves strangely (for example, fonts missing from the production page), clear the build cache with `rm -rf .next` and rebuild.

## Editing Content

All site content lives in `src/data/`. Edit the JSON, then run `npm run test:run` to check it before you commit.

| File | Drives |
| --- | --- |
| `profile.json` | Name, title, summary, photo, contact details, social links (Hero, About, Contact, Footer, page metadata) |
| `experience.json` | Work Experience timeline |
| `skills.json` | Skills & Technologies |
| `workProjects.json` | Work Projects cards |
| `personalProjects.json` | Personal Projects cards |
| `education.json` | Education (`degrees`) and certifications (`certifications`) |
| `volunteering.json` | Volunteering |

The fields for each entry are defined in `src/types/index.ts`. Everything reaches the page through `src/lib/content.ts`, and components never import JSON directly.

**Rules to follow** (checked by `src/lib/content.test.ts`):

- **Dates** are `YYYY-MM` (for example `"2025-05"`). `experience.json` and `volunteering.json` also accept `"Present"`. Leave out `endDate` for something that's ongoing.
- **ids** must be unique within a file.
- **Links between files:** each work project's `experienceId` must match an `id` in `experience.json`, and each id in an experience's `relatedProjects` must exist in `workProjects.json`.
- **Allowed values:** `personalProjects` `status` is `ideation`, `in-progress` or `completed`. A skill's optional `proficiency` is `beginner`, `intermediate`, `advanced` or `expert`.
- **Images** are referenced as `/images/<file>` and must exist in `public/images/`. Logos are shown in small squares, so square images work best. Project cards use a 16:9 frame.
- **Social links** (`profile.json` `socialLinks`) render icons for `linkedin`, `github` and `twitter`.

If you break a rule, the test names the exact problem. For example:

```
personalProjects.json [riveter-infrastructure-drift-detection] status: "done" is not one of ideation, in-progress, completed
```

**Resume PDF:** replace `public/Scott_Howard_Resume.pdf`. The Download Resume buttons link to that path.

## Testing

```bash
npm run test:run      # unit, component, accessibility and content tests
npx tsc --noEmit      # type check (includes test files)
npm run lint          # lint
npm run test:e2e      # end-to-end; starts the dev server automatically
```

- Unit tests sit next to their source (`Foo.tsx` → `Foo.test.tsx`). Cross-cutting tests (accessibility, keyboard, responsive, performance) live in `src/test/`. Shared setup and the axe matcher are registered in `src/test/setup.ts`.
- End-to-end specs live in `e2e/`. See [`e2e/README.md`](./e2e/README.md) for what they cover, how to run a single spec or project, and the **known pre-existing failures**.

## Deployment

The site deploys on Vercel. Every push to `main` deploys production, and other branches get preview deployments. Settings live in `vercel.json` (region `iad1`, caching headers for `sitemap.xml`, `robots.txt` and PDFs). Security and caching headers live in `next.config.js`.

To check a production build locally:

```bash
rm -rf .next && npm run build && npm start
```

The custom domain `scottryanhoward.info` is configured in the Vercel project's **Domains** settings. `public/sitemap.xml` and `public/robots.txt` are static files, so update them by hand if the URL changes.

> **Known issue:** `vercel.json` redirects `/resume` to `/resume.pdf`, which doesn't exist (the file is `/Scott_Howard_Resume.pdf`), so `/resume` returns 404. The on-page download buttons are unaffected.

## Project Structure

```
public/
  images/                 # photos, logos, project images (referenced as /images/...)
  Scott_Howard_Resume.pdf
  robots.txt, sitemap.xml
src/
  app/                    # layout (metadata, font), page (section order), global CSS
  components/
    layout/               # Header, Navigation, Footer, SkipToContent
    sections/             # one component per page section
    ui/                   # Card, Button, Timeline, ProjectCard, OptimizedImage, SectionPlaceholder, ...
  data/                   # site content (JSON)
  lib/                    # content.ts (loads content), dates.ts (date formatting), performance.ts
  test/                   # test setup and cross-cutting tests
  types/                  # content types
e2e/                      # Playwright specs
docs/specs/               # spec-driven development specs, task lists and proofs
```

## License

MIT, see [LICENSE](./LICENSE).
