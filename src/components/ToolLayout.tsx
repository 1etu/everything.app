import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'

interface ToolLayoutProps {
  children: ReactNode
  title: string
  onBack: () => void
}

export default function ToolLayout({ children, title, onBack }: ToolLayoutProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="group px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span className="text-sm font-medium">Back to Search</span>
            </button>
            <div className="text-sm text-gray-500">
              You are now viewing <span className="font-medium text-gray-900">{title}</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 