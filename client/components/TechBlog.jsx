const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#050508] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-24 px-8 md:px-24">
      <div className="w-full max-w-[1400px] mx-auto space-y-32">
        
        {/* 1. PURPOSE */}
        <section className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Project Purpose</h1>
          <p className="text-xl leading-relaxed text-gray-400 max-w-4xl">
            I built Sortiq to explore <strong>Reinforcement Learning</strong> fundamentals. The goal was to move beyond simple classification and create an agent that must navigate physical constraints—managing storage and energy while maintaining sorting accuracy.
          </p>
        </section>

        {/* 2. ENVIRONMENT */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-white tracking-tight border-b border-white/5 pb-4">Environment & Constraints</h2>
          <div className="space-y-6 text-xl leading-relaxed">
            <p>The agent operates in a constrained Markov Decision Process (MDP) with two primary bottlenecks:</p>
            <ul className="space-y-4 list-none">
              <li className="flex gap-4">
                <span className="text-[#3a86ff] font-bold">●</span>
                <span><strong>Storage Capacity:</strong> A strict 6-unit limit forces the agent to learn the risk of system overflow.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-[#3a86ff] font-bold">●</span>
                <span><strong>Energy Management:</strong> Every action has a cost. The agent must survive 10 items per episode without depleting its energy.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. REWARD LOGIC */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-white tracking-tight border-b border-white/5 pb-4">Reward Logic</h2>
          <div className="space-y-6 text-xl leading-relaxed">
            <p>The agent's "brain" is a Q-Table updated via the Bellman Equation. The reward signal is designed to prioritize survival over points:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                <p className="text-xs font-mono text-gray-600 uppercase mb-2">Correct Sort</p>
                <p className="text-2xl font-bold text-[#00ff9f]">+8.0</p>
              </div>
              <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                <p className="text-xs font-mono text-gray-600 uppercase mb-2">Wrong Sort</p>
                <p className="text-2xl font-bold text-[#ff3355]">-8.0</p>
              </div>
              <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                <p className="text-xs font-mono text-gray-600 uppercase mb-2">System Crash</p>
                <p className="text-2xl font-bold text-[#ff3355]">-20.0</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PERFORMANCE PROOFS */}
        <section className="space-y-24 pt-16 border-t border-white/5">
          
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">Performance Comparison</h2>
              <p className="text-lg text-gray-500 italic">Random Baseline vs. Trained Q-Learning Agent</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-4 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png" 
                alt="Baseline Comparison" 
                className="w-full h-auto opacity-90"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">Training Convergence</h2>
              <p className="text-lg text-gray-500 italic">Reward stabilization over 15,000 learning iterations</p>
            </div>
            <div className="bg-black/60 border border-white/5 p-4 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png" 
                alt="Training Curve" 
                className="w-full h-auto opacity-90"
              />
            </div>
          </div>

        </section>

        {/* FOOTER */}
        <footer className="pt-20 border-t border-white/5 text-[10px] font-mono text-gray-800 tracking-[0.5em] uppercase text-center">
          Sortiq RL Project // Built by Durgaprasad Reddy
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
