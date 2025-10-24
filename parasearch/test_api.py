#!/usr/bin/env python3
"""
ParaSearch API Test Script
Tests the backend API to ensure everything works
"""
import requests
import json
import time

API_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("🏥 Testing health endpoint...")
    try:
        response = requests.get(f"{API_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health: {data['status']}")
            print(f"   Ollama: {data['ollama']['status']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_models():
    """Test models endpoint"""
    print("\n🧠 Testing models endpoint...")
    try:
        response = requests.get(f"{API_URL}/models", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Available models: {', '.join(data['models'])}")
            print(f"   Default: {data['default']}")
            return True
        else:
            print(f"❌ Models check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Models check error: {e}")
        return False

def test_search():
    """Test search endpoint"""
    print("\n🔍 Testing search endpoint...")
    query = "What is artificial intelligence?"
    
    print(f"   Query: '{query}'")
    print("   Waiting for response...")
    
    start_time = time.time()
    
    try:
        response = requests.post(
            f"{API_URL}/search",
            json={
                "query": query,
                "num_results": 3,
                "temperature": 0.3
            },
            timeout=60
        )
        
        elapsed = time.time() - start_time
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Search successful ({elapsed:.1f}s)")
            print(f"\n📊 Results:")
            print(f"   Found: {len(data['results'])} results")
            print(f"   Model: {data['model_used']}")
            print(f"   Processing time: {data['processing_time']}s")
            
            if data.get('warning'):
                print(f"   Warning: {data['warning']}")
            
            print(f"\n🎯 Top Result:")
            if data['results']:
                result = data['results'][0]
                print(f"   Title: {result['title']}")
                print(f"   Confidence: {result['confidence']:.0%}")
                print(f"   Relevance: {result['relevance_score']}/10")
                print(f"   Risk: {result['hallucination_risk']}")
                print(f"   Snippet: {result['snippet'][:100]}...")
            
            return True
        else:
            print(f"❌ Search failed: {response.status_code}")
            print(f"   Error: {response.json()}")
            return False
    except requests.exceptions.Timeout:
        print(f"❌ Search timeout (>60s)")
        return False
    except Exception as e:
        print(f"❌ Search error: {e}")
        return False

def main():
    print("🔍 ParaSearch API Test Suite")
    print("=" * 50)
    
    results = []
    
    # Run tests
    results.append(("Health Check", test_health()))
    results.append(("Models List", test_models()))
    results.append(("Search", test_search()))
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 Test Summary:")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"   {status} - {name}")
    
    print(f"\n🎯 Total: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! ParaSearch is ready!")
        print("\n💡 Next steps:")
        print("   1. Open frontend/index.html in your browser")
        print("   2. Try some searches")
        print("   3. Set up ngrok for public access (see README.md)")
    else:
        print("\n❌ Some tests failed. Check the errors above.")
        print("\n💡 Troubleshooting:")
        print("   - Make sure Ollama is running: ollama serve")
        print("   - Make sure you have a model: ollama pull llama3.2")
        print("   - Make sure backend is running: python backend/main.py")

if __name__ == "__main__":
    main()
