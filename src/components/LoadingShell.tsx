type Props = { revealed: boolean }

export function LoadingShell({ revealed }: Props) {
  if (revealed) return null
  return (
    <div className="loading-shell t-skeleton-reveal" data-state="in" role="status" aria-live="polite">
      <div className="skel-rail" />
      <div className="skel-stage">
        <div className="skel-card" />
        <div className="skel-card wide" />
        <div className="skel-card tall" />
      </div>
      <p className="skel-label">Hanging the sample wall…</p>
    </div>
  )
}
