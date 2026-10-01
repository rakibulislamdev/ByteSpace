# ByteSpace

A 1:1 frontend replica of the ByteSpace course-platform design, built with
Next.js 16, React 19, TypeScript and Tailwind v4.

**Live:** https://byte-five-psi.vercel.app/

Every colour, type step, radius, shadow and line of copy here was read out of
the Figma file `OfiTDVmxnfjhcKcdLVtk0A` through the REST API. Nothing was
eyeballed from a screenshot, and that constraint is what shaped the
architecture below.

---

## Contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [Routes](#routes)
- [Architecture](#architecture)
- [Design tokens](#design-tokens)
- [The Figma pipeline](#the-figma-pipeline)
- [Motion](#motion)
- [Browser support and accessibility](#browser-support-and-accessibility)
- [Known limitations](#known-limitations)

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.3.6, App Router, Turbopack |
| UI | React 19.2.8, TypeScript 5 strict |
| Styling | Tailwind CSS v4, tokens in `@theme`, no config file |
| Type | Satoshi (body/UI), Poppins (display), Clash Display (wordmark) |
| Fonts | Self-hosted woff2 in `app/fonts` — no CDN at runtime |
| Tooling | Python 3 for the Figma pipeline, no extra JS build deps |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

> **One trap worth knowing about.** `next.config.ts` sets
> `allowedDevOrigins: ["127.0.0.1", "localhost"]`. Without it, opening the app
> via `127.0.0.1` instead of `localhost` gets the `/_next/hmr` request blocked,
> the client runtime never bootstraps, and the page renders correct server HTML
> that is completely dead — no effects, no click handlers, and it looks like a
> working page. Use `localhost`, or add your host to that list.

## Routes

| Route | Source frame | Rendering |
| --- | --- | --- |
| `/` | Home | Static |
| `/courses` | Search Page | Static |
| `/courses/[slug]` | Course Details | Dynamic |
| `/courses/[slug]/lessons` | Course Lessons | Dynamic |
| `/courses/[slug]/reviews` | Course Reviews | Dynamic |
| `/creator` | Creator Profile | Static |
| `/login`, `/register` | Login, Register | Static |
| anything unmatched | 404 Not Found | Static |

Only the three `/courses/[slug]` routes are server-rendered on demand; the rest
are prerendered at build time. All nine Figma frames have a route.

## Architecture

```
app/                    routes only, no layout logic
  globals.css           the whole design system: tokens, type scale, motion
components/
  ui/                   primitives, presentational and self-contained
  cards/                floating overlay cards, the ones that sit on imagery
  layout/               site chrome shared across routes
  home/                 home sections, with home/hero/ as its own module
  course/               the three course tabs, sharing one CourseLayout
  auth/                 the sign-in and register shell
lib/                    typed content and shapes
scripts/                the Figma pipeline
```

Two rules keep this from sprawling:

**One implementation per component, not per page.** The three course tabs share
`CourseLayout` and pass only their body. Sign-in and register share
`AuthShell`. The progress and social-proof cards were duplicated across three
files before being lifted into `components/cards/`.

**Generated code stays generated.** `components/ui/icons.tsx` and
`components/ui/CategoryIcons.tsx` carry a "do not edit" header and a
`scripts/gen_*.py` that produces them. Hand edits are lost on the next refresh.

### Design tokens

Everything lives in `app/globals.css` under `@theme`.

| Group | Values |
| --- | --- |
| Colour | brand `#003be2`, lime `#d4fb20`, ink `#242528`, body `#4f4f4f`, muted `#4b4c53` |
| Radius | 8, 12, 16, 24, 40, plus pill. Buttons and badges are pill |
| Elevation | An 8-step shadow ladder, all low-alpha black |
| Type | Figma sizes at 1440, clamped down on small screens |

The type scale is fluid rather than stepped. `clamp()` holds the 72px hero at
72px on desktop and lands on a readable 30px on a phone, instead of a
media-query ladder across nine breakpoints. Every display step tracks minus 1%
of its own size, so one `-0.01em` rule covers the entire scale.

## The Figma pipeline

This is what makes the replica verifiable rather than approximate. The scripts
under `scripts/` read the design file directly.

```bash
export FIGMA_TOKEN=figd_...

python scripts/figma_extract.py tokens      # colours, radii, shadows, type, by usage
python scripts/figma_extract.py styles      # the 71 published style names
python scripts/figma_extract.py tree 1:1067 --depth 4
python scripts/figma_extract.py images 1:1067
```

`tokens` is the one that matters: it aggregates every usage in the file and
prints the resolved values. That is where the palette and the 96-combination
type scale came from.

To refresh assets after a design change:

```bash
python scripts/figma_assets.py          # image fills into public/assets
python scripts/icon_frames.py           # recover each icon's designed frame
python scripts/gen_icons.py             # 27 page glyphs into components/ui/icons.tsx
python scripts/gen_category_icons.py    # 6 category glyphs into CategoryIcons.tsx
```

Four details in there are load-bearing, each one a bug that cost real time:

- **Image fills come from `/v1/files/:key/images`, not the render endpoints.**
  That returns the raw `imageRef` asset. Rendering the frame instead bakes
  Figma-only overlays — the pill row, the card chrome — into the photo.
- **Vector paths need `geometry=paths`.** The plain `/v1/files` response omits
  them entirely, so a file cached without that parameter contains no icon data
  and every path match against it silently finds nothing.
- **Category glyphs are component instances, not loose vectors**, so the generic
  sweep in `figma_assets.py` cannot see them. They get their own script and
  their own generated module.
- **Relative transforms are load-bearing.** Figma path data is relative to the
  node's own origin, so emitting paths without the node's `relativeTransform`
  paints every glyph at (0,0) of its frame instead of where it sits inside it.
  Both generators wrap geometry in a `matrix()` for this reason.

`icon_frames.py` exists because the SVG exports are cropped to the vector,
which discards the instance frame — and that frame is what makes a set of icons
read at a consistent weight. Without it each glyph inflates to fill its box, so
a 16×16 funnel renders 20px tall beside an 18×12 sort icon at 12px. The script
recovers each frame from the cached file, constrains candidates to icon-sized
near-square boxes, and asserts four known icons before emitting anything.

`gen_icons.py` emits 27 entries from 26 unique shapes. `chart-bar` and
`chart-bar-blue` are one path under two names, the neutral and blue variants of
the same bar chart. The generator also carries the curated renames — the file
called `dot-blank.svg` is in fact the shopping-bag glyph — and skips one stray
export with no call site, so re-running it reproduces the file rather than
breaking every route.

Figma's render endpoints are aggressively rate limited and a refresh can need
several minutes of backoff. The file and node endpoints are not, which is why
the pipeline leans on them.

## Motion

House rules, applied throughout `app/globals.css`:

- **Transform and opacity only**, so nothing leaves the compositor.
- **No scroll listeners anywhere.** Entrances are driven by
  IntersectionObserver, which fires once and disconnects. A scroll handler runs
  on every frame and collapses on mobile.
- **CSS transitions over keyframes** for anything the user can interrupt, so a
  retarget mid-flight does not restart.
- **UI feedback under 300ms**, entrances slower. Hover rules sit behind
  `(hover: hover)` so touch devices do not fire phantom lifts.
- **`prefers-reduced-motion` handled in the stylesheet alone.** There is no
  JavaScript branch anywhere.

`Reveal` and `Stagger` in `components/ui/Reveal.tsx` are the two entry points.
`Stagger` exists because a twelve-card grid should run one observer rather than
twelve: the container reveals, and each child picks up a delay from an inline
`--i`. Both toggle a class on the node through a ref rather than through
`useState`, so revealing a grid costs zero React re-renders.

Two things to know before changing either:

- **Both run at `threshold: 0` with a bottom root margin.** A ratio is the wrong
  knob for tall elements. The course body is over 1500px, so a `0.12` threshold
  needed ~180px of it on screen before firing, and scrolling to a course tab left
  the page blank.
- **Both carry a fail-safe.** An immediate rect test on mount plus a bounded
  timeout, so a callback that never arrives — through a deep link, a restored
  scroll position, or a container resized underneath — cannot strand content at
  `opacity: 0`.

## Browser support and accessibility

- Semantic landmarks throughout: `header`, `nav` with `aria-label`, `main`,
  `section`, `footer`. The filter and tab rows are real `ul`/`button`/`a`
  elements, not clickable `div`s.
- Tabs and pagination expose `aria-current`; icon-only controls carry
  `aria-label`; decorative glyphs are `aria-hidden` and out of the tab order.
- Focus rings come from one global `:focus-visible` rule in `globals.css`, with
  a lighter variant on the blue backgrounds, rather than per-component styles.
- The form labels are real `<label for>` pairs, and the search field has a
  visually hidden label rather than relying on the placeholder.
- `overflow-x: clip` on `html`/`body` contains the decorative layers without
  creating a scroll container that would break `position: sticky`.

## Known limitations

Stated plainly rather than left to be discovered:

- **No backend.** Content lives in `lib/data.ts`. Forms do not submit, the
  filter pills filter the in-memory list, and pagination is presentational.
- **No dark mode.** The Figma file is light-only and a dark variant would break
  fidelity with it. This is a deliberate deviation, not an oversight.
- **No tests.** The real regression risk here is layout drift against the Figma
  frame, which a component test would not catch. That needs a screenshot diff.
- **Ornaments are CSS-masked approximations.** Figma builds the lime and white
  3D shapes from paired image fills clipped by mask groups. Masking the exported
  grey render and colouring the mask target reproduces the same silhouette from
  a single asset per shape, but the rendered pixels differ. Positions, sizes and
  tints are exact; the shape geometry is the closest exported equivalent.
- **Copy is verbatim from the source,** including the em dashes in the
  testimonial strings. A house style guide would normally strip those.
- **Only the desktop frames exist.** The Figma file is 1440px wide throughout,
  so every responsive decision below `lg` — the stacked feature band, the
  creator header wrapping, the auth card stepping down to 20px — is derived
  from the desktop composition rather than reproduced from a mobile frame.