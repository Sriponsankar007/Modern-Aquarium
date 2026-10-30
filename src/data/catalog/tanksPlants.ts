import { Product } from '../../types';

export const tanksPlantsCatalog: Product[] = [
// ==========================================
  // 5. AQUARIUMS & TANKS (Missing Varieties)
  // ==========================================
  {
    id: 'prod-tank-betta-01',
    name: 'AquaArt Desktop 15L Rimless Betta Biotope Tank Kit',
    slug: 'desktop-15l-betta-biotope-tank',
    sku: 'TANK-BETTA-15L',
    categoryId: 'aquariums-tanks',
    subcategoryId: 'betta-tanks',
    shortDescription: 'Curated 15-liter desktop cube with low-iron glass, hidden back-sump filtration, gentle baffle flow, and touch LED.',
    fullDescription: 'Specially engineered for long-finned bettas. Features an adjustable ultra-gentle flow dispersion output that prevents fin fatigue, integrated cartridge filtration chamber, and sleek touch-sensitive moonlight LED.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 2650,
    compareAtPrice: 3400,
    currency: 'INR',
    stockQuantity: 9,
    availabilityStatus: 'in_stock',
    productType: 'aquarium',
    variants: [
      { id: 'v1', name: '15L All-In-One Kit (25x25x25cm)', sku: 'BETTA-KIT-15L', price: 2650, stockQuantity: 9, isAvailable: true }
    ],
    tags: ['aquariums', 'betta-tank', 'desktop', 'nano-tank', 'all-in-one'],
    specifications: {
      'Volume': '15 Liters',
      'Dimensions': '25 x 25 x 25 cm',
      'Included': 'Low-iron glass tank, silent 2W pump, sponge media, cover lid, LED light'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-tank-planted-01',
    name: 'Ultra-Clear 90P Aquascaping Rimless Tank (180 Liters)',
    slug: 'ultra-clear-90p-aquascaping-tank',
    sku: 'TANK-90P-180L',
    categoryId: 'aquariums-tanks',
    subcategoryId: 'large-planted',
    shortDescription: 'Masterpiece 90x45x45cm low-iron Opti-white rimless tank with 10mm beveled diamond-polished glass edges.',
    fullDescription: 'The gold standard format for Nature Aquarium aquascapes and Iwagumi layouts. Built with 99.2% light transmittance Opti-white glass and high-tensile crystal clear German silicone with zero residual overlap.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 13500,
    compareAtPrice: 16500,
    currency: 'INR',
    stockQuantity: 4,
    availabilityStatus: 'in_stock',
    productType: 'aquarium',
    variants: [
      { id: 'v1', name: '90P Low-Iron Tank (90x45x45cm)', sku: 'TANK-90P', price: 13500, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['aquariums', '90p', 'opti-white', 'rimless', 'aquascaping'],
    specifications: {
      'Dimensions': '90 x 45 x 45 cm',
      'Glass Thickness': '10 mm Ultra-Clear Glass',
      'Volume': '182 Liters (48 Gallons)',
      'Silicone': 'Crystal German Translucent Silicone'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-tank-stand-01',
    name: 'Minimalist Matt-Black Steel & Teak Marine Aquarium Cabinet (90cm)',
    slug: 'minimalist-steel-teak-aquarium-cabinet-90cm',
    sku: 'CABINET-90-TEAK',
    categoryId: 'aquariums-tanks',
    subcategoryId: 'cabinets-stands',
    shortDescription: 'Heavy-gauge powder-coated structural steel stand with water-resistant teak magnetic doors and internal sump shelf.',
    fullDescription: 'Engineered to support heavy aquascapes exceeding 300kg safely. Features leveling feet, pre-cut rear canister hose and electrical cable grommets, and soft-close rust-proof hinges.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 9800,
    compareAtPrice: 12500,
    currency: 'INR',
    stockQuantity: 3,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: '90cm Cabinet (90x45x80cm)', sku: 'CAB-90CM', price: 9800, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['aquarium-stand', 'cabinet', 'furniture', '90cm'],
    specifications: {
      'Frame': '40mm Heavy-gauge tubular steel',
      'Load Capacity': 'Tested up to 450 kg',
      'Finish': 'Marine-grade anti-rust epoxy powder coat'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-tank-bow-01',
    name: 'Curved Panoramic Seamless Bow-Front Glass Tank (60L)',
    slug: 'curved-panoramic-bow-front-tank-60l',
    sku: 'TANK-BOW-60L',
    categoryId: 'aquariums-tanks',
    subcategoryId: 'bow-front',
    shortDescription: 'Seamless hot-bent curved front corners offering an uninterrupted panoramic underwater viewing perspective.',
    fullDescription: 'Hot-bent monolithic front and side panels eliminate silicone seams along the front viewing plane, producing an immersive wrap-around visual perspective.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3800,
    compareAtPrice: 4800,
    currency: 'INR',
    stockQuantity: 5,
    availabilityStatus: 'in_stock',
    productType: 'aquarium',
    variants: [
      { id: 'v1', name: '60L Curved Tank (60x30x36cm)', sku: 'BOW-60L', price: 3800, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['aquariums', 'bow-front', 'curved-glass', 'panoramic'],
    specifications: {
      'Glass Type': 'Bent floating automotive grade glass',
      'Volume': '60 Liters'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==========================================
  // 6. LIVE PLANTS (Missing Varieties)
  // ==========================================
  {
    id: 'prod-plant-moss-01',
    name: 'Christmas Moss & Java Fern Windelov Driftwood Mount',
    slug: 'christmas-moss-java-fern-windelov-wood',
    sku: 'PLANT-MOSS-WOOD',
    categoryId: 'plants',
    subcategoryId: 'mosses',
    scientificName: 'Vesicularia montagnei & Microsorum pteropus "Windelov"',
    variety: 'Established Branch Mount',
    shortDescription: 'Pre-attached lush Christmas moss and branching Windelov crested Java fern tied to natural bogwood root.',
    fullDescription: 'Instant scape centerpiece! Ready to drop straight into your aquarium without planting or waiting for roots to take hold. Provides instant shelter for shrimp and fry while absorbing excess nitrates.',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 490,
    compareAtPrice: 650,
    currency: 'INR',
    stockQuantity: 15,
    availabilityStatus: 'in_stock',
    productType: 'live-plant',
    variants: [
      { id: 'v1', name: 'Established Piece (15-20cm)', sku: 'MOSS-WD-MED', price: 490, stockQuantity: 15, isAvailable: true }
    ],
    tags: ['live-plants', 'moss', 'java-fern', 'epiphyte', 'low-tech'],
    specifications: {
      'Light Demand': 'Low to Medium',
      'CO2 Requirement': 'Not required (thrives in low-tech setups)'
    },
    careRequirements: {
      adultSize: '15 - 25 cm branch',
      recommendedTankSize: 'Any aquarium',
      waterTemperature: '20°C - 28°C',
      phRange: '6.0 - 7.6',
      temperament: 'Community Safe',
      diet: 'Specialized',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-plant-stem-01',
    name: 'Rotala Rotundifolia "Blood Red" (Submerged Bunch of 10 Stems)',
    slug: 'rotala-rotundifolia-blood-red-bunch',
    sku: 'PLANT-ROT-BRED',
    categoryId: 'plants',
    subcategoryId: 'stem-plants',
    scientificName: 'Rotala rotundifolia "Blood Red"',
    variety: 'SG True Blood Red Submerged',
    shortDescription: 'Intense ruby-red background stem plant that maintains scarlet coloration even under moderate lighting.',
    fullDescription: 'Unlike wild Rotala which requires extreme iron dosage and high light to turn pink, Rotala Blood Red naturally turns deep crimson red. Fast growing, bush-forming, and easy to propagate via cuttings.',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 199,
    compareAtPrice: 280,
    currency: 'INR',
    stockQuantity: 30,
    availabilityStatus: 'in_stock',
    productType: 'live-plant',
    variants: [
      { id: 'v1', name: 'Bunch of 10 Submerged Stems', sku: 'ROT-BRED-10', price: 199, stockQuantity: 30, isAvailable: true }
    ],
    tags: ['live-plants', 'rotala', 'stem-plant', 'red-plant', 'aquascaping'],
    specifications: {
      'Growth Rate': 'Fast',
      'Placement': 'Background'
    },
    careRequirements: {
      adultSize: '30 cm height',
      recommendedTankSize: 'Any planted tank',
      waterTemperature: '22°C - 28°C',
      phRange: '5.5 - 7.5',
      temperament: 'Community Safe',
      diet: 'Specialized',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-plant-float-01',
    name: 'Red Root Floaters & Amazon Frogbit (Portion of 15 Plants)',
    slug: 'red-root-floaters-amazon-frogbit-portion',
    sku: 'PLANT-FLOAT-MIX',
    categoryId: 'plants',
    subcategoryId: 'floating-plants',
    scientificName: 'Phyllanthus fluitans & Limnobium laevigatum',
    variety: 'Nutrient Sponge Surface Mix',
    shortDescription: 'Floating surface plants with trailing burgundy roots that soak up nitrates and provide shade for bettas.',
    fullDescription: 'The ultimate natural defense against green water algae. Rapidly absorbs excess nitrates and phosphates from the water column while shielding nervous fish with natural dappled shade.',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 160,
    compareAtPrice: 220,
    currency: 'INR',
    stockQuantity: 25,
    availabilityStatus: 'in_stock',
    productType: 'live-plant',
    variants: [
      { id: 'v1', name: 'Generous Cup (15+ Floating Rosettes)', sku: 'FLOAT-MIX-15', price: 160, stockQuantity: 25, isAvailable: true }
    ],
    tags: ['live-plants', 'floating-plants', 'red-root', 'nitrate-absorber'],
    specifications: {
      'Water Movement': 'Prefers gentle or calm water surface',
      'Algae Control': 'Outstanding nutrient exporter'
    },
    careRequirements: {
      adultSize: 'Surface rosette 2 - 4 cm',
      recommendedTankSize: 'Any open or vented tank',
      waterTemperature: '20°C - 28°C',
      phRange: '6.0 - 7.5',
      temperament: 'Community Safe',
      diet: 'Specialized',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==========================================
  // 7. SUBSTRATE (Missing Varieties)
  // ==========================================
  {
    id: 'prod-sub-sand-01',
    name: 'Pure Snow White Silica Cosmetic Sand (5kg Bag)',
    slug: 'pure-snow-white-silica-cosmetic-sand-5kg',
    sku: 'SUB-SAND-WHT5',
    categoryId: 'substrate',
    subcategoryId: 'natural-sand',
    shortDescription: 'Inert, triple-washed ultra-fine crystal white cosmetic sand (0.3-0.6mm). Zero pH alteration.',
    fullDescription: 'Creates stunning contrast pathways, waterfalls, and forecourts in planted and hardscaped aquariums. 100% chemically inert—will not buffer pH or increase water hardness.',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80'
    ],
    price: 450,
    compareAtPrice: 580,
    currency: 'INR',
    stockQuantity: 40,
    availabilityStatus: 'in_stock',
    productType: 'substrate',
    variants: [
      { id: 'v1', name: '5 kg Bag', sku: 'SAND-WHT-5K', price: 450, stockQuantity: 25, isAvailable: true },
      { id: 'v2', name: '10 kg Value Bag', sku: 'SAND-WHT-10K', price: 820, compareAtPrice: 1100, stockQuantity: 15, isAvailable: true }
    ],
    tags: ['substrate', 'white-sand', 'cosmetic-sand', 'aquascaping'],
    specifications: {
      'Grain Size': '0.3 - 0.6 mm (Safe for bottom fish & corydoras barbels)',
      'Water Effect': '100% pH Neutral'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-sub-shrimp-01',
    name: 'Master Shrimp-Active Soil pH 6.0 Buffer (3 Liters)',
    slug: 'master-shrimp-active-soil-buffer-3l',
    sku: 'SUB-SHRIMP-3L',
    categoryId: 'substrate',
    subcategoryId: 'shrimp-substrate',
    shortDescription: 'Specially sintered volcanic black soil enriched with fulvic acids that stabilizes pH at 5.8-6.4 for Caridina shrimp.',
    fullDescription: 'Specifically formulated for delicate Caridina varieties (Crystal Red, Black Bee, King Kong). Releases natural humic substances, buffers KH to 0-1, and promotes rapid biofilm growth for shrimplets.',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80'
    ],
    price: 990,
    compareAtPrice: 1250,
    currency: 'INR',
    stockQuantity: 18,
    availabilityStatus: 'in_stock',
    productType: 'substrate',
    variants: [
      { id: 'v1', name: '3-Liter Bag', sku: 'SHRIMP-SOIL-3L', price: 990, stockQuantity: 18, isAvailable: true }
    ],
    tags: ['substrate', 'shrimp-soil', 'caridina', 'ph-buffer'],
    specifications: {
      'pH Target': '5.8 - 6.4',
      'Granule Size': '1.5 - 2.5 mm fine spherical beads'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==========================================
  // 8. DECORATIONS (Full Category Coverage)
  // ==========================================
  {
    id: 'prod-decor-wood-01',
    name: 'Natural Malaysian Driftwood & Spiderwood Roots (Large Piece)',
    slug: 'natural-malaysian-driftwood-spiderwood-root',
    sku: 'DECOR-WOOD-LG',
    categoryId: 'decorations',
    subcategoryId: 'driftwood',
    shortDescription: 'Gnarled, deeply textured natural hardwood branch (35-45cm) that sinks naturally and releases beneficial tannins.',
    fullDescription: 'Hand-selected scaping hardwood with intricate branching patterns, gnarls, and root contours. Sinks naturally after brief soaking and leaches beneficial humic acids that soften water and boost fish immune health.',
    images: [
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 790,
    compareAtPrice: 990,
    currency: 'INR',
    stockQuantity: 16,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: 'Medium Branch (25-30cm)', sku: 'WOOD-MED', price: 550, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Large Root Showcase (35-45cm)', sku: 'WOOD-LG', price: 790, compareAtPrice: 990, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['decorations', 'driftwood', 'spiderwood', 'hardscape', 'aquascaping'],
    specifications: {
      'Material': '100% Natural Hardwood',
      'Tannin Release': 'Mild natural water conditioning tannins'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-decor-cave-01',
    name: 'Ceramic Pleco & Cichlid Spawning Cave (Set of 2)',
    slug: 'ceramic-pleco-cichlid-spawning-cave-set',
    sku: 'DECOR-CAVE-PL2',
    categoryId: 'decorations',
    subcategoryId: 'ceramic-caves',
    shortDescription: 'Natural fired clay ceramic cylinders with dark porous inner hollows designed for breeding plecos, apistos, and shrimp.',
    fullDescription: 'Hand-crafted non-toxic porous terracotta breeding caves. Closed at one end to give male plecos and dwarf cichlids the secure, enclosed spawning conditions needed to guard egg clutches.',
    images: [
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 380,
    compareAtPrice: 500,
    currency: 'INR',
    stockQuantity: 20,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: 'Set of 2 Caves (14x4.5cm)', sku: 'CAVE-2SET', price: 380, stockQuantity: 20, isAvailable: true }
    ],
    tags: ['decorations', 'pleco-cave', 'ceramic', 'breeding'],
    specifications: {
      'Dimensions': '14 cm length x 4.5 cm opening',
      'Material': 'High-fired inert terracotta clay'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-decor-ruin-01',
    name: 'Sunken Ancient Atlantis Column Ruins with Moss Accents',
    slug: 'sunken-ancient-atlantis-column-ruins',
    sku: 'DECOR-RUIN-ATL',
    categoryId: 'decorations',
    subcategoryId: 'themed-decor',
    shortDescription: 'Detailed architectural resin temple columns with realistic crumbling stone finish and hollow swim-through arches.',
    fullDescription: 'Bring mythical aquatic drama to your aquarium. Crafted from fish-safe polyresin with smooth rounded swim-through arches that provide entertaining hideouts for tetras, barbs, and catfish.',
    images: [
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 680,
    compareAtPrice: 850,
    currency: 'INR',
    stockQuantity: 12,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: 'Classic Column Ruins (22x15x12cm)', sku: 'RUIN-ATL-MED', price: 680, stockQuantity: 12, isAvailable: true }
    ],
    tags: ['decorations', 'ruins', 'themed-decor', 'shipwreck', 'hides'],
    specifications: {
      'Safety': 'Non-toxic, colorfast in both freshwater and saltwater',
      'Dimensions': '22 x 15 x 12 cm'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==========================================
  // 9. LIGHTING (Missing Varieties)
  // ==========================================
  {
    id: 'prod-light-clip-01',
    name: 'Chihiros C2 RGB Nano Clip-On Smart Bluetooth LED (16W)',
    slug: 'chihiros-c2-rgb-nano-clip-on-light',
    sku: 'LIGHT-C2-RGB',
    categoryId: 'lighting',
    subcategoryId: 'clip-on-lights',
    shortDescription: 'Smart Bluetooth app-controlled RGB LED with swivel swivel arm for rimless nano tanks up to 45cm.',
    fullDescription: 'Customizable 3-in-1 RGB spectrum lets you tune individual red, green, and blue diodes directly from the smartphone app. Includes built-in programmable sunrise, sunset, and moonlight ramp cycles.',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3650,
    compareAtPrice: 4400,
    currency: 'INR',
    stockQuantity: 10,
    availabilityStatus: 'in_stock',
    productType: 'lighting',
    variants: [
      { id: 'v1', name: 'Chihiros C2 RGB (16W)', sku: 'C2-RGB-16W', price: 3650, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['lighting', 'chihiros', 'clip-on', 'bluetooth', 'nano-tank'],
    specifications: {
      'Power': '16 Watts / 1580 Lumens',
      'Glass Mount': 'Clips securely to glass up to 8mm thickness'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-light-acc-01',
    name: 'Stainless Suspension Wire Kit & Smart Digital Timer Plug',
    slug: 'stainless-suspension-wire-smart-timer-kit',
    sku: 'LIGHT-ACC-SUSPKIT',
    categoryId: 'lighting',
    subcategoryId: 'light-accessories',
    shortDescription: 'Aircraft-grade stainless steel suspension ceiling cables with quick-adjust clutches and 24-hr electronic timer.',
    fullDescription: 'Clean suspended look for rimless aquariums! Hang your high-power RGBW lighting fixtures from the ceiling or stand brackets. Supports fixtures up to 25kg with effortless height adjustment.',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80'
    ],
    price: 699,
    compareAtPrice: 899,
    currency: 'INR',
    stockQuantity: 18,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: 'Hanging Cable Kit + Timer', sku: 'SUSP-TIMER-SET', price: 699, stockQuantity: 18, isAvailable: true }
    ],
    tags: ['lighting', 'hanging-kit', 'timer', 'accessories'],
    specifications: {
      'Cable Length': '1.5 meters braided stainless steel',
      'Max Load': '25 kg'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  }
];
