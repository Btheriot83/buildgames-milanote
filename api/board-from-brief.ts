import type { VercelRequest, VercelResponse } from '@vercel/node'

type BriefCard = {
  kind: 'note' | 'link' | 'image' | 'column'
  title: string
  body: string
  url?: string
  tags: string[]
  color?: string
  cluster: string
}

type Result = {
  title: string
  description: string
  cards: BriefCard[]
  mode: 'llm' | 'local'
  note: string
  provider?: string
}

const COLORS = ['#f3eee4', '#ebe4d4', '#e2eadf', '#f0e6d8', '#e8e0d2', '#f5efe6']

function slugTag(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 24) || 'idea'
  )
}

function clusterBriefLocal(brief: string): Result {
  const raw = brief.trim()
  const lines = raw
    .split(/\n+/)
    .map((l) => l.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean)
  const sentences = raw
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8)
  const titleGuess = lines[0]?.slice(0, 60) || sentences[0]?.slice(0, 60) || 'Brief board'
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
      const first = text.trim().split(/\s+/)[0] ?? ''
      const isUrl = /^https?:\/\//i.test(first)
      cards.push({
        kind: isUrl ? 'link' : 'note',
        title: text.slice(0, 72),
        body: text,
        url: isUrl ? first : undefined,
        tags: [slugTag(cluster), slugTag(first || 'note')],
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
    note: 'Local cluster — server AI unavailable. Set BUILD_GAMES_LLM_API_KEY / XAI_API_KEY / OPENAI_API_KEY.',
    provider: 'local',
  }
}

type Attempt = { name: string; url: string; key: string; model: string }

function buildAttempts(): Attempt[] {
  const shared = process.env.BUILD_GAMES_LLM_API_KEY?.trim()
  const out: Attempt[] = []
  const seen = new Set<string>()
  const push = (a: Attempt) => {
    const id = `${a.url}|${a.model}|${a.key.slice(0, 6)}`
    if (seen.has(id)) return
    seen.add(id)
    out.push(a)
  }

  const xai =
    process.env.XAI_API_KEY?.trim() ||
    process.env.GROK_API_KEY?.trim() ||
    (shared?.startsWith('xai-') ? shared : undefined)
  if (xai) {
    push({
      name: 'xai',
      url: 'https://api.x.ai/v1/chat/completions',
      key: xai,
      model: process.env.XAI_MODEL?.trim() || 'grok-3-mini',
    })
  }

  const openaiCompat =
    process.env.OPENAI_API_KEY?.trim() ||
    process.env.ZAI_API_KEY?.trim() ||
    (shared && !shared.startsWith('xai-') ? shared : undefined)
  if (openaiCompat) {
    const base = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
    push({
      name: base.includes('z.ai') ? 'zai' : 'openai',
      url: `${base}/chat/completions`,
      key: openaiCompat,
      model: process.env.OPENAI_MODEL?.trim() || (base.includes('z.ai') ? 'glm-4.5-flash' : 'gpt-4o-mini'),
    })
  }

  // Last resort: unknown shared key → try xAI then OpenAI
  if (shared && !out.length) {
    push({
      name: 'xai',
      url: 'https://api.x.ai/v1/chat/completions',
      key: shared,
      model: process.env.XAI_MODEL?.trim() || 'grok-3-mini',
    })
    push({
      name: 'openai',
      url: 'https://api.openai.com/v1/chat/completions',
      key: shared,
      model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
    })
  }
  return out
}

async function clusterBriefLlm(brief: string): Promise<Result | null> {
  const attempts = buildAttempts()
  for (const a of attempts) {
    try {
      const res = await fetch(a.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${a.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: a.model,
          temperature: 0.4,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You turn a creative project brief into a Milanote-style visual board. Return JSON: {title, description, cards:[{kind:note|link|column, title, body, url?, tags:string[], color?, cluster:string}]}. Group into 3-5 clusters (put a column card first in each cluster). Concrete cards only — no fake stats, no emoji, no purple SaaS fluff. Max 18 cards.',
            },
            { role: 'user', content: brief.slice(0, 6000) },
          ],
        }),
      })
      if (!res.ok) continue
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
      let raw = data.choices?.[0]?.message?.content || ''
      // strip markdown fences if present
      raw = raw.replace(/^```json\s*/i, '').replace(/```$/i, '').trim()
      const start = raw.indexOf('{')
      const end = raw.lastIndexOf('}')
      if (start < 0 || end <= start) continue
      const parsed = JSON.parse(raw.slice(start, end + 1)) as Partial<Result>
      if (!parsed.cards?.length) continue
      return {
        title: parsed.title || 'Brief board',
        description: parsed.description || 'AI clustered board',
        cards: parsed.cards.map((c) => ({
          kind: c.kind || 'note',
          title: String(c.title || '').slice(0, 120),
          body: String(c.body || ''),
          url: c.url,
          tags: Array.isArray(c.tags) ? c.tags.map(String).slice(0, 6) : ['brief'],
          color: c.color || '#f3eee4',
          cluster: String(c.cluster || 'concept'),
        })),
        mode: 'llm',
        note: `Clustered via ${a.name} · ${a.model}`,
        provider: a.name,
      }
    } catch {
      /* try next */
    }
  }
  return null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const brief = String(body.brief ?? '').trim()
  if (!brief || brief.length < 12) {
    return res.status(400).json({ error: 'Paste a brief of at least a sentence.' })
  }

  try {
    const llm = await clusterBriefLlm(brief)
    if (llm) return res.status(200).json(llm)
  } catch {
    /* fall through */
  }
  return res.status(200).json(clusterBriefLocal(brief))
}
