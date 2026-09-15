import { useBoard } from '../store/boardStore'
import { collectTags } from '../lib/search'

export function Sidebar() {
  const boards = useBoard((s) => s.boards)
  const cards = useBoard((s) => s.cards)
  const activeBoardId = useBoard((s) => s.activeBoardId)
  const selectBoard = useBoard((s) => s.selectBoard)
  const addBoard = useBoard((s) => s.addBoard)
  const deleteBoard = useBoard((s) => s.deleteBoard)
  const search = useBoard((s) => s.search)
  const setSearch = useBoard((s) => s.setSearch)
  const tagFilter = useBoard((s) => s.tagFilter)
  const setTagFilter = useBoard((s) => s.setTagFilter)

  const activeCards = cards.filter((c) => c.boardId === activeBoardId)
  const tags = collectTags(activeCards)

  return (
    <aside className="sidebar t-panel-reveal" data-state="in">
      <div className="side-block search-block">
        <label className="side-label search-label" htmlFor="board-search">
          Search the wall
        </label>
        <input
          id="board-search"
          className="field search-field"
          placeholder="Find a pin by text, tag, or URL…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="search-input"
        />
        {search.trim() && (
          <button type="button" className="btn tiny ghost clear-search" onClick={() => setSearch('')}>
            Clear search
          </button>
        )}
      </div>

      <div className="side-block">
        <div className="side-head">
          <h2>Boards</h2>
          <button type="button" className="btn tiny" onClick={() => addBoard()} aria-label="Add board">
            +
          </button>
        </div>
        <ul className="board-list">
          {boards.map((b) => {
            const count = cards.filter((c) => c.boardId === b.id).length
            return (
              <li key={b.id}>
                <button
                  type="button"
                  className={`board-item ${b.id === activeBoardId ? 'active' : ''}`}
                  onClick={() => selectBoard(b.id)}
                >
                  <span className="board-name">{b.title}</span>
                  <span className="board-count">{count}</span>
                </button>
                {boards.length > 1 && (
                  <button
                    type="button"
                    className="board-del"
                    aria-label={`Delete ${b.title}`}
                    onClick={() => {
                      if (confirm(`Delete board “${b.title}”?`)) deleteBoard(b.id)
                    }}
                  >
                    ×
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="side-block">
        <div className="side-head">
          <h2>Tags</h2>
          {tagFilter && (
            <button type="button" className="btn tiny ghost" onClick={() => setTagFilter(null)}>
              Clear
            </button>
          )}
        </div>
        <div className="tag-cloud" role="list">
          {tags.length === 0 && <p className="muted">Tags appear when you #mark a card.</p>}
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              role="listitem"
              className={`tag-pill ${tagFilter === tag ? 'on' : ''}`}
              onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
