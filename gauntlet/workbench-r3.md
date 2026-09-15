# Gauntlet Phase B3 — Draftwall / Milanote (20 rounds)

**Identity locked:** Atelier Pinwall (`docs/IDENTITY.md`) — **no reseed**.  
**Bar:** https://milanote.com/  
**Demo:** https://buildgames-milanote.vercel.app  
**Job (≤3s):** Pin notes/links on a visual board → search → export.  
**B3 focus:** fonts · contrast · buttons · close A/B vs Milanote board craft · flat no-gradient.  
**Baseline after B2 flat:** ~7.9 · Brandon: craft details missing; fonts/contrast/buttons wash.

Mobbin: paid-gated → comps = live milanote.com marketing + prior board shots + `r0-bar-milanote-home.png`.

---

## Round 1 — Type scale: brand demoted
**Piece:** Brand title fought board title (both huge Newsreader).  
**Change:** `--fs-brand: 1.28rem`; board title keeps `--fs-board` hero.  
**Shots:** `r0-baseline-demo.png` → compare brand size.  
**Critic:** Board title wins the stage; Draftwall mark no longer screams. Gap: description still long.  
**Score:** 7.9 → **8.0**

## Round 2 — Contrast tokens that hold
**Piece:** `--muted: #9aa3ad` washed on ink chrome.  
**Change:** `--muted: #b4bcc6`, `--paper-dim: #c8d0d8`, card ink `--ink-card/#soft/#faint`.  
**Critic:** Labels/stats readable; no grey-on-grey mush. Gap: ochre-everywhere still competed.  
**Score:** **8.05**

## Round 3 — Card type hierarchy
**Piece:** Kind/title/body same visual weight.  
**Change:** Quiet mono kind; display title 0.98rem; sans body 0.84rem / 1.45 lh with stronger ink.  
**Critic:** Closer to Milanote note craft (serif heading, sans body). Gap: pastel fills still soft.  
**Score:** **8.1**

## Round 4 — Button system: primary earns weight
**Piece:** Two solid ochre CTAs (From brief + Pin to wall).  
**Change:** `.btn.solid` = primary only (Pin / Build the wall) with ink offset; heavy weight 700.  
**Critic:** Pin is the loudest stage control. Gap: chrome exports still ghost.  
**Score:** **8.2**

## Round 5 — Secondary outline for export job
**Piece:** Export MD/JSON looked tertiary but are job step 3.  
**Change:** `.btn.secondary` ochre outline; Export MD/JSON use it.  
**Critic:** Export earns weight without competing with Pin. Gap: From brief still solid.  
**Score:** **8.25**

## Round 6 — Demote From brief + Column
**Piece:** From brief stole primary; Column same as Reset.  
**Change:** From brief → `btn secondary`; Column → `btn ghost tiny`.  
**Critic:** One solid primary on stage (Pin). Chrome AI entry is outline.  
**Score:** **8.3**

## Round 7 — Ghost tertiary cleanup
**Piece:** Reset/Import/ghost hover washed.  
**Change:** True transparent ghost; hover subtle ink wash + paper text.  
**Critic:** Tertiary reads quieter than secondary outline.  
**Score:** **8.32**

## Round 8 — Mode tabs: solid glider (not 0.35 wash)
**Piece:** Tab glider opacity 0.35 washed ochre into chrome.  
**Change:** Opacity 1 + ink border/shadow; inactive tabs `--paper-dim`.  
**Critic:** Active Note/Link/Image readable like Milanote tool chips. Gap: tabs once inflated — fixed R11.  
**Score:** **8.35**

## Round 9 — Board surface less muddy
**Piece:** Chalk wash 0.55 + ochre offset made cork muddy vs Milanote light canvas.  
**Change:** Wash opacity 0.42; flat `#f7f2e8`; board shadow ink not ochre.  
**Critic:** Board reads lighter / more paper. Identity cork photo retained.  
**Score:** **8.4**

## Round 10 — Card paper craft (Milanote-like notes)
**Piece:** Soft pastel cards with weak borders.  
**Change:** `--paper-card: #faf7f0`; 1px ink edge; hard 2px offset; radius 3px; CONTENT_VERSION 3 clearer papers.  
**Shots:** `r10-mid-ab.png`  
**Critic:** Notes read as pinned paper. Original still wins soft shadow polish; candidate wins flat atelier honesty.  
**Score:** **8.45**

