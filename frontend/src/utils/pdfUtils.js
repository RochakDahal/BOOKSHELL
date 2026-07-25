import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const generateInvoicePDF = (order) => {
  if (!order) return

  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Colors
  const primaryColor = [20, 184, 166] // teal-500
  const grayColor = [100, 116, 139]
  
  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text('BOOKSHELL', 20, 25)
  
  doc.setFontSize(10)
  doc.text('Bhaktapur, Nepal', 20, 33)
  doc.text('📞 9745969254 | ✉️ info@bookshell.com', 20, 38)
  
  // Invoice Title
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(20)
  doc.text('INVOICE', pageWidth - 50, 25)
  
  doc.setFontSize(10)
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
  doc.text(`Order #${order.id}`, pageWidth - 50, 33)
  doc.text(`Date: ${new Date(order.date).toLocaleDateString('en-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`, pageWidth - 50, 38)
  
  // Customer Info
  let yPos = 50
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text('Bill To:', 20, yPos)
  
  doc.setFontSize(10)
  yPos += 7
  doc.text(`${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}`, 20, yPos)
  yPos += 5
  doc.text(order.shippingAddress?.address || '', 20, yPos)
  yPos += 5
  doc.text(`${order.shippingAddress?.city || ''}`, 20, yPos)
  yPos += 5
  doc.text(`📞 ${order.shippingAddress?.phone || ''}`, 20, yPos)
  yPos += 5
  doc.text(`✉️ ${order.shippingAddress?.email || ''}`, 20, yPos)
  
  // Payment Info
  doc.setFontSize(10)
  doc.text('Payment Details:', pageWidth - 80, 50)
  doc.text(`Method: ${(order.paymentMethod || '').toUpperCase()}`, pageWidth - 80, 57)
  doc.text(`Status: ${order.paymentStatus || 'Pending'}`, pageWidth - 80, 64)
  doc.text(`Order Status: ${(order.orderStatus || 'Pending').charAt(0).toUpperCase() + (order.orderStatus || 'pending').slice(1)}`, pageWidth - 80, 71)
  
  // Items Table
  yPos = 85
  const tableHeaders = [['#', 'Book', 'Qty', 'Price', 'Total']]
  const tableRows = order.items?.map((item, index) => [
    index + 1,
    `${item.title}\n${item.author}`,
    item.quantity,
    `Rs. ${item.price.toFixed(2)}`,
    `Rs. ${(item.price * item.quantity).toFixed(2)}`
  ]) || []
  
  doc.autoTable({
    startY: yPos,
    head: tableHeaders,
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 80 },
      2: { cellWidth: 25 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 }
    }
  })
  
  // Totals
  const finalY = doc.lastAutoTable.finalY + 10
  const subtotal = order.subtotal || 0
  const discount = order.discount || 0
  const shipping = order.shipping || 0
  const total = order.total || 0
  
  doc.setFontSize(10)
  doc.text('Subtotal:', pageWidth - 60, finalY)
  doc.text(`Rs. ${subtotal.toFixed(2)}`, pageWidth - 20, finalY, { align: 'right' })
  
  if (discount > 0) {
    doc.setTextColor(5, 150, 105)
    doc.text('Discount:', pageWidth - 60, finalY + 7)
    doc.text(`-Rs. ${discount.toFixed(2)}`, pageWidth - 20, finalY + 7, { align: 'right' })
    doc.setTextColor(0, 0, 0)
  }
  
  doc.text('Shipping:', pageWidth - 60, finalY + 14)
  doc.text(shipping === 0 ? 'FREE' : `Rs. ${shipping.toFixed(2)}`, pageWidth - 20, finalY + 14, { align: 'right' })
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Total:', pageWidth - 60, finalY + 24)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text(`Rs. ${total.toFixed(2)}`, pageWidth - 20, finalY + 24, { align: 'right' })
  
  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20
  doc.setFontSize(8)
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
  doc.text('Thank you for shopping with BOOKSHELL!', pageWidth / 2, footerY, { align: 'center' })
  doc.text(`© ${new Date().getFullYear()} BOOKSHELL. All rights reserved.`, pageWidth / 2, footerY + 5, { align: 'center' })
  
  // Save the PDF
  doc.save(`Invoice_${order.id}.pdf`)
}

export const generateInvoiceBlob = (order) => {
  if (!order) return null

  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // Colors
  const primaryColor = [20, 184, 166]
  const grayColor = [100, 116, 139]
  
  // Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text('BOOKSHELL', 20, 25)
  
  doc.setFontSize(10)
  doc.text('Bhaktapur, Nepal', 20, 33)
  doc.text('📞 9745969254 | ✉️ info@bookshell.com', 20, 38)
  
  // Invoice Title
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(20)
  doc.text('INVOICE', pageWidth - 50, 25)
  
  doc.setFontSize(10)
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2])
  doc.text(`Order #${order.id}`, pageWidth - 50, 33)
  doc.text(`Date: ${new Date(order.date).toLocaleDateString('en-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`, pageWidth - 50, 38)
  
  // Items Table
  const tableHeaders = [['#', 'Book', 'Qty', 'Price', 'Total']]
  const tableRows = order.items?.map((item, index) => [
    index + 1,
    `${item.title}\n${item.author}`,
    item.quantity,
    `Rs. ${item.price.toFixed(2)}`,
    `Rs. ${(item.price * item.quantity).toFixed(2)}`
  ]) || []
  
  doc.autoTable({
    startY: 50,
    head: tableHeaders,
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    }
  })
  
  // Totals
  const finalY = doc.lastAutoTable.finalY + 10
  const total = order.total || 0
  
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Total:', pageWidth - 60, finalY)
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.text(`Rs. ${total.toFixed(2)}`, pageWidth - 20, finalY, { align: 'right' })
  
  return doc.output('blob')
}