import express from 'express';
import {
    getBookReviews,
    createReview,
    markHelpful,
    deleteReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/book/:bookId', getBookReviews);
router.post('/', protect, createReview);
router.put('/:id/helpful', markHelpful);
router.delete('/:id', protect, deleteReview);

export default router;