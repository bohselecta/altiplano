#!/bin/bash

# ParaSearch Startup Script
# This script checks dependencies and starts the backend

echo "🔍 ParaSearch - Starting up..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Ollama is installed
echo "📦 Checking dependencies..."
if ! command -v ollama &> /dev/null; then
    echo -e "${RED}❌ Ollama not found!${NC}"
    echo "   Install from: https://ollama.com"
    exit 1
fi
echo -e "${GREEN}✓${NC} Ollama installed"

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Ollama not running${NC}"
    echo "   Starting Ollama..."
    ollama serve &
    OLLAMA_PID=$!
    sleep 3
    
    if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        echo -e "${RED}❌ Failed to start Ollama${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓${NC} Ollama started"
else
    echo -e "${GREEN}✓${NC} Ollama running"
fi

# Check for models
echo ""
echo "🧠 Checking for LLM models..."
MODELS=$(ollama list 2>/dev/null | grep -E "llama3.2|mistral|qwen2.5" | wc -l)

if [ "$MODELS" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No recommended models found${NC}"
    echo "   Would you like to download llama3.2 (3B, ~2GB)? [y/N]"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "   Downloading llama3.2..."
        ollama pull llama3.2
        echo -e "${GREEN}✓${NC} Model downloaded"
    else
        echo -e "${RED}❌ No model available. Cannot start.${NC}"
        echo "   Run: ollama pull llama3.2"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} LLM models available"
fi

# Check Python dependencies
echo ""
echo "🐍 Checking Python dependencies..."
if ! python3 -c "import fastapi" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Dependencies not installed${NC}"
    echo "   Installing..."
    pip install -r backend/requirements.txt
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${GREEN}✓${NC} Dependencies installed"
fi

# Start backend
echo ""
echo "🚀 Starting ParaSearch backend..."
echo ""
cd backend
python3 main.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo ""
    echo -e "${GREEN}✅ ParaSearch is running!${NC}"
    echo ""
    echo "Backend API:  http://localhost:8000"
    echo "Frontend:     Open frontend/index.html in your browser"
    echo ""
    echo "📖 Quick start:"
    echo "   1. Open frontend/index.html"
    echo "   2. Try searching for 'quantum mechanics'"
    echo "   3. See the README.md for ngrok setup"
    echo ""
    echo "🛑 To stop: Press Ctrl+C"
    echo ""
    
    # Keep running
    wait $BACKEND_PID
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Cleanup on exit
trap "echo ''; echo '🛑 Shutting down...'; kill $BACKEND_PID 2>/dev/null; exit" INT TERM
