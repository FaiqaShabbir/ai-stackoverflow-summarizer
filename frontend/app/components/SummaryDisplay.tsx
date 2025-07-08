'use client'

import { ExternalLink, MessageCircle, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface SummaryData {
  title: string
  summary: string
  key_points: string[]
  code_samples: string[]
  tags: string[]
  source_url?: string
}

interface SummaryDisplayProps {
  summary: SummaryData
  onAskFollowUp: () => void
}

export default function SummaryDisplay({ summary, onAskFollowUp }: SummaryDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Title and Source */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {summary.title}
            </h2>
            {summary.source_url && (
              <a
                href={summary.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
              >
                <span>View Original</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <button
            onClick={onAskFollowUp}
            className="btn-primary flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Follow-up</span>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Summary</h3>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{summary.summary}</p>
      </div>

      {/* Key Points */}
      {summary.key_points.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Key Points</h3>
          <ul className="space-y-2">
            {summary.key_points.map((point, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <span className="text-gray-700 dark:text-gray-200">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Code Samples */}
      {summary.code_samples.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Code Examples</h3>
          <div className="space-y-4">
            {summary.code_samples.map((code, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Code Sample {index + 1}</span>
                  <button
                    onClick={() => copyToClipboard(code, index)}
                    className="flex items-center space-x-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-sm"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="code-block">
                  <code className="text-gray-100 dark:text-gray-100">{code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {summary.tags.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {summary.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onAskFollowUp}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Ask Follow-up Question</span>
        </button>
        
        {summary.source_url && (
          <a
            href={summary.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Original Question</span>
          </a>
        )}
      </div>
    </div>
  )
} 