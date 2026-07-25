import express from 'express';
import { 
    sendOrderConfirmation, 
    sendPaymentConfirmation, 
    sendShippingUpdate 
} from '../controllers/emailController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/order-confirmation', protect, admin, sendOrderConfirmation);
router.post('/payment-confirmation', protect, admin, sendPaymentConfirmation);
router.post('/shipping-update', protect, admin, sendShippingUpdate);

export default router;