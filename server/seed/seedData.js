import bcrypt from 'bcryptjs';

export const categoriesData = [
  {
    name: 'Electronics & Gadgets',
    slug: 'electronics',
    description: 'High-end displays, 4K smart projectors, tablets, streaming gears, and monitors.',
    icon: 'Tv',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cameras & Photography',
    slug: 'photography',
    description: 'DSLRs, full-frame mirrorless rigs, cinema primes, gimbals, and 4K action cams.',
    icon: 'Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Power Tools & DIY',
    slug: 'tools',
    description: 'Cordless brushless drills, miter saws, orbital sanders, pressure washers, and hand toolkits.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Camping & Outdoor',
    slug: 'outdoor',
    description: 'Weatherproof tents, trekking rucksacks, camping lanterns, sleeping bags, and portable stoves.',
    icon: 'Tent',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Gaming & VR',
    slug: 'gaming',
    description: 'PlayStation 5 consoles, Xbox Wireless controllers, Nintendo Switch OLED, and Meta Quest headsets.',
    icon: 'Gamepad2',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Audio & Music',
    slug: 'music',
    description: 'Acoustic & electric guitars, 2-channel DJ mixers, high-output party speakers, and studio mics.',
    icon: 'Music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports',
    description: 'Badminton sets, mountain bicycles, English willow cricket bats, and adjustable dumbbell sets.',
    icon: 'Trophy',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Events & Party',
    slug: 'events',
    description: 'Strobe & laser lighting rigs, mist machines, wireless karaoke systems, and projection backdrops.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Travel & Luggage',
    slug: 'travel',
    description: 'Hard-shell spinner suitcases, waterproof duffels, modular camera bags, and roof-cargo carriers.',
    icon: 'Luggage',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Home & Living',
    slug: 'home',
    description: 'Professional sewing machines, pressure steam cleaners, cordless lawn trimmers, and board games.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
  }
];

