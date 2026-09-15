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
  const allOnBoard = useMemo(
    () => cards.filter((c) => c.boardId === activeBoardId),
    [cards, activeBoardId],
  )

  const space = useRef<{ x: number; y: number; px: number; py: number } | null>(null)

  if (!board) {
    return (
      <div className="board-empty">
        <img src="/assets/empty-cork.png" alt="" className="empty-art" />
        <p>Pick a board on the left, or open From brief and paste the mess.</p>
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
        <p className="board-hint">Drag to place · scroll pans · ⌘-wheel zooms · double-click edits</p>
      </div>
      <div
        className="board-surface"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        {visible.map((c) => (
          <CardTile key={c.id} card={c} selected={c.id === selectedId} fresh={Date.now() - Date.parse(c.createdAt) < 3500} />
        ))}
        {allOnBoard.length === 0 && (
          <div className="board-empty-state">
            <img src="/assets/empty-cork.png" alt="" className="empty-art" />
            <p>Bare cork. Pin something, or hit <strong>From brief</strong> and let the sorter work.</p>
          </div>
        )}
        {allOnBoard.length > 0 && visible.length === 0 && (
          <div className="board-filter-empty">
            Nothing matches. Clear the search or pin a new card.
          </div>
        )}
      </div>
    </div>
  )
}
