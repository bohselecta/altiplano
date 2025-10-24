import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-amber-200 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/altiplano-graphic-mark-logo.svg"
                alt="Altiplano"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-amber-900">ALTIPLANO</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#what" className="text-amber-700 hover:text-amber-900 font-medium transition-colors">
                What
              </Link>
              <Link href="#features" className="text-amber-700 hover:text-amber-900 font-medium transition-colors">
                Features
              </Link>
              <Link href="#download" className="text-amber-700 hover:text-amber-900 font-medium transition-colors">
                Download
              </Link>
              <Link 
                href="https://github.com/bohselecta/altiplano" 
                target="_blank"
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-48 h-48 bg-white rounded-full shadow-2xl mb-8">
              <Image
                src="/altiplano-graphic-mark-logo.svg"
                alt="Altiplano Logo"
                width={140}
                height={140}
                className="w-36 h-36"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6">
            ALTIPLANO
          </h1>
          
          <p className="text-xl md:text-2xl text-amber-700 mb-12 max-w-3xl mx-auto">
            Search your knowledge, not the web
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#download"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Download Free
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#what"
              className="inline-flex items-center px-8 py-4 bg-white text-amber-900 font-semibold rounded-full border-2 border-amber-900 hover:bg-amber-900 hover:text-white transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* What Section */}
      <section id="what" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-amber-900 mb-8">What is Altiplano?</h2>
          <p className="text-xl text-amber-700 leading-relaxed">
            Altiplano is a <span className="text-amber-600 font-semibold">parametric knowledge search engine</span> powered by 
            advanced AI guardrails. It searches through an LLM's training knowledge—not the web—with 
            <span className="text-amber-600 font-semibold"> sophisticated prompt priming</span> that ensures honest, calibrated results. 
            Completely <span className="text-amber-600 font-semibold">private</span>, runs <span className="text-amber-600 font-semibold">offline</span>, 
            and shows confidence scores with hallucination detection. Think of it as Wikipedia with a conscience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 text-center mb-16">Why Altiplano?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🔒
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Completely Private</h3>
              <p className="text-amber-700">Zero data collection. Your searches never leave your machine. No tracking, no analytics, no cloud.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Lightning Fast</h3>
              <p className="text-amber-700">Local processing means instant results. No network latency, no waiting for servers to respond.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🛡️
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Advanced Guardrails</h3>
              <p className="text-amber-700">Constitutional AI with prompt priming, risk analysis, and confidence calibration. Prevents hallucinations through sophisticated behavioral programming.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                📚
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Pure Knowledge</h3>
              <p className="text-amber-700">Searches the AI's training knowledge. Great for history, science, concepts, and explanations.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🌐
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Works Offline</h3>
              <p className="text-amber-700">No internet required once installed. Perfect for travel, remote work, or sensitive environments.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                🛠️
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Developer Friendly</h3>
              <p className="text-amber-700">Open source, fully documented API, easy to customize and extend for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Get Altiplano</h2>
          <p className="text-xl text-amber-200 mb-12">Version 1.0.0 • Free & Open Source</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="https://github.com/bohselecta/altiplano"
              target="_blank"
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/30 hover:bg-amber-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">📦</div>
              <div className="text-xl font-semibold mb-2">Source Code</div>
              <div className="text-amber-200">GitHub Repository</div>
            </Link>
            
            <Link
              href="https://github.com/bohselecta/altiplano/archive/main.zip"
              target="_blank"
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/30 hover:bg-amber-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">⬇️</div>
              <div className="text-xl font-semibold mb-2">Download ZIP</div>
              <div className="text-amber-200">Complete Package</div>
            </Link>
            
            <Link
              href="https://github.com/bohselecta/altiplano/blob/main/parasearch/README.md"
              target="_blank"
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-amber-500/30 hover:bg-amber-500/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">🔧</div>
              <div className="text-xl font-semibold mb-2">Setup Guide</div>
              <div className="text-amber-200">5-minute install</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-amber-900 text-center mb-16">What You'll Need</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-xl font-semibold text-amber-600 mb-4">Ollama</h4>
              <p className="text-amber-700">Free local AI runtime<br />Download from ollama.com</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-amber-600 mb-4">8GB+ RAM</h4>
              <p className="text-amber-700">Minimum recommended<br />16GB for best experience</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-amber-600 mb-4">Python 3.9+</h4>
              <p className="text-amber-700">For running the backend<br />Usually pre-installed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-8 mb-4 md:mb-0">
              <Link href="https://github.com/bohselecta/altiplano" target="_blank" className="hover:text-amber-200 transition-colors">
                GitHub
              </Link>
              <Link href="https://github.com/bohselecta/altiplano/blob/main/parasearch/README.md" target="_blank" className="hover:text-amber-200 transition-colors">
                Documentation
              </Link>
              <Link href="https://github.com/bohselecta/altiplano/discussions" target="_blank" className="hover:text-amber-200 transition-colors">
                Community
              </Link>
              <Link href="https://github.com/bohselecta/altiplano/issues" target="_blank" className="hover:text-amber-200 transition-colors">
                Support
              </Link>
            </div>
            <p className="text-amber-200">© 2025 Altiplano • Made with ❤️ for the local-first community</p>
          </div>
        </div>
      </footer>
    </div>
  )
}