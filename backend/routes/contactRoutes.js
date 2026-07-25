import express from 'express';
import {
    createContact,
    getAllContacts,
    updateContactStatus
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, admin, getAllContacts);
router.put('/:id', protect, admin, updateContactStatus);

export default router;