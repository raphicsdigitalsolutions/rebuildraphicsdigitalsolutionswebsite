# Raphics Digital Solutions

React, TypeScript, Vite, and Three.js website for Raphics Digital Solutions.

## Develop

Install the repository dependencies and start the local development server:

```sh
bun install --frozen-lockfile
bun run dev
```

The hosted GitHub Pages contact form prepares an email draft in the visitor's email application. It does not send or store the message. The local development server also exposes the existing `/api/contact` endpoint.

## Validate and build

```sh
bun run test
bun run lint
SITE_URL=https://raphicsdigitalsolutions.github.io/rebuildraphicsdigitalsolutionswebsite GITHUB_PAGES=true VITE_GITHUB_PAGES=true bun run build
```

The Pages build writes canonical metadata, `robots.txt`, a sitemap, and the SPA-compatible `404.html` into `dist/`.

## Main routes

- `/` — Home
- `/services` and `/services/creative-studio`, `/services/digital-development`, `/services/ai-automation`
- `/work` and `/work/:slug`
- `/about`, `/process`, `/faq`, `/contact`
- `/privacy`, `/terms`

GitHub Pages serves the site below `/rebuildraphicsdigitalsolutionswebsite/`. The `main` branch workflow deploys that production site; pull requests run tests, type-checking, and a Pages build before merge.
