# Independent critic — vs live original Milanote

**Bar product reviewed:** https://milanote.com/ (screenshot: `original-milanote-home.png`)  
**Candidate reviewed:** https://buildgames-milanote.vercel.app (`live-smoke.png`, `live-after-capture.png`)  
**Date:** 2026-09-14 PT  
**Judge:** separate from implementer; opened live original marketing/product site before scoring.

## Aesthetic name (candidate)
**Draftwall** — blueprint slate wall, chalk paper cards, ochre push-pins, olive tags, clay accents. Newsreader + IBM Plex Sans/Mono. Animated chalk-grid canvas (not purple SaaS).

## What the original does as the bar
- Soft navy marketing + light-canvas product: freeform boards mixing notes, images, links, columns, to-dos, comments, connectors, nested boards.
- Left tool rail for card types; unsorted tray; share/collab avatars; export; web clipper narrative; mobile apps.
- Team collaboration and client sharing as core paid advantage; polished moodboard craft for film/design/writing.

## Candidate vs that bar (core loop only)
| Criterion | Score /10 | Notes |
|-----------|-----------|-------|
| Freeform board + drag | 8.5 | Live pan/zoom wall with draggable note/link/image/column cards; no connectors or nested boards |
| Fast capture | 9.0 | Note/Link/Image tabs + Pin; `#tags` inline; empty capture shakes |
| Search + tags | 9.0 | Full-text search + tag pills filter live board |
| Visual craft / anti-slop | 9.0 | Draftwall language; zero vibe-purple / Inter / 3-card hero / fake stats |
| Motion / feedback | 8.5 | transitions.dev success-check, toast, skeleton, texts-reveal, tabs glider, number-pop, error-shake, panel-reveal, card-tilt |
| Export / backup honesty | 9.5 | JSON full backup + Markdown board export + import; IndexedDB labelled; no fake sync |
| First-visit clarity | 9.0 | Sample film lookbook loads immediately on live URL |
| Parity with paid extras | N/A | Correctly **excluded** multiplayer, sharing, cloud sync, mature importers, mobile native |
| **Overall as personal Milanote replacement** | **8.7** | Wins as honest local-first visual board with craft; loses on connectors, collab, clipper depth, and light-canvas polish of the original |

## Biggest gaps vs original (accepted for contest scope)
1. No collaboration, comments, or share links.
2. No connectors / arrows between cards; no nested boards.
3. No web clipper or unsorted inbox tray.
4. Dark atelier wall vs Milanote’s bright canvas — intentional aesthetic, not parity.

## Instant-fail check
Cleared: no purple gradients, no Inter, no centered SaaS hero CTA pair, no fake “10K users” banner, no emoji nav, no glassmorphism neon glow stack.

## Verdict
Ship for Brandon review: live URL HTTP 200, App Desk smoked capture→search→export on production, critic judged against live original — not self-only.
