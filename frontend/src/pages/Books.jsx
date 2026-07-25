import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react'
import BookCard from '../components/BookCard'

const Books = () => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')

  const categories = ['All', 'Fiction', 'Fantasy', 'Self-Help', 'Business', 'Science', 'History', 'Romance', 'Technology', 'Biography']

  useEffect(() => {
    // Sample books data
    const allBooks = [
      {
        id: 1,
        title: 'The World Versus Everything Beyond',
        author: 'Like & Michael Cahn',
        price: 250.20,
        originalPrice: 350.00,
        discount: 28,
        rating: 4.5,
        reviews: 128,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        category: 'Fiction',
        description: 'A gripping tale of adventure and self-discovery.'
      },
      {
        id: 2,
        title: 'Twilight Fortress',
        author: 'Oregory Barrett',
        price: 190.99,
        originalPrice: 250.00,
        discount: 24,
        rating: 4.8,
        reviews: 256,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        category: 'Fantasy',
        description: 'An epic fantasy adventure in a world of magic.'
      },
      {
        id: 3,
        title: 'Mind Blown: Unleashing Creativity',
        author: 'Susan Williams',
        price: 320.00,
        originalPrice: 400.00,
        discount: 20,
        rating: 4.7,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
        category: 'Self-Help',
        description: 'Unlock your creative potential with proven techniques.'
      },
      {
        id: 4,
        title: 'Atomic Habits',
        author: 'James Clear',
        price: 255.20,
        originalPrice: 300.00,
        discount: 15,
        rating: 4.9,
        reviews: 1024,
        image: 'https://images.unsplash.com/photo-1618666012259-c55d57856a2b?w=400',
        category: 'Self-Help',
        description: 'Transform your life through the power of tiny changes.'
      },
      {
        id: 5,
        title: 'Hygge: The Danish Way',
        author: 'Meik Wiking',
        price: 289.20,
        originalPrice: 350.00,
        discount: 17,
        rating: 4.6,
        reviews: 342,
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',
        category: 'Self-Help',
        description: 'Discover the Danish secret to happiness and well-being.'
      },
      {
        id: 6,
        title: 'Fifty Shades Darker',
        author: 'E.L. James',
        price: 325.20,
        originalPrice: 400.00,
        discount: 19,
        rating: 4.3,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        category: 'Romance',
        description: 'The passionate sequel to the bestselling romance.'
      },
      {
        id: 7,
        title: 'The Two Towers',
        author: 'J.R.R. Tolkien',
        price: 425.20,
        originalPrice: 500.00,
        discount: 15,
        rating: 4.9,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400',
        category: 'Fantasy',
        description: 'The second part of the Lord of the Rings trilogy.'
      },
      {
        id: 8,
        title: 'Digital Fortress',
        author: 'Dan Brown',
        price: 190.00,
        originalPrice: 250.00,
        discount: 24,
        rating: 4.2,
        reviews: 345,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
        category: 'Technology',
        description: 'A thrilling techno-thriller from the author of The Da Vinci Code.'
      },
      {
        id: 9,
        title: 'Sapiens: A Brief History',
        author: 'Yuval Noah Harari',
        price: 350.00,
        originalPrice: 450.00,
        discount: 22,
        rating: 4.7,
        reviews: 789,
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400',
        category: 'History',
        description: 'A groundbreaking narrative of humanity\'s creation and evolution.'
      },
      {
        id: 10,
        title: 'The Art of War',
        author: 'Sun Tzu',
        price: 150.00,
        originalPrice: 200.00,
        discount: 25,
        rating: 4.8,
        reviews: 456,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        category: 'Business',
        description: 'Ancient wisdom on strategy and leadership.'
      }
    ]
    setBooks(allBooks)
    setFilteredBooks(allBooks)
    setLoading(false)
  }, [])

  useEffect(() => {
    let result = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort
    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default: // newest
        result.sort((a, b) => b.id - a.id)
    }

    setFilteredBooks(result)
  }, [searchTerm, selectedCategory, sortBy, priceRange, books])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setPriceRange([0, 1000])
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary-600">Collection</span>
          </h1>
          <p className="text-xl text-gray-600">Discover your next great read from our curated selection</p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {selectedCategory !== 'All' && (
                <span className="ml-1 text-xs bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCategory !== 'All' ? 1 : 0}
                </span>
              )}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="title">By Title</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Min</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <span className="text-gray-600">-</span>
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Max</label>
                        <input
                          type="number"
                          placeholder="1000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-primary-600 flex items-center space-x-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all filters</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-primary-600">{filteredBooks.length}</span> books
          </p>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
            }>
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-600">No books found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-4 gradient-btn px-6 py-2"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Books