'use client'

export default function AgentBrain({ qValues, phase, lastAction, isCorrect }) {
  const storeQ = qValues ? parseFloat(qValues.STORE) : 0
  const crushQ = qValues ? parseFloat(qValues.CRUSH) : 0
  const absMax  = Math.max(Math.abs(storeQ), Math.abs(crushQ), 0.1)
  const storePct = qValues ? Math.max(0, (storeQ / absMax) * 100) : 0
  const crushPct = qValues ? Math.max(0, (crushQ / absMax) * 100) : 0

  const isThinking = phase === 'THINKING'
  const isIncoming = phase === 'INCOMING'
  const hasDecided = phase === 'TO_STORE' || phase === 'TO_CRUSH'

  const statusText = () => {
    if (isIncoming) return '👁️ SCANNING ITEM...'
    if (isThinking)  return '⚡ COMPUTING Q-VALUES...'
    if (hasDecided)  return `🎯 ACTION: ${lastAction}`
    return '💤 STANDBY'
  }
  const statusColor = () => {
    if (isThinking)  return '#ffd32a'
    if (hasDecided)  return '#00ff9f'
    return '#2a5540'
  }

  return (
    <div className="pixel-border flex flex-col gap-4 p-4" style={{ background: '#070d10', minWidth: 260 }}>

      <div style={{ fontSize: 11, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
        🧠 AGENT BRAIN
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{
          background:  isThinking ? '#ffd32a' : hasDecided ? '#00ff9f' : '#1a3320',
          boxShadow:   isThinking ? '0 0 10px #ffd32a' : hasDecided ? '0 0 10px #00ff9f' : 'none',
          animation:   isThinking ? 'thinkPulse 0.5s infinite' : 'none',
        }}/>
        <span style={{ fontSize: 13, color: statusColor(), fontFamily: '"Share Tech Mono", monospace' }}
          className={isThinking ? 'anim-think' : ''}>
          {statusText()}
        </span>
      </div>

      {/* Q bars */}
      <div className="flex flex-col gap-3">
        {/* STORE */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between" style={{ fontSize: 12, fontFamily: '"Share Tech Mono", monospace' }}>
            <span style={{ color: '#00ff9f' }}>🗃️ Q[STORE]</span>
            <span style={{ color: qValues ? '#00ff9f' : '#2a5540', fontSize: 14 }}>
              {qValues ? storeQ.toFixed(2) : '???.??'}
            </span>
          </div>
          <div style={{ height: 18, background: '#0a1520', border: '1px solid #0f2535', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%', width: `${storePct}%`,
              background: hasDecided && lastAction === 'STORE' ? (isCorrect ? '#00ff9f' : '#ff3355') : '#006644',
              boxShadow: hasDecided && lastAction === 'STORE' && isCorrect ? '0 0 12px #00ff9f' : 'none',
              transition: 'width 0.5s ease, background 0.3s',
            }}/>
            {[25, 50, 75].map(p => (
              <div key={p} style={{ position: 'absolute', top: 0, left: `${p}%`, width: 1, height: '100%', background: '#0f2535' }}/>
            ))}
          </div>
        </div>

        {/* CRUSH */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between" style={{ fontSize: 12, fontFamily: '"Share Tech Mono", monospace' }}>
            <span style={{ color: '#ff6b35' }}>⚙️ Q[CRUSH]</span>
            <span style={{ color: qValues ? '#ff6b35' : '#2a5540', fontSize: 14 }}>
              {qValues ? crushQ.toFixed(2) : '???.??'}
            </span>
          </div>
          <div style={{ height: 18, background: '#0a1520', border: '1px solid #0f2535', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%', width: `${crushPct}%`,
              background: hasDecided && lastAction === 'CRUSH' ? (isCorrect ? '#ff6b35' : '#ff3355') : '#3a1800',
              boxShadow: hasDecided && lastAction === 'CRUSH' && isCorrect ? '0 0 12px #ff6b35' : 'none',
              transition: 'width 0.5s ease, background 0.3s',
            }}/>
            {[25, 50, 75].map(p => (
              <div key={p} style={{ position: 'absolute', top: 0, left: `${p}%`, width: 1, height: '100%', background: '#0f2535' }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Verdict */}
      {hasDecided && (
        <div style={{
          fontSize: 13, fontFamily: '"Share Tech Mono", monospace',
          color: isCorrect ? '#00ff9f' : '#ff3355',
          borderTop: '1px solid #0f2535', paddingTop: 8,
        }}>
          {isCorrect ? '✅ CORRECT SORT' : '❌ WRONG SORT'}
          <span style={{ float: 'right' }}>{isCorrect ? '+8 REW' : '−8 REW'}</span>
        </div>
      )}
    </div>
  )
}
