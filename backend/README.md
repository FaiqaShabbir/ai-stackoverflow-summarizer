# AI StackOverflow Summarizer - Backend

FastAPI backend for the AI StackOverflow Summarizer application.

## Features

- **StackOverflow URL Processing**: Extract and analyze StackOverflow questions
- **AI-Powered Summarization**: Use OpenAI GPT models for intelligent summaries
- **Web Search Integration**: Use Perplexity API for additional context
- **Chat Interface**: Handle follow-up questions with conversation context
- **RESTful API**: Clean, documented API endpoints
- **CORS Support**: Configured for frontend integration

## Tech Stack

- **FastAPI**: Modern Python web framework
- **OpenAI API**: GPT models for summarization and chat
- **Anthropic API**: Claude models for web search and content extraction
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server
- **BeautifulSoup4**: HTML parsing for web scraping

## Setup

### Prerequisites

- Python 3.9+
- OpenAI API key
- Anthropic API key

### Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

5. **Run the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# API Keys
OPENAI_API_KEY=your_openai_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# CORS Settings
CORS_ORIGINS=http://localhost:3000,https://your-domain.vercel.app

# Server Settings
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check with service status

### Main Endpoints
- `POST /api/summarize` - Summarize StackOverflow questions or technical text
- `POST /api/chat` - Send follow-up questions to AI

### Documentation
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /redoc` - Alternative API documentation

## API Usage

### Summarize Endpoint

**Request:**
```json
{
  "url": "https://stackoverflow.com/questions/123456/how-to-use-fastapi",
  "question": "Optional direct question text"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Question Title",
    "summary": "AI-generated summary",
    "key_points": ["Point 1", "Point 2"],
    "code_samples": ["code snippet 1", "code snippet 2"],
    "tags": ["python", "fastapi"]
  },
  "message": "Summary generated successfully"
}
```

### Chat Endpoint

**Request:**
```json
{
  "message": "Your follow-up question",
  "context": "Previous conversation context"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "AI response",
    "context": "Updated conversation context"
  },
  "message": "Chat response generated successfully"
}
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── openai_service.py    # OpenAI integration
│   │   └── perplexity_service.py # Perplexity integration
│   └── utils/
│       ├── __init__.py
│       └── url_parser.py    # URL validation utilities
├── requirements.txt
├── env.example
└── README.md
```

## Development

### Running in Development Mode
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Running in Production
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Testing
```bash
# Install test dependencies
pip install pytest httpx

# Run tests
pytest
```

## Deployment

### Render
1. Connect your GitHub repository
2. Set environment variables in Render dashboard
3. Deploy with Python runtime

### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Docker
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Error Handling

The API includes comprehensive error handling:
- Input validation errors
- API service errors
- Network errors
- General exception handling

All errors return consistent JSON responses with appropriate HTTP status codes.

## Security

- CORS configuration for frontend domains
- Input validation with Pydantic
- Environment variable management
- No sensitive data in logs

## Monitoring

- Health check endpoints
- Structured logging
- Service status monitoring
- Error tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details 