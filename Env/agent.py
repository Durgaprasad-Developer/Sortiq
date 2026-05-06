from SortingEnv import SortingEnv
import json
import random
import numpy as np
import matplotlib.pyplot as plt
import matplotlib as mpl

q_table = {}
all_rewards=[]


def get_state_key(state_dict):
    # This takes your dict and turns it into one long string
    # Example: "Red-Round-Hard-6-4"
    feat = state_dict["features"]
    return f"{feat['color']}-{feat['shape']}-{feat['texture']}-{state_dict['store_capacity']}-{state_dict['crusher_energy']}"

def get_q_values(state_key):
    if state_key not in q_table:
        q_table[state_key] = [0.0, 0.0]

    return q_table[state_key]


alpha = 0.1
gamma = 0.95
epsilon = 1.0
episodes = 15000

actions = ["STORE", "CRUSH"]

task = {"itemsCount": 10, "store_capacity": 6, "crusher_energy": 4}

env = SortingEnv(task)


for eps in range(episodes):
    state_dict = env.reset()
    done = False
    episode_reward = 0

    while not done:
        # CHOOSE ACTION
        state_key = get_state_key(state_dict)
        q_values = get_q_values(state_key)
        
        if random.random() < epsilon:
            index = random.randint(0,1)
        else:
            index = np.argmax(q_values)

        action = actions[index]

        # Env
        next_state_dict, reward, done = env.step(action)
        episode_reward += reward

        #update Q_table

        # old Q of current_state
        old_q = q_values[index]

        # next max q value for next_state
        next_state_key = get_state_key(next_state_dict)
        next_q_values = get_q_values(next_state_key)

        max_next_q = max(next_q_values)

        # new q value for the current state

        #actual q value
        if done:
            target = reward
        else:
            target = reward + gamma * max_next_q

        # actual q value (Bellman equation)
        new_q =  old_q + alpha * (target - old_q)

        #update q value
        q_table[state_key][index] = new_q

        #assign next_state to get the step process
        state_dict = next_state_dict
    epsilon *= 0.99
    if eps%1000==0:
        print(eps)
    all_rewards.append(episode_reward)

    


with open("q_table.json", "w") as f:
    json.dump(q_table, f)
print("Training complete. Q table is updated in q_table.json")


# moving average

window_size = 100

moving_avg = np.convolve(all_rewards, np.ones(window_size)/window_size, mode="valid")


# plot

mpl.rcParams['font.family'] = 'DejaVu Sans'

fig, ax = plt.subplots(figsize=(14, 6))
fig.patch.set_facecolor('#0f0f1a')
ax.set_facecolor('#0f0f1a')

# Raw rewards
ax.plot(all_rewards, color='#3a86ff', alpha=0.25, linewidth=0.6, label='Episode Reward')

# Moving average
ax.plot(range(window_size - 1, len(all_rewards)), moving_avg,
        color='#ff6b6b', linewidth=2.2, label=f'Moving Avg (window={window_size})')

# Convergence zone shading
ax.axhspan(50, 65, color='#06d6a0', alpha=0.07, label='Convergence Zone')

# Style
ax.set_xlabel('Episode', color='#aaaacc', fontsize=12)
ax.set_ylabel('Total Reward', color='#aaaacc', fontsize=12)
ax.set_title('Sortiq — Q-Learning Training Curve', color='#ffffff', fontsize=15, fontweight='bold', pad=15)

ax.tick_params(colors='#aaaacc')
for spine in ax.spines.values():
    spine.set_edgecolor('#2a2a3a')

ax.grid(True, color='#2a2a3a', linewidth=0.7, linestyle='--')
ax.legend(facecolor='#1a1a2e', edgecolor='#3a3a5a', labelcolor='#ffffff', fontsize=11)

plt.tight_layout()
plt.savefig("assets/training_curve.png", dpi=150, bbox_inches="tight", facecolor=fig.get_facecolor())
plt.show()



        



