import React from 'react';

const TechBlog = () => {
  return (
    <div id="tech-blog" className="w-full bg-[#05050a] border-t border-white/5 py-24 px-10 font-sans leading-relaxed text-gray-400">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
            Technical <span className="text-[#3a86ff] not-italic">Deep-Dive</span>
          </h1>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        <div className="grid md:grid-cols-12 gap-16">
          {/* Left Column: Purpose & Environment */}
          <div className="md:col-span-7 space-y-12">
            <section>
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-[#3a86ff] mb-6">01 // Problem Statement</h2>
              <p className="text-xl text-white font-light leading-relaxed">
                Sortiq is an exploration into <strong>Resource-Constrained Reinforcement Learning</strong>. Beyond simple classification, the agent must balance accuracy with environmental survival—managing finite storage and power in real-time.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-[#06d6a0] mb-6">02 // Environment Dynamics</h2>
              <p className="mb-6 text-sm">
                The simulation operates as a <strong>Partially Observable MDP</strong>. Decisions are irreversible and carry weight beyond immediate rewards:
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                  <p className="text-[#06d6a0] font-mono text-[10px] mb-2">CAPACITY_MANAGEMENT</p>
                  <p className="text-white font-bold tracking-tight text-sm mb-2">STORAGE [6 UNIT]</p>
                  <p className="text-[11px] leading-relaxed text-gray-500">Forcing the agent to prioritize high-value sorting when space is low.</p>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                  <p className="text-[#06d6a0] font-mono text-[10px] mb-2">ENERGY_CONSERVATION</p>
                  <p className="text-white font-bold tracking-tight text-sm mb-2">POWER [4 UNIT]</p>
                  <p className="text-[11px] leading-relaxed text-gray-500">Every crushing action depletes energy. Empty energy triggers a system crash.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-[#ff6b6b] mb-6">03 // Reward Architecture</h2>
              <p className="text-sm mb-6">
                The reward system is tuned to encourage <strong>Safety First, Efficiency Second</strong>. By penalizing crashes heavily, we force the agent to learn resource preservation.
              </p>
              <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="bg-white/5 text-gray-500">
                      <th className="px-6 py-3 text-left">ACTION_EVENT</th>
                      <th className="px-6 py-3 text-right">MAGNITUDE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr><td className="px-6 py-4">CORRECT_CLASSIFICATION</td><td className="px-6 py-4 text-right text-[#06d6a0]">+8.0</td></tr>
                    <tr><td className="px-6 py-4">INCORRECT_CLASSIFICATION</td><td className="px-6 py-4 text-right text-[#ff6b6b]">-8.0</td></tr>
                    <tr><td className="px-6 py-4 font-bold text-red-500 italic">SYSTEM_CRASH_TERMINATION</td><td className="px-6 py-4 text-right text-red-500">-20.0</td></tr>
                    <tr><td className="px-6 py-4">EPISODE_COMPLETION_BONUS</td><td className="px-6 py-4 text-right text-[#3a86ff]">+15.0</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column: Q-Learning & Results */}
          <div className="md:col-span-5 space-y-12">
            <section className="p-8 bg-gradient-to-br from-[#3a86ff]/10 to-transparent border border-[#3a86ff]/20 rounded-2xl">
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-[#3a86ff] mb-6">The Brain: Q-Learning</h2>
              <p className="text-sm text-gray-300 mb-6">
                We utilize the <strong>Bellman Equation</strong> to iteratively update a Q-table of ~10,000 states. This allows the agent to map visual features to optimal survival strategies.
              </p>
              <div className="font-mono text-[11px] space-y-2 text-[#3a86ff]/70 bg-black/20 p-4 rounded-lg">
                <div>STATES_SPACE: 10,080</div>
                <div>LEARNING_RATE: 0.1</div>
                <div>DISCOUNT_FACTOR: 0.95</div>
                <div className="text-white mt-2">Converged at Episode 12,000</div>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white mb-6">Visual Analytics</h2>
              
              <div className="group border border-white/5 bg-white/[0.01] p-2 rounded-2xl hover:border-[#3a86ff]/30 transition-all">
                <img 
                  src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/training_curve.png" 
                  alt="Training" 
                  className="w-full h-auto rounded-xl opacity-60 group-hover:opacity-100 transition-all duration-500"
                />
                <p className="text-[10px] font-mono mt-4 text-center text-gray-600 tracking-widest">FIG_01: REWARD STABILITY</p>
              </div>

              <div className="group border border-white/5 bg-white/[0.01] p-2 rounded-2xl hover:border-[#06d6a0]/30 transition-all">
                <img 
                  src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/comparison.png" 
                  alt="Comparison" 
                  className="w-full h-auto rounded-xl opacity-60 group-hover:opacity-100 transition-all duration-500"
                />
                <p className="text-[10px] font-mono mt-4 text-center text-gray-600 tracking-widest">FIG_02: AGENT PERFORMANCE</p>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center opacity-30">
          <span className="text-[9px] font-mono tracking-widest">SORTIQ_RL_SYSTEM // BUILT_BY_BDURGAPRASADREDDY</span>
          <span className="text-[9px] font-mono tracking-widest">2026_STABLE_BUILD</span>
        </footer>
      </div>
    </div>
  );
};

export default TechBlog;
