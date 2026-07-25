import nodemailer from 'nodemailer';
import Order from '../models/Order.js';
import User from '../models/User.js';

// Configure email transporter
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'bookshell.nepal@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Generate HTML for different email types
const generateOrderConfirmationHTML = (order) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6, #06b6d4); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 30px; background: #fff; border: 1px solid #eee; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th { background: #f8f9fa; padding: 10px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #eee; }
            .total-row { font-weight: bold; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
            .badge-success { background: #d1fae5; color: #065f46; }
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
                    <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                    <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
                    <p style="margin: 5px 0;"><strong>Total:</strong> Rs. ${order.total.toFixed(2)}</p>
                </div>
                <h3>Order Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th style="text-align: center;">Qty</th>
                            <th style="text-align: right;">Price</th>
                            <th style="text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td><strong>${item.title}</strong><br><small style="color: #666;">${item.author}</small></td>
                                <td style="text-align: center;">${item.quantity}</td>
                                <td style="text-align: right;">Rs. ${item.price.toFixed(2)}</td>
                                <td style="text-align: right;">Rs. ${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr class="total-row">
                            <td colspan="3" style="text-align: right; padding: 10px;"><strong>Total</strong></td>
                            <td style="text-align: right; padding: 10px; color: #0d9488; font-weight: bold;">Rs. ${order.total.toFixed(2)}</td>
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

const generatePaymentConfirmationHTML = (order) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 30px; background: #fff; border: 1px solid #eee; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; font-size: 12px; }
            .shop-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center; }
            .payment-box { background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">✅ Payment Confirmed</h1>
                <p style="margin: 5px 0 0; opacity: 0.9;">BOOKSHELL</p>
            </div>
            <div class="content">
                <h2 style="margin-top: 0;">Payment Successful!</h2>
                <p>Dear <strong>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</strong>,</p>
                <p>We have received your payment for order <strong>#${order.id}</strong>.</p>
                <div class="payment-box">
                    <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
                    <p style="margin: 5px 0;"><strong>Amount Paid:</strong> Rs. ${order.total.toFixed(2)}</p>
                    <p style="margin: 5px 0;"><strong>Payment Status:</strong> ✅ Confirmed</p>
                </div>
                <p>Your order is now being processed and will be shipped soon.</p>
                <div class="shop-info">
                    <p style="margin: 5px 0;"><strong>BOOKSHELL</strong></p>
                    <p style="margin: 5px 0;">📍 Bhaktapur, Nepal</p>
                    <p style="margin: 5px 0;">📞 9745969254 | ✉️ info@bookshell.com</p>
                </div>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} BOOKSHELL. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const generateShippingUpdateHTML = (order) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 30px; background: #fff; border: 1px solid #eee; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; font-size: 12px; }
            .shop-info { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: center; }
            .delivery-box { display: inline-block; padding: 10px 30px; background: #f0fdf4; border-radius: 8px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">📦 Order Shipped</h1>
                <p style="margin: 5px 0 0; opacity: 0.9;">BOOKSHELL</p>
            </div>
            <div class="content">
                <h2 style="margin-top: 0;">Your Order is on the Way!</h2>
                <p>Dear <strong>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</strong>,</p>
                <p>Great news! Your order <strong>#${order.id}</strong> has been shipped.</p>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p style="margin: 5px 0;"><strong>Shipping Address:</strong></p>
                    <p style="margin: 5px 0; padding-left: 20px;">
                        ${order.shippingAddress.address}<br />
                        ${order.shippingAddress.city}<br />
                        📞 ${order.shippingAddress.phone}
                    </p>
                </div>
                <div style="text-align: center; margin: 20px 0;">
                    <div class="delivery-box">
                        <p style="margin: 0; color: #16a34a; font-weight: bold;">
                            Delivery Expected in 2-3 Business Days
                        </p>
                    </div>
                </div>
                <div class="shop-info">
                    <p style="margin: 5px 0;"><strong>BOOKSHELL</strong></p>
                    <p style="margin: 5px 0;">📍 Bhaktapur, Nepal</p>
                    <p style="margin: 5px 0;">📞 9745969254 | ✉️ info@bookshell.com</p>
                </div>
            </div>
            <div class="footer">
                <p>© ${new Date().getFullYear()} BOOKSHELL. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

// @desc    Send order confirmation email
// @route   POST /api/email/order-confirmation
// @access  Private/Admin
export const sendOrderConfirmation = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId).populate('items.book');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const html = generateOrderConfirmationHTML(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'bookshell.nepal@gmail.com',
            to: order.shippingAddress.email,
            subject: `Order Confirmation #${order.id} - BOOKSHELL`,
            html
        };

        // For demo, log the email
        console.log('📧 Order confirmation email sent to:', order.shippingAddress.email);
        
        // Uncomment for actual email sending
        // await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send payment confirmation email
// @route   POST /api/email/payment-confirmation
// @access  Private/Admin
export const sendPaymentConfirmation = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId).populate('items.book');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const html = generatePaymentConfirmationHTML(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'bookshell.nepal@gmail.com',
            to: order.shippingAddress.email,
            subject: `Payment Confirmed #${order.id} - BOOKSHELL`,
            html
        };

        console.log('📧 Payment confirmation email sent to:', order.shippingAddress.email);
        
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send shipping update email
// @route   POST /api/email/shipping-update
// @access  Private/Admin
export const sendShippingUpdate = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId).populate('items.book');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const html = generateShippingUpdateHTML(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'bookshell.nepal@gmail.com',
            to: order.shippingAddress.email,
            subject: `Your Order #${order.id} Has Been Shipped - BOOKSHELL`,
            html
        };

        console.log('📧 Shipping update email sent to:', order.shippingAddress.email);
        
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};