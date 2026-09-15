import { nanoid } from 'nanoid'
import type { Snapshot } from './types'

/** Bump when starter wall content must replace old SAMPLE / meta walls on boot. */
export const CONTENT_VERSION = 2

const COLORS = ['#f3eee4', '#e8e0d2', '#dfe8e2', '#f0e6d8', '#e6ebe8', '#efe6d6'] as const

export function makeSample(now = new Date()): Snapshot {
  const boardId = nanoid()
  const board2 = nanoid()
  const t = now.toISOString()
  const stamp = (offsetMs: number) => new Date(now.getTime() + offsetMs).toISOString()

  return {
    version: 1,
    contentVersion: CONTENT_VERSION,
    seeded: true,
    activeBoardId: boardId,
    boards: [
      {
        id: boardId,
        title: 'Desert Diner · Lookbook',
        description:
          '12-min short · dusk booths, soft grain, ochre vs teal neon. Pin notes & links, then search / export the wall.',
        createdAt: stamp(-86_400_000),
        updatedAt: t,
      },
      {
        id: board2,
        title: 'Night Pier · Still frames',
        description: 'Second wall — fog, sodium lamps, wet planks. Empty cork for scouting pins.',
        createdAt: stamp(-43_200_000),
        updatedAt: stamp(-43_200_000),
      },
    ],
    cards: [
      {
        id: nanoid(),
        boardId,
        kind: 'column',
        title: 'Tone & palette',
        body: 'Keep practicals warm',
        tags: ['tone'],
        x: 48,
        y: 96,
        w: 248,
        h: 68,
        color: '#c49a3c',
        createdAt: stamp(-80_000_000),
        updatedAt: stamp(-80_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'Opening tone',
        body: 'Warm practicals, soft grain, no cyan neon. Clay booths, olive apron, clay ketchup bottle on Formica.',
        tags: ['tone', 'palette'],
        x: 48,
        y: 188,
        w: 248,
        h: 168,
        color: COLORS[0],
        createdAt: stamp(-78_000_000),
        updatedAt: stamp(-78_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'End card',
        body: 'Hold on rain on the plate glass. Cut to black. Title in Newsreader-weight serif, ochre only.',
        tags: ['tone', 'end'],
        x: 48,
        y: 380,
        w: 248,
        h: 148,
        color: COLORS[1],
        createdAt: stamp(-76_000_000),
        updatedAt: stamp(-76_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'column',
        title: 'References',
        body: 'Stills & links',
        tags: ['refs'],
        x: 332,
        y: 96,
        w: 268,
        h: 68,
        color: '#c49a3c',
        createdAt: stamp(-74_000_000),
        updatedAt: stamp(-74_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'link',
        title: 'Neon diner exteriors',
        body: 'Scout board for dusk storefronts — wet asphalt, buzzing tubes.',
        url: 'https://www.pexels.com/search/diner/',
        tags: ['refs', 'location'],
        x: 332,
        y: 188,
        w: 268,
        h: 152,
        color: COLORS[2],
        createdAt: stamp(-72_000_000),
        updatedAt: stamp(-72_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'link',
        title: 'Formica + chrome close-ups',
        body: 'Table texture refs for insert shots (pie plate, coffee ring).',
        url: 'https://www.pexels.com/search/diner%20table/',
        tags: ['refs', 'inserts'],
        x: 332,
        y: 364,
        w: 268,
        h: 152,
        color: COLORS[3],
        createdAt: stamp(-70_000_000),
        updatedAt: stamp(-70_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'column',
        title: 'Shot list',
        body: 'Day one coverage',
        tags: ['shots'],
        x: 636,
        y: 96,
        w: 280,
        h: 68,
        color: '#c49a3c',
        createdAt: stamp(-68_000_000),
        updatedAt: stamp(-68_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'Day-one coverage',
        body: '1. Establishing wide — neon sign in rain\n2. Booth CU — waitress pours coffee\n3. Pie plate insert — steam + window glow\n4. Door chime / wet mat detail',
        tags: ['shots', 'day1'],
        x: 636,
        y: 188,
        w: 280,
        h: 210,
        color: COLORS[4],
        createdAt: stamp(-66_000_000),
        updatedAt: stamp(-66_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'Location lock',
        body: 'Route 89A pullout diner, Sedona-side. Permit window Tue–Thu after 5pm. Backup: Flagstaff motor-court café.',
        tags: ['location', 'todos'],
        x: 636,
        y: 420,
        w: 280,
        h: 160,
        color: COLORS[5],
        createdAt: stamp(-64_000_000),
        updatedAt: stamp(-64_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'column',
        title: 'Palette',
        body: 'Swatches on cork',
        tags: ['palette'],
        x: 952,
        y: 96,
        w: 300,
        h: 68,
        color: '#c49a3c',
        createdAt: stamp(-62_000_000),
        updatedAt: stamp(-62_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'image',
        title: 'Lookboard swatch',
        body: 'Chalk · ochre · olive · clay',
        imageDataUrl:
          'data:image/svg+xml;utf8,' +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='480' height='280'>
              <rect width='480' height='280' fill='#1a1712'/>
              <rect x='24' y='24' width='100' height='232' fill='#f3eee4'/>
              <rect x='136' y='24' width='100' height='232' fill='#c49a3c'/>
              <rect x='248' y='24' width='100' height='232' fill='#3b7246'/>
              <rect x='360' y='24' width='96' height='232' fill='#b84a3c'/>
              <text x='24' y='270' fill='#9aa3ad' font-family='IBM Plex Mono, monospace' font-size='14'>chalk · ochre · olive · clay</text>
            </svg>`,
          ),
        tags: ['palette', 'image'],
        x: 952,
        y: 188,
        w: 300,
        h: 248,
        color: COLORS[0],
        createdAt: stamp(-60_000_000),
        updatedAt: stamp(-60_000_000),
      },
      {
        id: nanoid(),
        boardId,
        kind: 'note',
        title: 'Cast note — waitress',
        body: 'Mid-40s, soft-spoken, name tag “June”. Apron olive canvas, not black. No comic relief beats.',
        tags: ['cast', 'notes'],
        x: 952,
        y: 460,
        w: 300,
        h: 150,
        color: COLORS[2],
        createdAt: stamp(-58_000_000),
        updatedAt: stamp(-58_000_000),
      },
    ],
  }
}

/** True when stored wall is still the old SAMPLE / meta starter and should be replaced. */
export function needsContentRefresh(snap: Snapshot | null): boolean {
  if (!snap || !snap.boards.length) return true
  if ((snap.contentVersion ?? 0) < CONTENT_VERSION) return true
  const titles = snap.boards.map((b) => b.title.toLowerCase())
  if (titles.some((t) => t.includes('(sample)') || t.includes('sample wall'))) return true
  return false
}
