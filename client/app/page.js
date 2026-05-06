'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import HUD          from '../components/HUD'
import ConveyorBelt from '../components/ConveyorBelt'
import AgentBrain   from '../components/AgentBrain'
import ActionZones  from '../components/ActionZones'
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
      setState(prev => ({ ...prev, phase: 'INCOMING' }));
      await delay(T.INCOMING);
      if (!runningRef.current) break;

      // 2. THINKING
      try {
        const res = await fetch(`${API_URL}/agent-step`, { method: 'POST' });
        const decision = await res.json();
        const { item, q_values: qValues } = decision;

        setState(prev => ({ ...prev, phase: 'THINKING', currentItem: item, qValues }));
        
        await delay(T.THINKING);
        if (!runningRef.current) break;

        // 3. ACTION
        const { action, is_correct: isCorrect, reward, done, score, storage, energy } = decision;
        const newStats = { ...stateRef.current.stats };
        newStats.totalItems++;
        newStats.actionStore += (action === 'STORE' ? 1 : 0);
        newStats.actionCrush += (action === 'CRUSH' ? 1 : 0);
        if (item.type === 'FRUIT') { newStats.fruitTotal++; if (isCorrect) newStats.fruitCorrect++; }
        else                       { newStats.wasteTotal++; if (isCorrect) newStats.wasteCorrect++; }
        if (isCorrect) { newStats.correctItems++; newStats.rewardPlus++; }
        else           { newStats.rewardMinus++; }

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
      }
    }
  }, [speed]);

  useEffect(() => {
    if (running) {
      runSimulation();
    }
  }, [running, runSimulation]);

  const handleStart = async () => {
    if (backendStatus === 'OFFLINE') {
      return
    }
    setRunning(true);
  }
  
  const handlePause = () => { setRunning(false); }

  const {
    phase, episode, itemIndex, score, storage, energy,
    currentItem, lastAction, lastCorrect, qValues,
    episodeScores, stats,
  } = state

  return (
    <main className="w-full bg-[#05050a] selection:bg-[#3a86ff]/30">
      
      {/* SECTION 1: THE APP STAGE (Fixed-Height Hero) */}
      <section id="visualizer-stage" className="relative w-full h-[780px] bg-[#05050a] border-b-4 border-[#3a86ff]/20 flex flex-col items-center pt-16 overflow-hidden">
        <MatrixBackground />
        
        {/* Title Header */}
        <div className="relative z-20 mb-6 text-center">
          <h2 className="text-[9px] font-mono tracking-[0.6em] text-[#3a86ff] uppercase opacity-70 flex items-center gap-4 justify-center">
            <span className="w-6 h-[1px] bg-[#3a86ff]/30" />
            Live Inference Stage
            <span className="w-6 h-[1px] bg-[#3a86ff]/30" />
          </h2>
        </div>
        
        {episodeBanner && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none anim-episode-banner">
            <div className="text-[10px] text-[#ffd32a] font-mono p-4 bg-[#070d10ee] border border-[#ffd32a] shadow-[0_0_30px_rgba(255,211,42,0.3)]">
              {episodeBanner}
            </div>
          </div>
        )}

        {/* Dashboard Stage (Natural sizing, Centered) */}
        <div className="relative z-30 w-full max-w-[95%] lg:max-w-5xl flex flex-col gap-3 p-2">
          <HUD
            episode={episode} score={score} storage={storage} energy={energy}
            itemIndex={itemIndex} running={running}
            onStart={handleStart} onPause={handlePause}
            speed={speed} onSpeedChange={setSpeed}
          />

          <div className="flex gap-4 flex-1 h-[400px]">
            <EnvPanel stats={stats} episode={episode} />

            <div className="flex flex-col gap-4 flex-1 min-w-0">
              <div className="pixel-border p-3 scanlines relative bg-[#040a0d] flex-1">
                <ConveyorBelt item={currentItem} phase={phase} itemIndex={itemIndex} />
              </div>

              <div className="flex gap-4 h-[180px]">
                <AgentBrain qValues={qValues} phase={phase} lastAction={lastAction} isCorrect={lastCorrect} />
              </div>
            </div>

            <ActionZones
              phase={phase} lastAction={lastAction} isCorrect={lastCorrect}
              storage={storage} energy={energy}
            />
          </div>

          <footer className="flex justify-between items-center text-[9px] font-mono tracking-[0.3em] text-gray-800 uppercase italic">
            <div className="flex gap-8">
              <span>System: <span className={running ? "text-[#06d6a0]" : "text-[#ff6b6b]"}>{running ? 'Simulating' : 'Standby'}</span></span>
              <span>EP_{episode - 1}</span>
            </div>
            <div className="flex gap-8">
              <span>ACCURACY: {stats.totalItems ? Math.round(stats.correctItems / stats.totalItems * 100) : '--'}%</span>
              <span>ITEMS_COUNT: {stats.totalItems}</span>
            </div>
          </footer>
        </div>
      </section>

      {/* SECTION 2: THE TECHNICAL DOCUMENT (Natural Scroll) */}
      <section className="w-full relative z-20 bg-[#020205] border-t border-white/5">
        <div className="w-full py-12 flex flex-col items-center bg-black/40">
           <h3 className="text-[10px] font-mono tracking-[1em] text-gray-600 uppercase">Theory & Documentation</h3>
        </div>
        <TechBlog />
      </section>

    </main>
  );
}
