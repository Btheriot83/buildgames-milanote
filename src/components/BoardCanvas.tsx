import { useMemo, useRef } from 'react'
import { cardMatches } from '../lib/search'
import { useBoard } from '../store/boardStore'
import { CardTile } from './CardTile'

export function BoardCanvas() {
  const cards = useBoard((s) => s.cards)
  const activeBoardId = useBoard((s) => s.activeBoardId)
  const boards = useBoard((s) => s.boards)
  const search = useBoard((s) => s.search)
  const tagFilter = useBoard((s) => s.tagFilter)
  const selectedId = useBoard((s) => s.selectedId)
  const pan = useBoard((s) => s.pan)
  const zoom = useBoard((s) => s.zoom)
  const setPanZoom = useBoard((s) => s.setPanZoom)
  const selectCard = useBoard((s) => s.selectCard)

  const board = boards.find((b) => b.id === activeBoardId)
  const visible = useMemo(
    () => cards.filter((c) => c.boardId === activeBoardId && cardMatches(c, search, tagFilter)),
    [cards, activeBoardId, search, tagFilter],
  )

  const space = useRef<{ x: number; y: number; px: number; py: number } | null>(null)

  if (!board) {
    return (
      <div className="board-empty">
        <p>No board selected. Create one from the sidebar.</p>
      </div>
    )
  }

  return (
    <div
      className="board-viewport"
      data-testid="board-viewport"
      onWheel={(e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          const next = Math.min(1.6, Math.max(0.55, zoom + (e.deltaY > 0 ? -0.05 : 0.05)))
          setPanZoom(pan, next)
        } else {
          setPanZoom({ x: pan.x - e.deltaX, y: pan.y - e.deltaY }, zoom)
        }
      }}
      onPointerDown={(e) => {
        if (e.target !== e.currentTarget && !(e.target as HTMLElement).classList.contains('board-surface')) return
        selectCard(null)
        space.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!space.current) return
        setPanZoom({
          x: space.current.px + (e.clientX - space.current.x),
          y: space.current.py + (e.clientY - space.current.y),
        })
      }}
      onPointerUp={() => {
        space.current = null
      }}
    >
      <div className="board-meta">
        <h2>{board.title}</h2>
        {board.description && <p>{board.description}</p>}
        <p className="board-hint">Drag cards · scroll to pan · ⌘/Ctrl+wheel to zoom · double-click to edit</p>
      </div>
      <div
        className="board-surface"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        {visible.map((c) => (
          <CardTile key={c.id} card={c} selected={c.id === selectedId} />
        ))}
        {visible.length === 0 && (
          <div className="board-filter-empty">
            No cards match this search/tag. Clear filters or pin something new.
          </div>
        )}
      </div>
    </div>
  )
}
