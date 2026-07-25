import ActivityLog from '../models/ActivityLog.js';

export const logUserActivity = (action) => {
    return async (req, res, next) => {
        const oldSend = res.send;
        res.send = function(data) {
            try {
                // Only log successful requests
                if (res.statusCode < 400 && req.user) {
                    ActivityLog.create({
                        user: req.user._id,
                        action: action,
                        details: {
                            method: req.method,
                            url: req.url,
                            body: req.body,
                            params: req.params,
                            query: req.query
                        },
                        ip: req.ip,
                        userAgent: req.headers['user-agent']
                    }).catch(err => console.error('Activity log error:', err));
                }
            } catch (error) {
                console.error('Activity log error:', error);
            }
            oldSend.apply(res, arguments);
        };
        next();
    };
};