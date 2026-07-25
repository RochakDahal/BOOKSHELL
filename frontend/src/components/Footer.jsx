import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', color: 'hover:bg-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
  ]

  return (
    <footer className="bg-linear-to-br from-bookshell-900 to-bookshell-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-bookshell-400 to-accent-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold">BOOKSHELL</span>
            </div>
            <p className="text-bookshell-200 mb-4">
              Your trusted online bookstore in Bhaktapur, Nepal. Discover thousands of books at your fingertips.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Books', 'Contact', 'About Us'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => navigate(`/${item.toLowerCase().replace(' ', '-')}`)}
                    className="text-bookshell-200 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-bookshell-400 mt-0.5" />
                <span className="text-bookshell-200">Bhaktapur, Nepal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-bookshell-400" />
                <span className="text-bookshell-200">9745969254</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-bookshell-400" />
                <span className="text-bookshell-200">info@bookshell.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-bookshell-200">
              <li className="flex justify-between">
                <span>Sun - Fri:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-bookshell-700 mt-8 pt-8 text-center">
          <p className="text-bookshell-200">
            © {new Date().getFullYear()} BOOKSHELL. All rights reserved. | Designed with ❤️ in Bhaktapur
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer