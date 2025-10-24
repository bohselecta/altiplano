# 🚀 ParaSearch Deployment Guide

## Quick Start (Local Development)

### Prerequisites
1. **Ollama** - Install from [ollama.com](https://ollama.com)
2. **Python 3.9+**
3. **At least one LLM model** (see Model Setup below)

### Step 1: Model Setup

```bash
# Start Ollama
ollama serve

# Pull a recommended model (in a new terminal)
ollama pull llama3.2    # 3B - Fast, good for development
# OR
ollama pull mistral     # 7B - Better quality
# OR  
ollama pull qwen2.5     # Great world knowledge
```

### Step 2: Start ParaSearch

```bash
cd parasearch

# Option A: Use the startup script (recommended)
chmod +x start.sh
./start.sh

# Option B: Manual startup
pip install -r backend/requirements.txt
python3 backend/main.py
```

### Step 3: Test the System

```bash
# Run the test suite
python3 test_api.py

# Test the frontend
open frontend/index.html
```

## Configuration

### Environment Variables

ParaSearch supports configuration via environment variables:

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

# Logging
export PARASEARCH_LOG_LEVEL="INFO"               # Log level
export PARASEARCH_LOG_REQUESTS="true"            # Log all requests
```

### Configuration File

You can also modify `/Users/home/dev/Altiplano-search/parasearch/config.py` directly for permanent changes.

## Enhanced Guardrails

ParaSearch now includes sophisticated prompt priming that:

- **Sets LLM Identity**: "You are a search engine, not a chatbot"
- **Defines Behavioral Rules**: Honesty over helpfulness
- **Calibrates Confidence**: Conservative scoring with uncertainty detection
- **Provides Examples**: Few-shot learning for better responses
- **Detects Risk**: Pre-query analysis for problematic queries
- **Applies Penalties**: Reduces confidence for risky queries

### Testing Guardrails

Test the enhanced guardrails with these queries:

```bash
# High confidence historical fact
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What year did World War II end?"}'

# Low confidence recent event (should trigger warning)
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "Who won the 2025 Super Bowl?"}'

# Real-time data query (should trigger warning)
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the current weather?"}'
```

## Public Access (ngrok)

### Step 1: Install ngrok

```bash
# macOS
brew install ngrok

# Or download from ngrok.com
```

### Step 2: Authenticate

```bash
# Sign up at ngrok.com and get your auth token
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Step 3: Expose Backend

```bash
# Terminal 1: Keep ParaSearch running
./start.sh

# Terminal 2: Start ngrok tunnel
ngrok http 8000
```

You'll get output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:8000
```

### Step 4: Update Frontend

Edit `frontend/index.html` and change the API_URL:

```javascript
const API_URL = 'https://YOUR-NGROK-URL.ngrok-free.app';
```

### Step 5: Host Frontend

Host the frontend on:
- **GitHub Pages** (free)
- **Netlify** (free tier)
- **Vercel** (free tier)
- **Or use ngrok for frontend too**:
  ```bash
  cd frontend
  python3 -m http.server 8080
  # In another terminal:
  ngrok http 8080
  ```

## Model Recommendations

### For Development
- **llama3.2** (3B) - Fast, good enough for testing
- **qwen2.5** (3B) - Great world knowledge, multilingual

### For Production
- **mistral** (7B) - Better reasoning, scientific queries
- **llama3.1** (8B) - Balanced performance
- **qwen2.5** (14B) - Best quality if you have the hardware

### Hardware Requirements

| Model Size | RAM (CPU) | VRAM (GPU) | Response Time |
|------------|-----------|------------|---------------|
| 3B         | 8-16GB    | 4-6GB      | 2-4 seconds  |
| 7B         | 16-32GB   | 8-12GB     | 4-8 seconds  |
| 13B+       | 32-64GB   | 16-24GB    | 8-15 seconds |

## Troubleshooting

### "Ollama not found"
```bash
# Install Ollama
brew install ollama  # macOS
# Or download from https://ollama.com
```

### "No model available"
```bash
# Pull a model
ollama pull llama3.2
```

### "Connection refused"
```bash
# Start Ollama
ollama serve
```

### "Module not found" errors
```bash
# Install dependencies
pip install -r backend/requirements.txt
```

### "Rate limit exceeded"
- Wait 60 seconds between requests
- Or increase `PARASEARCH_MAX_REQUESTS` in config

### Slow responses
- Use a smaller model (3B instead of 7B)
- Reduce `num_results` to 3
- Increase GPU memory allocation
- Lower `temperature` to 0.2

## API Endpoints

### Health Check
```bash
curl http://localhost:8000/health
```

### List Models
```bash
curl http://localhost:8000/models
```

### Search
```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is quantum mechanics?",
    "model": "llama3.2",
    "num_results": 5,
    "temperature": 0.3
  }'
```

### Usage Stats
```bash
curl http://localhost:8000/stats
```

## Performance Tips

1. **GPU Acceleration**: Ollama automatically uses GPU if available
2. **Model Caching**: Keep Ollama running to avoid model reloading
3. **Batch Requests**: Backend handles multiple concurrent users
4. **Rate Limiting**: Protects against overload (20 req/min default)

## Security Considerations

- **Rate Limiting**: Prevents abuse (configurable)
- **CORS**: Configured for public access
- **Input Validation**: Query length and content validation
- **No Authentication**: Add if deploying publicly

## Monitoring

### Logs
Backend logs all requests with:
- Query content
- Processing time
- Model used
- Confidence scores
- Risk analysis

### Metrics to Track
- Requests per minute
- Average response time
- Error rate
- Confidence score distribution
- Popular queries

## Next Steps

1. **Customize Configuration**: Modify `config.py` for your needs
2. **Add Authentication**: If deploying publicly
3. **Implement Caching**: Redis for repeated queries
4. **Add Analytics**: Track usage patterns
5. **Scale Horizontally**: Multiple Ollama instances

---

**ParaSearch** - Search the parameters, not the web! 🔍

Made with 💜 for the local-first AI community.
