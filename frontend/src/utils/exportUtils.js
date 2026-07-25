// Utility functions for exporting data

export const exportOrdersToCSV = (orders) => {
  if (!orders || orders.length === 0) return

  const headers = [
    'Order ID',
    'Date',
    'Customer',
    'Items',
    'Subtotal',
    'Discount',
    'Shipping',
    'Total',
    'Payment Method',
    'Payment Status',
    'Order Status'
  ]

  const rows = orders.map(order => [
    order.id,
    new Date(order.date).toLocaleDateString(),
    `${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}`,
    order.items?.length || 0,
    order.subtotal?.toFixed(2) || '0.00',
    order.discount?.toFixed(2) || '0.00',
    order.shipping === 0 ? 'FREE' : order.shipping?.toFixed(2) || '0.00',
    order.total?.toFixed(2) || '0.00',
    order.paymentMethod || '',
    order.paymentStatus || 'pending',
    order.orderStatus || 'pending'
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `orders_export_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const exportBooksToCSV = (books) => {
  if (!books || books.length === 0) return

  const headers = [
    'ID',
    'Title',
    'Author',
    'Category',
    'Price',
    'Original Price',
    'Discount',
    'Stock',
    'Rating',
    'Reviews'
  ]

  const rows = books.map(book => [
    book.id,
    book.title,
    book.author,
    book.category,
    book.price,
    book.originalPrice || '',
    book.discount || 0,
    book.stock || 0,
    book.rating || 0,
    book.reviews || 0
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `books_export_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const exportUsersToCSV = (users) => {
  if (!users || users.length === 0) return

  const headers = [
    'ID',
    'First Name',
    'Last Name',
    'Email',
    'Gender',
    'Address',
    'Role',
    'Joined Date'
  ]

  const rows = users.map(user => [
    user.id,
    user.firstName || '',
    user.lastName || '',
    user.email || '',
    user.gender || '',
    user.address || '',
    user.role || 'user',
    new Date(user.createdAt || Date.now()).toLocaleDateString()
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}