'use client'

import { Tool } from '@/tools/types'
import { memo } from 'react'

interface ContextMenuProps {
  results: Tool[]
  onSelect: (tool: Tool) => void
}

const ContextMenu = memo(function ContextMenu({ results, onSelect }: ContextMenuProps) {
  if (results.length === 0) return null

  return (
    <div className="context-menu absolute left-0 right-0 mt-2 border rounded-xl bg-white shadow-lg overflow-hidden flex flex-col">
      <div className="px-3 py-2 text-xs text-gray-500 border-b flex-shrink-0">
        {results.length === 1 
          ? "Only 1 tool found."
          : `${results.length} tools found.`}
      </div>
      <div className={`overflow-y-auto ${results.length > 4 ? 'max-h-[320px]' : ''}`}>
        {results.map((tool) => {
          const Icon = tool.icon
          
          return (
            <div
              key={tool.id}
              className="group relative"
            >
              <button
                onClick={() => onSelect(tool)}
                className="w-full p-3 flex items-center gap-3 hover:bg-gray-100 transition-all duration-200 ease-in-out border-b last:border-b-0"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <Icon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                  {tool.tags && tool.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            </div>
          )
        })}
      </div>
      <div className="px-3 py-2 text-xs text-gray-500 border-t flex items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 font-medium">⌘</kbd>
          <kbd className="px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-600 font-medium">K</kbd>
          <span className="text-gray-400">to search</span>
        </div>
      </div>
    </div>
  )
})

export default ContextMenu 