import Order from '../models/Order.js';
import User from '../models/User.js';
import Book from '../models/Book.js';

// @desc    Get sales report
// @route   GET /api/reports/sales
// @access  Private/Admin
export const getSalesReport = async (req, res) => {
    try {
        const { period = 'month' } = req.query;
        
        let startDate = new Date();
        if (period === 'week') {
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'month') {
            startDate.setMonth(startDate.getMonth() - 1);
        } else if (period === 'year') {
            startDate.setFullYear(startDate.getFullYear() - 1);
        }

        const orders = await Order.find({
            createdAt: { $gte: startDate },
            paymentStatus: 'confirmed'
        });

        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const totalOrders = orders.length;
        const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Group by date
        const dailyData = {};
        orders.forEach(order => {
            const date = order.createdAt.toISOString().split('T')[0];
            if (!dailyData[date]) dailyData[date] = 0;
            dailyData[date] += order.totalAmount;
        });

        const dailyRevenue = Object.keys(dailyData).map(date => ({
            date,
            revenue: dailyData[date]
        }));

        res.json({
            period,
            totalRevenue,
            totalOrders,
            averageOrder,
            dailyRevenue,
            orders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get product report
// @route   GET /api/reports/products
// @access  Private/Admin
export const getProductReport = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: 'confirmed' });
        
        const productSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                if (!productSales[item.title]) {
                    productSales[item.title] = {
                        title: item.title,
                        author: item.author,
                        totalSold: 0,
                        totalRevenue: 0
                    };
                }
                productSales[item.title].totalSold += item.quantity;
                productSales[item.title].totalRevenue += item.price * item.quantity;
            });
        });

        const products = Object.values(productSales)
            .sort((a, b) => b.totalSold - a.totalSold)
            .slice(0, 10);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};