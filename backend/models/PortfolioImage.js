import mongoose from 'mongoose';

const portfolioImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    publicId: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    tags: [{ type: String }],
    width: { type: Number },
    height: { type: Number },
    aspectRatio: { type: Number },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

portfolioImageSchema.index({ title: 'text', description: 'text', tags: 'text' });
portfolioImageSchema.index({ category: 1, isActive: 1 });

const PortfolioImage = mongoose.model('PortfolioImage', portfolioImageSchema);
export default PortfolioImage;
