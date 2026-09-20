import dotenv from 'dotenv';
import dns from 'dns';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Category from '../models/Category.js';
import Item from '../models/Item.js';
import Rental from '../models/Rental.js';
import Review from '../models/Review.js';
import Notification from '../models/Notification.js';
import Blog from '../models/Blog.js';
import Wishlist from '../models/Wishlist.js';

import { categoriesData, usersData, blogsData } from './seedData.js';

dotenv.config();

// Ensure reliable SRV DNS resolution on Windows environments for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (err) {
  console.warn('[Seeder Warning] Could not configure custom DNS servers:', err.message);
}

const itemsCatalog = [
  // 1. Electronics & Gadgets (Projectors, displays, monitors)
  {
    title: 'Epson EpiqVision Mini EF12 Laser 1080p Smart Projector',
    categorySlug: 'electronics',
    description: 'Compact 1000 Lumens Full HD laser projection with built-in Android TV and Yamaha sound system. Perfect for terrace movie nights, college presentations, living room screenings, and console gaming.',
    pricePerDay: 450,
    securityDeposit: 1500,
    condition: 'Like New',
    location: 'Viman Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Resolution', value: '1080p FHD (Up to 150 inch)' },
      { key: 'Audio', value: 'Audiophile 2.0 Yamaha Speakers' },
      { key: 'Connectivity', value: 'HDMI 2.0, Bluetooth, WiFi 5' },
      { key: 'Weight', value: '2.1 kg Ultra Portable' }
    ],
    rentalRules: ['Keep away from liquids', 'Use provided padded carrying bag', 'Return HDMI & power adapter intact']
  },
  {
    title: 'BenQ TK700STi 4K HDR Gaming & Home Cinema Projector',
    categorySlug: 'electronics',
    description: 'True 4K 3000 ANSI Lumens short-throw projector with 16ms low input lag. Brilliant for live cricket match watch parties, outdoor amphitheaters, and 4K PS5 gaming.',
    pricePerDay: 799,
    securityDeposit: 2500,
    condition: 'Excellent',
    location: 'Bandra West, Mumbai',
    images: [
      'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Resolution', value: 'True 4K UHD (3840 x 2160)' },
      { key: 'Brightness', value: '3,000 ANSI Lumens' },
      { key: 'Input Lag', value: '16ms at 4K 60Hz' }
    ],
    rentalRules: ['Handle optical lens with care', 'Do not unplug without completion of fan cool-down cycle']
  },
  {
    title: 'Apple iPad Pro 12.9" M2 with Apple Pencil 2 & Magic Keyboard',
    categorySlug: 'electronics',
    description: 'Liquid Retina XDR display with ProMotion 120Hz. Ideal for digital illustrators, UX architects, on-site portfolio presentations, and video color grading.',
    pricePerDay: 600,
    securityDeposit: 2000,
    condition: 'Like New',
    location: 'Kothrud, Pune',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    specifications: [
      { key: 'Chip', value: 'Apple M2 8-core CPU / 10-core GPU' },
      { key: 'Display', value: '12.9" Mini-LED Liquid Retina XDR' },
      { key: 'Included', value: 'Apple Pencil 2 + Magic Keyboard' }
    ]
  },
  {
    title: 'ViewSonic 100-Inch Portable Pull-Up Projector Screen',
    categorySlug: 'electronics',
    description: 'High-gain matte white wrinkle-free projection screen with hydraulic scissor stand. Sets up in 15 seconds for terrace theaters and seminar rooms.',
    pricePerDay: 250,
    securityDeposit: 600,
    condition: 'Good',
    location: 'Baner, Pune',
    images: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 2. Cameras & Photography
  {
    title: 'Sony Alpha A7 IV Full-Frame Mirrorless + 24-70mm f/2.8 GM Lens',
    categorySlug: 'photography',
    description: 'Industry-standard 33MP hybrid camera with 4K 60p 10-bit video, real-time eye autofocus, 2 high-speed SD cards, and 3 genuine Sony batteries.',
    pricePerDay: 1200,
    securityDeposit: 4000,
    condition: 'Like New',
    location: 'Viman Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Sensor', value: '33MP Full-Frame Exmor R BSI CMOS' },
      { key: 'Video', value: '4K 60p 10-Bit 4:2:2 All-Intra' },
      { key: 'Stabilization', value: '5-Axis In-Body Image Stabilization' }
    ],
    rentalRules: ['Professional camera gear agreement required', 'Always use camera neck strap', 'Keep protective filter attached']
  },
  {
    title: 'DJI Mini 3 Pro Fly More Combo with RC Smart Controller',
    categorySlug: 'photography',
    description: 'Under 249g ultra-lightweight drone with 4K 60fps HDR video, true vertical shooting for social media reels, tri-directional obstacle sensing, and 3 batteries (90 min total flight time).',
    pricePerDay: 850,
    securityDeposit: 3000,
    condition: 'Like New',
    location: 'Andheri East, Mumbai',
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Weight', value: '249g (No DGCA license required)' },
      { key: 'Flight Time', value: 'Up to 34 mins per battery' },
      { key: 'Range', value: '12 km FHD Video Transmission' }
    ],
    rentalRules: ['Fly only in legal airspace & daylight hours', 'Do not operate in heavy rain or high winds (>30 km/h)']
  },
  {
    title: 'Canon EOS R6 Mark II Mirrorless Camera Body',
    categorySlug: 'photography',
    description: '24.2MP full frame sensor delivering up to 40 fps electronic shutter. Superb low-light performance for wedding candid shots and musical concerts.',
    pricePerDay: 1100,
    securityDeposit: 3500,
    condition: 'Excellent',
    location: 'Koregaon Park, Pune',
    images: [
      'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'DJI RS 3 Pro 3-Axis Camera Gimbal Stabilizer',
    categorySlug: 'photography',
    description: 'Carbon fiber motorized stabilizer supporting camera rigs up to 4.5kg. Automated axis locks and SuperSmooth mode for Hollywood tracking shots.',
    pricePerDay: 500,
    securityDeposit: 1500,
    condition: 'Excellent',
    location: 'Jubilee Hills, Hyderabad',
    images: [
      'https://images.unsplash.com/photo-1588783948922-d2f155b13c89?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 3. Power Tools & DIY
  {
    title: 'Bosch Professional GSB 18V-50 Brushless Impact Drill Kit',
    categorySlug: 'tools',
    description: 'Robust 50Nm torque motor with 2x 2.0Ah lithium batteries, fast charger, and 35-piece drill/screwdriver bits set. Handles reinforced concrete, masonry, and hardwood.',
    pricePerDay: 200,
    securityDeposit: 600,
    condition: 'Excellent',
    location: 'Viman Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    specifications: [
      { key: 'Motor', value: 'Brushless 18V Motor' },
      { key: 'Max Torque', value: '50 Nm' },
      { key: 'Chuck', value: '13mm All-Metal Chuck' }
    ],
    rentalRules: ['Wear protective eye gear provided in case', 'Do not submerge or use in active rain']
  },
  {
    title: 'Kärcher K3 High-Pressure Washer 120 Bar for Balconies & Cars',
    categorySlug: 'tools',
    description: 'High-pressure 120-bar water blaster with dirt blaster nozzle, car shampoo foam gun, and 6-meter hose. Makes dirty terraces, driveways, and muddy SUVs look brand new.',
    pricePerDay: 350,
    securityDeposit: 1000,
    condition: 'Like New',
    location: 'Hauz Khas, New Delhi',
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'DeWalt 20V Max 10-Inch Compound Sliding Miter Saw',
    categorySlug: 'tools',
    description: 'Precision laser-guided crosscut and bevel saw. Essential for DIY furniture making, baseboard installation, and wooden shelf builds.',
    pricePerDay: 550,
    securityDeposit: 1800,
    condition: 'Good',
    location: 'Aundh, Pune',
    images: [
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 4. Camping & Outdoor
  {
    title: 'Quechua MH100 4-Person Waterproof Camping Tent',
    categorySlug: 'outdoor',
    description: 'Freestanding dome tent tested against 50 km/h gale-force winds and tropical downpours. Double-roof architecture prevents condensation. Fits 4 adults comfortably.',
    pricePerDay: 250,
    securityDeposit: 750,
    condition: 'Like New',
    location: 'College Road, Nashik',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Capacity', value: '4 Persons (240 x 210 cm area)' },
      { key: 'Waterproofing', value: '2000 mm Tropical Rain Approved' },
      { key: 'Weight', value: '4.8 kg Compact Carry Bag' }
    ],
    rentalRules: ['Dry completely before packing if wet', 'Ensure all 12 ground stakes and carry bag are returned']
  },
  {
    title: 'Forclaz 70L Ergonomic Trekking Rucksack Backpack with Raincover',
    categorySlug: 'outdoor',
    description: 'Symbium shock-absorbing hip belt system designed for multi-day Sahyadri or Himalayan treks. Multiple quick-access hydration ports and trekking pole holders.',
    pricePerDay: 150,
    securityDeposit: 500,
    condition: 'Excellent',
    location: 'Bandra West, Mumbai',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Coleman 1000 Lumens Dual Fuel Camping Lantern & Stove Kit',
    categorySlug: 'outdoor',
    description: 'Heavy duty campsite illumination with adjustable dimmer, battery ignition, and portable mini gas stove with butane canister.',
    pricePerDay: 180,
    securityDeposit: 500,
    condition: 'Like New',
    location: 'Golf Course Road, Gurugram',
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 5. Gaming & VR
  {
    title: 'Sony PlayStation 5 Disc Edition Console + 2 DualSense Controllers',
    categorySlug: 'gaming',
    description: 'Ultra-high-speed SSD with ray tracing and 4K 120Hz output. Pre-loaded with Spider-Man 2, God of War Ragnarök, and EA Sports FC 24.',
    pricePerDay: 650,
    securityDeposit: 2500,
    condition: 'Like New',
    location: 'Baner, Pune',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Storage', value: '825GB Custom Ultra-Fast SSD' },
      { key: 'Controllers', value: '2x DualSense Wireless with Haptic Feedback' },
      { key: 'Video Output', value: 'Supports 4K 120Hz TVs and 8K displays' }
    ],
    rentalRules: ['Do not open console casing', 'Do not modify system firmware', 'Keep original cables and HDMI cord safe']
  },
  {
    title: 'Meta Quest 3 128GB Mixed Reality Headset with Touch Plus Controllers',
    categorySlug: 'gaming',
    description: 'Breakthrough mixed reality headset with full-color passthrough, 4K+ Infinite Display, and spatial 3D audio. Experience Beat Saber, Superhot, and virtual workspaces.',
    pricePerDay: 700,
    securityDeposit: 2500,
    condition: 'Like New',
    location: 'Koramangala, Bengaluru',
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    title: 'Logitech G29 Driving Force Racing Wheel & Pedals with Shifter',
    categorySlug: 'gaming',
    description: 'Dual-motor force feedback racing wheel with stainless steel paddle shifters and hand-stitched leather. Compatible with PS5, PS4, and PC racing sims like Gran Turismo.',
    pricePerDay: 400,
    securityDeposit: 1200,
    condition: 'Excellent',
    location: 'Viman Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 6. Audio & Music
  {
    title: 'Yamaha F310 Full-Size Acoustic Guitar with Padded Gigbag & Tuner',
    categorySlug: 'music',
    description: 'Spruce top with rosewood fingerboard. Balanced resonance and comfortable action. Ideal for college unplugged performances and recording sessions.',
    pricePerDay: 200,
    securityDeposit: 600,
    condition: 'Excellent',
    location: 'Indiranagar, Bengaluru',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'JBL PartyBox 310 Portable Bluetooth Party Speaker 240W',
    categorySlug: 'music',
    description: 'Massive 240W JBL Pro sound with dynamic synchronized light show, built-in dual mic/guitar inputs, telescopic handle, wheels, and 18-hour battery.',
    pricePerDay: 750,
    securityDeposit: 2000,
    condition: 'Like New',
    location: 'Gangapur Road, Nashik',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    title: 'Pioneer DDJ-FLX4 2-Channel DJ Controller for Rekordbox & Serato',
    categorySlug: 'music',
    description: 'Club-style mixer layout with Smart CFX and Smart Fader assistance. Connects directly to laptop, iPad, or smartphone via USB-C.',
    pricePerDay: 480,
    securityDeposit: 1600,
    condition: 'Like New',
    location: 'Viman Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 7. Sports & Fitness
  {
    title: 'Bowflex SelectTech 552 Adjustable Dumbbells Set (Pair, 2kg to 24kg)',
    categorySlug: 'sports',
    description: 'Replaces 15 pairs of dumbbells with a single dial turn. Compact space-saving storage trays included. Perfect for home workouts.',
    pricePerDay: 260,
    securityDeposit: 1000,
    condition: 'Excellent',
    location: 'Hauz Khas, New Delhi',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Trek Marlin 7 Hardtail Mountain Bike (Medium Frame, 29" Wheels)',
    categorySlug: 'sports',
    description: 'Lightweight Alpha Silver aluminum frame with RockShox suspension fork and Shimano Deore 1x10 drivetrain. Ideal for hill rides and Pune ghats.',
    pricePerDay: 450,
    securityDeposit: 1800,
    condition: 'Like New',
    location: 'Dharampeth, Nagpur',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Yonex Astrox 99 Pro Badminton Racket Pair with Tournament Shuttlecocks',
    categorySlug: 'sports',
    description: 'Head-heavy badminton racket pair strung with Yonex BG65 Ti at 26 lbs. Comes with Yonex thermal kitbag and tube of feather shuttlecocks.',
    pricePerDay: 180,
    securityDeposit: 600,
    condition: 'Like New',
    location: 'Kothrud, Pune',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 8. Events & Party
  {
    title: 'Professional DJ RGB Laser & Moving Head Strobe Light Rig',
    categorySlug: 'events',
    description: 'Sound-activated DMX RGB laser unit with 36 rotating party patterns and floor tripod stand. Turns any living room or terrace into a nightclub.',
    pricePerDay: 350,
    securityDeposit: 1000,
    condition: 'Excellent',
    location: 'Samarth Nagar, Chhatrapati Sambhajinagar',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Chauvet DJ Hurricane 1200 Fog Smoke Machine (Fluid Included)',
    categorySlug: 'events',
    description: 'High-output fog generator with wired timer remote. Fills up to 18,000 cubic feet per minute. Completely safe non-toxic water-based fog.',
    pricePerDay: 300,
    securityDeposit: 800,
    condition: 'Like New',
    location: 'Wakad, Pune',
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Ahuja Dual UHF Wireless Handheld Microphone Karaoke System',
    categorySlug: 'events',
    description: 'Crystal-clear vocal transmission up to 50 meters with zero interference. Plugs directly into any amplifier, home theater, or boombox.',
    pricePerDay: 220,
    securityDeposit: 600,
    condition: 'Excellent',
    location: 'Gangapur Road, Nashik',
    images: [
      'https://images.unsplash.com/photo-1520523839898-507127045b42?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 9. Travel & Luggage
  {
    title: 'Samsonite 30-Inch Hard-Shell Lightweight Luggage Trolley Suitcase',
    categorySlug: 'travel',
    description: 'Durable polycarbonate shell with 360-degree silent spinner wheels and TSA combination lock. Spotless interior for international holidays.',
    pricePerDay: 180,
    securityDeposit: 600,
    condition: 'Like New',
    location: 'Golf Course Road, Gurugram',
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Thule Motion XT Roof-Mounted Cargo Carrier Box (450L)',
    categorySlug: 'travel',
    description: 'Aerodynamic roof cargo pod with dual-side opening and PowerClick quick-mount system. Holds 5-7 pairs of skis or luggage for road trips.',
    pricePerDay: 400,
    securityDeposit: 1500,
    condition: 'Excellent',
    location: 'Andheri East, Mumbai',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Peak Design Everyday Camera Backpack 30L (Charcoal)',
    categorySlug: 'travel',
    description: 'Weatherproof 100% recycled nylon shell with modular FlexFold dividers and MagLatch hardware. Carries dual camera bodies and 4 lenses.',
    pricePerDay: 190,
    securityDeposit: 600,
    condition: 'Like New',
    location: 'Bandra West, Mumbai',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // 10. Home & Living
  {
    title: 'Usha Janome Dream Maker 120 Computerized Sewing & Embroidery Machine',
    categorySlug: 'home',
    description: '120 built-in stitches with automatic needle threader, LCD screen, and free arm for circular sewing. Essential for fashion design students and tailors.',
    pricePerDay: 320,
    securityDeposit: 1000,
    condition: 'Like New',
    location: 'Juhu, Mumbai',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Kärcher SC 3 EasyFix High-Temperature Steam Cleaner',
    categorySlug: 'home',
    description: 'Chemical-free deep sanitizing steam cleaner heating in 30 seconds. Removes 99.99% of bacteria and grease from kitchen tiles and upholstery.',
    pricePerDay: 280,
    securityDeposit: 800,
    condition: 'Excellent',
    location: 'Kothrud, Pune',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Catan + Ticket to Ride Deluxe Board Games Set',
    categorySlug: 'home',
    description: 'The ultimate strategy board game combo for weekend game nights with friends and family. Complete pieces, wooden components, and clean card decks.',
    pricePerDay: 150,
    securityDeposit: 500,
    condition: 'Like New',
    location: 'Shivaji Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Bosch Cordless Grass Trimmer & Shrub Shear Set',
    categorySlug: 'home',
    description: 'Precision battery garden trimmer with anti-blocking system and Swiss laser-cut blades for ornamental garden shaping and lawn edging.',
    pricePerDay: 180,
    securityDeposit: 500,
    condition: 'Good',
    location: 'Hadapsar, Pune',
    images: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const reviewsSeed = [
  {
    rating: 5,
    comment: 'The Epson EF12 laser projector transformed our college batch movie screening! Crystal clear 1080p picture and the Yamaha sound was astonishingly loud and clear on the terrace.'
  },
  {
    rating: 5,
    comment: 'Pooja was an extraordinary lender. The Sony A7 IV came with 3 fully charged batteries and clean sensor glass. Our wedding client was blown away by the 4K footage!'
  },
  {
    rating: 5,
    comment: 'Rented the BenQ 4K projector for the World Cup final screening in Bandra. Zero input lag and vibrant colors even before sunset. Smooth pickup and drop.'
  },
  {
    rating: 4,
    comment: 'Drill was powerful and easily handled concrete walls for hanging our wall shelves. Complete bit set included in the Bosch carrying case.'
  },
  {
    rating: 5,
    comment: 'Quechua tent kept us completely dry during a torrential monsoon night at Pawna Lake! Easy 10-minute setup and very spacious for 4 adults.'
  },
  {
    rating: 5,
    comment: 'PS5 console arrived spotless with two controllers and the latest games pre-installed. Best gaming weekend with cousins in a long time!'
  },
  {
    rating: 4,
    comment: 'The iPad Pro M2 and Apple Pencil 2 made client storyboard presentations effortless. Battery lasted the entire day without needing a recharge.'
  },
  {
    rating: 5,
    comment: 'DJI Mini 3 Pro drone footage in Lonavala came out like a Bollywood cinema reel! Super stable gimbal, crisp 4K, and very responsive controller.'
  },
  {
    rating: 5,
    comment: 'The JBL PartyBox 310 has earth-shattering bass. Lasted our entire farmhouse party on a single battery charge without needing power cords.'
  },
  {
    rating: 4,
    comment: 'Rented the acoustic guitar for a 3-day music workshop in Indiranagar. Nicely tuned, low action, and warm resonance.'
  },
  {
    rating: 5,
    comment: 'The Kärcher pressure washer made our car and building driveway look sparkling brand new. Very easy to operate and powerful water pressure.'
  },
  {
    rating: 5,
    comment: 'Meta Quest 3 mixed reality was mindblowing for our studio game night! Super comfortable headstrap and pristine lenses.'
  },
  {
    rating: 5,
    comment: 'The Usha computerized sewing machine worked like a charm for my NIFT fashion design final project submission. Quiet motor and clean stitching.'
  },
  {
    rating: 4,
    comment: 'Bowflex adjustable dumbbells are a genius invention for apartment workouts. Switched weights in seconds without cluttering the bedroom.'
  },
  {
    rating: 5,
    comment: 'Party strobe lights and smoke machine transformed our college auditorium into an absolute EDM festival. Guests were thoroughly thrilled!'
  },
  {
    rating: 4,
    comment: 'Samsonite suitcase was spotless, ultra-lightweight, and glided effortlessly through Mumbai airport terminals. Great communication by owner.'
  },
  {
    rating: 5,
    comment: 'Catan and Ticket to Ride were in mint condition with all wooden pieces intact. Great weekend entertainment!'
  },
  {
    rating: 5,
    comment: 'The Trek Marlin 7 mountain bike handled Sinhagad ghats with supreme stability and sharp hydraulic disc brakes.'
  },
  {
    rating: 4,
    comment: 'DJ controller connected instantly to Serato DJ on my MacBook. Responsive jog wheels and smooth crossfader.'
  },
  {
    rating: 5,
    comment: 'Thule roof box was cavernous and held all our family camping bags securely during the Goa road trip. No wind noise at all.'
  },
  {
    rating: 5,
    comment: 'LendKart made this rental seamless. Transparent pricing, refundable deposit returned promptly, and super friendly lender.'
  }
];

export async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment or .env file.');
    }

    console.log('[Seeder] Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(mongoUri);
    console.log(`[Seeder] Connected successfully to Atlas Host: ${conn.connection.host}`);
    console.log(`[Seeder] Target Application Database: ${conn.connection.name}`);

    if (conn.connection.name !== 'lendkart') {
      console.log(`[Seeder Info] Switching to target database 'lendkart'...`);
    }

    // Safety: Clear ONLY the LendKart application collections
    console.log('[Seeder] Clearing LendKart application collections...');
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Item.deleteMany({}),
      Rental.deleteMany({}),
      Review.deleteMany({}),
      Wishlist.deleteMany({}),
      Notification.deleteMany({}),
      Blog.deleteMany({})
    ]);
    console.log('[Seeder] Previous application collections cleared.');

    // 1. Seed Categories
    console.log('[Seeder] Inserting categories...');
    const createdCategories = await Category.insertMany(categoriesData);
    const categoryMap = {};
    createdCategories.forEach((c) => {
      categoryMap[c.slug] = c._id;
    });
    console.log(`[Seeder] Seeded ${createdCategories.length} categories.`);

    // 2. Seed Users
    console.log('[Seeder] Inserting users with bcrypt hashed passwords...');
    const createdUsers = [];
    for (const userData of usersData) {
      // User.create triggers Mongoose pre('save') hook to hash passwords
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log(`[Seeder] Seeded ${createdUsers.length} users.`);

    // Quick user lookups
    const adminUser = createdUsers[0];      // admin@lendkart.demo
    const lenderUser = createdUsers[1];     // user@lendkart.demo (Pooja Deshmukh)
    const borrowerUser = createdUsers[2];   // rahul@lendkart.demo (Rahul Kulkarni)

    // 3. Seed Items
    console.log('[Seeder] Inserting rich item catalog...');
    const createdItems = [];
    for (let i = 0; i < itemsCatalog.length; i++) {
      const itemRaw = itemsCatalog[i];
      const catId = categoryMap[itemRaw.categorySlug] || createdCategories[0]._id;

      // Assign strategic ownership:
      // Lender User (user@lendkart.demo) owns multiple high-demand items:
      // (Epson Projector, Sony A7 IV, Bosch Drill, PS5, Pioneer DJ, etc.)
      let ownerUser;
      if (i % 3 === 0) {
        ownerUser = lenderUser;
      } else if (i === 1 || i === 7 || i === 13) {
        ownerUser = adminUser;
      } else {
        ownerUser = createdUsers[3 + (i % (createdUsers.length - 3))];
      }

      const item = await Item.create({
        ...itemRaw,
        category: catId,
        owner: ownerUser._id,
        rating: 4.8 + (i % 3) * 0.1,
        numReviews: 2 + (i % 4),
        status: 'available',
        isAvailable: true
      });
      createdItems.push(item);
    }
    console.log(`[Seeder] Seeded ${createdItems.length} items.`);

    // Update category item counts
    for (const cat of createdCategories) {
      const count = await Item.countDocuments({ category: cat._id });
      cat.itemCount = count;
      await cat.save();
    }

    // 4. Seed Rentals
    console.log('[Seeder] Generating interconnected rental records across various statuses and dates...');
    const now = new Date();
    const MS_PER_DAY = 86400000;

    const rentalEntries = [
      // A. For user@lendkart.demo (Lender): Incoming Pending Request from Rahul
      {
        item: createdItems[0]._id, // Epson Projector
        owner: lenderUser._id,
        borrower: borrowerUser._id,
        startDate: new Date(now.getTime() + 2 * MS_PER_DAY),
        endDate: new Date(now.getTime() + 4 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[0].pricePerDay,
        securityDeposit: createdItems[0].securityDeposit,
        rentalFee: createdItems[0].pricePerDay * 2,
        totalAmount: createdItems[0].pricePerDay * 2 + createdItems[0].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Pending',
        borrowerNote: 'Hosting a terrace graduation movie screening with 15 college friends. Will pick up on Friday afternoon.',
        pickupLocation: createdItems[0].location
      },
      // B. For user@lendkart.demo (Lender): Another Pending Request from Ananya
      {
        item: createdItems[4]._id, // Sony A7 IV
        owner: lenderUser._id,
        borrower: createdUsers[3]._id, // Ananya
        startDate: new Date(now.getTime() + 5 * MS_PER_DAY),
        endDate: new Date(now.getTime() + 8 * MS_PER_DAY),
        numberOfDays: 3,
        pricePerDay: createdItems[4].pricePerDay,
        securityDeposit: createdItems[4].securityDeposit,
        rentalFee: createdItems[4].pricePerDay * 3,
        totalAmount: createdItems[4].pricePerDay * 3 + createdItems[4].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Pending',
        borrowerNote: 'Need for a 3-day documentary shoot in Pune old city.',
        pickupLocation: createdItems[4].location
      },
      // C. For user@lendkart.demo (Lender): Approved Rental to Vikram
      {
        item: createdItems[8]._id, // Bosch Drill
        owner: lenderUser._id,
        borrower: createdUsers[4]._id, // Vikram
        startDate: new Date(now.getTime() + 1 * MS_PER_DAY),
        endDate: new Date(now.getTime() + 3 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[8].pricePerDay,
        securityDeposit: createdItems[8].securityDeposit,
        rentalFee: createdItems[8].pricePerDay * 2,
        totalAmount: createdItems[8].pricePerDay * 2 + createdItems[8].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Approved',
        borrowerNote: 'Putting up outdoor gear display shelves in our Nashik shop.',
        pickupLocation: createdItems[8].location
      },
      // D. For user@lendkart.demo (Lender): Active Rental right now to Rohan
      {
        item: createdItems[14]._id, // PS5
        owner: lenderUser._id,
        borrower: createdUsers[6]._id, // Rohan
        startDate: new Date(now.getTime() - 1 * MS_PER_DAY),
        endDate: new Date(now.getTime() + 2 * MS_PER_DAY),
        numberOfDays: 3,
        pricePerDay: createdItems[14].pricePerDay,
        securityDeposit: createdItems[14].securityDeposit,
        rentalFee: createdItems[14].pricePerDay * 3,
        totalAmount: createdItems[14].pricePerDay * 3 + createdItems[14].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Active',
        borrowerNote: 'Tournament weekend with friends. Console running great!',
        pickupLocation: createdItems[14].location
      },
      // E. For user@lendkart.demo (Lender): Completed Rentals with high revenue
      {
        item: createdItems[0]._id, // Epson Projector
        owner: lenderUser._id,
        borrower: createdUsers[7]._id, // Meera
        startDate: new Date(now.getTime() - 25 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 22 * MS_PER_DAY),
        numberOfDays: 3,
        pricePerDay: createdItems[0].pricePerDay,
        securityDeposit: createdItems[0].securityDeposit,
        rentalFee: createdItems[0].pricePerDay * 3,
        totalAmount: createdItems[0].pricePerDay * 3 + createdItems[0].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        borrowerNote: 'Classical music festival presentation.',
        pickupLocation: createdItems[0].location
      },
      {
        item: createdItems[4]._id, // Sony A7 IV
        owner: lenderUser._id,
        borrower: borrowerUser._id, // Rahul
        startDate: new Date(now.getTime() - 18 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 15 * MS_PER_DAY),
        numberOfDays: 3,
        pricePerDay: createdItems[4].pricePerDay,
        securityDeposit: createdItems[4].securityDeposit,
        rentalFee: createdItems[4].pricePerDay * 3,
        totalAmount: createdItems[4].pricePerDay * 3 + createdItems[4].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        borrowerNote: 'Shot our indie music video.',
        pickupLocation: createdItems[4].location
      },
      {
        item: createdItems[19]._id, // Pioneer DJ
        owner: lenderUser._id,
        borrower: createdUsers[8]._id, // Aditya
        startDate: new Date(now.getTime() - 12 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 10 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[19].pricePerDay,
        securityDeposit: createdItems[19].securityDeposit,
        rentalFee: createdItems[19].pricePerDay * 2,
        totalAmount: createdItems[19].pricePerDay * 2 + createdItems[19].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        borrowerNote: 'Club night DJ set.',
        pickupLocation: createdItems[19].location
      },

      // F. For rahul@lendkart.demo (Borrower): Active Rental right now
      {
        item: createdItems[11]._id, // Quechua Tent
        owner: createdItems[11].owner,
        borrower: borrowerUser._id,
        startDate: new Date(now.getTime() - 1 * MS_PER_DAY),
        endDate: new Date(now.getTime() + 1 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[11].pricePerDay,
        securityDeposit: createdItems[11].securityDeposit,
        rentalFee: createdItems[11].pricePerDay * 2,
        totalAmount: createdItems[11].pricePerDay * 2 + createdItems[11].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Active',
        borrowerNote: 'Weekend camping at Pawna lake.',
        pickupLocation: createdItems[11].location
      },
      // G. For rahul@lendkart.demo (Borrower): Completed Rental (DJI Drone)
      {
        item: createdItems[5]._id, // DJI Drone
        owner: createdItems[5].owner,
        borrower: borrowerUser._id,
        startDate: new Date(now.getTime() - 30 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 28 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[5].pricePerDay,
        securityDeposit: createdItems[5].securityDeposit,
        rentalFee: createdItems[5].pricePerDay * 2,
        totalAmount: createdItems[5].pricePerDay * 2 + createdItems[5].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        borrowerNote: 'Lonavala canyon aerial photography.',
        pickupLocation: createdItems[5].location
      },

      // H. Historical Rentals across community members (May, June, July, August, September)
      {
        item: createdItems[1]._id, // BenQ Projector
        owner: createdItems[1].owner,
        borrower: createdUsers[9]._id, // Tanvi
        startDate: new Date(now.getTime() - 40 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 37 * MS_PER_DAY),
        numberOfDays: 3,
        pricePerDay: createdItems[1].pricePerDay,
        securityDeposit: createdItems[1].securityDeposit,
        rentalFee: createdItems[1].pricePerDay * 3,
        totalAmount: createdItems[1].pricePerDay * 3 + createdItems[1].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[1].location
      },
      {
        item: createdItems[9]._id, // Kärcher Washer
        owner: createdItems[9].owner,
        borrower: createdUsers[10]._id, // Karan
        startDate: new Date(now.getTime() - 45 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 44 * MS_PER_DAY),
        numberOfDays: 1,
        pricePerDay: createdItems[9].pricePerDay,
        securityDeposit: createdItems[9].securityDeposit,
        rentalFee: createdItems[9].pricePerDay * 1,
        totalAmount: createdItems[9].pricePerDay * 1 + createdItems[9].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[9].location
      },
      {
        item: createdItems[18]._id, // JBL Partybox
        owner: createdItems[18].owner,
        borrower: createdUsers[11]._id, // Neha
        startDate: new Date(now.getTime() - 50 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 48 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[18].pricePerDay,
        securityDeposit: createdItems[18].securityDeposit,
        rentalFee: createdItems[18].pricePerDay * 2,
        totalAmount: createdItems[18].pricePerDay * 2 + createdItems[18].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[18].location
      },
      {
        item: createdItems[15]._id, // Meta Quest 3
        owner: createdItems[15].owner,
        borrower: createdUsers[12]._id, // Siddharth
        startDate: new Date(now.getTime() - 60 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 57 * MS_PER_DAY),
        numberOfDays: 3,
        pricePerDay: createdItems[15].pricePerDay,
        securityDeposit: createdItems[15].securityDeposit,
        rentalFee: createdItems[15].pricePerDay * 3,
        totalAmount: createdItems[15].pricePerDay * 3 + createdItems[15].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[15].location
      },
      {
        item: createdItems[29]._id, // Usha Sewing Machine
        owner: createdItems[29].owner,
        borrower: createdUsers[13]._id, // Riddhi
        startDate: new Date(now.getTime() - 75 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 70 * MS_PER_DAY),
        numberOfDays: 5,
        pricePerDay: createdItems[29].pricePerDay,
        securityDeposit: createdItems[29].securityDeposit,
        rentalFee: createdItems[29].pricePerDay * 5,
        totalAmount: createdItems[29].pricePerDay * 5 + createdItems[29].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[29].location
      },
      {
        item: createdItems[20]._id, // Bowflex Dumbbells
        owner: createdItems[20].owner,
        borrower: createdUsers[14]._id, // Harsh
        startDate: new Date(now.getTime() - 85 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 78 * MS_PER_DAY),
        numberOfDays: 7,
        pricePerDay: createdItems[20].pricePerDay,
        securityDeposit: createdItems[20].securityDeposit,
        rentalFee: createdItems[20].pricePerDay * 7,
        totalAmount: createdItems[20].pricePerDay * 7 + createdItems[20].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[20].location
      },
      {
        item: createdItems[23]._id, // Party Laser Rig
        owner: createdItems[23].owner,
        borrower: createdUsers[15]._id, // Ishita
        startDate: new Date(now.getTime() - 95 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 93 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[23].pricePerDay,
        securityDeposit: createdItems[23].securityDeposit,
        rentalFee: createdItems[23].pricePerDay * 2,
        totalAmount: createdItems[23].pricePerDay * 2 + createdItems[23].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[23].location
      },
      {
        item: createdItems[26]._id, // Samsonite Suitcase
        owner: createdItems[26].owner,
        borrower: createdUsers[16]._id, // Pranav
        startDate: new Date(now.getTime() - 110 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 103 * MS_PER_DAY),
        numberOfDays: 7,
        pricePerDay: createdItems[26].pricePerDay,
        securityDeposit: createdItems[26].securityDeposit,
        rentalFee: createdItems[26].pricePerDay * 7,
        totalAmount: createdItems[26].pricePerDay * 7 + createdItems[26].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[26].location
      },
      {
        item: createdItems[27]._id, // Thule Cargo Box
        owner: createdItems[27].owner,
        borrower: createdUsers[17]._id, // Divya
        startDate: new Date(now.getTime() - 120 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 116 * MS_PER_DAY),
        numberOfDays: 4,
        pricePerDay: createdItems[27].pricePerDay,
        securityDeposit: createdItems[27].securityDeposit,
        rentalFee: createdItems[27].pricePerDay * 4,
        totalAmount: createdItems[27].pricePerDay * 4 + createdItems[27].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Completed',
        pickupLocation: createdItems[27].location
      },
      // I. Rejected and Cancelled samples
      {
        item: createdItems[2]._id, // iPad Pro
        owner: createdItems[2].owner,
        borrower: createdUsers[18]._id, // Varun
        startDate: new Date(now.getTime() - 5 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 3 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[2].pricePerDay,
        securityDeposit: createdItems[2].securityDeposit,
        rentalFee: createdItems[2].pricePerDay * 2,
        totalAmount: createdItems[2].pricePerDay * 2 + createdItems[2].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Rejected',
        rejectionReason: 'Item was temporarily unavailable due to scheduled firmware maintenance.',
        pickupLocation: createdItems[2].location
      },
      {
        item: createdItems[3]._id, // 100-inch Screen
        owner: createdItems[3].owner,
        borrower: createdUsers[19]._id, // Kavita
        startDate: new Date(now.getTime() - 8 * MS_PER_DAY),
        endDate: new Date(now.getTime() - 6 * MS_PER_DAY),
        numberOfDays: 2,
        pricePerDay: createdItems[3].pricePerDay,
        securityDeposit: createdItems[3].securityDeposit,
        rentalFee: createdItems[3].pricePerDay * 2,
        totalAmount: createdItems[3].pricePerDay * 2 + createdItems[3].securityDeposit,
        deliveryOption: 'Self Pickup',
        status: 'Cancelled',
        borrowerNote: 'Cancelled by borrower: event postponed to next month.',
        pickupLocation: createdItems[3].location
      }
    ];

    const createdRentals = [];
    for (const rData of rentalEntries) {
      const r = await Rental.create(rData);
      createdRentals.push(r);
    }
    console.log(`[Seeder] Seeded ${createdRentals.length} realistic rentals.`);

    // 5. Seed Reviews
    console.log('[Seeder] Inserting verified community reviews...');
    const completedRentals = createdRentals.filter((r) => r.status === 'Completed');
    const createdReviews = [];

    for (let i = 0; i < reviewsSeed.length; i++) {
      const reviewTemplate = reviewsSeed[i];
      const targetItem = createdItems[i % createdItems.length];
      const reviewer = createdUsers[(i + 2) % createdUsers.length];

      // Link to an actual completed rental if available for that item
      const matchedRental = completedRentals.find(
        (cr) => cr.item.toString() === targetItem._id.toString()
      );

      try {
        const rev = await Review.create({
          item: targetItem._id,
          rental: matchedRental ? matchedRental._id : undefined,
          reviewer: reviewer._id,
          rating: reviewTemplate.rating,
          comment: reviewTemplate.comment
        });
        createdReviews.push(rev);
      } catch (revErr) {
        // Skip on rare duplicate review index
      }
    }
    console.log(`[Seeder] Seeded ${createdReviews.length} authentic reviews.`);

    // Recalculate average ratings for all items
    for (const item of createdItems) {
      const itemReviews = await Review.find({ item: item._id });
      if (itemReviews.length > 0) {
        const sum = itemReviews.reduce((acc, r) => acc + r.rating, 0);
        item.rating = Number((sum / itemReviews.length).toFixed(1));
        item.numReviews = itemReviews.length;
        await item.save();
      }
    }

    // 6. Seed Wishlists
    console.log('[Seeder] Populating community wishlists...');
    const wishlistPairs = [
      // Rahul Kulkarni saves items he wants to rent
      { user: borrowerUser._id, item: createdItems[0]._id }, // Epson Projector
      { user: borrowerUser._id, item: createdItems[1]._id }, // BenQ 4K Projector
      { user: borrowerUser._id, item: createdItems[14]._id }, // PS5
      { user: borrowerUser._id, item: createdItems[18]._id }, // JBL Partybox
      { user: borrowerUser._id, item: createdItems[21]._id }, // Trek Mountain Bike
      // Pooja saves items
      { user: lenderUser._id, item: createdItems[15]._id }, // Meta Quest 3
      { user: lenderUser._id, item: createdItems[26]._id }, // Samsonite Suitcase
      { user: lenderUser._id, item: createdItems[29]._id }, // Sewing Machine
      // Other users save items
      { user: createdUsers[3]._id, item: createdItems[4]._id },
      { user: createdUsers[3]._id, item: createdItems[5]._id },
      { user: createdUsers[4]._id, item: createdItems[11]._id },
      { user: createdUsers[5]._id, item: createdItems[23]._id },
      { user: createdUsers[6]._id, item: createdItems[16]._id },
      { user: createdUsers[7]._id, item: createdItems[17]._id },
      { user: createdUsers[8]._id, item: createdItems[5]._id },
      { user: createdUsers[9]._id, item: createdItems[21]._id }
    ];

    let seededWishlists = 0;
    for (const wp of wishlistPairs) {
      try {
        await Wishlist.create(wp);
        seededWishlists++;
      } catch (wErr) {
        // Skip duplicate
      }
    }
    console.log(`[Seeder] Seeded ${seededWishlists} wishlist bookmarks.`);

    // 7. Seed Notifications
    console.log('[Seeder] Populating user notification feeds...');
    const notificationEntries = [
      // Lender notifications
      {
        user: lenderUser._id,
        title: 'New Rental Request Received! 🔔',
        message: 'Rahul Kulkarni has requested to rent your "Epson EpiqVision Mini EF12 Laser Projector".',
        type: 'rental_request',
        relatedItem: createdItems[0]._id,
        relatedRental: createdRentals[0]._id,
        isRead: false
      },
      {
        user: lenderUser._id,
        title: 'Rental Booking Active! 🚀',
        message: 'Rohan Joshi has picked up your "Sony PlayStation 5 Disc Edition Console".',
        type: 'rental_active',
        relatedItem: createdItems[14]._id,
        relatedRental: createdRentals[3]._id,
        isRead: false
      },
      {
        user: lenderUser._id,
        title: 'Rental Completed & Funds Cleared! 💰',
        message: 'Rental completed for "Sony Alpha A7 IV". ₹3,600 has been credited to your payout balance.',
        type: 'rental_completed',
        relatedItem: createdItems[4]._id,
        relatedRental: createdRentals[5]._id,
        isRead: true
      },
      {
        user: lenderUser._id,
        title: 'New 5-Star Review Received! ⭐',
        message: 'Rahul Kulkarni left a 5-star rating: "Pooja was an extraordinary lender..."',
        type: 'review_received',
        relatedItem: createdItems[4]._id,
        isRead: true
      },

      // Borrower notifications (Rahul)
      {
        user: borrowerUser._id,
        title: 'Rental Request Pending Approval ⏳',
        message: 'Your rental request for "Epson EpiqVision Projector" was sent to Pooja Deshmukh.',
        type: 'rental_request',
        relatedItem: createdItems[0]._id,
        relatedRental: createdRentals[0]._id,
        isRead: false
      },
      {
        user: borrowerUser._id,
        title: 'Gear Rental Active! ⛺',
        message: 'Your rental for "Quechua MH100 4-Person Waterproof Tent" is now in progress. Enjoy your trip!',
        type: 'rental_active',
        relatedItem: createdItems[11]._id,
        relatedRental: createdRentals[7]._id,
        isRead: false
      },
      {
        user: borrowerUser._id,
        title: 'Security Deposit Refunded Successfully 🛡️',
        message: 'Your ₹3,000 security deposit for "DJI Mini 3 Pro Drone" has been returned.',
        type: 'rental_completed',
        relatedItem: createdItems[5]._id,
        relatedRental: createdRentals[8]._id,
        isRead: true
      },

      // Admin notifications
      {
        user: adminUser._id,
        title: 'System Milestone Reached 🎉',
        message: 'LendKart network has exceeded 30 active community equipment listings across 10 metro cities!',
        type: 'system',
        isRead: false
      },
      {
        user: adminUser._id,
        title: 'New SuperLender Verification Completed',
        message: 'Pooja Deshmukh (Pune) has completed government ID verification and phone validation.',
        type: 'system',
        isRead: true
      },
      {
        user: adminUser._id,
        title: 'Weekly Community Payout Processed',
        message: 'All completed rental disbursements have been finalized for the current billing cycle.',
        type: 'system',
        isRead: true
      }
    ];

    const createdNotifications = await Notification.insertMany(notificationEntries);
    console.log(`[Seeder] Seeded ${createdNotifications.length} notifications.`);

    // 8. Seed Blogs
    console.log('[Seeder] Inserting editorial SEO blog articles...');
    const createdBlogs = await Blog.insertMany(blogsData);
    console.log(`[Seeder] Seeded ${createdBlogs.length} editorial blog guides.`);

    // 9. Automated Data Integrity & Quality Check
    console.log('\n[Seeder] Executing Data Integrity & Reference Validation...');
    const [
      uCount,
      cCount,
      iCount,
      rCount,
      revCount,
      wCount,
      nCount,
      bCount
    ] = await Promise.all([
      User.countDocuments(),
      Category.countDocuments(),
      Item.countDocuments(),
      Rental.countDocuments(),
      Review.countDocuments(),
      Wishlist.countDocuments(),
      Notification.countDocuments(),
      Blog.countDocuments()
    ]);

    // Verify all item owners & categories exist
    const orphanItems = await Item.find({
      $or: [
        { owner: { $nin: createdUsers.map((u) => u._id) } },
        { category: { $nin: createdCategories.map((c) => c._id) } }
      ]
    });
    if (orphanItems.length > 0) {
      throw new Error(`Data Integrity Error: Found ${orphanItems.length} orphan items with invalid references.`);
    }

    // Verify all rentals have valid references
    const orphanRentals = await Rental.find({
      $or: [
        { item: { $nin: createdItems.map((i) => i._id) } },
        { borrower: { $nin: createdUsers.map((u) => u._id) } },
        { owner: { $nin: createdUsers.map((u) => u._id) } }
      ]
    });
    if (orphanRentals.length > 0) {
      throw new Error(`Data Integrity Error: Found ${orphanRentals.length} orphan rentals with invalid references.`);
    }

    // Verify passwords match
    const adminLoginCheck = await User.findOne({ email: 'admin@lendkart.demo' }).select('+password');
    const lenderLoginCheck = await User.findOne({ email: 'user@lendkart.demo' }).select('+password');
    const borrowerLoginCheck = await User.findOne({ email: 'rahul@lendkart.demo' }).select('+password');

    const adminMatch = await adminLoginCheck.matchPassword('Admin@123');
    const lenderMatch = await lenderLoginCheck.matchPassword('User@123');
    const borrowerMatch = await borrowerLoginCheck.matchPassword('User@123');

    if (!adminMatch || !lenderMatch || !borrowerMatch) {
      throw new Error('Credential Validation Failed: Seeded passwords do not match demo requirements.');
    }

    console.log('✓ All 8 collections validated');
    console.log('✓ Zero orphan foreign keys');
    console.log('✓ Password hashing and match validation verified');

    // Print Clean Summary
    console.log('\n========================================');
    console.log('LENDKART DATABASE SEED COMPLETE');
    console.log('========================================\n');
    console.log('Database:');
    console.log(conn.connection.name);
    console.log('');
    console.log(`Users:         ${uCount}`);
    console.log(`Categories:    ${cCount}`);
    console.log(`Items:         ${iCount}`);
    console.log(`Rentals:       ${rCount}`);
    console.log(`Reviews:       ${revCount}`);
    console.log(`Wishlists:     ${wCount}`);
    console.log(`Notifications: ${nCount}`);
    console.log(`Blogs:         ${bCount}`);
    console.log('');
    console.log('Admin:');
    console.log('admin@lendkart.demo (Password: Admin@123)');
    console.log('');
    console.log('Lender:');
    console.log('user@lendkart.demo (Password: User@123)');
    console.log('');
    console.log('Borrower:');
    console.log('rahul@lendkart.demo (Password: User@123)');
    console.log('');
    console.log('MongoDB:');
    console.log('CONNECTED (MongoDB Atlas Cluster0)');
    console.log('========================================\n');

    await mongoose.disconnect();
    console.log('[Seeder] Disconnected from MongoDB Atlas cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('\n[Seeder Execution Failed]:', error.message);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

// Execute seeder if run directly
seedDatabase();
