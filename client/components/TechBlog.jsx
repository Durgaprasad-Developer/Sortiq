import React from 'react';

const TechBlog = () => {
  return (
    <div id="tech-blog" className="w-full bg-[#020205] text-gray-300 font-sans py-24 px-6 md:px-0">
      <div className="max-w-4xl mx-auto space-y-32">
        
        {/* HEADER SECTION */}
        <header className="border-b border-white/10 pb-16 text-center">
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase mb-4">
            Technical <span className="text-[#3a86ff] not-italic">Deep-Dive</span>
          </h1>
          <p className="text-xs font-mono tracking-[0.5em] text-gray-600 uppercase">
            Reinforcement Learning // System Documentation // V1.0
          </p>
        </header>

        {/* 01: PROBLEM STATEMENT */}
        <section className="space-y-6">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#3a86ff]">01 // Project Objective</h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">The Quest for Scratch RL</h3>
          <p className="text-lg leading-relaxed font-light">
            Sortiq was designed to bridge the gap between high-level theory and low-level implementation. Instead of using black-box libraries, we implemented the <strong>raw Q-Learning algorithm</strong> to manage a dynamic, multi-constrained environment.
          </p>
          <p className="text-gray-500 leading-relaxed">
            The agent isn't just classifying pixels; it's managing a physical workspace where every action has a cost. The goal is survival through optimal resource allocation.
          </p>
        </section>

        {/* 02: ENVIRONMENT & CONSTRAINTS */}
        <section className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#06d6a0]">02 // Environment Dynamics</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Constrained Decision Making</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#06d6a0] font-mono text-[10px] tracking-widest uppercase">Storage</span>
                <span className="text-white/20 font-mono text-[10px]">6 UNITS</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                The agent must decide when to "dump" fruit to keep the conveyor moving. Running out of storage results in immediate system failure.
              </p>
            </div>
            
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#3a86ff] font-mono text-[10px] tracking-widest uppercase">Energy</span>
                <span className="text-white/20 font-mono text-[10px]">4 UNITS</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Crushing waste consumes power. The agent must learn to wait for "lucky streaks" or face a power-induced system crash.
              </p>
            </div>
          </div>
        </section>

        {/* 03: REWARD SYSTEM */}
        <section className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#ff6b6b]">03 // Reward Architecture</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Tuning for Survival</h3>
          </div>

          <div className="overflow-hidden border border-white/5 rounded-2xl bg-black/40 shadow-2xl">
            <table className="w-full text-left font-mono text-[12px]">
              <thead className="bg-white/5 text-gray-500 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Event</th>
                  <th className="px-8 py-5 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-400">
                <tr><td className="px-8 py-5">Correct Sort</td><td className="px-8 py-5 text-right text-[#06d6a0] font-bold">+8.0</td></tr>
                <tr><td className="px-8 py-5">Incorrect Sort</td><td className="px-8 py-5 text-right text-[#ff6b6b] font-bold">-8.0</td></tr>
                <tr><td className="px-8 py-5 italic text-red-500">System Crash (Death)</td><td className="px-8 py-5 text-right text-red-500 font-black">-20.0</td></tr>
                <tr><td className="px-8 py-5">Episode Completion</td><td className="px-8 py-5 text-right text-[#3a86ff]">+15.0</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic text-center">
            * The heavy penalty on Crash ensures the agent prioritizes long-term resource preservation over immediate rewards.
          </p>
        </section>

        {/* 04: Q-LEARNING */}
        <section className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#ffd166]">04 // Logic Engine</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">The Bellman Brain</h3>
          </div>
          
          <div className="bg-gradient-to-br from-[#3a86ff]/5 to-transparent p-10 border border-[#3a86ff]/10 rounded-3xl">
            <p className="text-lg leading-relaxed text-gray-300 font-light mb-8">
              We utilize a <strong>Discrete Q-Table</strong> representing over 10,000 unique states (Visual Features × Storage × Energy).
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 border border-white/5 rounded-xl bg-black/20"><p className="text-[#3a86ff] font-bold">10K+</p><p className="text-[9px] uppercase tracking-tighter">States</p></div>
              <div className="p-4 border border-white/5 rounded-xl bg-black/20"><p className="text-[#3a86ff] font-bold">0.1</p><p className="text-[9px] uppercase tracking-tighter">Alpha</p></div>
              <div className="p-4 border border-white/5 rounded-xl bg-black/20"><p className="text-[#3a86ff] font-bold">0.95</p><p className="text-[9px] uppercase tracking-tighter">Gamma</p></div>
              <div className="p-4 border border-white/5 rounded-xl bg-black/20"><p className="text-[#3a86ff] font-bold">99%</p><p className="text-[9px] uppercase tracking-tighter">Decay</p></div>
            </div>
          </div>
        </section>

        {/* 05: ANALYTICS */}
        <section className="space-y-12 pb-32">
          <div className="space-y-4">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white">05 // Results</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight italic">Performance Convergence</h3>
          </div>
          
          <div className="space-y-20">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-white/5 bg-black p-4 shadow-2xl">
                <img 
                  src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/training_curve.png" 
                  alt="Training Curve" 
                  className="w-full opacity-80"
                />
              </div>
              <p className="text-[10px] font-mono text-center text-gray-600 tracking-widest uppercase">FIG_01: Reward Stabilization (15,000 Episodes)</p>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-white/5 bg-black p-4 shadow-2xl">
                <img 
                  src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/comparison.png" 
                  alt="Comparison" 
                  className="w-full opacity-80"
                />
              </div>
              <p className="text-[10px] font-mono text-center text-gray-600 tracking-widest uppercase">FIG_02: Q-Agent vs Random Baseline Evaluation</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-gray-600 gap-4">
          <span>SORTIQ_SYSTEM_V1.0.4</span>
          <span>BDURGAPRASADREDDY // 2026</span>
          <span>STABLE_BUILD_DISTRIBUTION</span>
        </footer>
      </div>
    </div>
  );
};

export default TechBlog;
