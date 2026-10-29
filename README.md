# Jasmine F. Magtanong — portfolio

A single-page portfolio for a 2026 Computer Science OJT. It is built
with React, Vite, and plain CSS: no UI library and no animation dependency.

The design is a cream-paper editorial layout with a retro terminal underneath:
a Commodore-style cold boot, a CRT project set, ASCII noise bands, dotted rails,
phosphor-green hardware details, and orange signal accents. Every section has
its own layout, and expanded case studies open as paper tickets.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints, usually <http://localhost:5173>. Add `?noboot` to skip
the opening sequence (useful for screenshots and print checks).

```bash
npm run build     # static output in dist/
npm run preview   # serve the production build locally
```

## Where the content lives

| File | What it controls |
|---|---|
| `src/data/projects.js` | The four work channels, the CRT art, the case-study copy, `site` (email and social links). |
| `src/data/credentials.js` | Skill cartridges, the “currently learning” card, and certifications. |
| `src/data/notes.js` | The field notes and their expanded tickets. |
| `src/data/resume.js` | Education, experience, availability, the résumé sheet copy, and the PDF download path. |

The visual layer is split in two:

- `src/styles/global.css` — layout and base tokens.
- `src/styles/edition.css` — the active cream/terminal edition. It is imported
  after `global.css` and overrides the palette, typography, and section styling.
  Change tokens at the top of this file first.

Fonts are Instrument Sans, JetBrains Mono, and VT323. The main palette is cream
`#f2eee4`, ink `#16181d`, signal orange `#e4552b`, phosphor acid `#c7f464`, and
C64 blue `#3d3acb` for the boot screen.

## Placeholders before publishing

These are intentionally visible and safe to leave until the real material is
ready:

1. **Project links** — a link with `href: '#'` renders as a non-clickable
   `· soon` label in `Work.jsx` instead of a dead link. Add real live/repo URLs
   in `src/data/projects.js`.
2. **Social links** — GitHub and LinkedIn with `href: '#'` render as “soon” in
   the contact terminal. Fill in the real URLs in `site.links`.
3. **Certifications** — the titles and issuers in `credentials.js` are the
   current list. Add years and credential URLs, and remove anything unfinished.
4. **Résumé PDF** — `public/Jasmine-Magtanong-Resume.pdf` is a clean one-page
   draft. Replace it with the final PDF when the copy is confirmed. The
   download path is `resume.href` in `src/data/resume.js`.
5. **Project screenshots** — the CRT currently uses drawn art from
   `ProjectArt.jsx`. To use real screenshots, add `image: './shots/name.png'` to
   a project and render an `<img>` inside `CrtTv.jsx`; keep images around
   1600px wide and under ~300 KB.

## Opening sequence and navigation

`BootSequence.jsx` shows a three-second cold boot once per browser session,
stores `jfm-boot-2026` in `sessionStorage`, and skips itself when the visitor
prefers reduced motion. It can be skipped with any key or pointer, or bypassed
entirely with `?noboot`. The page is marked `inert` while the boot plays.

`Menu.jsx` is the full-screen channel menu below 980px. It traps Tab, closes on
Escape or a link, restores focus to the Menu button, and locks body scroll.

`Reveal.jsx` uses `IntersectionObserver`. The `clip` variant starts fully
clipped, so it uses a zero threshold; the other variants wait until 8% of the
element is visible.

## Motion and performance

Most of the motion is CSS: scanlines, CRT glare, the ticker, hover states, and
section reveals. The heavier pieces are small and isolated:

- `AsciiField.jsx` — canvas ASCII interference in the hero, paused off-screen.
- `CrtTv.jsx` — CRT channel switching, static bursts, and the dial.
- `Marquee.jsx` — the scrolling station ident, with a scroll-velocity skew.
- `Cursor.jsx` / `Magnetic.jsx` / `Tilt.jsx` — pointer-only polish.
- `DecodeText.jsx` — the short label scramble used in section heads.

All of it is cancelled by `prefers-reduced-motion: reduce`. The boot, reveals,
ticker, and ASCII still frame are all covered. Touch devices get the content
without the pointer effects.

## Deploy

The build is fully static and the Vite base is relative (`base: './'`), so the
same `dist/` works on Cloudflare Pages, Vercel, GitHub Pages, or a custom domain.

- **Cloudflare Pages** — connect the repo, build `npm run build`, output `dist`.
  `public/_redirects` is already included for single-page routing.
- **Vercel** — import the repo, use the Vite preset, output `dist`.
- **GitHub Pages** — build, then publish `dist/` to `gh-pages`.

## Accessibility notes

- Skip link, real buttons, an accessible menu dialog, and a focus trap.
- Native `<details>` elements power the case-study and note expansions, so they
  work without JavaScript and are keyboard-operable.
- `prefers-reduced-motion` removes the boot, reveals, ticker movement, cursor
  effects, and ASCII drift; the hero draws one still frame instead.
- Visible focus rings use the orange signal colour. Small orange text uses the
  darker `--accent-ink` so it keeps contrast on cream paper.
- The custom cursor is decorative; the native cursor remains available.
