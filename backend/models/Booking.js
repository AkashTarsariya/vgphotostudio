import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    eventType: {
      type: String,
      required: true,
      enum: [
        'Wedding', 'Pre-Wedding', 'Birthday', 'Engagement',
        'Fashion', 'Maternity', 'Corporate', 'Product', 'Portrait', 'Other',
      ],
    },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    location: { type: String, required: true },
    budget: { type: String, default: '' },
    specialRequests: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'partial', 'paid', 'refunded'],
      default: 'unpaid',
    },
    amount: { type: Number, default: 0 },
    adminNotes: { type: String, default: '' },
    confirmationCode: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

bookingSchema.pre('save', function (next) {
  if (!this.confirmationCode) {
    this.confirmationCode = `VG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
