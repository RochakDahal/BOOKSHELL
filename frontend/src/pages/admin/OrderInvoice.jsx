import React from 'react'
import { motion } from 'framer-motion'

const OrderInvoice = ({ order }) => {
  if (!order) return null

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
      {/* Invoice Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-linear-to-br from-primary-400 to-cyan-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent">
                BOOKSHELL
              </span>
            </div>
            <p className="text-gray-600 text-sm">Bhaktapur, Nepal</p>
            <p className="text-gray-600 text-sm">📞 9745969254</p>
            <p className="text-gray-600 text-sm">✉️ info@bookshell.com</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
            <p className="text-gray-600 text-sm">Order #{order.id}</p>
            <p className="text-gray-600 text-sm">
              Date: {new Date(order.date).toLocaleDateString('en-NP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Bill To:</h3>
          <p className="font-medium">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
          <p className="text-gray-600 text-sm">{order.shippingAddress?.address}</p>
          <p className="text-gray-600 text-sm">{order.shippingAddress?.city}</p>
          <p className="text-gray-600 text-sm">📞 {order.shippingAddress?.phone}</p>
          <p className="text-gray-600 text-sm">✉️ {order.shippingAddress?.email}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-gray-700 mb-1">Payment Details:</h3>
          <p className="text-gray-600 text-sm">Method: <span className="font-medium capitalize">{order.paymentMethod}</span></p>
          <p className="text-gray-600 text-sm">Status: <span className={`font-medium ${
            order.paymentStatus === 'confirmed' ? 'text-green-600' :
            order.paymentStatus === 'failed' ? 'text-red-600' :
            'text-yellow-600'
          }`}>{order.paymentStatus || 'Pending'}</span></p>
          <p className="text-gray-600 text-sm">Order Status: <span className="font-medium capitalize">{order.orderStatus}</span></p>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Book</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">Qty</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-right">Price</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-right">Discount</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.title} className="w-12 h-16 object-cover rounded" />
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-sm text-right">Rs. {item.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">
                  {item.originalPrice ? `-Rs. ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}` : '-'}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-right">Rs. {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300">
              <td colSpan="5" className="px-4 py-3 text-right font-medium">Subtotal</td>
              <td className="px-4 py-3 text-right">Rs. {order.subtotal?.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="5" className="px-4 py-3 text-right font-medium text-green-600">Discount</td>
              <td className="px-4 py-3 text-right text-green-600">-Rs. {order.discount?.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="5" className="px-4 py-3 text-right font-medium">Shipping</td>
              <td className="px-4 py-3 text-right">{order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping?.toFixed(2)}`}</td>
            </tr>
            <tr className="border-t-2 border-gray-300">
              <td colSpan="5" className="px-4 py-3 text-right font-bold text-lg">Total</td>
              <td className="px-4 py-3 text-right font-bold text-lg text-primary-600">Rs. {order.total?.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        <p>Thank you for shopping with BOOKSHELL!</p>
        <p className="mt-1">Visit us at: Bhaktapur, Nepal | 📞 9745969254 | ✉️ info@bookshell.com</p>
        <p className="mt-1">© {new Date().getFullYear()} BOOKSHELL. All rights reserved.</p>
      </div>
    </div>
  )
}

export default OrderInvoice