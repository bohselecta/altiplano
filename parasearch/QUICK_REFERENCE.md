# 🚀 ParaSearch Quick Reference

## 🎯 One-Command Start

```bash
./start.sh
```

## 📋 Common Commands

### Ollama Management
```bash
# Start Ollama
ollama serve

# List models
ollama list

# Pull a model
ollama pull llama3.2      # 3B, fast
ollama pull mistral       # 7B, better quality
ollama pull qwen2.5       # Great world knowledge

# Remove a model
ollama rm llama3.2
```

### Backend
```bash
# Start backend
cd backend && python main.py

# Test backend
curl http://localhost:8000/health

# Check available models
curl http://localhost:8000/models
```

### Frontend
```bash
# Open in browser
open frontend/index.html

# Or serve with Python
cd frontend && python -m http.server 8080
# Then visit http://localhost:8080
```

### Testing
```bash
# Run test suite
./test_api.py

# Quick search test
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query":"What is AI?","num_results":3}'
```

### ngrok (Public Access)
```bash
# Start ngrok tunnel
ngrok http 8000

# With custom subdomain (Pro)
ngrok http --domain=parasearch.yourdomain.com 8000

# View dashboard
open http://localhost:4040
```

## 🔧 Troubleshooting

### "Connection refused"
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If not, start it
ollama serve
```

### "Model not found"
```bash
# Pull the default model
ollama pull llama3.2
```

### "CORS errors"
Make sure backend is running on port 8000

### Backend not starting
```bash
# Install dependencies
pip install -r backend/requirements.txt

# Check Python version (needs 3.9+)
python --version
```

### Slow responses
- Use smaller model (llama3.2)
- Reduce num_results to 3
- Check if GPU is being used (much faster)

## 📊 API Endpoints

### GET /
Root info

### GET /health
System health check

### GET /models
List available models

### POST /search
```json
{
  "query": "your search query",
  "model": "llama3.2",
  "num_results": 5,
  "temperature": 0.3
}
```

### GET /stats
Usage statistics

## ⚙️ Configuration

### Change default model
Edit `backend/main.py`:
```python
DEFAULT_MODEL = "mistral"
```

### Adjust rate limits
Edit `backend/main.py`:
```python
RATE_LIMIT_WINDOW = 60
MAX_REQUESTS_PER_WINDOW = 20
```

### Update frontend API URL
Edit `frontend/index.html`:
```javascript
const API_URL = 'https://your-ngrok-url.ngrok-free.app';
```

## 🎨 Example Searches

- "Who was Leonardo da Vinci?"
- "Explain quantum mechanics"
- "History of ancient Rome"
- "How does photosynthesis work?"
- "What is machine learning?"
- "Tell me about the Renaissance"

## 📁 Project Structure

```
parasearch/
├── backend/
│   ├── main.py           # FastAPI backend
│   └── requirements.txt  # Dependencies
├── frontend/
│   └── index.html        # React frontend
├── start.sh              # Startup script
├── test_api.py          # Test suite
├── README.md            # Full documentation
├── NGROK_SETUP.md       # Public hosting guide
└── QUICK_REFERENCE.md   # This file
```

## 🎯 Workflow

1. **Development**
   ```bash
   ./start.sh
   open frontend/index.html
   ```

2. **Testing**
   ```bash
   ./test_api.py
   ```

3. **Public Hosting**
   ```bash
   ./start.sh
   # In new terminal:
   ngrok http 8000
   # Update frontend with ngrok URL
   # Host frontend on GitHub Pages/Netlify
   ```

## 💡 Pro Tips

- Keep Ollama running in background: `ollama serve &`
- Use tmux/screen for persistent backend
- Monitor ngrok dashboard: http://localhost:4040
- Check stats regularly: /stats endpoint
- Test on mobile - it's responsive!

## 🆘 Get Help

1. Check README.md for full docs
2. Check NGROK_SETUP.md for hosting
3. Run test_api.py to diagnose issues
4. Check Ollama logs: check terminal where `ollama serve` is running

---

**Remember:** ParaSearch searches the model's training knowledge only. 
It can't access the web or current events!

🔍 Happy Searching!
