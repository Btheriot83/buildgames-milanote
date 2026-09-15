# IDENTITY LOCK — Draftwall (frozen after Phase A)

**Aesthetic name:** Atelier Pinwall  
**Core job:** Visual board capture — paste a brief → AI cluster/tag/board via API  
**Bar:** https://milanote.com/ (light freeform canvas craft)  
**Demo:** https://buildgames-milanote.vercel.app  

## Palette (locked)
| Token | Hex | Use |
|-------|-----|-----|
| Ink / slate shell | `#0e1419` `#151c24` `#1e2833` | App chrome, sidebar, capture bar |
| Chalk paper board | `#f3eee4` `#e8e0d2` | **Light board surface** (Milanote-like) |
| Ochre | `#c49a3c` | Primary CTA, pins, column headers |
| Olive | `#3b7246` | Tags on |
| Clay | `#b84a3c` | Danger / pin head |

**Forbidden:** vibe-purple / indigo CTAs (`#6366f1`–`#8b5cf6`), glassmorphism chrome, accent-stripe cards, Inter/Geist/Space Grotesk, Fraunces-everywhere, fake stats, emoji nav.

## Type (locked)
- Display: **Newsreader**
- UI: **IBM Plex Sans**
- Mono: **IBM Plex Mono** (counts, kind labels only)

## Materials (locked)
- Real Imagine assets: cork wall texture, empty cork+kraft, kraft brand mark
- Paper cards with soft physical shadow (not neon glow)
- Ochre push-pin dots on cards

## Motion (locked)
- Pin-settle keyframe when cards land from brief (`pin-settle` / `.pin-in`)
- Brief-busy: looping pin-press video (`public/assets/pin-press.mp4`) when clustering
- Existing transitions.dev: success-check, toast, shake, tabs glider, number-pop, panel-reveal, card-tilt — supplement only

## Copy voice (locked)
Short, workshop-specific, no SaaS fluff. Examples locked in DELIVER before→after:
- Tagline: “Brief in. Wall out.”
- Primary AI CTA: “From brief” → “Build the wall”
- Capture: “Write it once. #tag it. Pin it.”

## What we will NOT change in Phase B
- Aesthetic name / seed / direction briefs
- Light chalk board inside dark shell
- Newsreader + IBM Plex pairing
- Ochre/olive/clay accent system
- One-job focus (brief→board); no collab/connectors scope creep