export const usersData = [
  // 1. Admin Demo Account
  {
    name: 'Aarav Sharma',
    email: 'admin@lendkart.demo',
    password: 'Admin@123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98230 11223',
    location: 'Kothrud, Pune',
    rating: 4.95,
    reviewsCount: 14,
    isVerified: true,
    bio: 'Platform administrator & verified super-lender in Pune. Tech enthusiast & community advocate.'
  },
  // 2. Primary Lender Demo Account
  {
    name: 'Pooja Deshmukh',
    email: 'user@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98221 44556',
    location: 'Viman Nagar, Pune',
    rating: 4.92,
    reviewsCount: 19,
    isVerified: true,
    bio: 'Commercial photographer & passionate gear lender. Sharing premium lenses, audio gear, and laser projectors with trusted neighbors.'
  },
  // 3. Primary Borrower Demo Account
  {
    name: 'Rahul Kulkarni',
    email: 'rahul@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98901 22334',
    location: 'Bandra West, Mumbai',
    rating: 4.88,
    reviewsCount: 12,
    isVerified: true,
    bio: 'Avid weekend trekker, documentary filmmaker, and DIY maker. Why buy when you can borrow!'
  },
  // Additional Diverse Indian Community Members
  {
    name: 'Ananya Iyer',
    email: 'ananya@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98112 33445',
    location: 'Koregaon Park, Pune',
    rating: 4.9,
    reviewsCount: 8,
    isVerified: true,
    bio: 'Content creator & podcast host. Quality gear for student creators and indie filmmakers.'
  },
  {
    name: 'Vikramaditya Shinde',
    email: 'vikram@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    phone: '+91 97654 12309',
    location: 'College Road, Nashik',
    rating: 4.82,
    reviewsCount: 11,
    isVerified: true,
    bio: 'Sahyadri trekking guide & outdoor adventurer. All-weather gear tested in torrential monsoons.'
  },
  {
    name: 'Sneha Patil',
    email: 'sneha@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    phone: '+91 94231 88776',
    location: 'Samarth Nagar, Chhatrapati Sambhajinagar',
    rating: 4.94,
    reviewsCount: 15,
    isVerified: true,
    bio: 'Event decorator and party planner. Transforming terrace birthdays with ambient lights and sound.'
  },
  {
    name: 'Rohan Joshi',
    email: 'rohan@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    phone: '+91 91588 33441',
    location: 'Baner, Pune',
    rating: 4.78,
    reviewsCount: 6,
    isVerified: true,
    bio: 'Console gamer and tech reviewer. High-FPS gaming rigs and tournament peripherals.'
  },
  {
    name: 'Meera Sengupta',
    email: 'meera@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98450 77123',
    location: 'Indiranagar, Bengaluru',
    rating: 4.96,
    reviewsCount: 14,
    isVerified: true,
    bio: 'Classical music teacher & acoustic guitarist. Handcrafted instruments kept in prime condition.'
  },
  {
    name: 'Aditya Mehta',
    email: 'aditya@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98200 44332',
    location: 'Andheri East, Mumbai',
    rating: 4.89,
    reviewsCount: 10,
    isVerified: true,
    bio: 'Licensed drone pilot and landscape cinematographer.'
  },
  {
    name: 'Tanvi Gaikwad',
    email: 'tanvi@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    phone: '+91 97660 55443',
    location: 'Dharampeth, Nagpur',
    rating: 4.75,
    reviewsCount: 7,
    isVerified: true,
    bio: 'Fitness coach and gravel cycling enthusiast.'
  },
  {
    name: 'Karan Malhotra',
    email: 'karan@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98100 12890',
    location: 'Hauz Khas, New Delhi',
    rating: 4.91,
    reviewsCount: 13,
    isVerified: true,
    bio: 'Interior architect & home improvement specialist. Heavy duty power tools ready for DIY builders.'
  },
  {
    name: 'Neha Chawla',
    email: 'neha@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98711 44550',
    location: 'Wakad, Pune',
    rating: 4.86,
    reviewsCount: 9,
    isVerified: true,
    bio: 'Culinary artist and event host with catering equipment and tabletop decor.'
  },
  {
    name: 'Siddharth Nair',
    email: 'siddharth@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    phone: '+91 99401 22339',
    location: 'Koramangala, Bengaluru',
    rating: 4.83,
    reviewsCount: 5,
    isVerified: true,
    bio: 'Software engineer by day, high-fidelity home theater enthusiast by night.'
  },
  {
    name: 'Riddhi Shah',
    email: 'riddhi@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98250 11990',
    location: 'Juhu, Mumbai',
    rating: 4.95,
    reviewsCount: 18,
    isVerified: true,
    bio: 'Fashion designer with Japanese computerized sewing machines and pattern cutters.'
  },
  {
    name: 'Harshvardhan Rao',
    email: 'harsh@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    phone: '+91 94480 33112',
    location: 'Aundh, Pune',
    rating: 4.8,
    reviewsCount: 8,
    isVerified: true,
    bio: 'Fine woodworking enthusiast with Bosch table saws, clamps, and planers.'
  },
  {
    name: 'Ishita Bansal',
    email: 'ishita@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98188 55667',
    location: 'Golf Course Road, Gurugram',
    rating: 4.92,
    reviewsCount: 11,
    isVerified: true,
    bio: 'Travel journalist with ultra-lightweight mountaineering gear and luggage sets.'
  },
  {
    name: 'Pranav Kulkarni',
    email: 'pranav@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=400&q=80',
    phone: '+91 96231 44552',
    location: 'Gangapur Road, Nashik',
    rating: 4.84,
    reviewsCount: 6,
    isVerified: true,
    bio: 'Sound technician with JBL club monitors and Shure vocal microphones.'
  },
  {
    name: 'Divya Agarwal',
    email: 'divya@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98300 22119',
    location: 'Shivaji Nagar, Pune',
    rating: 4.87,
    reviewsCount: 10,
    isVerified: true,
    bio: 'Collector of European strategy board games and cooperative puzzles.'
  },
  {
    name: 'Varun Somani',
    email: 'varun@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98210 99881',
    location: 'Powai, Mumbai',
    rating: 4.91,
    reviewsCount: 12,
    isVerified: true,
    bio: 'Robotics maker with 3D resin printers, digital oscilloscopes, and soldering stations.'
  },
  {
    name: 'Kavita Menon',
    email: 'kavita@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98410 33221',
    location: 'Hadapsar, Pune',
    rating: 4.89,
    reviewsCount: 7,
    isVerified: true,
    bio: 'Urban gardening specialist with electric hedge trimmers and high-pressure soil aerators.'
  },
  {
    name: 'Arjun Reddy',
    email: 'arjun@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98490 66778',
    location: 'Jubilee Hills, Hyderabad',
    rating: 4.93,
    reviewsCount: 16,
    isVerified: true,
    bio: 'Independent film director with Blackmagic 6K Pro cinema cameras and wireless follow-focus rigs.'
  },
  {
    name: 'Priya Sundaram',
    email: 'priya@lendkart.demo',
    password: 'User@123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98400 88991',
    location: 'Besant Nagar, Chennai',
    rating: 4.9,
    reviewsCount: 9,
    isVerified: true,
    bio: 'Scuba diver and water sports enthusiast with GoPro Hero 12 underwater bundles.'
  }
];

