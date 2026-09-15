# Gauntlet Phase B2 — Draftwall / Milanote (10 rounds)

**Identity locked:** Atelier Pinwall (`docs/IDENTITY.md`) — **no reseed**.  
**Bar:** https://milanote.com/  
**Demo:** https://buildgames-milanote.vercel.app  
**Job (≤3s):** Pin notes/links on a visual board → search → export.  
**Baseline after Phase B:** ~6.9 · Brandon: improved but not there; SAMPLE + job unclear.

Mobbin: paid-gated → comps = live milanote.com + prior Phase B shots.

---

## Round 1 — Kill SAMPLE / real film wall
**Piece:** Starter content  
**Change:** `makeSample()` → **Desert Diner · Lookbook** (12-min short: tone, refs, shot list, palette, cast). Second board **Night Pier · Still frames**. `contentVersion: 2` + boot refresh for old “(sample)” walls.  
**Shots:** `screenshots/r2/r0-baseline-live.png` → `r1-film-wall.png`  
**Critic:** Original still wins polish depth; candidate no longer says SAMPLE. Believable film brief reads as a product, not a scaffold.  
**Score:** 6.9 → **7.1**  
**Visible:** Board title + card copy rewrite; no “(sample)”.

## Round 2 — Job rail (pin → search → export)
**Piece:** Job clarity ≤3s  
**Change:** Center **job-rail** nav: 1 Pin notes & links → 2 Search the wall → 3 Export MD / JSON. Brand subline: “Pin notes & links. Search. Export.”  
**Shots:** `r2-job-rail.png`  
**Critic:** Core loop is billboard-obvious; Milanote still denser on tools, but candidate’s *job* is clearer.  
**Score:** **7.3**  
**Visible:** New pill rail under atelier tape.

## Round 3 — Export / reset affordances
**Piece:** Chrome verbs  
**Change:** `Sample` → **Reset wall**; `MD`/`JSON` → **Export MD** / **Export JSON**; toasts say “JSON/Markdown export saved”.  
**Shots:** `r3-export-chrome.png`  
**Critic:** Export is findable without decoding abbreviations.  
**Score:** **7.4**  
**Visible:** Button labels in chrome.

## Round 4 — Column layout / no-overlap wall
**Piece:** Board density  
**Change:** Four columns (Tone & palette · References · Shot list · Palette) with non-overlapping card positions; real diner links (pexels scout refs).  
**Shots:** `r4-columns.png`  
**Critic:** Reads as a worked lookbook, not scattered meta cards.  
**Score:** **7.5**  
**Visible:** Grid of columns + denser pins.

## Round 5 — Second board realism
**Piece:** Spare wall  
**Change:** Empty “Product launch wall” → **Night Pier · Still frames** with real description (fog, sodium lamps).  
**Shots:** `r5-second-board.png`  
**Critic:** Sidebar no longer telegraphs demo scaffolding.  
**Score:** **7.55**  
**Visible:** Board list titles.

## Round 6 — Capture hero / Pin CTA
**Piece:** Primary verb  
**Change:** Capture bar gains **Pin / onto the wall** label + **Pin to wall** solid CTA; kraft border/shadow on bar.  
**Shots:** `r6-capture-hero.png`  
**Critic:** Pin action is the loudest control on the stage (correct for the job).  
**Score:** **7.65**  
**Visible:** Capture chrome + CTA copy.

## Round 7 — Search elevation + match count
**Piece:** Search leg of the job  
**Change:** Sidebar leads with **Search the wall**; match chip on board (“Showing N of M pins”).  
**Shots:** `r7-search.png`  
**Critic:** Search→filter feedback is explicit; closes “where’s search?” gap.  
**Score:** **7.75**  
**Visible:** Search block + match chip.

## Round 8 — Link pin craft
**Piece:** Link cards  
**Change:** Link pins use olive **host chip** (hostname) instead of raw URL dump.  
**Shots:** `r8-link-chips.png`  
**Critic:** Links look like pins, not form fields.  
**Score:** **7.8**  
**Visible:** Chip treatment on link cards.

## Round 9 — Empty / inspector job copy
**Piece:** Orientation residue  
**Change:** Empty cork + inspector empty state restate pin → search → export; brief panel lede mentions export.  
**Shots:** `r9-inspector-job.png`  
**Critic:** Dead panels reinforce the same job (no new aesthetic).  
**Score:** **7.85**  
**Visible:** Inspector checklist + empty copy.

## Round 10 — Coherence / anti-slop / ship
**Piece:** Tests + docs + deploy  
**Change:** Unit + e2e updated for Desert Diner + Export buttons; VISIBLE_DELTA R2; status-r2; PR + Vercel redeploy. Instant-fail cluster still clear (no purple, no Inter, Atelier Pinwall frozen).  
**Shots:** `r10-final.png` vs `r0-baseline-live.png`  
**Critic (blind vs milanote.com):** Original still preferred for mature collab/tooling; candidate wins one-job honesty + real film wall + unmistakable pin→search→export. Honest score **~7.9** (not 9).  
**Stop:** Identity frozen; R2 complete.

---

## Blind A/B summary (B2)
| Round | Winner | Biggest gap if original wins |
|-------|--------|------------------------------|
| R1 | Original | Content honesty fixed |
| R2 | Original | Job rail closes clarity gap |
| R3–R5 | Original | Export + layout + second board |
| R6–R8 | Original (scope) | Pin/search/link craft improved |
| R9–R10 | Original overall; candidate wins job honesty | Collab/connectors out of scope |

## Visibility gate
Human who saw pre-R2 live demo spots in ≤3s: (1) job rail, (2) Desert Diner title (no SAMPLE), (3) Export MD/JSON, (4) Pin to wall CTA, (5) search-first sidebar. Proof: `screenshots/r2/r0-baseline-live.png` vs `r10-final.png` and `VISIBLE_DELTA.md` R2 section.
