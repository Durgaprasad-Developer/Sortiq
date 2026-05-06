import React from 'react';

const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#020205] text-gray-300 font-sans selection:bg-[#3a86ff]/30 py-48 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-40 text-center space-y-8">
          <div className="inline-block px-4 py-1 border border-[#3a86ff]/20 bg-[#3a86ff]/5 rounded-full text-[9px] font-mono tracking-[0.3em] text-[#3a86ff] uppercase">
            Technical Specification // v1.0.4
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
            REINFORCEMENT <br/>
            <span className="text-[#3a86ff] not-italic">LEARNING ENGINE</span>
          </h1>
          <p className="text-sm font-mono text-gray-600 tracking-widest uppercase italic">
            Built from scratch // Pure Q-Learning implementation
          </p>
        </header>

        {/* CONTENT SECTIONS */}
        <div className="space-y-40">
          
          {/* SECTION 01 */}
          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-[#3a86ff]">01 //</span>
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white italic">The Objective</h2>
            </div>
            <p className="text-2xl text-white font-light leading-snug tracking-tight">
              Mastering physical constraints through <strong>mathematical intuition</strong>.
            </p>
            <div className="text-lg leading-relaxed text-gray-400 space-y-6">
              <p>
                Sortiq isn't a simple classifier. It is a <strong>Dynamic Environment</strong> where an agent must survive using the Bellman Equation. By removing pre-built libraries, we exposed the raw tension between accuracy and resource management.
              </p>
              <p>
                The agent learns to navigate a state-space of 10,080 unique configurations, optimizing for long-term survival rather than immediate points.
              </p>
            </div>
          </section>

          {/* SECTION 02 */}
          <section className="space-y-12">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-[#06d6a0]">02 //</span>
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white italic">The Environment</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-400">
              The simulation enforces a <strong>Constrained MDP</strong> (Markov Decision Process). Success is dictated by two critical bottlenecks:
            </p>
            <div className="space-y-12 pt-4">
              <div className="group">
                <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#06d6a0] rounded-full" /> Buffer Management
                </h3>
                <p className="text-base text-gray-500 leading-relaxed pl-4 border-l border-white/5">
                  A 6-unit storage limit forces the agent to estimate the <strong>Probability of Overflow</strong>. It learns to dump items when the risk of a crash outweighs the value of a correct sort.
                </p>
              </div>
              <div className="group">
                <h3 className="text-white font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#3a86ff] rounded-full" /> Power Consumption
                </h3>
                <p className="text-base text-gray-500 leading-relaxed pl-4 border-l border-white/5">
                  Energy is finite. The agent must develop a <strong>Stochastic Strategy</strong>—waiting for waste items to clear the conveyor rather than crushing everything blindly.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 03 */}
          <section className="space-y-12">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-[#ff6b6b]">03 //</span>
              <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white italic">Reward Logic</h2>
            </div>
            <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-12 space-y-10">
              <p className="text-center text-sm text-gray-500 italic">"Survival is the primary reward signal."</p>
              <div className="space-y-4 font-mono text-[11px] tracking-wider uppercase">
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-600">Correct_Action</span>
                  <span className="text-[#06d6a0] font-bold">+8.0</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4">
                  <span className="text-gray-600">Minor_Error</span>
                  <span className="text-[#ff6b6b] font-bold">-8.0</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-4 text-red-500 font-black">
                  <span>System_Crash</span>
                  <span>-20.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End_Bonus</span>
                  <span className="text-[#3a86ff] font-bold">+15.0</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 04 */}
          <section className="space-y-20">
            <div className="space-y-8 text-center">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-white italic opacity-50">04 // Training Analytics</h2>
              <p className="text-lg font-light text-gray-400">
                Data convergence after 15,000 learning iterations.
              </p>
            </div>
            
            <div className="space-y-32">
              <div className="space-y-6">
                <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl group hover:border-[#3a86ff]/40 transition-all duration-700">
                  <img 
                    src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/training_curve.png" 
                    alt="Training" 
                    className="w-full opacity-40 group-hover:opacity-100 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
                  />
                </div>
                <p className="text-center text-[9px] font-mono text-gray-700 tracking-[0.5em] uppercase">Fig_01: Reward Stabilization</p>
              </div>

              <div className="space-y-6">
                <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl group hover:border-[#06d6a0]/40 transition-all duration-700">
                  <img 
                    src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/comparison.png" 
                    alt="Comparison" 
                    className="w-full opacity-40 group-hover:opacity-100 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
                  />
                </div>
                <p className="text-center text-[9px] font-mono text-gray-700 tracking-[0.5em] uppercase">Fig_02: Evaluation vs Baseline</p>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="mt-60 pt-20 border-t border-white/5 text-center space-y-4">
          <p className="text-[10px] font-mono tracking-[0.5em] text-gray-800 uppercase italic">
            Built by Durgaprasad Reddy // Sortiq RL System
          </p>
          <div className="flex justify-center gap-8 text-[8px] text-gray-900 font-bold uppercase tracking-widest">
            <span>Next.js</span>
            <span>FastAPI</span>
            <span>Docker</span>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default TechBlog;
