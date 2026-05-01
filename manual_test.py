import random
from SortingEnv import SortingEnv

task = {"itemsCount":10, "store_capacity":6, "crusher_energy":4}

env = SortingEnv(task)

done = False

state = env.reset()

index = 1

print("state:", state)

while not done:
    action = random.choice(["STORE", "CRUSH"])

    print("action", action)

    state, reward, done = env.step(action)

    print("index", index)
    print("state", state)
    print("reward", reward)
    print("done", done)
    print("--------------------")

    index+=1

