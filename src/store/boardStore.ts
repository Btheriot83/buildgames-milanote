import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { clearSnapshot, loadSnapshot, saveSnapshot } from '../lib/db'
import { exportJson, exportMarkdown, parseImport } from '../lib/export'
import { makeSample } from '../lib/sample'
import type { Board, CaptureKind, Card, CardKind, Snapshot } from '../lib/types'

type LoadStatus = 'boot' | 'loading' | 'ready' | 'error'

type Toast = { id: string; message: string; tone: 'ok' | 'err' } | null

type BoardState = {
  loadStatus: LoadStatus
  boards: Board[]
  cards: Card[]
  activeBoardId: string | null
  seeded: boolean
  search: string
  tagFilter: string | null
  selectedId: string | null
  editingId: string | null
  toast: Toast
  successFlash: boolean
  shakeCapture: boolean
  pan: { x: number; y: number }
  zoom: number

  boot: () => Promise<void>
  persist: () => Promise<void>
  setSearch: (q: string) => void
  setTagFilter: (tag: string | null) => void
  selectBoard: (id: string) => void
  addBoard: (title?: string) => void
  renameBoard: (id: string, title: string) => void
  deleteBoard: (id: string) => void
  selectCard: (id: string | null) => void
  setEditing: (id: string | null) => void
  capture: (kind: CaptureKind, raw: string) => boolean
  addColumn: () => void
  updateCard: (id: string, patch: Partial<Card>) => void
  moveCard: (id: string, x: number, y: number) => void
  deleteCard: (id: string) => void
  setPanZoom: (pan: { x: number; y: number }, zoom?: number) => void
  exportBackup: () => void
  exportBoardMd: () => void
  importBackup: (text: string) => Promise<void>
  resetSample: () => Promise<void>
  showToast: (message: string, tone?: 'ok' | 'err') => void
  clearToast: () => void
  triggerSuccess: () => void
}

function emptySnap(): Snapshot {
  return { version: 1, boards: [], cards: [], activeBoardId: null, seeded: false }
}

function snapshotOf(s: BoardState): Snapshot {
  return {
    version: 1,
    boards: s.boards,
    cards: s.cards,
    activeBoardId: s.activeBoardId,
    seeded: s.seeded,
  }
}

function parseTags(raw: string): string[] {
  const tags: string[] = []
  const re = /#([a-zA-Z0-9_-]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(raw))) tags.push(m[1])
  return [...new Set(tags)]
}

