import React from 'react';

const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#020205] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-32 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-40">
        
        {/* HEADER */}
        <header className="text-center space-y-6">
          <div className="inline-block px-3 py-1 border border-[#3a86ff]/30 text-[#3a86ff] text-[9px] font-mono tracking-[0.3em] uppercase mb-4">
            Technical Specification // V1.0.4
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
            REINFORCEMENT <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3a86ff] to-[#00d2ff]">LEARNING ENGINE</span>
          </h1>
          <p className="text-xs font-mono tracking-[0.4em] text-gray-600 uppercase">
            Built from scratch // Pure Q-Learning Implementation
          </p>
        </header>

        {/* 01 // OBJECTIVE */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-[#3a86ff] font-mono text-[10px] tracking-widest uppercase">
            <span>01 // THE OBJECTIVE</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#3a86ff]/30 to-transparent" />
          </div>
          <div className="border-l-2 border-[#3a86ff]/20 pl-8 space-y-6">
            <h2 className="text-3xl font-semibold text-white tracking-tight">Mastering physical constraints through mathematical intuition.</h2>
            <p className="text-lg leading-relaxed text-gray-400 font-light">
              Sortiq isn't a simple classifier. It is a <span className="text-white font-medium">Dynamic Environment</span> where an agent must survive using the Bellman Equation. By removing pre-built libraries, we exposed the raw tension between accuracy and resource management.
            </p>
            <p className="text-lg leading-relaxed text-gray-400 font-light">
              The agent learns to navigate a state-space of 10,080 unique configurations, optimizing for long-term survival rather than immediate points.
            </p>
          </div>
        </section>

        {/* 02 // ENVIRONMENT */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-[#00ff9f] font-mono text-[10px] tracking-widest uppercase">
            <span>02 // THE ENVIRONMENT</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00ff9f]/30 to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-12 border-l-2 border-[#00ff9f]/20 pl-8">
            <div className="space-y-4">
              <h3 className="text-white font-semibold uppercase tracking-widest text-xs">Buffer Management</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                A 6-unit storage limit forces the agent to estimate the <span className="text-[#00ff9f]">Probability of Overflow</span>. It learns to dump items when the risk of a crash outweighs the value of a correct sort.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-white font-semibold uppercase tracking-widest text-xs">Power Consumption</h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Energy is finite. The agent must develop a <span className="text-[#ff6b35]">Stochastic Strategy</span>—waiting for waste items to clear the conveyor rather than crushing everything blindly.
              </p>
            </div>
          </div>
        </section>

        {/* 03 // LOGIC CARDS */}
        <section className="bg-[#05050a] border border-white/5 p-12 space-y-12">
           <div className="text-center space-y-2">
              <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em]">03 // REWARD LOGIC</p>
              <p className="text-sm italic text-gray-400">"Survival is the primary reward signal."</p>
           </div>
           
           <div className="grid grid-cols-1 gap-4 font-mono text-[11px]">
              {[
                { label: 'CORRECT_ACTION', val: '+8.0', color: 'text-[#00ff9f]' },
                { label: 'MINOR_ERROR', val: '-8.0', color: 'text-[#ff3355]' },
                { label: 'SYSTEM_CRASH', val: '-20.0', color: 'bg-[#ff3355] text-black px-2' },
                { label: 'END_BONUS', val: '+15.0', color: 'text-[#00aaff]' }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-600">{row.label}</span>
                  <span className={row.color}>{row.val}</span>
                </div>
              ))}
           </div>
        </section>

        {/* 04 // ANALYTICS */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 text-[#ffd32a] font-mono text-[10px] tracking-widest uppercase">
            <span>04 // TRAINING ANALYTICS</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#ffd32a]/30 to-transparent" />
          </div>
          <div className="space-y-6 text-center">
            <p className="text-lg text-gray-400 font-light">Data convergence after 15,000 learning iterations.</p>
            <div className="relative group overflow-hidden border border-white/5 bg-black/40 p-4">
              <img 
                src="/assets/comparison.png" 
                alt="Training Data" 
                className="w-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-gray-700 uppercase tracking-widest">
                Fig_01 // Reward Stabilization
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-20 border-t border-white/5 text-center space-y-4">
          <p className="text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase">
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
