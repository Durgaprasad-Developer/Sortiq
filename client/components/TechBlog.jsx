const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#050508] text-gray-400 font-sans selection:bg-[#3a86ff]/30 py-24 px-8 md:px-20">
      <div className="w-full space-y-32">
        
        {/* SECTION 1: PROJECT PURPOSE */}
        <section className="space-y-8 border-b border-white/5 pb-16">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white uppercase font-mono">
            Project Purpose // RL Learning
          </h1>
          <p className="text-xl leading-relaxed text-gray-400 max-w-5xl">
            I built Sortiq to understand how Reinforcement Learning works in a real-world scenario with physical constraints. Instead of just classifying images, the agent has to make decisions based on its remaining resources. This project helped me grasp the <strong>State-Action-Reward</strong> loop and the Bellman Equation.
          </p>
        </section>

        {/* SECTION 2: THE ENVIRONMENT & CONSTRAINTS */}
        <section className="space-y-8">
          <h2 className="text-2xl font-mono text-[#3a86ff] tracking-[0.3em] uppercase">01 // Environment & Constraints</h2>
          <div className="space-y-6 text-xl text-gray-500 leading-relaxed max-w-5xl">
            <p>
              The simulation is a <strong>Constrained MDP</strong>. The agent isn't just sorting items; it's managing a system that can fail. 
            </p>
            <ul className="space-y-4 list-disc list-inside">
              <li><span className="text-white">Storage Capacity:</span> Only 6 items can be stored. If the agent stores a 7th item, the system crashes.</li>
              <li><span className="text-white">Energy Management:</span> Actions cost energy. The agent has to decide if an item is worth the energy cost to sort it.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: REWARD LOGIC */}
        <section className="space-y-8">
          <h2 className="text-2xl font-mono text-[#00ff9f] tracking-[0.3em] uppercase">02 // Reward Logic (The Q-Table)</h2>
          <div className="space-y-6 text-xl text-gray-500 leading-relaxed max-w-5xl">
            <p>
              The agent uses <strong>Q-Learning</strong> to update its weights. I designed the reward signal to punish system failures more than simple sorting errors.
            </p>
            <div className="bg-black/40 border border-white/5 p-10 rounded-2xl font-mono text-lg space-y-4 max-w-3xl">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Correct Sort</span>
                <span className="text-[#00ff9f]">+8.0</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Wrong Sort</span>
                <span className="text-[#ff3355]">-8.0</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>System Crash</span>
                <span className="text-[#ff3355] font-bold">-20.0</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROOF & ANALYTICS */}
        <section className="space-y-20 pt-16 border-t border-white/5">
          <div className="space-y-8">
            <h2 className="text-2xl font-mono text-[#ffd32a] tracking-[0.3em] uppercase">03 // Proof of Learning (Trained vs Random)</h2>
            <p className="text-xl text-gray-500 max-w-5xl">
              The graph below compares my trained Q-Learning agent against a random baseline. You can see the agent successfully learns to avoid crashes and maximize its score after training.
            </p>
            <div className="bg-black/60 border border-white/5 p-4 rounded-3xl overflow-hidden">
              <img 
                src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png" 
                alt="Baseline Comparison" 
                className="w-full h-auto opacity-90 shadow-2xl"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-mono text-[#ff6b35] tracking-[0.3em] uppercase">04 // Training Curve</h2>
            <p className="text-xl text-gray-500 max-w-5xl">
              This curve shows the reward stabilization over 15,000 episodes. The initial volatility represents the agent exploring the environment and failing, while the latter half shows convergence.
            </p>
            <div className="bg-black/60 border border-white/5 p-4 rounded-3xl overflow-hidden">
              <img 
                src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png" 
                alt="Training Curve" 
                className="w-full h-auto opacity-90 shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-20 border-t border-white/5 text-[12px] font-mono text-gray-700 tracking-[0.5em] uppercase">
          Sortiq RL System // Built by Durgaprasad Reddy
        </footer>

      </div>
    </article>
  )
}

export default TechBlog
