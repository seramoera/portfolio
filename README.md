# Jasmine — portfolio

A single-page React portfolio, built with Vite. Dark, typographic, one accent
colour, no UI library and no animation dependency.

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
3. In `src/components/Work.jsx`, replace the `<figure className="work__media">`
   contents with:

```jsx
<img src={project.image} alt={project.title} loading="lazy" />
```

and add `object-fit: cover;` for `.work__media img` in `src/styles/global.css`.

Use PNG or WebP at roughly 1600px wide and keep each file under ~300 KB.

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

- Keyboard: the carousel responds to left/right arrows when focused.
- `prefers-reduced-motion` disables the reveal, marquee, and scroll animations.
- Every interactive element has a visible focus ring.
- Add an accessibility statement page before you call it done, and keep the
  contrast of `--ink-2` on `--ground` above 4.5:1 if you change the palette.
