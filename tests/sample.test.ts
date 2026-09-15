import { describe, expect, it } from 'vitest'
import { CONTENT_VERSION, makeSample, needsContentRefresh } from '../src/lib/sample'

describe('sample starter wall', () => {
  it('ships real film brief without SAMPLE wording', () => {
    const snap = makeSample()
    expect(snap.contentVersion).toBe(CONTENT_VERSION)
    expect(snap.boards[0]!.title).toMatch(/Desert Diner/)
    expect(snap.boards.map((b) => b.title).join(' ')).not.toMatch(/sample/i)
    expect(snap.cards.length).toBeGreaterThan(8)
    expect(snap.cards.some((c) => c.kind === 'link' && c.url)).toBe(true)
    expect(snap.cards.some((c) => /waitress|June|Sedona|neon/i.test(c.body + c.title))).toBe(true)
  })

  it('flags old SAMPLE snapshots for refresh', () => {
    expect(needsContentRefresh(null)).toBe(true)
    const fresh = makeSample()
    expect(needsContentRefresh(fresh)).toBe(false)
    expect(
      needsContentRefresh({
        ...fresh,
        contentVersion: 1,
        boards: [{ ...fresh.boards[0]!, title: 'Film lookbook (sample)' }],
      }),
    ).toBe(true)
  })
})
