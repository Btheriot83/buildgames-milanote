/** Cork + chalk paper texture — real Imagine asset, not CSS blob */
export function WallBg() {
  return (
    <div className="wall-bg" aria-hidden>
      <div
        className="wall-texture"
        style={{ backgroundImage: "url('/assets/wall-cork.jpg')" }}
      />
      <div className="wall-veil" />
    </div>
  )
}
