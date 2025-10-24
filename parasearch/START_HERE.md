```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ██████╗  █████╗ ██████╗  █████╗ ███████╗███████╗ █████╗   ║
║   ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗  ║
║   ██████╔╝███████║██████╔╝███████║███████╗█████╗  ███████║  ║
║   ██╔═══╝ ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝  ██╔══██║  ║
║   ██║     ██║  ██║██║  ██║██║  ██║███████║███████╗██║  ██║  ║
║   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝  ║
║                                                               ║
║          Parametric Knowledge Search Engine                  ║
║          Search the parameters, not the web                  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

# 👋 Welcome to ParaSearch!

You've just downloaded a **parametric search engine** - it searches through an LLM's training knowledge without using the web or any external databases. Think of it as "Google for AI memory."

## 🎯 What You'll Build

By following this guide, you'll have:
- A working search engine running on your computer
- Beautiful Google-like interface
- The ability to share it publicly (optional)
- Full control over your data

## 📋 Prerequisites (Install These First)

### 1. Ollama (Required)
Download from: **https://ollama.com**

```bash
# macOS
brew install ollama

# Or download from website for Windows/Linux
```

### 2. Python 3.9+ (Required)
Check if you have it:
```bash
python --version  # or python3 --version
```

If not, download from: **https://python.org**

### 3. ngrok (Optional - for public access)
Download from: **https://ngrok.com**

```bash
# macOS
brew install ngrok
```

## 🚀 Quick Start (3 Steps)

### Step 1: Get a Model

```bash
# Start Ollama
ollama serve

# In a new terminal, download a model
ollama pull llama3.2
```

This downloads a 3B parameter model (~2GB). Takes 2-5 minutes.

**Other options:**
- `ollama pull mistral` - Larger, better quality (7B, ~4GB)
- `ollama pull qwen2.5` - Great world knowledge (3B, ~2GB)

### Step 2: Start ParaSearch

```bash
# Make script executable (first time only)
chmod +x start.sh

# Run the startup script
./start.sh
```

You'll see:
```
✅ ParaSearch is running!

Backend API:  http://localhost:8000
Frontend:     Open frontend/index.html in your browser
```

### Step 3: Open the Frontend

```bash
# Option A: Just open the file
open frontend/index.html  # macOS
start frontend/index.html # Windows
xdg-open frontend/index.html # Linux

# Option B: Use a web server (recommended)
cd frontend
python -m http.server 8080
# Then visit http://localhost:8080
```

**You're done!** 🎉 Start searching!

## 🧪 Test It

Run the test suite to make sure everything works:

```bash
./test_api.py
```

You should see:
```
🎯 Total: 3/3 tests passed
🎉 All tests passed! ParaSearch is ready!
```

## 📚 What to Read Next

### For First-Time Users
1. **README.md** - Full documentation (15 min read)
2. Try some example searches in the UI
3. **QUICK_REFERENCE.md** - Useful commands

### For Public Hosting
1. **NGROK_SETUP.md** - Step-by-step guide (5 min)
2. Share your search engine with the world!

### For Developers
1. **ARCHITECTURE.md** - How it works
2. **API_EXAMPLES.md** - Testing the API
3. Modify `backend/main.py` or `frontend/index.html`

## 🎨 Try These Searches

Once it's running, try:
- "Who was Leonardo da Vinci?"
- "Explain quantum mechanics"
- "History of ancient Rome"
- "How does photosynthesis work?"
- "What is machine learning?"

## ❓ Troubleshooting

### "Ollama not found"
➜ Install Ollama from https://ollama.com

### "No model available"
➜ Run: `ollama pull llama3.2`

### "Connection refused"
➜ Make sure Ollama is running: `ollama serve`

### "Python dependencies missing"
➜ Run: `pip install -r backend/requirements.txt`

### Still stuck?
➜ Read **README.md** or check **QUICK_REFERENCE.md**

## 🌐 Going Public (Optional)

Want others to use your search engine?

1. Keep ParaSearch running
2. In a new terminal: `ngrok http 8000`
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok-free.app`)
4. Update `frontend/index.html` with this URL
5. Host frontend on GitHub Pages or Netlify
6. Share your link!

Full guide: **NGROK_SETUP.md**

## 🎯 What Can It Search?

### ✅ Great For:
- Historical facts and events
- Scientific concepts
- Famous people and places
- Explanations of theories
- General knowledge
- Creative writing inspiration

### ❌ Not Great For:
- Recent events (after January 2025)
- Real-time data (weather, stocks)
- Current news
- Personal documents
- Your specific files

## 🏗️ Project Structure

```
parasearch/
├── 📚 Documentation (8 guides)
├── 💻 Backend (Python API)
├── 🎨 Frontend (React UI)
└── 🚀 Scripts (startup + tests)
```

See **FILE_STRUCTURE.md** for complete details.

## 💡 Pro Tips

1. **Keep Ollama running**: Start it once, use it all day
2. **Use faster models**: llama3.2 (3B) is fast and good enough
3. **Check the logs**: Backend shows every request
4. **Test first**: Run `./test_api.py` before going public
5. **Read docs**: They're comprehensive and helpful!

## 🎉 You're Ready!

Everything you need is in this folder:

```
📖 Start with: README.md
🚀 Run with: ./start.sh
🧪 Test with: ./test_api.py
🌐 Share with: NGROK_SETUP.md
```

## 🤝 Community

This is open-source! Feel free to:
- Modify the code
- Share with others
- Report issues
- Suggest features
- Contribute improvements

## 📞 Support

1. Check **README.md** for detailed docs
2. See **QUICK_REFERENCE.md** for commands
3. Read **NGROK_SETUP.md** for hosting
4. Review **API_EXAMPLES.md** for testing

## 🎬 Next Steps

```bash
# 1. Start it up
./start.sh

# 2. Open frontend
open frontend/index.html

# 3. Start searching!
# Try: "What is artificial intelligence?"

# 4. (Optional) Share it
# Follow NGROK_SETUP.md
```

---

**Ready to search the parameters?** 🔍

Let's go: `./start.sh`

---

```
Made with 💜 for the local-first AI community
No tracking • No cloud • No complexity • Just search
```
