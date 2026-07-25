import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Activity, 
  Search, 
  Filter, 
  Calendar,
  User,
  Clock,
  Eye,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const AdminActivityLogs = () => {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [stats, setStats] = useState({ totalLogs: 0 })
  const itemsPerPage = 20

  const actionTypes = [
    'All',
    'login',
    'logout',
    'register',
    'view_book',
    'add_to_cart',
    'remove_from_cart',
    'create_order',
    'update_order_status',
    'add_review',
    'update_profile',
    'admin_login',
    'admin_action'
  ]

  const getActionColor = (action) => {
    const colors = {
      'login': 'bg-green-100 text-green-800',
      'logout': 'bg-gray-100 text-gray-800',
      'register': 'bg-blue-100 text-blue-800',
      'view_book': 'bg-purple-100 text-purple-800',
      'add_to_cart': 'bg-amber-100 text-amber-800',
      'remove_from_cart': 'bg-red-100 text-red-800',
      'create_order': 'bg-teal-100 text-teal-800',
      'update_order_status': 'bg-indigo-100 text-indigo-800',
      'add_review': 'bg-pink-100 text-pink-800',
      'update_profile': 'bg-cyan-100 text-cyan-800',
      'admin_login': 'bg-violet-100 text-violet-800',
      'admin_action': 'bg-rose-100 text-rose-800'
    }
    return colors[action] || 'bg-gray-100 text-gray-800'
  }

  const getActionIcon = (action) => {
    const icons = {
      'login': '🔐',
      'logout': '🚪',
      'register': '📝',
      'view_book': '📖',
      'add_to_cart': '🛒',
      'remove_from_cart': '🗑️',
      'create_order': '📦',
      'update_order_status': '🔄',
      'add_review': '⭐',
      'update_profile': '👤',
      'admin_login': '🛡️',
      'admin_action': '⚡'
    }
    return icons[action] || '📌'
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.isAdmin) {
      navigate('/')
      return
    }

    // Generate sample activity logs
    const generateSampleLogs = () => {
      const actions = [
        'login', 'logout', 'register', 'view_book', 'add_to_cart',
        'create_order', 'update_order_status', 'add_review', 'admin_login'
      ]
      const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
        { id: 3, firstName: 'Rochak', lastName: 'Shrestha', email: 'rochak@bookshell.com' },
        { id: 4, firstName: 'Prashant', lastName: 'Karki', email: 'prashant@bookshell.com' },
        { id: 5, firstName: 'Admin', lastName: 'User', email: 'admin@bookshell.com' }
      ]
      const books = ['Atomic Habits', 'The World Versus Everything Beyond', 'Twilight Fortress', 'Mind Blown']

      const logs = []
      for (let i = 0; i < 50; i++) {
        const user = users[Math.floor(Math.random() * users.length)]
        const action = actions[Math.floor(Math.random() * actions.length)]
        const date = new Date()
        date.setHours(date.getHours() - Math.floor(Math.random() * 48))
        
        const details = {}
        if (action === 'view_book' || action === 'add_to_cart') {
          details.bookTitle = books[Math.floor(Math.random() * books.length)]
        }
        if (action === 'create_order') {
          details.orderId = `ORD-${Date.now() - Math.floor(Math.random() * 1000000)}`
          details.amount = (Math.random() * 500 + 100).toFixed(2)
        }
        if (action === 'add_review') {
          details.bookTitle = books[Math.floor(Math.random() * books.length)]
          details.rating = Math.floor(Math.random() * 5) + 1
        }
        if (action === 'update_order_status') {
          details.orderId = `ORD-${Date.now() - Math.floor(Math.random() * 1000000)}`
          details.newStatus = ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)]
        }

        logs.push({
          id: i + 1,
          user,
          action,
          details,
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          createdAt: date.toISOString()
        })
      }
      
      // Sort by date descending
      logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return logs
    }

    const sampleLogs = generateSampleLogs()
    setLogs(sampleLogs)
    setFilteredLogs(sampleLogs.slice(0, itemsPerPage))
    setTotalPages(Math.ceil(sampleLogs.length / itemsPerPage))
    setStats({ totalLogs: sampleLogs.length })
    setLoading(false)
  }, [navigate])

  useEffect(() => {
    let result = logs
    
    if (searchTerm) {
      result = result.filter(log => 
        log.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.details?.bookTitle && log.details.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    if (actionFilter !== 'All') {
      result = result.filter(log => log.action === actionFilter)
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage
    setFilteredLogs(result.slice(startIndex, startIndex + itemsPerPage))
    setTotalPages(Math.ceil(result.length / itemsPerPage))
  }, [searchTerm, actionFilter, currentPage, logs])

  const refreshLogs = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 flex-wrap gap-4"
        >
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 mb-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center">
              <Activity className="w-8 h-8 mr-3 text-primary-600" />
              Activity Logs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Track all user activities on the platform</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">{stats.totalLogs} total logs</span>
            <button
              onClick={refreshLogs}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Export</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Activities</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLogs}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
            <p className="text-2xl font-bold text-primary-600">
              {logs.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
            <p className="text-2xl font-bold text-secondary-600">
              {logs.filter(l => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return new Date(l.createdAt) > weekAgo
              }).length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Unique Users</p>
            <p className="text-2xl font-bold text-cyan-600">
              {new Set(logs.map(l => l.user.id)).size}
            </p>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by user or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-gray-700 dark:text-white"
              >
                {actionTypes.map(action => (
                  <option key={action} value={action}>
                    {action === 'All' ? 'All Actions' : action.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No activity logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">Details</th>
                    <th className="px-6 py-4">IP</th>
                    <th className="px-6 py-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-linear-to-br from-primary-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {log.user.firstName[0]}{log.user.lastName[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                              {log.user.firstName} {log.user.lastName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{log.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                          {getActionIcon(log.action)} {log.action.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {log.details?.bookTitle && (
                            <p>📖 {log.details.bookTitle}</p>
                          )}
                          {log.details?.orderId && (
                            <p>📦 {log.details.orderId}</p>
                          )}
                          {log.details?.amount && (
                            <p>💰 Rs. {log.details.amount}</p>
                          )}
                          {log.details?.rating && (
                            <p>⭐ {log.details.rating}/5</p>
                          )}
                          {log.details?.newStatus && (
                            <p>➡️ {log.details.newStatus}</p>
                          )}
                          {!log.details?.bookTitle && !log.details?.orderId && (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{log.ip}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(log.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length}
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminActivityLogs