import { Product, User } from '../types/ecommerce';

/**
 * Seed data for the e-commerce database.
 * Formatted as MongoDB document collections.
 * High-quality isolated product packshots with budget-friendly Indian Rupee (₹) pricing.
 */

export const INITIAL_PRODUCTS: Product[] = [
  {
    _id: '6650a1f2b48e3a0012e8b010',
    name: 'GOBOULT Mustang Torq Wireless Earbuds',
    tagline: '60H Playtime, Quad Mic ENC, 45ms Low Latency & Breathing Racing LEDs',
    slug: 'goboult-mustang-torq-wireless-earbuds',
    category: 'Audio',
    price: 799,
    originalPrice: 1899,
    rating: 4.2,
    reviewCount: 15144,
    inStock: true,
    inventoryCount: 85,
    featured: true,
    badge: 'Popular Choice',
    imageUrl: '/assets/aistudio/image_9ea3a13e.png',
    description: 'Designed with iconic Mustang 302 racing livery in green and white. Features massive 13mm BoomX dynamic drivers, quad mic environmental noise cancellation for crystal-clear client calls, custom companion app EQ, and 45ms combat latency mode for coding and gaming.',
    features: [
      '60 Hours combined battery endurance with Type-C Fast Charging',
      'Quad Mic ENC (Environmental Noise Cancellation) for noise-free voice pickup',
      '45ms ultra-low latency synchronization for gaming and video streaming',
      '13mm Titanium dynamic drivers tuned for rich bass and crisp highs',
      'Breathing LED accents on charging cradle with Mustang 302 graphics'
    ],
    specs: {
      'Form Factor': 'In-Ear True Wireless Stereo (TWS)',
      'Total Playtime': '60 Hours (10 Hours per charge on buds)',
      'Drivers': '13mm BoomX Dynamic Acoustic Drivers',
      'Microphones': 'Quad Mic Array with Hardware ENC Filter',
      'Latency': '45ms Combat Low Latency Mode',
      'Connectivity': 'Bluetooth 5.3 + Dual Device Pairing',
      'Charging Time': '10 mins flash charge = 120 mins playtime',
      'Water Resistance': 'IPX5 Sweat & Splash Proof',
      'In-Box Contents': 'Earbuds, Charging Case, USB-C Cable, 3 Pair Ear Tips, Warranty Card'
    },
    createdAt: '2026-02-15T09:00:00.000Z',
    updatedAt: '2026-02-26T14:30:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b014',
    name: 'STRIFF 2-in-1 Ergonomic Laptop & Mobile Stand',
    tagline: 'Adjustable Height, Anti-Slip Base, Heat Dissipation for Laptops up to 15.6"',
    slug: 'striff-2-in-1-laptop-mobile-stand',
    category: 'Workspace',
    price: 209,
    originalPrice: 1499,
    rating: 4.2,
    reviewCount: 47061,
    inStock: true,
    inventoryCount: 150,
    featured: true,
    badge: 'Festival Deal · 86% Off',
    imageUrl: '/assets/aistudio/image_5545e1e0.png',
    description: 'Ergonomic dual-purpose desktop workstation riser. Engineered with 7 adjustable height levels to prevent cervical spine and neck strain. Includes an integrated fold-out smartphone holder, hollow-carved ventilation for laptop cooling, and durable anti-skid rubber pads.',
    features: [
      '7-level adjustable ergonomic tilt angles from 15° to 45°',
      'Built-in foldable smartphone cradle for dual-screen productivity',
      'Hollow heat-dissipation design prevents laptop thermal throttling',
      'Non-slip silicone feet and dual front hooks prevent device slippage',
      'Ultra-lightweight collapsible design easily fits into any backpack'
    ],
    specs: {
      'Compatibility': 'All laptops from 10 to 15.6 inches (MacBook, Dell, HP, Lenovo)',
      'Adjustable Angles': '7 Height Elevation Positions',
      'Material': 'High-Toughness Engineered ABS + Silicone Pads',
      'Weight': '260 grams (Foldable & Pocketable)',
      'Phone Cradle': 'Integrated slide-out mobile holder included',
      'Load Capacity': 'Up to 10 kg stable load bearing',
      'Dimensions': '280 x 270 x 15 mm folded'
    },
    createdAt: '2026-02-18T10:00:00.000Z',
    updatedAt: '2026-02-26T16:30:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b012',
    name: 'BIGASUO 128GB Mini MP3 Music Player',
    tagline: 'Bluetooth 5.4, 128GB Storage Included, Voice Control Earphones & FM Radio',
    slug: 'bigasuo-128gb-mini-mp3-music-player',
    category: 'Audio',
    price: 699,
    originalPrice: 1499,
    rating: 4.3,
    reviewCount: 1280,
    inStock: true,
    inventoryCount: 42,
    featured: true,
    badge: '128GB Included',
    imageUrl: '/assets/aistudio/image_d3a50671.png',
    description: 'Pocket-sized dedicated lossless music player engineered for distraction-free listening during focus coding sessions and workouts. Includes a 128GB high-speed card holding over 30,000 lossless audio tracks, two-way Bluetooth 5.4, voice recording, and bundled voice control earphones.',
    features: [
      '128GB MicroSD Card included in box for massive lossless music storage',
      'Upgraded Bluetooth 5.4 connectivity with instant auto-reconnect',
      'Lossless Hi-Fi audio decoding (FLAC, APE, WAV, MP3, WMA)',
      'Multifunctional digital voice recorder, FM Radio tuner, and E-Book reader',
      'Premium wired in-ear monitors with inline mic and controls included'
    ],
    specs: {
      'Storage': '128GB MicroSD Card Included (Up to 256GB support)',
      'Connectivity': 'Bluetooth 5.4 Dual-Way + 3.5mm Stereo Headphone Jack',
      'Audio Codecs': 'FLAC, APE, WAV, MP3, WMA Lossless',
      'Display': '2.0-inch Color TFT Display with Album Artwork & Lyrics',
      'Battery Life': 'Up to 30 Hours continuous playback (500mAh)',
      'Extra Tools': 'FM Radio with Recording, Voice Dictaphone, E-Book Reader',
      'Dimensions': '90 x 40 x 9 mm',
      'In-Box Contents': 'MP3 Player, 128GB Card, Earphones, Type-C Cable, Manual'
    },
    createdAt: '2026-02-17T11:30:00.000Z',
    updatedAt: '2026-02-26T16:00:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b015',
    name: 'Dual-Sided Extended Desk Pad (90x45cm)',
    tagline: 'Reversible Dual-Color PU Leather Desk Mat, Waterproof & Smooth Gliding',
    slug: 'dual-sided-extended-desk-pad-90x45',
    category: 'Workspace',
    price: 799,
    originalPrice: 1499,
    rating: 4.5,
    reviewCount: 2102,
    inStock: true,
    inventoryCount: 65,
    featured: true,
    badge: 'Extra Large',
    imageUrl: '/assets/aistudio/image_f5786576.png',
    description: 'Generous 90cm x 45cm desk surface mat made of premium waterproof PU leather. Features a reversible dual-color finish (Burgundy / Amber Gold) allowing you to switch work aesthetics instantly. Protects desks from spills, scratches, and provides smooth mouse glide.',
    features: [
      'Huge 90 x 45 cm surface area accommodates full keyboard and mouse',
      'Dual-color reversible design with stitched anti-fray borders',
      'Waterproof, oil-proof, and easily wipes clean with a damp cloth',
      'Smooth micro-textured surface optimized for precision optical sensors',
      'Includes roll-up matching leather fastener strap for easy transport'
    ],
    specs: {
      'Dimensions': '900 mm x 450 mm x 2 mm',
      'Material': 'Dual-Layer Eco-Friendly PU Vegan Leather',
      'Colors': 'Reversible Red-Burgundy / Mustard-Gold',
      'Surface Type': 'Water-Repellent Micro-Matte Finish',
      'Edges': 'Reinforced Hemmed Edge Stitching',
      'Cleaning': 'Waterproof, wipe clean with damp towel'
    },
    createdAt: '2026-02-19T11:00:00.000Z',
    updatedAt: '2026-02-26T17:00:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b011',
    name: 'Foxin USB to LAN Ethernet Adapter',
    tagline: '100 Mbps Network Speed, RJ45 LAN Port, 9cm Flexible Braided Cable',
    slug: 'foxin-usb-to-lan-ethernet-adapter-fla100u',
    category: 'Networking',
    price: 249,
    originalPrice: 499,
    rating: 4.1,
    reviewCount: 940,
    inStock: true,
    inventoryCount: 120,
    featured: false,
    badge: 'Best Value',
    imageUrl: '/assets/aistudio/image_9a4dd032.png',
    description: 'Instant zero-lag wired Ethernet connectivity for ultrabooks, laptops, and desktop rigs without native RJ45 ports. Compatible with Windows 11/10, macOS, Linux, and gaming consoles with driverless plug-and-play architecture.',
    features: [
      'High-speed 100 Mbps stable RJ45 Ethernet network transmission',
      'Integrated 9cm high-flex strain-relief USB cable',
      'Universal compatibility across Windows, Mac OS, Linux, and Smart TVs',
      'Active network link and activity LED indicators',
      'Sleek matte black compact chassis for developer EDC bags'
    ],
    specs: {
      'Interface': 'USB 2.0 Male to RJ45 Female Fast Ethernet',
      'Speed': '10/100 Mbps Auto-Negotiation Full Duplex',
      'Cable Length': '9 cm flexible strain-relief tail',
      'Supported OS': 'Windows 11/10/8, macOS 10.8+, Linux Kernel 3.x+',
      'Model Number': 'Foxin FLA 100U (Black Edition)',
      'Dimensions': '58 x 21 x 15 mm',
      'Weight': '28 grams',
      'Power': 'USB Bus-Powered (No external adapter required)'
    },
    createdAt: '2026-02-16T10:00:00.000Z',
    updatedAt: '2026-02-26T15:00:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b016',
    name: 'SaleOn Multi-Pocket Tech Pouch Organizer',
    tagline: '8.3x5 Inch Storage Organizer for Cables, Chargers, Earphones & Hard Disks',
    slug: 'saleon-tech-pouch-organizer',
    category: 'Accessories',
    price: 279,
    originalPrice: 899,
    rating: 4.3,
    reviewCount: 3904,
    inStock: true,
    inventoryCount: 90,
    featured: false,
    badge: 'Organizer #1',
    imageUrl: '/assets/aistudio/image_b9a904ef.png',
    description: 'Keep all your charging bricks, dongles, cables, stylus, and external SSD drives neatly organized. Crafted from scratch-resistant cationic waterproof fabric with dual smooth heavy-duty zippers and handy carry strap.',
    features: [
      'Dual zippered opening with multi-layer elastic gear loops',
      'Dedicated mesh zippered pocket for USB flash drives and SD cards',
      'Water-repellent 300D durable cationic fabric with padded lining',
      'Comfortable wrist lanyard for easy on-the-go carry',
      'Compact profile fits neatly into backpacks, briefcases, and luggage'
    ],
    specs: {
      'Dimensions': '8.3 x 5.0 x 1.8 Inches (210 x 127 x 45 mm)',
      'Material': 'Water-Repellent Cationic 300D Polyester',
      'Closure': 'Dual Smooth Anti-Snag Zippers',
      'Weight': '110 grams',
      'Warranty': '1 Year Manufacturer Guarantee'
    },
    createdAt: '2026-02-20T08:00:00.000Z',
    updatedAt: '2026-02-26T17:30:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b001',
    name: 'Aura V87 Magnetic Switch Keyboard',
    tagline: 'Hall effect magnetic switches with rapid trigger & 8KHz polling',
    slug: 'aura-v87-magnetic-switch-keyboard',
    category: 'Keyboards',
    price: 1299,
    originalPrice: 2599,
    rating: 4.9,
    reviewCount: 3420,
    inStock: true,
    inventoryCount: 45,
    featured: true,
    badge: 'Flagship Edition',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered for high-frequency code execution and ultra-responsive tactile feedback. Features CNC anodized aluminium case, customizable actuation points from 0.1mm to 4.0mm, and hot-swappable magnetic hall switches.',
    features: [
      'Rapid Trigger technology for instant reset actuation',
      '8000Hz hyper-polling rate with <0.125ms latency',
      'Gasket mounted with five-layer acoustic dampening',
      'Dual-shot PBT keycaps with thermal dye-sublimated legends',
      'Per-key RGB backlight and magnetic switch calibration software'
    ],
    specs: {
      'Form Factor': '87-Key Tenkeyless (TKL)',
      'Switches': 'Gateron Magnetic Jade (Hall Effect)',
      'Connectivity': 'Detachable Braided USB-C / Low Latency 2.4GHz',
      'Polling Rate': '8,000 Hz',
      'Weight': '1,240g CNC Aluminium'
    },
    createdAt: '2026-01-15T09:00:00.000Z',
    updatedAt: '2026-02-10T14:30:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b002',
    name: 'Sonar Pro Spatial Studio Headphones',
    tagline: 'Planar magnetic planar drivers with lossless wireless DAC integration',
    slug: 'sonar-pro-spatial-studio-headphones',
    category: 'Audio',
    price: 999,
    originalPrice: 2199,
    rating: 4.8,
    reviewCount: 2180,
    inStock: true,
    inventoryCount: 28,
    featured: false,
    badge: 'Audiophile Choice',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for producers, audio engineers, and developers who spend 10+ hours in deep focus flow. Delivers open acoustic soundstage, active hybrid noise cancellation, and 60-hour continuous battery endurance.',
    features: [
      '90mm ultra-thin planar magnetic drivers for zero distortion',
      'Integrated ESS Sabre 32-bit DAC with LDAC and aptX HD codec',
      'Memory foam velour ear cushions with cooling micro-mesh',
      'Multipoint Bluetooth 5.4 + balanced 4.4mm analog jack',
      'AI-assisted ambient noise suppression microphone array'
    ],
    specs: {
      'Acoustic Design': 'Closed-back hybrid planar magnetic',
      'Frequency Response': '5Hz – 52,000Hz',
      'Impedance': '32 Ohms (low resistance)',
      'Battery Life': '60 Hours (ANC On)',
      'Weight': '310g'
    },
    createdAt: '2026-01-20T11:15:00.000Z',
    updatedAt: '2026-02-12T08:20:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b003',
    name: 'Kinesis Precision Ergonomic Split Board',
    tagline: 'Separated ortholinear layout with integrated thumb clusters',
    slug: 'kinesis-precision-ergonomic-split-board',
    category: 'Keyboards',
    price: 1499,
    originalPrice: 2999,
    rating: 4.7,
    reviewCount: 1640,
    inStock: true,
    inventoryCount: 14,
    featured: false,
    badge: 'Zero RSI Fatigue',
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    description: 'Eliminate wrist pronation and ulnar deviation. Features fully independent left and right modules connected by a flexible tether cable, adjustable tenting up to 20 degrees, and programmable QMK/VIAL firmware.',
    features: [
      'Ortholinear columnar key arrangement matching finger travel',
      '6-key ergonomic thumb cluster for space, enter, backspace, modifiers',
      'Stepless variable magnetic tenting kit (5° to 20° angles)',
      'Hot-swappable Kailh Choc V2 low-profile silent switches',
      'Integrated padded magnetic wrist wrests with memory gel'
    ],
    specs: {
      'Layout': 'Split Ortholinear 58-key',
      'Firmware': 'QMK / VIAL open source configurable',
      'Switches': 'Kailh Choc V2 Silent Linear',
      'Tenting Angle': '5° - 20° Adjustable',
      'Cable Type': 'Braided TRRS interconnect + USB-C'
    },
    createdAt: '2026-01-28T16:00:00.000Z',
    updatedAt: '2026-02-14T17:10:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b006',
    name: 'Lumina ScreenBar Pro Light Bar',
    tagline: 'Asymmetric optical architectural desk illumination with auto-dimming',
    slug: 'lumina-screenbar-pro-light-bar',
    category: 'Accessories',
    price: 599,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 4120,
    inStock: true,
    inventoryCount: 68,
    featured: false,
    badge: 'Zero Glare',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Zero screen reflection, pure focused workspace brightness. Gravity clamp mounts securely onto curved or flat monitors without taking up an inch of valuable desk real estate.',
    features: [
      'Precision asymmetric optical reflector lighting only desk, not monitor',
      'Built-in ambient light sensor with continuous auto-exposure adjustment',
      'Touch capacitive controls for 2700K to 6500K color temperature tuning',
      'High color rendering index (CRI > 97) for accurate color work',
      'USB-C powered directly from your monitor or docking station'
    ],
    specs: {
      'Illuminance': '1000 Lux @ 45cm distance',
      'Color Temp': '2700K – 6500K Stepless',
      'Color Rendering': 'Ra > 97 (Ultra-high CRI)',
      'Mount Type': 'Weighted Counter-Balance Gravity Pivot',
      'Power Source': '5V / 2A USB-C'
    },
    createdAt: '2026-02-05T14:20:00.000Z',
    updatedAt: '2026-02-20T11:00:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b007',
    name: 'Vortex Carbon 4K Wireless Mouse',
    tagline: 'Ultra-lightweight 39-gram magnesium skeleton with PAW3950 sensor',
    slug: 'vortex-carbon-4k-wireless-mouse',
    category: 'Accessories',
    price: 499,
    originalPrice: 999,
    rating: 4.8,
    reviewCount: 1560,
    inStock: true,
    inventoryCount: 37,
    featured: false,
    badge: '39g Featherweight',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered for pixel-perfect targeting and agile gestures. Crafted from cast magnesium alloy with carbon fiber reinforcement, 4,000Hz polling rate receiver, and Omron optical micro switches.',
    features: [
      '39g honeycomb-free cast magnesium chassis with flawless balance',
      'PixArt PAW3950 flagship optical sensor with 30,000 DPI & 750 IPS',
      'True 4000Hz wireless polling rate via dedicated RF dongle',
      'Optical switch clicks rated for 100 million activations without double-click',
      'Virgin-grade PTFE rounded skates for glass-smooth gliding'
    ],
    specs: {
      'Weight': '39 grams',
      'Sensor': 'PixArt PAW3950 Optical',
      'Max DPI': '30,000 DPI (50-DPI steps)',
      'Battery Life': '90 Hours @ 1KHz / 35 Hours @ 4KHz',
      'Connection': 'Tri-mode (2.4GHz, Bluetooth 5.3, USB-C)'
    },
    createdAt: '2026-02-08T18:00:00.000Z',
    updatedAt: '2026-02-21T15:45:00.000Z'
  },
  {
    _id: '6650a1f2b48e3a0012e8b008',
    name: 'Echo Pod Studio USB-C Condenser Mic',
    tagline: 'Broadcast-grade 24-bit/192kHz capsule with analog hardware limiter',
    slug: 'echo-pod-studio-usbc-condenser-mic',
    category: 'Audio',
    price: 899,
    originalPrice: 1799,
    rating: 4.6,
    reviewCount: 880,
    inStock: true,
    inventoryCount: 18,
    featured: false,
    badge: 'Popular Mic',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    description: 'Studio clarity straight out of the box for client demos, podcasts, and pair programming. Features zero-latency 3.5mm monitor output, tap-to-mute capacitive button with LED status, and built-in shock mount.',
    features: [
      'Dual 16mm condenser capsules supporting Cardioid & Omnidirectional',
      'Built-in analog optical limiter preventing sudden clipping & plosives',
      'High-resolution 24-bit / 192kHz audio interface resolution',
      'Integrated internal acoustic pop filter and elastic shock isolation',
      'Instant capacitive mute sensor with dual-state glow feedback'
    ],
    specs: {
      'Polar Pattern': 'Cardioid / Omnidirectional switchable',
      'Bit Depth / Sample': '24-bit / 192 kHz',
      'Capsules': 'Dual 16mm electret condenser',
      'Output': 'USB-C digital + 3.5mm zero-latency monitor',
      'Mount': '5/8" and 3/8" boom arm threading included'
    },
    createdAt: '2026-02-10T13:30:00.000Z',
    updatedAt: '2026-02-22T09:00:00.000Z'
  }
];

