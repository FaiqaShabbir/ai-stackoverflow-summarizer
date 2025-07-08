import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI StackOverflow Summarizer',
  description: 'Summarize StackOverflow questions and get AI-powered technical answers',
  keywords: ['AI', 'StackOverflow', 'Summarizer', 'Technical', 'Questions', 'Answers'],
  authors: [{ name: 'AI StackOverflow Summarizer' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AI StackOverflow Summarizer',
    description: 'Summarize StackOverflow questions and get AI-powered technical answers',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI StackOverflow Summarizer',
    description: 'Summarize StackOverflow questions and get AI-powered technical answers',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
} 