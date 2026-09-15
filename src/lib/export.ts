import { saveAs } from 'file-saver'
import type { Board, Card, Snapshot } from './types'

export function exportJson(snap: Snapshot) {
  const blob = new Blob([JSON.stringify(snap, null, 2)], {
    type: 'application/json;charset=utf-8',
  })
  const stamp = new Date().toISOString().slice(0, 10)
  saveAs(blob, `draftwall-backup-${stamp}.json`)
}

export function boardToMarkdown(board: Board, cards: Card[]): string {
  const lines: string[] = [
    `# ${board.title}`,
    '',
    board.description ? `_${board.description}_` : '',
    board.description ? '' : '',
    `Exported from Draftwall · ${new Date().toISOString()}`,
    '',
  ]

  const ordered = [...cards].sort((a, b) => a.y - b.y || a.x - b.x)
  for (const c of ordered) {
    lines.push(`## ${c.title || c.kind}`)
    lines.push(`- kind: ${c.kind}`)
    if (c.tags.length) lines.push(`- tags: ${c.tags.map((t) => `\`${t}\``).join(', ')}`)
    if (c.url) lines.push(`- url: ${c.url}`)
    if (c.body) {
      lines.push('')
      lines.push(c.body)
    }
    if (c.imageDataUrl) {
      lines.push('')
      lines.push(`![${c.title || 'image'}](${c.imageDataUrl.slice(0, 64)}…)` )
    }
    lines.push('')
  }
  return lines.filter((l, i, arr) => !(l === '' && arr[i - 1] === '')).join('\n')
}

export function exportMarkdown(board: Board, cards: Card[]) {
  const md = boardToMarkdown(board, cards)
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
  const safe = board.title.replace(/[^\w\-]+/g, '-').toLowerCase() || 'board'
  saveAs(blob, `draftwall-${safe}.md`)
}

export function parseImport(text: string): Snapshot {
  const data = JSON.parse(text) as Snapshot
  if (!data || data.version !== 1 || !Array.isArray(data.boards) || !Array.isArray(data.cards)) {
    throw new Error('Not a Draftwall v1 backup')
  }
  return {
    version: 1,
    seeded: Boolean(data.seeded),
    activeBoardId: data.activeBoardId ?? data.boards[0]?.id ?? null,
    boards: data.boards,
    cards: data.cards,
  }
}
