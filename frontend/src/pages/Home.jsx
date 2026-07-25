import React from 'react'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-bookshell-50 to-accent-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="bg-linear-to-r from-bookshell-600 to-accent-600 bg-clip-text text-transparent">BOOKSHELL</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Premium Online Bookstore in Bhaktapur, Nepal
        </p>
        <div className="space-x-4">
          <a href="/books" className="gradient-btn inline-block">
            Browse Books
          </a>
          <a href="/contact" className="px-6 py-3 border-2 border-bookshell-600 text-bookshell-600 rounded-lg hover:bg-bookshell-50 transition-colors inline-block">
            Contact Us
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default Home