export const DEMO_USERS: User[] = [
  {
    _id: 'usr_665099001',
    name: 'Alex Chen',
    email: 'alex.chen@fullstack.dev',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'engineer',
    address: {
      fullName: 'Alex Chen',
      addressLine1: '402 Cyber Tech Hub, Indiranagar 100ft Rd',
      addressLine2: 'Near Metro Station',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India',
      phone: '+91 98450 12345'
    },
    orderHistory: ['ORD-9281', 'ORD-8419']
  },
  {
    _id: 'usr_665099002',
    name: 'Maya Patel',
    email: 'maya.ux@creativemind.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    role: 'designer',
    address: {
      fullName: 'Maya Patel',
      addressLine1: 'Flat 12B, Green Meadows Residency, Baner',
      city: 'Pune',
      state: 'Maharashtra',
      postalCode: '411045',
      country: 'India',
      phone: '+91 98230 67890'
    },
    orderHistory: ['ORD-7712']
  }
];

export const PROMO_CODES: Record<string, { discountPercent?: number; discountFixed?: number; description: string }> = {
  'DARKGREEN': { discountPercent: 15, description: '15% Off Dark Green & White Special' },
  'INDIA10': { discountPercent: 10, description: '10% Off Instant Welcome Offer' },
  'DEVGEAR': { discountFixed: 100, description: '₹100 Off on orders above ₹500' }
};

export const CATEGORIES = ['All', 'Audio', 'Workspace', 'Networking', 'Keyboards', 'Accessories'] as const;

/**
 * Currency formatter helper for consistent Indian Rupee (₹) presentation
 */
export const formatRupees = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
