# LendKart

> **Don't Buy It. Lend It.**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.3.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Mongoose%208.5-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.6-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.166.1-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-Not_Specified-lightgrey)](#license)

LendKart is a modern, community-based item rental marketplace where people can discover, rent, and list rarely-used items instead of purchasing them outright. Built on the MERN stack (MongoDB, Express, React, Node.js), LendKart connects verified neighbors to share high-value products—ranging from 4K projectors and DSLR cameras to camping tents, power tools, gaming consoles, and party equipment.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Key Features](#key-features)
5. [User Roles & Permissions](#user-roles--permissions)
6. [Technology Stack](#technology-stack)
7. [System Architecture](#system-architecture)
8. [Project Structure](#project-structure)
9. [Prerequisites](#prerequisites)
10. [Cloning the Project](#cloning-the-project)
11. [Installation](#installation)
12. [Environment Variables](#environment-variables)
13. [MongoDB Atlas Setup Guide](#mongodb-atlas-setup-guide)
14. [Database Seeding](#database-seeding)
15. [Running the Application](#running-the-application)
16. [Application Routes (Frontend)](#application-routes-frontend)
17. [REST API Documentation (Backend)](#rest-api-documentation-backend)
18. [Authentication & Authorization](#authentication--authorization)
19. [Rental Lifecycle & Overlap Engine](#rental-lifecycle--overlap-engine)
20. [Item Listing Workflow](#item-listing-workflow)
21. [Database Models & Schema Design](#database-models--schema-design)
22. [Database Relationships (ER Diagram)](#database-relationships-er-diagram)
23. [Frontend Architecture](#frontend-architecture)
24. [Backend Architecture](#backend-architecture)
25. [UI/UX & Design System](#uiux--design-system)
26. [Digital Marketing Architecture](#digital-marketing-architecture)
27. [Analytics & Event Tracking](#analytics--event-tracking)
28. [Search Engine Optimization (SEO)](#search-engine-optimization-seo)
29. [Testing & Verification](#testing--verification)
30. [Building for Production](#building-for-production)
31. [Troubleshooting](#troubleshooting)
32. [Git Collaboration Guide](#git-collaboration-guide)
33. [Team Development Rules](#team-development-rules)
34. [Branch Strategy](#branch-strategy)
35. [Code Contribution Guidelines](#code-contribution-guidelines)
36. [Security Best Practices](#security-best-practices)
37. [Performance Considerations](#performance-considerations)
38. [Future Scope](#future-scope)
39. [Project Status](#project-status)
40. [Team](#team)
41. [License](#license)

---

## 🌐 Project Overview

LendKart is designed to foster a sustainable, high-trust sharing economy within Indian urban communities (Pune, Mumbai, Nashik, Bengaluru, Hyderabad, Delhi, etc.). Consumers frequently require expensive equipment for short periods—such as a 4K projector for a weekend movie screening, a cordless drill for assembling furniture, or a camping tent for a holiday trek.

Instead of spending thousands of rupees to purchase gear that will sit idle in closets for months, users can rent items from verified neighbors at a fraction of retail cost.

### Core User Experiences:
- **Borrower Experience**: Search nearby items by category, location, price, and condition. View high-resolution photos, specifications, and owner profiles. Pick start and end dates on an interactive calendar that computes real-time pricing and security deposits, submit a rental request, track status, and leave community reviews after return.
- **Lender Experience**: List idle gear in under 2 minutes through a 5-step guided wizard with live card preview. Receive real-time rental requests, inspect borrower notes, approve or decline bookings with custom reasons, monitor active rentals, and earn passive income safely protected by refundable security deposits.
- **Admin Experience**: Supervise community health through a centralized control center featuring key performance indicators (gross rental volume, active vs. completed bookings, platform fees), Recharts trend analytics, user moderation (suspend/reactivate accounts), and item listing moderation (flag/unflag gear).

---

## 🎯 Problem Statement

1. **Short-Term Demand vs. Permanent Ownership**: High-utility consumer goods (e.g., projectors, power drills, trekking rucksacks, camera lenses) are often needed for only 24 to 72 hours, yet consumers are forced to purchase them permanently.
2. **Capital Inefficiency**: Buying high-end gear ties up substantial personal capital in depreciating assets that average less than 1% utilization across their lifespan.
3. **Storage & Clutter**: Urban apartments have limited physical storage space for bulky items like 4-person tents, roof racks, and party boomboxes.
4. **Electronic Waste & Environmental Impact**: The redundant manufacturing and disposal of single-use or rarely-used electronics dramatically accelerates landfill waste.
5. **Lack of Local Trust Infrastructure**: Without escrowed deposits, government ID verification, and transparent mutual reviews, individuals are hesitant to lend expensive personal items to strangers.

---

## 💡 Solution

LendKart provides an end-to-end community rental engine:
- **Financial Velocity**: Borrowers access premium equipment at 5% to 10% of retail price.
- **Passive Income**: Lenders monetize dormant assets with guaranteed refundable deposits.
- **Overlap-Safe Scheduling**: Smart calendar query algorithms prevent conflicting bookings for the same equipment.
- **Trust Architecture**: Verified user badges, community reviews, and transparent security deposit tracking eliminate rental anxiety.
- **Eco-Conscious Circular Economy**: Reusing existing items within neighborhood clusters cuts electronic manufacturing demand and domestic waste.

---

## ⚡ Key Features

### 👤 User Features
- **Account Registration & Authentication**: Secure sign-up and sign-in with bcrypt password hashing and 30-day JWT sessions.
- **1-Click Demo Login Bar**: Instant test access buttons on `/login` for Admin, Lender, and Borrower.
- **User Profile Management**: Update avatar URL, phone, city location, and bio; view verified member badges and average community rating.
- **In-App Notifications**: Real-time notifications dropdown with unread badge counter, individual mark-as-read, and mark-all-as-read controls.
- **Saved Wishlist**: 1-click bookmarking of items with dedicated `/wishlist` management grid and empty state.

### 📦 Lender Features
- **5-Step Item Listing Wizard (`/list-item`)**:
  1. *Category & Core Details* (title, category slug, condition, location)
  2. *Detailed Description & Rental Rules* (courtesy checklist, damage policies)
  3. *Technical Specifications Grid* (key-value parameter builder)
  4. *High-Resolution Photo URLs* (preview thumbnail gallery with instant removal)
  5. *Pricing & Security Deposit Setup* (daily rate in INR, deposit, live earnings estimator, and real-time live preview card)
- **Lender Dashboard Console (`/dashboard` -> Lending Tab)**:
  - Overview of all listed equipment with real-time status (`available`, `rented`, `paused`, `flagged`).
  - Incoming rental requests inbox displaying borrower details, requested date range, total payout, and borrower notes.
  - 1-Click modal approval and decline with custom rejection reason recording.
  - Active and completed rental fulfillment tracking.

### 🛒 Borrower Features
- **Search & Advanced Discovery (`/explore`)**:
  - Keyword search across titles, descriptions, and city locations.
  - Filter sidebar supporting category chips, interactive price range slider (₹0 to ₹2,000/day), city selector, condition filters (*Like New*, *Excellent*, *Good*, *Fair*), and minimum star ratings.
  - Sorting by Recommended, Price (Low to High), Price (High to Low), and Highest Rated.
  - Responsive mobile filter modal and clear-all filter chips.
- **Product & Rental Detail View (`/items/:id`)**:
  - Image gallery with zoom preview.
  - Sticky rental booking summary sidebar.
  - Dynamic interactive calendar highlighting booked vs. available dates to avoid overlaps.
  - Technical specifications grid and lender rental rules checklist.
  - SuperLender trust badge and verified owner profile tile.
  - Verified community reviews list and review submission form.
  - Similar items recommendation carousel.
- **Rental Request Wizard (4-Step Modal)**:
  1. *Date Selection* with real-time duration and price computation.
  2. *Logistics & Delivery* (Self Pickup vs. Owner Delivery) and custom note for the lender.
  3. *Financial Review* detailing rental fee, refundable security deposit, and total estimated payable amount.
  4. *Submission & Confetti Celebration* with status redirected to dashboard.
- **Borrower Dashboard Console (`/dashboard` -> Borrowing Tab)**:
  - Real-time status filtering (`All`, `Pending`, `Approved`, `Active`, `Completed`, `Cancelled`, `Rejected`).
  - Rental timeline tracking, pickup addresses, lender contact information, and cancellation actions.

### 🛡️ Admin Features (`/admin`)
- **Executive KPI Tiles**: Total Registered Users, Active Equipment Listings, Total Rental Bookings, Active Rentals, Completed Bookings, Gross Platform Rental Volume (INR), and Platform Revenue (10% commission).
- **Recharts Data Visualizations**:
  - Monthly rental volume & revenue trajectory area chart.
  - Category item distribution breakdown pie chart.
- **User Moderation Console**: View all community members, verification status, contact details, registration dates, and 1-click account suspension/reactivation.
- **Equipment Moderation Console**: View all marketplace items, owners, pricing, and toggle status flags (`available`, `paused`, `flagged`).
- **Audit Logs Table**: Inspect complete platform rental records with borrower, owner, date windows, fee breakdowns, and real-time statuses.

---

## 👥 User Roles & Permissions

| Role | Description | Permissions & Access Scope |
|---|---|---|
| **Guest / Anonymous** | Unauthenticated visitor | Browse homepage, explore catalog, search items, view item details, view booked dates, read blog articles, view landing pages, submit contact inquiries, register, and log in. |
| **Registered User** | Authenticated community member | All Guest permissions + list items, edit/delete owned listings, request rentals, view personal borrowing & lending dashboard, approve/reject incoming requests, toggle wishlist items, receive notifications, leave reviews, and update profile. |
| **Admin** | System administrator | All Registered User permissions + access `/admin` dashboard, view system-wide KPI metrics and charts, suspend/reactivate user accounts, flag/unflag any marketplace item, and audit all platform rental transactions. |

---

## 🛠️ Technology Stack

### Frontend Application (`client/`)
| Category | Technology | Version | Purpose |
|---|---|---|---|
| Framework | **React** | `^18.3.1` | Declarative component-based user interface |
| Build Tool | **Vite** | `^5.3.4` | High-speed local dev server and Rollup production bundler |
| Routing | **React Router DOM** | `^6.25.1` | Client-side declarative routing and navigation |
| Styling | **Tailwind CSS** | `^3.4.6` | Utility-first design tokens and responsive styling |
| 3D Graphics | **Three.js** | `^0.166.1` | WebGL 3D graphics rendering engine |
| 3D React Binding | **@react-three/fiber**| `^8.16.8` | Declarative Three.js scene graph in React |
| 3D Helpers | **@react-three/drei** | `^9.108.4` | Orbit controls, float mechanics, and lighting helpers |
| Animations | **Framer Motion** | `^11.3.8` | Smooth layout transitions and scroll reveal micro-interactions |
| Data Charts | **Recharts** | `^2.12.7` | SVG-based responsive analytics charts for Admin dashboard |
| Icons | **Lucide React** | `^0.408.0` | Comprehensive icon library |
| HTTP Client | **Axios** | `^1.7.2` | Promise-based REST API client with JWT interceptors |
| Utilities | **clsx** / **tailwind-merge** | `^2.1.1` / `^2.4.0` | Conditional CSS class resolution |
| Visual Effects | **canvas-confetti** | `^1.9.3` | Confetti celebration on rental submission |

### Backend Service (`server/`)
| Category | Technology | Version | Purpose |
|---|---|---|---|
| Runtime | **Node.js** | `>=18` (ESM) | JavaScript runtime engine |
| Web Framework | **Express.js** | `^4.19.2` | RESTful API server routing and middleware pipeline |
| Database | **MongoDB Atlas** | Cluster0 | Cloud NoSQL document database |
| ODM | **Mongoose** | `^8.5.1` | Schema modeling, data validation, and aggregation |
| Authentication | **jsonwebtoken (JWT)** | `^9.0.2` | Stateless bearer token session management |
| Password Hashing | **bcryptjs** | `^2.4.3` | Salted one-way cryptographic password hashing |
| Security Headers | **Helmet** | `^7.1.0` | HTTP response header hardening |
| Cross-Origin | **CORS** | `^2.8.5` | Cross-Origin Resource Sharing policy management |
| Rate Limiting | **express-rate-limit** | `^7.3.1` | IP-based request throttling against brute force/DDoS |
| HTTP Logger | **Morgan** | `^1.10.0` | HTTP request/response terminal logging |
| Environment | **dotenv** | `^16.4.5` | Twelve-factor `.env` configuration loader |
| Dev Process | **Nodemon** | `^3.1.4` | Automated backend server reload on file changes |

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client Layer (React 18 + Vite :5173)"]
        UI[Pages & Components]
        Context[Auth / Theme / Wishlist Contexts]
        Axios[Axios API Client + Interceptors]
        Three[Three.js 3D Canvas / Drei]
    end

    subgraph Gateway ["Network & Security Layer"]
        Proxy[Vite Dev Proxy / Reverse Proxy]
        RateLimit[express-rate-limit]
        HelmetSec[Helmet Headers & CORS]
    end

    subgraph Server ["Server Layer (Express.js :5000)"]
        Router[API Route Handlers]
        AuthMW[JWT Auth Middleware & Admin Guard]
        Controllers[Business Logic Controllers]
    end

    subgraph Data ["Database Layer (MongoDB Atlas Cluster0)"]
        Models[Mongoose Schemas & Hooks]
        DB[(lendkart Database)]
    end

    UI --> Context
    UI --> Three
    UI --> Axios
    Axios --> Proxy
    Proxy --> RateLimit
    RateLimit --> HelmetSec
    HelmetSec --> Router
    Router --> AuthMW
    AuthMW --> Controllers
    Controllers --> Models
    Models --> DB
```

### Component Roles:
1. **Frontend**: Manages client routing, responsive UI, micro-animations, local state, and JWT persistence in browser `localStorage`.
2. **Axios Client**: Automatically attaches `Authorization: Bearer <token>` on all outgoing requests and redirects on `401 Unauthorized`.
3. **Middleware**: Validates tokens, checks user account suspension status, enforces role boundaries, and throttles abuse.
4. **Controllers**: Execute business logic, compute financial breakdown calculations, perform date overlap checks, and create audit trails.
5. **Mongoose Models**: Enforce schemas, unique compound indexes, reference integrity, and automated password hashing.
6. **MongoDB Atlas**: Cloud persistent storage hosting all 8 collections.

---

## 📁 Project Structure

```text
LendKart/
├── package.json                 # Root script runner (concurrently manages server & client)
├── README.md                    # Complete project documentation
├── server/                      # Express REST API Backend
│   ├── package.json             # Backend dependencies & seed script
│   ├── server.js                # Express app initialization & middleware configuration
│   ├── .env                     # Local environment secrets (DO NOT COMMIT)
│   ├── .env.example             # Environment template for developers
│   ├── .gitignore               # Server ignore rules
│   ├── config/
│   │   └── db.js                # Mongoose connection with DNS fallback resolution
│   ├── models/                  # Mongoose Schema Definitions
│   │   ├── User.js              # User schema with bcrypt pre-save hashing & methods
│   │   ├── Category.js          # Marketplace category schema with itemCount
│   │   ├── Item.js              # Item listing schema with full specifications
│   │   ├── Rental.js            # Rental booking schema with compound indexes
│   │   ├── Review.js            # Review schema with unique rental-reviewer constraint
│   │   ├── Wishlist.js          # Wishlist schema with unique user-item constraint
│   │   ├── Notification.js      # User notification schema
│   │   └── Blog.js              # Editorial SEO blog schema
│   ├── controllers/             # REST Controller Implementations
│   │   ├── authController.js    # Register, login, getMe, updateProfile
│   │   ├── itemController.js    # CRUD, search, filter, categories, featured, similar
│   │   ├── rentalController.js  # Create request, overlap check, approve, reject, cancel, complete
│   │   ├── reviewController.js  # Create review, list item reviews
│   │   ├── wishlistController.js# Get wishlist, toggle item bookmark, check status
│   │   ├── notificationController.js # List notifications, mark read, mark all read
│   │   ├── blogController.js    # List blogs, get by slug, create blog
│   │   └── adminController.js   # Overview stats, analytics, user/item moderation
│   ├── routes/                  # Express Router Modules
│   │   ├── authRoutes.js        # /api/auth
│   │   ├── itemRoutes.js        # /api/items
│   │   ├── rentalRoutes.js      # /api/rentals
│   │   ├── reviewRoutes.js      # /api/reviews
│   │   ├── wishlistRoutes.js    # /api/wishlist
│   │   ├── notificationRoutes.js# /api/notifications
│   │   ├── blogRoutes.js        # /api/blogs
│   │   └── adminRoutes.js       # /api/admin
│   ├── middleware/              # Express Custom Middleware
│   │   ├── auth.js              # protect, optionalAuth, adminOnly
│   │   ├── error.js             # Centralized error handler & Mongoose error formatter
│   │   └── rateLimiter.js       # generalLimiter, authLimiter
│   └── seed/                    # Database Seeding Engine
│       ├── seedData.js          # Raw data for 10 categories, 22 users, 8 SEO blogs
│       └── seeder.js            # Automated Atlas connection, wiper, seeder & validator
└── client/                      # React 18 Frontend
    ├── package.json             # Frontend dependencies & build scripts
    ├── vite.config.js           # Vite config with dev server proxy to localhost:5000
    ├── tailwind.config.js       # Custom design tokens (Evergreen, Sage, Sand, Terracotta)
    ├── postcss.config.js        # PostCSS Tailwind plugins
    ├── index.html               # HTML5 shell with Google Fonts & OpenGraph metadata
    ├── .gitignore               # Client ignore rules
    ├── public/                  # Static Assets
    │   ├── favicon.svg          # SVG brand icon
    │   ├── robots.txt           # Search crawler directives
    │   └── sitemap.xml          # XML sitemap for SEO discovery
    └── src/                     # React Application Source
        ├── main.jsx             # React DOM root render
        ├── App.jsx              # Application router & route layout
        ├── index.css            # Tailwind directives, CSS variables & scrollbar styles
        ├── context/             # React Context Providers
        │   ├── AuthContext.jsx  # Authentication session, login, register, profile
        │   ├── ThemeContext.jsx # Light / Dark mode toggler with localStorage sync
        │   └── WishlistContext.jsx # Real-time saved items state & badge sync
        ├── services/            # API Communication Layer
        │   ├── api.js           # Axios instance with request/response interceptors
        │   ├── itemService.js   # Catalog query abstraction
        │   ├── rentalService.js # Booking request & dashboard abstraction
        │   └── analytics.js     # Google Analytics 4 decoupled event tracker
        ├── utils/               # Helper Utilities
        │   └── formatters.js    # Currency (INR) and date formatting helpers
        ├── components/          # Reusable Component Library
        │   ├── 3d/              # 3D Graphics
        │   │   ├── HeroScene.jsx# Three.js / Canvas floating gear showcase
        │   │   ├── FallbackHero2D.jsx # Non-WebGL 2D responsive fallback
        │   │   └── TiltCard.jsx # Mouse-tracking 3D tilt component
        │   ├── common/          # Atomic Design Components
        │   │   ├── Navbar.jsx   # Top navigation with sticky scroll transition & mobile drawer
        │   │   ├── Footer.jsx   # Footer with site links, copyright & category directory
        │   │   ├── Button.jsx   # Variant-based button (primary, outline, accent, ghost)
        │   │   ├── Badge.jsx    # Status & category pills
        │   │   ├── Modal.jsx    # Accessible modal container with backdrop blur
        │   │   ├── EmptyState.jsx # Branded empty state component
        │   │   ├── Skeleton.jsx # Shimmer loading placeholder components
        │   │   └── SEO.jsx      # Dynamic document title, meta description & GA4 pageview
        │   ├── marketplace/     # Business-Specific Components
        │   │   ├── ItemCard.jsx # Product card with hover zoom, price tag & wishlist heart
        │   │   ├── CategoryCard.jsx # Category card with icon & item count badge
        │   │   ├── SearchBar.jsx# Multi-field search bar with category & city selectors
        │   │   ├── FilterSidebar.jsx # Explore sidebar with price slider & condition pills
        │   │   ├── RentalCalendar.jsx # Interactive date picker with booked blocks
        │   │   └── RentalRequestModal.jsx # 4-step rental checkout wizard
        │   └── notifications/   # Notification dropdown panel
        │       └── NotificationDropdown.jsx
        └── pages/               # Top-Level Page Views
            ├── HomePage.jsx     # Hero, 3D gear, categories, featured, how it works, stats
            ├── ExplorePage.jsx  # Full catalog discovery with active filter chips
            ├── ItemDetailPage.jsx # Product gallery, specs, rules, calendar, reviews
            ├── ListItemWizard.jsx # 5-step listing wizard with live preview card
            ├── DashboardPage.jsx# Dual Borrower / Lender console with request approvals
            ├── AdminDashboardPage.jsx # KPI tiles, Recharts trends & moderation tables
            ├── WishlistPage.jsx # Saved gear bookmark collection
            ├── ProfilePage.jsx  # User details, verification badge & address settings
            ├── BlogIndexPage.jsx# Editorial magazine index
            ├── BlogPostPage.jsx # Full-width editorial article reader with related posts
            ├── ProjectorLandingPage.jsx # Google Ads landing funnel with comparison table
            ├── ContactPage.jsx  # Concierge support card & message inquiry form
            ├── LoginPage.jsx    # Warm auth card with 1-click demo logins
            ├── RegisterPage.jsx # User sign-up form with instant auto-login
            └── NotFoundPage.jsx # Custom 404 page with return actions
```

---

## 💻 Prerequisites

Ensure your development machine has the following tools installed:
- **Node.js**: `v18.0.0` or higher (tested on Node v20 & v24). Check with:
  ```bash
  node -v
  ```
- **npm**: `v9.0.0` or higher. Check with:
  ```bash
  npm -v
  ```
- **Git**: `v2.30.0` or higher. Check with:
  ```bash
  git --version
  ```
- **MongoDB**: Either a free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB server running on `mongodb://127.0.0.1:27017/lendkart`.
- **Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari with WebGL enabled (for 3D hero visualization).

---

## 📥 Cloning the Project

Clone the official GitHub repository to your local computer:

```bash
git clone https://github.com/SAYALI8106/LendKart.git
cd LendKart
```

---

## 📦 Installation

LendKart is organized as a unified monorepo. Install dependencies for the root coordinator, backend server, and frontend client:

### Option A: Automated One-Command Installation (Recommended)
```bash
npm run install:all
```
*This command executes `npm install` in root, `cd server && npm install`, and `cd client && npm install` consecutively.*

### Option B: Step-by-Step Installation
```bash
# 1. Install root workspace packages (concurrently)
npm install

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Return to root directory
cd ..
```

---

## 🔑 Environment Variables

The backend requires environment variables configured in `server/.env`. A template is provided at `server/.env.example`.

### Creating Your `.env` File
In the `server/` directory, create `.env`:

```bash
cd server
cp .env.example .env
```

### Required Variables (`server/.env`)
| Variable | Example Value | Description |
|---|---|---|
| `PORT` | `5000` | Port on which Express server listens |
| `NODE_ENV` | `development` | Runtime environment (`development` or `production`) |
| `MONGO_URI` | `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/lendkart?retryWrites=true&w=majority` | MongoDB connection URI string (Atlas or Local) |
| `JWT_SECRET` | `lendkart_super_secret_jwt_key_2026_xyz` | Secret key used to sign and verify JSON Web Tokens |
| `CLIENT_URL` | `http://localhost:5173` | Allowed frontend origin for CORS whitelist |

### Optional Frontend Variables (`client/.env`)
| Variable | Example Value | Description |
|---|---|---|
| `VITE_API_URL` | `/api` | Base API prefix (defaults to `/api` which Vite proxies to `http://localhost:5000`) |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Optional Google Analytics 4 Measurement ID for live event tracking |

> [!CAUTION]
> **SECURITY WARNING**: NEVER commit `.env` files, production database connection strings, passwords, or JWT secrets to Git. Verify that `.env` is listed in both `server/.gitignore` and `client/.gitignore`.

---

## 🍃 MongoDB Atlas Setup Guide

Follow these steps to connect LendKart to a free cloud MongoDB Atlas cluster:

1. **Sign Up / Log In**: Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in.
2. **Create a Free Cluster**: Select **M0 Free Tier** (Shared), select your nearest cloud region (e.g., AWS `ap-south-1` Mumbai), and click **Create Deployment**.
3. **Configure Database Access (User)**:
   - In Atlas left sidebar, go to **Security** -> **Database Access**.
   - Click **Add New Database User**.
   - Select **Password Authentication**.
   - Enter a username (e.g., `lendkart_admin`) and a strong password.
   - Set Database User Privileges to **Read and write to any database**.
   - Click **Add User**.
4. **Configure Network Access (IP Whitelist)**:
   - In left sidebar, go to **Security** -> **Network Access**.
   - Click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) for local development, or add your current public IP address.
   - Click **Confirm**.
5. **Retrieve Connection String**:
   - Go to **Deployment** -> **Database**.
   - Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the SRV connection string:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority
     ```
6. **Set Target Database Name**:
   - Replace `<username>` and `<password>` with your created database credentials.
   - Append the database name `lendkart` before the `?` query parameters:
     ```text
     mongodb+srv://lendkart_admin:YourSecurePassword@cluster0.xxx.mongodb.net/lendkart?retryWrites=true&w=majority
     ```
7. **Paste into `server/.env`**:
   - Assign this URI to `MONGO_URI` in `server/.env`.
   - *Note: In MongoDB Atlas, the database and its collections will become visible in the Atlas Cloud Console immediately after running the seed command.*

---

## 🌱 Database Seeding

LendKart includes an automated, relationship-safe database seeder that connects directly to your configured `MONGO_URI`, clears previous application collections, inserts rich demo data, recalculates item ratings, and validates reference integrity.

### Execute Seed Command
Run from the project root:
```bash
npm run seed
```
*(Alternatively: `cd server && npm run seed`)*

### What the Seeder Populates:
| Collection | Document Count | Contents |
|---|---|---|
| **`categories`** | **10** | Electronics, Photography, Power Tools, Outdoor, Gaming, Audio, Sports, Events, Travel, Home |
| **`users`** | **22** | Admin, Lenders, Borrowers with realistic Indian profiles (Pune, Mumbai, Nashik, Bengaluru, Delhi, etc.) |
| **`items`** | **33** | High-demand equipment with high-resolution Unsplash photos, specifications, condition, rules, and daily INR rates |
| **`rentals`** | **20** | Connected bookings covering `Pending`, `Approved`, `Active`, `Completed`, `Cancelled`, and `Rejected` statuses |
| **`reviews`** | **21** | Authentic 3-to-5 star reviews with genuine user feedback linked to completed bookings |
| **`wishlists`** | **16** | Bookmarked items across users (e.g., Rahul has 5 items saved on his wishlist) |
| **`notifications`**| **10** | Read & unread alerts (`rental_request`, `rental_active`, `rental_completed`, `review_received`, `system`) |
| **`blogs`** | **8** | In-depth SEO editorial articles on rental economics, projectors, cameras, tools, and sustainability |

### 🔑 Seeded Demo Login Credentials (DEVELOPMENT / DEMO ONLY)

| Role | Account Name | Email Address | Demo Password | Purpose |
|---|---|---|---|---|
| **Admin** | Aarav Sharma | `admin@lendkart.demo` | `Admin@123` | Control center, moderation, Recharts analytics |
| **Lender** | Pooja Deshmukh | `user@lendkart.demo` | `User@123` | Listed equipment, incoming requests, completed payouts |
| **Borrower** | Rahul Kulkarni | `rahul@lendkart.demo` | `User@123` | Active rentals, wishlist, booking requests, reviews |

*(Note: On the `/login` page, you can also click any of the 1-click demo buttons to automatically populate and submit these credentials).*

---

## 🚀 Running the Application

### Option A: Run Both Services Concurrently (Recommended)
From the project root directory, run:
```bash
npm run dev
```
*This launches the backend API on `http://localhost:5000` and the Vite dev server on `http://localhost:5173` concurrently with live log streaming.*

### Option B: Run in Separate Terminals
**Terminal 1 (Backend API Server)**:
```bash
cd server
npm run dev
```
*Runs Nodemon on `http://localhost:5000`.*

**Terminal 2 (Frontend Client)**:
```bash
cd client
npm run dev
```
*Runs Vite on `http://localhost:5173`.*

### Access URLs:
- **Frontend Web Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API Base**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🗺️ Application Routes (Frontend)

| Route Path | View Component | Description | Access Level |
|---|---|---|---|
| `/` | `HomePage` | Hero with 3D canvas, categories, featured gear, how it works, live stats, CTA banner | Public |
| `/explore` | `ExplorePage` | Full catalog discovery with search, category chips, price slider, condition, sorting | Public |
| `/items/:id` | `ItemDetailPage` | Product gallery, specifications, rental rules, interactive calendar, reviews | Public |
| `/list-item` | `ListItemWizard` | 5-step guided item listing wizard with real-time live preview card | Registered User |
| `/dashboard` | `DashboardPage` | Dual console: Borrowing tab (rentals) & Lending tab (requests & listed gear) | Registered User |
| `/admin` | `AdminDashboardPage` | Executive KPIs, Recharts charts, user suspension, item moderation | Admin Only |
| `/wishlist` | `WishlistPage` | Saved gear bookmarks collection with custom empty state | Registered User |
| `/profile` | `ProfilePage` | Account credentials, phone, city, bio, and SuperLender verification badge | Registered User |
| `/blog` | `BlogIndexPage` | Editorial publication with category tags, reading times, and authors | Public |
| `/blog/:slug` | `BlogPostPage` | Editorial reading experience with related reading recommendations | Public |
| `/rent/projector`| `ProjectorLandingPage`| Google Ads landing page with Buying vs. Renting comparison table | Public |
| `/contact` | `ContactPage` | Concierge support card, operating hours, and inquiry message form | Public |
| `/login` | `LoginPage` | Sign-in portal with 1-click instant demo login buttons | Public |
| `/register` | `RegisterPage` | Account creation form with immediate auto-login | Public |
| `*` | `NotFoundPage` | Custom branded 404 page with return home & explore CTAs | Public |

---

## 📡 REST API Documentation (Backend)

### 1. Authentication Endpoints (`/api/auth`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register new account & return JWT | None | `{ name, email, password, phone, location }` |
| `POST` | `/api/auth/login` | Authenticate credentials & return JWT | None (Rate Limited) | `{ email, password }` |
| `GET` | `/api/auth/me` | Retrieve profile of authenticated user | Bearer Token | None |
| `PUT` | `/api/auth/profile` | Update profile (name, phone, location, bio, avatar) | Bearer Token | `{ name, phone, location, bio, avatar }` |

### 2. Items & Marketplace Endpoints (`/api/items`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `GET` | `/api/items` | Query catalog with search, filters, pagination | None | Query: `search, category, minPrice, maxPrice, location, condition, minRating, owner, sort, page, limit` |
| `GET` | `/api/items/featured` | Fetch featured high-demand equipment | None | Query: `limit` (default: 8) |
| `GET` | `/api/items/categories/all` | Fetch all 10 categories with dynamic item counts | None | None |
| `GET` | `/api/items/:id` | Fetch single item with populated owner and category | None | Params: `id` |
| `GET` | `/api/items/:id/similar` | Fetch similar items in the same category | None | Params: `id` |
| `POST` | `/api/items` | Create new equipment listing | Bearer Token | `{ title, description, category, images, pricePerDay, securityDeposit, condition, location, rentalRules, specifications }` |
| `PUT` | `/api/items/:id` | Update equipment listing | Bearer Token (Owner/Admin) | Fields to update |
| `DELETE`| `/api/items/:id` | Remove equipment listing | Bearer Token (Owner/Admin) | Params: `id` |

### 3. Rental Booking Endpoints (`/api/rentals`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `POST` | `/api/rentals` | Request rental with date overlap check | Bearer Token | `{ itemId, startDate, endDate, deliveryOption, borrowerNote }` |
| `GET` | `/api/rentals/my` | Get current user's borrowed rentals | Bearer Token | Query: `status` (`All`, `Pending`, `Active`, etc.) |
| `GET` | `/api/rentals/requests` | Get lender's incoming rental requests | Bearer Token | Query: `status` |
| `GET` | `/api/rentals/item/:itemId/booked-dates` | Get reserved date ranges for calendar | None | Params: `itemId` |
| `PUT` | `/api/rentals/:id/approve` | Approve rental request | Bearer Token (Owner) | Params: `id` |
| `PUT` | `/api/rentals/:id/reject` | Decline rental request | Bearer Token (Owner) | Body: `{ reason }` |
| `PUT` | `/api/rentals/:id/cancel` | Cancel rental reservation | Bearer Token (Borrower/Owner)| Params: `id` |
| `PUT` | `/api/rentals/:id/complete` | Mark rental as completed | Bearer Token (Owner) | Params: `id` |

### 4. Reviews Endpoints (`/api/reviews`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `GET` | `/api/reviews/item/:id` | Get all verified reviews for an item | None | Params: `id` (Item ID) |
| `POST` | `/api/reviews` | Create review for an item/rental | Bearer Token | `{ itemId, rentalId, rating, comment }` |

### 5. Wishlist Endpoints (`/api/wishlist`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `GET` | `/api/wishlist` | Get current user's bookmarked items | Bearer Token | None |
| `POST` | `/api/wishlist/:itemId` | Toggle item in user's wishlist | Bearer Token | Params: `itemId` |
| `GET` | `/api/wishlist/check/:itemId`| Check if item is saved in wishlist | Bearer Token | Params: `itemId` |

### 6. Notifications Endpoints (`/api/notifications`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `GET` | `/api/notifications` | Get user notifications & unread count | Bearer Token | None |
| `PUT` | `/api/notifications/:id/read` | Mark single notification as read | Bearer Token | Params: `id` |
| `PUT` | `/api/notifications/read-all` | Mark all notifications as read | Bearer Token | None |

### 7. Editorial Blog Endpoints (`/api/blogs`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `GET` | `/api/blogs` | Get all published articles with tags | None | None |
| `GET` | `/api/blogs/:slug` | Get article by slug + 3 related articles | None | Params: `slug` |
| `POST` | `/api/blogs` | Publish new blog article | Bearer Token (Admin Only) | Article fields |

### 8. Admin Control Center Endpoints (`/api/admin`)
| Method | Endpoint | Description | Auth Required | Body / Parameters |
|---|---|---|---|---|
| `GET` | `/api/admin/stats` | System overview KPIs & gross revenue | Bearer Token (Admin Only) | None |
| `GET` | `/api/admin/analytics` | Recharts monthly volume & category distribution | Bearer Token (Admin Only) | None |
| `GET` | `/api/admin/users` | List all users with status for moderation | Bearer Token (Admin Only) | None |
| `PUT` | `/api/admin/users/:id/suspend` | Suspend or reactivate user account | Bearer Token (Admin Only) | Params: `id` |
| `GET` | `/api/admin/items` | List all marketplace items for moderation | Bearer Token (Admin Only) | None |
| `PUT` | `/api/admin/items/:id/status` | Change item status (`available`, `flagged`, etc.) | Bearer Token (Admin Only) | Body: `{ status }` |
| `GET` | `/api/admin/rentals` | Audit all platform transactions | Bearer Token (Admin Only) | None |

---

## 🔒 Authentication & Authorization

LendKart employs a stateless, token-based authentication architecture:

```text
Registration / Login (POST /api/auth/login)
               │
               ▼
Mongoose Model compares entered password using bcrypt.compare()
               │
               ▼
jsonwebtoken generates signed token: { id: user._id, role: user.role }
               │
               ▼
Client receives JWT & saves to localStorage ('lendkart_token')
               │
               ▼
Axios Request Interceptor injects 'Authorization: Bearer <token>'
               │
               ▼
Server Middleware 'protect':
  1. Decodes JWT via process.env.JWT_SECRET
  2. Queries User by ID (excluding password hash)
  3. Validates account status (rejects if isSuspended == true)
  4. Attaches user document to Express req.user
               │
               ▼
Server Middleware 'adminOnly':
  Checks if req.user.role === 'admin' before granting access
```

---

## 🔄 Rental Lifecycle & Overlap Engine

```mermaid
stateDiagram-v2
    [*] --> Discovery: Borrower views item on /explore or /items/:id
    Discovery --> DateSelection: Selects Start & End Dates on Calendar
    DateSelection --> OverlapCheck: Overlap Query checks existing Approved/Active dates
    OverlapCheck --> DateSelection: Conflict Detected (Date Blocked)
    OverlapCheck --> RequestSubmitted: No Conflict -> POST /api/rentals (Status: Pending)
    RequestSubmitted --> NotificationOwner: Notification sent to Item Owner
    NotificationOwner --> OwnerDecision: Owner reviews on /dashboard
    OwnerDecision --> Rejected: Owner rejects with reason -> Borrower notified
    OwnerDecision --> Approved: Owner approves -> Dates locked
    Approved --> Active: Pickup completed -> Item handed over
    Active --> Completed: Item returned & inspected -> Owner marks complete
    Completed --> ReviewSubmitted: Borrower/Lender submits verified review
    ReviewSubmitted --> [*]
```

### Date Overlap Prevention Algorithm
When a borrower requests a rental, the backend executes an atomic MongoDB overlap query:
```javascript
const existingBooking = await Rental.findOne({
  item: itemId,
  status: { $in: ['Approved', 'Active'] },
  $or: [
    { startDate: { $lte: end }, endDate: { $gte: start } }
  ]
});
```
If an overlapping reservation exists, the request is rejected with HTTP 400 (`"The requested dates are already booked for this item"`). Additionally, the frontend `RentalCalendar` queries `/api/rentals/item/:id/booked-dates` and renders reserved ranges in muted red with disabled selection.

### Financial Calculation Formula
$$\text{Days} = \max\left(1, \left\lceil \frac{\text{EndDate} - \text{StartDate}}{86,400,000 \text{ ms}} \right\rceil\right)$$
$$\text{Rental Fee} = \text{Days} \times \text{PricePerDay}$$
$$\text{Total Payable} = \text{Rental Fee} + \text{Security Deposit}$$

---

## 📝 Item Listing Workflow

Users list equipment through the 5-step interactive wizard (`/list-item`):

1. **Step 1: Classification & Location**
   - Provide listing title (max 100 characters).
   - Select 1 of 10 marketplace categories.
   - Select equipment condition (*Like New*, *Excellent*, *Good*, *Fair*).
   - Specify city / neighborhood location.
2. **Step 2: Description & Safety Rules**
   - Enter detailed equipment overview, usage context, and package contents.
   - Define custom courtesy rules (e.g., *"Handle optical lens with care"*, *"Keep in carrying bag"*).
3. **Step 3: Technical Specifications**
   - Build dynamic key-value pairs (e.g., `Resolution: 4K UHD`, `Battery: 34 mins`, `Included: 2 Controllers`).
4. **Step 4: Photography & Visual Verification**
   - Enter high-resolution image URLs with instant thumbnail preview and removal.
5. **Step 5: Pricing, Deposit & Live Preview**
   - Set daily rental fee (INR, minimum ₹10/day).
   - Set refundable security deposit (INR).
   - View monthly projected earnings calculator.
   - Preview the live interactive `ItemCard` exactly as it will appear in the marketplace.
   - Click **Publish Listing** -> saves to MongoDB Atlas and redirects to dashboard.

---

## 🗄️ Database Models & Schema Design

LendKart is backed by 8 strictly validated Mongoose models:

### 1. `User` Schema
| Field | Type | Required | Default | Notes / Validation |
|---|---|---|---|---|
| `name` | String | Yes | — | Trimmed, max 60 chars |
| `email` | String | Yes | — | Unique, lowercase, regex email validation |
| `password` | String | Yes | — | Min 6 chars, `select: false` (bcrypt hashed) |
| `avatar` | String | No | Dicebear/Unsplash URL | Profile picture |
| `phone` | String | No | `+91 98765 43210` | Contact phone |
| `location` | String | No | `Pune, Maharashtra` | Primary metro city |
| `bio` | String | No | Standard bio | Short personal description |
| `role` | String | No | `user` | Enum: `['user', 'admin']` |
| `rating` | Number | No | `5.0` | Range: 1 to 5 |
| `reviewsCount` | Number | No | `0` | Total received reviews count |
| `isVerified` | Boolean| No | `true` | SuperLender verified member status |
| `isSuspended`| Boolean| No | `false` | Administrative suspension flag |
| `timestamps` | Date | Auto | Current Date | `createdAt`, `updatedAt` |

### 2. `Category` Schema
| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `name` | String | Yes | — | Unique, trimmed (e.g., 'Electronics & Gadgets') |
| `slug` | String | Yes | — | Unique, lowercase (e.g., 'electronics') |
| `description` | String | No | `''` | Category overview |
| `icon` | String | No | `'Package'` | Lucide icon identifier |
| `image` | String | No | Unsplash URL | High-res category backdrop |
| `itemCount` | Number | No | `0` | Dynamically computed number of active listings |
| `timestamps` | Date | Auto | Current Date | `createdAt`, `updatedAt` |

### 3. `Item` Schema
| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `title` | String | Yes | — | Trimmed, max 100 chars |
| `description` | String | Yes | — | Max 2000 chars |
| `category` | ObjectId | Yes | — | Ref: `Category` |
| `categorySlug` | String | No | — | Lowercase slug cache |
| `images` | [String] | Yes | — | Validates at least 1 image URL |
| `pricePerDay` | Number | Yes | — | Min ₹10 |
| `securityDeposit`| Number | No | `0` | Min ₹0 (Refundable deposit) |
| `condition` | String | No | `'Excellent'` | Enum: `['Like New', 'Excellent', 'Good', 'Fair']` |
| `location` | String | Yes | — | City / neighborhood |
| `owner` | ObjectId | Yes | — | Ref: `User` |
| `isAvailable` | Boolean | No | `true` | Availability toggle |
| `rentalRules` | [String] | No | 3 standard rules | Custom lender expectations |
| `specifications`| `[{key, value}]`| No | `[]` | Technical parameter key-value pairs |
| `rating` | Number | No | `4.8` | Range: 1 to 5 |
| `numReviews` | Number | No | `0` | Count of verified reviews |
| `status` | String | No | `'available'` | Enum: `['available', 'rented', 'paused', 'flagged']` |
| `featured` | Boolean | No | `false` | Highlighted on homepage & top sorts |
| `views` | Number | No | `0` | View counter |
| `timestamps` | Date | Auto | Current Date | `createdAt`, `updatedAt` |

### 4. `Rental` Schema
| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `item` | ObjectId | Yes | — | Ref: `Item` |
| `borrower` | ObjectId | Yes | — | Ref: `User` |
| `owner` | ObjectId | Yes | — | Ref: `User` |
| `startDate` | Date | Yes | — | Rental window start |
| `endDate` | Date | Yes | — | Rental window end |
| `numberOfDays`| Number | Yes | — | Minimum 1 day |
| `pricePerDay` | Number | Yes | — | Cached item rate at booking |
| `securityDeposit`| Number| No | `0` | Cached deposit amount |
| `rentalFee` | Number | Yes | — | `numberOfDays * pricePerDay` |
| `totalAmount` | Number | Yes | — | `rentalFee + securityDeposit` |
| `deliveryOption`| String | No | `'Self Pickup'` | Enum: `['Self Pickup', 'Owner Delivery']` |
| `status` | String | No | `'Pending'` | Enum: `['Pending', 'Approved', 'Rejected', 'Active', 'Completed', 'Cancelled']` |
| `borrowerNote`| String | No | `''` | Custom note from borrower |
| `rejectionReason`| String| No | `''` | Explanation if declined |
| `pickupLocation`| String| No | `''` | Pickup address |
| `timestamps` | Date | Auto | Current Date | `createdAt`, `updatedAt` |

### 5. `Review` Schema
| Field | Type | Required | Notes |
|---|---|---|---|
| `item` | ObjectId | Yes | Ref: `Item` |
| `rental` | ObjectId | No | Ref: `Rental` |
| `reviewer` | ObjectId | Yes | Ref: `User` |
| `rating` | Number | Yes | Range: 1 to 5 |
| `comment` | String | Yes | Max 1000 chars |
| `images` | [String] | No | Optional review photos |
| `timestamps` | Date | Auto | `createdAt`, `updatedAt` |
*(Index: `{ rental: 1, reviewer: 1 }, { unique: true, sparse: true }`)*

### 6. `Wishlist` Schema
| Field | Type | Required | Notes |
|---|---|---|---|
| `user` | ObjectId | Yes | Ref: `User` |
| `item` | ObjectId | Yes | Ref: `Item` |
| `timestamps` | Date | Auto | `createdAt`, `updatedAt` |
*(Index: `{ user: 1, item: 1 }, { unique: true }`)*

### 7. `Notification` Schema
| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `user` | ObjectId | Yes | — | Ref: `User` (Recipient) |
| `title` | String | Yes | — | Notification heading |
| `message` | String | Yes | — | Notification body |
| `type` | String | No | `'system'` | Enum: `['rental_request', 'rental_approved', 'rental_rejected', 'rental_active', 'rental_completed', 'review_received', 'system']` |
| `relatedItem` | ObjectId | No | — | Ref: `Item` |
| `relatedRental`| ObjectId | No | — | Ref: `Rental` |
| `isRead` | Boolean | No | `false` | Read status |
| `timestamps` | Date | Auto | Current Date | `createdAt`, `updatedAt` |

### 8. `Blog` Schema
| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `title` | String | Yes | — | Article headline |
| `slug` | String | Yes | — | Unique, lowercase URL slug |
| `excerpt` | String | Yes | — | Short teaser summary |
| `content` | String | Yes | — | Full article markdown content |
| `coverImage` | String | Yes | — | High-res banner image |
| `author` | Object | No | LendKart Editorial | `{ name, avatar, role }` |
| `tags` | [String] | No | `[]` | Category tags |
| `readTime` | String | No | `'4 min read'`| Estimated reading duration |
| `featured` | Boolean | No | `false` | Featured article flag |
| `views` | Number | No | `0` | Read view counter |
| `timestamps` | Date | Auto | Current Date | `createdAt`, `updatedAt` |

---

## 🔗 Database Relationships (ER Diagram)

```mermaid
erDiagram
    USER ||--o{ ITEM : "owns / lists"
    USER ||--o{ RENTAL : "borrows"
    USER ||--o{ RENTAL : "rents out as owner"
    USER ||--o{ REVIEW : "authors"
    USER ||--o{ WISHLIST : "saves"
    USER ||--o{ NOTIFICATION : "receives"
    CATEGORY ||--o{ ITEM : "categorizes"
    ITEM ||--o{ RENTAL : "is booked in"
    ITEM ||--o{ REVIEW : "is reviewed in"
    ITEM ||--o{ WISHLIST : "is bookmarked in"
    RENTAL ||--o| REVIEW : "generates post-completion"
    RENTAL ||--o{ NOTIFICATION : "triggers alerts for"
```

---

## 🎨 UI/UX & Design System

LendKart features a custom **Deep Evergreen & Warm Sand** brand identity created by human design principles rather than generic AI template patterns:

- **The 70 / 20 / 10 Rule**:
  - **70% Neutral Surfaces**: Warm Ivory / Soft Sand (`#F8F6F0` light, `#0E1714` dark) and Crisp Warm White (`#FFFFFF` light, `#14211D` dark) with soft 1px borders (`#E7E2D6` / `#1E332B`).
  - **20% Primary Brand**: Deep Evergreen / Forest (`#176B52`) used for primary call-to-action buttons, active navigation pills, verified badges, and trust indicators.
  - **10% Warm Accents**: Soft Sage (`#8EAFA0`) for category chips and Warm Terracotta (`#C96F52`) for wishlist hearts, special badges, and pricing accents.
- **Typography Hierarchy**:
  - Display Font: **Space Grotesk** for clean, confident, modern headlines.
  - Body Font: **Plus Jakarta Sans** for comfortable reading and fatigue-free contrast.
- **3D Hero Composition (`HeroScene.jsx`)**:
  - Built with `@react-three/fiber` and `@react-three/drei`.
  - Floating 3D laser projector, camera body, gaming controller, and studio headphones.
  - Mouse coordinate parallax interpolation.
  - Graceful `FallbackHero2D.jsx` rendered automatically on devices without hardware WebGL.
- **Polished States**:
  - Skeleton Shimmer loaders (`Skeleton.jsx`) matching exact card and table layouts.
  - Custom empty states with clear calls-to-action (e.g., *"Nothing saved yet."* on Wishlist).
  - Responsive mobile drawer menu and bottom action bars.

---

## 📈 Digital Marketing Architecture

As a comprehensive Digital Marketing showcase application, LendKart includes integrated growth funnels:

1. **Google Ads Landing Page (`/rent/projector`)**:
   - High-converting funnel targeting commercial search intent (*"Need a Projector for One Day? Don't Buy One."*).
   - Direct Cost Comparison Table: Buying a 4K Projector (₹45,000 upfront + bulb replacements + maintenance) vs. Renting on LendKart (₹450/day + zero maintenance).
   - Trust highlights: 100% deposit protection guarantee, verified clean optics badge, and instant FAQ accordion.
2. **Editorial Content Marketing (`/blog`)**:
   - 8 in-depth articles targeting high-intent organic keywords (e.g., *"Why Renting Beats Buying for 90% of High-End Gadgets"*, *"Top Gear College Students Should Rent"*).
   - Internal linking from articles directly into marketplace categories.
3. **OpenGraph & Social Sharing**:
   - Rich social card preview tags (`og:title`, `og:description`, `og:image`, `twitter:card`) embedded in `index.html` and updated dynamically by `SEO.jsx`.
4. **Search Engine Crawling Directives**:
   - `public/robots.txt`: Grants universal crawl access to marketplace and blog routes while disallowing private `/admin` and `/dashboard` consoles.
   - `public/sitemap.xml`: Comprehensive XML sitemap with daily and weekly crawling priorities.

---

## 📊 Analytics & Event Tracking

LendKart features a decoupled Google Analytics 4 (GA4) implementation in `client/src/services/analytics.js`. If `VITE_GA_MEASUREMENT_ID` is configured in `client/.env`, the script dynamically initializes Google Tag Manager. In development mode without a GA ID, all events gracefully log to the browser console without throwing errors.

### Tracked Business Events:
| Event Name | Trigger Location | Payload Parameters |
|---|---|---|
| `page_view` | Every route change via `SEO.jsx` | `page_location`, `page_title` |
| `login` | `AuthContext.jsx` upon successful sign-in | `{ method: 'email' }` |
| `register` | `AuthContext.jsx` upon new account creation | `{ method: 'email' }` |
| `wishlist_add` | `WishlistContext.jsx` when bookmarking item | `{ item_id }` |
| `request_rental` | `RentalRequestModal.jsx` upon booking submission | `{ item_id, item_title, number_of_days, total_amount }` |

---

## 🔍 Search Engine Optimization (SEO)

- **Dynamic Head Management (`SEO.jsx`)**: Updates `document.title` and meta descriptions on route navigation without page reloads.
- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` landmarks.
- **Heading Hierarchy**: Strictly one `<h1>` per page view, followed by logical `<h2>` and `<h3>` tags.
- **Image Optimization**: Meaningful `alt` tags and responsive image constraints across all cards and banners.

---

## 🧪 Testing & Verification

> [!NOTE]
> Automated test suite (Jest/Cypress) is not currently configured. The platform has been comprehensively validated through live manual and API regression testing.

### Manual End-to-End Verification Checklist:
- [x] **Registration**: Create a new account on `/register` -> auto-logs in and directs to dashboard.
- [x] **1-Click Demo Login**: Click Admin, Lender, or Borrower button on `/login` -> session establishes immediately.
- [x] **Catalog Exploration**: Navigate to `/explore`, type keyword into search bar, move price slider, select category pill -> items filter instantly.
- [x] **Item Details**: Open any item card -> gallery loads, specifications render, rules checklist displays.
- [x] **Calendar Booking Engine**: Pick start and end dates -> summary calculates total days, daily fee, security deposit, and grand total.
- [x] **Rental Submission**: Complete the 4-step modal -> confetti fires, reservation saves as `Pending`, and status reflects on borrower dashboard.
- [x] **Lender Request Management**: Sign in as `user@lendkart.demo` -> view incoming request -> approve or reject with custom reason.
- [x] **Wishlist Bookmarking**: Click heart icon on any card -> counter increments in navbar and item appears in `/wishlist`.
- [x] **Notifications**: Verify unread notification bell -> open dropdown -> click Mark Read -> unread count decrements.
- [x] **Admin Controls**: Sign in as `admin@lendkart.demo` -> access `/admin` -> KPI totals, Recharts analytics, user moderation, and item moderation render with live Atlas data.
- [x] **Theme Switcher**: Toggle Sun/Moon icon -> seamless transition between Warm Sand and Deep Forest dark mode.

---

## 🏗️ Building for Production

To build the client application for production deployment:

```bash
cd client
npm run build
```
The compiled, minified bundle will be output to `client/dist/`.

### Previewing the Production Build Locally:
```bash
npm run preview
```

### Production Backend Execution:
```bash
cd server
NODE_ENV=production node server.js
```

---

## 🔧 Troubleshooting

### 1. MongoDB Atlas DNS Resolution Error (`querySrv ECONNREFUSED`)
- **Cause**: On some Windows systems, Node.js uses the local ISP/router DNS resolver which occasionally rejects SRV records for `mongodb+srv://`.
- **Solution**: Both `server/config/db.js` and `server/seed/seeder.js` automatically set Google/Cloudflare DNS fallback servers (`8.8.8.8`, `1.1.1.1`). Ensure your machine has active internet access.

### 2. Database is Empty / First-Time Setup
- **Symptom**: Explore page displays zero items and categories have no counts.
- **Solution**: Run the database seeder from the project root:
  ```bash
  npm run seed
  ```

### 3. Port 5000 Already in Use (`EADDRINUSE`)
- **Cause**: A background Node or Express process is already bound to port 5000.
- **Solution (Windows PowerShell)**:
  ```powershell
  # Find process holding port 5000
  netstat -ano | findstr :5000
  # Kill process by PID
  taskkill /PID <PID> /F
  ```
  *(Or update `PORT=5001` in `server/.env` and update Vite proxy target in `client/vite.config.js`).*

### 4. Rate Limiting Throttling (HTTP 429)
- **Symptom**: Rapid navigation triggers `"Too many requests from this IP"`.
- **Solution**: In `server/middleware/rateLimiter.js`, `generalLimiter` is set to 3,000 requests per 15 minutes for development. If needed, restart the server or clear local IP throttle.

### 5. CORS / API Connection Refused
- **Cause**: Backend server is not running or `CLIENT_URL` does not match the frontend origin.
- **Solution**: Ensure backend is running on `http://localhost:5000` and `CLIENT_URL=http://localhost:5173` is set in `server/.env`.

---

## 🤝 Git Collaboration Guide

To collaborate smoothly with team members, follow this standard Git workflow:

### 1. Clone & Setup
```bash
git clone https://github.com/SAYALI8106/LendKart.git
cd LendKart
npm run install:all
```

### 2. Ensure You Have the Latest Code
Before starting any new feature, always sync your local `main` branch with GitHub:
```bash
git checkout main
git pull origin main
```

### 3. Create a Feature Branch
Always create a descriptive branch for your work:
```bash
git checkout -b feature/your-feature-name
```
*(Branch prefixes: `feature/`, `fix/`, `docs/`, `style/`, `refactor/`)*

### 4. Make Changes & Commit
Follow conventional, meaningful commit messages:
```bash
git add .
git commit -m "feat: implement rental date overlap check modal"
```

### 5. Push to GitHub & Open a Pull Request
```bash
git push -u origin feature/your-feature-name
```
- Open GitHub, navigate to **Pull Requests**, and click **New Pull Request**.
- Describe your changes, why they were made, and attach screenshots for UI updates.
- Request review from a teammate and merge after approval.

---

## 📜 Team Development Rules

1. **Never Commit Secrets**: Never commit `.env` files, database passwords, private keys, or JWT secrets.
2. **Never Push Directly to `main`**: All changes should go through feature branches and Pull Requests.
3. **Pull Before You Code**: Always run `git pull origin main` before creating a new branch.
4. **Test Before You Push**: Run `npm run build` in `client/` and verify that the application compiles with zero errors before pushing.
5. **Preserve the Design System**: Reuse existing components (`Button`, `Badge`, `Modal`, `ItemCard`) and adhere to the Evergreen & Warm Sand color tokens.
6. **Keep Pull Requests Focused**: A single PR should address one feature or bug fix. Avoid giant multi-feature PRs.

---

## 🌿 Branch Strategy

```text
main (Production / Stable integration branch)
  ├── feature/rental-calendar-refinement
  ├── feature/payment-gateway-integration
  ├── fix/user-suspension-toggle
  ├── style/item-card-hover-states
  └── docs/update-api-documentation
```

- **`main`**: Always clean, runnable, and deployable.
- **`feature/*`**: New user-facing or backend features.
- **`fix/*`**: Bug fixes and issue patches.
- **`style/*`**: UI, CSS, and aesthetic polish without business logic changes.
- **`docs/*`**: Documentation updates (README, walkthroughs).
- **`refactor/*`**: Code restructuring without altering existing functionality.

---

## 🛡️ Security Best Practices

- **Password Storage**: Passwords are never stored in plaintext. Mongoose `pre('save')` hooks hash passwords using `bcryptjs` with 10 salt rounds.
- **JWT Protection**: Sessions use signed JSON Web Tokens expiring in 30 days. Tokens are validated via the `protect` middleware on every sensitive endpoint.
- **Role-Based Authorization**: Routes requiring administrative privileges enforce `adminOnly` verification.
- **Security Headers**: `helmet()` hardens HTTP headers against clickjacking, cross-site scripting (XSS), and MIME sniffing.
- **CORS Protection**: Access is restricted to trusted origins specified in `CLIENT_URL`.
- **Brute Force Defense**: `express-rate-limit` prevents credential brute-forcing on `/api/auth/login` and `/api/auth/register`.

---

## ⚡ Performance Considerations

- **Compound Database Indexing**: Frequently queried fields and unique combinations are indexed in MongoDB:
  - `Item`: Text index on `{ title: 'text', description: 'text', location: 'text' }`.
  - `Rental`: Compound index on `{ item: 1, startDate: 1, endDate: 1, status: 1 }`.
  - `Wishlist`: Unique compound index on `{ user: 1, item: 1 }`.
  - `Review`: Unique sparse index on `{ rental: 1, reviewer: 1 }`.
- **Query Projection**: Password fields are excluded by default via `select: false` on the `User` schema.
- **Asset Optimization**: High-resolution photography is delivered through optimized CDN URLs with dimension and format parameters (`auto=format&fit=crop&q=80`).

---

## 🔮 Future Scope

The following features represent potential enhancements for future iterations of LendKart:
- **Online Payment Gateways**: Integration with Razorpay or Stripe for automated UPI/card rental fee collection and security deposit pre-authorization.
- **Real-Time Messaging & Chat**: Socket.io integration enabling instant in-app messaging between borrowers and lenders.
- **Interactive Map Search**: Mapbox or Google Maps integration for geographical proximity-based radius searches.
- **Automated Return Reminders**: WhatsApp / SMS alerts via Twilio 24 hours prior to scheduled return deadlines.
- **Cloud Media Uploads**: Direct image uploads to Cloudinary or AWS S3 replacing external URL inputs.
- **Automated KYC Verification**: Aadhaar / DigiLocker API integration for automated instant government ID verification.

---

## 📌 Project Status

**Project Status**: **Completed / Production-Ready Demo**

All core functionality—including user authentication, item catalog discovery, multi-filter search, interactive 3D hero visualization, date overlap booking engine, dual borrower/lender dashboards, admin command center with Recharts analytics, wishlist bookmarks, notifications feed, digital marketing landing funnel, SEO architecture, and MongoDB Atlas seeding—is fully developed, tested, and operational.

---

## 👥 Team

| Member Name | Role / Responsibility | GitHub Profile |
|---|---|---|
| **Sayali Gayke** | Project Lead & Full-Stack Developer | [@SAYALI8106](https://github.com/SAYALI8106) |
| *Team Member 2* | Frontend / UI Architecture | *[Profile Link]* |
| *Team Member 3* | Backend & Database Engineering | *[Profile Link]* |
| *Team Member 4* | Digital Marketing & Quality Assurance | *[Profile Link]* |

---

## 📄 License

License information has not been added yet.

---

*LendKart — Don't Buy It. Lend It.*
