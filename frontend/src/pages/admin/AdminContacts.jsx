import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Mail, 
  CheckCircle, 
  Clock,
  Search,
  Eye,
  Reply,
  Trash2
} from 'lucide-react'

const AdminContacts = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.isAdmin) {
      navigate('/')
      return
    }

    const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]')
    if (savedContacts.length === 0) {
      const sampleContacts = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '9841234567',
          subject: 'Book Inquiry',
          message: 'Do you have any books on Nepali history?',
          status: 'unread',
          date: '2026-07-20T10:30:00'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '9847654321',
          subject: 'Order Issue',
          message: 'I haven\'t received my order yet. Order #ORD-12345',
          status: 'read',
          date: '2026-07-18T14:20:00'
        }
      ]
      localStorage.setItem('contacts', JSON.stringify(sampleContacts))
      setContacts(sampleContacts)
      setFilteredContacts(sampleContacts)
    } else {
      setContacts(savedContacts)
      setFilteredContacts(savedContacts)
    }
    setLoading(false)
  }, [navigate])

  useEffect(() => {
    let result = contacts
    
    if (searchTerm) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (statusFilter !== 'All') {
      result = result.filter(c => c.status === statusFilter)
    }
    
    setFilteredContacts(result)
  }, [searchTerm, statusFilter, contacts])

  const updateStatus = (id, newStatus) => {
    const updatedContacts = contacts.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus }
      }
      return c
    })
    setContacts(updatedContacts)
    localStorage.setItem('contacts', JSON.stringify(updatedContacts))
  }

  const deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updatedContacts = contacts.filter(c => c.id !== id)
      setContacts(updatedContacts)
      localStorage.setItem('contacts', JSON.stringify(updatedContacts))
      if (selectedContact?.id === id) setSelectedContact(null)
    }
  }

  const statuses = ['All', 'unread', 'read', 'replied']

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
              <Mail className="w-8 h-8 mr-3 text-primary-600" />
              Contact Messages
            </h1>
            <p className="text-gray-600">View and manage customer inquiries</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">{filteredContacts.length} messages</span>
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
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Contacts List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No messages found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredContacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedContact?.id === contact.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            contact.status === 'unread' ? 'bg-red-100 text-red-800' :
                            contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {contact.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{contact.subject}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{contact.message}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          <span>{contact.email}</span>
                          <span>{contact.phone}</span>
                          <span>{new Date(contact.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (contact.status === 'unread') updateStatus(contact.id, 'read')
                          }}
                          className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteContact(contact.id)
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Contact Detail */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6"
          >
            {selectedContact ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-semibold">{selectedContact.name}</p>
                    <p className="text-sm text-gray-600">{selectedContact.email}</p>
                    <p className="text-sm text-gray-600">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-semibold">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Message</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedContact.message}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                      className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => window.open(`mailto:${selectedContact.email}`)}
                      className="w-full gradient-btn py-2 flex items-center justify-center space-x-2"
                    >
                      <Reply className="w-4 h-4" />
                      <span>Reply via Email</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a message to view details</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Import missing component
import { XCircle } from 'lucide-react'

export default AdminContacts