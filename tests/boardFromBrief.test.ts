
import { describe, expect, it } from 'vitest'
import { clusterBriefLocal, layoutClustered } from '../src/lib/boardFromBrief'

describe('boardFromBrief local', () => {
  it('clusters a multi-line brief into columns + notes', () => {
    const r = clusterBriefLocal(`Diner short
Warm practicals
https://milanote.com/
Tone: quiet
Todos: scout neon`)
    expect(r.mode).toBe('local')
    expect(r.cards.some((c) => c.kind === 'column')).toBe(true)
    expect(r.cards.length).toBeGreaterThan(3)
    const laid = layoutClustered(r.cards)
    expect(laid.every((c) => typeof c.x === 'number')).toBe(true)
  })
})
