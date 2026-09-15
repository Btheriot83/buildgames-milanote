import { useRef } from 'react'
import { useBoard } from '../store/boardStore'
import { BriefBoard } from './BriefBoard'

export function ShellChrome() {
  const boards = useBoard((s) => s.boards)
  const cards = useBoard((s) => s.cards)
  const exportBackup = useBoard((s) => s.exportBackup)
  const exportBoardMd = useBoard((s) => s.exportBoardMd)
  const importBackup = useBoard((s) => s.importBackup)
  const resetSample = useBoard((s) => s.resetSample)
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <header className="shell-chrome">
      <div className="brand">
        <img className="brand-mark-img" src="/assets/brand-mark.png" alt="" width={52} height={52} />
        <div>
          <h1 className="brand-title">Draftwall</h1>
          <p className="brand-sub">Brief in. Wall out.</p>
        </div>
      </div>
      <div className="chrome-stats" aria-label="Board counts">
        <span className="stat">
          <span className="t-number-pop" data-state="in" key={boards.length}>
            {boards.length}
          </span>{' '}
          boards
        </span>
        <span className="stat-dot" />
        <span className="stat">
          <span className="t-number-pop" data-state="in" key={cards.length}>
            {cards.length}
          </span>{' '}
          cards
        </span>
      </div>
      <BriefBoard />
      <div className="chrome-actions">
        <button type="button" className="btn ghost" onClick={() => void resetSample()}>
          Sample
        </button>
        <button type="button" className="btn ghost" onClick={() => fileRef.current?.click()}>
          Import
        </button>
        <button type="button" className="btn ghost" onClick={() => exportBoardMd()}>
          MD
        </button>
        <button type="button" className="btn ghost" onClick={() => exportBackup()}>
          JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (!f) return
            const reader = new FileReader()
            reader.onload = () => {
              void importBackup(String(reader.result ?? ''))
            }
            reader.readAsText(f)
            e.target.value = ''
          }}
        />
      </div>
    </header>
  )
}
