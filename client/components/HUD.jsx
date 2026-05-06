'use client'

function ResourceBar({ label, value, max, color }) {
  const pct = (value / max) * 100
  const low = pct <= 25
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between" style={{ fontSize: 11, fontFamily: '"Share Tech Mono", monospace' }}>
        <span style={{ color: low ? '#ff3355' : '#2a5540' }}>{label}</span>
        <span style={{ color: low ? '#ff3355' : color }}>{value}/{max}</span>
      </div>
      <div style={{ height: 12, background: '#0a1520', border: '1px solid #0f2535', position: 'relative', width: 110 }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          width: `${pct}%`,
          background: low ? '#ff3355' : color,
          boxShadow: `0 0 8px ${low ? '#ff3355' : color}88`,
          transition: 'width 0.4s ease',
        }}/>
        {Array.from({ length: max - 1 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, left: `${((i + 1) / max) * 100}%`, width: 1, height: '100%', background: '#0f2535' }}/>
        ))}
      </div>
    </div>
  )
}

export default function HUD({ episode, score, storage, energy, itemIndex, running, onStart, onPause, speed, onSpeedChange }) {
  return (
    <div
      className="pixel-border scanlines relative flex items-center px-5 py-3 gap-8"
      style={{ background: '#040a0d', flexWrap: 'nowrap', minHeight: 64 }}
    >
      {/* Logo */}
      <div style={{ fontSize: 13, whiteSpace: 'nowrap' }} className="glow-green">
        <span style={{ color: '#00ff9f' }}>◉ SORTIQ</span>
        <span style={{ color: '#2a5540', fontSize: 10 }}> // Q-AGENT</span>
      </div>

      <div style={{ width: 1, height: 28, background: '#0f2535', flexShrink: 0 }}/>

      {/* Episode */}
      <div className="flex flex-col items-center">
        <div style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>EPISODE</div>
        <div style={{ fontSize: 22, color: '#00aaff', fontFamily: '"Share Tech Mono", monospace', lineHeight: 1 }} className="glow-blue">
          {String(episode).padStart(3, '0')}
        </div>
      </div>

      {/* Score */}
      <div className="flex flex-col items-center">
        <div style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>SCORE</div>
        <div style={{ fontSize: 22, fontFamily: '"Share Tech Mono", monospace', lineHeight: 1, color: score >= 0 ? '#00ff9f' : '#ff3355' }}>
          {score >= 0 ? '+' : ''}{score}
        </div>
      </div>

      <div style={{ width: 1, height: 28, background: '#0f2535', flexShrink: 0 }}/>

      {/* Resources */}
      <ResourceBar label="💾 STORAGE" value={storage} max={6} color="#00ff9f" />
      <ResourceBar label="⚡ ENERGY"  value={energy}  max={4} color="#ff6b35" />

      <div style={{ width: 1, height: 28, background: '#0f2535', flexShrink: 0 }}/>

      {/* Progress */}
      <div className="flex flex-col items-center">
        <div style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>ITEMS</div>
        <div style={{ fontSize: 18, color: '#ffd32a', fontFamily: '"Share Tech Mono", monospace', lineHeight: 1 }}>
          {itemIndex + 1}<span style={{ fontSize: 12, color: '#2a5540' }}>/10</span>
        </div>
      </div>

      {/* Epsilon */}
      <div className="flex flex-col items-center">
        <div style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>EPSILON</div>
        <div style={{ fontSize: 14, color: '#ffd32a', fontFamily: '"Share Tech Mono", monospace', lineHeight: 1 }}>
          ε 0.0023
        </div>
      </div>

      {/* Controls pushed right */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>SPEED</span>
          <input type="range" min="1" max="5" value={speed} onChange={e => onSpeedChange(Number(e.target.value))}
            style={{ accentColor: '#00ff9f', width: 80 }}/>
          <span style={{ fontSize: 12, color: '#00ff9f', fontFamily: '"Share Tech Mono", monospace' }}>{speed}x</span>
        </div>
        <button
          onClick={running ? onPause : onStart}
          style={{
            fontSize: 10, padding: '8px 20px',
            background: running ? '#1a0a00' : '#001a0d',
            border: `2px solid ${running ? '#ff6b35' : '#00ff9f'}`,
            color: running ? '#ff6b35' : '#00ff9f',
            fontFamily: '"Press Start 2P", monospace', cursor: 'pointer',
            boxShadow: running ? '0 0 12px rgba(255,107,53,0.3)' : '0 0 12px rgba(0,255,159,0.3)',
          }}
        >
          {running ? '⏸ PAUSE' : '▶ START'}
        </button>
      </div>
    </div>
  )
}
