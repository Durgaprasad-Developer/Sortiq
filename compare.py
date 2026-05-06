import json
import random
import numpy as np
import matplotlib.pyplot as plt
import matplotlib as mpl
from SortingEnv import SortingEnv

# ─────────────────────────────────────────────
# Setup
# ─────────────────────────────────────────────
task = {"itemsCount": 10, "store_capacity": 6, "crusher_energy": 4}
actions = ["STORE", "CRUSH"]
N_EPISODES = 300

# Load trained Q-table
with open("q_table.json", "r") as f:
    q_table = json.load(f)

# ─────────────────────────────────────────────
# Helper
# ─────────────────────────────────────────────
def get_state_key(state_dict):
    feat = state_dict["features"]
    return f"{feat['color']}-{feat['shape']}-{feat['texture']}-{state_dict['store_capacity']}-{state_dict['crusher_energy']}"

# ─────────────────────────────────────────────
# Random Agent — picks action randomly every step
# ─────────────────────────────────────────────
def run_random_agent(n_episodes):
    env = SortingEnv(task)
    rewards = []
    for _ in range(n_episodes):
        state = env.reset()
        done = False
        total = 0
        while not done:
            action = random.choice(actions)
            state, reward, done = env.step(action)
            total += reward
        rewards.append(total)
    return rewards

# ─────────────────────────────────────────────
# Trained Agent — uses Q-table (greedy, no exploration)
# ─────────────────────────────────────────────
def run_trained_agent(n_episodes):
    env = SortingEnv(task)
    rewards = []
    for _ in range(n_episodes):
        state = env.reset()
        done = False
        total = 0
        while not done:
            key = get_state_key(state)
            q_vals = q_table.get(key, [0.0, 0.0])
            action = actions[np.argmax(q_vals)]
            state, reward, done = env.step(action)
            total += reward
        rewards.append(total)
    return rewards

# ─────────────────────────────────────────────
# Run both
# ─────────────────────────────────────────────
print("Running Random Agent...")
random_rewards = run_random_agent(N_EPISODES)

print("Running Trained Q-Learning Agent...")
trained_rewards = run_trained_agent(N_EPISODES)

# ─────────────────────────────────────────────
# Print stats
# ─────────────────────────────────────────────
random_avg = np.mean(random_rewards)
trained_avg = np.mean(trained_rewards)

print(f"\n{'─'*35}")
print(f"  Random Agent Avg    : {random_avg:.2f}")
print(f"  Q-Learning Avg      : {trained_avg:.2f}")
print(f"  Improvement         : +{trained_avg - random_avg:.2f}")
print(f"{'─'*35}\n")

# ─────────────────────────────────────────────
# Plot
# ─────────────────────────────────────────────
mpl.rcParams['font.family'] = 'DejaVu Sans'

fig, ax = plt.subplots(figsize=(14, 6))
fig.patch.set_facecolor('#0f0f1a')
ax.set_facecolor('#0f0f1a')

episodes = range(N_EPISODES)

# Raw scores
ax.plot(episodes, random_rewards, color='#ff6b6b', alpha=0.3, linewidth=0.7, label='Random Agent')
ax.plot(episodes, trained_rewards, color='#3a86ff', alpha=0.3, linewidth=0.7, label='Q-Learning Agent')

# Average lines
ax.axhline(random_avg, color='#ff6b6b', linewidth=2, linestyle='--', label=f'Random Avg: {random_avg:.1f}')
ax.axhline(trained_avg, color='#3a86ff', linewidth=2, linestyle='--', label=f'Q-Learning Avg: {trained_avg:.1f}')

# Gap shading between the two averages
ax.axhspan(random_avg, trained_avg, color='#06d6a0', alpha=0.07, label=f'Improvement: +{trained_avg - random_avg:.1f}')

# Style
ax.set_xlabel('Episode', color='#aaaacc', fontsize=12)
ax.set_ylabel('Total Reward', color='#aaaacc', fontsize=12)
ax.set_title('Random Agent vs Q-Learning Agent — Sortiq', color='#ffffff', fontsize=15, fontweight='bold', pad=15)

ax.tick_params(colors='#aaaacc')
for spine in ax.spines.values():
    spine.set_edgecolor('#2a2a3a')

ax.grid(True, color='#2a2a3a', linewidth=0.7, linestyle='--')
ax.legend(facecolor='#1a1a2e', edgecolor='#3a3a5a', labelcolor='#ffffff', fontsize=11)

plt.tight_layout()
plt.savefig("assets/comparison.png", dpi=150, bbox_inches='tight', facecolor=fig.get_facecolor())
plt.show()
print("Saved to assets/comparison.png")
