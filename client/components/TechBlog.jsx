const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#030306] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-32 px-6 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-40">
        
        {/* HEADER: Centered & Impactful */}
        <header className="text-center space-y-6">
          <div className="inline-block px-3 py-1 border border-[#3a86ff]/20 text-[#3a86ff] text-[9px] font-mono tracking-[0.4em] uppercase mb-4">
            Project // SORTIQ_RL_V1.0
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none uppercase italic">
            TECHNICAL <br/>
            <span className="text-[#3a86ff] not-italic">DEEP DIVE</span>
          </h1>
          <p className="text-sm font-mono tracking-[0.5em] text-gray-600 uppercase">
            Reinforcement Learning via Constrained MDP
          </p>
        </header>

        {/* 01: PURPOSE (Clean Narrative) */}
        <section className="space-y-10">
          <div className="flex items-center gap-4 text-[#3a86ff] font-mono text-[10px] tracking-widest uppercase">
            <span>[01]</span>
            <span className="font-bold">// Purpose</span>
            <div className="flex-1 h-[1px] bg-[#3a86ff]/10" />
          </div>
          <div className="max-w-3xl space-y-6">
            <h2 className="text-3xl font-semibold text-white tracking-tight">Understanding agent autonomy through math.</h2>
            <p className="text-xl leading-relaxed text-gray-400 font-light">
              I built Sortiq to demystify how agents learn. Instead of using high-level libraries, I implemented the <strong>Q-Learning</strong> loop from scratch to see exactly how an agent balances accuracy against environmental survival.
            </p>
          </div>
        </section>

        {/* 02: ENVIRONMENT (Terminal Cards) */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 text-[#00ff9f] font-mono text-[10px] tracking-widest uppercase">
            <span>[02]</span>
            <span className="font-bold">// Environment Constraints</span>
            <div className="flex-1 h-[1px] bg-[#00ff9f]/10" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#08080c] border border-white/5 p-8 rounded-xl space-y-4 group hover:border-[#3a86ff]/30 transition-colors">
               <div className="w-8 h-8 rounded-lg bg-[#3a86ff]/10 flex items-center justify-center text-[#3a86ff] text-xs font-mono">0x1</div>
               <h3 className="text-white font-bold tracking-widest uppercase text-xs">Storage Capacity</h3>
               <p className="text-sm text-gray-500 leading-relaxed italic">"The agent manages a 6-unit buffer. Exceeding this triggers an immediate system crash (-20.0 penalty)."</p>
            </div>
            <div className="bg-[#08080c] border border-white/5 p-8 rounded-xl space-y-4 group hover:border-[#00ff9f]/30 transition-colors">
               <div className="w-8 h-8 rounded-lg bg-[#00ff9f]/10 flex items-center justify-center text-[#00ff9f] text-xs font-mono">0x2</div>
               <h3 className="text-white font-bold tracking-widest uppercase text-xs">Energy Scarcity</h3>
               <p className="text-sm text-gray-500 leading-relaxed italic">"Every action depletes power. The agent must optimize its sequence to sort 10 items within 4 energy units."</p>
            </div>
          </div>
        </section>

        {/* 03: REWARD LOGIC (Code Style) */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 text-[#ffd32a] font-mono text-[10px] tracking-widest uppercase">
            <span>[03]</span>
            <span className="font-bold">// Reward Architecture</span>
            <div className="flex-1 h-[1px] bg-[#ffd32a]/10" />
          </div>
          <div className="bg-black border border-white/5 p-12 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-gray-800 uppercase">sortiq_reward_v1.py</div>
            <div className="space-y-6 font-mono text-sm tracking-tighter">
               {[
                 { label: 'CORRECT_CLASSIFICATION', val: '+8.0', color: 'text-[#00ff9f]' },
                 { label: 'MISCLASSIFICATION', val: '-8.0', color: 'text-[#ff3355]' },
                 { label: 'SYSTEM_FATAL_CRASH', val: '-20.0', color: 'bg-[#ff3355] text-black px-2 font-bold' },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-gray-600">const {item.label} =</span>
                   <span className={item.color}>{item.val};</span>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* 04: ANALYTICS (Big Proofs) */}
        <section className="space-y-20 pt-20 border-t border-white/5">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em]">04 // PROOF OF PERFORMANCE</h2>
            <p className="text-xl text-white font-light tracking-tight">Real-time inference vs. Stochastic Baseline</p>
          </div>

          <div className="space-y-32">
            <div className="space-y-8">
              <div className="bg-[#05050a] border border-white/5 p-4 rounded-3xl overflow-hidden group">
                <img 
                  src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png" 
                  alt="Proof" 
                  className="w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <p className="text-center text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase">Fig_01 // Average Reward Convergence</p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#05050a] border border-white/5 p-4 rounded-3xl overflow-hidden group">
                <img 
                  src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png" 
                  alt="Curve" 
                  className="w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <p className="text-center text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase">Fig_02 // Training Stability (15k Episodes)</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-40 border-t border-white/5 text-center space-y-4">
          <p className="text-[10px] font-mono text-gray-800 tracking-[0.5em] uppercase">
            Sortiq Research Lab // Built by Durgaprasad Reddy
          </p>
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
