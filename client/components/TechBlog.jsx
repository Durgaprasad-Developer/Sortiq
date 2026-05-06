import React from 'react';

const TechBlog = () => {
  return (
    <div id="tech-blog" className="mt-20 max-w-4xl mx-auto p-8 bg-[#0a0a14] border border-[#1a1a2e] rounded-xl font-sans leading-relaxed text-gray-300 shadow-2xl mb-20 border-t-4 border-t-[#3a86ff]">
      <h1 className="text-4xl font-bold text-white mb-6 border-b border-[#3a86ff]/30 pb-4 flex items-center gap-3">
        <span className="text-3xl">🔬</span> Technical Deep Dive: Building Sortiq RL
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#3a86ff] mb-4 flex items-center gap-2">
          🚀 Purpose
        </h2>
        <p className="text-lg italic border-l-4 border-[#3a86ff] pl-4 py-2 bg-[#3a86ff]/5 mb-4 text-white/90">
          "The best way to master Reinforcement Learning is to build it without the safety net of high-level libraries."
        </p>
        <p>
          Sortiq was built to explore the core implementation of <strong>Q-Learning from scratch</strong>. The goal was to create a functional system that can be deployed in production (Hugging Face) while maintaining developer-mode transparency. This project serves as a template for future RL implementations in robotics, logistics, and resource management.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#06d6a0] mb-4 flex items-center gap-2">
          🌍 The Environment: Classification with Constraints
        </h2>
        <p>
          Unlike standard classification (where you just predict a label), Sortiq is a <strong>Constrained Markov Decision Process (MDP)</strong>. The agent must make decisions based on visual features while managing two physical limits:
        </p>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="bg-[#1a1a2e] p-4 rounded border border-[#06d6a0]/20">
            <p className="text-[#06d6a0] font-bold">📦 Storage Capacity</p>
            <p className="text-sm">Maximum 6 items. You can't store everything even if it's fresh fruit.</p>
          </div>
          <div className="bg-[#1a1a2e] p-4 rounded border border-[#06d6a0]/20">
            <p className="text-[#06d6a0] font-bold">⚡ Crusher Energy</p>
            <p className="text-sm">Maximum 4 pulses. You can't crush everything even if it's waste.</p>
          </div>
        </div>
        <p className="mt-4">
          This forces the agent to learn <strong>Priority</strong>. If storage is full, it might have to "sacrifice" a fruit to the crusher just to stay alive and continue the episode.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#ff6b6b] mb-4 flex items-center gap-2">
          🎨 Features & Hidden Probabilities
        </h2>
        <p>
          The agent observes <strong>288 unique visual combinations</strong> (8 Colors × 6 Shapes × 6 Textures). 
          Crucially, the agent <strong>never sees the label</strong> (Fruit vs. Waste).
        </p>
        <div className="bg-[#1a1a2e] p-5 rounded-lg my-4 border border-[#ff6b6b]/20 bg-gradient-to-r from-[#1a1a2e] to-[#2a1a2e]">
          <p className="font-mono text-sm text-[#ff6b6b] mb-2 font-bold uppercase tracking-wider"># Overlap Prevention via Statistical Weights</p>
          <p className="text-sm leading-relaxed">
            We prevent "hard rules" by using a <strong>weighted probability system</strong>. For example, "Red" items have a 30% weight for Fruits but only 4% for Waste. 
            The agent isn't learning an <code>if/else</code> script; it is learning to estimate the <strong>Maximum Likelihood</strong> of an item's type based on its traits.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#ffd166] mb-4 flex items-center gap-2">
          💰 The Reward System & Anti-Hacking
        </h2>
        <p>
          The reward function is the "Engine" of RL. We designed it to balance speed and safety:
        </p>
        <div className="overflow-hidden rounded-lg border border-white/10 mt-4 shadow-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#ffd166]/10 text-white font-bold border-b border-white/10">
                <th className="p-3 text-left">Action Result</th>
                <th className="p-3 text-left">Reward</th>
                <th className="p-3 text-left">Strategic Intent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-white/5"><td className="p-3 font-semibold text-white">Correct Action</td><td className="p-3 text-[#06d6a0] font-mono">+8</td><td>Encourage accuracy</td></tr>
              <tr><td className="p-3 font-semibold text-white">Wrong Action</td><td className="p-3 text-[#ff6b6b] font-mono">-8</td><td>Discourage mistakes</td></tr>
              <tr className="bg-red-500/10"><td className="p-3 font-bold text-red-400">System Crash</td><td className="p-3 text-red-500 font-mono font-bold">-20</td><td>Prevent resource depletion</td></tr>
              <tr><td className="p-3 font-semibold text-white">Episode Clear</td><td className="p-3 text-[#3a86ff] font-mono">+15</td><td>Reward long-term planning</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-bold text-white uppercase text-xs tracking-widest text-[#ffd166]">Avoiding Reward Hacking:</p>
        <p className="mt-1">
          In early versions, the agent learned to "Crash" immediately if it guessed wrong twice, just to stop receiving negative rewards. By adding the <strong>-20 System Crash penalty</strong>, we ensured the agent values <strong>Survival</strong> above all else.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-[#3a86ff] mb-4 flex items-center gap-2">
          🧠 Implementation: Q-Learning
        </h2>
        <p>
          We implemented the <strong>Bellman Equation</strong> using a Discrete Q-Table:
        </p>
        <div className="font-mono text-[#06d6a0] my-4 p-4 bg-black rounded-lg text-center border border-[#06d6a0]/30 shadow-inner italic">
          Q(s,a) = Q(s,a) + α [R + γ max(Q(s', a')) - Q(s,a)]
        </div>
        <ul className="list-disc pl-6 space-y-3 mt-4 text-white/80">
          <li><strong>Exploration (Epsilon-Greedy):</strong> We start at 100% random exploration and decay by 0.99 every episode. This ensures the agent "maps" the 10,000+ states before committing to a strategy.</li>
          <li><strong>State Space Hashing:</strong> We combine features and resource levels into a unique string key (e.g., <code>"Red-Round-Hard-6-4"</code>) for <strong>O(1)</strong> lookup time during real-time inference.</li>
        </ul>
      </section>

      <section className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">📊 Performance Metrics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/50 p-3 rounded-lg border border-white/10 shadow-2xl">
            <p className="text-[10px] text-gray-500 mb-2 font-mono uppercase">Training Curve (15,000 Episodes)</p>
            <img 
              src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/training_curve.png" 
              alt="Training Curve" 
              className="rounded shadow-lg"
            />
          </div>
          <div className="bg-black/50 p-3 rounded-lg border border-white/10 shadow-2xl">
            <p className="text-[10px] text-gray-500 mb-2 font-mono uppercase">Random Baseline vs. Q-Agent</p>
            <img 
              src="https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/comparison.png" 
              alt="Comparison" 
              className="rounded shadow-lg"
            />
          </div>
        </div>
        <p className="mt-8 text-xl text-[#06d6a0] font-bold tracking-tight">
          Success Rate: ~94% after convergence 🚀
        </p>
      </section>

      <footer className="text-center pt-8 border-t border-white/5 mt-12 flex flex-col items-center gap-2">
        <div className="flex gap-4 text-xs font-mono text-gray-500 uppercase tracking-tighter">
          <span>Python 3.12</span>
          <span>FastAPI</span>
          <span>Next.js 14</span>
          <span>NumPy</span>
        </div>
        <p className="text-gray-400 font-semibold mt-4">Built by Durgaprasad-Developer</p>
      </footer>
    </div>
  );
};

export default TechBlog;
