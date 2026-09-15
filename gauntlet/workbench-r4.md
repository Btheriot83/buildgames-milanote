# Gauntlet Phase B4 INTEGRITY — Draftwall / Milanote (20 counted rounds)

**Identity locked:** Atelier Pinwall — **no reseed**.  
**Bar:** https://milanote.com/  
**Demo:** https://buildgames-milanote.vercel.app  
**Dream-loop:** `.dream-loop/baseline.png` → Higgsfield refine → `.dream-loop/target.png` (also `gauntlet/shots-r4/dream-target.png`)  
**Job (≤3s):** Pin notes/links → search → export.  
**Gate:** `/workspace/build-games/gauntlet/INTEGRITY_GATE.md`

### transitions.dev → real actions
| Recipe | Fires on |
|--------|----------|
| skeleton-reveal | boot `LoadingShell` |
| texts-reveal | `app-frame` after ready |
| toast + `.is-open` | `showToast` (pin / export / errors) |
| success-check `data-state` | `triggerSuccess` (pin / export / brief) |
| error-state-shake `.t-input.is-shaking` | empty Pin submit |
| tabs-sliding `.t-tabs` / `.t-tabs-pill` | Note/Link/Image mode |
| number-pop-in | boards/pins counts |
| panel-reveal | From brief panel |
| pin-settle `.pin-in` | new card land |

**Bar A/B note:** live `milanote.com` headless navigations crashed/timed out in this box; rounds 5/10/15/20 use prior live home capture `bar-milanote-home.png` (from r3 live) as bar reference alongside candidate shots.

Baseline: `gauntlet/shots-r4/r0-baseline.png`

---

## r1 — fonts
- files: src/styles/b4-integrity.css, src/main.tsx
- shot: gauntlet/shots-r4/r1-fonts.png
- verdict: Board title scale/tracking clearer; Draftwall brand quieter. Original still more open canvas.
- commit: e14c36b

## r2 — contrast
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r2-contrast.png
- verdict: Card body ink darker; less grey mush vs baseline. Original still softer polish.
- commit: 89bc0c2

## r3 — buttons
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r3-buttons.png
- verdict: Pin CTA heavier offset; secondary outlines thicker. Hierarchy closer to a tool UI; Milanote still quieter chrome.
- commit: 1f0b98e

## r4 — bar gap
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r4-bar-gap.png
- verdict: Board frame thinner + lighter wash toward Milanote canvas. Hard atelier offset remains identity.
- commit: 7ac4381

## r5 — fonts (+ bar A/B)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r5-fonts.png ; bar: gauntlet/shots-r4/r5-bar-ab.png
- verdict: Capture verb + search label use display face. Bar (marketing home) still far ahead on soft product polish; candidate clearer atelier job chrome.
- commit: 6830d50

## r6 — contrast
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r6-contrast.png
- verdict: Active board + tags more readable. Sidebar still denser than Milanote’s minimal nav.
- commit: 88e43ba

## r7 — buttons (transitions wired)
- files: src/components/Toast.tsx, src/components/CaptureBar.tsx, src/components/SuccessOverlay.tsx
- shot: gauntlet/shots-r4/r7-buttons.png
- verdict: Toast `.is-open`, empty-pin `.t-input.is-shaking`, success-check replay, tabs recipe classes now on real pin actions (not CSS-only). Spottable mainly when interacting.
- commit: 771f0d2

## r8 — bar gap (dream-loop paper)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r8-bar-gap.png
- verdict: Flatter cream notes toward target.png. Still less airy than Milanote white canvas.
- commit: 0358ba6

## r9 — fonts
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r9-fonts.png
- verdict: Mono uppercase kind labels quieter; titles win. Matches target card hierarchy better.
- commit: d286c01

## r10 — contrast (dream-loop canvas + bar A/B)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r10-contrast.png ; bar: gauntlet/shots-r4/r10-bar-ab.png
- verdict: Tighter chrome + taller board closes live→target breath. Original bar still prefers soft freeform; candidate closer to target density.
- commit: 1434a94

## r11 — buttons
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r11-buttons.png
- verdict: Ghost tertiary quieter; Pin min-width holds. Controls clearer vs washed ghosts.
- commit: 5869a50

## r12 — bar gap (dream-loop title card)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r12-bar-gap.png
- verdict: Board title becomes cream paper card on cork (matches target composition). Big gap closed vs baseline floating meta; Milanote still has softer card shadows.
- commit: 9f7f135

## r13 — fonts
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r13-fonts.png
- verdict: Inspector/sidebar headings Newsreader. Chrome type closer to target.
- commit: 89d0209

## r14 — contrast
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r14-contrast.png
- verdict: Search field ochre edge + darker fill; search job leg clearer in ≤3s.
- commit: d75f11d

## r15 — buttons (+ bar A/B)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r15-buttons.png ; bar: gauntlet/shots-r4/r15-bar-ab.png
- verdict: Export secondary hover earns weight. Bar home still wins marketing polish; candidate wins job-button clarity under Atelier.
- commit: 505044c

## r16 — bar gap (dream-loop)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r16-bar-gap.png
- verdict: Quieter tape + tighter workspace gap → more wall. Closer to target calm chrome.
- commit: b4d0649

## r17 — fonts
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r17-fonts.png
- verdict: Job rail active step bolder mono nums. Stage instructions scan faster.
- commit: e12bd8d

## r18 — contrast (dream-loop)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r18-contrast.png
- verdict: Selected card outline + pin head stronger. Selection craft nearer target; original still softer.
- commit: a049d23

## r19 — buttons
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r19-buttons.png
- verdict: Danger outline readable for delete paths. Idle shot little change; holds button system.
- commit: ea44268

## r20 — bar gap (dream-loop final + bar A/B)
- files: src/styles/b4-integrity.css
- shot: gauntlet/shots-r4/r20-bar-gap.png ; bar: gauntlet/shots-r4/r20-bar-ab.png
- verdict: Final lighten wash + toast offset. vs target.png: title card + paper notes + denser chrome largely closed; remaining gap is soft shadow polish + open freeform. vs milanote.com: original still preferred overall for mature canvas; candidate honest craft win under locked Atelier Pinwall (no score invented).
- commit: 1f00128

---

## Blind notes
- Dream-loop rounds: r8, r10, r12, r16, r18, r20 (composition/type/materials toward target while still A/B vs bar).
- Flat no-gradient held (rg clean in src).
- Identity frozen: Atelier Pinwall · Newsreader + IBM Plex · ochre/olive/clay · light chalk board in dark shell.
