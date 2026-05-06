'use client'

export default function AgentInfo({ episode, episodeScores }) {
  const avg = episodeScores.length
    ? (episodeScores.reduce((a, b) => a + b, 0) / episodeScores.length).toFixed(1)
    : '---'

  const best = episodeScores.length ? Math.max(...episodeScores) : '---'

  // Simulated epsilon decay (matching agent.py: eps *= 0.99 per episode)
  const epsilon = episodeScores.length
    ? (Math.pow(0.99, (episode - 1) * 10)).toFixed(4)
    : '1.0000'

  const rows = [
    { icon: '🤖', label: 'AGENT TYPE',    value: 'Q-LEARNING',      color: '#00ff9f' },
    { icon: '🧠', label: 'ALGORITHM',     value: 'TEMPORAL DIFF.',   color: '#00ff9f' },
    { icon: '📐', label: 'ALPHA  (α)',    value: '0.1',              color: '#00aaff' },
    { icon: '🔮', label: 'GAMMA  (γ)',    value: '0.95',             color: '#00aaff' },
    { icon: '⚡', label: 'EPSILON (ε)',   value: epsilon,            color: '#ffd32a' },
    { icon: '🗂️', label: 'STATE SPACE',  value: '~10,080',          color: '#7effd4' },
    { icon: '🎮', label: 'ACTIONS',       value: 'STORE | CRUSH',    color: '#7effd4' },
    { icon: '🏆', label: 'BEST SCORE',    value: String(best),       color: '#ffd32a' },
    { icon: '📊', label: 'AVG SCORE',     value: avg,                color: '#00ff9f' },
    { icon: '🔁', label: 'EPISODES',      value: String(episode - 1),color: '#00aaff' },
  ]

  return (
    <div
      className="pixel-border flex flex-col"
      style={{ background: '#040a0d', width: 210, minWidth: 210 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: '1px solid #0f2535' }}
      >
        <span style={{ fontSize: 7, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
          🤖 AGENT.CONFIG
        </span>
      </div>

      {/* Info rows */}
      <div className="flex flex-col p-2 gap-1">
        {rows.map(({ icon, label, value, color }) => (
          <div
            key={label}
            className="flex justify-between items-center"
            style={{ fontSize: 7, fontFamily: '"Share Tech Mono", monospace', padding: '2px 4px', borderBottom: '1px solid #050d14' }}
          >
            <span style={{ color: '#2a5540' }}>{icon} {label}</span>
            <span style={{ color }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Exploration status bar */}
      <div className="px-2 pb-2 flex flex-col gap-1 mt-1">
        <div style={{ fontSize: 7, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
          EXPLORATION MODE
        </div>
        <div style={{ height: 6, background: '#0a1520', border: '1px solid #0f2535', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${Math.max(0, parseFloat(epsilon) * 100)}%`,
            background: '#ffd32a',
            boxShadow: '0 0 4px #ffd32a',
            transition: 'width 0.5s ease',
          }}/>
        </div>
        <div style={{ fontSize: 6, fontFamily: '"Share Tech Mono", monospace', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#ffd32a' }}>EXPLORE</span>
          <span style={{ color: '#00ff9f' }}>EXPLOIT</span>
        </div>
      </div>
    </div>
  )
}
