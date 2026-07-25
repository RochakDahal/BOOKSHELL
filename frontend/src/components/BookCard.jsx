import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BookCard = ({ book }) => {
  const navigate = useNavigate()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    setIsAdding(true)
    
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if book already in cart
    const existingItem = cart.find(item => item.id === book.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...book, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Dispatch custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'))
    
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    if (isWishlisted) {
      const filtered = wishlist.filter(item => item.id !== book.id)
      localStorage.setItem('wishlist', JSON.stringify(filtered))
    } else {
      wishlist.push(book)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }

  const discount = book.discount || Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group cursor-pointer"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      {/* Book Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={book.image}
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-3 left-3 bg-linear-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
          >
            -{discount}%
          </motion.div>
        )}

        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-colors ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <motion.button
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold flex items-center space-x-2"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/books/${book.id}`)
            }}
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </motion.button>
        </motion.div>

        {/* Quick Add to Cart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-white text-primary-600 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{isAdding ? 'Adding...' : 'Quick Add'}</span>
          </button>
        </motion.div>
      </div>

      {/* Book Details */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(book.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({book.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              Rs. {book.price.toFixed(2)}
            </span>
            {book.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                Rs. {book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="w-full gradient-btn py-2.5 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default BookCard