'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SearchResult {
  title: string
  snippet: string
  confidence: number
  relevance_score: number
  expanded_content?: string
  hallucination_risk: string
}

interface SearchResponse {
  query: string
  results: SearchResult[]
  processing_time: number
  model_used: string
  knowledge_cutoff: string
  warning?: string
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedResults, setExpandedResults] = useState<Set<number>>(new Set())

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError('')
    setResults([])

    try {
      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          num_results: 5,
          temperature: 0.3
        }),
      })

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      const data: SearchResponse = await response.json()
      setResults(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedResults)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedResults(newExpanded)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light to-cream">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-brown-mid/20 z-50">
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
              <span className="text-xl font-bold text-brown-dark">ALTIPLANO</span>
            </div>
            <div className="text-sm text-brown-mid">
              Parametric Knowledge Search
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Section */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-2xl mb-6">
                <Image
                  src="/altiplano-graphic-mark-logo.svg"
                  alt="Altiplano Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-brown-dark mb-6 tracking-tight">
              ALTIPLANO
            </h1>
            
            <p className="text-xl md:text-2xl text-brown-mid mb-12 max-w-2xl mx-auto">
              Search your knowledge, not the web
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about history, science, concepts..."
                  className="w-full px-6 py-4 text-lg border-2 border-brown-mid/30 rounded-full focus:border-orange focus:outline-none transition-colors"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange to-orange-light text-white font-semibold rounded-full hover:from-orange/90 hover:to-orange-light/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>

            {/* Example Queries */}
            <div className="mt-8">
              <p className="text-sm text-brown-mid mb-4">Try these examples:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'What is quantum mechanics?',
                  'Who was Leonardo da Vinci?',
                  'Explain photosynthesis',
                  'History of ancient Rome'
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setQuery(example)}
                    className="px-4 py-2 text-sm bg-white/50 text-brown-mid rounded-full hover:bg-white hover:text-brown-dark transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-800">{error}</p>
              <p className="text-sm text-red-600 mt-2">
                Make sure the ParaSearch backend is running on localhost:8000
              </p>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-brown-dark mb-6">
                Search Results ({results.length})
              </h2>
              
              {results.map((result, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-brown-dark flex-1">
                      {result.title}
                    </h3>
                    <div className="flex space-x-4 text-sm">
                      <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
                        {result.confidence}% confidence
                      </span>
                      <span className={`font-medium ${getRiskColor(result.hallucination_risk)}`}>
                        {result.hallucination_risk} risk
                      </span>
                      <span className="text-brown-mid">
                        Score: {result.relevance_score}/10
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-brown-mid mb-4 leading-relaxed">
                    {result.snippet}
                  </p>
                  
                  {result.expanded_content && (
                    <div>
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-orange hover:text-orange-light font-medium transition-colors"
                      >
                        {expandedResults.has(index) ? 'Show Less' : 'Show More'}
                      </button>
                      
                      {expandedResults.has(index) && (
                        <div className="mt-4 p-4 bg-cream-light rounded-lg">
                          <p className="text-brown-mid leading-relaxed">
                            {result.expanded_content}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-brown-dark mb-6">About Altiplano</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-brown-dark mb-3">🔒 Completely Private</h3>
                <p className="text-brown-mid">Zero data collection. Your searches never leave your machine.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brown-dark mb-3">⚡ Lightning Fast</h3>
                <p className="text-brown-mid">Local processing means instant results with no network latency.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brown-dark mb-3">🛡️ Advanced Guardrails</h3>
                <p className="text-brown-mid">Constitutional AI with confidence scoring and hallucination detection.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brown-dark mb-3">📚 Pure Knowledge</h3>
                <p className="text-brown-mid">Searches AI training knowledge - great for history, science, and concepts.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}