import Booking from '../models/Booking.js';
import Project from '../models/Project.js';
import ContactMessage from '../models/ContactMessage.js';
import Newsletter from '../models/Newsletter.js';
import Payment from '../models/Payment.js';

export const getAnalytics = async (req, res) => {
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    totalProjects,
    totalMessages,
    unreadMessages,
    totalSubscribers,
    totalRevenue,
    recentBookings,
    bookingsByEvent,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Booking.countDocuments({ status: 'confirmed' }),
    Project.countDocuments({ isPublished: true }),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
    Newsletter.countDocuments({ isActive: true }),
    Payment.aggregate([
      { $match: { status: 'succeeded' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Booking.find().sort({ createdAt: -1 }).limit(5).select('name eventType status preferredDate'),
    Booking.aggregate([
      { $group: { _id: '$eventType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
  ]);

  res.json({
    success: true,
    data: {
      overview: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalProjects,
        totalMessages,
        unreadMessages,
        totalSubscribers,
        totalRevenue: totalRevenue[0]?.total || 0,
      },
      recentBookings,
      bookingsByEvent,
    },
  });
};
