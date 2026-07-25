import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, Menu, X, User, LogOut, Home, BookOpen, Phone, Package, LayoutDashboard } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)

    // Update cart count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    setCartCount(count)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Books', path: '/books', icon: BookOpen },
    { name: 'About', path: '/about', icon: User },
    { name: 'Contact', path: '/contact', icon: Phone },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-linear-to-br from-primary-400 to-cyan-500 rounded-lg flex items-center justify-center mr-2 shadow-md">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent">
              BOOKSHELL
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium ${
                  isActive(link.path) ? 'text-primary-600' : ''
                }`}
              >
                <span className="flex items-center space-x-1">
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-primary-500 to-cyan-500"
                  />
                )}
              </Link>
            ))}

            {/* My Orders - Only when logged in */}
            {user && (
              <Link
                to="/my-orders"
                className={`relative text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium ${
                  isActive('/my-orders') ? 'text-primary-600' : ''
                }`}
              >
                <span className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </span>
              </Link>
            )}

            {/* Admin - Only when logged in as admin */}
            {user && user.isAdmin && (
              <Link
                to="/admin"
                className={`relative text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium ${
                  location.pathname.startsWith('/admin') ? 'text-primary-600' : ''
                }`}
              >
                <span className="flex items-center space-x-1">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Admin</span>
                </span>
              </Link>
            )}

            {/* Icons */}
            <div className="flex items-center space-x-4 ml-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/wishlist')}
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/cart')}
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {user ? (
                <div className="flex items-center space-x-3 ml-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-linear-to-br from-primary-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium hidden lg:block">
                      {user.firstName}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/register')}
                    className="gradient-btn py-2 px-4 text-sm"
                  >
                    Register
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <link.icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </span>
                </Link>
              ))}

              {user && (
                <Link
                  to="/my-orders"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </span>
                </Link>
              )}

              {/* Admin - Mobile */}
              {user && user.isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname.startsWith('/admin')
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Admin</span>
                  </span>
                </Link>
              )}

              <div className="border-t pt-3 mt-3 space-y-2">
                <Link
                  to="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                {!user && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 gradient-btn text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar