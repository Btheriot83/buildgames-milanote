import { useState } from 'react'
import { clusterBriefLocal, layoutClustered, type BriefBoardResult } from '../lib/boardFromBrief'
import { useBoard } from '../store/boardStore'

const DINER_BRIEF = `Documentary short — desert diner at dusk
Warm practicals, soft grain, ochre booths vs teal neon
References: https://milanote.com/
Shot list: establishing wide, booth CU, pie plate insert, rain on glass
Tone: quiet, slightly lonely, hopeful end card
Todos: lock location, scout neon sign, cast waitress`

export function BriefBoard() {
  const [open, setOpen] = useState(false)
  const [brief, setBrief] = useState('')
  const [busy, setBusy] = useState(false)
  const [lastNote, setLastNote] = useState<string | null>(null)
  const applyBriefBoard = useBoard((s) => s.applyBriefBoard)
  const showToast = useBoard((s) => s.showToast)

  const run = async () => {
    const text = brief.trim()
    if (text.length < 12) {
      showToast('Paste a longer brief first', 'err')
      return
    }
    setBusy(true)
    setLastNote(null)
    let result: BriefBoardResult | null = null
    try {
      const res = await fetch('/api/board-from-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: text }),
      })
      if (res.ok) result = (await res.json()) as BriefBoardResult
    } catch {
      /* fall through to local */
    }
    if (!result?.cards?.length) result = clusterBriefLocal(text)
    const laid = layoutClustered(result.cards)
    applyBriefBoard({
      title: result.title,
      description: result.description,
      cards: laid,
      note: result.note,
      mode: result.mode,
    })
    setLastNote(`${result.mode === 'llm' ? 'AI' : 'Local'} · ${result.note}`)
    setBusy(false)
    setOpen(false)
  }

  return (
    <div className="brief-wrap">
      <button
        type="button"
        className="btn solid brief-open"
        data-testid="brief-open"
        onClick={() => setOpen((o) => !o)}
      >
        From brief
      </button>
      {open && (
        <div className="brief-panel t-panel-reveal" data-state="in" role="dialog" aria-label="Board from brief">
          <div className="brief-head">
            <h2>Paste a brief. Get a wall.</h2>
            <button type="button" className="btn tiny ghost" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <p className="brief-lede">
            Dump the messy notes, shot list, links. We sort them into columns and pin cards. Then search and export the wall.
          </p>
          <textarea
            className="field area brief-input"
            data-testid="brief-input"
            rows={10}
            placeholder="Title line, then bullets, links, tone, todos…"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
          />
          {busy && (
            <div className="brief-busy-visual" aria-hidden>
              <video
                src="/assets/pin-press.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/empty-cork.png"
              />
            </div>
          )}
          <div className="brief-actions">
            <button type="button" className="btn ghost" onClick={() => setBrief(DINER_BRIEF)}>
              Load diner brief
            </button>
            <button
              type="button"
              className="btn solid"
              data-testid="brief-run"
              disabled={busy}
              onClick={() => void run()}
            >
              {busy ? 'Sorting pins…' : 'Build the wall'}
            </button>
          </div>
          {lastNote && <p className="muted brief-note">{lastNote}</p>}
        </div>
      )}
    </div>
  )
}
