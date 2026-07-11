import Testimonial from '../models/Testimonial.js';

export const getTestimonials = async (req, res) => {
  const filter = { isActive: true };
  if (req.query.featured === 'true') filter.isFeatured = true;

  const testimonials = await Testimonial.find(filter)
    .sort({ order: 1, createdAt: -1 })
    .limit(req.query.limit ? parseInt(req.query.limit) : 50);

  res.json({ success: true, data: testimonials });
};

export const createTestimonial = async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: testimonial });
};

export const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  res.json({ success: true, data: testimonial });
};

export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
  res.json({ success: true, message: 'Testimonial deleted' });
};
