import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Users,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Package,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  BarChart3,
  Settings
} from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalBooks: 0,
    totalUsers: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.isAdmin) {
      navigate('/')
      return
    }

    // Load data from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const books = JSON.parse(localStorage.getItem('books') || '[]')
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
    const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length
    const deliveredOrders = orders.filter(o => o.orderStatus === 'delivered').length
    const cancelledOrders = orders.filter(o => o.orderStatus === 'cancelled').length

    setStats({
      totalOrders: orders.length,
      totalRevenue,
      totalBooks: books.length || 10,
      totalUsers: users.length || 5,
      pendingOrders,
      deliveredOrders,
      cancelledOrders
    })

    setRecentOrders(orders.slice(0, 5))
    setLoading(false)
  }, [navigate])

  const statCards = [
    {
      title: 'Total Revenue',
      value: `Rs. ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-primary-400 to-cyan-500',
      change: '+12%',
      changeType: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'from-secondary-400 to-pink-500',
      change: '+8%',
      changeType: 'up'
    },
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'from-primary-400 to-cyan-500',
      change: '+5%',
      changeType: 'up'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-secondary-400 to-pink-500',
      change: '+15%',
      changeType: 'up'
    }
  ]

  const statusBadge = (status) => {
    const statusMap = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'processing': { color: 'bg-blue-100 text-blue-800', icon: Package },
      'shipped': { color: 'bg-purple-100 text-purple-800', icon: Truck },
      'delivered': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    const s = statusMap[status] || statusMap['pending']
    return s
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <LayoutDashboard className="w-8 h-8 mr-3 text-primary-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your bookstore efficiently</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-semibold flex items-center ${
                      stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/orders')}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-all"
          >
            <ShoppingBag className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-semibold">Manage Orders</p>
            <p className="text-sm text-gray-500">{stats.pendingOrders} pending</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/books')}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-all"
          >
            <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-semibold">Manage Books</p>
            <p className="text-sm text-gray-500">{stats.totalBooks} books</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/users')}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-all"
          >
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-semibold">Manage Users</p>
            <p className="text-sm text-gray-500">{stats.totalUsers} users</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/contacts')}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-all"
          >
            <MessageSquare className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-semibold">Contact Messages</p>
            <p className="text-sm text-gray-500">View inquiries</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/analytics')}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-all"
          >
            <BarChart3 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-semibold">Analytics</p>
            <p className="text-sm text-gray-500">View reports</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/settings')}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition-all"
          >
            <Settings className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="font-semibold">Settings</p>
            <p className="text-sm text-gray-500">Configure shop</p>
          </motion.button>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button
              onClick={() => navigate('/admin/orders')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => {
                    const Status = statusBadge(order.orderStatus || 'pending')
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 font-medium text-primary-600">{order.id}</td>
                        <td className="py-3 text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                        </td>
                        <td className="py-3 font-semibold">Rs. {order.total?.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 w-fit ${Status.color}`}>
                            <Status.icon className="w-3 h-3" />
                            <span>{order.orderStatus || 'Pending'}</span>
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.paymentStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                            order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.paymentStatus || 'Pending'}
                          </span>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard