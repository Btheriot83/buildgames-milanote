# Define — Draftwall identity

## Aesthetic name
**Atelier Pinwall** — cork chalk board in a slate workshop; kraft pins; ochre / olive / clay.

## Mobbin
Mobbin MCP returned **paid-plan required** (2026-09-14). Comps substituted with:
1. Live original https://milanote.com/ screenshots (`gauntlet/screenshots/r0-bar-milanote.png`, `docs/original-milanote-home.png`)
2. Category memory: Miro / FigJam / Whimsical web boards — left tool rail, light infinite canvas, mixed media cards, soft shadows
Cited for layout density and light-canvas product craft — not for copying chrome.

## Image generation (required)
| Asset | Source | Path |
|-------|--------|------|
| Empty cork + kraft card | Higgsfield `gpt_image_2_5` | `public/assets/empty-cork.png` |
| Cork chalk wall texture | Higgsfield `gpt_image_2_5` | `public/assets/wall-cork.jpg` |
| Brand mark (kraft + pin) | Higgsfield `gpt_image_2_5` | `public/assets/brand-mark.png` |

Job IDs: `3615a9fb-…`, `3effdf56-…`, `5f787947-…`

## Critic loop (fresh context — screenshots only)

### Critic R0 — baseline candidate vs bar (honest)
- Screens: `gauntlet/screenshots/r0-candidate.png` vs `r0-bar-milanote.png`
- Aesthetic guess: dark “atelier SaaS” board app
- Studio bar: Milanote’s soft navy marketing + **bright freeform canvas** with paper cards
- Biggest gaps: (1) dark canvas vs light board, (2) glassmorphism chrome, (3) accent-stripe active nav, (4) no brief→board AI job, (5) CSS mark / no real empty art
- Anti-slop hits: glass (#3), accent stripe (#15), all-caps labels (#14-ish), perma-dark grey body (#14)
- Score vs studio bar: **3.8/10** (Brandon baseline)

### Critic R1 — after light canvas + anti-slop + Brief→board
- Expected screens: `gauntlet/screenshots/r1-candidate.png`
- Must clear glass + stripe; chalk board must read as paper; Brief→board control visible
- Score target: ≥5.5 if light canvas lands

### Critic R2–R5
Logged in `gauntlet/workbench.md` with screenshot paths each round.

## AI capability (Define × product)
Server route `POST /api/board-from-brief` — real chat completions via `BUILD_GAMES_LLM_API_KEY` / xAI / OpenAI-compatible (Z.ai on this project). Local heuristic fallback only when keys fail — labeled honestly in response `mode`.

## Technique 5 — Video / advanced motion
| Asset | Role |
|-------|------|
| `pin-settle` CSS keyframes + `.card-tile.pin-in` | Cards land when brief clusters |
| `public/assets/pin-press.mp4` (Imagine still + ffmpeg Ken Burns loop (MiniMax I2V queued; degraded Tech 5 documented)) | Plays in From-brief panel while sorting |
| transitions.dev recipes | Supplement only (not Tech 5 substitute) |

Job: `febdb65d-f0df-442d-a714-f63f6d718308` (minimax_h3)

## Technique 3 critic (Phase A close)
- R0 baseline vs milanote.com: **3.8/10** (dark canvas, glass, no AI job)
- R1 after light canvas + anti-slop start: light board lands; still copy residue in old preview — see Phase B for execution
