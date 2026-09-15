# Lenny / Anshu — Draftwall (Milanote)

## 1. Discover
- Seed (never shown in UI): `d9a1e63b72463dfab401406e7427c3b3ef63744408085b6f` via `openssl rand -hex 24`
- Hex-derived palette cues: `#3b7246` olive, `#401406`/`#b84a3c` clay wine, `#744`/`#c49a3c` ochre brass, `#08085b` → deep slate ink `#0e1419`, paper `#f3eee4`. Deliberately discarded lavender/purple chunks (`#d9a1e6`, `#b3ef`) per anti-slop.
- Direction briefs:
  1. **Draftwall** — blueprint slate, chalk paper cards, ochre push-pins, olive tags, clay accents, Newsreader + IBM Plex (picked)
  2. **Cork Atelier** — warm cork + iron type (too craft-store; weak freeform depth)
  3. **Signal Grid** — cyan HUD boards (too SaaS neon / game HUD)
- Ambition: freeform wall with live chalk-grid canvas + transitions.dev microinteractions — not “clean modern SaaS kanban”.

## 2. Define
- Implementer built React+Vite+IndexedDB visual boards (capture → drag → search/tags → Markdown/JSON export).
- Independent critic reviewed **live original** https://milanote.com/ and the live Draftwall demo; scores in `docs/CRITIC_VS_ORIGINAL.md`.

## 3. Deliver
- Core loop: sample film lookbook → pin note/link/image → drag on freeform board → search/tag filter → export JSON + Markdown.
- Cut: multiplayer, cloud sync, sharing links, mature importers, template marketplace (paid advantages).
- transitions.dev free recipes in real UX: success-check, toast, skeleton-reveal, texts-reveal, tabs-sliding, number-pop-in, error-state-shake, panel-reveal, card-tilt.
- Anti-slop: no vibe-purple, no Inter, no 3-card marketing hero, no fake stats banner, no emoji nav.

## Live
- Demo: https://buildgames-milanote.vercel.app (App Desk smoke 2026-09-14 PT: capture note + search tag + JSON export OK, HTTP 200).
