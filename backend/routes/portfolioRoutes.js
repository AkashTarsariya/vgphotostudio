import express from 'express';
import {
  getPortfolioImages,
  getPortfolioImage,
  createPortfolioImage,
  updatePortfolioImage,
  deletePortfolioImage,
} from '../controllers/portfolioController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPortfolioImages);
router.get('/:id', getPortfolioImage);
router.post('/', protect, adminOnly, createPortfolioImage);
router.put('/:id', protect, adminOnly, updatePortfolioImage);
router.delete('/:id', protect, adminOnly, deletePortfolioImage);

export default router;
