const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#0a0f1a] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-48 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-64">
        
        {/* HERO HEADER */}
        <header className="text-center space-y-12">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white uppercase font-mono">
              SORTIQ
            </h1>
            <p className="text-sm font-mono tracking-[0.5em] text-[#3a86ff] uppercase opacity-80">
              Reinforcement Learning Inference Engine
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
             {['Q-Learning', 'Constrained', 'Tabular Agent'].map((tag) => (
               <span key={tag} className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                 {tag}
               </span>
             ))}
          </div>
        </header>

        {/* SECTION 1: THE VISION */}
        <section className="space-y-12 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white tracking-tight">The Vision: From Rules to Kernels</h2>
          <div className="space-y-8 text-xl leading-relaxed text-gray-400 font-light">
            <p>
              Traditional sorting is a static problem. I built Sortiq to turn it into a <strong>Decision Kernel</strong>. The goal wasn't just to sort items, but to see if an agent could learn the "value" of survival when resources are finite.
            </p>
            <p>
              By removing pre-built ML libraries, we exposed the raw tension between classification accuracy and system integrity, forcing the agent to develop its own internal priorities.
            </p>
          </div>
          
          {/* AIDK STYLE QUOTE BOX */}
          <div className="bg-[#3a86ff]/5 border border-[#3a86ff]/20 p-8 rounded-3xl italic text-[#3a86ff] text-lg">
            "The agent doesn't just see a fruit; it sees a probability of survival."
          </div>
        </section>

        {/* SECTION 2: THE ENVIRONMENT (AIDK CARD STYLE) */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center md:text-left">The Complexity: Constrained MDP</h2>
          <div className="bg-[#0f172a] border border-white/5 p-12 rounded-[2.5rem] shadow-2xl space-y-12">
            <p className="text-lg text-gray-300">
              Sorting in a constrained environment is an exercise in resource discipline. The agent must navigate two critical bottlenecks:
            </p>
            <div className="grid gap-12">
              <div className="space-y-4">
                <h3 className="text-[#3a86ff] font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#3a86ff]" /> Buffer Management
                </h3>
                <p className="text-gray-500 leading-relaxed pl-5 border-l border-white/10">
                  A strict 6-unit storage limit. Every item stored brings the system closer to a fatal overflow. The agent learns to dump items when risk outweighs reward.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[#3a86ff] font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#3a86ff]" /> Energy Scarcity
                </h3>
                <p className="text-gray-500 leading-relaxed pl-5 border-l border-white/10">
                  Every action has a thermal cost. The agent must survive the entire batch within 4 energy units, or the mission fails entirely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: REWARD PROOFS */}
        <section className="space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">Learning Proofs & The Q-Table Mystery</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              The mathematical stabilization of rewards over 15,000 episodes demonstrates the emergence of autonomous strategy.
            </p>
          </div>

          <div className="space-y-32">
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/5 p-4 rounded-[2rem] overflow-hidden group shadow-2xl">
                <img 
                  src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png" 
                  alt="Proof" 
                  className="w-full h-auto rounded-2xl opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-center text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase italic">Fig_01 // Quantitative Agent Comparison</p>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 border border-white/5 p-4 rounded-[2rem] overflow-hidden group shadow-2xl">
                <img 
                  src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png" 
                  alt="Curve" 
                  className="w-full h-auto rounded-2xl opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-center text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase italic">Fig_02 // Training Stability Gradient</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE RESULTS */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight text-center md:text-left">The Results: Quantitative Comparison</h2>
          <div className="bg-[#0f172a] border border-white/5 p-12 rounded-[2.5rem] shadow-2xl">
             <div className="grid grid-cols-1 gap-6 font-mono text-[11px] tracking-widest uppercase">
                {[
                  { label: 'Baseline Average', val: '-11.2', color: 'text-red-500' },
                  { label: 'Sortiq Agent Average', val: '+57.3', color: 'text-[#00ff9f]' },
                  { label: 'Performance Delta', val: '+68.5', color: 'text-[#3a86ff] font-bold' }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-600">{row.label}</span>
                    <span className={row.color}>{row.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-40 border-t border-white/5 text-center space-y-8">
          <p className="text-xs font-mono text-gray-700 tracking-[0.8em] uppercase">
            Sortiq // Built by Durgaprasad Reddy
          </p>
          <div className="flex justify-center gap-12 text-[9px] text-gray-800 font-bold uppercase tracking-widest">
            <span>Next.js</span>
            <span>FastAPI</span>
            <span>Docker</span>
          </div>
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
