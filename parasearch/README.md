# 🔍 ParaSearch - Parametric Knowledge Search Engine

**Search the parameters, not the web.**

ParaSearch is a revolutionary search engine that uses only an LLM's training knowledge - no web scraping, no RAG, no external databases. Just pure parametric search through what the model learned during training.

## 🎯 What Makes This Different?

- **No Internet Required**: Fully offline-capable
- **No RAG**: Doesn't search external documents
- **Pure Parametric**: Uses only LLM's frozen training knowledge
- **Honest**: Shows confidence scores and hallucination risk
- **Fast**: Local processing with Ollama
- **Private**: Zero data collection

Think of it as "Wikipedia in the model's brain" with a Google-like interface.

## 🚀 Quick Start

### Prerequisites

1. **Ollama** - Install from [ollama.com](https://ollama.com)
2. **Python 3.9+**
3. **Node.js** (optional, for development)

### Step 1: Install Ollama and Pull a Model

```bash
# Install Ollama (macOS)
brew install ollama

# Or download from ollama.com for Windows/Linux

# Start Ollama
ollama serve

# Pull a model (in a new terminal)
ollama pull llama3.2  # 3B model, fast and good
# OR
ollama pull mistral   # 7B model, better quality
# OR
ollama pull qwen2.5   # Great world knowledge
```

### Step 2: Install Backend Dependencies

```bash
cd parasearch/backend
pip install -r requirements.txt
```

### Step 3: Start the Backend

```bash
python main.py
```

You should see:
```
🔍 Starting ParaSearch Backend...
📊 Default Model: llama3.2
🌐 CORS enabled for public access
⚡ Rate limit: 20 requests per 60s
```

### Step 4: Open the Frontend

```bash
cd ../frontend
# Just open index.html in your browser!
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

Or use a simple HTTP server:
```bash
python -m http.server 8080
# Then visit http://localhost:8080
```

## 🌐 Public Deployment with ngrok

Want to share this with the world? Use ngrok!

### Step 1: Install ngrok

```bash
# macOS
brew install ngrok

# Or download from ngrok.com
```

### Step 2: Set Up ngrok (one-time)

```bash
# Sign up at ngrok.com and get your auth token
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Step 3: Expose Your Backend

```bash
# In one terminal, make sure backend is running
cd parasearch/backend
python main.py

# In another terminal, start ngrok
ngrok http 8000
```

You'll get output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:8000
```

### Step 4: Update Frontend for Public Access

Edit `frontend/index.html` and change the API_URL:

```javascript
const API_URL = 'https://YOUR-NGROK-URL.ngrok-free.app';
```

### Step 5: Host Frontend

You can:
- Host the HTML file on GitHub Pages
- Use Netlify/Vercel (free tier)
- Use ngrok for frontend too:
  ```bash
  cd frontend
  python -m http.server 8080
  # In another terminal:
  ngrok http 8080
  ```

## 🎨 Features

### Enhanced Guardrails & Safety

1. **Advanced Prompt Priming**: Sophisticated system instructions that program LLM behavior
2. **Constitutional AI**: LLM follows strict behavioral rules and principles
3. **Confidence Calibration**: Conservative scoring with uncertainty detection
4. **Risk Analysis**: Pre-query analysis detects problematic queries
5. **Few-Shot Learning**: Examples teach the LLM what good results look like
6. **Meta-Cognitive Prompts**: LLM thinks about its own thinking process
7. **Dynamic Penalties**: Confidence and temperature adjustments based on risk
8. **Warning System**: Alerts when query asks about recent events
9. **Rate Limiting**: Prevents abuse (20 requests/minute per IP)

### User Experience

- **Expandable Results**: Click to see detailed explanations
- **Mobile Responsive**: Works great on phones
- **Fast**: Local processing = no network latency
- **Beautiful UI**: Clean, modern design
- **Example Queries**: Suggested searches to get started

## ⚙️ Configuration

### Environment Variables

ParaSearch supports extensive configuration via environment variables:

```bash
# Model Configuration
export PARASEARCH_MODEL="llama3.2"              # Default model
export PARASEARCH_OLLAMA_URL="http://localhost:11434"  # Ollama endpoint

# Server Configuration  
export PARASEARCH_PORT="8000"                    # Backend port
export PARASEARCH_HOST="0.0.0.0"                 # Bind address

# Rate Limiting
export PARASEARCH_RATE_WINDOW="60"               # Rate limit window (seconds)
export PARASEARCH_MAX_REQUESTS="20"              # Max requests per window

# Search Configuration
export PARASEARCH_DEFAULT_RESULTS="5"            # Default number of results
export PARASEARCH_DEFAULT_TEMP="0.3"             # Default temperature

# Guardrails Configuration
export PARASEARCH_ENABLE_GUARDRAILS="true"       # Enable enhanced guardrails
export PARASEARCH_CONFIDENCE_PENALTY="0.2"       # Confidence penalty for risky queries
export PARASEARCH_TEMP_HIGH_RISK="0.2"           # Temperature for risky queries
```

See `DEPLOYMENT_GUIDE.md` for complete configuration options.

### Change the Model

Use environment variables (recommended):
```bash
export PARASEARCH_MODEL="mistral"  # Change to "qwen2.5", "llama3.1", etc.
```

Or edit `config.py`:
```python
DEFAULT_MODEL = "mistral"  # Change to "qwen2.5", "llama3.1", etc.
```

### Adjust Rate Limiting

Use environment variables (recommended):
```bash
export PARASEARCH_RATE_WINDOW="120"      # 2 minutes
export PARASEARCH_MAX_REQUESTS="50"      # 50 requests per window
```

Or edit `config.py`:
```python
RATE_LIMIT_WINDOW = 120  # seconds
MAX_REQUESTS_PER_WINDOW = 50  # requests
```

### Tune Result Quality

When searching, you can adjust:
- `num_results`: Number of results (1-10)
- `temperature`: Creativity (0.0-1.0, lower = more focused)

## 📊 API Documentation

### POST /search

```json
{
  "query": "What is quantum mechanics?",
  "model": "llama3.2",
  "num_results": 5,
  "temperature": 0.3
}
```

Response:
```json
{
  "query": "What is quantum mechanics?",
  "results": [
    {
      "title": "Quantum Mechanics: The Physics of the Very Small",
      "snippet": "Quantum mechanics is the fundamental theory...",
      "confidence": 0.85,
      "relevance_score": 9,
      "expanded_content": "Detailed explanation...",
      "hallucination_risk": "low"
    }
  ],
  "processing_time": 2.3,
  "model_used": "llama3.2",
  "knowledge_cutoff": "January 2025 (approximate)",
  "warning": null
}
```

### GET /health

Check if system is running:
```json
{
  "status": "healthy",
  "ollama": {
    "status": "healthy",
    "models": {...}
  }
}
```

### GET /models

List available models:
```json
{
  "models": ["llama3.2", "mistral", "qwen2.5"],
  "default": "llama3.2"
}
```

## 🧠 How It Works

1. **User Query** → Enters search in frontend
2. **Backend** → Receives query, rate-checks
3. **Prompt Engineering** → Crafts careful prompt for LLM
4. **Ollama** → Generates structured results from training knowledge
5. **Parsing** → Extracts titles, snippets, scores
6. **Guardrails** → Calculates confidence, detects hallucination risk
7. **Frontend** → Displays beautiful results

## 🎯 Best Use Cases

✅ **Great For:**
- Historical facts
- Scientific concepts
- Famous people/places/events
- Explanations of theories
- General knowledge
- Educational content

❌ **Not Great For:**
- Recent events (post-2024)
- Real-time data (weather, stocks)
- Personal documents
- Factual verification
- Legal/medical advice

## 🛡️ Limitations & Disclaimers

1. **Knowledge Cutoff**: Model was trained on data up to ~January 2025
2. **Hallucinations**: LLMs can be confidently wrong - check important facts
3. **No Sources**: Can't cite specific sources (no web access)
4. **Bias**: Reflects biases in training data
5. **Not Medical/Legal Advice**: For informational purposes only

## 🔧 Troubleshooting

### "Ollama not running"
```bash
# Start Ollama in a terminal
ollama serve
```

### "Model not found"
```bash
# Pull the model
ollama pull llama3.2
```

### "CORS errors"
Make sure backend is running on port 8000 and frontend can reach it.

### "Slow responses"
- Try a smaller model (llama3.2 3B)
- Lower `num_results` to 3
- Increase GPU memory allocation

## 🚀 Performance Tips

1. **GPU Acceleration**: Ollama will use GPU if available (much faster)
2. **Model Size**: Smaller models = faster (3B vs 7B vs 13B)
3. **Batch Requests**: Backend can handle multiple users
4. **Caching**: Consider adding Redis for repeated queries

## 📝 Development

### Project Structure
```
parasearch/
├── backend/
│   ├── main.py              # FastAPI backend
│   └── requirements.txt     # Python dependencies
├── frontend/
│   └── index.html          # Single-file React app
└── README.md               # This file
```

### Adding Features

**Custom Models**: Edit model selection in backend
**New Guardrails**: Add to `detect_hallucination_risk()` function
**UI Themes**: Modify CSS in `index.html`
**Caching**: Add Redis integration in backend

## 🎉 Why This Matters

This proves that:
1. LLMs have **incredible parametric knowledge**
2. You don't always need RAG or web search
3. Local AI can be **fast and practical**
4. Honest limitations make AI **more trustworthy**

## 🤝 Contributing

Ideas for improvements:
- [ ] Multi-language support
- [ ] Knowledge graph visualization
- [ ] Query history with local storage
- [ ] Related searches
- [ ] Export results to PDF
- [ ] Voice search
- [ ] Dark mode
- [ ] Comparison mode (compare multiple results)

## 📜 License

MIT License - feel free to use, modify, and share!

## 🙏 Credits

Built with:
- [Ollama](https://ollama.com) - Local LLM runtime
- [FastAPI](https://fastapi.tiangolo.com) - Backend framework
- [React](https://react.dev) - Frontend UI
- Love for local-first AI ❤️

---

**ParaSearch** - Because sometimes the best answer is already in the model's brain. 🧠

Made with 💜 for the local LLM community.
