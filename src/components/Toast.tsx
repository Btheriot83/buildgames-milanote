import { useBoard } from '../store/boardStore'

export function Toast() {
  const toast = useBoard((s) => s.toast)
  const clearToast = useBoard((s) => s.clearToast)
  if (!toast) return null
  return (
    <div
      className="toast-host t-toast"
      data-state="in"
      data-tone={toast.tone}
      role="status"
      onClick={() => clearToast()}
    >
      {toast.message}
    </div>
  )
}
