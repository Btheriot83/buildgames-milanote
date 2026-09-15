import { useEffect, useState } from 'react'
import { useBoard } from '../store/boardStore'

export function Toast() {
  const toast = useBoard((s) => s.toast)
  const clearToast = useBoard((s) => s.clearToast)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!toast) {
      setOpen(false)
      return
    }
    // remount open class so toast recipe re-fires on each showToast
    setOpen(false)
    const id = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(id)
  }, [toast])

  if (!toast) return null
  return (
    <div
      className={`toast-host t-toast${open ? ' is-open' : ''}`}
      data-tone={toast.tone}
      role="status"
      onClick={() => clearToast()}
    >
      {toast.message}
    </div>
  )
}
