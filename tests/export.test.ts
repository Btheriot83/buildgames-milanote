import { describe, expect, it } from 'vitest'
import { boardToMarkdown, parseImport } from '../src/lib/export'
import { makeSample } from '../src/lib/sample'

describe('export', () => {
  it('builds markdown for a board', () => {
    const snap = makeSample()
    const board = snap.boards[0]!
    const cards = snap.cards.filter((c) => c.boardId === board.id)
    const md = boardToMarkdown(board, cards)
    expect(md).toContain(`# ${board.title}`)
    expect(md).toContain('## ')
    expect(md.toLowerCase()).toMatch(/kind:/)
  })

  it('round-trips JSON parse', () => {
    const snap = makeSample()
    const again = parseImport(JSON.stringify(snap))
    expect(again.version).toBe(1)
    expect(again.boards.length).toBe(snap.boards.length)
    expect(again.cards.length).toBe(snap.cards.length)
  })

  it('rejects bad import', () => {
    expect(() => parseImport('{"version":2}')).toThrow(/Draftwall/)
  })
})