## Round 11 — Capture bar grid fix
**Piece:** Mode tabs inflated after solid glider.  
**Change:** Fixed 210px tabs column; tighter Pin verb; capture grid `auto 210px 1fr auto auto`.  
**Critic:** Capture row denser; Pin CTA sits correctly.  
**Score:** **8.48**

## Round 12 — Column headers (Milanote top-strip cue)
**Piece:** Full ochre slabs without structure.  
**Change:** 4px ink top strip on column cards; ink pin; forced ochre fill + display title.  
**Critic:** Columns scan like Milanote column headers.  
**Score:** **8.5**

## Round 13 — Sidebar / search contrast
**Piece:** Search field soft; active board weak.  
**Change:** Search border ochre 1.5px; active board inset ochre bar; tag-on olive stronger.  
**Critic:** Search leg of job clearer.  
**Score:** **8.52**

## Round 14 — Chrome ink offsets (kill ochre wash)
**Piece:** Ochre shadows on shell/job-rail/tape competed with CTAs.  
**Change:** Shell/job-rail/sidebar/inspector use ink offsets; tape demoted to dark strip with ochre only on first label.  
**Critic:** Ochre reserved for pins/CTAs/numbers — not every shadow.  
**Score:** **8.55**

## Round 15 — Link chip + match chip contrast
**Piece:** Soft olive chips washed into mint cards.  
**Change:** Link chip `#e8f0ea` + 1.5px olive + weight 600; match chip ink/paper.  
**Critic:** Links readable as hosts.  
**Score:** **8.57**

## Round 16 — Font weights loaded
**Piece:** Buttons claimed 700 without Plex 700 loaded.  
**Change:** Google fonts: Plex Sans 700 + Mono 600 + Newsreader 500.  
**Critic:** Primary buttons actually bold.  
**Score:** **8.58**

## Round 17 — Density: board breathes
**Piece:** Tape + rail + shell ate vertical space vs Milanote.  
**Change:** Tighter frame/chrome padding; board min-height 560px; quieter tape padding.  
**Critic:** More wall visible in ≤3s.  
**Score:** **8.6**

## Round 18 — Inspector / field contrast
**Piece:** Fields low contrast; inspector job muted.  
**Change:** Field border `--line-strong`; focus ochre ring; inspector headings paper.  
**Critic:** Edit path readable.  
**Score:** **8.62**

## Round 19 — Flat bar audit (kill shimmer gradient)
**Piece:** `transitions.css` still defined shimmer `linear-gradient`.  
**Change:** Neutralize shimmer to flat/none; rg confirms **zero** gradient keywords in `src/`.  
**Critic:** Flat bar holds. Atelier materials intact.  
**Score:** **8.65**

## Round 20 — Coherence / ship
**Piece:** Docs + PR + redeploy.  
**Change:** `workbench-r3.md`, `status-milanote-r3.json`, VISIBLE_DELTA B3 bullets, unit+e2e, Vercel.  
**Shots:** `r0-baseline-demo.png` vs `r20-final.png` + `r0-bar-milanote-home.png`  
**Critic (blind vs milanote.com):** Original still preferred for mature collab/tooling/soft shadow polish. Candidate closes craft gaps on type hierarchy, button weight, contrast, and light-board note feel under locked Atelier Pinwall. Honest **~8.7** (not 9).  
**Stop:** Identity frozen; B3 twenty rounds complete.

---

## Blind A/B summary (B3)
| Rounds | Winner | Biggest gap closed |
|--------|--------|--------------------|
| R1–R3 | Original | Type scale + contrast tokens |
| R4–R7 | Original (scope) | Button primary/secondary/ghost |
| R8–R12 | Closer | Tabs, board wash, paper cards, columns |
| R13–R17 | Closer | Chrome ochre wash killed; density |
| R18–R20 | Original overall; candidate craft win | Flat audit + ship |

## Visibility gate (≤3s vs pre-B3 live)
1. From brief is outline (not solid ochre twin of Pin)
2. Export MD/JSON ochre secondary outlines
3. Quieter dark tape (not full ochre banner)
4. Ink shadows on chrome (ochre reserved for CTAs)
5. Clearer paper cards + column top strips on cork

Proof: `screenshots/r3/r0-baseline-demo.png` vs `r20-final.png`.

## Identity check
- Atelier Pinwall locked · Newsreader + IBM Plex · ochre/olive/clay · light chalk board in dark shell · cork photo · no reseed · flat no-gradient.
