import Newsletter from '../models/Newsletter.js';

export const subscribe = async (req, res) => {
  const { email } = req.body;

  const existing = await Newsletter.findOne({ email });
  if (existing) {
    if (existing.isActive) {
      return res.status(400).json({ success: false, message: 'Already subscribed' });
    }
    existing.isActive = true;
    await existing.save();
    return res.json({ success: true, message: 'Welcome back! Resubscribed successfully.' });
  }

  await Newsletter.create({ email });
  res.status(201).json({ success: true, message: 'Successfully subscribed to newsletter' });
};

export const unsubscribe = async (req, res) => {
  const subscriber = await Newsletter.findOneAndUpdate(
    { email: req.body.email },
    { isActive: false },
    { new: true }
  );

  if (!subscriber) {
    return res.status(404).json({ success: false, message: 'Email not found' });
  }

  res.json({ success: true, message: 'Unsubscribed successfully' });
};

export const getSubscribers = async (req, res) => {
  const subscribers = await Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
  res.json({ success: true, data: subscribers, count: subscribers.length });
};
