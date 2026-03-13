# NEXTDOOR Interieur Ontwerp — Website

The official website for **NEXTDOOR Interieur Ontwerp**, an all-round interior design studio based in the Netherlands. Built with Nuxt 4 as a fully static site, content-managed through Markdown, and deployed automatically to GitHub Pages.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Content Editing](#content-editing)
- [Components](#components)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [SEO](#seo)
- [PWA — Add to Home Screen](#pwa--add-to-home-screen)
- [Deployment](#deployment)
- [Nuxt Studio — Live Content Editing](#nuxt-studio--live-content-editing)
- [Scripts Reference](#scripts-reference)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) (SSG / static generation) |
| Content | [@nuxt/content v3](https://content.nuxt.com) — Markdown-driven pages |
| Styling | Plain CSS with CSS custom properties (`app/assets/css/main.css`) |
| Fonts | Google Fonts (Dancing Script, Montserrat) + local Aesthetikos (`public/fonts/`) |
| SEO | [@nuxtjs/seo](https://nuxtseo.com) — sitemap, robots, OG images |
| i18n | [@nuxtjs/i18n](https://i18n.nuxtjs.org) — Dutch (default) + English |
| PWA | [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/frameworks/nuxt) — installable on iOS & Android |
| Icons | [sharp](https://sharp.pixelplumbing.com) — PNG icon generation from SVG |
| Deployment | GitHub Actions → GitHub Pages |
| Node | 24 (matches CI) |

---

## Project Structure

```
website/
├── app/
│   ├── app.vue                  # Root app component
│   ├── assets/
│   │   └── css/main.css         # Global styles, CSS variables, fonts
│   ├── components/
│   │   ├── AppHeader.vue        # Site-wide navigation header
│   │   ├── AppFooter.vue        # Site-wide footer
│   │   ├── Alert.vue            # Generic alert/notification component
│   │   ├── Counter.vue          # Animated number counter
│   │   ├── OgImage/
│   │   │   └── Default.vue      # Default Open Graph image template
│   │   └── content/             # MDC components used inside Markdown pages
│   │       ├── AllesOpEenAdres.vue
│   │       ├── ContactInfo.vue
│   │       ├── ContactSection.vue
│   │       ├── ContentSection.vue
│   │       ├── CursiveTagline.vue
│   │       ├── HeroSection.vue
│   │       ├── ImpressieGallery.vue
│   │       ├── InfoItem.vue
│   │       ├── IntroSection.vue
│   │       ├── NextdoorVertegenwoordiging.vue
│   │       ├── OnsWerk.vue
│   │       ├── OnzeWerkwijze.vue
│   │       ├── PageHeader.vue
│   │       └── ProjectGrid.vue
│   ├── data/
│   │   └── projects.ts          # Static project portfolio data
│   ├── layouts/
│   │   └── default.vue          # Default layout (header + main + footer)
│   └── pages/
│       └── [...slug].vue        # Catch-all page — renders any content/* route
├── content/                     # Markdown page content (one file = one route)
│   ├── index.md                 # Home page (/)
│   ├── about.md                 # About page (/about)
│   ├── particulier.md           # Residential services (/particulier)
│   ├── zakelijk.md              # Commercial services (/zakelijk)
│   ├── impressie.md             # Impression gallery (/impressie)
│   ├── contact.md               # Contact page (/contact)
│   ├── privacyverklaring.md     # Privacy statement (/privacyverklaring)
│   └── algemene-voorwaarden.md  # General terms (/algemene-voorwaarden)
├── i18n/
│   └── locales/
│       ├── nl.json              # Dutch translations (default)
│       └── en.json              # English translations
├── public/
│   ├── favicon.ico
│   ├── fonts/
│   │   └── Aesthetikos.ttf      # Local display font
│   ├── images/
│   │   ├── logo.svg             # Master logo (source for PWA icons)
│   │   ├── apple-touch-icon.png # iOS home screen icon (180×180)
│   │   ├── pwa-192x192.png      # Android PWA icon
│   │   ├── pwa-512x512.png      # Android PWA splash / maskable icon
│   │   ├── home/                # Images used on the home page
│   │   ├── impressie/           # Gallery images
│   │   └── projects/            # Project portfolio images
│   ├── llms.txt                 # LLM-friendly site summary
│   └── llms-full.txt            # Extended LLM-friendly content
├── generate-icons.mjs           # PWA icon generation script (uses sharp)
├── content.config.ts            # @nuxt/content collection config
├── nuxt.config.ts               # Main Nuxt configuration
├── package.json
└── tsconfig.json
```

---

## Getting Started

**Prerequisites:** Node.js 24 (or the version in `.nvmrc` / CI).

```bash
# Install dependencies
npm install

# Start the development server at http://localhost:3000
npm run dev
```

---

## Development

```bash
npm run dev        # Hot-reload dev server
npm run build      # Build for SSR (Node server)
npm run generate   # Build fully static output → .output/public/
npm run preview    # Preview the last static build locally
```

The static output lives in `.output/public/` and is what gets deployed to GitHub Pages.

---

## Content Editing

Pages are written in **Markdown with Components (MDC)** inside the `content/` directory. Each file maps directly to a URL:

| File | URL |
|---|---|
| `content/index.md` | `/` |
| `content/about.md` | `/about` |
| `content/particulier.md` | `/particulier` |
| `content/zakelijk.md` | `/zakelijk` |
| `content/impressie.md` | `/impressie` |
| `content/contact.md` | `/contact` |

### Page frontmatter

Every page supports these frontmatter fields:

```yaml
---
title: 'Page Title'           # Used for <title> and OG title
description: 'Short summary'  # Used for meta description and OG description
robots: 'index, follow'       # Optional; defaults to index, follow
ogImage:                      # Optional; custom OG image config
  component: 'Default'
  props:
    title: 'Custom OG Title'
---
```

### Using components in Markdown

Any Vue component in `app/components/content/` can be used directly in Markdown using MDC syntax:

```md
::HeroSection
---
title: Welcome
image: /images/home/hero-main.jpg
---
::

::ProjectGrid
---
category: zakelijk
---
::
```

### Project portfolio data

The project portfolio is maintained in `app/data/projects.ts` as a typed TypeScript array. Each entry has:

```typescript
{
  id: number
  slug: string
  title: string
  category: 'zakelijk' | 'particulier'
  image: string          // path relative to /public
  description: string
  location: string
  services: string
  tags: string[]
}
```

Add or update projects directly in this file. The `ProjectGrid` component reads from this data and filters by `category`.

---

## Components

### Layout components

| Component | Purpose |
|---|---|
| `AppHeader.vue` | Top navigation bar with logo and menu links |
| `AppFooter.vue` | Footer with contact details and links |
| `default.vue` (layout) | Wraps every page: header + `<main>` slot + footer |

### Content components (MDC)

These are used inside Markdown pages via MDC syntax:

| Component | Purpose |
|---|---|
| `HeroSection` | Full-width hero with background image and headline |
| `IntroSection` | Introductory text block with optional image |
| `ContentSection` | Generic two-column or full-width content block |
| `PageHeader` | Page title banner |
| `CursiveTagline` | Styled cursive quote or tagline |
| `OnsWerk` | "Our work" section linking to portfolio |
| `ProjectGrid` | Filterable project grid (reads from `projects.ts`) |
| `OnzeWerkwijze` | Step-by-step working method section |
| `AllesOpEenAdres` | "All under one roof" services overview |
| `NextdoorVertegenwoordiging` | Studio representation / profile block |
| `ImpressieGallery` | Masonry/grid photo gallery for impression images |
| `InfoItem` | Icon + text info item (used in lists) |
| `ContactInfo` | Address, phone, email display block |
| `ContactSection` | Full contact section with form or details |

### Utility components

| Component | Purpose |
|---|---|
| `Alert.vue` | Dismissible alert/notification banner |
| `Counter.vue` | Animated count-up number display |
| `OgImage/Default.vue` | Server-rendered Open Graph image template |

---

## Internationalisation (i18n)

The site supports **Dutch** (default) and **English** via `@nuxtjs/i18n`.

Translation strings live in:
- `i18n/locales/nl.json` — Dutch (primary language)
- `i18n/locales/en.json` — English

To add or update a translation, edit the relevant JSON file. Keys are used in templates with `$t('key')` or the `useI18n()` composable.

The default locale is `nl`. The i18n configuration is in `nuxt.config.ts` under the `i18n` key.

---

## SEO

SEO is handled by `@nuxtjs/seo`, which provides:

- **Sitemap** — auto-generated at `/sitemap.xml`
- **Robots.txt** — auto-generated at `/robots.txt`
- **Open Graph images** — server-rendered via `OgImage/Default.vue`; customisable per page via frontmatter
- **Meta tags** — set per page in `[...slug].vue` using `useSeoMeta()`

The canonical site URL and other SEO defaults are configured in `nuxt.config.ts` under `site`.

### LLM-friendly content

`public/llms.txt` and `public/llms-full.txt` provide structured plain-text summaries of the site for AI crawlers, following the [llms.txt convention](https://llmstxt.org).

---

## PWA — Add to Home Screen

The site is a Progressive Web App, installable on both **iOS** (Safari "Add to Home Screen") and **Android** (Chrome install prompt).

### How it works

- **Android / Chrome**: The web app manifest (`/manifest.webmanifest`) is served automatically by `@vite-pwa/nuxt`. Chrome shows an install banner when the PWA criteria are met.
- **iOS / Safari**: The `apple-touch-icon` link tag in `<head>` points to `apple-touch-icon.png`. Users can tap *Share → Add to Home Screen* in Safari.
- A **Workbox service worker** (`sw.js`) is generated at build time and precaches all static assets for offline resilience.

### PWA configuration

The manifest and service worker are configured in `nuxt.config.ts` under the `pwa` key:

```typescript
pwa: {
  registerType: 'autoUpdate',
  manifest: {
    name: 'NEXTDOOR Interieur Ontwerp',
    short_name: 'NEXTDOOR',
    theme_color: '#cfe0ed',
    background_color: '#cfe0ed',
    display: 'standalone',
    // ...
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,png,svg,ico,woff,woff2}'],
  },
}
```

### PWA icons

The PWA icons are generated from `public/images/logo.svg` using [sharp](https://sharp.pixelplumbing.com/). Three icons are produced:

| File | Size | Used for |
|---|---|---|
| `public/images/pwa-512x512.png` | 512×512 | Android manifest (standard + maskable) |
| `public/images/pwa-192x192.png` | 192×192 | Android manifest |
| `public/images/apple-touch-icon.png` | 180×180 | iOS Safari "Add to Home Screen" |

To regenerate the icons (e.g. after updating the logo or brand color):

```bash
npm run generate-icons
```

The script is `generate-icons.mjs` in the project root. The background color (`#cfe0ed`, matching `--color-primary` in `main.css`) and the logo aspect ratio are hardcoded in the script — update them there if needed.

---

## Deployment

The site is deployed automatically to **GitHub Pages** on every push to `main`.

### CI/CD pipeline (`.github/workflows/deploy.yml`)

1. Checkout the repository
2. Install Node.js 24 with npm cache
3. `npm install`
4. `npm run generate` — produces the static site in `.output/public/`
5. Upload `.output/public/` as a Pages artifact
6. Deploy to GitHub Pages

Manual deploys can be triggered via **Actions → Deploy to GitHub Pages → Run workflow** in the GitHub UI.

### Static output

`nuxt generate` prerenders all routes defined by content files and outputs them to `.output/public/`. The `autoSubfolderIndex` option is enabled so each route gets its own `index.html` subfolder for clean URLs.

---

## Nuxt Studio — Live Content Editing

[Nuxt Studio](https://nuxt.studio) is a hosted CMS that connects directly to this GitHub repository. It provides a visual editor for all Markdown content files, with changes committed back to `main` and automatically deployed via the CI/CD pipeline.

### How to access

1. Go to **[nuxt.studio](https://nuxt.studio)**
2. Click **Sign in with GitHub** and authorise the app
3. Open the **`d2af5/website`** project (or import it if it's your first visit)
4. Edit pages, components, and frontmatter visually — Studio commits changes directly to `main`
5. The GitHub Actions workflow picks up the commit and redeploys the site automatically

### What you can edit

| Area | Location |
|---|---|
| Page content & frontmatter | `content/*.md` |
| Homepage sections | `content/index.md` |
| Contact page | `content/contact.md` |
| Privacy statement | `content/privacyverklaring.md` |
| Impressie gallery | `content/impressie.md` |
| Project portfolio | `app/data/projects.ts` |

### Configuration

The Studio integration is configured in `nuxt.config.ts`:

```typescript
studio: {
    repository: {
        provider: 'github',
        owner: 'd2af5',
        repo: 'website',
        branch: 'main',
    }
}
```

The `nuxt-studio` module is listed in `modules` and active in all environments. No additional tokens or secrets are required for public repositories — GitHub OAuth is handled entirely by the Studio platform.

---

## Scripts Reference

| Script | Command | Description |
|---|---|---|
| `dev` | `nuxt dev` | Start hot-reload development server |
| `build` | `nuxt build` | Build for SSR (Node.js server) |
| `generate` | `nuxt generate` | Generate fully static site to `.output/public/` |
| `preview` | `nuxt preview` | Preview the last static build locally |
| `generate-icons` | `node generate-icons.mjs` | Regenerate PWA icons from `logo.svg` |
