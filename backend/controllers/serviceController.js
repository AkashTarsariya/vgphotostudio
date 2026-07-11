import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { isActive: true };
  const services = await Service.find(filter).sort({
    isPopular: -1, // Popular services first
    order: 1,      // Then by custom order
    createdAt: -1, // Newer services first if order is the same
  });
  res.json({ success: true, data: services });
};

export const getService = async (req, res) => {
  const query = req.params.slug ? { slug: req.params.slug } : { _id: req.params.id };
  const service = await Service.findOne({ ...query, isActive: true });

  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }

  res.json({ success: true, data: service });
};

export const createService = async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
};

export const updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, data: service });
};

export const deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  res.json({ success: true, message: 'Service deleted' });
};
