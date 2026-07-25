import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart as ReLineChart,
  Line
} from 'recharts'

const AdminAnalytics = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [period, setPeriod] = useState('week')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.isAdmin) {
      navigate('/')
      return
    }

    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setOrders(savedOrders)
    setUsers(savedUsers)
    setLoading(false)
  }, [navigate])

  // Prepare data for charts
  const getMonthlyData = () => {
    const months = {}
    orders.forEach(order => {
      const date = new Date(order.date)
      const month = date.toLocaleString('default', { month: 'short' })
      if (!months[month]) months[month] = 0
      months[month] += order.total || 0
    })
    return Object.keys(months).map(key => ({
      name: key,
      revenue: months[key]
    }))
  }

  const getStatusData = () => {
    const statuses = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    }
    orders.forEach(order => {
      const status = order.orderStatus || 'pending'
      if (statuses[status] !== undefined) statuses[status]++
    })
    return Object.keys(statuses).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: statuses[key]
    }))
  }

  const getPaymentData = () => {
    const payments = {
      esewa: 0,
      stripe: 0,
      cod: 0
    }
    orders.forEach(order => {
      if (payments[order.paymentMethod] !== undefined) {
        payments[order.paymentMethod]++
      }
    })
    return Object.keys(payments).map(key => ({
      name: key.toUpperCase(),
      value: payments[key]
    }))
  }

  const getDailyRevenue = () => {
    const days = {}
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const key = d.toLocaleDateString('en-NP', { weekday: 'short' })
      days[key] = 0
    }
    orders.forEach(order => {
      const date = new Date(order.date)
      const key = date.toLocaleDateString('en-NP', { weekday: 'short' })
      if (days[key] !== undefined) {
        days[key] += order.total || 0
      }
    })
    return Object.keys(days).map(key => ({
      name: key,
      revenue: days[key]
    }))
  }

  const COLORS = ['#14b8a6', '#06b6d4', '#a855f7', '#ec4899', '#f59e0b', '#ef4444']

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const totalOrders = orders.length
  const totalUsers = users.length
  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0

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
            <h1 className="text-4xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-primary-600" />
              Analytics
            </h1>
            <p className="text-gray-600">Track your store performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { 
              title: 'Total Revenue', 
              value: `Rs. ${totalRevenue.toFixed(2)}`, 
              icon: DollarSign, 
              color: 'from-primary-400 to-cyan-500',
              change: '+12.5%'
            },
            { 
              title: 'Total Orders', 
              value: totalOrders, 
              icon: ShoppingBag, 
              color: 'from-secondary-400 to-pink-500',
              change: '+8.3%'
            },
            { 
              title: 'Total Users', 
              value: totalUsers, 
              icon: Users, 
              color: 'from-primary-400 to-cyan-500',
              change: '+15.7%'
            },
            { 
              title: 'Average Order', 
              value: `Rs. ${averageOrder.toFixed(2)}`, 
              icon: TrendingUp, 
              color: 'from-secondary-400 to-pink-500',
              change: '+3.2%'
            }
          ].map((stat, index) => (
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
                  <span className="text-xs text-green-600 font-semibold">{stat.change}</span>
                </div>
                <div className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-primary-600" />
              Daily Revenue
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ReLineChart data={getDailyRevenue()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `Rs. ${value.toFixed(2)}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#14b8a6" 
                  strokeWidth={2}
                  dot={{ fill: '#14b8a6' }}
                />
              </ReLineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
              Monthly Revenue
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getMonthlyData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `Rs. ${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Order Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary-600" />
              Order Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={getStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Payment Method Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-primary-600" />
              Payment Methods
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={getPaymentData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getPaymentData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics