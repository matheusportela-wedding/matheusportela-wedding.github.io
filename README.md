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
  App.jsx         Tab routing + theme/language state, page assembly
  content.js      ALL guest-facing text, EN + PT  ← edit this for copy changes
  themes.js       The three colour/typography themes (11 / 12 / 13)
  kit.jsx         Palette, botanical SVG motifs, photo placeholder, icons, flags
  primitives.jsx  Theme-aware layout primitives (Wrap, Card, Section, …)
  sections.jsx    The page sections (Hero, Event, Travel, RSVP, …)
  styles.css      Global resets
docs/             Built output, committed and served by GitHub Pages
```

The floating theme switcher (bottom-right) lets you preview the three themes;
the choice persists in `localStorage`. To lock a single theme, set the initial
`tkey` in `src/App.jsx` and remove the `<Switcher/>`.
