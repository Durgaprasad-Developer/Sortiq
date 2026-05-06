const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#050508] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-24 px-8 md:px-16 flex flex-col items-center">
      <div className="w-full max-w-[1400px] space-y-32">
        
        {/* PROJECT HEADER */}
        <header className="space-y-6 border-b border-white/5 pb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase font-mono">
            Project: Sortiq // RL Learning Environment
          </h1>
          <p className="text-xl text-gray-500 max-w-4xl leading-relaxed">
            This project was built to understand the fundamentals of Reinforcement Learning. It is a classification task under physical constraints, where an agent learns to prioritize actions based on environmental state rather than just simple labels.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-24">
          {/* SECTION 1: PURPOSE & ENV */}
          <section className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-xl font-mono text-[#3a86ff] tracking-[0.3em] uppercase">01 // Purpose & Environment</h2>
              <div className="h-[1px] w-20 bg-[#3a86ff]" />
            </div>
            <div className="space-y-6 text-lg leading-relaxed font-light">
              <p>
                The goal was to move beyond static datasets and explore a <strong>Markov Decision Process (MDP)</strong>. In this environment, the agent must sort items while managing two critical constraints:
              </p>
              <ul className="space-y-4 list-disc list-inside text-gray-500">
                <li><span className="text-white">Storage Limit:</span> The store can only hold 6 items. Overfilling causes a system crash.</li>
                <li><span className="text-white">Energy Limit:</span> Every action (Store or Crush) costs energy. The agent must survive 10 items per episode.</li>
              </ul>
              <p>
                This forced me to implement a reward structure that balances accuracy with survival—the agent eventually learns to "wait" when resources are low.
              </p>
            </div>
          </section>

          {/* SECTION 2: REWARD LOGIC */}
          <section className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-xl font-mono text-[#00ff9f] tracking-[0.3em] uppercase">02 // Reward & Agent</h2>
              <div className="h-[1px] w-20 bg-[#00ff9f]" />
            </div>
            <div className="space-y-6">
               <p className="text-lg font-light">
                 I implemented a <strong>Q-Learning</strong> agent using a discrete Q-Table. The agent updates its understanding of state-action pairs using the Bellman Equation:
               </p>
               <div className="bg-black/40 border border-white/5 p-8 rounded-xl font-mono text-sm space-y-4">
                 <div className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-gray-600 uppercase">Correct_Sort</span>
                   <span className="text-[#00ff9f]">+8.0 pts</span>
                 </div>
                 <div className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-gray-600 uppercase">Wrong_Sort</span>
                   <span className="text-[#ff3355]">-8.0 pts</span>
                 </div>
                 <div className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-gray-600 uppercase">System_Crash</span>
                   <span className="text-[#ff3355] font-bold">-20.0 pts</span>
                 </div>
                 <p className="text-[10px] text-gray-700 italic pt-2">// State = (storage_count, energy_left, item_type)</p>
               </div>
            </div>
          </section>
        </div>

        {/* SECTION 3: PROOFS & ANALYTICS */}
        <section className="space-y-16 pt-16 border-t border-white/5">
          <div className="space-y-4">
            <h2 className="text-xl font-mono text-[#ffd32a] tracking-[0.3em] uppercase text-center">03 // Proof of Learning</h2>
            <p className="text-center text-gray-500 max-w-2xl mx-auto">
              Comparing a random agent (no learning) against our trained Q-Table agent shows clear convergence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-[#05050a] border border-white/5 p-6 rounded-xl">
                <img 
                  src="/assets/comparison.png" 
                  alt="Training Performance" 
                  className="w-full opacity-90"
                />
              </div>
              <p className="text-center text-xs font-mono text-gray-700 uppercase tracking-widest">
                Fig 3.1 // Trained Agent vs Random Baseline
              </p>
            </div>
            
            <div className="flex flex-col justify-center space-y-8">
              <div className="border-l-4 border-[#ffd32a] pl-8 space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">The Training Curve</h3>
                <p className="text-lg text-gray-400 font-light leading-relaxed">
                  As shown in the data, the agent initially fails almost 100% of the time. Around episode 2,000, it begins to understand the "survival" penalty, and by episode 15,000, it reaches a steady state of nearly perfect sorting within the given constraints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-24 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-800 uppercase tracking-[0.5em]">
          <span>Sortiq RL Project // Durgaprasad Reddy</span>
          <div className="flex gap-8">
            <span>Next.js</span>
            <span>FastAPI</span>
            <span>Q-Learning</span>
          </div>
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
