export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">Processing your request...</p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">This may take a few seconds</p>
      </div>
    </div>
  )
} 