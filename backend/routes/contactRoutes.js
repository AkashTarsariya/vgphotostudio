import express from 'express';
import { body } from 'express-validator';
import {
  createContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().notEmpty(),
    body('message').trim().notEmpty().isLength({ min: 10 }),
  ],
  validate,
  createContactMessage
);

router.get('/', protect, adminOnly, getContactMessages);
router.put('/:id', protect, adminOnly, updateContactMessage);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

export default router;
