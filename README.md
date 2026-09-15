# Draftwall — Milanote replacement (Build Games)

Local-first **visual project boards**: freeform cards for notes, links, and images, with search, tags, and Markdown/JSON export.

**Stack (contest override):** React + Vite + TypeScript + IndexedDB. No Tauri — public web demo on Vercel.

## Quick start

```bash
npm install
npm run dev
```

Production-style local preview:

```bash
npm run build
npm start
```

Tests:

```bash
npm run test:unit
npm run build && npx playwright install chromium && npm run test:e2e
```

## Core loop

1. Open the sample **Film lookbook** board (seeded on first visit).
2. Capture a note / link / image from the top bar (`#tags` inline).
3. Drag cards on the freeform wall; double-click or use the inspector to edit.
4. Filter with search + tag pills.
5. Export **JSON** (full backup) or **Markdown** (active board).

## Data & backup

- Storage: browser **IndexedDB** (`draftwall-milanote`).
- Export JSON anytime; Import JSON restores a Draftwall v1 snapshot.
- Reload sample resets to the labelled demo board.

## Architecture

- `src/lib/db.ts` — IndexedDB via `idb`
- `src/store/boardStore.ts` — Zustand app state + persistence
- `src/components/BoardCanvas.tsx` — pan/zoom freeform surface
- `src/styles/transitions.css` — transitions.dev free recipes wired into real UX

## Limits vs Milanote

Deliberately out of scope: multiplayer / sharing, cloud sync, mature importers, mobile native apps, large template catalogs.

## Permissions

No accounts, billing, telemetry, or required API keys. Optional image URLs load in the browser like any `<img>`.

## Aesthetic

**Draftwall** — blueprint slate, chalk paper, ochre pins, olive tags, clay accents. Newsreader + IBM Plex. Seed-derived; seed never shown in UI.
