import { nanoid } from 'nanoid'
import type { Snapshot } from './types'

const COLORS = ['#f3eee4', '#e8e0d2', '#dfe8e2', '#f0e6d8', '#e6ebe8'] as const

export function makeSample(now = new Date()): Snapshot {
  const boardId = nanoid()
  const t = now.toISOString()
  const stamp = (offsetMs: number) => new Date(now.getTime() + offsetMs).toISOString()

  return {
    version: 1,
    seeded: true,
    activeBoardId: boardId,
    boards: [
      {
        id: boardId,
        title: 'Film lookbook (sample)',
        description: 'Starter wall on this device. Wipe anytime — nothing ships to a server.',
        createdAt: stamp(-86_400_000),
        updatedAt: t,
      },
      {
        id: nanoid(),
        title: 'Product launch wall',
        description: 'Empty spare board for capture practice.',
        createdAt: stamp(-43_200_000),
        updatedAt: stamp(-43_200_000),
      },
    ],
    cards: [
      {
        id: nanoid(),
        boardId,
        kind: 'column',
        title: 'References',
        body: 'Pin links & stills here',
        tags: ['refs'],
        x: 40,
        y: 40,
        w: 260,
        h: 72,
        color: '#c49a3c',
        createdAt: stamp(-80_000_000),
        updatedAt: stamp(-80_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'Opening tone',
        body: 'Warm practicals, soft grain, no cyan neon. Keep the palette close to clay + olive.',
        tags: ['tone', 'notes'],
        x: 40,
        y: 140,
        w: 260,
        h: 180,
        color: COLORS[0],
        createdAt: stamp(-70_000_000),
        updatedAt: stamp(-70_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'link',
        title: 'Milanote inspiration',
        body: 'Visual boards as the reference bar for this Build Games candidate.',
        url: 'https://milanote.com/',
        tags: ['refs', 'product'],
        x: 340,
        y: 80,
        w: 280,
        h: 140,
        color: COLORS[1],
        createdAt: stamp(-60_000_000),
        updatedAt: stamp(-60_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'Shot list seeds',
        body: '1. Hands pinning cork\n2. Wide wall with overlapping cards\n3. Detail of handwritten tag',
        tags: ['shots', 'list'],
        x: 340,
        y: 250,
        w: 280,
        h: 200,
        color: COLORS[2],
        createdAt: stamp(-50_000_000),
        updatedAt: stamp(-50_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'image',
        title: 'Palette swatch',
        body: 'Placeholder SVG — replace with your own image.',
        imageDataUrl:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='280'>
              <rect width='480' height='280' fill='#121820'/>
              <rect x='24' y='24' width='120' height='232' fill='#f3eee4'/>
              <rect x='160' y='24' width='120' height='232' fill='#c49a3c'/>
              <rect x='296' y='24' width='80' height='232' fill='#3b7246'/>
              <rect x='392' y='24' width='64' height='232' fill='#b84a3c'/>
            </svg>`,
          ),
        tags: ['palette', 'image'],
        x: 660,
        y: 60,
        w: 300,
        h: 240,
        color: COLORS[3],
        createdAt: stamp(-40_000_000),
        updatedAt: stamp(-40_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'Tag grammar',
        body: 'Use short tags: tone, refs, shots. Search matches title, body, tags, and URLs.',
        tags: ['tags', 'notes'],
        x: 660,
        y: 330,
        w: 300,
        h: 160,
        color: COLORS[4],
        createdAt: stamp(-30_000_000),
        updatedAt: stamp(-30_000_000),
      },
    ],
  }
}
