import { useEffect, useState } from 'react'
import { useBoard } from '../store/boardStore'

export function SuccessOverlay() {
  const flash = useBoard((s) => s.successFlash)
  const [state, setState] = useState<'out' | 'in'>('out')

  useEffect(() => {
    if (!flash) {
      setState('out')
      return
    }
    setState('out')
    const id = requestAnimationFrame(() => setState('in'))
    return () => cancelAnimationFrame(id)
  }, [flash])

  if (!flash) return null
  return (
    <div className="success-host" aria-hidden>
      <span className="t-success-check" data-state={state}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#c49a3c" strokeWidth="1.5" opacity="0.35" />
          <path
            d="M7 12.5l3.2 3.2L17 8.8"
            stroke="#f3eee4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={state === 'in' ? 0 : 1}
          />
        </svg>
      </span>
    </div>
  )
}
