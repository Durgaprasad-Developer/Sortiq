const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#020406] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-24 px-8 md:px-20 relative overflow-hidden">
      
      {/* BACKGROUND GRID DECOR */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#3a86ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-[1400px] mx-auto space-y-32 relative z-10">
        
        {/* 01. PURPOSE SECTION */}
        <section className="space-y-10">
          <div className="flex items-center gap-4 text-[#3a86ff] font-mono text-[10px] tracking-[0.5em] uppercase">
            <span className="px-2 py-1 border border-[#3a86ff]/30 bg-[#3a86ff]/5">DOC_01</span>
            <span>// Project Purpose</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#3a86ff]/30 to-transparent" />
          </div>
          
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-none">
              Inference <br/>
              <span className="text-[#3a86ff] not-italic">Fundamentals</span>
            </h1>
            <p className="text-2xl leading-relaxed text-gray-400 max-w-5xl font-light">
              I built Sortiq as a deep-dive into <strong>Reinforcement Learning</strong>. The objective was to move beyond static classification and master a dynamic, constrained environment. This project demonstrates an agent's ability to develop mathematical intuition for resource management through the <strong>Q-Learning</strong> loop.
            </p>
          </div>
        </section>

        {/* 02. ENVIRONMENT LOGIC */}
        <section className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div className="flex items-center gap-4 text-[#00ff9f] font-mono text-[10px] tracking-[0.5em] uppercase">
               <span>SYS_02</span>
               <span>// Constraints</span>
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase">The Environment</h2>
              <div className="space-y-6 text-lg text-gray-500 border-l border-white/10 pl-8">
                <p>The agent operates in a constrained MDP where survival is the primary objective:</p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-[#00ff9f] font-mono">01_</span>
                    <span><strong>Buffer Limit:</strong> 6-unit storage. Overflow triggers immediate failure (-20.0 penalty).</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#00ff9f] font-mono">02_</span>
                    <span><strong>Power Budget:</strong> 4 units per episode. Efficiency is mandatory.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-4 text-[#ffd32a] font-mono text-[10px] tracking-[0.5em] uppercase">
               <span>VAL_03</span>
               <span>// Reward Logic</span>
            </div>
            <div className="bg-[#05080a] border border-white/5 p-10 rounded-2xl font-mono text-sm space-y-4 shadow-2xl">
               <div className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-gray-600 tracking-widest uppercase">Action_Correct</span>
                 <span className="text-[#00ff9f]">+8.0</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-gray-600 tracking-widest uppercase">Action_Error</span>
                 <span className="text-[#ff3355]">-8.0</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-gray-600 tracking-widest uppercase">System_Crash</span>
                 <span className="text-black bg-[#ff3355] px-2 font-bold">-20.0</span>
               </div>
               <p className="text-[10px] text-gray-800 italic pt-2 tracking-widest">// Policy: Q(s,a) = R + γ max Q(s',a')</p>
            </div>
          </div>
        </section>

        {/* 03. PERFORMANCE PROOFS */}
        <section className="space-y-32 pt-16 border-t border-white/5">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-mono text-gray-600 uppercase tracking-[1em]">Analytics // Validation</h2>
            <p className="text-xl text-white font-light tracking-widest uppercase">Performance Data & Convergence</p>
          </div>

          <div className="space-y-32">
            {/* FIG 01 */}
            <div className="space-y-10">
               <div className="bg-black/60 border border-white/5 p-4 rounded-3xl overflow-hidden shadow-2xl group">
                 <img 
                   src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png" 
                   alt="Comparison" 
                   className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                 />
               </div>
               <p className="text-center text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase italic">Fig_01 // Q-Learning vs. Random Baseline</p>
            </div>

            {/* FIG 02 */}
            <div className="space-y-10">
               <div className="bg-black/60 border border-white/5 p-4 rounded-3xl overflow-hidden shadow-2xl group">
                 <img 
                   src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png" 
                   alt="Curve" 
                   className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                 />
               </div>
               <p className="text-center text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase italic">Fig_02 // Reward Stabilization Curve (15k Episodes)</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-24 border-t border-white/5 text-center space-y-4">
          <p className="text-[10px] font-mono text-gray-800 tracking-[1em] uppercase">
            Sortiq Research // Project by Durgaprasad Reddy
          </p>
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
