// TechBlog.jsx
// Stack: Next.js (React) + Tailwind CSS
// Font: JetBrains Mono — add to _document.js or layout.js:
// <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

const MONO = "'JetBrains Mono', monospace";

const rewardData = [
  { outcome: "SORT_CORRECT",    reward: "+8.0",  desc: "Fruit stored OR Waste crushed",              pos: true,  fatal: false },
  { outcome: "SORT_INCORRECT",  reward: "-8.0",  desc: "Waste stored OR Fruit crushed",              pos: false, fatal: false },
  { outcome: "EPISODE_SUCCESS", reward: "+15.0", desc: "All 10 items processed successfully",      pos: true,  fatal: false },
  { outcome: "SYSTEM_FAILURE",  reward: "-20.0", desc: "Storage overflow OR out of energy",         pos: false, fatal: true  },
];

const stateVars = [
  { key: "storage_count", range: "0 – 6",         desc: "Items currently in the buffer" },
  { key: "energy_left",   range: "0 – 4",         desc: "Remaining power units for the batch" },
  { key: "item_type",     range: "Fruit | Waste",  desc: "Identity of the item on the belt" },
];

const actions = [
  { id: "0", name: "STORE", cost: "1 Energy", desc: "Move item into the storage buffer" },
  { id: "1", name: "CRUSH", cost: "1 Energy", desc: "Destroy the item — cannot be undone" },
];

const hyperparams = [
  { sym: "α", name: "Learning Rate",   val: "0.10", desc: "How fast old Q-values are overwritten" },
  { sym: "γ", name: "Discount Factor", val: "0.95", desc: "Weight given to future rewards" },
  { sym: "ε", name: "Exploration",     val: "0.30", desc: "Initial probability of a random action" },
];

/* ── Shared primitives ───────────────────────────────── */

function Tag({ children, variant = "default" }) {
  const s = {
    default: { bg: "#0f0f0f", border: "#1f1f1f", color: "#525252" },
    blue:    { bg: "#0c1528", border: "#1e3a8a", color: "#60a5fa" },
    green:   { bg: "#051407", border: "#14532d", color: "#4ade80" },
    orange:  { bg: "#130800", border: "#431407", color: "#fb923c" },
    red:     { bg: "#120404", border: "#450a0a", color: "#f87171" },
  }[variant];
  return (
    <span style={{
      fontFamily: MONO, fontSize: "10px",
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      padding: "3px 10px", borderRadius: "4px",
      letterSpacing: "0.07em", textTransform: "uppercase", display: "inline-block",
    }}>
      {children}
    </span>
  );
}

function InlineCode({ children }) {
  return (
    <code style={{
      fontFamily: MONO, fontSize: "12px",
      background: "#0c1528", border: "1px solid #1e293b", color: "#60a5fa",
      padding: "1px 7px", borderRadius: "4px",
    }}>
      {children}
    </code>
  );
}