function stripTags(raw: string): string {
  return raw.replace(/#[a-zA-Z0-9_-]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function isUrl(s: string): boolean {
  try {
    const u = new URL(s.trim())
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export const useBoard = create<BoardState>((set, get) => ({
  loadStatus: 'boot',
  boards: [],
  cards: [],
  activeBoardId: null,
  seeded: false,
  search: '',
  tagFilter: null,
  selectedId: null,
  editingId: null,
  toast: null,
  successFlash: false,
  shakeCapture: false,
  pan: { x: 0, y: 0 },
  zoom: 1,

  boot: async () => {
    set({ loadStatus: 'loading' })
    try {
      let snap = await loadSnapshot()
      if (!snap || !snap.boards.length) {
        snap = makeSample()
        await saveSnapshot(snap)
      }
      set({
        loadStatus: 'ready',
        boards: snap.boards,
        cards: snap.cards,
        activeBoardId: snap.activeBoardId ?? snap.boards[0]?.id ?? null,
        seeded: snap.seeded,
      })
    } catch {
      const snap = makeSample()
      set({
        loadStatus: 'error',
        boards: snap.boards,
        cards: snap.cards,
        activeBoardId: snap.activeBoardId,
        seeded: true,
      })
      get().showToast('IndexedDB unavailable — working in memory', 'err')
    }
  },

  persist: async () => {
    try {
      await saveSnapshot(snapshotOf(get()))
    } catch {
      get().showToast('Could not save to IndexedDB', 'err')
    }
  },

  setSearch: (q) => set({ search: q }),
  setTagFilter: (tag) => set({ tagFilter: tag }),

  selectBoard: (id) => set({ activeBoardId: id, selectedId: null, editingId: null, pan: { x: 0, y: 0 } }),

  addBoard: (title) => {
    const id = nanoid()
    const t = new Date().toISOString()
    const board: Board = {
      id,
      title: title?.trim() || 'Untitled board',
      description: '',
      createdAt: t,
      updatedAt: t,
    }
    set((s) => ({ boards: [...s.boards, board], activeBoardId: id }))
    void get().persist()
    get().showToast('Board created')
  },

  renameBoard: (id, title) => {
    set((s) => ({
      boards: s.boards.map((b) =>
        b.id === id ? { ...b, title: title.trim() || b.title, updatedAt: new Date().toISOString() } : b,
      ),
    }))
    void get().persist()
  },

  deleteBoard: (id) => {
    set((s) => {
      const boards = s.boards.filter((b) => b.id !== id)
      const cards = s.cards.filter((c) => c.boardId !== id)
      const activeBoardId = s.activeBoardId === id ? boards[0]?.id ?? null : s.activeBoardId
      return { boards, cards, activeBoardId, selectedId: null }
    })
    void get().persist()
    get().showToast('Board deleted')
  },

  selectCard: (id) => set({ selectedId: id }),
  setEditing: (id) => set({ editingId: id, selectedId: id }),

  capture: (kind, raw) => {
    const text = raw.trim()
    if (!text) {
      set({ shakeCapture: true })
      setTimeout(() => set({ shakeCapture: false }), 450)
      get().showToast('Type something to capture', 'err')
      return false
    }
    const boardId = get().activeBoardId
    if (!boardId) {
      get().showToast('Create a board first', 'err')
      return false
    }
    const tags = parseTags(text)
    const cleaned = stripTags(text)
    const now = new Date().toISOString()
    const existing = get().cards.filter((c) => c.boardId === boardId)
    const x = 60 + (existing.length % 4) * 40
    const y = 80 + existing.length * 28

    let cardKind: CardKind = kind
    let url: string | undefined
    let title = cleaned.slice(0, 80) || kind
    let body = cleaned
    let imageDataUrl: string | undefined

    if (kind === 'link' || isUrl(cleaned.split(/\s+/)[0] ?? '')) {
      cardKind = 'link'
      const first = cleaned.split(/\s+/)[0] ?? cleaned
      url = isUrl(first) ? first : `https://${first}`
      title = cleaned.replace(first, '').trim() || new URL(url).hostname
      body = cleaned
    } else if (kind === 'image') {
      cardKind = 'image'
      if (cleaned.startsWith('data:image')) {
        imageDataUrl = cleaned
        title = 'Image'
        body = ''
      } else if (isUrl(cleaned)) {
        imageDataUrl = cleaned
        title = 'Remote image'
        body = cleaned
      } else {
        // generate a simple SVG placard from text
        imageDataUrl =
          'data:image/svg+xml;utf8,' +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='420' height='240'>
              <rect width='420' height='240' fill='#1a222c'/>
              <text x='28' y='120' fill='#f3eee4' font-family='Georgia, serif' font-size='22'>${cleaned
                .slice(0, 40)
                .replace(/[<>&]/g, '')}</text>
            </svg>`,
          )
        title = cleaned.slice(0, 40)
        body = 'Generated placard — paste a data URL or image URL for real images.'
      }
    }

    const card: Card = {
      id: nanoid(),
      boardId,
      kind: cardKind,
      title,
      body,
      url,
      imageDataUrl,
      tags: tags.length ? tags : cardKind === 'note' ? ['notes'] : [cardKind],
      x,
      y,
      w: cardKind === 'image' ? 300 : 260,
      h: cardKind === 'image' ? 220 : 160,
      color: '#f3eee4',
      createdAt: now,
      updatedAt: now,
    }

    set((s) => ({ cards: [...s.cards, card], selectedId: card.id }))
    void get().persist()
    get().showToast(`${cardKind} pinned`)
    get().triggerSuccess()
    return true
  },

  addColumn: () => {
    const boardId = get().activeBoardId
    if (!boardId) return
    const now = new Date().toISOString()
    const card: Card = {
      id: nanoid(),
      boardId,
      kind: 'column',
      title: 'New column',
      body: '',
      tags: ['column'],
      x: 80,
      y: 40,
      w: 240,
      h: 64,
      color: '#c49a3c',
      createdAt: now,
      updatedAt: now,
    }
    set((s) => ({ cards: [...s.cards, card], selectedId: card.id, editingId: card.id }))
    void get().persist()
  },

  updateCard: (id, patch) => {
    set((s) => ({
      cards: s.cards.map((c) =>
        c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c,
      ),
    }))
    void get().persist()
  },

  moveCard: (id, x, y) => {
    set((s) => ({
      cards: s.cards.map((c) => (c.id === id ? { ...c, x, y, updatedAt: new Date().toISOString() } : c)),
    }))
    void get().persist()
  },

  deleteCard: (id) => {
    set((s) => ({
      cards: s.cards.filter((c) => c.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
      editingId: s.editingId === id ? null : s.editingId,
    }))
    void get().persist()
    get().showToast('Card removed')
  },

  setPanZoom: (pan, zoom) => set((s) => ({ pan, zoom: zoom ?? s.zoom })),

  exportBackup: () => {
    exportJson(snapshotOf(get()))
    get().showToast('JSON backup downloaded')
    get().triggerSuccess()
  },

  exportBoardMd: () => {
    const s = get()
    const board = s.boards.find((b) => b.id === s.activeBoardId)
    if (!board) {
      get().showToast('No active board', 'err')
      return
    }
    const cards = s.cards.filter((c) => c.boardId === board.id)
    exportMarkdown(board, cards)
    get().showToast('Markdown exported')
    get().triggerSuccess()
  },

  importBackup: async (text) => {
    try {
      const snap = parseImport(text)
      await saveSnapshot(snap)
      set({
        boards: snap.boards,
        cards: snap.cards,
        activeBoardId: snap.activeBoardId,
        seeded: snap.seeded,
      })
      get().showToast('Backup restored')
      get().triggerSuccess()
    } catch {
      get().showToast('Import failed — need Draftwall v1 JSON', 'err')
    }
  },

  resetSample: async () => {
    await clearSnapshot()
    const snap = makeSample()
    await saveSnapshot(snap)
    set({
      boards: snap.boards,
      cards: snap.cards,
      activeBoardId: snap.activeBoardId,
      seeded: true,
      search: '',
      tagFilter: null,
      selectedId: null,
      editingId: null,
      pan: { x: 0, y: 0 },
      zoom: 1,
    })
    get().showToast('Sample board reloaded')
  },

  showToast: (message, tone = 'ok') => {
    const id = nanoid()
    set({ toast: { id, message, tone } })
    setTimeout(() => {
      if (get().toast?.id === id) set({ toast: null })
    }, 2600)
  },

  clearToast: () => set({ toast: null }),

  triggerSuccess: () => {
    set({ successFlash: true })
    setTimeout(() => set({ successFlash: false }), 900)
  },
}))

// silence unused emptySnap if tree-shaken later
void emptySnap
