import { describe, expect, it } from 'vitest'
import { cardMatches, collectTags, normalizeQuery } from '../src/lib/search'
import type { Card } from '../src/lib/types'

const base: Card = {
  id: '1',
  boardId: 'b',
  kind: 'note',
  title: 'Opening tone',
  body: 'Warm practicals and soft grain',
  tags: ['tone', 'notes'],
  x: 0,
  y: 0,
  w: 200,
  h: 120,
  color: '#f3eee4',
  createdAt: '',
  updatedAt: '',
}

describe('search', () => {
  it('normalizes query', () => {
    expect(normalizeQuery('  Tone ')).toBe('tone')
  })

  it('matches title body tags', () => {
    expect(cardMatches(base, 'practicals', null)).toBe(true)
    expect(cardMatches(base, 'tone', null)).toBe(true)
    expect(cardMatches(base, 'cyan', null)).toBe(false)
  })

  it('filters by tag', () => {
    expect(cardMatches(base, '', 'tone')).toBe(true)
    expect(cardMatches(base, '', 'shots')).toBe(false)
  })

  it('collects sorted unique tags', () => {
    expect(collectTags([base, { ...base, id: '2', tags: ['shots', 'tone'] }])).toEqual([
      'notes',
      'shots',
      'tone',
    ])
  })
})