function SectionLabel({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
      <span style={{ fontFamily: MONO, fontSize: "11px", color: "#2563eb", letterSpacing: "0.15em" }}>
        {String(num).padStart(2, "0")}
      </span>
      <span style={{ fontFamily: MONO, fontSize: "10px", color: "#3f3f3f", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {title}
      </span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #1a1a1a, transparent)" }} />
    </div>
  );
SectionLabel}

function CodeBlock({ filename, code }) {
  return (
    <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #181818", marginBottom: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "#080808", borderBottom: "1px solid #181818" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f0000", border: "1px solid #7f1d1d", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f2e00", border: "1px solid #78350f", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#003a14", border: "1px solid #14532d", display: "inline-block" }} />
        <span style={{ fontFamily: MONO, fontSize: "11px", color: "#3f3f3f", marginLeft: "8px" }}>{filename}</span>
        <div style={{ flex: 1 }} />
        <Tag variant="green">python</Tag>
      </div>
      <div style={{ background: "#030303", padding: "24px", overflowX: "auto" }}>
        <pre
          style={{ fontFamily: MONO, fontSize: "13px", lineHeight: 2.0, margin: 0, color: "#c9d1d9", whiteSpace: "pre" }}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
    </div>
  );
}

function FigureBlock({ num, title, src, alt, caption }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <span style={{
          fontFamily: MONO, fontSize: "10px",
          background: "#0c1528", border: "1px solid #1e3a8a", color: "#3b82f6",
          padding: "2px 8px", borderRadius: "4px",
        }}>
          FIG {num}
        </span>
        <span style={{ fontFamily: MONO, fontSize: "10px", color: "#3f3f3f", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {title}
        </span>
      </div>
      <div
        style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #181818", background: "#000", transition: "border-color 0.2s", cursor: "zoom-in" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1e3a8a")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#181818")}
      >
        <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" />
      </div>
      <p style={{ fontFamily: MONO, fontSize: "10px", color: "#3f3f3f", marginTop: "10px", textAlign: "center", fontStyle: "italic", letterSpacing: "0.04em" }}>
        {caption}
      </p>
    </div>
  );
}

/* ── Main component ──────────────────────────────────── */

export default function TechBlog() {
  const bellmanCode = [
    `<span style="color:#ff7b72">def</span> <span style="color:#d2a8ff">update_q</span>(state, action, reward, next_state):`,
    `    <span style="color:#6e7681"># Bellman equation — core update rule</span>`,
    `    best_next  <span style="color:#ff7b72">=</span> <span style="color:#d2a8ff">max</span>(Q[next_state].values())`,
    `    td_error   <span style="color:#ff7b72">=</span> reward <span style="color:#ff7b72">+</span> γ <span style="color:#ff7b72">*</span> best_next <span style="color:#ff7b72">-</span> Q[state][action]`,
    `    Q[state][action] <span style="color:#ff7b72">+=</span> α <span style="color:#ff7b72">*</span> td_error`,
    ``,
    `<span style="color:#ff7b72">def</span> <span style="color:#d2a8ff">choose_action</span>(state, epsilon):`,
    `    <span style="color:#6e7681"># ε-greedy: explore early, exploit when confident</span>`,
    `    <span style="color:#ff7b72">if</span> <span style="color:#d2a8ff">random</span>() <span style="color:#ff7b72">&lt;</span> epsilon:`,
    `        <span style="color:#ff7b72">return</span> <span style="color:#d2a8ff">random_action</span>()         <span style="color:#6e7681"># explore</span>`,
    `    <span style="color:#ff7b72">return</span> <span style="color:#d2a8ff">argmax</span>(Q[state])           <span style="color:#6e7681"># exploit</span>`,
    ``,
    `<span style="color:#6e7681"># Hyperparameters</span>`,
    `α  <span style="color:#ff7b72">=</span> <span style="color:#79c0ff">0.10</span>   <span style="color:#6e7681"># learning rate</span>`,
    `γ  <span style="color:#ff7b72">=</span> <span style="color:#79c0ff">0.95</span>   <span style="color:#6e7681"># discount factor</span>`,
    `ε  <span style="color:#ff7b72">=</span> <span style="color:#79c0ff">0.30</span>   <span style="color:#6e7681"># initial exploration rate</span>`,
  ].join("\n");

  return (
    <article style={{ minHeight: "100vh", background: "#000000", color: "#737373" }}>

      {/* Dot grid overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "radial-gradient(#ffffff07 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Top edge glow */}
      <div style={{
        position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "500px", height: "1px",
        background: "linear-gradient(to right, transparent, #3b82f618, transparent)",
        zIndex: 1,
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "760px", margin: "0 auto", padding: "80px 24px 100px" }}>

        {/* ── TERMINAL TOPBAR ── */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "8px 14px", background: "#080808",
          border: "1px solid #1a1a1a", borderRadius: "8px", marginBottom: "32px",
        }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f0000", border: "1px solid #7f1d1d", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3f2e00", border: "1px solid #78350f", display: "inline-block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#003a14", border: "1px solid #14532d", display: "inline-block" }} />
          <span style={{ fontFamily: MONO, fontSize: "11px", color: "#3f3f3f", marginLeft: "10px" }}>
            ~/sortiq/docs/<span style={{ color: "#3b82f6" }}>rl-inference.md</span>
          </span>
        </div>

        {/* ── BREADCRUMB ── */}
        <div style={{ fontFamily: MONO, fontSize: "10px", color: "#2d2d2d", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "40px", display: "flex", gap: "8px", alignItems: "center" }}>
          <span>research</span>
          <span style={{ color: "#1a1a1a" }}>/</span>
          <span>reinforcement-learning</span>
          <span style={{ color: "#1a1a1a" }}>/</span>
          <span style={{ color: "#525252" }}>decision-kernels</span>
        </div>

        {/* ── HERO ── */}
        <header style={{ marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: MONO, fontSize: "10px", color: "#22c55e",
            letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "24px",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
              display: "inline-block", animation: "blink 2s infinite",
            }} />
            v1.0.0 — stable build
          </div>

          <h1 style={{
            fontSize: "clamp(40px, 7vw, 70px)", fontWeight: 900,
            color: "#ffffff", letterSpacing: "-0.03em",
            lineHeight: 1.06, marginBottom: "24px", fontFamily: MONO,
          }}>
            Sortiq<br />
            <span style={{ color: "#3b82f6" }}>RL Inference</span><br />
            <span style={{ color: "#262626", fontWeight: 400, fontStyle: "italic", fontSize: "48%" }}>
              Tabular Q-Learning Under Constraints
            </span>
          </h1>

          <p style={{
            fontSize: "15px", color: "#525252", lineHeight: 1.85,
            maxWidth: "560px", borderLeft: "2px solid #1a1a1a", paddingLeft: "16px",
          }}>
            A pedagogical environment for studying RL fundamentals. Unlike standard
            classification, Sortiq forces an agent to learn the relationship between{" "}
            <span style={{ color: "#d4d4d4" }}>state management</span> and{" "}
            <span style={{ color: "#d4d4d4" }}>long-term survival</span> — physical
            constraints make naive policies fail immediately.
          </p>
        </header>

        {/* ── QUICK STATS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "64px" }}>
          {[
            { val: "15K",  label: "Training Episodes", accent: "#3b82f6" },
            { val: "10",   label: "Items per Batch",   accent: "#a855f7" },
            { val: "+8.0", label: "Max Reward / Sort", accent: "#22c55e" },
          ].map(({ val, label, accent }) => (
            <div key={label} style={{
              background: "#060606", border: "1px solid #1a1a1a",
              borderRadius: "10px", padding: "20px 16px", textAlign: "center", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: accent, opacity: 0.25 }} />
              <div style={{ fontFamily: MONO, fontSize: "26px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "8px" }}>{val}</div>
              <div style={{ fontFamily: MONO, fontSize: "10px", color: "#3f3f3f", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── 01. PURPOSE ── */}
        <section style={{ marginBottom: "56px" }}>
          <SectionLabel num={1} title="Project Purpose" />
          <p style={{ fontSize: "14px", color: "#525252", lineHeight: 1.9 }}>
            Sortiq was built as a pedagogical RL environment. Unlike standard classification —
            where the only goal is accuracy — Sortiq introduces{" "}
            <span style={{ color: "#d4d4d4" }}>physical constraints</span>, forcing the agent to
            manage a storage buffer and energy budget simultaneously. Naive "always store" policies
            crash immediately. The agent must learn{" "}
            <span style={{ color: "#d4d4d4" }}>survivability before it can learn accuracy</span>.
          </p>
        </section>

        {/* ── 02. ENVIRONMENT ── */}
        <section style={{ marginBottom: "56px" }}>
          <SectionLabel num={2} title="The Environment — Constrained MDP" />

          {/* State space */}
          <div style={{ fontFamily: MONO, fontSize: "10px", color: "#3f3f3f", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>
            State Space
          </div>
          <div style={{ border: "1px solid #141414", borderRadius: "10px", overflow: "hidden", marginBottom: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "170px 130px 1fr", padding: "9px 18px", background: "#070707", borderBottom: "1px solid #141414" }}>
              {["variable", "range", "description"].map((h) => (
                <span key={h} style={{ fontFamily: MONO, fontSize: "9px", color: "#2d2d2d", letterSpacing: "0.15em", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>
            {stateVars.map((s, i) => (
              <div
                key={s.key}
                style={{ display: "grid", gridTemplateColumns: "170px 130px 1fr", padding: "14px 18px", borderBottom: i < stateVars.length - 1 ? "1px solid #0d0d0d" : "none", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#080808")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontFamily: MONO, fontSize: "12px", color: "#60a5fa" }}>{s.key}</span>
                <span style={{ fontFamily: MONO, fontSize: "11px", color: "#3f3f3f" }}>{s.range}</span>
                <span style={{ fontSize: "13px", color: "#404040" }}>{s.desc}</span>
              </div>
            ))}
          </div>

          {/* Action space */}
          <div style={{ fontFamily: MONO, fontSize: "10px", color: "#3f3f3f", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>
            Action Space
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            {actions.map((a) => (
              <div
                key={a.id}
                style={{ background: "#060606", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "18px", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1e3a8a")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1a1a1a")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <Tag variant="blue">Action {a.id}</Tag>
                  <span style={{ fontFamily: MONO, fontSize: "13px", color: "#f5f5f5", fontWeight: 700 }}>{a.name}</span>
                </div>
                <p style={{ fontSize: "13px", color: "#404040", marginBottom: "10px", lineHeight: 1.6 }}>{a.desc}</p>
                <span style={{ fontFamily: MONO, fontSize: "10px", color: "#78350f" }}>cost: {a.cost}</span>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div style={{ border: "1px solid #2c1000", borderLeft: "3px solid #ea580c", borderRadius: "8px", padding: "18px 20px", background: "#0a0400" }}>
            <div style={{ fontFamily: MONO, fontSize: "10px", color: "#ea580c", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px" }}>
              ⚠ Critical Constraints
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#525252", lineHeight: 1.8 }}>
              <p><span style={{ color: "#e5e5e5" }}>Storage Bottleneck — </span>Buffer is exactly <InlineCode>6 units</InlineCode>. A 7th item triggers an immediate system crash with a −20.0 penalty.</p>
              <p><span style={{ color: "#e5e5e5" }}>Energy Budget — </span>Agent starts with <InlineCode>4 units</InlineCode> to process <InlineCode>10 items</InlineCode>. It cannot simply store everything — every action must be deliberate.</p>
            </div>
          </div>
        </section>

        {/* ── 03. REWARD ── */}
        <section style={{ marginBottom: "56px" }}>
          <SectionLabel num={3} title="Reward System" />
          <p style={{ fontSize: "13px", color: "#404040", marginBottom: "20px", lineHeight: 1.8 }}>
            System death is penalized far more heavily than classification errors — teaching the agent that{" "}
            <span style={{ color: "#d4d4d4" }}>survival is the prerequisite for performance</span>.
          </p>

          <div style={{ border: "1px solid #141414", borderRadius: "10px", overflow: "hidden", background: "#030303" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.8fr 0.7fr 2fr", padding: "9px 20px", background: "#070707", borderBottom: "1px solid #141414" }}>
              {["outcome", "reward", "description"].map((h) => (
                <span key={h} style={{ fontFamily: MONO, fontSize: "9px", color: "#2d2d2d", letterSpacing: "0.15em", textTransform: "uppercase" }}>{h}</span>
              ))}
            </div>
            {rewardData.map((r, i) => (
              <div
                key={r.outcome}
                style={{ display: "grid", gridTemplateColumns: "1.8fr 0.7fr 2fr", padding: "15px 20px", alignItems: "center", borderBottom: i < rewardData.length - 1 ? "1px solid #0d0d0d" : "none", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#080808")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontFamily: MONO, fontSize: "11px", color: r.fatal ? "#fca5a5" : "#404040" }}>{r.outcome}</span>
                <span style={{
                  fontFamily: MONO, fontSize: "14px", fontWeight: 700,
                  color: r.fatal ? "#fff" : r.pos ? "#4ade80" : "#f87171",
                  background: r.fatal ? "#7f1d1d" : "transparent",
                  padding: r.fatal ? "2px 8px" : "0", borderRadius: r.fatal ? "4px" : "0",
                  display: "inline-block",
                }}>{r.reward}</span>
                <span style={{ fontSize: "12px", color: "#3f3f3f" }}>{r.desc}</span>
              </div>
            ))}
            <div style={{ padding: "10px 20px", borderTop: "1px solid #141414", fontFamily: MONO, fontSize: "10px", color: "#1f1f1f", fontStyle: "italic" }}>
              // state = (storage_count, energy_left, item_type)
            </div>
          </div>
        </section>

        {/* ── 04. AGENT ARCHITECTURE ── */}
        <section style={{ marginBottom: "56px" }}>
          <SectionLabel num={4} title="Agent Architecture — Q-Learning" />
          <p style={{ fontSize: "14px", color: "#525252", lineHeight: 1.9, marginBottom: "24px" }}>
            The agent uses <span style={{ color: "#d4d4d4" }}>Tabular Q-Learning</span> — a 3D Q-Table where each cell holds the expected future reward of taking a specific action in a specific state. No neural networks, no approximation. Pure classical RL — every Q-value is looked up directly.
          </p>

          <CodeBlock filename="q_agent.py" code={bellmanCode} />

          {/* Hyperparams */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px" }}>
            {hyperparams.map((h) => (
              <div key={h.sym} style={{ background: "#060606", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "16px", position: "relative", overflow: "hidden" }}>
                <div style={{ fontFamily: MONO, fontSize: "9px", color: "#2d2d2d", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>{h.name}</div>
                <div style={{ fontFamily: MONO, fontSize: "22px", fontWeight: 700, color: "#60a5fa", marginBottom: "8px" }}>{h.val}</div>
                <div style={{ fontSize: "11px", color: "#3f3f3f", lineHeight: 1.65 }}>{h.desc}</div>
                <span style={{ position: "absolute", top: "8px", right: "12px", fontFamily: MONO, fontSize: "32px", color: "#60a5fa06", fontWeight: 700, userSelect: "none" }}>{h.sym}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 05. DATASET ── */}
        <section style={{ marginBottom: "56px" }}>
          <SectionLabel num={5} title="Dataset & Reasoning" />
          <div style={{ background: "#060606", border: "1px solid #1a1a1a", borderLeft: "3px solid #1e3a8a", borderRadius: "8px", padding: "20px" }}>
            <p style={{ fontSize: "14px", color: "#525252", lineHeight: 1.9 }}>
              The "dataset" is a <span style={{ color: "#d4d4d4" }}>stochastic stream</span> of items generated by the environment at runtime — not a static file. This ensures the agent encounters a diverse range of resource states such as <InlineCode>high_storage / low_energy</InlineCode> vs. <InlineCode>low_storage / high_energy</InlineCode>, testing the robustness of its policy across edge cases rather than memorising a fixed sequence.
            </p>
          </div>
        </section>

        {/* ── 06. PERFORMANCE ── */}
        <section style={{ marginBottom: "56px" }}>
          <SectionLabel num={6} title="Performance Proofs" />

          {/* Score comparison chips */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {[
              { label: "Random Baseline", val: "~−12.0", color: "#f87171", sub: "avg reward — frequent crashes" },
              { label: "Trained Agent",   val: "~+58.0", color: "#4ade80", sub: "avg reward — near-perfect policy" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#060606", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "18px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: s.color, opacity: 0.2 }} />
                <div style={{ fontFamily: MONO, fontSize: "9px", color: "#3f3f3f", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>{s.label}</div>
                <div style={{ fontFamily: MONO, fontSize: "24px", fontWeight: 700, color: s.color, marginBottom: "6px" }}>{s.val}</div>
                <div style={{ fontFamily: MONO, fontSize: "10px", color: "#3f3f3f" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <FigureBlock
              num="01"
              title="Performance Comparison — Agent vs. Random Baseline"
              src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/comparison.png"
              alt="Bar chart: trained agent reward vs random stochastic baseline"
              caption="Trained policy: ~+58.0 avg reward  ·  Random baseline: ~−12.0 avg reward"
            />
            <FigureBlock
              num="02"
              title="Training Convergence Curve — 15,000 Episodes"
              src="https://raw.githubusercontent.com/Durgaprasad-Developer/Sortiq/main/assets/training_curve.png"
              alt="Line chart showing reward stabilisation over 15,000 training episodes"
              caption="High early volatility = exploration phase  ·  Plateau = Q-table convergence"
            />
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ paddingTop: "36px", borderTop: "1px solid #141414", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontFamily: MONO, fontSize: "11px", color: "#2d2d2d" }}>
            Sortiq RL Engine &nbsp;·&nbsp; <span style={{ color: "#525252" }}>Durgaprasad Reddy</span>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Tag>Q-Learning</Tag>
            <Tag>MDP</Tag>
            <Tag variant="blue">Python</Tag>
            <Tag variant="green">Tabular RL</Tag>
            <Tag variant="orange">Bellman</Tag>
          </div>
        </footer>

      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </article>
  );
}
