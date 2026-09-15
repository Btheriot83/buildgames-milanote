export type CardKind = 'note' | 'link' | 'image' | 'column'

export type Card = {
  id: string
  boardId: string
  kind: CardKind
  title: string
  body: string
  url?: string
  imageDataUrl?: string
  tags: string[]
  x: number
  y: number
  w: number
  h: number
  color: string
  createdAt: string
  updatedAt: string
}

export type Board = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

export type Snapshot = {
  version: 1
  /** Starter-wall content generation; bump in sample.ts to refresh old SAMPLE boards. */
  contentVersion?: number
  boards: Board[]
  cards: Card[]
  activeBoardId: string | null
  seeded: boolean
}

export type CaptureKind = 'note' | 'link' | 'image'
