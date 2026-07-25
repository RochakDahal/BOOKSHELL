import Review from '../models/Review.js';
import Book from '../models/Book.js';

// @desc    Get reviews for a book
// @route   GET /api/reviews/book/:bookId
// @access  Public
export const getBookReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId })
            .populate('user', 'firstName lastName')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
    try {
        const { book, rating, comment } = req.body;

        const review = await Review.create({
            book,
            user: req.user._id,
            rating,
            comment
        });

        // Update book rating
        const reviews = await Review.find({ book });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        
        await Book.findByIdAndUpdate(book, {
            rating: avgRating,
            reviews: reviews.length
        });

        await review.populate('user', 'firstName lastName');
        res.status(201).json(review);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'You have already reviewed this book' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Update review helpful count
// @route   PUT /api/reviews/:id/helpful
// @access  Public
export const markHelpful = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            review.helpful += 1;
            await review.save();
            res.json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (review && (review.user.toString() === req.user._id.toString() || req.user.role === 'admin')) {
            await Review.deleteOne({ _id: req.params.id });
            res.json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};