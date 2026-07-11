import ContactMessage from '../models/ContactMessage.js';
import { sendEmail } from '../utils/sendEmail.js';

export const createContactMessage = async (req, res) => {
  const message = await ContactMessage.create(req.body);

  try {
    if (process.env.ADMIN_EMAIL) {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact: ${message.subject}`,
        html: `
          <h2>Contact from ${message.name}</h2>
          <p><strong>Email:</strong> ${message.email}</p>
          <p><strong>Phone:</strong> ${message.phone || 'N/A'}</p>
          <p><strong>Subject:</strong> ${message.subject}</p>
          <p>${message.message}</p>
        `,
      });
    }
  } catch (err) {
    console.error('Contact email failed:', err.message);
  }

  res.status(201).json({ success: true, data: message, message: 'Message sent successfully' });
};

export const getContactMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, data: messages });
};

export const updateContactMessage = async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
  res.json({ success: true, data: message });
};

export const deleteContactMessage = async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
  res.json({ success: true, message: 'Message deleted' });
};
