'use client'
import { useEffect, useRef } from 'react'

export default function LiveGraph({ episodeScores, currentScore, running }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    // ── Clear ────────────────────────────────────────────────
    ctx.fillStyle = '#040a0d'
    ctx.fillRect(0, 0, W, H)

    // ── Grid lines ───────────────────────────────────────────
    ctx.strokeStyle = '#0f2535'
    ctx.lineWidth = 1
    const gridLines = 5
    for (let i = 0; i <= gridLines; i++) {
      const y = (H * 0.1) + (H * 0.8) * (i / gridLines)
      ctx.beginPath()
      ctx.moveTo(50, y)
      ctx.lineTo(W - 10, y)
      ctx.stroke()
    }

    // ── Axis labels ──────────────────────────────────────────
    ctx.fillStyle = '#2a5540'
    ctx.font = '9px "Share Tech Mono", monospace'
    ctx.textAlign = 'right'

    const allScores = [...episodeScores]
    const maxScore = Math.max(...allScores, 94)
    const minScore = Math.min(...allScores, -40)
    const range    = maxScore - minScore || 1

    for (let i = 0; i <= gridLines; i++) {
      const val = maxScore - (range * i / gridLines)
      const y   = (H * 0.1) + (H * 0.8) * (i / gridLines)
      ctx.fillText(Math.round(val), 44, y + 3)
    }

    // ── Axis label: SCORE ────────────────────────────────────
    ctx.save()
    ctx.translate(10, H / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillStyle = '#2a5540'
    ctx.font = '8px "Share Tech Mono", monospace'
    ctx.textAlign = 'center'
    ctx.fillText('SCORE', 0, 0)
    ctx.restore()

    ctx.fillStyle = '#2a5540'
    ctx.font = '8px "Share Tech Mono", monospace'
    ctx.textAlign = 'center'
    ctx.fillText('EPISODE', W / 2, H - 2)

    if (allScores.length < 2) {
      // Not enough data yet — show placeholder
      ctx.fillStyle = '#0f2535'
      ctx.font = '9px "Share Tech Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('// WAITING FOR EPISODE DATA...', W / 2, H / 2)
      return
    }

    const toX = (i) => 50 + ((W - 60) * i / Math.max(allScores.length - 1, 1))
    const toY = (v) => (H * 0.1) + (H * 0.8) * (1 - (v - minScore) / range)

    // ── Raw rewards (faded dots + line) ──────────────────────
    ctx.strokeStyle = 'rgba(0,170,255,0.2)'
    ctx.lineWidth = 1
    ctx.beginPath()
    allScores.forEach((s, i) => {
      const x = toX(i), y = toY(s)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Dots
    allScores.forEach((s, i) => {
      ctx.fillStyle = 'rgba(0,170,255,0.35)'
      ctx.beginPath()
      ctx.arc(toX(i), toY(s), 2.5, 0, Math.PI * 2)
      ctx.fill()
    })

    // ── Moving average (neon green) ───────────────────────────
    const window = Math.min(5, Math.max(2, Math.floor(allScores.length / 3)))
    if (allScores.length >= window) {
      ctx.strokeStyle = '#00ff9f'
      ctx.lineWidth = 2.5
      ctx.shadowColor = '#00ff9f'
      ctx.shadowBlur = 6
      ctx.beginPath()
      for (let i = window - 1; i < allScores.length; i++) {
        const slice = allScores.slice(i - window + 1, i + 1)
        const avg   = slice.reduce((a, b) => a + b, 0) / slice.length
        const x = toX(i), y = toY(avg)
        i === window - 1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // ── Latest episode dot (highlighted) ─────────────────────
    if (allScores.length > 0) {
      const last = allScores[allScores.length - 1]
      const x = toX(allScores.length - 1)
      const y = toY(last)

      ctx.fillStyle = '#ffd32a'
      ctx.shadowColor = '#ffd32a'
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Value label
      ctx.fillStyle = '#ffd32a'
      ctx.font = '8px "Share Tech Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText(Math.round(last), x, y - 8)
    }

    // ── Trend label ───────────────────────────────────────────
    if (allScores.length >= 4) {
      const firstHalf  = allScores.slice(0, Math.floor(allScores.length / 2))
      const secondHalf = allScores.slice(Math.floor(allScores.length / 2))
      const avg1 = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
      const avg2 = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
      const trending = avg2 > avg1 + 2 ? '↑ IMPROVING' : avg2 < avg1 - 2 ? '↓ DECLINING' : '→ STABLE'
      const trendColor = avg2 > avg1 + 2 ? '#00ff9f' : avg2 < avg1 - 2 ? '#ff3355' : '#ffd32a'
      ctx.fillStyle = trendColor
      ctx.font = '8px "Share Tech Mono", monospace'
      ctx.textAlign = 'left'
      ctx.fillText(trending, 54, 20)
    }

  }, [episodeScores, currentScore])

  return (
    <div
      className="pixel-border flex flex-col"
      style={{ background: '#040a0d', flex: 1 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-3 py-2"
        style={{ borderBottom: '1px solid #0f2535' }}
      >
        <div className="w-2 h-2 rounded-full" style={{
          background: running ? '#00ff9f' : '#2a5540',
          boxShadow: running ? '0 0 6px #00ff9f' : 'none',
          animation: running ? 'thinkPulse 1s infinite' : 'none',
        }}/>
        <span style={{ fontSize: 7, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
          📈 LIVE LEARNING GRAPH — REWARD vs EPISODE
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 7, fontFamily: '"Share Tech Mono", monospace' }}>
          <span style={{ color: '#00aaff' }}>── RAW</span>
          <span style={{ color: '#2a5540', margin: '0 6px' }}>|</span>
          <span style={{ color: '#00ff9f' }}>── MOVING AVG</span>
          <span style={{ color: '#2a5540', margin: '0 6px' }}>|</span>
          <span style={{ color: '#ffd32a' }}>● LATEST</span>
        </span>
        <span style={{ fontSize: 7, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
          N={episodeScores.length} EPs
        </span>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={140}
        style={{ width: '100%', height: 140, imageRendering: 'pixelated' }}
      />
    </div>
  )
}
