import random

class SortingEnv:
    

    def __init__(self, task):
        self.itemCount = task["itemsCount"]
        self.store_capacity = task["store_capacity"]
        self.crusher_energy = task["crusher_energy"]

        self.current_storage = None
        self.current_energy = None
        self.current_item = None
        self.index = None



    def reset(self):
        self.current_storage = self.store_capacity
        self.current_energy = self.crusher_energy
        self.index = 0 
        self.current_item = self.generateItem()  
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
            self.current_item = self.generateItem()  
            self.state = {"features":self.current_item["features"], "store_capacity": self.current_storage, "crusher_energy":self.current_energy}

        return self.state, reward, done

             
    
    def generateItem(self):
        type = random.choice(["FRUIT", "WASTE"])

        if type == "FRUIT":
            color = random.choices(["Red", "Yellow", "Purple", "Green", "Orange", "Black", "Brown", "Grey"], weights=[30, 20, 16, 10, 15, 4, 3, 5])[0]
            shape = random.choices(["Round", "Oval", "Heart", "Pear", "Shriveled", "Sunken"], weights=[30, 20, 10, 15, 6, 8])[0]
            texture = random.choices(["Hard", "Smooth", "Firm", "Juicy", "Mushy", "Slimy"], weights=[30, 25, 20, 7, 8, 2])[0]
        else:
            color = random.choices(["Black", "Brown", "Purple", "Grey", "Orange", "Red", "Yellow", "Green"], weights=[30, 20, 5, 16, 6, 4, 9, 6])[0]
            shape = random.choices(["Shriveled", "Sunken", "Round", "Oval", "Heart", "Pear"], weights = [30, 20, 5, 4, 7, 9])[0]
            texture = random.choices(["Mushy", "Slimy", "Juicy", "Smooth", "Hard", "Firm"], weights=[25, 30, 15, 6, 8, 3])[0]

        features = {"color": color, "shape": shape, "texture": texture}
        item = {"features": features, "type": type}

        return item
    

    



