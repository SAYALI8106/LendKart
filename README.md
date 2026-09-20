# LendKart — Premium 3D Community Rental Marketplace

> **“Don’t Buy It. Lend It.”**
> A modern, peer-to-peer equipment sharing marketplace designed to eliminate unnecessary consumer purchases, cut electronic waste, and empower communities to earn passive income from idle belongings.

---

## 🌟 Key Product Features

- **Futuristic 3D Ecosystem Hero**: Interactive Three.js / React Three Fiber / Drei composition with subtle mouse parallax, physically based materials, and a graceful 2D canvas fallback.
- **Intelligent Rental Booking Engine**: Real-time date overlap prevention query, interactive rental calendar, dynamic price calculator (`Days × Price + Security Deposit = Total`), and 4-step rental checkout wizard.
- **Dual Dashboard Architecture**:
  - **Borrower Console**: Real-time reservation status badges (`Pending`, `Approved`, `Active`, `Completed`, `Cancelled`, `Rejected`), pickup details, and post-return review prompts.
  - **Lender Console**: Listed equipment management, 1-click **Approve** and **Reject** modal with reason tracking, and earnings overview.
- **Admin Control Center**: Moderation for users (suspend/reactivate), listings (flag/publish), transaction audit logs, and Recharts analytics (monthly rental volumes and category distribution).
- **Multi-Step Listing Wizard**: 5-step intuitive wizard with real-time live preview card, photo upload with drag-and-drop preview/reorder, pricing guidance, and custom rental rules.
- **Digital Marketing Landing Page (`/rent/projector`)**: High-converting Google Ads landing funnel with tailored benefits, comparison tables (Buying ₹45,000 vs. Renting ₹450), and direct CTAs.
- **SEO & Google Analytics 4**: Semantic HTML5, dynamic title and Open Graph tags, canonical URLs, `sitemap.xml`, `robots.txt`, and decoupled GA4 event tracking.
- **Instant 1-Click Demo Logins**: Test accounts with pre-filled credentials for Admin, Lender, and Borrower on the Sign-In page.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Lucide React, Framer Motion, Recharts |
| **3D Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Backend** | Node.js (ES Modules), Express.js, MongoDB, Mongoose |
| **Security** | JSON Web Tokens (JWT), bcryptjs, Helmet, CORS, Express-Rate-Limit |
| **State / Utils**| React Context (Auth, Theme, Wishlist), Axios, Canvas Confetti |

---

## 📁 Repository Architecture

```text
DM Project/
├── package.json                 # Root script runner (concurrently run both services)
├── README.md                    # Platform documentation
├── server/
│   ├── package.json
│   ├── server.js                # Express API entrypoint
│   ├── config/
│   │   └── db.js                # MongoDB Mongoose connection
│   ├── models/                  # User, Item, Rental, Review, Wishlist, Category, Blog, Notification
│   ├── controllers/             # Auth, Item, Rental, Review, Wishlist, Notification, Blog, Admin
│   ├── routes/                  # REST API route declarations
│   ├── middleware/              # Auth, Centralized Error Handling, Rate Limiter
│   └── seed/
│       ├── seedData.js          # Realistic demo dataset (20 users, 31 items, categories, blogs)
│       └── seeder.js            # Automated database seeder
└── client/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html               # Semantic HTML & Google Fonts
    ├── public/
    │   ├── favicon.svg
    │   ├── robots.txt
    │   └── sitemap.xml
    └── src/
        ├── App.jsx              # Application router
        ├── index.css            # Design tokens & glassmorphic system
        ├── components/
        │   ├── 3d/              # HeroScene (Three.js), FallbackHero2D, TiltCard
        │   ├── common/          # Navbar, Footer, Button, GlassCard, Modal, Skeleton, SEO
        │   ├── marketplace/     # ItemCard, CategoryCard, SearchBar, RentalCalendar, FilterSidebar
        │   └── notifications/   # NotificationDropdown
        ├── context/             # AuthContext, ThemeContext, WishlistContext
        ├── pages/               # Home, Explore, ItemDetail, ListItem, Dashboard, Admin, Projector, etc.
        └── services/            # Axios API client, GA4 Analytics
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### 2. Installation
Install dependencies for both frontend and backend:
```bash
# Install root, backend, and frontend packages
npm run install:all
```

Or individually:
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Database Seeding
Populate MongoDB with 20+ realistic users, 31 items across 8 categories, reviews, and test rentals:
```bash
npm run seed
```

### 4. Running the Development Servers
Start both backend API (`http://localhost:5000`) and frontend client (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

Or run separately in two terminals:
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

---

## 🔑 Demo Accounts

For testing, use the instant 1-click buttons on `/login` or enter manually:

| Role | Email | Password | Access Capabilities |
|---|---|---|---|
| **Admin** | `admin@lendkart.demo` | `Password@123` | Analytics, user suspension, item moderation, all audits |
| **Lender** | `user@lendkart.demo` | `Password@123` | Listed equipment, approve/reject rental requests |
| **Borrower** | `rahul@lendkart.demo` | `Password@123` | Book gear, manage rental requests, leave reviews |

---

## 📡 Key REST API Endpoints

### Authentication
- `POST /api/auth/register` — Create new account
- `POST /api/auth/login` — Sign in and retrieve JWT token
- `GET /api/auth/me` — Current authenticated user profile
- `PUT /api/auth/profile` — Update account profile details

### Items & Catalog
- `GET /api/items` — Query items with search, filters (category, price, location, rating), and sorting
- `GET /api/items/featured` — Featured high-demand items
- `GET /api/items/:id` — Single item details with specifications and owner card
- `POST /api/items` — Create new rental listing (authenticated)
- `PUT /api/items/:id` — Update listing (owner or admin)
- `DELETE /api/items/:id` — Remove listing (owner or admin)

### Rentals Booking Engine
- `POST /api/rentals` — Request rental booking with date overlap validation
- `GET /api/rentals/my` — Get user's borrowed rentals by status
- `GET /api/rentals/requests` — Get lender's incoming requests
- `GET /api/rentals/item/:itemId/booked-dates` — Get reserved date blocks for calendar
- `PUT /api/rentals/:id/approve` — Approve booking (owner only)
- `PUT /api/rentals/:id/reject` — Decline booking with reason
- `PUT /api/rentals/:id/complete` — Mark gear as returned

### Admin
- `GET /api/admin/stats` — Platform GMV, user and rental volume metrics
- `GET /api/admin/analytics` — Recharts trend data (monthly activity & category breakdown)
- `PUT /api/admin/users/:id/suspend` — Suspend or reactivate user account
- `PUT /api/admin/items/:id/status` — Toggle item visibility / flagged status

---

## 🛡️ Trust & Safety Design
- **100% Verified Profiles**: SuperLender badges awarded to verified community members.
- **Refundable Security Deposits**: Deposits held safely and released immediately once equipment is inspected.
- **Clear Courtesy Rules**: Equipment-specific rules specified directly on each product listing.
