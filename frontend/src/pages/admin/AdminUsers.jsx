import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Trash2, 
  Shield, 
  User, 
  Mail,
  Calendar,
  UserCheck,
  UserX,
  Edit
} from 'lucide-react'

const AdminUsers = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.isAdmin) {
      navigate('/')
      return
    }

    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    if (savedUsers.length === 0) {
      // Seed sample users
      const sampleUsers = [
        {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@bookshell.com',
          gender: 'male',
          address: 'Bhaktapur, Nepal',
          role: 'admin',
          createdAt: '2026-01-01T00:00:00'
        },
        {
          id: 2,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          gender: 'male',
          address: 'Kathmandu, Nepal',
          role: 'user',
          createdAt: '2026-06-15T10:30:00'
        },
        {
          id: 3,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          gender: 'female',
          address: 'Lalitpur, Nepal',
          role: 'user',
          createdAt: '2026-07-01T14:20:00'
        },
        {
          id: 4,
          firstName: 'Rochak',
          lastName: 'Dahal',
          email: 'rochak@bookshell.com',
          gender: 'male',
          address: 'Bhaktapur, Nepal',
          role: 'user',
          createdAt: '2026-07-09T09:00:00'
        },
        {
          id: 5,
          firstName: 'Prashant',
          lastName: 'Karki',
          email: 'prashant@bookshell.com',
          gender: 'male',
          address: 'Kathmandu, Nepal',
          role: 'user',
          createdAt: '2026-07-09T09:15:00'
        }
      ]
      localStorage.setItem('users', JSON.stringify(sampleUsers))
      setUsers(sampleUsers)
      setFilteredUsers(sampleUsers)
    } else {
      setUsers(savedUsers)
      setFilteredUsers(savedUsers)
    }
    setLoading(false)
  }, [navigate])

  useEffect(() => {
    let result = users
    
    if (searchTerm) {
      result = result.filter(u => 
        u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (roleFilter !== 'All') {
      result = result.filter(u => u.role === roleFilter)
    }
    
    setFilteredUsers(result)
  }, [searchTerm, roleFilter, users])

  const deleteUser = (id) => {
    if (id === 1) {
      alert('Cannot delete admin user')
      return
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== id)
      setUsers(updatedUsers)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }
  }

  const toggleRole = (id) => {
    if (id === 1) {
      alert('Cannot change admin role')
      return
    }
    const updatedUsers = users.map(u => {
      if (u.id === id) {
        return { ...u, role: u.role === 'admin' ? 'user' : 'admin' }
      }
      return u
    })
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
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
              <Users className="w-8 h-8 mr-3 text-primary-600" />
              User Management
            </h1>
            <p className="text-gray-600">View and manage all registered users</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">{filteredUsers.length} users</span>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              >
                <option value="All">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 bg-gray-50 border-b">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-linear-to-br from-primary-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <p className="font-semibold">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-500">{user.address}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-sm">{user.gender}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? <Shield className="w-3 h-3 inline mr-1" /> : <User className="w-3 h-3 inline mr-1" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {user.id !== 1 && (
                            <>
                              <button
                                onClick={() => toggleRole(user.id)}
                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                title="Toggle Role"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {user.id === 1 && (
                            <span className="text-xs text-gray-400">Admin cannot be modified</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
            <p className="text-sm text-gray-500">Admins</p>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'admin').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
            <p className="text-sm text-gray-500">Regular Users</p>
            <p className="text-2xl font-bold text-primary-600">
              {users.filter(u => u.role === 'user').length}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminUsers