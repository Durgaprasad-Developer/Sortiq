import random
class SortingEnv:
    items = []
    store_capacity = 0
    crusher_energy = 0
    index = 0
    item = {}
    def __init__(self, items, store_capacity, crusher_energy, index, item):
        self.items = items
        self.store_capacity = store_capacity
        self.crusher_energy = crusher_energy
        self.index = index
        self.item = item

    def reset(self):
        store_capacity = self.store_capacity
        crusher_energy = self.crusher_energy
        index = self.index
        list = generateSequence(items)
        return list[index]
    
    def step(self, action):
        current_state = take_action(action)
        consequence = update_resource(current_state)
        rewards = calculate_reward(consequence)
        next_step = get_nextStep_qtable(rewards)
        is_done = check_done(next_step)
        return {next_step, rewards, is_done}
    
    def generate_item(self):
        features = {}

        colors = ["yellow", "red", "green", "orange", "brown"]
        color = random.random(colors)
        features.color = color

        softness = ["crisp", "firm", "melting", "soft", "mushy"]
        soft = random.random(softness)
        features.softness = soft

        shapes = ["oval", "round", "curve"]
        shape = random.random(shapes)
        features.shape = shape

        return features
    
    


