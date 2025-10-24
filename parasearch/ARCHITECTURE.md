# 🏗️ ParaSearch Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                   USER'S BROWSER                        │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │         React Frontend (index.html)              │  │
│  │  • Search interface                             │  │
│  │  • Result cards                                 │  │
│  │  • Confidence indicators                        │  │
│  └─────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/HTTPS (REST API)
                   │ POST /search
                   ▼
┌─────────────────────────────────────────────────────────┐
│              FastAPI Backend (main.py)                  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Rate Limiting & Request Validation              │  │
│  └─────────────────────────────────────────────────┘  │
│                   │                                     │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Prompt Engineering                               │  │
│  │  • Crafts search-optimized prompts              │  │
│  │  • Adds structure requirements                  │  │
│  └─────────────────────────────────────────────────┘  │
│                   │                                     │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Result Parser & Formatter                       │  │
│  │  • Extracts structured data                     │  │
│  │  • Calculates confidence scores                 │  │
│  └─────────────────────────────────────────────────┘  │
│                   │                                     │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Guardrails                                       │  │
│  │  • Hallucination detection                      │  │
│  │  • Warning generation                           │  │
│  │  • Confidence scoring                           │  │
│  └─────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP POST
                   │ http://localhost:11434/api/generate
                   ▼
┌─────────────────────────────────────────────────────────┐
│                    Ollama Server                        │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ LLM Runtime (llama.cpp based)                   │  │
│  │  • Model loading                                │  │
│  │  • Token generation                             │  │
│  │  • Memory management                            │  │
│  └─────────────────────────────────────────────────┘  │
│                   │                                     │
│  ┌─────────────────────────────────────────────────┐  │
│  │ LLM Model (e.g., Llama 3.2, Mistral)           │  │
│  │  • Parametric knowledge                         │  │
│  │  • No external memory                           │  │
│  │  • Frozen at training time                      │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                   │
                   ▼
              GPU/CPU Hardware
```

## Data Flow

### 1. Search Request
```
User types query
  → Frontend validates input
    → Sends POST /search with JSON body
      → Backend receives request
```

### 2. Request Processing
```
Backend checks rate limit
  → Validates query (length, content)
    → Checks Ollama health
      → Constructs specialized prompt
```

### 3. LLM Generation
```
Prompt sent to Ollama
  → Ollama loads model into memory
    → Model generates structured response
      → Returns complete text
```

### 4. Response Processing
```
Backend parses LLM output
  → Extracts structured fields (title, snippet, etc.)
    → Calculates confidence scores
      → Detects hallucination risks
        → Adds warnings if needed
```

### 5. Result Delivery
```
Backend formats JSON response
  → Sends to frontend
    → Frontend displays results
      → User sees search results with confidence indicators
```

## Component Details

### Frontend (React SPA)
```javascript
// Key features:
- Single HTML file (no build step)
- Responsive design (mobile-first)
- Real-time search
- Result expansion
- Confidence visualization
- Warning banners

// State management:
- Query input
- Search results
- Loading state
- Error handling
- Expanded results tracking
```

### Backend (FastAPI)
```python
# Endpoints:
GET  /              # API info
GET  /health        # System health
GET  /models        # Available models
POST /search        # Main search
GET  /stats         # Usage stats

# Features:
- Rate limiting (IP-based)
- Input validation
- Error handling
- CORS support
- Async processing
```

### Ollama Integration
```python
# Communication:
HTTP POST to localhost:11434/api/generate

# Request format:
{
  "model": "llama3.2",
  "prompt": "...",
  "temperature": 0.3,
  "stream": false
}

# Response format:
{
  "response": "...",
  "done": true,
  "model": "llama3.2"
}
```

## Security Layers

### 1. Rate Limiting
```python
# Per-IP tracking
- 20 requests per 60 seconds
- Rolling window
- Automatic cleanup
```

### 2. Input Validation
```python
# Query validation
- Max length: 500 chars
- Non-empty check
- Sanitization
```

### 3. Guardrails
```python
# Hallucination detection
- Hedge word counting
- Conflicting statement detection
- Confidence adjustment

# Warning system
- Recent events detection
- Real-time data queries
- Knowledge cutoff awareness
```

## Deployment Architectures

### Local Development
```
[Browser] → [Backend:8000] → [Ollama:11434]
    ↓
[localhost]
```

### ngrok Public Access
```
[Internet Users] → [ngrok HTTPS]
                        ↓
              [localhost:8000] → [Ollama:11434]
                        ↓
                [Your Machine]
```

### Cloud Deployment (Future)
```
[Users] → [Load Balancer]
            ↓
      [Frontend CDN]
            ↓
      [Backend API] → [Ollama Instances]
            ↓              ↓
      [Redis Cache]  [GPU Servers]
