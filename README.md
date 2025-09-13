# Node RAG Backend

This is the backend for the Node RAG (Retrieval-Augmented Generation) project. It provides authentication, document upload, chunking, retrieval, and LLM-powered Q&A APIs.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm
- Ollama (for local LLM and embeddings)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start Ollama:**

   - Make sure Ollama is running and the required models are pulled (e.g., `llama2-uncensored`).
   - Example:
     ```bash
     ollama pull llama2-uncensored
     ollama serve
     ```

3. **Run the backend server:**
   ```bash
   npm run dev
   ```
   - The server will start on `http://localhost:3030` by default.

## API Endpoints

- **Auth:** `/api/auth/register`, `/api/auth/login`
- **Upload Document:** `/api/upload` (multipart/form-data, field: `file.txt`)
- **Ask Question:** `/api/ask` (POST, body: `{ query }`)
- **Other:** `/api/ping` for health check
