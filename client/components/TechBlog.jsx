import React from 'react';

const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#020205] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-48 px-6">
      <div className="max-w-2xl mx-auto space-y-32">
        
        {/* HERO HEADER */}
        <header className="mb-32 text-center">
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-6">
            TECHNICAL <span className="text-[#3a86ff] not-italic">WHITE_PAPER</span>
          </h1>
          <div className="flex items-center justify-center gap-6 text-[9px] font-mono tracking-[0.4em] text-gray-600 uppercase">
            <span>Stable Build 1.0.4</span>
            <span className="w-1 h-1 bg-[#3a86ff]/40 rounded-full" />
            <span>RL System Docs</span>
          </div>
        </header>

        {/* PROSE CONTENT */}
        <div className="space-y-28 text-lg leading-relaxed font-light">
          
          <section className="space-y-8">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#3a86ff] opacity-50 italic">01 // Executive Summary</h2>
            <p className="text-3xl text-white font-medium leading-tight tracking-tight">
              Sortiq is an exploration into <strong>Reinforcement Learning from basic principles</strong>.
            </p>
            <p className="text-gray-400">
              The project demonstrates an agent trained to master a dynamic, multi-constrained environment using a raw implementation of the <strong>Q-Learning algorithm</strong>. By removing high-level abstractions, we expose the fundamental interaction between state estimation and strategic resource allocation.
            </p>
          </section>

          <section className="space-y-12">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#06d6a0] opacity-50 italic">02 // Environment Architecture</h2>
            <div className="space-y-8">
              <p>
                The sorting environment is a dual-constraint system. The agent perceives 288 visual feature permutations but must constantly prioritize two vital survival metrics:
              </p>
              <div className="grid grid-cols-1 gap-12 py-6">
                <div className="border-l-2 border-[#06d6a0]/30 pl-8 space-y-3">
                  <h3 className="text-white font-bold tracking-tight uppercase text-sm">Storage Management</h3>
                  <p className="text-base text-gray-500">
                    With a finite 6-unit buffer, the agent must develop a policy that accounts for <strong>opportunity cost</strong>—knowing when to hold high-value fruit or process waste to prevent a line backup.
                  </p>
                </div>
                <div className="border-l-2 border-[#3a86ff]/30 pl-8 space-y-3">
                  <h3 className="text-white font-bold tracking-tight uppercase text-sm">Energy Conservation</h3>
                  <p className="text-base text-gray-500">
                    Crushing waste consumes significant power. The agent must learn to balance immediate task rewards with the risk of a <strong>total system blackout</strong> (Black Swan event).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#ff6b6b] opacity-50 italic">03 // The Reward Engine</h2>
            <div className="p-12 bg-white/[0.01] border border-white/5 rounded-3xl space-y-10">
              <p className="text-sm text-gray-500 italic text-center">
                "Rewards are the mathematical translation of architectural intent."
              </p>
              <div className="space-y-6 font-mono text-xs tracking-wider">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-500">CORRECT_SORT_PRECISION</span>
                  <span className="text-[#06d6a0] font-bold">+8.0</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-500">CLASSIFICATION_ERROR</span>
                  <span className="text-[#ff6b6b] font-bold">-8.0</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4 text-red-500 font-black">
                  <span>CRITICAL_SYSTEM_CRASH</span>
                  <span>-20.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">EPISODE_SURVIVAL_BONUS</span>
                  <span className="text-[#3a86ff] font-bold">+15.0</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#ffd166] opacity-50 italic">04 // Performance Convergence</h2>
              <p className="text-lg">
                After 15,000 episodes of trial-and-error, the agent achieved a stable accuracy of <strong>92%</strong> while eliminating system crashes through conservative resource policies.
              </p>
            </div>
            
            <div className="space-y-24">
              <figure className="space-y-4">
                <div className="overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-4">
                  <img 
                    src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/training_curve.png" 
                    alt="Training Curve" 
                    className="w-full opacity-60 hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
                <figcaption className="text-center text-[9px] font-mono text-gray-600 tracking-[0.3em] uppercase">Fig_01: Reward Stabilization (15K EPS)</figcaption>
              </figure>

              <figure className="space-y-4">
                <div className="overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-4">
                  <img 
                    src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/comparison.png" 
                    alt="Evaluation" 
                    className="w-full opacity-60 hover:opacity-100 transition-opacity duration-700"
                  />
                </div>
                <figcaption className="text-center text-[9px] font-mono text-gray-600 tracking-[0.3em] uppercase">Fig_02: Q-Agent vs Baseline Performance</figcaption>
              </figure>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-48 pt-16 border-t border-white/5 flex flex-col items-center gap-6 text-center">
          <p className="text-[10px] font-mono tracking-[0.5em] text-gray-700 uppercase">
            Sortiq System // Built by BDurgaprasadReddy
          </p>
          <div className="text-[8px] text-gray-800 flex gap-4 uppercase tracking-tighter">
            <span>Next.js 14</span>
            <span>FastAPI</span>
            <span>Reinforcement Learning</span>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default TechBlog;
