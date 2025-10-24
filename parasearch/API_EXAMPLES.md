# 🔌 ParaSearch API Examples

Quick reference for testing the API with curl commands.

## Health Check

```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "healthy",
  "ollama": {
    "status": "healthy",
    "models": {...}
  },
  "timestamp": "2025-10-24T03:35:00.000Z"
}
```

## List Models

```bash
curl http://localhost:8000/models
```

Response:
```json
{
  "models": ["llama3.2", "mistral", "qwen2.5"],
  "default": "llama3.2"
}
```

## Basic Search

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is artificial intelligence?"
  }'
```

## Search with Options

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain quantum mechanics",
    "model": "mistral",
    "num_results": 3,
    "temperature": 0.2
  }'
```

## Search with Different Models

### Using Llama 3.2 (Fast)
```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "History of Rome",
    "model": "llama3.2",
    "num_results": 5
  }'
```

### Using Mistral (Better Quality)
```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "History of Rome",
    "model": "mistral",
    "num_results": 5
  }'
```

## Complex Query

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Compare the philosophies of Socrates, Plato, and Aristotle",
    "num_results": 5,
    "temperature": 0.4
  }'
```

## Scientific Query

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How does photosynthesis work in plants?",
    "num_results": 4
  }'
```

## Historical Query

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Who was Leonardo da Vinci and what were his achievements?",
    "num_results": 5
  }'
```

## Get Usage Stats

```bash
curl http://localhost:8000/stats
```

Response:
```json
{
  "total_requests_last_minute": 15,
  "active_users": 3,
  "rate_limit_window": 60,
  "max_requests_per_window": 20
}
```

## Test Rate Limiting

```bash
# Send 25 requests quickly (should hit rate limit)
for i in {1..25}; do
  echo "Request $i"
  curl -X POST http://localhost:8000/search \
    -H "Content-Type: application/json" \
    -d '{"query":"test"}' &
done
wait
```

## Pretty Print JSON

```bash
# macOS/Linux with jq installed
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query":"What is AI?"}' | jq '.'

# Without jq (basic)
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query":"What is AI?"}' | python -m json.tool
```

## Save Response to File

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query":"Machine learning basics"}' \
  > response.json
```

## Measure Response Time

```bash
# Using curl's timing
curl -w "\nTime: %{time_total}s\n" \
  -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query":"What is blockchain?"}'

# Using time command
time curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query":"What is blockchain?"}'
```

## Test Error Handling

### Empty Query
```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query":""}'
```

Expected:
```json
{
  "detail": "Query cannot be empty"
}
```

### Query Too Long
```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d "{\"query\":\"$(printf 'a%.0s' {1..600})\"}"
```

Expected:
```json
{
  "detail": "Query too long (max 500 characters)"
}
```

### Invalid Model
```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "test",
    "model": "nonexistent-model"
  }'
```

## Testing with ngrok

Once you have ngrok running, replace `localhost:8000` with your ngrok URL:

```bash
# Get your ngrok URL from the ngrok terminal
# It looks like: https://abc123xyz.ngrok-free.app

curl -X POST https://abc123xyz.ngrok-free.app/search \
  -H "Content-Type: application/json" \
  -d '{"query":"Test from ngrok"}'
```

## Batch Testing Script

Save as `batch_test.sh`:

```bash
#!/bin/bash

QUERIES=(
  "What is machine learning?"
  "History of ancient Egypt"
  "How do computers work?"
  "Who was Shakespeare?"
  "Explain photosynthesis"
)

for query in "${QUERIES[@]}"; do
  echo "Testing: $query"
  curl -s -X POST http://localhost:8000/search \
    -H "Content-Type: application/json" \
    -d "{\"query\":\"$query\",\"num_results\":3}" \
    | jq -r '.results[0].title'
  echo "---"
  sleep 2
done
```

Run:
```bash
chmod +x batch_test.sh
./batch_test.sh
```

## Python Example

```python
import requests

def search_parasearch(query, model="llama3.2", num_results=5):
    response = requests.post(
        "http://localhost:8000/search",
        json={
            "query": query,
            "model": model,
            "num_results": num_results,
            "temperature": 0.3
        }
    )
    return response.json()

# Use it
results = search_parasearch("What is quantum physics?")
for i, result in enumerate(results['results'], 1):
    print(f"{i}. {result['title']}")
    print(f"   Confidence: {result['confidence']:.0%}")
    print(f"   {result['snippet']}\n")
```

## JavaScript Example (Node.js)

```javascript
const fetch = require('node-fetch');

async function searchParaSearch(query, model = 'llama3.2') {
  const response = await fetch('http://localhost:8000/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      model: model,
      num_results: 5,
      temperature: 0.3
    })
  });
  
  return await response.json();
}

// Use it
searchParaSearch('What is the Big Bang theory?')
  .then(data => {
    console.log(`Found ${data.results.length} results`);
    data.results.forEach((result, i) => {
      console.log(`${i+1}. ${result.title}`);
      console.log(`   Confidence: ${(result.confidence * 100).toFixed(0)}%`);
    });
  });
```

## Tips for API Testing

1. **Use jq for JSON formatting**:
   ```bash
   brew install jq  # macOS
   apt install jq   # Linux
   ```

2. **Save curl commands as aliases**:
   ```bash
   alias psearch='curl -X POST http://localhost:8000/search -H "Content-Type: application/json"'
   # Then use: psearch -d '{"query":"test"}'
   ```

3. **Monitor ngrok dashboard**: http://localhost:4040

4. **Check backend logs**: They show every request

5. **Use Postman/Insomnia**: GUI tools for API testing

## Troubleshooting API Calls

### Connection Refused
```bash
# Check if backend is running
curl http://localhost:8000/
```

### Timeout
```bash
# Increase timeout for large models
curl --max-time 120 -X POST ...
```

### CORS Errors (from browser)
```javascript
// Make sure you're using the correct URL
// localhost:8000 for local
// ngrok URL for public
```

---

**Note**: All examples use `http://localhost:8000`. Replace with your ngrok URL when testing public access.

Happy testing! 🚀
