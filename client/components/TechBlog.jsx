const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#020408] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-48 px-8 md:px-24 relative overflow-hidden">
      
      {/* AMBIENT BACKGROUND DECOR */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3a86ff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3a86ff]/50 to-transparent" />

      <div className="w-full max-w-[1400px] mx-auto space-y-80 relative z-10">
        
        {/* 01. HERO HEADER */}
        <header className="space-y-12">
          <div className="flex items-center gap-4 text-[#3a86ff] font-mono text-[11px] tracking-[0.6em] uppercase">
            <span className="px-3 py-1 border border-[#3a86ff]/40 bg-[#3a86ff]/10">STATUS: STABLE</span>
            <span>// SORTIQ_RL_INFERENCE</span>
          </div>
          
          <div className="space-y-8">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-tight">
              DECISION <br/>
              <span className="text-[#3a86ff] not-italic">KERNELS</span>
            </h1>
            <p className="text-2xl md:text-3xl leading-relaxed text-gray-500 max-w-5xl font-light">
              Mastering autonomous classification within a constrained Markov Decision Process. This project is a foundational deep-dive into <strong>Q-Learning</strong> architectures.
            </p>
          </div>
        </header>

        {/* 02. TECHNICAL SPECS */}
        <section className="grid lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <div className="flex items-center gap-4 text-[#00ff9f] font-mono text-[10px] tracking-[0.5em] uppercase">
               <span>SYS_SPEC</span>
               <span>// Environment Rules</span>
            </div>
            <div className="space-y-10 border-l-2 border-[#00ff9f]/20 pl-10">
              <div className="space-y-4">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">Storage Capacity [6 Units]</h3>
                <p className="text-lg text-gray-500 leading-relaxed italic font-light">
                  "The agent learns to manage a physical buffer. Exceeding capacity triggers a fatal system overflow with a -20.0 reward penalty."
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">Thermal Energy [4 Units]</h3>
                <p className="text-lg text-gray-500 leading-relaxed italic font-light">
                  "Efficiency is not optional. Every sort operation has a cost. The agent must survive the 10-item batch without power depletion."
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-4 text-[#ffd32a] font-mono text-[10px] tracking-[0.5em] uppercase">
               <span>LOGIC_TABLE</span>
               <span>// Reward Matrix</span>
            </div>
            <div className="bg-[#05080c] border border-white/5 p-12 rounded-[2.5rem] font-mono text-base space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
               <div className="flex justify-between border-b border-white/5 pb-4">
                 <span className="text-gray-600 uppercase">SORT_CORRECT</span>
                 <span className="text-[#00ff9f]">+8.0</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-4">
                 <span className="text-gray-600 uppercase">SORT_ERROR</span>
                 <span className="text-[#ff3355]">-8.0</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-4">
                 <span className="text-gray-600 uppercase">FATAL_CRASH</span>
                 <span className="text-black bg-[#ff3355] px-3 py-1 font-bold rounded-sm">-20.0</span>
               </div>
               <p className="text-[10px] text-gray-800 italic pt-4 tracking-[0.3em] uppercase">
                 // State = (Buffer, Energy, Object_ID)
               </p>
            </div>
          </div>
        </section>

        {/* 03. PERFORMANCE PROOFS */}
        <section className="space-y-48 pt-24 border-t border-white/5">
          <div className="text-center space-y-6">
            <h2 className="text-[10px] font-mono text-gray-700 uppercase tracking-[1.5em]">Analytics // Validation</h2>
            <p className="text-2xl text-white font-light tracking-[0.2em] uppercase italic">Quantitative Convergence Proofs</p>
          </div>

          <div className="space-y-64">
            {/* FIG 01 */}
            <div className="space-y-12">
               <div className="bg-black/80 border border-white/5 p-6 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(58,134,255,0.1)] group">
                 <img 
                   src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png" 
                   alt="Comparison" 
                   className="w-full h-auto opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
                 />
               </div>
               <p className="text-center text-[10px] font-mono text-gray-800 tracking-[0.8em] uppercase italic">Fig_01 // Trained Agent vs. Random Stochastic Baseline</p>
            </div>

            {/* FIG 02 */}
            <div className="space-y-12">
               <div className="bg-black/80 border border-white/5 p-6 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(0,255,159,0.1)] group">
                 <img 
                   src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png" 
                   alt="Curve" 
                   className="w-full h-auto opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105"
                 />
               </div>
               <p className="text-center text-[10px] font-mono text-gray-800 tracking-[0.8em] uppercase italic">Fig_02 // Reward Stabilization Curve (15,000 Iterations)</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-48 border-t border-white/5 text-center space-y-6 opacity-30">
          <p className="text-[9px] font-mono text-gray-500 tracking-[1.5em] uppercase">
            Sortiq RL Engine // Built by Durgaprasad Reddy
          </p>
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
