'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import HUD          from '../components/HUD'
import ConveyorBelt from '../components/ConveyorBelt'
import AgentBrain   from '../components/AgentBrain'
import ActionZones  from '../components/ActionZones'
import ConsoleLog   from '../components/ConsoleLog'
import LiveGraph    from '../components/LiveGraph'
import EnvPanel     from '../components/EnvPanel'
import TechBlog     from '@/components/TechBlog'

const MatrixBackground = dynamic(() => import('../components/MatrixBackground'), { ssr: false })

const API_URL = ''; // Relative path for unified HF deployment

const TIMING = (speed) => ({
  INCOMING:    1100 / speed,
  THINKING:    900  / speed,
  ACTION:      700  / speed,
  BETWEEN:     300  / speed,
  EPISODE_END: 1400 / speed,
})

const INITIAL_STATS = {
  totalItems:         0,
  correctItems:       0,
  fruitTotal:         0,
  fruitCorrect:       0,
  wasteTotal:         0,
  wasteCorrect:       0,
  actionStore:        0,
  actionCrush:        0,
  rewardPlus:         0,
  rewardMinus:        0,
  episodesCompleted:  0,
  episodesFailed:     0,
}

const INITIAL_STATE = {
  phase:         'IDLE',
  episode:       1,
  itemIndex:     0,
  score:         0,
  storage:       6,
  energy:        4,
  currentItem:   null,
  lastAction:    null,
  lastCorrect:   null,
  qValues:       null,
  logs:          [],
  episodeScores: [],
  stats:         { ...INITIAL_STATS },
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export default function Home() {
  const [state, setState]    = useState(INITIAL_STATE)
  const [running, setRunning]  = useState(false)
  const [speed, setSpeed]    = useState(2)
  const [episodeBanner, setEpisodeBanner] = useState(null)
  const [backendStatus, setBackendStatus] = useState('CHECKING');

  const runningRef = useRef(false);
  const stateRef   = useRef(state)
  stateRef.current = state
  runningRef.current = running;

  const addLog = useCallback((msg) => {
    setState(s => ({ ...s, logs: [...s.logs.slice(-100), msg] }))
  }, [])

  // ── Check Backend Health ─────────────────────────────────────
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_URL}/health`);
        if (res.ok) setBackendStatus('ONLINE');
        else setBackendStatus('OFFLINE');
      } catch (e) {
        setBackendStatus('OFFLINE');
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  // ── Reset Episode from Backend ───────────────────────────────
  const resetEpisode = async (episodeNum) => {
    try {
      const res = await fetch(`${API_URL}/reset`, { method: 'POST' });
      const data = await res.json();
      
      const nextState = {
        ...stateRef.current,
        phase:         'IDLE',
        episode:       episodeNum,
        itemIndex:     0,
        score:         0,
        storage:       data.storage,
        energy:        data.energy,
        currentItem:   data.item,
        lastAction:    null,
        lastCorrect:   null,
        qValues:       null,
      };
      setState(nextState);
      return nextState;
    } catch (e) {
      addLog(`❌ ERROR: Backend reset failed`);
      setRunning(false);
      return null;
    }
  };

  // ── Main loop (Async/Await version for clarity) ─────────────
  const runSimulation = useCallback(async () => {
    while (runningRef.current) {
      const s = stateRef.current;
      const T = TIMING(speed);

      // 1. INCOMING
      addLog(`// EP:${String(s.episode).padStart(3,'0')} ITEM ${s.itemIndex + 1}/10`);
      setState(prev => ({ ...prev, phase: 'INCOMING' }));
      await delay(T.INCOMING);
      if (!runningRef.current) break;

      // 2. THINKING
      setState(prev => ({ ...prev, phase: 'THINKING' }));
      try {
        const res = await fetch(`${API_URL}/agent-step`, { method: 'POST' });
        const decision = await res.json();
        
        const item = decision.item;
        const isFruit = item.type === 'FRUIT';
        const preferred = decision.q_values.STORE >= decision.q_values.CRUSH ? 'STORE' : 'CRUSH'
        const confidence = Math.abs(decision.q_values.STORE - decision.q_values.CRUSH).toFixed(1)

        addLog(`   ${isFruit ? '🍎' : '🗑️'} ${item.features.color}-${item.features.shape}-${item.features.texture}`)
        addLog(`   🤔 Agent leans toward ${preferred} (gap: ${confidence})`)
        setState(prev => ({ ...prev, qValues: decision.q_values }));
        
        await delay(T.THINKING);
        if (!runningRef.current) break;

        // 3. ACTION
        const { action, is_correct: isCorrect, reward, done, score, storage, energy } = decision;
        const newStats = { ...stateRef.current.stats };
        newStats.totalItems++;
        newStats.actionStore += (action === 'STORE' ? 1 : 0);
        newStats.actionCrush += (action === 'CRUSH' ? 1 : 0);
        if (isFruit) { newStats.fruitTotal++; if (isCorrect) newStats.fruitCorrect++; }
        else         { newStats.wasteTotal++; if (isCorrect) newStats.wasteCorrect++; }
        if (isCorrect) { newStats.correctItems++; newStats.rewardPlus++; }
        else           { newStats.rewardMinus++; }

        addLog(isCorrect
          ? `   ✅ Correct! ${item.type} → ${action}  (+${reward} pts)`
          : `   ❌ Wrong!  ${item.type} should NOT go to ${action}  (${reward} pts)`)

        setState(prev => ({
          ...prev,
          phase:       action === 'STORE' ? 'TO_STORE' : 'TO_CRUSH',
          lastAction:  action,
          lastCorrect: isCorrect,
          score:       score,
          storage:     storage,
          energy:      energy,
          stats:       newStats,
        }));

        await delay(T.ACTION);
        if (!runningRef.current) break;

        // 4. END CHECK
        const resourceFail = storage < 0 || energy < 0;
        if (done || resourceFail) {
          const finStats = { ...newStats };
          if (resourceFail) finStats.episodesFailed++;
          else              finStats.episodesCompleted++;

          addLog(`// ─────────────────────────────`);
          addLog(resourceFail
            ? `// 💀 EP ${s.episode} FAILED — resources depleted`
            : `// 🏁 EP ${s.episode} COMPLETE — all items sorted!`);
          addLog(`   🏆 FINAL SCORE: ${score}`);
          addLog(`// ─────────────────────────────`);

          setState(prev => ({
            ...prev,
            phase:         'EPISODE_END',
            episodeScores: [...prev.episodeScores, score],
            stats:         finStats,
          }));

          setEpisodeBanner(resourceFail
            ? `💀 EP ${s.episode} FAILED — ${score} pts`
            : `🏁 EP ${s.episode} DONE — ${score} pts`);
          
          await delay(T.EPISODE_END);
          setEpisodeBanner(null);
          if (!runningRef.current) break;

          const nextS = await resetEpisode(s.episode + 1);
          if (!nextS) break;
        } else {
          setState(prev => ({ ...prev, phase: 'IDLE', itemIndex: prev.itemIndex + 1 }));
          await delay(T.BETWEEN);
        }
      } catch (err) {
        console.error("Simulation error:", err);
        addLog(`❌ ERROR: API connection lost`);
        addLog(`🔄 Attempting to reconnect...`);
        // Wait and check health
        await delay(2000);
        const alive = await checkBackend();
        if (!alive) {
          addLog(`⚠️ Backend is OFFLINE. Simulation stopped.`);
          setRunning(false);
          break;
        } else {
          addLog(`✅ Reconnected! Resuming...`);
          continue; // Try again
        }
      }
    }
  }, [speed, addLog]);

  useEffect(() => {
    if (running) {
      runSimulation();
    }
  }, [running, runSimulation]);

  const handleStart = async () => {
    if (backendStatus !== 'ONLINE') {
      addLog(`⚠️ Backend is OFFLINE. Cannot start.`);
      return;
    }
    setRunning(true);
  }
  
  const handlePause = () => { setRunning(false); }

  const {
    phase, episode, itemIndex, score, storage, energy,
    currentItem, lastAction, lastCorrect, qValues,
    logs, episodeScores, stats,
  } = state

  return (
    <main className="relative min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <MatrixBackground />

      {episodeBanner && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none anim-episode-banner">
          <div style={{
            fontSize: 12, color: '#ffd32a', fontFamily: '"Press Start 2P", monospace',
            padding: '14px 28px', background: '#070d10ee',
            border: '2px solid #ffd32a', boxShadow: '0 0 40px rgba(255,211,42,0.4)',
          }}>
            {episodeBanner}
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-2 p-3" style={{ height: '75vh' }}>

        <HUD
          episode={episode} score={score} storage={storage} energy={energy}
          itemIndex={itemIndex} running={running}
          onStart={handleStart} onPause={handlePause}
          speed={speed} onSpeedChange={setSpeed}
        />

        <div className="flex gap-2 flex-1 min-h-0">
          <EnvPanel stats={stats} episode={episode} />

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="pixel-border p-2 scanlines relative" style={{ background: '#040a0d' }}>
              <ConveyorBelt item={currentItem} phase={phase} itemIndex={itemIndex} />
            </div>

            <div className="flex gap-2" style={{ flex: '0 0 auto' }}>
              <AgentBrain qValues={qValues} phase={phase} lastAction={lastAction} isCorrect={lastCorrect} />
              <ConsoleLog logs={logs} />
            </div>

            <LiveGraph episodeScores={episodeScores} currentScore={score} running={running} />
          </div>

          <ActionZones
            phase={phase} lastAction={lastAction} isCorrect={lastCorrect}
            storage={storage} energy={energy}
          />
        </div>

        <div style={{
          fontSize: 6, color: '#2a5540', fontFamily: '"Share Tech Mono", monospace',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>⚡ SORTIQ // Q-LEARNING VISUALIZER // ENV: {backendStatus === 'ONLINE' ? 'HF-SPACES' : 'SIMULATED'}</span>
          <span style={{ color: backendStatus === 'ONLINE' ? '#00ff9f' : '#ff3355' }}>BACKEND: {backendStatus}</span>
          <span>ACCURACY: {stats.totalItems ? Math.round(stats.correctItems / stats.totalItems * 100) : '--'}% · ITEMS: {stats.totalItems} · EPS: {episode - 1}</span>
        </div>
      </div>

      {/* Aesthetic Section Break */}
      <div className="w-full flex flex-col items-center mt-32 mb-10 opacity-30">
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-[#3a86ff] to-transparent mb-4" />
        <span className="text-[10px] font-mono tracking-[0.5em] text-white uppercase italic">System Deep-Dive</span>
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-[#3a86ff] to-transparent mt-4" />
      </div>

      <TechBlog />
    </main>
  );
}
