"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { searchTools } from '@/tools/registry'
import { Tool } from '@/tools/types'
import ContextMenu from './ContextMenu'
import { useDebounce } from '@/hooks/useDebounce'

export default function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  
  const debouncedQuery = useDebounce(query, 150)

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim()) {
      const searchResults = await searchTools(searchQuery)
      setResults(searchResults)
    } else if (isOpen) {
      const allTools = await searchTools('')
      setResults(allTools)
    } else {
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    search(debouncedQuery)
  }, [debouncedQuery, search])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const handleToolSelect = useCallback((tool: Tool) => {
    console.log('Selected tool:', tool)
    setSelectedTool(tool)
    setQuery('')
    setResults([])
    setIsOpen(false)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedTool(null)
    setQuery('')
    setResults([])
    setIsOpen(false)
  }, [])

  const handleFocus = useCallback(() => {
    setIsOpen(true)
    if (!query.trim()) {
      search('')
    }
  }, [query, search])

  const inputContainerClassName = useMemo(() => {
    const hasQuery = query.trim().length > 0
    return `rounded-xl border bg-gray-50 transition-all duration-300 ease-in-out ${
      results.length > 0 
        ? 'border-green-300 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] scale-[1.01] ring-2 ring-green-100' 
        : hasQuery 
          ? 'border-red-300 ring-2 ring-red-100'
          : 'border-gray-200'
    }`
  }, [results.length, query])

  if (selectedTool) {
    const ToolComponent = selectedTool.component
    return (
      <div className="w-full min-h-screen bg-white">
        <ToolComponent onBack={handleBack} />
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className={inputContainerClassName}>
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-3 bg-transparent outline-none text-gray-900"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={handleFocus}
          />
          <div className="context-menu">
            {isOpen && <ContextMenu results={results} onSelect={handleToolSelect} />}
          </div>
        </div>
      </div>
    </div>
  )
}