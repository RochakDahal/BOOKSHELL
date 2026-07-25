import React from 'react'

export const OrderConfirmationEmail = ({ order }) => {
  if (!order) return null

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'linear-gradient(135deg, #14b8a6, #06b6d4)', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '10px 10px 0 0' }}>
        <h1 style={{ margin: 0 }}>📚 BOOKSHELL</h1>
        <p style={{ margin: '5px 0 0', opacity: 0.9 }}>Bhaktapur, Nepal</p>
      </div>
      
      <div style={{ padding: '30px', background: '#fff', border: '1px solid #eee' }}>
        <h2 style={{ marginTop: 0 }}>Order Confirmation</h2>
        <p>Dear <strong>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</strong>,</p>
        <p>Thank you for your order! We're pleased to confirm your purchase.</p>
        
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '15px 0' }}>
          <p style={{ margin: '5px 0' }}><strong>Order ID:</strong> {order.id}</p>
          <p style={{ margin: '5px 0' }}><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
          <p style={{ margin: '5px 0' }}><strong>Payment Method:</strong> {order.paymentMethod?.toUpperCase()}</p>
          <p style={{ margin: '5px 0' }}><strong>Total:</strong> Rs. {order.total?.toFixed(2)}</p>
        </div>

        <h3>Order Items</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Book</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Price</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>
                  <strong>{item.title}</strong><br />
                  <small style={{ color: '#666' }}>{item.author}</small>
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>Rs. {item.price.toFixed(2)}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>Rs. {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ padding: '10px', textAlign: 'right' }}><strong>Total</strong></td>
              <td style={{ padding: '10px', textAlign: 'right', color: '#0d9488', fontWeight: 'bold' }}>
                Rs. {order.total?.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '15px 0', textAlign: 'center' }}>
          <p style={{ margin: '5px 0' }}><strong>BOOKSHELL</strong></p>
          <p style={{ margin: '5px 0' }}>📍 Bhaktapur, Nepal</p>
          <p style={{ margin: '5px 0' }}>📞 9745969254 | ✉️ info@bookshell.com</p>
        </div>

        <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          If you have any questions, please contact us at <a href="mailto:info@bookshell.com" style={{ color: '#0d9488' }}>info@bookshell.com</a> or call 9745969254.
        </p>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '20px', textAlign: 'center', borderRadius: '0 0 10px 10px', color: '#666', fontSize: '12px' }}>
        <p>© {new Date().getFullYear()} BOOKSHELL. All rights reserved.</p>
        <p>Thank you for shopping with us!</p>
      </div>
    </div>
  )
}

export const PaymentConfirmationEmail = ({ order }) => {
  if (!order) return null

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '10px 10px 0 0' }}>
        <h1 style={{ margin: 0 }}>✅ Payment Confirmed</h1>
        <p style={{ margin: '5px 0 0', opacity: 0.9 }}>BOOKSHELL</p>
      </div>
      
      <div style={{ padding: '30px', background: '#fff', border: '1px solid #eee' }}>
        <h2 style={{ marginTop: 0 }}>Payment Successful!</h2>
        <p>Dear <strong>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</strong>,</p>
        <p>We have received your payment for order <strong>#{order.id}</strong>.</p>
        
        <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '8px', margin: '15px 0' }}>
          <p style={{ margin: '5px 0' }}><strong>Payment Method:</strong> {order.paymentMethod?.toUpperCase()}</p>
          <p style={{ margin: '5px 0' }}><strong>Amount Paid:</strong> Rs. {order.total?.toFixed(2)}</p>
          <p style={{ margin: '5px 0' }}><strong>Payment Status:</strong> ✅ Confirmed</p>
        </div>

        <p>Your order is now being processed and will be shipped soon.</p>

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '15px 0', textAlign: 'center' }}>
          <p style={{ margin: '5px 0' }}><strong>BOOKSHELL</strong></p>
          <p style={{ margin: '5px 0' }}>📍 Bhaktapur, Nepal</p>
          <p style={{ margin: '5px 0' }}>📞 9745969254 | ✉️ info@bookshell.com</p>
        </div>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '20px', textAlign: 'center', borderRadius: '0 0 10px 10px', color: '#666', fontSize: '12px' }}>
        <p>© {new Date().getFullYear()} BOOKSHELL. All rights reserved.</p>
      </div>
    </div>
  )
}

export const ShippingUpdateEmail = ({ order }) => {
  if (!order) return null

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '10px 10px 0 0' }}>
        <h1 style={{ margin: 0 }}>📦 Order Shipped</h1>
        <p style={{ margin: '5px 0 0', opacity: 0.9 }}>BOOKSHELL</p>
      </div>
      
      <div style={{ padding: '30px', background: '#fff', border: '1px solid #eee' }}>
        <h2 style={{ marginTop: 0 }}>Your Order is on the Way!</h2>
        <p>Dear <strong>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</strong>,</p>
        <p>Great news! Your order <strong>#{order.id}</strong> has been shipped.</p>
        
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '15px 0' }}>
          <p style={{ margin: '5px 0' }}><strong>Shipping Address:</strong></p>
          <p style={{ margin: '5px 0', paddingLeft: '20px' }}>
            {order.shippingAddress?.address}<br />
            {order.shippingAddress?.city}<br />
            📞 {order.shippingAddress?.phone}
          </p>
        </div>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <div style={{ display: 'inline-block', padding: '10px 30px', background: '#f0fdf4', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#16a34a', fontWeight: 'bold' }}>
              Delivery Expected in 2-3 Business Days
            </p>
          </div>
        </div>

        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '15px 0', textAlign: 'center' }}>
          <p style={{ margin: '5px 0' }}><strong>BOOKSHELL</strong></p>
          <p style={{ margin: '5px 0' }}>📍 Bhaktapur, Nepal</p>
          <p style={{ margin: '5px 0' }}>📞 9745969254 | ✉️ info@bookshell.com</p>
        </div>
      </div>
      
      <div style={{ background: '#f8f9fa', padding: '20px', textAlign: 'center', borderRadius: '0 0 10px 10px', color: '#666', fontSize: '12px' }}>
        <p>© {new Date().getFullYear()} BOOKSHELL. All rights reserved.</p>
      </div>
    </div>
  )
}