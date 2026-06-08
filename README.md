# Anna &amp; Matheus — wedding website

A small React site built with [Vite](https://vitejs.dev/). The build produces a
single self-contained `docs/index.html` (all JS and CSS inlined) that GitHub
Pages serves directly — no build action runs on GitHub.

## Develop

```bash
npm install
npm run dev      # local dev server with hot reload
```

## Build &amp; deploy

```bash
npm run build    # writes the self-contained site into docs/
git add docs && git commit -m "build" && git push
```

GitHub Pages is configured to serve the **`docs/` folder** of the deployed
branch. `public/CNAME` (the custom domain) is copied into `docs/` on every
build, so the only step to publish is committing `docs/` and pushing.

> One-time GitHub setup: Settings → Pages → "Deploy from a branch" → select the
> branch and the `/docs` folder.

## Where things live

```
index.html        Vite entry template (dev only; loads src/main.jsx)
public/CNAME      Custom domain, copied verbatim into docs/
src/
  main.jsx        App bootstrap (ReactDOM render)
  App.jsx         Tab routing + language state, page assembly
  content.js      ALL guest-facing text, EN + PT  ← edit this for copy changes
  styles.css      ALL styling: design tokens, classes, responsiveness
  kit.jsx         Ribbon motif, photo placeholder, line icons, flag SVGs
  primitives.jsx  Reusable bits (SectionHead, IconBadge)
  sections.jsx    The page sections (Hero, Event, Travel, RSVP, …) — markup only
docs/             Built output, committed and served by GitHub Pages
```

Styling lives entirely in `src/styles.css`. The colours and fonts are CSS custom
properties at the top (`:root`) — change one there ("Cerrado em Cores") and the
whole site updates. Components carry semantic class names (`.card`, `.hero`,
`.section-head`, …); tweak a class to restyle every place it's used.
