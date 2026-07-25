import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, User, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load recent searches
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    setRecentSearches(saved.slice(0, 5))
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true)
      // Simulate search suggestions
      const delay = setTimeout(() => {
        const books = JSON.parse(localStorage.getItem('books') || '[]')
        const matches = books.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
        )
        setSuggestions(matches.slice(0, 5))
        setIsLoading(false)
        setShowSuggestions(true)
      }, 300)
      return () => clearTimeout(delay)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return
    
    // Save to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)]
    localStorage.setItem('recentSearches', JSON.stringify(updated.slice(0, 5)))
    setRecentSearches(updated.slice(0, 5))
    
    setShowSuggestions(false)
    if (onSearch) {
      onSearch(searchQuery)
    } else {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query)
            }
          }}
          placeholder="Search books, authors, genres..."
          className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500 mx-auto"></div>
              </div>
            ) : (
              <>
                {suggestions.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {suggestions.map((book) => (
                      <button
                        key={book.id}
                        onClick={() => {
                          setQuery(book.title)
                          handleSearch(book.title)
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                      >
                        {book.image ? (
                          <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded" />
                        ) : (
                          <BookOpen className="w-8 h-8 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{book.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : query.length > 1 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No results found for "{query}"
                  </div>
                ) : null}
              </>
            )}

            {recentSearches.length > 0 && !query && (
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <p className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400">Recent Searches</p>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{search}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar