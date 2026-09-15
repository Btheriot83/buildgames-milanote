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
    <div className={`capture-bar ${shake ? 't-error-shake' : ''}`} data-state={shake ? 'in' : undefined}>
      <div className="mode-tabs t-tabs-sliding" data-active={mode}>
        <span className="tab-glider" aria-hidden />
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`tab ${mode === m.id ? 'on' : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <input
        className="capture-input field"
        data-testid="capture-input"
        placeholder={
          mode === 'link'
            ? 'Drop a link. #tags stick.'
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
      <button type="button" className="btn solid" data-testid="capture-submit" onClick={submit}>
        Pin
      </button>
      <button type="button" className="btn ghost" onClick={() => addColumn()}>
        Column
      </button>
    </div>
  )
}
