import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; color: string
  opacity: number; opacityDir: number
  shape: 'circle' | 'diamond'
}

const PALETTE = [
  '#F5C518', '#2DD4D4', '#E0B463',
  'rgba(255,255,255,0.9)', '#C2702C',
]

export default function ParticleCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let W = 0, H = 0

    const resize = () => {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W * devicePixelRatio
      canvas.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()

    const N = Math.min(90, Math.floor((W * H) / 8000))
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.05),
      size: Math.random() * 2.2 + 0.4,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      opacity: Math.random() * 0.5 + 0.15,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      shape: Math.random() > 0.65 ? 'diamond' : 'circle',
    }))

    function diamond(x: number, y: number, s: number) {
      ctx.beginPath()
      ctx.moveTo(x, y - s)
      ctx.lineTo(x + s * 0.7, y)
      ctx.lineTo(x, y + s)
      ctx.lineTo(x - s * 0.7, y)
      ctx.closePath()
    }

    function tick() {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.opacity += p.opacityDir * 0.004
        if (p.opacity > 0.75 || p.opacity < 0.08) p.opacityDir *= -1

        if (p.y < -6)   { p.y = H + 6; p.x = Math.random() * W }
        if (p.x < -6)   p.x = W + 6
        if (p.x > W + 6) p.x = -6

        ctx.globalAlpha = p.opacity
        ctx.fillStyle   = p.color
        if (p.shape === 'diamond') {
          diamond(p.x, p.y, p.size * 1.8)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        }
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
