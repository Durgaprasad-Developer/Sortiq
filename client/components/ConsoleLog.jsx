'use client'
import { useEffect, useRef } from 'react'

export default function ConsoleLog({ logs }) {
  const scrollRef = useRef(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  const getLineColor = (log) => {
    if (log.includes('✅'))       return '#00ff9f'
    if (log.includes('❌'))       return '#ff3355'
    if (log.includes('🏁') || log.includes('💀')) return '#ffd32a'
    if (log.includes('🎁') || log.includes('💸')) return '#00aaff'
    if (log.startsWith('//'))     return '#1a4030'
    return '#4a8870'
  }

  return (
    <div className="pixel-border flex flex-col flex-1 min-w-0" style={{ background: '#040a0d' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: '1px solid #0f2535' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#00ff9f', boxShadow: '0 0 6px #00ff9f' }}/>
        <span style={{ fontSize: 11, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
          AGENT.LOG — STDOUT
        </span>
      </div>

      {/* Lines */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4" 
        style={{ maxHeight: 180 }}
      >
        {logs.length === 0 && (
          <div style={{ fontSize: 13, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace' }}>
            // Press START to begin simulation
          </div>
        )}
        {logs.map((log, i) => (
          <div key={i} style={{ fontSize: 13, color: getLineColor(log), fontFamily: '"Share Tech Mono", monospace', lineHeight: 1.8 }}>
            <span style={{ color: '#0f2535', marginRight: 10 }}>{String(i + 1).padStart(3, '0')}</span>
            {log}
          </div>
        ))}
      </div>

      <div className="px-4 pb-2" style={{ fontSize: 14, color: '#00ff9f' }}>
        <span className="anim-think">█</span>
      </div>
    </div>
  )
}
