import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Star, TrendingUp, Clock, ArrowRight, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BookCard from '../components/BookCard'

const Home = () => {
  const navigate = useNavigate()
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Sample featured books data
    const books = [
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
        category: 'Fiction'
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
        category: 'Fantasy'
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
        category: 'Self-Help'
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
        category: 'Self-Help'
      }
    ]
    setFeaturedBooks(books)
    setLoading(false)
  }, [])

  const stats = [
    { icon: Award, value: '25K+', label: 'Awards Won', color: 'from-primary-400 to-cyan-500' },
    { icon: Users, value: '1M+', label: 'Active Readers', color: 'from-secondary-400 to-pink-500' },
    { icon: BookOpen, value: '100K+', label: 'Books Available', color: 'from-primary-400 to-cyan-500' },
    { icon: Star, value: '4.9', label: 'Average Rating', color: 'from-secondary-400 to-pink-500' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              >
                Mindful{' '}
                <span className="text-cyan-200">Reading</span>{' '}
                Experience
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-primary-100 mb-8 leading-relaxed"
              >
                Curated knowledge journeys that challenge perceptions and inspire growth. 
                Discover transformative content crafted for the modern intellect.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/books')}
                  className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center"
                >
                  Explore Books
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/about')}
                  className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 bg-linear-to-br from-secondary-500 to-pink-500 rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600" 
                  alt="Featured Book" 
                  className="rounded-lg shadow-xl w-full h-80 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white px-6 py-3 rounded-lg shadow-lg">
                  <p className="font-bold text-lg">Since 2015</p>
                  <p className="text-sm">Pioneering Digital Literature</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-linear-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
              >
                <div className={`w-16 h-16 bg-linear-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bookseller <span className="text-primary-600">Favorites</span>
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-primary-500 to-cyan-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 text-lg">Handpicked selections from our expert curators</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/books')}
              className="gradient-btn px-8 py-3 text-lg flex items-center mx-auto"
            >
              View All Books
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-linear-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Redefining <span className="text-cyan-400">Storytelling</span>
            </h2>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto">
              We've transformed traditional publishing into a dynamic digital ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Fast Delivery', desc: 'Get your books delivered within 24 hours in Kathmandu Valley' },
              { icon: Award, title: 'Best Prices', desc: 'Competitive pricing with regular discounts and offers' },
              { icon: Users, title: '24/7 Support', desc: 'Round the clock customer support for all your queries' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300"
              >
                <item.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-primary-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home