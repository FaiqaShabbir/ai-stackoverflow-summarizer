'use client'

import { useState } from 'react'
import { Link, MessageSquare, Send } from 'lucide-react'

interface InputFormProps {
  onSubmit: (url: string, question: string) => void
  disabled?: boolean
}

export default function InputForm({ onSubmit, disabled = false }: InputFormProps) {
  const [url, setUrl] = useState('')
  const [question, setQuestion] = useState('')
  const [inputType, setInputType] = useState<'url' | 'question'>('url')
  const [errors, setErrors] = useState<{ url?: string; question?: string }>({})

  const validateInput = () => {
    const newErrors: { url?: string; question?: string } = {}

    if (inputType === 'url') {
      if (!url.trim()) {
        newErrors.url = 'Please enter a StackOverflow URL'
      } else if (!isValidStackOverflowUrl(url)) {
        newErrors.url = 'Please enter a valid StackOverflow question URL'
      }
    } else {
      if (!question.trim()) {
        newErrors.question = 'Please enter your question'
      } else if (question.trim().length < 10) {
        newErrors.question = 'Question must be at least 10 characters long'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateInput()) {
      onSubmit(url, question)
    }
  }

  const isValidStackOverflowUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname.includes('stackoverflow.com') && 
             urlObj.pathname.includes('/questions/')
    } catch {
      return false
    }
  }

  const clearErrors = () => {
    setErrors({})
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Get AI-Powered Summary
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Paste a StackOverflow URL or ask a technical question to get instant insights.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Type Toggle */}
        <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setInputType('url')
              clearErrors()
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              inputType === 'url'
                ? 'bg-white dark:bg-gray-900 text-primary-600 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>StackOverflow URL</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setInputType('question')
              clearErrors()
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              inputType === 'question'
                ? 'bg-white dark:bg-gray-900 text-primary-600 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Question</span>
          </button>
        </div>

        {/* URL Input */}
        {inputType === 'url' && (
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              StackOverflow Question URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                if (errors.url) clearErrors()
              }}
              placeholder="https://stackoverflow.com/questions/123456/how-to-use-fastapi"
              className={`input-field ${errors.url ? 'border-red-300 focus:ring-red-500' : ''} dark:placeholder-gray-500`}
              disabled={disabled}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.url}</p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Paste a valid StackOverflow question URL to get a comprehensive summary.
            </p>
          </div>
        )}

        {/* Question Input */}
        {inputType === 'question' && (
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Your Technical Question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value)
                if (errors.question) clearErrors()
              }}
              placeholder="Describe your technical problem or question in detail..."
              rows={4}
              className={`input-field resize-none ${errors.question ? 'border-red-300 focus:ring-red-500' : ''} dark:placeholder-gray-500`}
              disabled={disabled}
            />
            {errors.question && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.question}</p>
            )}
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Ask any technical question and get AI-powered insights and solutions.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Summary...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Generate Summary</span>
            </>
          )}
        </button>
      </form>

      {/* Example URLs */}
      {inputType === 'url' && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Example URLs:</h3>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>• https://stackoverflow.com/questions/123456/how-to-use-fastapi</p>
            <p>• https://stackoverflow.com/questions/789012/react-hooks-best-practices</p>
            <p>• https://stackoverflow.com/questions/345678/python-async-await-tutorial</p>
          </div>
        </div>
      )}
    </div>
  )
} 