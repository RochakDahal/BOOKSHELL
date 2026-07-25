import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('books');

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, books: [] });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add book to wishlist
// @route   POST /api/wishlist/add
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { bookId } = req.body;

        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user._id, books: [] });
        }

        if (wishlist.books.includes(bookId)) {
            return res.status(400).json({ message: 'Book already in wishlist' });
        }

        wishlist.books.push(bookId);
        await wishlist.save();
        await wishlist.populate('books');

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove book from wishlist
// @route   DELETE /api/wishlist/remove/:bookId
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const { bookId } = req.params;

        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        wishlist.books.pull(bookId);
        await wishlist.save();
        await wishlist.populate('books');

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};