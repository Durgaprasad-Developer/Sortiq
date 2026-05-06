// ── Color hex values ───────────────────────────────────────────
export const COLOR_HEX = {
  Red:    '#e74c3c',
  Yellow: '#f1c40f',
  Purple: '#9b59b6',
  Green:  '#2ecc71',
  Orange: '#e67e22',
  Black:  '#2c3e50',
  Brown:  '#8B5E3C',
  Grey:   '#95a5a6',
}

// ── Mock episodes – 10 items each ─────────────────────────────
export const MOCK_EPISODES = [
  [
    { color:'Red',    shape:'Round',     texture:'Smooth', type:'FRUIT' },
    { color:'Black',  shape:'Shriveled', texture:'Slimy',  type:'WASTE' },
    { color:'Yellow', shape:'Oval',      texture:'Firm',   type:'FRUIT' },
    { color:'Brown',  shape:'Shriveled', texture:'Mushy',  type:'WASTE' },
    { color:'Green',  shape:'Heart',     texture:'Smooth', type:'FRUIT' },
    { color:'Grey',   shape:'Sunken',    texture:'Slimy',  type:'WASTE' },
    { color:'Orange', shape:'Pear',      texture:'Hard',   type:'FRUIT' },
    { color:'Purple', shape:'Round',     texture:'Mushy',  type:'FRUIT' },  // ambiguous
    { color:'Red',    shape:'Shriveled', texture:'Slimy',  type:'WASTE' },  // ambiguous
    { color:'Yellow', shape:'Round',     texture:'Juicy',  type:'FRUIT' },
  ],
  [
    { color:'Brown',  shape:'Sunken',    texture:'Mushy',  type:'WASTE' },
    { color:'Green',  shape:'Pear',      texture:'Hard',   type:'FRUIT' },
    { color:'Grey',   shape:'Shriveled', texture:'Slimy',  type:'WASTE' },
    { color:'Red',    shape:'Heart',     texture:'Smooth', type:'FRUIT' },
    { color:'Black',  shape:'Sunken',    texture:'Mushy',  type:'WASTE' },
    { color:'Yellow', shape:'Oval',      texture:'Juicy',  type:'FRUIT' },
    { color:'Purple', shape:'Shriveled', texture:'Mushy',  type:'WASTE' },
    { color:'Orange', shape:'Round',     texture:'Smooth', type:'FRUIT' },
    { color:'Grey',   shape:'Oval',      texture:'Hard',   type:'WASTE' },   // ambiguous
    { color:'Green',  shape:'Round',     texture:'Smooth', type:'FRUIT' },
  ],
]

// ── Agent decision (mock Q-values) ─────────────────────────────
// Trained agent is mostly correct but can be uncertain on ambiguous items
export function getAgentDecision(item) {
  const isAmbiguous =
    (item.texture === 'Mushy' && item.type === 'FRUIT') ||
    (item.texture === 'Slimy' && item.type === 'WASTE' && item.color === 'Red') ||
    (item.texture === 'Hard'  && item.type === 'WASTE')

  const correctAction = item.type === 'FRUIT' ? 'STORE' : 'CRUSH'
  const wrongAction   = item.type === 'FRUIT' ? 'CRUSH' : 'STORE'

  let storeQ, crushQ

  if (isAmbiguous) {
    // Agent is uncertain
    storeQ = 3.2 + (Math.random() - 0.5) * 4
    crushQ = 3.0 + (Math.random() - 0.5) * 4
  } else if (correctAction === 'STORE') {
    storeQ = 7.5 + Math.random() * 2
    crushQ = -4.0 + Math.random() * 2
  } else {
    crushQ = 7.5 + Math.random() * 2
    storeQ = -4.0 + Math.random() * 2
  }

  const action = storeQ >= crushQ ? 'STORE' : 'CRUSH'
  const isCorrect = action === correctAction
  const reward = isCorrect ? 8 : -8

  return {
    action,
    isCorrect,
    reward,
    qValues: { STORE: storeQ.toFixed(2), CRUSH: crushQ.toFixed(2) }
  }
}

// ── Random agent decision ──────────────────────────────────────
export function getRandomDecision(item) {
  const action = Math.random() > 0.5 ? 'STORE' : 'CRUSH'
  const correctAction = item.type === 'FRUIT' ? 'STORE' : 'CRUSH'
  const isCorrect = action === correctAction
  return { action, isCorrect, reward: isCorrect ? 8 : -8, qValues: null }
}
