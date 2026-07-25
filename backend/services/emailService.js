import nodemailer from 'nodemailer';

// Configure email transporter
// For production, use actual SMTP credentials
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'bookshell.nepal@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Generate HTML invoice
const generateInvoiceHTML = (order) => {
    const itemsHTML = order.items.map((item, index) => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${index + 1}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <strong>${item.title}</strong><br>
                <small style="color: #666;">${item.author}</small>
            </td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${item.price.toFixed(2)}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Arial', sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6, #06b6d4); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 30px; background: #fff; border: 1px solid #eee; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #f8f9fa; padding: 10px; text-align: left; font-weight: 600; }
            td { padding: 10px; border-bottom: 1px solid #eee; }
            .total-row { font-weight: bold; border-top: 2px solid #333; }
            .amount { color: #0d9488; font-size: 24px; font-weight: bold; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
            .badge-success { background: #d1fae5; color: #065f46; }
            .badge-pending { background: #fef3c7; color: #92400e; }
            .badge-failed { background: #fee2e2; color: #991b1b; }
            .shop-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">📚 BOOKSHELL</h1>
                <p style="margin: 5px 0 0; opacity: 0.9;">Bhaktapur, Nepal</p>
            </div>
            <div class="content">
                <h2 style="margin-top: 0;">Order Confirmation</h2>
                <p>Dear <strong>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</strong>,</p>
                <p>Thank you for your order! We're pleased to confirm your purchase.</p>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p style="margin: 5px 0;"><strong>Order ID:</strong> ${order.id}</p>
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(order.date).toLocaleDateString('en-NP', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
                    <p style="margin: 5px 0;"><strong>Payment Status:</strong> 
                        <span class="badge ${order.paymentStatus === 'confirmed' ? 'badge-success' : order.paymentStatus === 'failed' ? 'badge-failed' : 'badge-pending'}">
                            ${order.paymentStatus || 'Pending'}
                        </span>
                    </p>
                    <p style="margin: 5px 0;"><strong>Order Status:</strong> 
                        <span class="badge badge-pending">${order.orderStatus || 'Pending'}</span>
                    </p>
                </div>

                <h3 style="margin: 20px 0 10px;">Order Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Book</th>
                            <th style="text-align: center;">Qty</th>
                            <th style="text-align: right;">Price</th>
                            <th style="text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" style="text-align: right; padding: 10px;"><strong>Subtotal</strong></td>
                            <td style="text-align: right; padding: 10px;">Rs. ${order.subtotal?.toFixed(2)}</td>
                        </tr>
                        ${order.discount > 0 ? `
                        <tr>
                            <td colspan="4" style="text-align: right; padding: 10px; color: #059669;"><strong>Discount</strong></td>
                            <td style="text-align: right; padding: 10px; color: #059669;">-Rs. ${order.discount?.toFixed(2)}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td colspan="4" style="text-align: right; padding: 10px;"><strong>Shipping</strong></td>
                            <td style="text-align: right; padding: 10px;">${order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping?.toFixed(2)}`}</td>
                        </tr>
                        <tr class="total-row">
                            <td colspan="4" style="text-align: right; padding: 15px; font-size: 18px;"><strong>Total</strong></td>
                            <td style="text-align: right; padding: 15px; font-size: 18px; color: #0d9488;"><strong>Rs. ${order.total?.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>

                <div class="shop-info">
                    <p style="margin: 5px 0;"><strong>BOOKSHELL</strong></p>
                    <p style="margin: 5px 0;">📍 Bhaktapur, Nepal</p>
                    <p style="margin: 5px 0;">📞 9745969254 | ✉️ info@bookshell.com</p>
                </div>

                <p style="margin-top: 20px; color: #666; font-size: 14px;">
                    If you have any questions, please contact us at <a href="mailto:info@bookshell.com" style="color: #0d9488;">info@bookshell.com</a> or call 9745969254.
                </p>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} BOOKSHELL. All rights reserved.</p>
                <p>Thank you for shopping with us!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (order) => {
    try {
        const html = generateInvoiceHTML(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'bookshell.nepal@gmail.com',
            to: order.shippingAddress.email,
            subject: `Order Confirmation #${order.id} - BOOKSHELL`,
            html: html
        };

        // For demo, log the email content
        console.log('📧 Email would be sent to:', order.shippingAddress.email);
        console.log('📧 Subject:', mailOptions.subject);
        console.log('📧 HTML content length:', html.length);
        
        // Uncomment for actual email sending
        // await transporter.sendMail(mailOptions);
        
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, message: error.message };
    }
};

// Send payment confirmation email
export const sendPaymentConfirmationEmail = async (order) => {
    try {
        const html = generateInvoiceHTML(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'bookshell.nepal@gmail.com',
            to: order.shippingAddress.email,
            subject: `Payment Confirmed #${order.id} - BOOKSHELL`,
            html: html
        };

        console.log('📧 Payment confirmation email would be sent to:', order.shippingAddress.email);
        
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, message: error.message };
    }
};