export const blogsData = [
  {
    title: 'Why Renting Is Better Than Buying for 90% of High-End Gadgets',
    slug: 'why-renting-is-better-than-buying-sometimes',
    excerpt: 'Discover how smart urban consumers save up to ₹85,000 every year by renting projectors, cameras, and power tools only when actually needed.',
    content: `When was the last time you used that ₹4,500 power drill sitting in your bottom closet drawer? If you are like the average homeowner, that drill has experienced a grand total of 13 minutes of operating time across its entire lifespan.

### The Hidden Financial Drain of Ownership
From rapid depreciation and storage clutter to battery degradation and maintenance, purchasing expensive gadgets for one-off tasks is a silent wealth killer. 

### Why Community Rentals Are the Future
1. **Capital Velocity:** Instead of locking up ₹45,000 into a 4K home projector for a weekend gathering, rent it on LendKart for just ₹650/day.
2. **Eco-Friendly Footprint:** Decreasing duplicate consumer manufacturing prevents metric tons of e-waste and carbon emissions.
3. **Always Latest Tech:** Rent the latest Sony A7IV or Meta Quest 3 without worrying about product obsolescence when next season's revision arrives.`,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rental Economics', 'Smart Living', 'Sustainability'],
    readTime: '4 min read',
    featured: true,
    views: 420
  },
  {
    title: 'How to Rent a Projector for a One-Day Event: Complete Host\'s Checklist',
    slug: 'how-to-rent-projector-one-day-event-checklist',
    excerpt: 'Planning a terrace movie screening, sports final watch party, or office seminar? Here is everything you need to know about lumens, throw ratios, and sound.',
    content: `Hosting a movie night or live cricket screening sounds simple—until you realize a 55-inch TV cannot create that authentic stadium atmosphere. Here is your step-by-step rental guide:

### 1. Lumens Matter
- **Indoor Dark Rooms:** 1,000–2,000 ANSI Lumens is plenty for clear, rich contrast.
- **Semi-Lit Terraces & Backyards:** Always look for 3,000+ ANSI Lumens projectors like the BenQ TK700STi to prevent washed-out colors.

### 2. Built-in Audio vs Dedicated Boombox
While laser projectors come with solid stereo speakers, outdoor screenings need serious acoustic power. Pair your projector with a rented JBL PartyBox or Marshall speaker for crystal-clear dialogue and ground-shaking bass.

### 3. Screen vs White Wall
A dedicated 100-inch pull-up matte screen increases picture brightness and color saturation by nearly 40% compared to typical building wall textures.`,
    coverImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Projector Guide', 'Event Hosting', 'Tech Tips'],
    readTime: '5 min read',
    featured: true,
    views: 610
  },
  {
    title: 'Beginner\'s Guide to Renting Photography & Cinema Equipment',
    slug: 'beginners-guide-renting-photography-equipment',
    excerpt: 'How aspiring photographers, YouTubers, and film students access ₹3,00,000+ camera rigs safely and affordably for client gigs.',
    content: `Commercial photography and corporate video production demand bleeding-edge glass and bodies. Yet, investing hundreds of thousands of rupees upfront can bankrupt an early-career creative.

### Golden Rules of Gear Rental
1. **Reserve 48 Hours Early:** High-demand full-frame bodies like the Sony A7 IV and Canon R6 Mark II are booked quickly on weekends.
2. **Test Before Leaving the Lender:** Power on the camera, verify clean sensor glass, test the autofocus motor, and format the memory cards.
3. **Carry Backup Batteries:** Video shooting devours battery life quickly. LendKart SuperLenders typically provide dual batteries and dual bay chargers with camera bodies.`,
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    tags: ['Photography', 'Videography', 'Creative Career'],
    readTime: '6 min read',
    featured: false,
    views: 385
  },
  {
    title: 'Things to Check Before Renting Power Tools for Home DIY Projects',
    slug: 'things-to-check-before-renting-power-tools',
    excerpt: 'Put safety first. From chuck sizes and battery voltage to RPM limits, here is how to rent cordless hammer drills, miter saws, and sanders with confidence.',
    content: `DIY home improvement is deeply satisfying, but using the wrong tool or uncalibrated equipment can ruin your project and cause injury.

### Pre-Rental Checklist
- **Battery Health:** Always ensure 18V or 20V Max cordless tools come with fully charged lithium packs and health-indicating LEDs.
- **Correct Drill Bits:** Masonry concrete requires SDS hammer bits, while drywall and softwood require standard Brad point bits. Ask the lender to include common drill bit organizers.
- **Safety Gear:** Protective goggles, work gloves, and earplugs are mandatory whenever operating rotary saws or rotary hammers.`,
    coverImage: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=1200&q=80',
    tags: ['DIY & Tools', 'Home Improvement', 'Safety First'],
    readTime: '4 min read',
    featured: false,
    views: 290
  },
  {
    title: 'How Community Rental Platforms Drastically Reduce Electronic Waste',
    slug: 'how-community-rental-platforms-reduce-waste',
    excerpt: 'The environmental imperative of the circular economy: Why sharing 1 projector between 20 households is better than manufacturing 20 individual units.',
    content: `Electronic waste (e-waste) is currently the world's fastest-growing domestic waste stream. Millions of consumer devices end up in landfills simply because owners upgrade or lose interest after minimal usage.

### The Power of Collaborative Consumption
When communities share high-quality assets:
- **Manufacturing Footprint Drops:** Fewer microchips, plastic casings, and lithium cells need to be mined and refined.
- **Maximum Asset Utility:** A projector rented 30 times a year achieves 10x the utility lifecycle compared to an idle unit in an attic.
- **Eco-Conscious Lifestyles:** Renters enjoy access to luxury gear without carrying the burden of environmental guilt.`,
    coverImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sustainability', 'Circular Economy', 'Green Tech'],
    readTime: '5 min read',
    featured: true,
    views: 470
  },
  {
    title: 'Essential Camping & Trekking Gear You Can Rent Instead of Buy',
    slug: 'camping-gear-you-can-rent-instead-of-buy',
    excerpt: 'Heading to the Sahyadri mountains or Himachal trails? Save money on 4-person waterproof tents, sub-zero sleeping bags, and high-capacity rucksacks.',
    content: `Camping is one of the most liberating weekend activities, but purchasing specialized gear for 2 or 3 trips a year makes zero financial sense.

### Top Camping Gear to Rent
1. **Quechua 4-Person Waterproof Tents:** High-wind resistant, blackout interior, and double-roof ventilation for condensation control.
2. **0°C Down Sleeping Bags:** Down insulation compresses tightly in backpacks and keeps you warm during frosty hilltop nights.
3. **Rechargeable LED Lanterns & Stoves:** Reliable lighting and compact butane stoves turn any wilderness campsite into a cozy base camp.`,
    coverImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    tags: ['Camping & Outdoor', 'Trekking', 'Travel Hacks'],
    readTime: '4 min read',
    featured: false,
    views: 340
  },
  {
    title: 'How to Safely Rent Items Online: ID Verification, Deposits & Trust',
    slug: 'how-to-safely-rent-items-online',
    excerpt: 'A complete security breakdown on how LendKart protects both lenders and borrowers with government ID checks and digital security deposits.',
    content: `Trust is the backbone of any peer-to-peer marketplace. Here is how modern technology protects community members:

### Multi-Tiered Safety Architecture
- **Government ID Verification:** All active lenders and borrowers undergo identity validation to ensure real accountability.
- **Escrow-Style Security Deposits:** Deposits are held safely during the rental window and automatically released upon hassle-free return.
- **Transparent Mutual Reviews:** Both parties rate each other after every transaction, creating a verifiable community reputation.`,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Trust & Safety', 'Security', 'LendKart Community'],
    readTime: '5 min read',
    featured: false,
    views: 520
  },
  {
    title: 'Best Equipment to Rent for College Fests & Student Events',
    slug: 'best-things-to-rent-for-college-events',
    excerpt: 'Host epic campus events on a student budget: From party lighting rigs and DJ mixers to drone cameras and FIFA console setups.',
    content: `Student committees constantly face tight budgets when organizing annual festivals, sports tournaments, and club farewells.

### Top Student Event Rentals
- **Club DJ Controllers:** Pioneer DDJ controllers let student DJs plug directly into their laptops and mix Serato or Rekordbox tracks.
- **Strobe & Laser Rigs:** Transform bare college auditoriums into dazzling music venues with sound-activated party lights.
- **Tournament Consoles:** Run campus FIFA and Tekken e-sports tournaments with rented PlayStation 5 and dual DualSense controllers.`,
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    tags: ['College Events', 'Student Life', 'Party Gear'],
    readTime: '4 min read',
    featured: true,
    views: 480
  }
];
