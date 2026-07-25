import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'login',
            'logout',
            'register',
            'view_book',
            'add_to_cart',
            'remove_from_cart',
            'create_order',
            'update_order_status',
            'add_review',
            'update_profile',
            'admin_login',
            'admin_action'
        ]
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ip: String,
    userAgent: String
}, {
    timestamps: true
});

// Index for faster queries
activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ createdAt: -1 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;