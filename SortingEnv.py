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

            
        
    
    
    
    def generateItem():
        type = random.choice(["FRUIT", "WASTE"])

        if type == "FRUIT":
            color = random.choice(["Red", "Yellow", "Purple", "Green", "Orange"])
            shape = random.choice(["Round", "Oval", "Heart", "Pear"])
            texture = random.choice(["Hard", "Smooth", "Firm", "Juicy" ])
        else:
            color = random.choice(["Black", "Brown", "Purple", "Grey", "Orange"])
            shape = random.choice(["Shriveled", "Sunken", "Round", "Oval"])
            texture = random.choice(["Mushy", "Slimy", "Juicy", "Smooth"])

        features = {"color": color, "shape": shape, "texture": texture}
        item = {"features": features, "type": type}

        return item
    

    



