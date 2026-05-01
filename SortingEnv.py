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
        reward = 0
        done = False
        
        if action == "STORE":
            if self.current_item["type"] != "FRUIT":
                reward -= 10
            else:
                reward += 5

            self.current_storage -= 1

        elif action=="CRUSH":
            if self.current_item["type"] != "WASTE":
                reward -= 10
            else:
                reward += 5

            self.current_energy -= 1

        reward -= 1

        self.index += 1

        if self.current_storage < 0 or self.current_energy < 0:
            reward -= 20
            done = True

        elif self.index >= self.itemCount:
            reward += 10
            done = True

        if not done:
            self.current_item = generateItem()  
            self.state = {"features":self.current_item["features"], "store_capacity": self.current_storage, "crusher_energy":self.current_energy}

        return self.state, reward, done

            
        
    
    
    
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
    

    



