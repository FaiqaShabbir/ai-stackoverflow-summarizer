'use client'

import { useState } from 'react'
import Header from './components/Header'
import InputForm from './components/InputForm'
import SummaryDisplay from './components/SummaryDisplay'
import ChatInterface from './components/ChatInterface'
import LoadingSpinner from './components/LoadingSpinner'
import DarkModeToggle from './components/DarkModeToggle'

interface SummaryData {
  title: string
  summary: string
  key_points: string[]
  code_samples: string[]
  tags: string[]
  source_url?: string
}

export default function Home() {
  const [summary, setSummary] = useState<SummaryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleSummarize = async (url: string, question: string) => {
    setLoading(true)
    setError(null)
    setSummary(null)
    setShowChat(false)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      
      const response = await fetch(`${apiUrl}/api/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url || undefined,
          question: question || undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSummary(data.data)
      } else {
        setError(data.error || 'Failed to generate summary')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAskFollowUp = () => {
    setShowChat(true)
  }

  return (
    <div className="min-h-screen gradient-bg transition-colors duration-200">
      <Header />
      <DarkModeToggle />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-6 animate-bounce-in">
            AI StackOverflow Summarizer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Paste a StackOverflow URL or ask a technical question to get an AI-powered summary and key insights.
          </p>
        </div>

        <div className="space-y-10">
          <InputForm onSubmit={handleSummarize} disabled={loading} />
          
          {loading && (
            <div className="flex justify-center animate-fade-in">
              <LoadingSpinner />
            </div>
          )}
          
          {error && (
            <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-fade-in">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {summary && (
            <div className="animate-fade-in">
              <SummaryDisplay 
                summary={summary} 
                onAskFollowUp={handleAskFollowUp}
              />
            </div>
          )}
          
          {showChat && summary && (
            <div className="animate-slide-up">
              <ChatInterface 
                initialContext={`Question: ${summary.title}\nSummary: ${summary.summary}`}
              />
            </div>
          )}
        </div>
      </main>
      
      <footer className="mt-20 py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p className="text-lg font-medium">Built with ❤️ using Next.js 14.2 and FastAPI</p>
          <p className="text-sm mt-3">
            Powered by OpenAI and Anthropic APIs
          </p>
        </div>
      </footer>
    </div>
  )
} 