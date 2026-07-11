import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn('Email not configured. Skipping send.');
    return { success: false, message: 'Email service not configured' };
  }

  const mailOptions = {
    from: `"VG PHOTOSTUDIO" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
};

export const bookingConfirmationEmail = (booking) => ({
  subject: `Booking Confirmation - VG PHOTOSTUDIO`,
  html: `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-weight: 300; letter-spacing: 2px;">VG PHOTOSTUDIO</h1>
      <p>Dear ${booking.name},</p>
      <p>Thank you for booking with VG PHOTOSTUDIO. Your session request has been received.</p>
      <div style="background: #f8f8f8; padding: 20px; margin: 20px 0;">
        <p><strong>Event:</strong> ${booking.eventType}</p>
        <p><strong>Date:</strong> ${new Date(booking.preferredDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${booking.preferredTime}</p>
        <p><strong>Location:</strong> ${booking.location}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
      </div>
      <p>We will confirm your appointment shortly. For urgent queries, reply to this email.</p>
      <p style="color: #888;">— The VG PHOTOSTUDIO Team</p>
    </div>
  `,
});

export const adminBookingNotification = (booking) => ({
  subject: `New Booking Request - ${booking.name}`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px;">
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Event:</strong> ${booking.eventType}</p>
      <p><strong>Date:</strong> ${new Date(booking.preferredDate).toLocaleDateString()}</p>
      <p><strong>Budget:</strong> ${booking.budget || 'Not specified'}</p>
      <p><strong>Requests:</strong> ${booking.specialRequests || 'None'}</p>
    </div>
  `,
});
