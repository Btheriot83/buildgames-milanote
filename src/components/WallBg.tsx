import { useEffect, useRef } from 'react'

/** Subtle chalk-dust grid — Draftwall signature, not purple glow */
export function WallBg() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      t += 0.004
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#0e1419')
      g.addColorStop(0.55, '#151c24')
      g.addColorStop(1, '#1a1512')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(243,238,228,0.045)'
      ctx.lineWidth = 1
      const step = 48
      const ox = Math.sin(t) * 6
      const oy = Math.cos(t * 0.7) * 4
      for (let x = -step; x < w + step; x += step) {
        ctx.beginPath()
        ctx.moveTo(x + ox, 0)
        ctx.lineTo(x + ox, h)
        ctx.stroke()
      }
      for (let y = -step; y < h + step; y += step) {
        ctx.beginPath()
        ctx.moveTo(0, y + oy)
        ctx.lineTo(w, y + oy)
        ctx.stroke()
      }

      // soft copper pin glow in corner
      const rg = ctx.createRadialGradient(w * 0.85, h * 0.2, 10, w * 0.85, h * 0.2, 220)
      rg.addColorStop(0, 'rgba(196,154,60,0.08)')
      rg.addColorStop(1, 'rgba(196,154,60,0)')
      ctx.fillStyle = rg
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="wall-bg" aria-hidden>
      <canvas ref={ref} className="wall-canvas" />
    </div>
  )
}
