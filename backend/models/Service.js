import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    price: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    duration: { type: String, required: true },
    deliverables: [{ type: String }],
    addOns: [{
      name: { type: String },
      price: { type: Number },
      description: { type: String },
    }],
    faqs: [{
      question: { type: String },
      answer: { type: String },
    }],
    coverImage: { type: String, default: '' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
