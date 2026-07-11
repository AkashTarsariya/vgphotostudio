import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';
import Project from '../models/Project.js';

dotenv.config();

const categories = [
  { name: 'Weddings', slug: 'weddings', description: 'Timeless wedding photography capturing your love story', order: 1 },
  { name: 'Pre-Weddings', slug: 'pre-weddings', description: 'Romantic pre-wedding shoots in stunning locations', order: 2 },
  { name: 'Birthdays', slug: 'birthdays', description: 'Celebrating milestones with creative birthday photography', order: 3 },
  { name: 'Fashion', slug: 'fashion', description: 'Editorial fashion photography for brands and models', order: 4 },
  { name: 'Portraits', slug: 'portraits', description: 'Elegant portrait sessions for individuals and families', order: 5 },
  { name: 'Events', slug: 'events', description: 'Professional event coverage for corporate and social gatherings', order: 6 },
  { name: 'Commercial', slug: 'commercial', description: 'High-impact commercial photography for brands', order: 7 },
];

const services = [
  {
    name: 'Wedding Photography',
    slug: 'wedding-photography',
    shortDescription: 'Full-day wedding coverage with cinematic storytelling',
    description: 'Capture every precious moment of your wedding day with our premium full-day coverage. From getting ready to the last dance, we document your love story with artistic precision.',
    price: 85000,
    duration: 'Full Day (10-12 hours)',
    deliverables: ['500+ edited photos', 'Online gallery', 'Premium album', 'Same-day highlights reel'],
    addOns: [{ name: 'Second Photographer', price: 15000, description: 'Additional coverage angle' }, { name: 'Drone Coverage', price: 12000, description: 'Aerial shots of venue' }],
    faqs: [{ question: 'How many photos will I receive?', answer: 'Typically 500-700 fully edited high-resolution images.' }],
    isPopular: true,
    order: 1,
  },
  {
    name: 'Pre-Wedding',
    slug: 'pre-wedding',
    shortDescription: 'Romantic couple shoots at dream locations',
    description: 'Create stunning pre-wedding memories at breathtaking locations. Perfect for save-the-dates, invitations, and celebrating your journey together.',
    price: 35000,
    duration: '4-6 hours',
    deliverables: ['150+ edited photos', 'Online gallery', '10 premium prints'],
    addOns: [{ name: 'Location Change', price: 5000, description: 'Second location within 50km' }],
    faqs: [{ question: 'Can we choose the location?', answer: 'Absolutely! We help scout and recommend stunning locations.' }],
    isPopular: true,
    order: 2,
  },
  {
    name: 'Birthday',
    slug: 'birthday',
    shortDescription: 'Creative birthday celebration photography',
    description: 'Make every birthday unforgettable with vibrant, creative photography that captures the joy and energy of your celebration.',
    price: 15000,
    duration: '3-4 hours',
    deliverables: ['100+ edited photos', 'Online gallery', '5 premium prints'],
    addOns: [{ name: 'Photo Booth Setup', price: 8000, description: 'Instant print photo booth' }],
    faqs: [],
    order: 3,
  },
  {
    name: 'Engagement',
    slug: 'engagement',
    shortDescription: 'Intimate engagement session photography',
    description: 'Celebrate your engagement with an intimate photography session designed to capture the excitement of this special chapter.',
    price: 25000,
    duration: '2-3 hours',
    deliverables: ['80+ edited photos', 'Online gallery', 'Engagement announcement designs'],
    addOns: [],
    faqs: [],
    order: 4,
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    shortDescription: 'Editorial fashion and lookbook photography',
    description: 'Elevate your brand with editorial-quality fashion photography. Perfect for designers, models, and fashion brands.',
    price: 45000,
    duration: 'Full Day',
    deliverables: ['200+ edited photos', 'Retouched selects', 'Commercial usage rights'],
    addOns: [{ name: 'Styling Consultation', price: 10000, description: 'Professional styling direction' }],
    faqs: [],
    order: 5,
  },
  {
    name: 'Maternity',
    slug: 'maternity',
    shortDescription: 'Elegant maternity and motherhood photography',
    description: 'Celebrate the beauty of motherhood with soft, elegant maternity portraits that you will treasure forever.',
    price: 20000,
    duration: '2 hours',
    deliverables: ['60+ edited photos', 'Online gallery', '5 premium prints'],
    addOns: [{ name: 'Newborn Add-on', price: 15000, description: 'Book newborn session within 2 weeks of birth' }],
    faqs: [],
    order: 6,
  },
  {
    name: 'Corporate',
    slug: 'corporate',
    shortDescription: 'Professional corporate and team photography',
    description: 'Polished corporate headshots, team photos, and event coverage that strengthens your brand identity.',
    price: 30000,
    duration: 'Half Day',
    deliverables: ['100+ edited photos', 'Individual headshots', 'Team group shots'],
    addOns: [],
    faqs: [],
    order: 7,
  },
  {
    name: 'Product Photography',
    slug: 'product-photography',
    shortDescription: 'Premium product and e-commerce photography',
    description: 'Showcase your products with crisp, compelling photography optimized for e-commerce and marketing campaigns.',
    price: 25000,
    duration: 'Per product set',
    deliverables: ['50+ edited photos', 'White background & lifestyle shots', 'Web-optimized files'],
    addOns: [{ name: '360° Product Views', price: 8000, description: 'Interactive product rotation' }],
    faqs: [],
    order: 8,
  },
];

