import sys
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import json
import numpy as np

# Add parent directory to path to import from Env
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Env.SortingEnv import SortingEnv

app = FastAPI(title="Sortiq Unified App")

# Enable CORS (still useful for local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Q-Table
Q_TABLE_PATH = os.path.join(os.path.dirname(__file__), "q_table.json")
q_table = {}
if os.path.exists(Q_TABLE_PATH):
    try:
        with open(Q_TABLE_PATH, "r") as f:
            q_table = json.load(f)
        print(f"Loaded Q-table with {len(q_table)} states")
    except Exception as e:
        print(f"Error loading Q-table: {e}")

# Global environment instance
DEFAULT_TASK = {
    "itemsCount": 10,
    "store_capacity": 6,
    "crusher_energy": 4
}
env = SortingEnv(DEFAULT_TASK)
env.reset()

cumulative_score = 0
is_done = False

# ── API ENDPOINTS ──────────────────────────────────────────────

@app.post("/reset")
async def reset_env():
    global cumulative_score, is_done
    try:
        state = env.reset()
        cumulative_score = 0
        is_done = False
        return {
            "item": env.current_item,
            "storage": env.current_storage,
            "energy": env.current_energy,
            "episode": 1 
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/agent-step")
async def agent_step():
    global cumulative_score, is_done
    try:
        if is_done:
            raise HTTPException(status_code=400, detail="Episode finished")

        state_str = str(env.state)
        if state_str in q_table:
            action_idx = int(np.argmax(q_table[state_str]))
        else:
            action_idx = np.random.randint(0, 2)
        
        action = "STORE" if action_idx == 0 else "CRUSH"
        q_vals = q_table.get(state_str, [0.0, 0.0])
        q_dict = {"STORE": float(q_vals[0]), "CRUSH": float(q_vals[1])}
        
        current_item = env.current_item.copy()
        next_state, reward, done = env.step(action)
        cumulative_score += reward
        is_done = done

        is_correct = (action == "STORE" and current_item["type"] == "FRUIT") or \
                     (action == "CRUSH" and current_item["type"] == "WASTE")

        return {
            "item": current_item,
            "action": action,
            "q_values": q_dict,
            "reward": float(reward),
            "done": done,
            "score": float(cumulative_score),
            "storage": int(env.current_storage),
            "energy": int(env.current_energy),
            "is_correct": is_correct
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy", "q_table_loaded": len(q_table) > 0}

# ── STATIC FILES (Next.js Frontend) ─────────────────────────────

static_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "client", "out")

if os.path.exists(static_dir):
    # Serve static assets from _next folder
    _next_dir = os.path.join(static_dir, "_next")
    if os.path.exists(_next_dir):
        app.mount("/_next", StaticFiles(directory=_next_dir), name="next-assets")

    # Catch-all for other static files and the main index
    @app.get("/{full_path:path}")
    async def serve_static(full_path: str):
        # If the path is empty or just /, serve index.html
        if not full_path or full_path == "/":
            return FileResponse(os.path.join(static_dir, "index.html"))
        
        # Check if the requested file exists
        local_path = os.path.join(static_dir, full_path)
        if os.path.exists(local_path) and os.path.isfile(local_path):
            return FileResponse(local_path)
        
        # Fallback to index.html for SPA routing (though we're using static export)
        return FileResponse(os.path.join(static_dir, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
