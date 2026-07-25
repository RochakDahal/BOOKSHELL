import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, Banknote, CheckCircle, Lock, Shield, ArrowLeft, Truck } from 'lucide-react'

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('esewa')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: 'Bhaktapur',
    phone: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (cart.length === 0) {
      navigate('/cart')
      return
    }
    setCartItems(cart)
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.firstName) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }))
    }
  }, [navigate])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity)
    }
    return sum
  }, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handlePayment = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)

    const order = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      subtotal,
      discount,
      shipping,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      orderStatus: 'pending',
      date: new Date().toISOString(),
      shippingAddress: formData
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      
      if (paymentMethod === 'esewa' || paymentMethod === 'stripe') {
        // Simulate payment success (80% success rate for demo)
        const success = Math.random() > 0.2
        if (success) {
          // Update order status to confirmed
          const updatedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
          const updatedOrder = updatedOrders.find(o => o.id === order.id)
          if (updatedOrder) {
            updatedOrder.paymentStatus = 'confirmed'
            updatedOrder.orderStatus = 'processing'
            localStorage.setItem('orders', JSON.stringify(updatedOrders))
          }
          localStorage.setItem('cart', '[]')
          window.dispatchEvent(new Event('cartUpdated'))
          navigate('/payment-success', { state: { order } })
        } else {
          // Update order status to failed
          const updatedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
          const updatedOrder = updatedOrders.find(o => o.id === order.id)
          if (updatedOrder) {
            updatedOrder.paymentStatus = 'failed'
            updatedOrder.orderStatus = 'cancelled'
            localStorage.setItem('orders', JSON.stringify(updatedOrders))
          }
          navigate('/payment-failed', { state: { order } })
        }
      } else {
        // COD - always success
        const updatedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
        const updatedOrder = updatedOrders.find(o => o.id === order.id)
        if (updatedOrder) {
          updatedOrder.paymentStatus = 'pending'
          updatedOrder.orderStatus = 'pending'
          localStorage.setItem('orders', JSON.stringify(updatedOrders))
        }
        localStorage.setItem('cart', '[]')
        window.dispatchEvent(new Event('cartUpdated'))
        navigate('/payment-success', { state: { order } })
      }
    }, 2000)
  }

  const paymentMethods = [
    { id: 'esewa', label: 'eSewa', icon: Smartphone, description: 'Mobile Wallet', color: 'from-primary-400 to-cyan-500' },
    { id: 'stripe', label: 'Stripe', icon: CreditCard, description: 'Card Payment', color: 'from-secondary-400 to-pink-500' },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, description: 'Pay on receipt', color: 'from-green-400 to-green-600' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate('/cart')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Cart
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input-field ${errors.firstName ? 'input-field-error' : ''}`}
                      required
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input-field ${errors.lastName ? 'input-field-error' : ''}`}
                      required
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`input-field ${errors.address ? 'input-field-error' : ''}`}
                    placeholder="Street address"
                    required
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'input-field-error' : ''}`}
                      placeholder="98XXXXXXXX"
                      required
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'input-field-error' : ''}`}
                    placeholder="email@example.com"
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Payment Method */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-primary-600" />
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <motion.label
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          paymentMethod === method.id 
                            ? `border-primary-500 bg-linear-to-br ${method.color} bg-opacity-10`
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-linear-to-br ${method.color} rounded-lg flex items-center justify-center`}>
                            <method.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold">{method.label}</p>
                            <p className="text-xs text-gray-500">{method.description}</p>
                          </div>
                        </div>
                        {paymentMethod === method.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.label>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full gradient-btn py-4 flex items-center justify-center space-x-2 mt-6"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Place Order - Rs. {total.toFixed(2)}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Truck className="w-6 h-6 mr-2 text-primary-600" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-primary-600 font-bold text-sm">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-Rs. {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `Rs. ${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-primary-600">Free shipping on orders over Rs. 500</p>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-primary-600">Rs. {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <p className="text-xs text-gray-600">Your payment is secure with 256-bit encryption</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout