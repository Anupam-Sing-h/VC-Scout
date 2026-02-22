# Scout.ai — Precision Intelligence for the Modern Fund

A high-density discovery engine that turns your unique investment thesis into an always-on scouting workflow. Combines deep search with live AI enrichment powered by [Firecrawl](https://firecrawl.dev).

**Workflow:** `Discover Companies` → `Open Profile` → `Enrich` → `Take Action`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Live Enrichment | [Firecrawl](https://firecrawl.dev) API (server-side only) |
| Client State | `localStorage` (lists, saved searches, enrichment cache) |
| Deployment | Vercel |

---

## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vc-scout.git
cd vc-scout
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` (see [Environment Variables](#environment-variables) below).

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

> **Security note:** All API keys are read **server-side only** inside the `/api/enrich` route. They are never shipped to the browser.

| Variable | Required | Description | Where to get it |
|---|---|---|---|
| `FIRECRAWL_API_KEY` | ✅ Yes | API key for Firecrawl live enrichment | [firecrawl.dev](https://firecrawl.dev) — free tier used(Only 500 scraping) |

### `.env.local` example

```env
# Firecrawl — server-side AI scraping for live enrichment
FIRECRAWL_API_KEY=fc-your-api-key-here
```

---

## Production Build

### Build for production

```bash
npm run build
```

This compiles and optimises the Next.js app. All pages are statically analysed and any TypeScript errors will fail the build (by design).

### Preview the production build locally

```bash
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000) — this is the exact binary that will run on Vercel/Netlify.

### Lint

```bash
npm run lint
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. In **Project Settings → Environment Variables**, add:
   - `FIRECRAWL_API_KEY` = your key
4. Deploy — Vercel auto-runs `npm run build`

---

## Project Structure

```
vc-scout/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── enrich/          # Server-side enrichment endpoint
│   │   ├── companies/           # Discovery Engine (Faceted search)
│   │   │   └── [id]/            # Dynamic company profile route
│   │   ├── lists/               # Intelligence Lists management
│   │   ├── saved/               # Saved Intelligence queries
│   │   ├── settings/            # Thesis Workspace (Config)
│   │   ├── globals.css
│   │   └── layout.tsx           # Global Shell (Conditional AppShell)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Global search + keyboard shortcuts
│   │   │   └── Sidebar.tsx      # Fixed navigation drawer
│   │   ├── companies/           # Table, filters, profile, enrichment
│   │   └── ui/                  # Shared UI primitives (Radix/Shadcn)
│   ├── hooks/                   # Custom React hooks (Enrichment, Lists)
│   ├── lib/                     # Utilities, mock data helpers
│   └── types/                   # Shared TypeScript types
├── data/                        # Mock companies seed data (JSON)
├── .env.local.example           # Environment variable template
└── next.config.js
```

---

## Key Features

- **Global Search** — search by company name, industry, or signals with instant results
- **⌡ Keyboard Shortcut** — press `/` or `⌘K` to focus the search bar from anywhere
- **Faceted Filters** — filter by industry, stage, location, and more
- **Sortable & Paginated Table** — browse the full company directory efficiently
- **Company Profile** — overview, signals timeline, and analyst notes (persisted in `localStorage`)
- **Live Enrichment** — click **Enrich** to fetch real public website data via Firecrawl; results cached client-side to prevent redundant API calls
- **Lists** — create named lists, add/remove companies, export as CSV or JSON
- **Saved Intelligence** — save and re-run any filter + search combination
- **Thesis Workspace (Mock)** — configure investment stages, geographies, and tech pillars to guide AI scoring logic

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus global search bar |
| `⌘K` / `Ctrl+K` | Focus global search bar |
| `Esc` | Clear search focus |

---

## License

MIT
