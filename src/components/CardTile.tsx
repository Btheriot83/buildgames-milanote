import { useRef } from 'react'
import type { Card } from '../lib/types'
import { useBoard } from '../store/boardStore'

type Props = {
  card: Card
  selected: boolean
}

export function CardTile({ card, selected }: Props) {
  const selectCard = useBoard((s) => s.selectCard)
  const setEditing = useBoard((s) => s.setEditing)
  const moveCard = useBoard((s) => s.moveCard)
  const drag = useRef<{ ox: number; oy: number; sx: number; sy: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a,button,textarea,input')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { ox: e.clientX, oy: e.clientY, sx: card.x, sy: card.y }
    selectCard(card.id)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return
    const zoom = useBoard.getState().zoom
    const dx = (e.clientX - drag.current.ox) / zoom
    const dy = (e.clientY - drag.current.oy) / zoom
    moveCard(card.id, Math.round(drag.current.sx + dx), Math.round(drag.current.sy + dy))
  }

  const onPointerUp = () => {
    drag.current = null
  }

  return (
    <article
      className={`card-tile kind-${card.kind} ${selected ? 'selected' : ''} t-card-tilt`}
      data-testid={`card-${card.kind}`}
      style={{
        left: card.x,
        top: card.y,
        width: card.w,
        minHeight: card.h,
        background: card.color,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={() => setEditing(card.id)}
    >
      <div className="card-pin" aria-hidden />
      <header className="card-head">
        <span className="card-kind">{card.kind}</span>
        <h3 className="card-title">{card.title}</h3>
      </header>
      {card.kind === 'image' && card.imageDataUrl && (
        <img className="card-img" src={card.imageDataUrl} alt={card.title || 'Board image'} draggable={false} />
      )}
      {card.kind === 'link' && card.url && (
        <a className="card-link" href={card.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
          {card.url.replace(/^https?:\/\//, '')}
        </a>
      )}
      {card.body && card.kind !== 'image' && <p className="card-body">{card.body}</p>}
      {card.tags.length > 0 && (
        <ul className="card-tags">
          {card.tags.map((t) => (
            <li key={t}>#{t}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
