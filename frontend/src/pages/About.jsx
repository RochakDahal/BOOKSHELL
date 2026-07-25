import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Award, Users, BookOpen, Target, MapPin, Mail, Phone } from 'lucide-react'

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      social: { facebook: '#', twitter: '#', instagram: '#' }
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      social: { facebook: '#', twitter: '#', instagram: '#' }
    },
    {
      name: 'Emma Williams',
      role: 'Head Editor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      social: { facebook: '#', twitter: '#', instagram: '#' }
    }
  ]

  const stats = [
    { icon: BookOpen, value: '50K+', label: 'Titles', color: 'from-primary-400 to-cyan-500' },
    { icon: Users, value: '1.2M', label: 'Readers', color: 'from-secondary-400 to-pink-500' },
    { icon: Award, value: '240+', label: 'Topics', color: 'from-primary-400 to-cyan-500' },
    { icon: Target, value: '10+', label: 'Years', color: 'from-secondary-400 to-pink-500' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4"
          >
            About BOOKSHELL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-primary-100 max-w-2xl mx-auto"
          >
            Redefining Storytelling - We've transformed traditional publishing into a dynamic digital ecosystem
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
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

      {/* Location & Contact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6 text-primary-500" />
                <span className="text-gray-600">Bhaktapur, Nepal</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-primary-500" />
                <span className="text-gray-600">9745969254</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-primary-500" />
                <span className="text-gray-600">info@bookshell.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-primary-50 to-cyan-50 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                Create a global network of book lovers where knowledge flows freely and stories transcend boundaries. We envision a world where every reader finds their perfect book.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-secondary-50 to-pink-50 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Empower creators and inspire readers by providing a seamless platform for discovering, purchasing, and sharing books. We are committed to making literature accessible to all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-linear-to-br from-primary-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">The passionate people behind BOOKSHELL</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={member.social.facebook} className="w-10 h-10 bg-linear-to-br from-primary-400 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 bg-linear-to-br from-secondary-400 to-pink-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={member.social.instagram} className="w-10 h-10 bg-linear-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Since 2015 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-primary-600 to-cyan-600 rounded-3xl p-12 text-white text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Since 2015</h2>
            <p className="text-xl text-primary-100">Pioneering Digital Literature in Nepal</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About