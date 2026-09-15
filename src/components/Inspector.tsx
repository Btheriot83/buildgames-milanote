import { useBoard } from '../store/boardStore'

export function Inspector() {
  const cards = useBoard((s) => s.cards)
  const selectedId = useBoard((s) => s.selectedId)
  const editingId = useBoard((s) => s.editingId)
  const updateCard = useBoard((s) => s.updateCard)
  const deleteCard = useBoard((s) => s.deleteCard)
  const setEditing = useBoard((s) => s.setEditing)

  const card = cards.find((c) => c.id === selectedId)
  if (!card) {
    return (
      <aside className="inspector muted-panel">
        <h2>Inspector</h2>
        <p className="muted">Click a pin. Title, body, tags, color — all here.</p>
      </aside>
    )
  }

  const editing = editingId === card.id

  return (
    <aside className="inspector t-panel-reveal" data-state="in" data-testid="inspector">
      <div className="side-head">
        <h2>Inspector</h2>
        <button type="button" className="btn tiny ghost" onClick={() => setEditing(editing ? null : card.id)}>
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>

      <label className="side-label" htmlFor="insp-title">
        Title
      </label>
      <input
        id="insp-title"
        className="field"
        value={card.title}
        onChange={(e) => updateCard(card.id, { title: e.target.value })}
      />

      <label className="side-label" htmlFor="insp-body">
        Body
      </label>
      <textarea
        id="insp-body"
        className="field area"
        rows={6}
        value={card.body}
        onChange={(e) => updateCard(card.id, { body: e.target.value })}
      />

      {card.kind === 'link' && (
        <>
          <label className="side-label" htmlFor="insp-url">
            URL
          </label>
          <input
            id="insp-url"
            className="field"
            value={card.url ?? ''}
            onChange={(e) => updateCard(card.id, { url: e.target.value })}
          />
        </>
      )}

      <label className="side-label" htmlFor="insp-tags">
        Tags (comma-separated)
      </label>
      <input
        id="insp-tags"
        className="field"
        value={card.tags.join(', ')}
        onChange={(e) =>
          updateCard(card.id, {
            tags: e.target.value
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
          })
        }
      />

      <label className="side-label" htmlFor="insp-color">
        Card color
      </label>
      <input
        id="insp-color"
        type="color"
        className="color-field"
        value={card.color.startsWith('#') && card.color.length === 7 ? card.color : '#f3eee4'}
        onChange={(e) => updateCard(card.id, { color: e.target.value })}
      />

      <button
        type="button"
        className="btn danger block"
        data-testid="delete-card"
        onClick={() => {
          if (confirm('Delete this card?')) deleteCard(card.id)
        }}
      >
        Pull the pin
      </button>
    </aside>
  )
}
