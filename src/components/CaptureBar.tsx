import { useState } from 'react'
import type { CaptureKind } from '../lib/types'
import { useBoard } from '../store/boardStore'

const MODES: { id: CaptureKind; label: string }[] = [
  { id: 'note', label: 'Note' },
  { id: 'link', label: 'Link' },
  { id: 'image', label: 'Image' },
]

export function CaptureBar() {
  const [mode, setMode] = useState<CaptureKind>('note')
  const [value, setValue] = useState('')
  const capture = useBoard((s) => s.capture)
  const addColumn = useBoard((s) => s.addColumn)
  const shake = useBoard((s) => s.shakeCapture)

  const submit = () => {
    if (capture(mode, value)) setValue('')
  }

  return (
    <div className="capture-bar capture-bar-hero">
      <div className="capture-job-label">
        <span className="capture-verb">Pin</span>
        <span className="capture-hint">onto the wall</span>
      </div>
      <div className="mode-tabs t-tabs" data-active={mode} role="tablist" aria-label="Pin kind">
        <span className="tab-glider t-tabs-pill" aria-hidden />
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            className={`tab t-tab ${mode === m.id ? 'on' : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <input
        className={`capture-input field t-input${shake ? ' is-error is-shaking' : ''}`}
        data-testid="capture-input"
        placeholder={
          mode === 'link'
            ? 'Paste a link. #tags stick.'
            : mode === 'image'
              ? 'Image URL or a short placard label #refs'
              : 'Write it once. #tag it. Pin it.'
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            submit()
          }
        }}
        aria-label="Capture"
      />
      <button type="button" className="btn solid pin-cta" data-testid="capture-submit" onClick={submit}>
        Pin to wall
      </button>
      <button type="button" className="btn ghost tiny column-cta" onClick={() => addColumn()}>
        Column
      </button>
    </div>
  )
}
