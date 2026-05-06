'use client'
import { COLOR_HEX } from '../lib/mockSimulation'

// ── Shape SVGs (pixel-art style, crispEdges) ──────────────────
const SHAPES = {
  Round: ({ fill, mode }) => (
    <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
      <circle cx="16" cy="16" r="13" fill={fill} stroke="#000" strokeWidth="2"/>
      {mode === 'fresh' && <>
        <ellipse cx="10" cy="10" rx="4" ry="3" fill="rgba(255,255,255,0.35)"/>
        <ellipse cx="8"  cy="8"  rx="1" ry="1" fill="rgba(255,255,255,0.6)"/>
      </>}
      {mode === 'degraded' && <>
        <rect x="14" y="27" width="3" height="4" fill={fill} opacity="0.8"/>
        <rect x="13" y="31" width="2" height="2" fill={fill} opacity="0.5"/>
        <circle cx="20" cy="12" r="3" fill="rgba(0,0,0,0.25)"/>
      </>}
    </svg>
  ),
  Oval: ({ fill, mode }) => (
    <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
      <ellipse cx="16" cy="16" rx="11" ry="14" fill={fill} stroke="#000" strokeWidth="2"/>
      {mode === 'fresh' && <>
        <ellipse cx="10" cy="9"  rx="3" ry="4" fill="rgba(255,255,255,0.35)"/>
      </>}
      {mode === 'degraded' && <>
        <rect x="15" y="29" width="3" height="3" fill={fill} opacity="0.7"/>
        <ellipse cx="20" cy="14" rx="3" ry="2" fill="rgba(0,0,0,0.2)"/>
      </>}
    </svg>
  ),
  Heart: ({ fill, mode }) => (
    <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
      <path
        d="M16 28 L4 14 Q4 7 10 7 Q13 7 16 11 Q19 7 22 7 Q28 7 28 14 Z"
        fill={fill} stroke="#000" strokeWidth="2"
      />
      {mode === 'fresh' && <ellipse cx="10" cy="11" rx="3" ry="2" fill="rgba(255,255,255,0.35)"/>}
      {mode === 'degraded' && <>
        <circle cx="16" cy="18" r="3" fill="rgba(0,0,0,0.2)"/>
        <rect x="15" y="27" width="2" height="3" fill={fill} opacity="0.7"/>
      </>}
    </svg>
  ),
  Pear: ({ fill, mode }) => (
    <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
      <ellipse cx="16" cy="21" rx="12" ry="10" fill={fill} stroke="#000" strokeWidth="2"/>
      <ellipse cx="16" cy="10" rx="6"  ry="7"  fill={fill} stroke="#000" strokeWidth="2"/>
      <rect    x="15" y="3"   width="2" height="4" fill="#4a3728" stroke="#000" strokeWidth="1"/>
      {mode === 'fresh' && <ellipse cx="12" cy="8" rx="2" ry="3" fill="rgba(255,255,255,0.3)"/>}
      {mode === 'degraded' && <>
        <circle cx="19" cy="22" r="3" fill="rgba(0,0,0,0.2)"/>
      </>}
    </svg>
  ),
  Shriveled: ({ fill, mode }) => (
    <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
      <polygon
        points="16,3 22,7 29,11 27,18 23,24 16,29 9,24 5,18 3,11 10,7"
        fill={fill} stroke="#000" strokeWidth="2"
      />
      <line x1="10" y1="10" x2="14" y2="16" stroke="rgba(0,0,0,0.3)" strokeWidth="2"/>
      <line x1="22" y1="10" x2="18" y2="16" stroke="rgba(0,0,0,0.3)" strokeWidth="2"/>
      <line x1="12" y1="22" x2="16" y2="18" stroke="rgba(0,0,0,0.3)" strokeWidth="2"/>
      {mode === 'degraded' && <>
        <circle cx="16" cy="16" r="3" fill="rgba(0,0,0,0.3)"/>
        <rect x="15" y="28" width="2" height="3" fill={fill} opacity="0.6"/>
      </>}
    </svg>
  ),
  Sunken: ({ fill, mode }) => (
    <svg viewBox="0 0 32 32" width="100%" height="100%" shapeRendering="crispEdges">
      <circle cx="16" cy="16" r="13" fill={fill} stroke="#000" strokeWidth="2"/>
      <ellipse cx="16" cy="11" rx="8" ry="6" fill="rgba(0,0,0,0.25)"/>
      <ellipse cx="16" cy="12" rx="5" ry="4" fill={fill} opacity="0.6"/>
      {mode === 'degraded' && <>
        <rect x="14" y="27" width="3" height="4" fill={fill} opacity="0.7"/>
        <circle cx="21" cy="20" r="2" fill="rgba(0,0,0,0.3)"/>
      </>}
    </svg>
  ),
}

const TEXTURE_BADGE = {
  Hard:   { icon: '🪨', label: 'HARD'   },
  Smooth: { icon: '✨', label: 'SMOOTH' },
  Firm:   { icon: '💪', label: 'FIRM'   },
  Juicy:  { icon: '💧', label: 'JUICY'  },
  Mushy:  { icon: '🫧', label: 'MUSHY'  },
  Slimy:  { icon: '🟢', label: 'SLIMY'  },
}

const FRESH_TEXTURES = ['Hard', 'Smooth', 'Firm']

export default function PixelItem({ item, animClass = '' }) {
  if (!item) return null

  const fill    = COLOR_HEX[item.color] || '#888'
  const mode    = FRESH_TEXTURES.includes(item.texture) ? 'fresh' : 'degraded'
  const ShapeSVG = SHAPES[item.shape] || SHAPES.Round
  const badge   = TEXTURE_BADGE[item.texture]

  return (
    <div
      className={`relative flex flex-col items-center ${animClass}`}
      style={{ width: 72, height: 72 }}
    >
      {/* Pixel glow ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: mode === 'fresh'
            ? `0 0 14px ${fill}88, 0 0 28px ${fill}33`
            : `0 0 10px rgba(80,40,0,0.5)`,
        }}
      />

      {/* Shape */}
      <div className="w-full h-full" style={{ filter: mode === 'degraded' ? 'saturate(0.6) brightness(0.8)' : 'none' }}>
        <ShapeSVG fill={fill} mode={mode} />
      </div>

      {/* Texture badge */}
      <div
        className="absolute -bottom-1 -right-1 text-[8px] px-1 rounded"
        style={{
          background: '#0a1520ee',
          border: '1px solid #0f2535',
          color: mode === 'fresh' ? '#00ff9f' : '#ff6b35',
          fontFamily: '"Share Tech Mono", monospace',
        }}
      >
        {badge.label}
      </div>
    </div>
  )
}
