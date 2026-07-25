import Order from '../models/Order.js';
import Book from '../models/Book.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Calculate totals
        let subtotal = 0;
        let discount = 0;

        for (const item of items) {
            const book = await Book.findById(item.book);
            if (!book) {
                return res.status(404).json({ message: `Book not found: ${item.book}` });
            }
            if (book.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for: ${book.title}` });
            }
            subtotal += book.price * item.quantity;
            discount += (book.originalPrice - book.price) * item.quantity;
        }

        const shipping = subtotal > 500 ? 0 : 50;
        const totalAmount = subtotal + shipping;

        const order = await Order.create({
            user: req.user._id,
            items: items.map(item => ({
                book: item.book,
                title: item.title,
                author: item.author,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            shippingAddress,
            paymentMethod,
            subtotal,
            discount,
            shipping,
            totalAmount
        });

        // Update book stock
        for (const item of items) {
            await Book.findByIdAndUpdate(item.book, {
                $inc: { stock: -item.quantity }
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.book');
        
        if (order && (order.user.toString() === req.user._id.toString() || req.user.role === 'admin')) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'firstName lastName email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            if (orderStatus) order.orderStatus = orderStatus;
            if (paymentStatus) order.paymentStatus = paymentStatus;
            
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};