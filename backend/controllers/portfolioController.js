import PortfolioImage from '../models/PortfolioImage.js';

export const getPortfolioImages = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const filter = { isActive: true };

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.featured === 'true') {
    filter.isFeatured = true;
  }

  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  const [images, total] = await Promise.all([
    PortfolioImage.find(filter)
      .populate('category', 'name slug')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    PortfolioImage.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: images,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  });
};

export const getPortfolioImage = async (req, res) => {
  const image = await PortfolioImage.findById(req.params.id)
    .populate('category', 'name slug')
    .populate('project', 'title slug');

  if (!image || !image.isActive) {
    return res.status(404).json({ success: false, message: 'Image not found' });
  }

  res.json({ success: true, data: image });
};

export const createPortfolioImage = async (req, res) => {
  const image = await PortfolioImage.create(req.body);
  res.status(201).json({ success: true, data: image });
};

export const updatePortfolioImage = async (req, res) => {
  const image = await PortfolioImage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!image) {
    return res.status(404).json({ success: false, message: 'Image not found' });
  }

  res.json({ success: true, data: image });
};

export const deletePortfolioImage = async (req, res) => {
  const image = await PortfolioImage.findByIdAndDelete(req.params.id);

  if (!image) {
    return res.status(404).json({ success: false, message: 'Image not found' });
  }

  res.json({ success: true, message: 'Image deleted' });
};
