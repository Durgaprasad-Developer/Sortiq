---
title: Sortiq
emoji: 🍎
colorFrom: green
colorTo: emerald
sdk: docker
pinned: false
---

# 🍎 Sortiq - Reinforcement Learning Sorting Dashboard

**Sortiq** is a production-grade Reinforcement Learning visualizer. It demonstrates an agent trained using **Q-Learning** to distinguish between fresh fruit and waste based on visual features (Color, Shape, Texture) while managing constrained resources (Storage Capacity and Crusher Energy).

![Sortiq Banner](https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/comparison.png)

## 🚀 Deployment
This Space uses a **Unified Monolith Architecture**:
- **Backend**: FastAPI (Python) running the RL Environment and Q-Table inference.
- **Frontend**: Next.js 14 (React) with TailwindCSS and custom CSS micro-animations.
- **Unified**: Served from a single Docker container on port 7860.

## 🧠 The Agent
The agent learns through trial and error using a Q-Table with over 9,000 states.
- **Goal**: Maximize reward by STORING fruit and CRUSHING waste.
- **Penalties**: Incorrect actions, energy depletion, or storage overflow.
- **Decision Making**: Real-time Q-Value visualization shows the agent's confidence in each action.

## 📊 Learning Performance
The agent shows significant improvement over a random baseline, achieving high accuracy after 15,000 episodes of training.

![Training Curve](https://github.com/Durgaprasad-Developer/Sortiq/raw/main/assets/training_curve.png)

## 🛠️ Tech Stack
- **RL**: Custom Python Environment (Gym-like), NumPy.
- **Backend**: FastAPI, Uvicorn.
- **Frontend**: Next.js, Framer Motion, TailwindCSS.
- **Design**: Retro-Futuristic / Matrix Pixel Art Aesthetic.

---
Built with ❤️ for AI Education.
