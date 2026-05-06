'use client'

export default function ConveyorBelt({ item, phase, itemIndex }) {
  const getItemAnim = () => {
    if (phase === 'INCOMING')  return 'anim-slide-in'
    if (phase === 'TO_STORE')  return 'anim-to-store'
    if (phase === 'TO_CRUSH')  return 'anim-to-crusher'
    return ''
  }

  return (
    <div className="relative w-full flex flex-col gap-2">
      {/* Belt label */}
      <div className="flex items-center gap-2"
        style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 11, color: '#2a5540' }}>
        <span style={{ color: '#00ff9f' }}>►</span>
        CONVEYOR BELT
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#7effd4' }}>
          ITEM [{String(itemIndex + 1).padStart(2, '0')}/10]
        </span>
      </div>

      {/* Belt body */}
      <div className="relative flex items-center overflow-hidden scanlines"
        style={{ height: 110, background: '#050c12', border: '2px solid #0f2535', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)' }}>
        {/* Rails */}
        <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 5, background: '#0f2535' }}/>
        <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, height: 5, background: '#0f2535' }}/>
        {/* Moving belt */}
        <div className="belt-track absolute" style={{ top: 19, bottom: 19, left: 0, right: 0 }}/>

        {/* Item */}
        <div className="absolute flex items-center justify-center"
          style={{ left: '38%', top: '50%', transform: 'translateY(-50%)' }}>
          {item && (['INCOMING','THINKING','TO_STORE','TO_CRUSH'].includes(phase)) && (
            <div className={getItemAnim()} style={{ width: 80, height: 80 }}>
              {/* Simple colored shape placeholder — replace with PixelItem */}
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 52,
              }}>
                {item.features.shape === 'Round'     ? '🔵' :
                 item.features.shape === 'Oval'      ? '🟣' :
                 item.features.shape === 'Heart'     ? '❤️' :
                 item.features.shape === 'Pear'      ? '🍐' :
                 item.features.shape === 'Shriveled' ? '🟫' : '⚫'}
              </div>
            </div>
          )}
        </div>

        {/* Phase status */}
        <div className="absolute bottom-2 left-3"
          style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 12 }}>
          {phase === 'INCOMING'    && <span style={{ color: '#00aaff' }}>[ INCOMING... ]</span>}
          {phase === 'THINKING'    && <span style={{ color: '#ffd32a' }} className="anim-think">[ AGENT ANALYZING ]</span>}
          {phase === 'TO_STORE'    && <span style={{ color: '#00ff9f' }}>[ → STORE ]</span>}
          {phase === 'TO_CRUSH'    && <span style={{ color: '#ff6b35' }}>[ → CRUSHER ]</span>}
          {phase === 'IDLE'        && <span style={{ color: '#2a5540' }}>[ AWAITING NEXT ITEM ]</span>}
          {phase === 'EPISODE_END' && <span style={{ color: '#ffd32a' }}>[ EPISODE COMPLETE ]</span>}
        </div>
      </div>

      {/* Feature tags */}
      {item && (
        <div className="flex gap-3 items-center"
          style={{ fontFamily: '"Share Tech Mono", monospace', fontSize: 13 }}>
          <span style={{ color: '#2a5540' }}>FEATURES:</span>
          {[item.features.color, item.features.shape, item.features.texture].map((f, i) => (
            <span key={i} style={{
              color: '#00aaff', padding: '2px 8px',
              background: 'rgba(0,170,255,0.08)',
              border: '1px solid rgba(0,170,255,0.2)',
            }}>{f}</span>
          ))}
        </div>
      )}
    </div>
  )
}
