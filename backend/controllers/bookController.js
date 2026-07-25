import Book from '../models/Book.js';

// @desc    Get all books with filtering, sorting, and pagination
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
    try {
        const { 
            category, 
            search, 
            minPrice, 
            maxPrice, 
            sortBy = 'createdAt', 
            order = 'desc',
            page = 1,
            limit = 12
        } = req.query;

        // Build query
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sort options
        const sortOptions = {};
        const validSortFields = ['createdAt', 'price', 'rating', 'title'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        sortOptions[sortField] = order === 'asc' ? 1 : -1;

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        const books = await Book.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        const total = await Book.countDocuments(query);

        res.json({
            books,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a book (Admin only)
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req, res) => {
    try {
        const {
            title, author, description, price, originalPrice, discount,
            category, image, rating, reviews, stock, isbn, publisher,
            publishedDate, pages, language, featured, bestseller
        } = req.body;

        const book = await Book.create({
            title, author, description, price, originalPrice, discount,
            category, image, rating, reviews, stock, isbn, publisher,
            publishedDate, pages, language, featured, bestseller
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a book (Admin only)
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            Object.assign(book, req.body);
            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a book (Admin only)
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await Book.deleteOne({ _id: req.params.id });
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get featured books
// @route   GET /api/books/featured
// @access  Public
export const getFeaturedBooks = async (req, res) => {
    try {
        const books = await Book.find({ featured: true }).limit(8);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get bestseller books
// @route   GET /api/books/bestsellers
// @access  Public
export const getBestsellers = async (req, res) => {
    try {
        const books = await Book.find({ bestseller: true }).limit(10);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};