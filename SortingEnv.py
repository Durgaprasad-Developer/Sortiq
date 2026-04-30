import random

class SortingEnv:
    

    def __init__(self, task):
        self.itemCount = task.itemsCount
        self.store_capacity = task.store_capacity
        self.crusher_energy = task.crusher_energy

        self.current_storage = None
        self.current_energy = None
        self.current_item = None
        self.index = None



    def reset(self):
        self.current_storage = self.store_capacity
        self.current_energy = self.crusher_energy
        self.index = 0 
        self.current_item = generateItem()  
        self.state = {"features":self.current_item["features"], "store_capacity": self.current_storage, "crusher_energy":self.current_energy}
        return self.state
    
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
    



