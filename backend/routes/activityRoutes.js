import express from 'express';
import { getActivityLogs, getActivityStats } from '../controllers/activityController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getActivityLogs);
router.get('/stats', protect, admin, getActivityStats);

export default router;