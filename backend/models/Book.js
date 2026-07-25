import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        required: true,
        min: [0, 'Original price cannot be negative']
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Fiction', 'Fantasy', 'Self-Help', 'Business', 'Science', 'History', 'Romance', 'Technology', 'Biography']
    },
    image: {
        type: String,
        required: [true, 'Book image is required']
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5']
    },
    reviews: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true
    },
    publisher: {
        type: String,
        trim: true
    },
    publishedDate: {
        type: Date
    },
    pages: {
        type: Number,
        min: [0, 'Pages cannot be negative']
    },
    language: {
        type: String,
        default: 'English'
    },
    featured: {
        type: Boolean,
        default: false
    },
    bestseller: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for better query performance
bookSchema.index({ title: 'text', author: 'text', description: 'text' });
bookSchema.index({ category: 1, price: 1 });
bookSchema.index({ rating: -1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;