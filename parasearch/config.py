"""
ParaSearch Configuration
Centralized configuration with environment variable support
"""

import os

# Ollama Configuration
OLLAMA_URL = os.getenv("PARASEARCH_OLLAMA_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("PARASEARCH_MODEL", "llama3.2")

# Server Configuration
BACKEND_HOST = os.getenv("PARASEARCH_HOST", "0.0.0.0")
BACKEND_PORT = int(os.getenv("PARASEARCH_PORT", "8000"))

# Rate Limiting
RATE_LIMIT_WINDOW = int(os.getenv("PARASEARCH_RATE_WINDOW", "60"))  # seconds
MAX_REQUESTS_PER_WINDOW = int(os.getenv("PARASEARCH_MAX_REQUESTS", "20"))

# Model Configuration
RECOMMENDED_MODELS = [
    "llama3.2",    # 3B - Fast, good for development
    "mistral",     # 7B - Better quality
    "qwen2.5",     # Great world knowledge
    "llama3.1",    # Alternative 3B option
]

# Search Configuration
DEFAULT_NUM_RESULTS = int(os.getenv("PARASEARCH_DEFAULT_RESULTS", "5"))
DEFAULT_TEMPERATURE = float(os.getenv("PARASEARCH_DEFAULT_TEMP", "0.3"))

# Guardrails Configuration
ENABLE_ENHANCED_GUARDRAILS = os.getenv("PARASEARCH_ENABLE_GUARDRAILS", "true").lower() == "true"
CONFIDENCE_PENALTY_HIGH_RISK = float(os.getenv("PARASEARCH_CONFIDENCE_PENALTY", "0.2"))
TEMPERATURE_HIGH_RISK = float(os.getenv("PARASEARCH_TEMP_HIGH_RISK", "0.2"))

# Logging Configuration
LOG_LEVEL = os.getenv("PARASEARCH_LOG_LEVEL", "INFO")
LOG_REQUESTS = os.getenv("PARASEARCH_LOG_REQUESTS", "true").lower() == "true"

# CORS Configuration
CORS_ORIGINS = os.getenv("PARASEARCH_CORS_ORIGINS", "*").split(",")

def get_config_summary():
    """Return a summary of current configuration"""
    return {
        "ollama_url": OLLAMA_URL,
        "default_model": DEFAULT_MODEL,
        "backend_host": BACKEND_HOST,
        "backend_port": BACKEND_PORT,
        "rate_limit_window": RATE_LIMIT_WINDOW,
        "max_requests_per_window": MAX_REQUESTS_PER_WINDOW,
        "default_num_results": DEFAULT_NUM_RESULTS,
        "default_temperature": DEFAULT_TEMPERATURE,
        "enhanced_guardrails": ENABLE_ENHANCED_GUARDRAILS,
        "log_level": LOG_LEVEL,
        "cors_origins": CORS_ORIGINS
    }

def print_config():
    """Print current configuration for debugging"""
    print("🔧 ParaSearch Configuration:")
    config = get_config_summary()
    for key, value in config.items():
        print(f"   {key}: {value}")
    print()
