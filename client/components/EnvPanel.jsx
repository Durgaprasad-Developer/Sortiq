'use client'

function StatBar({ label, value, pct, color }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between" style={{ fontSize: 11, fontFamily: '"Share Tech Mono", monospace' }}>
        <span style={{ color: '#2a5540' }}>{label}</span>
        <span style={{ color, fontSize: 13 }}>{value}</span>
      </div>
      <div style={{ height: 10, background: '#0a1520', border: '1px solid #0f2535', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          width: `${Math.min(100, pct)}%`,
          background: color,
          boxShadow: `0 0 6px ${color}66`,
          transition: 'width 0.5s ease',
        }}/>
      </div>
    </div>
  )
}

function AccuracyGauge({ pct }) {
  const color = pct >= 75 ? '#00ff9f' : pct >= 50 ? '#ffd32a' : '#ff3355'
  const r = 28, circ = 2 * Math.PI * r
  return (
    <div className="flex items-center gap-4 py-2">
      <div style={{ position: 'relative', width: 70, height: 70, flexShrink: 0 }}>
        <svg viewBox="0 0 70 70" width="70" height="70">
          <circle cx="35" cy="35" r={r} fill="none" stroke="#0f2535" strokeWidth="6"/>
          <circle
            cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct / 100)}
            strokeLinecap="square"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '35px 35px', filter: `drop-shadow(0 0 4px ${color})`, transition: 'stroke-dashoffset 0.5s ease' }}
          />
          <text x="35" y="40" textAnchor="middle" fontSize="14" fill={color} fontFamily='"Share Tech Mono", monospace'>
            {Math.round(pct)}%
          </text>
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 14, color, fontFamily: '"Share Tech Mono", monospace' }}>ACCURACY</div>
        <div style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>OVERALL SORT RATE</div>
      </div>
    </div>
  )
}

