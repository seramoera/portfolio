# Jasmine — portfolio

A single-page React portfolio, built with Vite. Warm paper, navy ink, and a
blue / orange / peach accent set. No UI library, no animation dependency.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build it

```bash
npm run build     # outputs to dist/
npm run preview   # serve dist/ locally to check the production build
```

## Edit the content

Everything lives in one file: `src/data/projects.js`.

- `projects` — the four project cards. Title, category, year, two paragraphs,
  stack chips, and links.
- `site` — your name, email, and social links.

Placeholders to replace before publishing, all marked `TODO` in that file:

1. `href: '#'` on every project link — point them at live demos and repos.
2. The `stack` arrays — they are guesses, not facts.
3. `site.links` — add your GitHub and LinkedIn URLs.
4. The `art` values — once you have screenshots, see below.

## Swap the placeholder art for real screenshots

1. Put images in `public/shots/` (e.g. `public/shots/vivy.png`).
2. In `src/data/projects.js`, add `image: './shots/vivy.png'` to the project.
3. In `src/components/CrtTv.jsx`, replace `<ProjectArt kind={project.art} />`
   with:

```jsx
<img src={project.image} alt="" />
```

and add this to `src/styles/global.css`:

```css
.tv__art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}
```

Use PNG or WebP at roughly 1600px wide and keep each file under ~300 KB. The
screen is 4:3, so anything close to that ratio will sit behind the on-screen
graphics best.

## The CRT set

The project navigator is a television (`src/components/CrtTv.jsx`). Each project
is a channel:

- The tube warms up the first time the set scrolls into view (`IntersectionObserver`).
- Changing channel fires a burst of static, the screen flickers in, and the dial
  rotates to the new position.
- Channels can be changed with the numbered buttons, the arrow buttons, the
  guide list below the set, or `←` / `→` while the section is focused.
- Everything is CSS: scanlines, glare, screen curvature, the noise texture
  (an inline SVG turbulence filter), and the blinking `REC` dot. No images, no
  libraries.
- `prefers-reduced-motion` cancels the warm-up, the static burst, and the dial
  spin; the content simply swaps.

To change the channel labels, edit `num` in `src/data/projects.js`. The set shows
four channels by default and the layout assumes a single digit.

## Motion and interactivity

Small pieces, all dependency-free, all switched off automatically when the
visitor has `prefers-reduced-motion` set or is on a touch device:

| Piece | File | What it does |
|---|---|---|
| ASCII field | `src/components/AsciiField.jsx` | Canvas of monospace characters driven by a slow interference pattern. Navy at the low end, blue mid, orange at the crests. Move the pointer over it to send a ripple through the field. ~25fps, paused off screen. |
| Shader backdrop | `src/components/ShaderBackdrop.jsx` | Full-screen WebGL fragment shader: a slow peach/blue wash that leans toward the pointer. Falls back to the CSS gradients if WebGL is unavailable. |
| Rotating badge | `src/components/RoundBadge.jsx` | SVG text on a circular path, spinning slowly. Speeds up on hover. |
| Tilt | `src/components/Tilt.jsx` | Rotates the television a few degrees toward the cursor and feeds `--mx` / `--my` to the sheen. |
| Cursor + magnetic | `src/components/Cursor.jsx`, `Magnetic.jsx` | A trailing ring that swells over links and the ASCII canvas, and buttons that lean toward the pointer. |
| CRT set | `src/components/CrtTv.jsx` | Channel-based project navigation: power-on, static between channels, a turning dial, and an on-screen display. |
| Copy email | `src/components/Contact.jsx` | The "Copy address" button writes the email to the clipboard and confirms in place, falling back to `mailto:` when the clipboard is blocked. |

Small retro details: the blinking cursor after the hero label, the `REC`
indicator, the power LED, the scanlines and roll bar on the screen, the
four-colour footer rule, and the `CH 01 / 04` counter in the section head.

Tuning knobs:

- ASCII density: `raw - 0.26` in `AsciiField.jsx` sets how much empty paper sits
  under the field. Raise it for more negative space, lower it for a solid field.
- ASCII colour: the `COLORS` array in the same file; index 0–9 matches the
  `' .:-=+*#%@'` ramp.
- ASCII speed: the `0.55` multiplier on `t` in `draw()`.
- Shader warmth: the `warm * 0.4`, `cool * 0.13`, and `pow(...) * 0.06` mixes in
  `ShaderBackdrop.jsx`. Raise the numbers for more colour.
- Shader resolution: `Math.min(window.devicePixelRatio || 1, ...)` — capped at
  1 on phones and 1.5 on desktop. Lower it if you need more headroom.
- Tilt strength: `max` prop on `<Tilt>` in `Work.jsx`, currently `4`.
- Static loudness: the `opacity` values in `@keyframes tv-static`.
- Dial angle per channel: `rotate(${active * 62}deg)` in `CrtTv.jsx`.

If the motion ever feels like too much, delete `<ShaderBackdrop />` and
`<Cursor />` from `App.jsx`, and remove `<AsciiField />` from `Hero.jsx`. The
site is designed to look finished without any of it.

## Colour and type

All tokens live at the top of `src/styles/global.css`:

| Token | Value | Used for |
|---|---|---|
| `--ground` / `--paper` | `#f4ead7` | Page paper |
| `--panel` | `#fbf4e6` | ASCII panel, cards |
| `--ink` | `#13204d` | Body copy, headline |
| `--ink-2` | `#46527c` | Secondary copy |
| `--ink-3` | `#635e4c` | Small mono labels |
| `--blue` | `#2f56c9` | Second headline line, links, cool accents |
| `--accent` | `#e2572c` | Fills, rules, the CRT channel button |
| `--accent-ink` | `#b8431d` | Orange **text** — darker so small labels keep 4.5:1 |
| `--peach` / `--peach-soft` | `#ffd2b0` / `#ffe6d1` | Highlights, panel wash, footer rule |
| `--screen` / `--screen-ink` | `#0b1230` / `#f2e7d2` | CRT tube and its artwork |

Type is Instrument Sans for text and JetBrains Mono for labels and ASCII. The
CRT is deliberately the one dark object on the page; it keeps its own
`--screen-*` ink so the line art stays legible on the tube.

## Deploy

### Cloudflare Pages (recommended)

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build command `npm run build`, output directory `dist`.
4. Deploy. `_redirects` is already in `public/`.

### Vercel

Import the repo, framework preset Vite, build `npm run build`, output `dist`.

### GitHub Pages

`base: './'` in `vite.config.js` already handles project pages. Build, then
publish `dist/` to a `gh-pages` branch.

## Accessibility notes

- Keyboard: the carousel responds to left/right arrows when focused, and every
  channel button is a real button with an accessible name.
- `prefers-reduced-motion` disables the reveal, marquee, ASCII drift, badge spin,
  and scroll animations. The ASCII field draws one still frame instead.
- Every interactive element has a visible focus ring.
- Small orange text uses `--accent-ink` (`#b8431d`) rather than the brighter
  `--accent`, which is reserved for fills, rules, and large type, so labels keep
  a 4.5:1 contrast ratio on paper.
- Add an accessibility statement page before you call it done, and keep the
  contrast of `--ink-2` on `--ground` above 4.5:1 if you change the palette.
