# VG PHOTOSTUDIO — Premium Photography Portfolio

A production-ready MERN stack photography portfolio and booking website for **VG PHOTOSTUDIO**.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, React Router, React Hook Form, Axios |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Nodemailer, Stripe |
| Features | Dark/Light mode, PWA, SEO, Admin Dashboard, Booking + Payments |

## Project Structure

```
VG PHOTO/
├── backend/
│   ├── config/          # DB, Cloudinary, Stripe
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, validation, errors
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Seed script
│   ├── utils/           # Email, JWT helpers
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/  # UI, layout, home, admin
│       ├── context/     # Theme, Auth
│       ├── pages/       # Public + admin pages
│       └── services/    # API client
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Stripe account (for payments, optional)
- SMTP credentials (for emails, optional)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run seed    # Creates admin user + sample data
npm run dev     # Starts on http://localhost:5000
```

**Default admin credentials** (after seed):
- Email: `admin@vgphotostudio`
- Password: `vgphotostudio`

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev     # Starts on http://localhost:5173
```

### 3. Access

| URL | Description |
|-----|-------------|
| http://localhost:5173 | Public website |
| http://localhost:5173/admin/login | Admin dashboard |
| http://localhost:5000/api/health | API health check |

## Environment Variables

### Backend (`backend/.env`)

```env
MONGODB_URI=mongodb://localhost:27017/vg-photostudio
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
SMTP_HOST=smtp.gmail.com
SMTP_USER=...
SMTP_PASS=...
STRIPE_SECRET_KEY=sk_test_...
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_WHATSAPP_NUMBER=919876543210
VITE_INSTAGRAM_URL=https://instagram.com/vgphotostudio
```

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/projects` | Public | List projects |
| GET | `/api/services` | Public | List services |
| POST | `/api/bookings` | Public | Create booking |
| GET | `/api/bookings/availability` | Public | Check date availability |
| POST | `/api/payments/create-checkout` | Public | Stripe checkout |
| GET | `/api/analytics` | Admin | Dashboard stats |
| POST | `/api/upload/single` | Admin | Upload image |

## Deployment

### Backend (Railway / Render / VPS)

1. Set all environment variables
2. Use `npm start` as the start command
3. Ensure MongoDB Atlas connection string is set
4. Configure Stripe webhook: `POST /api/payments/webhook`

### Frontend (Vercel / Netlify)

1. Build command: `npm run build`
2. Output directory: `dist`
3. Set `VITE_API_URL` to your production API URL
4. Enable SPA redirects (all routes → `index.html`)

### MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist your server IP (or `0.0.0.0/0` for cloud deploys)
3. Copy connection string to `MONGODB_URI`

### Performance Tips

- Replace Unsplash placeholder images with your own via Cloudinary
- Enable CDN for static assets
- Use `npm run build` and serve the `dist` folder for production
- MongoDB indexes are pre-configured on portfolio and project collections

## Features Checklist

- [x] Cinematic hero, portfolio gallery, services, booking workflow
- [x] Dark/Light theme toggle (persistent)
- [x] Masonry gallery with filters, search, infinite scroll
- [x] Lightbox with zoom
- [x] JWT admin authentication
- [x] Booking management (accept/reject)
- [x] Stripe payment integration
- [x] Email notifications (Nodemailer)
- [x] PWA support
- [x] SEO meta tags
- [x] Responsive mobile-first design
- [x] Rate limiting, Helmet, input validation
- [x] Skeleton loaders, toast notifications
- [x] WhatsApp floating button
- [x] Newsletter subscription
- [x] Recently viewed projects (localStorage)

## License

MIT — Built for VG PHOTOSTUDIO
