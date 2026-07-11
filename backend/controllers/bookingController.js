import Booking from '../models/Booking.js';
import { sendEmail, bookingConfirmationEmail, adminBookingNotification } from '../utils/sendEmail.js';

export const createBooking = async (req, res) => {
  const booking = await Booking.create(req.body);

  try {
    const clientEmail = bookingConfirmationEmail(booking);
    await sendEmail({
      to: booking.email,
      subject: clientEmail.subject,
      html: clientEmail.html,
    });

    if (process.env.ADMIN_EMAIL) {
      const adminEmail = adminBookingNotification(booking);
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: adminEmail.subject,
        html: adminEmail.html,
      });
    }
  } catch (emailError) {
    console.error('Email send failed:', emailError.message);
  }

  res.status(201).json({ success: true, data: booking });
};

export const getBookings = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const bookings = await Booking.find(filter)
    .populate('service', 'name price')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: bookings });
};

export const getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('service', 'name price duration');

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.json({ success: true, data: booking });
};

export const updateBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.json({ success: true, data: booking });
};

export const deleteBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  res.json({ success: true, message: 'Booking deleted' });
};

export const checkAvailability = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ success: false, message: 'Date is required' });
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    preferredDate: { $gte: startOfDay, $lte: endOfDay },
    status: { $in: ['pending', 'confirmed'] },
  }).select('preferredTime status');

  const bookedSlots = bookings.map((b) => b.preferredTime);
  const allSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  res.json({
    success: true,
    data: {
      date,
      availableSlots,
      bookedSlots,
      isAvailable: availableSlots.length > 0,
    },
  });
};

export const getBookingByCode = async (req, res) => {
  const booking = await Booking.findOne({ confirmationCode: req.params.code })
    .populate('service', 'name price duration');

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.json({ success: true, data: booking });
};
