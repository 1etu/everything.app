'use client'

import { memo, useEffect, useRef } from 'react'
import { Star, Copy, Trash } from 'lucide-react'
import { Tool } from '@/tools/types'
import { useFavorites } from '@/hooks/useFavorites'

interface ToolContextMenuProps {
  tool: Tool
  x: number
  y: number
  onClose: () => void
}

const ToolContextMenu = memo(function ToolContextMenu({ tool, x, y, onClose }: ToolContextMenuProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(tool.id)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let newX = x
      let newY = y

      if (x + rect.width > viewportWidth - 16) {
        newX = x - rect.width
      }

      if (y + rect.height > viewportHeight - 16) {
        newY = y - rect.height
      }

      menuRef.current.style.left = `${Math.max(16, newX)}px`
      menuRef.current.style.top = `${Math.max(16, newY)}px`
    }
  }, [x, y])

  return (
    <div className="fixed inset-0 z-[100]" onMouseDown={(e) => e.stopPropagation()}>
      <div 
        className="absolute inset-0 bg-black/5 backdrop-blur-sm"
        onClick={onClose}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div 
        ref={menuRef}
        className="absolute w-44 bg-white/95 backdrop-blur-xl rounded-lg shadow-lg overflow-hidden tool-context-menu divide-y divide-gray-100/50"
        style={{
          top: y,
          left: x,
          transform: 'scale(0.95) translateY(-8px)',
          animation: 'menu-in 0.15s ease-out forwards',
          transformOrigin: 'top left'
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <button
          onClick={() => {
            toggleFavorite(tool.id)
            onClose()
          }}
          className="w-full px-3 h-9 flex items-center gap-2 hover:bg-gray-100/80 text-[13px] font-medium text-gray-700 transition-colors"
        >
          <Star size={14} className={favorite ? 'fill-yellow-400 text-yellow-400' : ''} />
          {favorite ? 'Unfavorite' : 'Favorite'}
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(tool.id)
            onClose()
          }}
          className="w-full px-3 h-9 flex items-center gap-2 hover:bg-gray-100/80 text-[13px] font-medium text-gray-700 transition-colors"
        >
          <Copy size={14} />
          Copy ID
        </button>
        <button
          onClick={onClose}
          className="w-full px-3 h-9 flex items-center gap-2 hover:bg-red-50 text-[13px] font-medium text-red-600 transition-colors"
        >
          <Trash size={14} />
          Remove
        </button>
      </div>
      <style jsx global>{`
        @keyframes menu-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
})

export default ToolContextMenu 