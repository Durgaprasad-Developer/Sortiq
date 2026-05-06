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
      <div style={{ height: 12, background: '#0a1520', border: '1px solid #0f2535', position: 'relative', width: 80 }}>
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
      className="pixel-border scanlines relative flex items-center px-4 py-2 gap-3 md:gap-6 flex-wrap"
      style={{ background: '#040a0d', minHeight: 64, zIndex: 50 }}
    >
      {/* Logo */}
      <div style={{ fontSize: 11, whiteSpace: 'nowrap' }} className="glow-green flex-shrink-0">
        <span style={{ color: '#00ff9f' }}>◉ SORTIQ</span>
      </div>

      <div style={{ width: 1, height: 24, background: '#0f2535', flexShrink: 0 }} className="hidden sm:block"/>

      {/* Stats Group */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex flex-col items-center">
          <div style={{ fontSize: 9, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>EPS</div>
          <div style={{ fontSize: 18, color: '#00aaff', fontFamily: '"Share Tech Mono", monospace', lineHeight: 1 }} className="glow-blue">
            {episode}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div style={{ fontSize: 9, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>SCORE</div>
          <div style={{ fontSize: 18, fontFamily: '"Share Tech Mono", monospace', lineHeight: 1, color: score >= 0 ? '#00ff9f' : '#ff3355' }}>
            {score}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="flex items-center gap-4 flex-wrap">
        <ResourceBar label="STR" value={storage} max={6} color="#00ff9f" />
        <ResourceBar label="NRG" value={energy}  max={4} color="#ff6b35" />
      </div>

      {/* Controls - ALWAYS ON RIGHT */}
      <div className="flex items-center gap-4 ml-auto relative z-50">
        <div className="hidden md:flex items-center gap-2">
          <input type="range" min="1" max="5" value={speed} onChange={e => onSpeedChange(Number(e.target.value))}
            style={{ accentColor: '#00ff9f', width: 60 }}/>
          <span style={{ fontSize: 10, color: '#00ff9f', fontFamily: '"Share Tech Mono", monospace' }}>{speed}x</span>
        </div>
        
        <button
          onClick={running ? onPause : onStart}
          className="hover:brightness-125 transition-all"
          style={{
            fontSize: 9, padding: '10px 18px',
            background: running ? '#1a0a00' : '#001a0d',
            border: `1px solid ${running ? '#ff6b35' : '#00ff9f'}`,
            color: running ? '#ff6b35' : '#00ff9f',
            fontFamily: '"Press Start 2P", monospace', cursor: 'pointer',
            boxShadow: running ? '0 0 10px rgba(255,107,53,0.2)' : '0 0 10px rgba(0,255,159,0.2)',
          }}
        >
          {running ? 'PAUSE' : 'START'}
        </button>
      </div>
    </div>
  )
}
