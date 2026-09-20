import dotenv from 'dotenv';
import mongoose from 'mongoose';
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

const itemsCatalog = [
  // Electronics & Gadgets (Projectors, displays)
  {
    title: 'Epson EpiqVision Mini EF12 Laser 1080p Smart Projector',
    categorySlug: 'electronics',
    description: 'Compact 1000 Lumens Full HD laser projection with built-in Android TV and Yamaha sound system. Perfect for movie nights, college presentations, terrace screenings, and FIFA gaming sessions.',
    pricePerDay: 450,
    securityDeposit: 1500,
    condition: 'Like New',
    location: 'Kothrud, Pune',
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
    rentalRules: ['Keep away from liquids', 'Use provided carrying bag', 'Return HDMI & power adapter']
  },
  {
    title: 'BenQ TK700STi 4K HDR Gaming & Home Cinema Projector',
    categorySlug: 'electronics',
    description: 'True 4K 3000 ANSI Lumens short-throw projector with 16ms low input lag. Brilliant for sports screening, rooftop watch parties, and 4K console gaming.',
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
    rentalRules: ['Handle lens with care', 'Do not unplug without cool-down cycle']
  },
  {
    title: 'Apple iPad Pro 12.9" M2 with Apple Pencil 2 & Magic Keyboard',
    categorySlug: 'electronics',
    description: 'Liquid Retina XDR display with ProMotion 120Hz. Ideal for digital artists, UX architects, on-site portfolio presentations, and video editing.',
    pricePerDay: 600,
    securityDeposit: 2000,
    condition: 'Like New',
    location: 'Viman Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    specifications: [
      { key: 'Chip', value: 'Apple M2 8-core CPU / 10-core GPU' },
      { key: 'Display', value: '12.9" Mini-LED Liquid Retina XDR' },
      { key: 'Included', value: 'Pencil 2 + Magic Keyboard' }
    ]
  },
  {
    title: 'ViewSonic 100-Inch Portable Pull-Up Projector Screen',
    categorySlug: 'electronics',
    description: 'High-gain matte white wrinkle-free projection screen with hydraulic scissor stand. Sets up in 10 seconds for garden theaters and seminar rooms.',
    pricePerDay: 250,
    securityDeposit: 600,
    condition: 'Good',
    location: 'Baner, Pune',
    images: [
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Cameras & Photography
  {
    title: 'Sony Alpha A7 IV Full-Frame Mirrorless + 24-70mm f/2.8 GM Lens',
    categorySlug: 'photography',
    description: 'Industry-standard 33MP hybrid camera with 4K 60p 10-bit video, real-time eye autofocus, 2 high-speed SD cards, and 3 genuine Sony batteries.',
    pricePerDay: 1200,
    securityDeposit: 4000,
    condition: 'Like New',
    location: 'Koregaon Park, Pune',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Sensor', value: '33MP Full-Frame Exmor R CMOS' },
      { key: 'Video', value: '4K 60p 10-Bit 4:2:2 All-Intra' },
      { key: 'Stabilization', value: '5-Axis In-Body Image Stabilization' }
    ],
    rentalRules: ['Professional handling only', 'Clean lens with micro-fiber only', 'Return all battery caps']
  },
  {
    title: 'Canon EOS R6 Mark II + RF 50mm f/1.2 L USM Portrait Beast',
    categorySlug: 'photography',
    description: 'Phenomenal low-light photography rig with dreamy bokeh. Ideal for pre-wedding shoots, fashion lookbooks, and high-speed sports event coverage.',
    pricePerDay: 1400,
    securityDeposit: 4500,
    condition: 'Like New',
    location: 'Andheri East, Mumbai',
    images: [
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    specifications: [
      { key: 'Sensor', value: '24.2 MP Full-Frame CMOS' },
      { key: 'Burst', value: 'Up to 40 fps Electronic Shutter' }
    ]
  },
  {
    title: 'DJI Mini 3 Pro Drone with 4K HDR & RC Smart Controller',
    categorySlug: 'photography',
    description: 'Sub-249g ultra-light drone with tri-directional obstacle sensing, true vertical shooting for Instagram reels, and 34-minute flight time per battery.',
    pricePerDay: 950,
    securityDeposit: 3000,
    condition: 'Excellent',
    location: 'Indiranagar, Bengaluru',
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Camera', value: '4K/60fps HDR, 48MP RAW Photos' },
      { key: 'Weight', value: '249 grams (No DGCA license required)' },
      { key: 'Batteries', value: '3x Intelligent Flight Batteries' }
    ],
    rentalRules: ['Do not fly near airport no-fly zones', 'Always maintain visual line of sight']
  },
  {
    title: 'GoPro HERO 12 Black Creator Edition with Media Mod & Light',
    categorySlug: 'photography',
    description: 'Rugged waterproof action camera with HyperSmooth 6.0, Volta battery grip, wireless mic mod, and dual batteries. Ready for treks, bike trips, and scuba diving.',
    pricePerDay: 480,
    securityDeposit: 1500,
    condition: 'Excellent',
    location: 'College Road, Nashik',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Power Tools & DIY
  {
    title: 'Bosch Professional GSB 18V-50 Heavy Duty Cordless Hammer Drill Kit',
    categorySlug: 'tools',
    description: 'Brushless motor delivering 50Nm torque for concrete, masonry, wood, and metal drilling. Includes 2x 18V Li-ion batteries, charger, and 30-piece drill/driver bit kit.',
    pricePerDay: 280,
    securityDeposit: 800,
    condition: 'Excellent',
    location: 'Aundh, Pune',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Torque', value: '50 Nm Brushless' },
      { key: 'Chuck', value: '13mm All-Metal Keyless' },
      { key: 'Batteries', value: '2x 2.0Ah 18V Batteries + Fast Charger' }
    ],
    rentalRules: ['Wear safety glasses', 'Do not force bits against hard stone']
  },
  {
    title: 'Kärcher K3 High-Pressure Washer 120 Bar for Cars & Patios',
    categorySlug: 'tools',
    description: '1600W pressure washer with Vario Power spray lance, dirt blaster nozzle, and 6m high-pressure hose. Ideal for car detailing, balcony cleaning, and driveway wash.',
    pricePerDay: 350,
    securityDeposit: 1000,
    condition: 'Good',
    location: 'Hadapsar, Pune',
    images: [
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'DeWalt 20V MAX 10-Inch Compound Miter Saw',
    categorySlug: 'tools',
    description: 'Precision woodworking miter saw with laser guide line for clean angle cuts in baseboards, shelving, and craft furniture.',
    pricePerDay: 500,
    securityDeposit: 1800,
    condition: 'Like New',
    location: 'Baner, Pune',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Camping & Outdoor
  {
    title: 'Decathlon Quechua 4-Person Fresh & Black Blackout Camping Tent',
    categorySlug: 'outdoor',
    description: 'Patented Fresh & Black fabric stays 99% dark and cool inside even under blazing midday sun. Waterproof, wind-resistant up to 50 km/h, with spacious porch.',
    pricePerDay: 320,
    securityDeposit: 900,
    condition: 'Like New',
    location: 'Kothrud, Pune',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Capacity', value: '4 Adults with Gear' },
      { key: 'Technology', value: 'Fresh & Black Heat Reduction' },
      { key: 'Waterproof', value: '2000mm Polyurethane Rainfly' }
    ],
    rentalRules: ['Dry completely before packing', 'No campfires within 5 meters of tent']
  },
  {
    title: 'Osprey Aether 70L Heavy Expedition Trekking Backpack',
    categorySlug: 'outdoor',
    description: 'Top-of-the-line customizable fit-on-the-fly hipbelt, internal hydration sleeve, and detachable daypack. Ideal for Himalayan treks and multi-day Sahyadri expeditions.',
    pricePerDay: 220,
    securityDeposit: 600,
    condition: 'Excellent',
    location: 'College Road, Nashik',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Coleman Portable Gas Camping Stove + Cookware Mess Kit',
    categorySlug: 'outdoor',
    description: 'Dual burner butane camping stove with wind baffles, cast iron grill plate, and 4-person lightweight anodized aluminum pots and pans.',
    pricePerDay: 180,
    securityDeposit: 500,
    condition: 'Good',
    location: 'Samarth Nagar, Chhatrapati Sambhajinagar',
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Gaming & VR
  {
    title: 'Sony PlayStation 5 Console + 2 DualSense Controllers & 5 Blockbuster Games',
    categorySlug: 'gaming',
    description: 'Ultra-high speed SSD, ray tracing, 4K gaming at 120fps. Includes Spider-Man 2, God of War Ragnarök, EA Sports FC 24, Gran Turismo 7, and Mortal Kombat 1.',
    pricePerDay: 599,
    securityDeposit: 2500,
    condition: 'Like New',
    location: 'Baner, Pune',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Storage', value: '825GB High-Speed NVMe' },
      { key: 'Controllers', value: '2x DualSense Wireless with Haptic Feedback' },
      { key: 'Games Included', value: '5 Disc Games included in carrying briefcase' }
    ],
    rentalRules: ['Do not apply stickers', 'Do not alter console firmware', 'Avoid overheating']
  },
  {
    title: 'Meta Quest 3 512GB Breakthrough Mixed Reality VR Headset',
    categorySlug: 'gaming',
    description: 'Next-gen Snapdragon XR2 Gen 2 graphics with 4K+ Infinite Display and full-color passthrough. Experience Beat Saber, Superhot, and virtual cinema environments.',
    pricePerDay: 750,
    securityDeposit: 3000,
    condition: 'Like New',
    location: 'Koramangala, Bengaluru',
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Resolution', value: '2064x2208 pixels per eye' },
      { key: 'Passthrough', value: 'High-Fidelity RGB Stereo Cameras' }
    ]
  },
  {
    title: 'Nintendo Switch OLED Model + Mario Kart 8 Deluxe & Smash Bros',
    categorySlug: 'gaming',
    description: 'Vibrant 7-inch OLED screen with wide adjustable stand. Complete with TV dock, HDMI cable, and 4 joy-cons for instant 4-player party entertainment.',
    pricePerDay: 380,
    securityDeposit: 1200,
    condition: 'Excellent',
    location: 'Viman Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1578303512597-8be407476965?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Audio & Music
  {
    title: 'Yamaha F310 Full-Size Acoustic Guitar with Padded Gig Bag & Tuner',
    categorySlug: 'music',
    description: 'Rich resonant spruce top and rosewood fingerboard. Tuned, polished, and restrung with D\'Addario strings. Includes digital tuner, capo, and picks.',
    pricePerDay: 190,
    securityDeposit: 600,
    condition: 'Excellent',
    location: 'Indiranagar, Bengaluru',
    images: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    specifications: [
      { key: 'Top Material', value: 'Solid Spruce' },
      { key: 'Neck', value: 'Nato with Rosewood Fretboard' }
    ]
  },
  {
    title: 'JBL PartyBox 310 Portable 240W Bluetooth Party Speaker with Lights',
    categorySlug: 'music',
    description: 'Colossal 240-watt sound output with bass boost and synced dynamic light show. Wheels and telescopic handle for easy rolling to farmhouses or terraces.',
    pricePerDay: 650,
    securityDeposit: 2000,
    condition: 'Like New',
    location: 'Gangapur Road, Nashik',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    specifications: [
      { key: 'Power Output', value: '240W RMS' },
      { key: 'Battery Life', value: 'Up to 18 Hours Playtime' },
      { key: 'Inputs', value: 'Mic & Guitar inputs with Gain' }
    ]
  },
  {
    title: 'RØDE Wireless PRO Dual-Channel Compact Wireless Microphone Kit',
    categorySlug: 'music',
    description: 'Broadcast-grade 32-bit float on-board recording with intelligent GainAssist. Perfect for youtube vloggers, podcast interviews, and conference lectures.',
    pricePerDay: 420,
    securityDeposit: 1500,
    condition: 'Like New',
    location: 'Koregaon Park, Pune',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Sports & Fitness
  {
    title: 'Trek Marlin 7 29er Mountain Bike (Large Frame)',
    categorySlug: 'sports',
    description: 'RockShox fork with lockout, Shimano Deore 1x10 drivetrain, and hydraulic disc brakes. Suitable for Sinhagad hill climbs and rugged gravel trails.',
    pricePerDay: 400,
    securityDeposit: 1500,
    condition: 'Excellent',
    location: 'Dharampeth, Nagpur',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false
  },
  {
    title: 'Yonex Astrox 99 Pro Badminton Kit (Pair + Feather Shuttles)',
    categorySlug: 'sports',
    description: 'Heavy head tournament rackets strung with BG65Ti at 26lbs. Comes with Yonex thermal bag, 6 Yonex feather shuttles, and spare overgrips.',
    pricePerDay: 180,
    securityDeposit: 500,
    condition: 'Excellent',
    location: 'Shivaji Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Events & Party
  {
    title: 'Chauvet DJ GigBAR Move 5-in-1 Complete Lighting System',
    categorySlug: 'events',
    description: 'Features 2 moving heads, derbies, washes, laser, and strobe effect on a single bar with tripod stand and wireless foot controller. Transforms any living room or hall into a club.',
    pricePerDay: 850,
    securityDeposit: 3000,
    condition: 'Like New',
    location: 'Samarth Nagar, Chhatrapati Sambhajinagar',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true
  },
  {
    title: 'Heavy-Duty Fog Smoke Machine 1500W with RGB LEDs & Remote',
    categorySlug: 'events',
    description: 'Produces dense atmospheric fog for Halloween parties, music performances, and dramatic photo shoots. Includes 1 liter premium fluid.',
    pricePerDay: 300,
    securityDeposit: 800,
    condition: 'Good',
    location: 'Wakad, Pune',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    title: 'Catan + Ticket to Ride Europe + Codenames Board Game Party Bundle',
    categorySlug: 'events',
    description: 'Complete collectors edition board games with all wooden pieces, plastic trains, and pristine cards. The ultimate weekend gathering package for friends and family.',
    pricePerDay: 200,
    securityDeposit: 500,
    condition: 'Like New',
    location: 'Shivaji Nagar, Pune',
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80'
    ]
  },

  // Additional Real Products to reach 30+ items
  {
    title: 'Usha Janome Wonder Stitch Automatic Zig-Zag Sewing Machine',
    categorySlug: 'tools',
    description: 'Compact free arm sewing machine with 21 built-in stitches, circular stitching attachment, and automatic needle threader.',
    pricePerDay: 240,
    securityDeposit: 700,
    condition: 'Excellent',
    location: 'Juhu, Mumbai',
    images: ['https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80']
  },
  {
    title: 'Black+Decker 1400W High-Efficiency Electric Lawn Mower',
    categorySlug: 'tools',
    description: '34cm cutting width with 6 height adjustments and 35L grass collection box. Perfect for weekend garden rejuvenation.',
    pricePerDay: 320,
    securityDeposit: 900,
    condition: 'Good',
    location: 'Hadapsar, Pune',
    images: ['https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80']
  },
  {
    title: 'Creality Ender 3 S1 Pro 3D Printer (Pre-calibrated)',
    categorySlug: 'tools',
    description: 'High-temperature 300°C direct dual-gear extruder for PLA, ABS, TPU, and PETG. Includes CR Touch auto bed leveling and PEI spring sheet.',
    pricePerDay: 550,
    securityDeposit: 2000,
    condition: 'Like New',
    location: 'Powai, Mumbai',
    images: ['https://images.unsplash.com/photo-1631557559471-ae6077557637?auto=format&fit=crop&w=800&q=80']
  },
  {
    title: 'Samsonite 30-Inch Hard-Shell Lightweight Luggage Trolley Suitcase',
    categorySlug: 'outdoor',
    description: 'Durable polycarbonate shell with 360-degree silent spinner wheels and TSA combination lock. Spotless interior for international holidays.',
    pricePerDay: 180,
    securityDeposit: 600,
    condition: 'Like New',
    location: 'Golf Course Road, Gurugram',
    images: ['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80']
  },
  {
    title: 'Pioneer DDJ-FLX4 2-Channel DJ Controller for Rekordbox & Serato',
    categorySlug: 'music',
    description: 'Club-style mixer layout with Smart CFX and Smart Fader assistance. Connects directly to laptop, iPad, or smartphone via USB-C.',
    pricePerDay: 480,
    securityDeposit: 1600,
    condition: 'Like New',
    location: 'Viman Nagar, Pune',
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80']
  },
  {
    title: 'Bowflex SelectTech 552 Adjustable Dumbbells Set (Pair, 2kg to 24kg)',
    categorySlug: 'sports',
    description: 'Replaces 15 pairs of dumbbells with a single dial turn. Compact space-saving storage trays included.',
    pricePerDay: 260,
    securityDeposit: 1000,
    condition: 'Excellent',
    location: 'Hauz Khas, New Delhi',
    images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80']
  }
];

const reviewsSeed = [
  {
    rating: 5,
    comment: 'The Epson projector was in immaculate condition! We hosted a 12-person terrace movie screening of Interstellar and everyone was blown away by the clarity and built-in Yamaha sound. Pickup in Kothrud was seamless.'
  },
  {
    rating: 5,
    comment: 'Saved me at least ₹40,000 for our graduation short film project. The Sony A7 IV was well-maintained with extra charged batteries. Will definitely rent again!'
  },
  {
    rating: 5,
    comment: 'Bosch drill worked like a charm for our apartment wall mounts. Clean bits and powerful battery. Super polite owner.'
  },
  {
    rating: 4,
    comment: 'The Quechua Fresh & Black tent kept us remarkably comfortable at Pawna Lake camp despite the humid morning sun. Everything packed neatly.'
  },
  {
    rating: 5,
    comment: 'Rented the PS5 for a weekend reunion. 2 controllers and Spider-Man 2 kept us hooked for 48 hours straight. Fantastic experience.'
  },
  {
    rating: 5,
    comment: 'DJI Mini 3 Pro drone footage in Lonavala came out like a Bollywood movie! Super smooth gimbal and easy controller.'
  },
  {
    rating: 5,
    comment: 'The JBL PartyBox 310 has earth-shattering bass. Lasted our entire farmhouse party on a single charge without needing power cords.'
  },
  {
    rating: 4,
    comment: 'Rented the acoustic guitar for a 3-day music workshop in Indiranagar. Nicely tuned and great action.'
  }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lendkart';
    await mongoose.connect(mongoUri);
    console.log('[Seeder] Connected to MongoDB');

    // Clean existing collections
    await User.deleteMany();
    await Category.deleteMany();
    await Item.deleteMany();
    await Rental.deleteMany();
    await Review.deleteMany();
    await Wishlist.deleteMany();
    await Notification.deleteMany();
    await Blog.deleteMany();
    console.log('[Seeder] Cleared previous database collections.');

    // 1. Seed Categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`[Seeder] Seeded ${createdCategories.length} categories.`);
    const categoryMap = {};
    createdCategories.forEach((c) => {
      categoryMap[c.slug] = c._id;
    });

    // 2. Seed Users
    const createdUsers = [];
    for (const userData of usersData) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log(`[Seeder] Seeded ${createdUsers.length} users with hashed credentials.`);

    // 3. Seed Items
    const createdItems = [];
    for (let i = 0; i < itemsCatalog.length; i++) {
      const itemRaw = itemsCatalog[i];
      const ownerUser = createdUsers[i % createdUsers.length];
      const catId = categoryMap[itemRaw.categorySlug] || createdCategories[0]._id;

      const item = await Item.create({
        ...itemRaw,
        category: catId,
        owner: ownerUser._id,
        rating: 4.8 + (i % 3) * 0.1,
        numReviews: 2 + (i % 4)
      });
      createdItems.push(item);
    }
    console.log(`[Seeder] Seeded ${createdItems.length} rich items.`);

    // Update item counts in categories
    for (const cat of createdCategories) {
      const count = await Item.countDocuments({ category: cat._id });
      cat.itemCount = count;
      await cat.save();
    }

    // 4. Seed Reviews
    for (let i = 0; i < reviewsSeed.length; i++) {
      const reviewData = reviewsSeed[i];
      const targetItem = createdItems[i % createdItems.length];
      const reviewer = createdUsers[(i + 1) % createdUsers.length];

      await Review.create({
        item: targetItem._id,
        reviewer: reviewer._id,
        rating: reviewData.rating,
        comment: reviewData.comment
      });
    }
    console.log(`[Seeder] Seeded ${reviewsSeed.length} reviews.`);

    // 5. Seed Sample Rentals (Pending, Approved, Active, Completed)
    const now = new Date();
    const rentalSamples = [
      {
        item: createdItems[0]._id, // Epson Projector
        owner: createdItems[0].owner,
        borrower: createdUsers[2]._id, // Rahul Kulkarni
        startDate: new Date(now.getTime() + 1 * 86400000),
        endDate: new Date(now.getTime() + 3 * 86400000),
        numberOfDays: 2,
        pricePerDay: createdItems[0].pricePerDay,
        securityDeposit: createdItems[0].securityDeposit,
        rentalFee: createdItems[0].pricePerDay * 2,
        totalAmount: createdItems[0].pricePerDay * 2 + createdItems[0].securityDeposit,
        status: 'Pending',
        borrowerNote: 'Need for college farewell movie screening with batchmates.'
      },
      {
        item: createdItems[4]._id, // Sony A7 IV
        owner: createdItems[4].owner,
        borrower: createdUsers[1]._id, // Pooja Deshmukh
        startDate: new Date(now.getTime() + 5 * 86400000),
        endDate: new Date(now.getTime() + 8 * 86400000),
        numberOfDays: 3,
        pricePerDay: createdItems[4].pricePerDay,
        securityDeposit: createdItems[4].securityDeposit,
        rentalFee: createdItems[4].pricePerDay * 3,
        totalAmount: createdItems[4].pricePerDay * 3 + createdItems[4].securityDeposit,
        status: 'Approved',
        borrowerNote: 'Hiring for weekend destination wedding photoshoot.'
      },
      {
        item: createdItems[8]._id, // Bosch Drill
        owner: createdItems[8].owner,
        borrower: createdUsers[3]._id, // Ananya Iyer
        startDate: new Date(now.getTime() - 2 * 86400000),
        endDate: new Date(now.getTime() + 1 * 86400000),
        numberOfDays: 3,
        pricePerDay: createdItems[8].pricePerDay,
        securityDeposit: createdItems[8].securityDeposit,
        rentalFee: createdItems[8].pricePerDay * 3,
        totalAmount: createdItems[8].pricePerDay * 3 + createdItems[8].securityDeposit,
        status: 'Active',
        borrowerNote: 'Putting up shelves and sound-damping studio foam.'
      },
      {
        item: createdItems[14]._id, // PS5
        owner: createdItems[14].owner,
        borrower: createdUsers[4]._id, // Vikramaditya
        startDate: new Date(now.getTime() - 7 * 86400000),
        endDate: new Date(now.getTime() - 5 * 86400000),
        numberOfDays: 2,
        pricePerDay: createdItems[14].pricePerDay,
        securityDeposit: createdItems[14].securityDeposit,
        rentalFee: createdItems[14].pricePerDay * 2,
        totalAmount: createdItems[14].pricePerDay * 2 + createdItems[14].securityDeposit,
        status: 'Completed',
        borrowerNote: 'Weekend gaming party with cousins.'
      }
    ];

    for (const rentalData of rentalSamples) {
      await Rental.create(rentalData);
    }
    console.log(`[Seeder] Seeded ${rentalSamples.length} realistic rentals across all statuses.`);

    // 6. Seed Notifications
    await Notification.create([
      {
        user: createdUsers[0]._id, // Admin
        title: 'New Rental Request Received',
        message: 'Rahul Kulkarni has requested to rent your "Epson EpiqVision Projector".',
        type: 'rental_request',
        relatedItem: createdItems[0]._id
      },
      {
        user: createdUsers[1]._id, // Pooja
        title: 'Rental Request Approved! 🎉',
        message: 'Your rental request for "Sony Alpha A7 IV" has been approved by the owner.',
        type: 'rental_approved',
        relatedItem: createdItems[4]._id
      },
      {
        user: createdUsers[4]._id, // Vikram
        title: 'Rental Completed! ⭐',
        message: 'Your rental for "PlayStation 5 Console" has concluded. Leave a review to help the community!',
        type: 'rental_completed',
        relatedItem: createdItems[14]._id
      }
    ]);
    console.log('[Seeder] Seeded notifications.');

    // 7. Seed Blogs
    await Blog.insertMany(blogsData);
    console.log(`[Seeder] Seeded ${blogsData.length} SEO blog articles.`);

    console.log('\n=========================================');
    console.log('🎉 LendKart Demo Database Successfully Seeded!');
    console.log('Demo Credentials:');
    console.log('  Admin:    admin@lendkart.demo  / Password@123');
    console.log('  Lender:   user@lendkart.demo   / Password@123');
    console.log('  Borrower: rahul@lendkart.demo  / Password@123');
    console.log('=========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seeder Error]:', error);
    process.exit(1);
  }
}

seedDatabase();
