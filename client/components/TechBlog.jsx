import React from 'react';

const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#020205] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-40 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* HERO HEADER */}
        <header className="mb-24 text-center">
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic mb-6">
            TECHNICAL <span className="text-[#3a86ff] not-italic">WHITE_PAPER</span>
          </h1>
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono tracking-[0.3em] text-gray-600">
            <span>STABLE_BUILD_1.0.4</span>
            <span className="w-1 h-1 bg-gray-800 rounded-full" />
            <span>RL_SYSTEM_DOCS</span>
          </div>
        </header>

        {/* PROSE CONTENT */}
        <div className="space-y-24 text-lg leading-relaxed font-light">
          
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-[#3a86ff] mb-8 italic">01 // Executive Summary</h2>
            <p className="text-2xl text-white font-medium leading-snug">
              Sortiq represents a high-fidelity implementation of <strong>Reinforcement Learning from basic principles</strong>.
            </p>
            <p>
              By moving away from abstracted libraries, this project explores the raw interaction between a <strong>Q-Learning agent</strong> and a dynamic, physical environment. The core challenge is not just classification, but the strategic management of a <strong>Partially Observable Markov Decision Process (POMDP)</strong> under strict resource constraints.
            </p>
          </section>

          <section className="space-y-12">
            <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-[#06d6a0] italic">02 // Environment Architecture</h2>
            <div className="space-y-6">
              <p>
                The sorting floor is a dual-constraint system. The agent perceives 288 unique feature permutations but must monitor two vital "life signs" that dictate survival:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-8">
                <div className="space-y-4">
                  <h3 className="text-white font-bold tracking-tight uppercase">Storage Limit</h3>
                  <p className="text-sm text-gray-500">
                    A finite 6-unit buffer. The agent must decide to process or "hold" items based on line speed, forcing it to develop a concept of <strong>opportunity cost</strong>.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-bold tracking-tight uppercase">Energy Reservoir</h3>
                  <p className="text-sm text-gray-500">
                    Waste crushing consumes power. The agent must balance aggressive sorting with the risk of a <strong>total system blackout</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-[#ff6b6b] italic">03 // The Reward Engine</h2>
            <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl space-y-8">
              <p className="text-sm text-gray-400 italic">
                "Rewards are not just points; they are the language of intent."
              </p>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span>CORRECT_SORT_PRECISION</span>
                  <span className="text-[#06d6a0]">+8.0</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span>CLASSIFICATION_ERROR</span>
                  <span className="text-[#ff6b6b]">-8.0</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4 text-red-500 font-bold">
                  <span>CRITICAL_SYSTEM_CRASH</span>
                  <span>-20.0</span>
                </div>
                <div className="flex justify-between">
                  <span>EPISODE_SURVIVAL_BONUS</span>
                  <span className="text-[#3a86ff]">+15.0</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-[#ffd166] italic">04 // Training & Convergence</h2>
            <p>
              After 15,000 episodes of training, the agent successfully navigated the <strong>Exploration vs. Exploitation</strong> dilemma, achieving a stable sorting accuracy of ~92% while maintaining a 0% crash rate in the final 5,000 runs.
            </p>
            
            <div className="space-y-16 pt-10">
              <div className="group space-y-4">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black p-4 transition-all duration-500 group-hover:border-[#3a86ff]/40">
                  <img 
                    src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/training_curve.png" 
                    alt="Training Curve" 
                    className="w-full opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-center text-[10px] font-mono text-gray-600 tracking-widest uppercase italic">Fig_01: Reward Stabilization Curve</p>
              </div>

              <div className="group space-y-4">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-black p-4 transition-all duration-500 group-hover:border-[#06d6a0]/40">
                  <img 
                    src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/comparison.png" 
                    alt="Evaluation" 
                    className="w-full opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-center text-[10px] font-mono text-gray-600 tracking-widest uppercase italic">Fig_02: Performance vs Random Baseline</p>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-40 pt-16 border-t border-white/5 flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-mono tracking-widest text-gray-700 uppercase">
            Sortiq // Reinforcement Learning System // Built by BDurgaprasadReddy
          </p>
          <p className="text-[10px] text-gray-800">2026 // ALL RIGHTS RESERVED // STABLE_BUILD_V1</p>
        </footer>
      </div>
    </article>
  );
};

export default TechBlog;
