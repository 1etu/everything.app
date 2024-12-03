import { useState, useCallback, useEffect } from 'react'

const FAVORITES_KEY = 'tool-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
      
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  const isFavorite = useCallback((toolId: string) => {
    return favorites.includes(toolId)
  }, [favorites])

  return { favorites, toggleFavorite, isFavorite }
} 