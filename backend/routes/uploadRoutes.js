import express from 'express';
import { uploadImage, uploadMultiple, deleteImage, upload } from '../controllers/uploadController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/single', protect, adminOnly, upload.single('image'), uploadImage);
router.post('/multiple', protect, adminOnly, upload.array('images', 20), uploadMultiple);
router.delete('/', protect, adminOnly, deleteImage);

export default router;
