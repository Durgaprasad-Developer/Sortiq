'use client'
import { useEffect, useRef } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const CHARS = '01QSTORE CRUSH ENV REWARD EPSILON GAMMA ALPHA 10 RL AGENT'
    const cols  = Math.floor(canvas.width / 14)
    const drops = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(3,6,9,0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font      = '11px "Share Tech Mono", monospace'
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x    = i * 14
        const y    = drops[i] * 14

        // gradient: bright head, dim trail
        const brightness = Math.random() > 0.97 ? 1 : 0.15
        ctx.fillStyle = `rgba(0,${Math.floor(120 * brightness + 135)},${Math.floor(100 * brightness)},${brightness})`
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-30"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
