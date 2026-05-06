const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#05050a] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-32 px-12 md:px-24">
      <div className="w-full space-y-48">
        
        {/* 1. PROJECT PURPOSE */}
        <section className="space-y-12 border-b border-white/5 pb-24">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase font-mono">
            Project Purpose // RL Learning
          </h1>
          <p className="text-2xl leading-relaxed text-gray-500 max-w-6xl font-light">
            I built Sortiq as a personal project to understand the core mechanics of <strong>Reinforcement Learning</strong>. The goal was to create a classification task that operates under physical constraints, forcing an agent to learn not just the "correct" category, but the optimal timing of actions to avoid environmental failure.
          </p>
        </section>

        {/* 2. THE ENVIRONMENT */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">01 // Environment & Constraints</h2>
          <div className="space-y-8 text-xl leading-relaxed text-gray-400">
            <p>
              The simulation is a constrained Markov Decision Process (MDP). The agent manages a conveyor belt with two primary bottlenecks:
            </p>
            <ul className="space-y-6 list-none">
              <li className="flex gap-6 items-start">
                <span className="text-[#3a86ff] text-2xl">•</span>
                <p><strong>Storage Capacity:</strong> A strict 6-unit limit. Storing a 7th item triggers a system crash, resulting in a heavy reward penalty.</p>
              </li>
              <li className="flex gap-6 items-start">
                <span className="text-[#3a86ff] text-2xl">•</span>
                <p><strong>Energy Scarcity:</strong> Every action costs power. The agent has a budget of 4 energy units to handle 10 items per episode.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. REWARD LOGIC */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">02 // Reward & Agent Training</h2>
          <div className="space-y-8 text-xl leading-relaxed text-gray-400">
            <p>
              The agent uses <strong>Q-Learning</strong> to update its weights based on a specific reward signal. I designed this signal to prioritize survival over simple accuracy:
            </p>
            <div className="bg-black/40 border border-white/5 p-12 rounded-3xl font-mono text-xl space-y-6 max-w-4xl">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-600 uppercase tracking-widest">Correct_Action</span>
                <span className="text-[#00ff9f]">+8.0</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-600 uppercase tracking-widest">Wrong_Action</span>
                <span className="text-[#ff3355]">-8.0</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-600 uppercase tracking-widest">System_Crash</span>
                <span className="text-[#ff3355] font-bold">-20.0</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PERFORMANCE PROOFS */}
        <section className="space-y-32 pt-24 border-t border-white/5">
          
          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">03 // Proof: Baseline vs. Agent</h2>
            <p className="text-xl text-gray-500">
              The graph below demonstrates the quantitative difference between a random agent and our trained Q-Learning model.
            </p>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png" 
                alt="Baseline Comparison" 
                className="w-full h-auto opacity-90"
              />
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-3xl font-bold text-white tracking-tight">04 // Training Stability</h2>
            <p className="text-xl text-gray-500">
              This curve shows reward convergence over 15,000 episodes, indicating successful learning of the state-space.
            </p>
            <div className="bg-black/60 border border-white/5 p-6 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png" 
                alt="Training Curve" 
                className="w-full h-auto opacity-90"
              />
            </div>
          </div>

        </section>

        {/* FOOTER */}
        <footer className="pt-24 border-t border-white/5 text-[10px] font-mono text-gray-800 uppercase tracking-[0.5em] text-center">
          Sortiq RL System // Built by Durgaprasad Reddy
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
