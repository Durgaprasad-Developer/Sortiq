# Use Python 3.9+ image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the server code and the Env module
COPY server/ ./server/
COPY Env/ ./Env/

# Expose the port FastAPI will run on
EXPOSE 7860

# Command to run the application (Hugging Face expects port 7860)
CMD ["uvicorn", "server.api:app", "--host", "0.0.0.0", "--port", "7860"]
