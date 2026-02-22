# Product Definition Record (PDR) — VC Scout

## 1. Project Vision & Identity

**Core Objective:** Build a sourcing system that reliably turns a VC fund's unique thesis into an always-on discovery workflow.

**Problem Statement:** 
Today, investment teams lose significant time to duplicates, inconsistent tagging, and shallow company profiles. There is a frequent inability to translate high-level investment theses into durable, repeatable scouting filters.

**Solution:** 
A "precision AI scout" that combines:
1.  **Modern Intelligence Interface:** Advanced search, faceted filters, dynamic profiles, and saved lists/searches.
2.  **Live Enrichment:** On-demand scraping and summarization of public web data to surface actionable signals and explainable matches.

**Product Identity:** 
The user experience must feel like a premium, professional tool. It prioritizes discovery efficiency through fast search and faceted filters, followed by deep enrichment and contextual action (lists, notes, export).

---

## 2. Design & UX Guidelines

-   **Vibe:** Premium aesthetics with clean typography, generous spacing, and a responsive layout.
-   **Interactions:** Fast, responsive transitions. Opinionated design system used consistently throughout.
-   **Workflow Inspiration:** 
    -   *Harmonic.ai:* For discovery and workflow patterns.
    -   *Cardinal.ai:* For thesis-oriented scouting logic.
-   **Core Flow:** Discover → Open Profile → Enrich → Take Action.
-   **Power-User Touches:** Keyboard shortcuts (e.g., `/` for search focus) and bulk actions.

---

## 3. Technical Stack & Architecture

-   **Framework:** Next.js (App Router) for hybrid rendering and serverless API integration.
-   **Client State:** Persistent data storage for lists and saved searches using `localStorage`.
-   **Data Strategy:** 
    -   **Seed:** Initial dataset loaded from mock company JSON.
    -   **Enrichment:** Real-time data pulls from public pages via server-side scraper.
-   **Security:** Enrichment logic resides behind a server-side endpoint (`/api/enrich`) to protect API keys.
-   **Deployment:** Vercel (preferred) or Netlify.

---

## 4. MVP Scope (Enforced)

The MVP focuses on the core UI and the automated enrichment pipeline.

### Core Routes & Features:
-   **Global Layout:** Persistent sidebar navigation and global search header.
-   **`/companies`:** Sortable directory with faceted filtering and pagination.
-   **`/companies/[id]`:** Profile view with overview, signals timeline, and internal notes.
-   **`/lists`:** Interface for managing company collections and exporting data (CSV/JSON).
-   **`/saved`:** Management of recurring search queries.

---

## 5. Live Enrichment Specification

Triggered by the "Enrich" action on a company profile, the pipeline extracts:
-   **Summary:** 1-2 sentence executive overview.
-   **Capabilities:** 3-6 bullet points on product/service offerings.
-   **Keywords:** 5-10 high-signal topical tags.
-   **Derived Signals:** 2-4 inferred signals (e.g., hiring status, recent content, developer focus).
-   **Provenance:** List of scraped URLs with timestamps.

**Performance:** Must maintain robust loading/error states and utilize client-side caching to prevent redundant API calls.

---

## 6. Out of Scope (Stretch Goals)

To maintain focus on the MVP, the following are explicitly excluded:
-   Advanced job queues or rate-limiting (simple backoff preferred).
-   Complex LLM extractor logic beyond basic parsing.
-   Vector stores or semantic similarity search.
-   External integrations (Slack, CRM, Email).

---

## 7. Execution Timeline

-   **Phase 1:** App scaffolding, layout, and mock data integration.
-   **Phase 2:** Company directory implementation (Search/Filters/Table).
-   **Phase 3:** Profile views, signaling, notes, and list persistence.
-   **Phase 4:** Live enrichment API development and UI integration.
-   **Phase 5:** Polish, documentation (README), and production deployment.

---

## References

-   **Market References:** PitchBook, Crunchbase, CB Insights, Affinity, Dealroom.
-   **Interface Patterns:** Harmonic, Cardinal, SourceScrub.