# Stage 1: Build Next.js Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Final Image
FROM python:3.9-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy RL Environment and Backend code
COPY Env/ ./Env/
COPY server/ ./server/
COPY server/q_table.json ./server/

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/client/out ./client/out

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Expose Hugging Face default port
EXPOSE 7860

# Run the unified FastAPI server
CMD ["python", "server/api.py"]
