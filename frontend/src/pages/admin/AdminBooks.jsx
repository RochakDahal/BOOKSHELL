import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Star,
  Eye
} from 'lucide-react'

const AdminBooks = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const categories = ['All', 'Fiction', 'Fantasy', 'Self-Help', 'Business', 'Science', 'History', 'Romance', 'Technology', 'Biography']

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.isAdmin) {
      navigate('/')
      return
    }

    const savedBooks = JSON.parse(localStorage.getItem('books') || '[]')
    if (savedBooks.length === 0) {
      // Seed sample books
      const sampleBooks = [
        {
          id: 1,
          title: 'Atomic Habits',
          author: 'James Clear',
          price: 203.00,
          originalPrice: 350.00,
          discount: 42,
          rating: 4.6,
          reviews: 1284,
          category: 'Self-Help',
          image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400',
          description: 'Transform your life through tiny changes.',
          stock: 25,
          isbn: '978-0735211292',
          publisher: 'Avery',
          pages: 320,
          language: 'English'
        },
        {
          id: 2,
          title: 'The World Versus Everything Beyond',
          author: 'Like & Michael Cahn',
          price: 250.20,
          originalPrice: 350.00,
          discount: 28,
          rating: 4.5,
          reviews: 128,
          category: 'Fiction',
          image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
          description: 'A gripping tale of adventure.',
          stock: 15,
          isbn: '978-1234567890',
          publisher: 'Penguin',
          pages: 280,
          language: 'English'
        },
        {
          id: 3,
          title: 'Twilight Fortress',
          author: 'Oregory Barrett',
          price: 190.99,
          originalPrice: 250.00,
          discount: 24,
          rating: 4.8,
          reviews: 256,
          category: 'Fantasy',
          image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
          description: 'An epic fantasy adventure.',
          stock: 20,
          isbn: '978-0987654321',
          publisher: 'HarperCollins',
          pages: 350,
          language: 'English'
        }
      ]
      localStorage.setItem('books', JSON.stringify(sampleBooks))
      setBooks(sampleBooks)
      setFilteredBooks(sampleBooks)
    } else {
      setBooks(savedBooks)
      setFilteredBooks(savedBooks)
    }
    setLoading(false)
  }, [navigate])

  useEffect(() => {
    let result = books
    
    if (searchTerm) {
      result = result.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (categoryFilter !== 'All') {
      result = result.filter(b => b.category === categoryFilter)
    }
    
    setFilteredBooks(result)
  }, [searchTerm, categoryFilter, books])

  const deleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const updatedBooks = books.filter(b => b.id !== id)
      setBooks(updatedBooks)
      localStorage.setItem('books', JSON.stringify(updatedBooks))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center text-gray-600 hover:text-primary-600 mb-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Manage Books</h1>
            <p className="text-gray-600">Add, edit, or remove books from inventory</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="gradient-btn flex items-center space-x-2 px-6 py-3"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Book</span>
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Books Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                {book.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{book.discount}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold ml-1">{book.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary-600">Rs. {book.price.toFixed(2)}</span>
                    {book.originalPrice > book.price && (
                      <span className="text-xs text-gray-400 line-through ml-2">Rs. {book.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">Stock: {book.stock}</span>
                </div>
                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setEditingBook(book)
                      setShowAddModal(true)
                    }}
                    className="flex-1 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingBook(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    defaultValue={editingBook?.title || ''}
                    className="input-field"
                    placeholder="Book title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                  <input
                    type="text"
                    defaultValue={editingBook?.author || ''}
                    className="input-field"
                    placeholder="Author name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  defaultValue={editingBook?.description || ''}
                  rows="3"
                  className="input-field"
                  placeholder="Book description"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingBook?.price || ''}
                    className="input-field"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={editingBook?.originalPrice || ''}
                    className="input-field"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input
                    type="number"
                    defaultValue={editingBook?.stock || ''}
                    className="input-field"
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    defaultValue={editingBook?.category || 'Fiction'}
                    className="input-field"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="url"
                    defaultValue={editingBook?.image || ''}
                    className="input-field"
                    placeholder="https://example.com/book.jpg"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="gradient-btn px-8 py-2"
                >
                  {editingBook ? 'Update Book' : 'Add Book'}
                </motion.button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingBook(null)
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

// Import missing component
import { XCircle } from 'lucide-react'

export default AdminBooks