import ActivityLog from '../models/ActivityLog.js';
import User from '../models/User.js';

// @desc    Get user activity logs
// @route   GET /api/activity
// @access  Private/Admin
export const getActivityLogs = async (req, res) => {
    try {
        const { 
            userId, 
            action, 
            page = 1, 
            limit = 20,
            startDate,
            endDate
        } = req.query;

        let query = {};

        if (userId) {
            query.user = userId;
        }

        if (action) {
            query.action = action;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const skip = (Number(page) - 1) * Number(limit);

        const logs = await ActivityLog.find(query)
            .populate('user', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await ActivityLog.countDocuments(query);

        res.json({
            logs,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user activity stats
// @route   GET /api/activity/stats
// @access  Private/Admin
export const getActivityStats = async (req, res) => {
    try {
        const actions = await ActivityLog.aggregate([
            { $group: { _id: '$action', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const users = await User.find({});
        const userActivity = await ActivityLog.aggregate([
            { $group: { _id: '$user', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        const totalLogs = await ActivityLog.countDocuments();

        // Recent activity
        const recentActivity = await ActivityLog.find({})
            .populate('user', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            totalLogs,
            actions,
            userActivity,
            recentActivity
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Log user activity
// @route   POST /api/activity/log
// @access  Private
export const logActivity = async (req, res) => {
    try {
        const { action, details } = req.body;

        const log = await ActivityLog.create({
            user: req.user._id,
            action,
            details,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });

        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};