import express from 'express';
import { body } from 'express-validator';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/newsletterController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post(
  '/subscribe',
  [body('email').isEmail().normalizeEmail()],
  validate,
  subscribe
);

router.post('/unsubscribe', [body('email').isEmail().normalizeEmail()], validate, unsubscribe);
router.get('/subscribers', protect, adminOnly, getSubscribers);

export default router;
