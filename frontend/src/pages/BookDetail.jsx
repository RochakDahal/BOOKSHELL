import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, Shield, RotateCcw, MessageSquare, User, Calendar, CheckCircle, X } from 'lucide-react'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Rochak S.', rating: 5, comment: 'Amazing book! Highly recommended.', date: '2026-07-20', helpful: 12 },
    { id: 2, user: 'Prashant K.', rating: 4, comment: 'Great content, well written.', date: '2026-07-18', helpful: 8 },
    { id: 3, user: 'Kailash M.', rating: 5, comment: 'One of the best books I have read this year.', date: '2026-07-15', helpful: 15 }
  ])
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })

  const book = {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 203.00,
    originalPrice: 350.00,
    discount: 42,
    rating: 4.6,
    reviews: 1284,
    category: 'Self-Help',
    description: 'Transform your life through the power of tiny, consistent changes. Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits.',
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'
    ],
    stock: 25,
    isbn: '978-0735211292',
    publisher: 'Avery',
    pages: 320,
    language: 'English',
    publishedDate: '2018-10-16'
  }

  useEffect(() => {
    // Check if book is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setIsWishlisted(wishlist.some(item => item.id === parseInt(id)))
    setLoading(false)
  }, [id])

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item.id === book.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...book, quantity })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    alert(`Added ${quantity} item(s) to cart!`)
  }

  const handleWishlist = () => {
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

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (!user.firstName) {
      alert('Please login to submit a review')
      navigate('/login')
      return
    }

    const review = {
      id: reviews.length + 1,
      user: `${user.firstName} ${user.lastName}`,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    }
    
    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: '' })
    setShowReviewForm(false)
    alert('Review submitted successfully!')
  }

  const discount = book.discount || Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)

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
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Books
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Book Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <img
                src={book.images[selectedImage]}
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {book.images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary-500 shadow-lg' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-24 object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  {book.category}
                </span>
                {discount > 0 && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-semibold">
                    -{discount}% OFF
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(book.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {book.rating} ({book.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary-600">
                  Rs. {book.price.toFixed(2)}
                </span>
                {book.originalPrice > book.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      Rs. {book.originalPrice.toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{book.description}</p>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                  <span className="text-sm text-gray-500">({book.stock} in stock)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 gradient-btn py-3 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlist}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">7 Days Return</p>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="font-bold text-lg mb-4">Book Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ISBN:</span>
                  <span className="font-medium">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Publisher:</span>
                  <span className="font-medium">{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pages:</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{book.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Published:</span>
                  <span className="font-medium">{book.publishedDate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="w-8 h-8 mr-3 text-primary-600" />
              Customer Reviews ({reviews.length})
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="gradient-btn px-6 py-2"
            >
              Write a Review
            </motion.button>
          </div>

          {/* Add Review Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-xl p-6 mb-8 overflow-hidden"
              >
                <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= newReview.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="Share your thoughts about this book..."
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="gradient-btn px-6 py-2"
                    >
                      Submit Review
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-br from-primary-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.user}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 ml-13">{review.comment}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-2 text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Import missing components
import { Minus, Plus, ThumbsUp } from 'lucide-react'