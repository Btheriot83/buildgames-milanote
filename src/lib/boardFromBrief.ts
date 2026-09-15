/** AI / local brief → clustered board cards */

export type BriefCard = {
  kind: 'note' | 'link' | 'image' | 'column'
  title: string
  body: string
  url?: string
  tags: string[]
  color?: string
  cluster: string
}

export type BriefBoardResult = {
  title: string
  description: string
  cards: BriefCard[]
  mode: 'llm' | 'local'
  note: string
}

const COLORS = ['#f3eee4', '#ebe4d4', '#e2eadf', '#f0e6d8', '#e8e0d2', '#f5efe6']

function slugTag(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 24) || 'idea'
}

/** Deterministic local clusterer — works without API keys */
export function clusterBriefLocal(brief: string): BriefBoardResult {
  const raw = brief.trim()
  const lines = raw
    .split(/\n+/)
    .map((l) => l.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean)

  const sentences = raw
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8)

  const titleGuess =
    lines[0]?.slice(0, 60) ||
    sentences[0]?.slice(0, 60) ||
    'Brief board'

  // Bucket by simple keyword clusters
  const buckets: Record<string, string[]> = {
    concept: [],
    references: [],
    visuals: [],
    todos: [],
    tone: [],
  }

  const pool = lines.length > 1 ? lines : sentences.length ? sentences : [raw]
  for (const item of pool) {
    const low = item.toLowerCase()
    if (/\b(todo|task|next|ship|deadline|must)\b/.test(low)) buckets.todos.push(item)
    else if (/\b(ref|link|http|inspire|look|milanote|mood)\b/.test(low)) buckets.references.push(item)
    else if (/\b(color|palette|shot|image|visual|photo|grain|light)\b/.test(low)) buckets.visuals.push(item)
    else if (/\b(tone|feel|mood|voice|warm|cool|quiet)\b/.test(low)) buckets.tone.push(item)
    else buckets.concept.push(item)
  }

  // Ensure concept has something
  if (!buckets.concept.length && pool[0]) buckets.concept.push(pool[0])

  const cards: BriefCard[] = []
  const order = (['concept', 'references', 'visuals', 'tone', 'todos'] as const).filter(
    (k) => buckets[k].length > 0,
  )

  for (const cluster of order) {
    cards.push({
      kind: 'column',
      title: cluster[0].toUpperCase() + cluster.slice(1),
      body: '',
      tags: [slugTag(cluster), 'column'],
      color: '#c49a3c',
      cluster,
    })
    buckets[cluster].slice(0, 6).forEach((text, i) => {
      const isUrl = /^https?:\/\//i.test(text.trim().split(/\s+/)[0] ?? '')
      cards.push({
        kind: isUrl ? 'link' : 'note',
        title: text.slice(0, 72),
        body: text,
        url: isUrl ? text.trim().split(/\s+/)[0] : undefined,
        tags: [slugTag(cluster), slugTag(text.split(/\s+/)[0] ?? 'note')],
        color: COLORS[i % COLORS.length],
        cluster,
      })
    })
  }

  return {
    title: titleGuess.replace(/^#+\s*/, ''),
    description: `Clustered from brief · ${cards.filter((c) => c.kind !== 'column').length} pins`,
    cards,
    mode: 'local',
    note: 'Local cluster (no API). Set OPENAI_API_KEY / ZAI_API_KEY on the server for richer boards.',
  }
}

export function layoutClustered(
  cards: BriefCard[],
): Array<BriefCard & { x: number; y: number; w: number; h: number }> {
  const clusters = [...new Set(cards.map((c) => c.cluster))]
  const colW = 280
  const gapX = 36
  const gapY = 14
  const out: Array<BriefCard & { x: number; y: number; w: number; h: number }> = []

  clusters.forEach((cluster, ci) => {
    const group = cards.filter((c) => c.cluster === cluster)
    let y = 72
    const x = 56 + ci * (colW + gapX)
    for (const card of group) {
      const h = card.kind === 'column' ? 56 : Math.min(220, 88 + Math.ceil(card.body.length / 42) * 18)
      const w = card.kind === 'column' ? colW - 20 : colW - 36
      out.push({ ...card, x: card.kind === 'column' ? x : x + 10, y, w, h })
      y += h + gapY
    }
  })
  return out
}
