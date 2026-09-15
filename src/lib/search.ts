import type { Card } from './types'

export function normalizeQuery(q: string): string {
  return q.trim().toLowerCase()
}

export function cardMatches(card: Card, query: string, tagFilter: string | null): boolean {
  if (tagFilter && !card.tags.map((t) => t.toLowerCase()).includes(tagFilter.toLowerCase())) {
    return false
  }
  const q = normalizeQuery(query)
  if (!q) return true
  const hay = [card.title, card.body, card.url ?? '', card.kind, ...card.tags]
    .join(' ')
    .toLowerCase()
  return hay.includes(q)
}

export function collectTags(cards: Card[]): string[] {
  const set = new Set<string>()
  for (const c of cards) for (const t of c.tags) if (t.trim()) set.add(t.trim())
  return [...set].sort((a, b) => a.localeCompare(b))
}
