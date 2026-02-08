# Consultancy Website

Next.js (App Router) + TypeScript single-page consultancy site. All page content lives in `/content/home.json` and is validated with a Zod schema. The site is built for deployment on Vercel and can be edited via Netlify Visual Editor (Stackbit Git CMS) without touching code.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and run

```bash
pnpm build
pnpm start
```

## Netlify Visual Editor / Stackbit (Git CMS)

Content is stored in `/content/home.json`. Non-technical editors can change copy, sections, and form labels using the Netlify Visual Editor (Stackbit Git CMS) without running Node or editing code.

1. **Install and run the site**
   ```bash
   pnpm install
   pnpm dev
   ```

2. **Start Stackbit in another terminal**
   ```bash
   pnpm dlx stackbit dev
   ```
   Or, if the Stackbit CLI is installed and the `stackbit` script is used:
   ```bash
   pnpm run stackbit
   ```

3. **Build and run for production**
   ```bash
   pnpm build
   pnpm start
   ```

Edits made in the Netlify Visual Editor are committed back to your Git repo. If the site is hosted on Vercel, pushes to the repo trigger new builds so published content stays in sync.

**`util._extend` deprecation warning:** If you see `(node:…) [DEP0060] DeprecationWarning: The util._extend API is deprecated`, it comes from a dependency (e.g. RxJS or Stackbit tooling), not from this project. It is safe to ignore. The `pnpm run stackbit` script suppresses it. When using `pnpm dlx stackbit dev`, you can run `NODE_OPTIONS='--no-deprecation' pnpm dlx stackbit dev` to hide the warning.

Troubleshooting...