const testimonials = [
  { clientName: 'Priya & Rahul', clientRole: 'Wedding Clients', content: 'VG PHOTOSTUDIO captured our wedding day beyond our wildest dreams. Every frame tells our story beautifully.', rating: 5, eventType: 'Wedding', isFeatured: true, order: 1 },
  { clientName: 'Ananya Sharma', clientRole: 'Fashion Model', content: 'Working with VG was an incredible experience. The editorial quality of the images elevated my portfolio significantly.', rating: 5, eventType: 'Fashion', isFeatured: true, order: 2 },
  { clientName: 'The Mehta Family', clientRole: 'Birthday Celebration', content: 'They made our daughter\'s 5th birthday so special. The photos are vibrant, creative, and full of joy.', rating: 5, eventType: 'Birthday', isFeatured: true, order: 3 },
  { clientName: 'TechVision Inc.', clientRole: 'Corporate Client', content: 'Professional, punctual, and delivered outstanding corporate headshots for our entire team.', rating: 5, eventType: 'Corporate', isFeatured: false, order: 4 },
];

const sampleImages = {
  weddings: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  preWeddings: 'https://images.unsplash.com/photo-1522673606300-8d9631a15b24?w=1200&q=80',
  fashion: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
  portraits: 'https://images.unsplash.com/photo-1531746020798-e6953b6b32a2?w=1200&q=80',
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
      Project.deleteMany({}),
    ]);

    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@vgphotostudio.com',
      password: process.env.ADMIN_PASSWORD || 'vgphotostudio',
      role: 'admin',
    });
    console.log(`Admin created: ${admin.email}`);

    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories created`);

    const weddingCat = createdCategories.find((c) => c.slug === 'weddings');
    const preWeddingCat = createdCategories.find((c) => c.slug === 'pre-weddings');
    const fashionCat = createdCategories.find((c) => c.slug === 'fashion');

    await Service.insertMany(services);
    console.log(`${services.length} services created`);

    await Testimonial.insertMany(testimonials);
    console.log(`${testimonials.length} testimonials created`);

    await Project.insertMany([
      {
        title: 'Sunset Garden Wedding',
        slug: 'sunset-garden-wedding',
        coverImage: sampleImages.weddings,
        story: 'A magical garden wedding bathed in golden hour light. Priya and Rahul\'s celebration was an intimate affair filled with laughter, tears, and timeless elegance.',
        category: weddingCat._id,
        gallery: [sampleImages.weddings, sampleImages.preWeddings, sampleImages.portraits],
        location: 'Udaipur, Rajasthan',
        shootDate: new Date('2025-11-15'),
        clientName: 'Priya & Rahul',
        equipment: { camera: 'Sony A7R V', lenses: ['85mm f/1.4', '24-70mm f/2.8'], lighting: 'Natural + Profoto B10' },
        testimonial: { clientName: 'Priya & Rahul', content: 'Absolutely magical. Every photo is a masterpiece.', rating: 5 },
        isFeatured: true,
        tags: ['wedding', 'garden', 'golden hour'],
      },
      {
        title: 'Coastal Pre-Wedding Romance',
        slug: 'coastal-pre-wedding-romance',
        coverImage: sampleImages.preWeddings,
        story: 'An ethereal pre-wedding shoot along the Arabian Sea coastline. Soft waves, warm sand, and two souls deeply in love.',
        category: preWeddingCat._id,
        gallery: [sampleImages.preWeddings, sampleImages.weddings],
        location: 'Goa, India',
        shootDate: new Date('2025-09-20'),
        clientName: 'Meera & Arjun',
        isFeatured: true,
        tags: ['pre-wedding', 'beach', 'romantic'],
      },
      {
        title: 'Vogue Editorial Fashion',
        slug: 'vogue-editorial-fashion',
        coverImage: sampleImages.fashion,
        story: 'A bold editorial fashion shoot pushing creative boundaries with dramatic lighting and avant-garde styling.',
        category: fashionCat._id,
        gallery: [sampleImages.fashion, sampleImages.portraits],
        location: 'Mumbai Studio',
        shootDate: new Date('2025-08-10'),
        clientName: 'Ananya Sharma',
        isFeatured: true,
        tags: ['fashion', 'editorial', 'studio'],
      },
    ]);
    console.log('Sample projects created');

    console.log('\n✅ Seed completed successfully!');
    console.log(`Admin login: ${admin.email} / ${process.env.ADMIN_PASSWORD || 'ChangeMe123!'}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
