const TechBlog = () => {
  return (
    <article id="tech-blog" className="w-full bg-[#08080c] text-gray-300 font-sans selection:bg-[#3a86ff]/30 py-32 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        
        {/* EDITORIAL HEADER */}
        <header className="mb-20 space-y-8 border-b border-white/5 pb-16">
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] text-[#3a86ff] uppercase">
            <span>May 06, 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-800" />
            <span>12 Minute Read</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Sortiq: Training a Neural Agent to Navigate <span className="text-[#3a86ff]">Physical Constraints</span>.
          </h1>
          
          <div className="flex items-center gap-4 pt-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3a86ff] to-[#00d2ff] p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white">DP</div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white tracking-wide">Durgaprasad Reddy</p>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Machine Learning Architect</p>
            </div>
          </div>
        </header>

        {/* NARRATIVE CONTENT */}
        <div className="space-y-12 text-lg text-gray-400 leading-relaxed font-light">
          <p className="text-xl text-white font-normal leading-snug">
            Traditional sorting algorithms are deterministic. We wanted to build a system that is <span className="italic underline decoration-[#3a86ff]/40 underline-offset-8">experiential</span>—an agent that learns through the brutal repetition of failure and reward.
          </p>

          <p>
            The project began with a simple question: Can a reinforcement learning agent develop "common sense" about resource management? In the Sortiq environment, the agent doesn't just sort items; it must manage energy and storage space.
          </p>

          <h2 className="text-2xl font-bold text-white pt-8 tracking-tight">The Reward Paradox</h2>
          <p>
            The hardest lesson for the Sortiq agent wasn't identifying a fruit from waste—it was learning when to <strong>do nothing</strong>. In an environment with finite energy, taking an action is often more expensive than the potential reward.
          </p>

          <div className="bg-black/60 border border-white/5 p-8 rounded-xl my-12 font-mono text-[11px] space-y-4">
             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-gray-600 uppercase tracking-widest">Action_Correct</span>
               <span className="text-[#00ff9f]">+8.0</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-gray-600 uppercase tracking-widest">Collision_Penalty</span>
               <span className="text-[#ff3355]">-20.0</span>
             </div>
             <p className="text-[9px] text-gray-700 italic pt-2">// The agent prioritizes survival over accuracy at low energy levels.</p>
          </div>

          <h2 className="text-2xl font-bold text-white pt-8 tracking-tight">Convergence & Real-time Inference</h2>
          <p>
            After roughly 15,000 episodes of training, the agent's Q-table begins to stabilize. The visualization you see at the top of this page is a live inference of those learned weights.
          </p>

          <figure className="my-16 space-y-4">
            <div className="bg-[#05050a] border border-white/5 p-4 rounded-xl group overflow-hidden">
              <img 
                src="/assets/comparison.png" 
                alt="Convergence Graph" 
                className="w-full opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
              />
            </div>
            <figcaption className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              Figure 1.2: Reward distribution across training iterations.
            </figcaption>
          </figure>

          <h2 className="text-2xl font-bold text-white pt-8 tracking-tight">Looking Ahead</h2>
          <p>
            The current architecture demonstrates the power of pure Q-learning in discrete environments. Future versions will explore <strong>Deep Q-Networks (DQN)</strong> to handle more complex, overlapping sensory data.
          </p>
        </div>

        {/* BLOG FOOTER */}
        <footer className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-[9px] font-mono text-gray-700 tracking-[0.5em] uppercase">
            Sortiq Research Lab // 2026
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-500 hover:text-[#3a86ff] transition-colors uppercase tracking-widest">Documentation</a>
            <a href="#" className="text-xs text-gray-500 hover:text-[#3a86ff] transition-colors uppercase tracking-widest">GitHub</a>
          </div>
        </footer>

      </div>
    </article>
  );
};

export default TechBlog;

export default TechBlog;
