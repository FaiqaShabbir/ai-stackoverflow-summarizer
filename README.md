# 🤖 AI StackOverflow Summarizer

A full-stack web application that uses AI to summarize StackOverflow questions and provide concise technical answers.

## ✨ Features

- **URL Input**: Paste any StackOverflow question URL for instant summarization
- **Text Input**: Directly input technical questions for AI-powered answers
- **Smart Summarization**: Uses Perplexity API to gather context and OpenAI for intelligent summaries
- **Key Points Extraction**: Automatically extracts the most important technical points
- **Code Sample Detection**: Identifies and highlights relevant code snippets
- **Follow-up Questions**: Interactive chat interface for deeper technical discussions
- **Modern UI**: Beautiful, responsive design with TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 14.2** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Vercel** - Deployment platform

### Backend
- **FastAPI** - Modern Python web framework
- **Python 3.9+** - Backend runtime
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

### APIs
- **OpenAI API** - GPT models for summarization and chat
- **Anthropic API** - Claude models for web search and context gathering

## 🚀 Live Demo

[Coming Soon - Deploy to Vercel]

## 📸 Screenshots

[Coming Soon - Add demo screenshots]

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- Python 3.9+
- OpenAI API key
- Anthropic API key

### Backend Setup

1. **Navigate to backend directory:**
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
   cp .env.example .env
   # Edit .env with your API keys
   ```

5. **Run the backend:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your backend URL
   ```

4. **Run the frontend:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
CORS_ORIGINS=http://localhost:3000,https://your-domain.vercel.app
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📁 Project Structure

```
ai-stackoverflow-summarizer/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── openai_service.py
│   │   │   └── perplexity_service.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── url_parser.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── InputForm.tsx
│   │   │   ├── SummaryDisplay.tsx
│   │   │   ├── ChatInterface.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   └── api/
│   │       └── summarize/
│   │           └── route.ts
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### POST /api/summarize
Summarize a StackOverflow question or technical text.

**Request Body:**
```json
{
  "url": "https://stackoverflow.com/questions/...",
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
  }
}
```

### POST /api/chat
Send follow-up questions to the AI.

**Request Body:**
```json
{
  "message": "Your follow-up question",
  "context": "Previous conversation context"
}
```

## 🚀 Deployment

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with Python runtime

### Frontend (Vercel)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---

Built with ❤️ using Next.js 14.2 and FastAPI 