```

## Performance Characteristics

### Response Times
```
Model Size    First Token    Full Response    Tokens/sec
---------------------------------------------------------
3B (Llama3.2)    ~200ms         2-4s           30-50
7B (Mistral)     ~500ms         4-8s           15-30
13B (Qwen2.5)    ~1000ms        8-15s          8-15
```

### Memory Requirements
```
Model Size    RAM (CPU)    VRAM (GPU)
--------------------------------------
3B            8-16GB       4-6GB
7B            16-32GB      8-12GB
13B           32-64GB      16-24GB
```

### Concurrency
```
- Single backend handles ~10 concurrent requests
- Each request uses ~1 model instance
- Queue-based processing for >10 requests
- Rate limiting prevents overload
```

## Scaling Strategies

### Vertical Scaling
```
1. Upgrade hardware (more RAM/GPU)
2. Use faster models (3B over 7B)
3. Reduce num_results (3 instead of 5)
4. Lower temperature (faster generation)
```

### Horizontal Scaling
```
1. Multiple Ollama instances
2. Load balancer for backend
3. Redis for caching
4. CDN for frontend
```

## Data Model

### Search Query
```json
{
  "query": string,           // User's search
  "model": string,           // LLM model name
  "num_results": int,        // 1-10
  "temperature": float       // 0.0-1.0
}
```

### Search Result
```json
{
  "title": string,
  "snippet": string,
  "confidence": float,       // 0.0-1.0
  "relevance_score": int,    // 1-10
  "expanded_content": string | null,
  "hallucination_risk": enum // "low" | "medium" | "high"
}
```

### Search Response
```json
{
  "query": string,
  "results": [SearchResult],
  "processing_time": float,
  "model_used": string,
  "knowledge_cutoff": string,
  "warning": string | null
}
```

## Technology Stack

```
Frontend:
├── React 18 (via CDN)
├── Vanilla JavaScript
└── CSS3 (with gradients & animations)

Backend:
├── Python 3.9+
├── FastAPI 0.109+
├── httpx (async HTTP)
├── Pydantic (validation)
└── uvicorn (ASGI server)

LLM Runtime:
├── Ollama (llama.cpp based)
├── GGUF model format
└── GPU acceleration (CUDA/Metal)

Deployment:
├── ngrok (tunneling)
├── GitHub Pages (frontend)
└── Local machine (backend + LLM)
```

## Key Design Decisions

### Why No RAG?
```
✓ Simpler architecture
✓ Faster responses (no retrieval)
✓ Fully offline-capable
✓ Honest about limitations
✗ Can't access external docs
✗ Knowledge cutoff limitation
```

### Why FastAPI?
```
✓ Async support
✓ Auto documentation
✓ Fast performance
✓ Type safety with Pydantic
✓ Easy CORS handling
```

### Why Single-File Frontend?
```
✓ Zero build step
✓ Easy deployment
✓ Works offline
✓ No dependencies to manage
✓ Can be hosted anywhere
```

### Why Ollama?
```
✓ Easy installation
✓ Automatic GPU detection
✓ Model management
✓ Good performance
✓ Active development
```

## Future Enhancements

### Planned Features
```
1. Query history & caching
2. Related searches
3. Multi-language support
4. Dark mode
5. Export results (PDF/MD)
6. Voice search
7. Knowledge graph visualization
8. Comparison mode
```

### Technical Improvements
```
1. Redis caching layer
2. WebSocket streaming
3. Model hot-swapping
4. A/B testing framework
5. Analytics dashboard
6. Admin panel
7. User accounts (optional)
```

## Monitoring & Observability

### Metrics to Track
```
- Requests per minute
- Average response time
- Model loading time
- Error rate
- Confidence score distribution
- Hallucination risk distribution
- Popular queries
- Geographic distribution (via ngrok)
```

### Logging
```
Backend logs:
- All requests (query, IP, timestamp)
- Response times
- Errors and exceptions
- Rate limit hits

ngrok dashboard:
- Request/response inspection
- Geographic data
- Timing information
```

## Limitations & Considerations

### Technical
```
- Single machine = single point of failure
- Rate limiting needed for public access
- Model size vs. quality tradeoff
- Memory requirements can be high
- First request slower (model loading)
```

### Knowledge
```
- Training data cutoff (~Jan 2025)
- Can't verify facts
- No source attribution
- Potential hallucinations
- Bias from training data
```

### Operational
```
- Machine must stay on for public access
- ngrok free tier has limitations
- No built-in authentication
- Basic rate limiting
- No usage analytics
```

---

This architecture is designed for:
- **Simplicity**: Easy to understand and modify
- **Locality**: Runs on one machine
- **Honesty**: Clear about what it can/can't do
- **Performance**: Fast enough for real-world use
- **Scalability**: Can be enhanced as needed

Built with ❤️ for the local-first AI community.
