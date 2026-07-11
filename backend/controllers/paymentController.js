import stripe from '../config/stripe.js';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';

export const createCheckoutSession = async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ success: false, message: 'Payment service not configured' });
  }

  const { bookingId, amount, currency = 'inr' } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency,
        product_data: {
          name: `VG PHOTOSTUDIO - ${booking.eventType} Session`,
          description: `Booking for ${booking.name} on ${new Date(booking.preferredDate).toLocaleDateString()}`,
        },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/booking/success?code=${booking.confirmationCode}`,
    cancel_url: `${process.env.CLIENT_URL}/book?cancelled=true`,
    metadata: { bookingId: booking._id.toString() },
    customer_email: booking.email,
  });

  await Payment.create({
    booking: booking._id,
    stripeSessionId: session.id,
    amount,
    currency,
    status: 'pending',
  });

  res.json({ success: true, sessionId: session.id, url: session.url });
};

export const getPayments = async (req, res) => {
  const payments = await Payment.find()
    .populate('booking', 'name email eventType confirmationCode')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: payments });
};

export const webhookHandler = async (req, res) => {
  if (!stripe) return res.status(503).send('Payment not configured');

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const payment = await Payment.findOneAndUpdate(
      { stripeSessionId: session.id },
      { status: 'succeeded', stripePaymentIntentId: session.payment_intent },
      { new: true }
    );

    if (payment) {
      await Booking.findByIdAndUpdate(payment.booking, {
        paymentStatus: 'paid',
        amount: payment.amount,
      });
    }
  }

  res.json({ received: true });
};
