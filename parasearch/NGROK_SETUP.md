# 🌐 ParaSearch Public Hosting with ngrok

This guide shows you how to share ParaSearch with the world using your local machine!

## Quick Start (5 minutes)

### 1. Install ngrok

**macOS:**
```bash
brew install ngrok
```

**Windows:**
Download from [ngrok.com/download](https://ngrok.com/download)

**Linux:**
```bash
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | \
  sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && \
  echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | \
  sudo tee /etc/apt/sources.list.d/ngrok.list && \
  sudo apt update && sudo apt install ngrok
```

### 2. Sign Up & Get Auth Token

1. Go to [ngrok.com](https://ngrok.com) and sign up (free!)
2. Get your auth token from the dashboard
3. Add it to ngrok:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

### 3. Start ParaSearch Backend

```bash
cd parasearch
./start.sh
# Or manually:
cd backend && python main.py
```

### 4. Start ngrok Tunnel

In a **new terminal**:
```bash
ngrok http 8000
```

You'll see output like:
```
Session Status                online
Account                       yourname (Plan: Free)
Version                       3.5.0
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123xyz.ngrok-free.app -> http://localhost:8000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**Copy the HTTPS URL** (e.g., `https://abc123xyz.ngrok-free.app`)

### 5. Update Frontend

Edit `frontend/index.html` and find this line (around line 405):
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : window.location.origin;
```

Change it to:
```javascript
const API_URL = 'https://YOUR-NGROK-URL.ngrok-free.app';
```

### 6. Host the Frontend

**Option A: GitHub Pages (Recommended)**
1. Create a GitHub repo
2. Push `frontend/index.html`
3. Enable GitHub Pages in repo settings
4. Your site will be at `https://yourusername.github.io/parasearch`

**Option B: Netlify Drop**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `frontend` folder
3. Get instant hosting!

**Option C: ngrok for Frontend Too**
```bash
cd frontend
python -m http.server 8080

# In another terminal:
ngrok http 8080
```

Now you have TWO ngrok URLs:
- Backend: `https://abc123xyz.ngrok-free.app`
- Frontend: `https://def456uvw.ngrok-free.app`

Update the API_URL in frontend to point to backend URL.

## 🎨 Create a Landing Page

Create `landing.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>ParaSearch - Live Demo</title>
    <style>
        body {
            font-family: system-ui;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: white;
            color: #333;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; }
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
        }
        .btn:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 ParaSearch</h1>
        <p><strong>The world's first parametric knowledge search engine!</strong></p>
        <p>Search through an LLM's training knowledge - no web, no RAG, just pure AI memory.</p>
        
        <h2>Features:</h2>
        <ul>
            <li>✨ Instant results from AI training data</li>
            <li>🔒 100% private - runs on my local machine</li>
            <li>🎯 Confidence scores on every result</li>
            <li>⚡ Zero web scraping or external APIs</li>
        </ul>
        
        <a href="YOUR_FRONTEND_URL" class="btn">Try ParaSearch Now →</a>
        
        <h2>What Can You Search?</h2>
        <p>History, science, famous people, concepts, explanations - anything the AI learned during training!</p>
        
        <h2>What You CAN'T Search:</h2>
        <p>Current events, real-time data, personal documents, or anything after January 2025.</p>
        
        <p><small>🤖 Powered by Ollama + FastAPI + React, running on my local machine via ngrok</small></p>
    </div>
</body>
</html>
```

## 📊 Monitoring

### View ngrok Dashboard
While ngrok is running, visit: [http://localhost:4040](http://localhost:4040)

You can see:
- All incoming requests
- Response times
- Errors
- Geographic distribution of users

### Check API Stats
Visit your ngrok URL + `/stats`:
```
https://your-ngrok-url.ngrok-free.app/stats
```

## 🔒 Security & Rate Limiting

The backend has built-in rate limiting:
- 20 requests per minute per IP
- Prevents abuse and overload

To change limits, edit `backend/main.py`:
```python
RATE_LIMIT_WINDOW = 60  # seconds
MAX_REQUESTS_PER_WINDOW = 20  # requests
```

## ⚡ Performance Tips

### For Heavy Traffic:
1. **Use a faster model**: `llama3.2` (3B) instead of `mistral` (7B)
2. **Reduce num_results**: Default is 5, try 3
3. **Use GPU**: Ollama will use GPU if available (10x faster)
4. **Upgrade ngrok**: Paid plans have higher limits

### Keep Your Machine Awake:
**macOS:**
```bash
caffeinate -d
```

**Linux:**
```bash
systemd-inhibit --what=idle
```

**Windows:**
Use "caffeine" app or change power settings

## 🛑 Stopping Everything

1. Press `Ctrl+C` in the backend terminal
2. Press `Ctrl+C` in the ngrok terminal
3. Done!

## 📱 Share on Social Media

Once it's live, share:
```
🔍 Just launched ParaSearch - a search engine that uses ONLY 
an LLM's training knowledge. No web, no RAG, pure parametric 
search! Try it: [YOUR_URL]

Built with Ollama running on my local machine 🤯
```

## 🚀 Advanced: Custom Domain

ngrok Pro allows custom domains:
1. Upgrade to ngrok Pro
2. Add your domain
3. Run: `ngrok http --domain=parasearch.yourdomain.com 8000`

## 💡 Tips & Tricks

1. **Persistent URLs**: Free ngrok URLs change each restart. Pay for static URLs.
2. **HTTPS Only**: ngrok provides HTTPS automatically - use it!
3. **Webhook Testing**: ngrok's dashboard shows all requests - great for debugging
4. **Multiple Tunnels**: You can run multiple ngrok tunnels simultaneously

## 🎉 You're Live!

Congratulations! ParaSearch is now accessible to anyone in the world while running on your local machine. Wild! 🌍

Share your URL and let people experience parametric search!

---

**Questions?** Check the main README.md or create an issue on GitHub.
