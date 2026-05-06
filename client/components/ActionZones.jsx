'use client'

export default function ActionZones({ phase, lastAction, isCorrect, storage, energy }) {
  const storeActive   = phase === 'TO_STORE'
  const crusherActive = phase === 'TO_CRUSH'

  return (
    <div className="flex flex-col gap-3" style={{ width: 180, minWidth: 180 }}>

      {/* STORE BIN */}
      <div
        className={`pixel-border-green flex flex-col items-center justify-center gap-2 p-4 relative overflow-hidden ${storeActive ? 'anim-store-flash' : ''}`}
        style={{ background: '#030d08', flex: 1, minHeight: 120 }}
      >
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: `${((6 - storage) / 6) * 100}%`,
          background: 'rgba(0,255,159,0.06)',
          borderTop: '1px solid rgba(0,255,159,0.12)',
          transition: 'height 0.5s ease',
        }}/>
        <div style={{ fontSize: 40, lineHeight: 1 }} className="anim-pixel-float">🗃️</div>
        <div style={{ fontSize: 14, color: '#00ff9f', fontFamily: '"Share Tech Mono", monospace' }} className="glow-green">
          STORE
        </div>
        <div style={{ fontSize: 12, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
          {storage}/6 LEFT
        </div>
        {storeActive && (
          <div style={{ fontSize: 14, color: isCorrect ? '#00ff9f' : '#ff3355', fontFamily: '"Share Tech Mono", monospace' }}
            className="anim-think">
            {isCorrect ? '✅ FRUIT!' : '❌ WASTE!'}
          </div>
        )}
      </div>

      {/* CRUSHER */}
      <div
        className={`pixel-border-orange flex flex-col items-center justify-center gap-2 p-4 relative overflow-hidden ${crusherActive ? 'anim-crush-shake' : ''}`}
        style={{ background: '#0d0500', flex: 1, minHeight: 120 }}
      >
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: `${((4 - energy) / 4) * 100}%`,
          background: 'rgba(255,107,53,0.06)',
          borderTop: '1px solid rgba(255,107,53,0.12)',
          transition: 'height 0.5s ease',
        }}/>
        <div style={{ fontSize: 40, lineHeight: 1 }}>⚙️</div>
        <div style={{ fontSize: 14, color: '#ff6b35', fontFamily: '"Share Tech Mono", monospace' }} className="glow-orange">
          CRUSHER
        </div>
        <div style={{ fontSize: 12, color: '#3a1800', fontFamily: '"Share Tech Mono", monospace' }}>
          {energy}/4 LEFT
        </div>
        {crusherActive && (
          <div style={{ fontSize: 14, color: isCorrect ? '#ff6b35' : '#ff3355', fontFamily: '"Share Tech Mono", monospace' }}
            className="anim-think">
            {isCorrect ? '✅ WASTE!' : '❌ FRUIT!'}
          </div>
        )}
      </div>
    </div>
  )
}
