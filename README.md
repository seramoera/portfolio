# Jasmine F. Magtanong — portfolio

A single-page portfolio for a 2026 Computer Science OJT. It is built
with React, Vite, and plain CSS: no UI library and no animation dependency.

The design is a cream-paper editorial layout with a retro terminal underneath:
a Commodore-style cold boot, a CRT project set, ASCII noise bands, dotted rails,
phosphor-green hardware details, and orange signal accents. Every section has
its own layout, and expanded case studies open as paper tickets. A dark edition
keeps the same typography and structure on a near-black field; the boot screen,
CRT set, BBS contact panel, and footer stay dark in both editions.

## Live site

<https://seramoera.github.io/portfolio/>

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
| `src/data/projects.js` | The three work channels, the CRT art, the case-study copy, `site` (email and social links). |
| `src/data/credentials.js` | Skill cartridges, the “currently learning” card, and certifications. |
| `src/data/notes.js` | The field notes and their expanded tickets. |
| `src/data/resume.js` | Education, experience, availability, the résumé sheet copy, and the PDF download path. |
| `src/audio/sfx.js` | Synthesized interface sounds and the persisted mute preference. |
| `src/theme/theme.js` | Light/dark preference, persistence, system-preference fallback, and change events. |

The visual layer is split in two:

- `src/styles/global.css` — layout and base tokens.
- `src/styles/edition.css` — the active cream/terminal edition. It is imported
  after `global.css` and overrides the palette, typography, and section styling.
  Change tokens at the top of this file first.

Fonts are Instrument Sans, JetBrains Mono, and VT323. The default light palette
is cream `#f2eee4`, ink `#16181d`, signal orange `#e4552b`, phosphor acid
`#c7f464`, and C64 blue `#3d3acb` for the boot screen. The dark palette overrides
the same tokens under `html[data-theme='dark']` near the top of `edition.css`.

## Light, dark, and sound

The theme follows the operating system until someone chooses. The Sun/Moon
switch in the nav pins light or dark, and the full-screen channel menu repeats
the choice as an explicit Light / Dark pair under **Appearance**. The choice is
stored in `localStorage` under `jfm-theme-2026`, so it survives reloads; until
then, a system change is picked up live. `index.html` applies the stored (or
system) theme inline before the first paint, which avoids a flash of the wrong
edition. `src/theme/theme.js` owns the state and emits `jfm:theme` so every
toggle stays in sync.

`BootSequence.jsx` opens on a power-on gate because browsers block audio until a
gesture. Pressing a key or clicking runs a three-second cold boot with its own
synthesized soundtrack, stores `jfm-boot-2026` in `sessionStorage`, and skips
itself when the visitor prefers reduced motion. It can be skipped with any key
or pointer, or bypassed entirely with `?noboot`. The page is marked `inert`
while the boot plays.

`src/audio/sfx.js` synthesizes every cue with the Web Audio API: no audio files
and no library. The boot, shutdown, CRT power-on, channel change, menu, ticket,
copy, and toggle sounds all come from oscillators and a short noise buffer.
Sound is on by default, persists in `localStorage` under `jfm-sfx-2026`, and can
be muted from the boot gate or the SFX switch in the nav. The boot gate and nav
share one preference.

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
- `audio/sfx.js` — oscillator and noise cues built at runtime. No audio files
  are downloaded, and nothing plays until the visitor powers the machine on.

All of it is cancelled by `prefers-reduced-motion: reduce`. The boot, reveals,
ticker, and ASCII still frame are all covered. Touch devices get the content
without the pointer effects.

## Deploy

The build is fully static and the Vite base is relative (`base: './'`), so the
same `dist/` works on Cloudflare Pages, Vercel, GitHub Pages, or a custom domain.

- **Cloudflare Pages** — connect the repo, build `npm run build`, output `dist`.
  `public/_redirects` is already included for single-page routing.
- **Vercel** — import the repo, use the Vite preset, output `dist`.
- **GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes `dist/`
  on every push to `main`, using the Pages artifact workflow. The repo must be
  public and Pages set to source **GitHub Actions**.

## Accessibility notes

- Skip link, real buttons, an accessible menu dialog, and a focus trap.
- Native `<details>` elements power the case-study and note expansions, so they
  work without JavaScript and are keyboard-operable.
- `prefers-reduced-motion` removes the boot, reveals, ticker movement, cursor
  effects, and ASCII drift; the hero draws one still frame instead.
- Sound never autoplays: the boot gate is the first gesture, and the SFX switch
  is a real `aria-pressed` button whose preference persists.
- The theme switch is also a real `aria-pressed` button with a name that states
  the current mode; the menu pair uses `aria-pressed` inside a labelled group.
- Visible focus rings use the orange signal colour. Small orange text uses the
  darker `--accent-ink` so it keeps contrast on cream paper, and its dark-mode
  value is lightened for the dark field.
- The custom cursor is decorative; the native cursor remains available.
