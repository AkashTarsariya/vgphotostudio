import express from 'express';
import {
  createCheckoutSession,
  getPayments,
  webhookHandler,
} from '../controllers/paymentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-checkout', createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);
router.get('/', protect, adminOnly, getPayments);

export default router;
