import json
import numpy as np
import matplotlib.pyplot as plt
from SortingEnv import SortingEnv

# =========================
# 1. Load Q-table
# =========================
with open("q_table.json", "r") as f:
    q_table = json.load(f)

# =========================
# 2. Environment Setup
# =========================
task = {"itemsCount": 10, "store_capacity": 6, "crusher_energy": 4}
env = SortingEnv(task)

actions = ["STORE", "CRUSH"]

# =========================
# 3. Helper Functions
# =========================
def get_state_key(state_dict):
    f = state_dict["features"]
    return f"{f['color']}-{f['shape']}-{f['texture']}-{state_dict['store_capacity']}-{state_dict['crusher_energy']}"

def get_q_values(state_key):
    return q_table.get(state_key, [0.0, 0.0])

# =========================
# 4. Evaluation Loop
# =========================
num_episodes = 100
rewards = []

print("--- STARTING EVALUATION ---")

for i in range(num_episodes):
    state = env.reset()
    done = False
    total_reward = 0
    
    while not done:
        s_key = get_state_key(state)
        
        q_vals = get_q_values(s_key)
        action_idx = np.argmax(q_vals)
        action = actions[action_idx]
        
        state, reward, done = env.step(action)
        total_reward += reward
        
    rewards.append(total_reward)
    print(f"Game {i+1} Score: {total_reward}")

# =========================
# 5. Moving Average Function
# =========================
def moving_average(data, window_size=10):
    return np.convolve(data, np.ones(window_size)/window_size, mode='valid')

# =========================
# 6. Plotting
# =========================
plt.figure()

# Raw rewards
plt.plot(rewards, label="Raw Rewards")

# Moving average
window_size = 10
ma_rewards = moving_average(rewards, window_size)
plt.plot(range(window_size-1, num_episodes), ma_rewards, label="Moving Average")

# Labels
plt.xlabel("Episode")
plt.ylabel("Total Reward")
plt.title("Reward Curve (Raw + Moving Average)")
plt.legend()

plt.show()