import express from 'express';
import { body } from 'express-validator';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  checkAvailability,
  getBookingByCode,
} from '../controllers/bookingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.get('/availability', checkAvailability);
router.get('/code/:code', getBookingByCode);

router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().notEmpty(),
    body('eventType').notEmpty(),
    body('preferredDate').isISO8601(),
    body('preferredTime').notEmpty(),
    body('location').trim().notEmpty(),
  ],
  validate,
  createBooking
);

router.get('/', protect, adminOnly, getBookings);
router.get('/:id', protect, adminOnly, getBooking);
router.put('/:id', protect, adminOnly, updateBooking);
router.delete('/:id', protect, adminOnly, deleteBooking);

export default router;