export default function EnvPanel({ stats }) {
  const {
    totalItems = 0, correctItems = 0,
    fruitTotal = 0, fruitCorrect = 0,
    wasteTotal = 0, wasteCorrect = 0,
    actionStore = 0, actionCrush = 0,
    rewardPlus = 0, rewardMinus = 0,
    episodesCompleted = 0, episodesFailed = 0,
  } = stats

  const accuracy  = totalItems ? (correctItems / totalItems * 100) : 0
  const fruitAcc  = fruitTotal ? (fruitCorrect / fruitTotal * 100) : 0
  const wasteAcc  = wasteTotal ? (wasteCorrect / wasteTotal * 100) : 0
  const storeRat  = totalItems ? (actionStore  / totalItems * 100) : 50
  const epRate    = (episodesCompleted + episodesFailed)
    ? (episodesCompleted / (episodesCompleted + episodesFailed) * 100) : 0

  return (
    <div
      className="pixel-border flex flex-col"
      style={{ background: '#040a0d', width: 280, minWidth: 280, overflowY: 'auto' }}
    >
      {/* ── ENV RULES ────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #0f2535', padding: '10px 14px' }}>
        <div style={{ fontSize: 11, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace', marginBottom: 8 }}>
          🌍 ENVIRONMENT RULES
        </div>

        {/* FRUIT */}
        <div className="flex items-center gap-3 mb-2 p-2"
          style={{ background: 'rgba(0,255,159,0.04)', border: '1px solid rgba(0,255,159,0.12)' }}>
          <span style={{ fontSize: 22 }}>🍎</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#00ff9f', fontFamily: '"Share Tech Mono", monospace' }}>FRUIT → 🗃️ STORE</div>
            <div style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>Round · Oval · Heart · Pear</div>
          </div>
          <span style={{ fontSize: 16, color: '#00ff9f', fontFamily: '"Share Tech Mono", monospace', fontWeight: 'bold' }}>+8</span>
        </div>

        {/* WASTE */}
        <div className="flex items-center gap-3 mb-3 p-2"
          style={{ background: 'rgba(255,107,53,0.04)', border: '1px solid rgba(255,107,53,0.12)' }}>
          <span style={{ fontSize: 22 }}>🗑️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#ff6b35', fontFamily: '"Share Tech Mono", monospace' }}>WASTE → ⚙️ CRUSHER</div>
            <div style={{ fontSize: 10, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>Shriveled · Sunken shapes</div>
          </div>
          <span style={{ fontSize: 16, color: '#ff6b35', fontFamily: '"Share Tech Mono", monospace', fontWeight: 'bold' }}>+8</span>
        </div>

        {/* Reward table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4px 12px', fontSize: 12, fontFamily: '"Share Tech Mono", monospace' }}>
          <span style={{ color: '#2a5540' }}>Wrong sort</span>     <span style={{ color: '#ff3355' }}>−8 pts</span>
          <span style={{ color: '#2a5540' }}>All 10 done</span>    <span style={{ color: '#ffd32a' }}>+15 pts</span>
          <span style={{ color: '#2a5540' }}>Out of resources</span><span style={{ color: '#ff3355' }}>−20 pts</span>
        </div>
      </div>

      {/* ── FEATURE HINTS ───────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #0f2535', padding: '10px 14px' }}>
        <div style={{ fontSize: 11, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace', marginBottom: 6 }}>
          🔍 HOW TO IDENTIFY
        </div>
        <div style={{ fontSize: 11, fontFamily: '"Share Tech Mono", monospace', lineHeight: 2 }}>
          <div><span style={{ color: '#00ff9f' }}>✓ FRUIT:</span> <span style={{ color: '#4a8870' }}>Hard · Smooth · Firm texture</span></div>
          <div style={{ color: '#4a8870', paddingLeft: 16 }}>Red · Yellow · Green · Orange</div>
          <div style={{ marginTop: 4 }}><span style={{ color: '#ff6b35' }}>⚠ WASTE:</span> <span style={{ color: '#4a8870' }}>Mushy · Slimy texture</span></div>
          <div style={{ color: '#4a8870', paddingLeft: 16 }}>Black · Brown · Grey</div>
        </div>
        <div style={{ fontSize: 11, color: '#ffd32a', fontFamily: '"Share Tech Mono", monospace', marginTop: 6 }}>
          ⚡ Some items are AMBIGUOUS
        </div>
      </div>

      {/* ── SESSION ANALYTICS ───────────────────────────── */}
      <div style={{ padding: '10px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 11, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
          📊 LIVE ANALYTICS
        </div>

        <AccuracyGauge pct={accuracy} />

        <StatBar label="🍎 FRUIT ACCURACY" value={`${Math.round(fruitAcc)}%`} pct={fruitAcc}  color="#00ff9f" />
        <StatBar label="🗑️ WASTE ACCURACY"  value={`${Math.round(wasteAcc)}%`} pct={wasteAcc}  color="#ff6b35" />
        <StatBar label="🎯 EPISODE DONE"    value={`${Math.round(epRate)}%`}   pct={epRate}    color="#ffd32a" />

        {/* Action split */}
        <div className="flex flex-col gap-1">
          <div style={{ fontSize: 11, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>ACTION SPLIT</div>
          <div style={{ height: 18, background: '#0a1520', border: '1px solid #0f2535', position: 'relative', display: 'flex' }}>
            <div style={{ width: `${storeRat}%`, background: '#006644', transition: 'width 0.5s' }}/>
            <div style={{ flex: 1, background: '#3a1800' }}/>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
              <span style={{ fontSize: 11, color: '#00ff9f', fontFamily: '"Share Tech Mono", monospace' }}>🗃️ STORE {actionStore}</span>
              <span style={{ fontSize: 11, color: '#ff6b35', fontFamily: '"Share Tech Mono", monospace' }}>⚙️ CRUSH {actionCrush}</span>
            </div>
          </div>
        </div>

        {/* Counts */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontFamily: '"Share Tech Mono", monospace', paddingTop: 4, borderTop: '1px solid #0f2535' }}>
          <span style={{ color: '#00ff9f' }}>✅ +8 × {rewardPlus}</span>
          <span style={{ color: '#ff3355' }}>❌ −8 × {rewardMinus}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: '"Share Tech Mono", monospace' }}>
          <span style={{ color: '#ffd32a' }}>🏁 {episodesCompleted} done</span>
          <span style={{ color: '#ff3355' }}>💀 {episodesFailed} failed</span>
        </div>
      </div>
    </div>
  )
}
