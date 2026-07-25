import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Bell,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react'

const AdminSettings = () => {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    shopName: 'BOOKSHELL',
    address: 'Bhaktapur, Nepal',
    phone: '9745969254',
    email: 'info@bookshell.com',
    businessHours: {
      weekdays: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    shipping: {
      freeThreshold: 500,
      standardRate: 50,
      deliveryDays: '2-3'
    },
    notifications: {
      orderConfirmation: true,
      paymentConfirmation: true,
      shippingUpdate: true
    }
  })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.isAdmin) {
      navigate('/')
      return
    }

    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem('shopSettings'))
    if (savedSettings) {
      setSettings(savedSettings)
    }
    setLoading(false)
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleNestedChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    localStorage.setItem('shopSettings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Settings className="w-8 h-8 mr-3 text-primary-600" />
              Shop Settings
            </h1>
            <p className="text-gray-600">Configure your bookstore settings</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="gradient-btn flex items-center space-x-2 px-6 py-3"
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </motion.button>
        </motion.div>

        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6"
          >
            Settings saved successfully!
          </motion.div>
        )}

        {/* Settings Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Shop Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary-600" />
              Shop Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  value={settings.shopName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary-600" />
              Business Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weekdays</label>
                <input
                  type="text"
                  value={settings.businessHours.weekdays}
                  onChange={(e) => handleNestedChange('businessHours', 'weekdays', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Saturday</label>
                <input
                  type="text"
                  value={settings.businessHours.saturday}
                  onChange={(e) => handleNestedChange('businessHours', 'saturday', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sunday</label>
                <input
                  type="text"
                  value={settings.businessHours.sunday}
                  onChange={(e) => handleNestedChange('businessHours', 'sunday', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary-600" />
              Shipping Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold (Rs.)</label>
                <input
                  type="number"
                  value={settings.shipping.freeThreshold}
                  onChange={(e) => handleNestedChange('shipping', 'freeThreshold', Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping Rate (Rs.)</label>
                <input
                  type="number"
                  value={settings.shipping.standardRate}
                  onChange={(e) => handleNestedChange('shipping', 'standardRate', Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Days</label>
                <input
                  type="text"
                  value={settings.shipping.deliveryDays}
                  onChange={(e) => handleNestedChange('shipping', 'deliveryDays', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-primary-600" />
              Notification Settings
            </h2>
            <div className="space-y-3">
              {[
                { key: 'orderConfirmation', label: 'Order Confirmation Email' },
                { key: 'paymentConfirmation', label: 'Payment Confirmation Email' },
                { key: 'shippingUpdate', label: 'Shipping Update Email' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications[item.key]}
                      onChange={(e) => handleNestedChange('notifications', item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminSettings