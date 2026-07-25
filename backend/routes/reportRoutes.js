import express from 'express';
import { getSalesReport, getProductReport } from '../controllers/reportController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/sales', protect, admin, getSalesReport);
router.get('/products', protect, admin, getProductReport);

export default router;