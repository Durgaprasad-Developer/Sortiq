import random
from SortingEnv import SortingEnv

task = {"itemsCount":5, "store_capacity":3, "crusher_energy":2}

env = SortingEnv(task)

done = False

state = env.reset()

index = 1

print("state:", state)
print(" ")
print(" ")

while not done:
    action = random.choice(["STORE", "CRUSH"])

    print("action", action)

    state, reward, done = env.step(action)

    print("index", index)
    print("next state", state)
    print("reward", reward)
    print("done", done)
    print("--------------------")

    index+=1

