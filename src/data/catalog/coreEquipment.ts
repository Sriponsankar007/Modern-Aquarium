import { Product } from '../../types';

export const coreEquipment: Product[] = [
// ==================== AQUARIUMS & TANKS ====================
  {
    id: 'prod-tank-01',
    name: 'Ultra-Clear Opti-White Rimless Glass Tank (60P)',
    slug: 'ultra-clear-rimless-glass-tank-60p',
    sku: 'TANK-RIM-60P',
    categoryId: 'aquariums-tanks',
    subcategoryId: 'rimless-tanks',
    shortDescription: 'High-clarity low-iron Opti-White 6mm glass with 45-degree mitered edges and invisible German silicone.',
    fullDescription: 'The gold standard for modern aquascaping and luxury desktop displays. Made from genuine low-iron ultra-clear glass that eliminates the greenish tint of standard float glass. 60 x 30 x 36 cm (64 Liters / 17 Gallons) offering ideal golden-ratio proportions.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3499,
    compareAtPrice: 4200,
    currency: 'INR',
    stockQuantity: 9,
    availabilityStatus: 'in_stock',
    productType: 'aquarium',
    variants: [
      { id: 'v1', name: 'Standard 60P (60x30x36cm - 64L)', sku: 'TANK-60P', price: 3499, stockQuantity: 6, isAvailable: true },
      { id: 'v2', name: 'Mini 45P (45x27x30cm - 36L)', sku: 'TANK-45P', price: 2499, compareAtPrice: 2999, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['aquarium', 'rimless', 'opti-white', 'planted-tank', '60p'],
    specifications: {
      'Dimensions': '60 x 30 x 36 cm',
      'Glass Type': 'Low-Iron Ultra-Clear 6mm',
      'Silicone': 'High-tensile clear German bonding'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-02-22T12:00:00Z'
  },
  {
    id: 'prod-tank-02',
    name: 'AquaNano All-In-One Rimless Cube (30 Liters)',
    slug: 'aquanano-all-in-one-cube',
    sku: 'TANK-NANO-30L',
    categoryId: 'aquariums-tanks',
    subcategoryId: 'nano-cubes',
    shortDescription: 'Sleek 30L desktop cube with hidden rear filtration chamber, return pump, and leveling mat.',
    fullDescription: 'Complete minimalist setup with zero ugly filter pipes visible in the display area. The built-in 3-stage back filtration compartment conceals the heater, bio-rings, and pump, leaving you with pure unobstructed views of your fish and aquascape.',
    images: [
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3999,
    currency: 'INR',
    stockQuantity: 6,
    availabilityStatus: 'in_stock',
    productType: 'aquarium',
    variants: [
      { id: 'v1', name: 'Complete 30L Cube (30x30x35cm)', sku: 'NANO-30', price: 3999, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['nano', 'all-in-one', 'cube', 'desktop'],
    specifications: {
      'Capacity': '30 Liters',
      'Filtration': 'Integrated 3-chamber rear sump with 300L/H pump'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-02-22T12:00:00Z'
  },

  // ==================== LIVE AQUATIC PLANTS ====================
  {
    id: 'prod-plant-01',
    name: 'Anubias Barteri var. Nana ‘Petite’ (Driftwood Mounted)',
    slug: 'anubias-nana-petite-mounted',
    sku: 'PLANT-ANUB-PET01',
    categoryId: 'plants',
    subcategoryId: 'anubias-bucephalandra',
    scientificName: 'Anubias barteri var. nana',
    variety: 'Petite',
    shortDescription: 'Extremely hardy miniature slow-grower pre-attached to a natural cured piece of mangrove root.',
    fullDescription: 'The holy grail of low-tech planted tanks. Anubias Nana Petite thrives in virtually any lighting condition and does not require CO2 injection. Pre-anchored securely onto authentic driftwood, ready to drop straight into your aquarium.',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 380,
    compareAtPrice: 480,
    currency: 'INR',
    stockQuantity: 18,
    availabilityStatus: 'in_stock',
    productType: 'live-plant',
    variants: [
      { id: 'v1', name: 'Mounted on Wood (6-8 Leaves)', sku: 'ANUB-WD', price: 380, stockQuantity: 12, isAvailable: true },
      { id: 'v2', name: 'Loose Rhizome (10+ Leaves)', sku: 'ANUB-LS', price: 290, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['plants', 'anubias', 'low-tech', 'hardy', 'aquascaping'],
    specifications: {
      'Placement': 'Midground / Epiphyte',
      'Propagation': 'Rhizome division'
    },
    careRequirements: {
      lightingRequirement: 'Low',
      growthRate: 'Slow',
      co2Requirement: 'Not Required',
      careDifficulty: 'Easy / Beginner',
      waterTemperature: '20°C - 28°C',
      phRange: '6.0 - 7.5',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-02-23T12:00:00Z'
  },
  {
    id: 'prod-plant-02',
    name: 'Micranthemum ‘Monte Carlo’ (In-Vitro Tissue Culture Cup)',
    slug: 'monte-carlo-carpet-in-vitro',
    sku: 'PLANT-MC-CUP',
    categoryId: 'plants',
    subcategoryId: 'carpet-plants',
    scientificName: 'Micranthemum tweediei',
    variety: 'Monte Carlo',
    shortDescription: '100% sterile snail-free tissue culture cup. Dense bright green carpeting plant for foregrounds.',
    fullDescription: 'Create that coveted vibrant green lawn in your aquarium. Monte Carlo forms a dense, compact carpet over aqua soil. Far hardier and more forgiving than Hemianthus Cuba, spreading fast via creeping horizontal runners.',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 320,
    currency: 'INR',
    stockQuantity: 22,
    availabilityStatus: 'in_stock',
    productType: 'live-plant',
    variants: [
      { id: 'v1', name: 'Tissue Culture Cup (100% Snail-Free)', sku: 'MC-CUP', price: 320, stockQuantity: 22, isAvailable: true }
    ],
    tags: ['carpet', 'plants', 'aquascaping', 'tissue-culture'],
    specifications: {
      'Form': 'Lab-grown in nutrient agar gel'
    },
    careRequirements: {
      lightingRequirement: 'Medium',
      growthRate: 'Fast',
      co2Requirement: 'Recommended',
      careDifficulty: 'Moderate',
      waterTemperature: '20°C - 26°C',
      phRange: '6.0 - 7.2',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-01-27T10:00:00Z',
    updatedAt: '2026-02-23T12:00:00Z'
  },

  // ==================== SUBSTRATE & HARDSCAPE ====================
  {
    id: 'prod-sub-01',
    name: 'ProScape Master Active Plant Aqua Soil (9 Liters)',
    slug: 'proscape-active-aqua-soil-9l',
    sku: 'SUB-SOIL-9L',
    categoryId: 'substrate',
    subcategoryId: 'aqua-soil',
    shortDescription: 'Volcanic black active nutrient soil. Lowers pH & KH, promotes rapid root proliferation and crystal water.',
    fullDescription: 'Rich in organic plant acids and micro-minerals essential for lush root growth. Granules are double-fired to prevent breaking down into mud. Naturally buffers aquarium water to an optimal pH of 6.2 - 6.8, ideal for live plants, Caridina shrimp, and tropical fish.',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1850,
    compareAtPrice: 2200,
    currency: 'INR',
    stockQuantity: 16,
    availabilityStatus: 'in_stock',
    productType: 'substrate',
    variants: [
      { id: 'v1', name: '9 Liter Bag (Covers 60cm tank)', sku: 'SOIL-9L', price: 1850, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: '3 Liter Bag (Nano tanks)', sku: 'SOIL-3L', price: 750, compareAtPrice: 890, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['aqua-soil', 'substrate', 'planted-tank', 'active-soil'],
    specifications: {
      'Granule Size': '2 - 3 mm (Normal Type)',
      'Water Effect': 'Lowers pH to ~6.5, buffers KH'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-22T12:00:00Z'
  },
  {
    id: 'prod-hard-01',
    name: 'Natural Ryuoh / Seiryu Aquascaping Stones (5 kg Box)',
    slug: 'seiryu-aquascaping-stones-5kg',
    sku: 'HARD-SEIRYU-5K',
    categoryId: 'substrate',
    subcategoryId: 'hardscape-stones',
    shortDescription: 'Deep grey jagged mountain stones with distinct white calcite veins. Authentic Iwagumi stone.',
    fullDescription: 'Curated mix of main master stone, secondary stones, and detailing rubble. Rich in natural fissures and miniature mountain cliffs that add dramatic visual perspective to any aquascape or terrarium.',
    images: [
      'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 950,
    currency: 'INR',
    stockQuantity: 14,
    availabilityStatus: 'in_stock',
    productType: 'substrate',
    variants: [
      { id: 'v1', name: '5 kg Assorted Hardscape Box', sku: 'SEIR-5K', price: 950, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: '10 kg Large Hardscape Set', sku: 'SEIR-10K', price: 1750, compareAtPrice: 1950, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['hardscape', 'seiryu-stone', 'iwagumi', 'rocks'],
    specifications: {
      'Weight': '5 kg Box containing 4-6 mixed stones',
      'Texture': 'Sharp weathered natural cliffs'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-01-18T10:00:00Z',
    updatedAt: '2026-02-22T12:00:00Z'
  },

  // ==================== FILTERS & MEDIA ====================
  {
    id: 'prod-filt-01',
    name: 'SilentStream External Canister Filter with UV (1200 L/H)',
    slug: 'silentstream-canister-filter-uv',
    sku: 'FILT-CAN-1200UV',
    categoryId: 'filters',
    subcategoryId: 'canister-filters',
    shortDescription: 'Whisper-quiet external canister with built-in 9W UV clarifier, self-priming button, and quick-release valves.',
    fullDescription: 'Engineered for crystalline water and heavy bio-loads. Features 4 spacious media baskets pre-loaded with coarse sponges, bio-rings, and activated carbon. Integrated 9W UV sterilizer destroys waterborne green water algae and fungal spores before they cloud your aquarium.',
    images: [
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 4899,
    compareAtPrice: 5999,
    currency: 'INR',
    stockQuantity: 8,
    availabilityStatus: 'in_stock',
    productType: 'filter',
    variants: [
      { id: 'v1', name: '1200 L/H with UV (For tanks up to 250L)', sku: 'CAN-1200UV', price: 4899, stockQuantity: 5, isAvailable: true },
      { id: 'v2', name: '800 L/H Standard (For tanks up to 120L)', sku: 'CAN-800', price: 3499, compareAtPrice: 4200, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['filter', 'canister', 'uv-sterilizer', 'silent', 'filtration'],
    specifications: {
      'Flow Rate': '1200 Liters / Hour',
      'Power Consumption': '22W (Pump) + 9W (UV)',
      'Media Baskets': '4 Baskets with quick-disconnect'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-02-23T12:00:00Z'
  },

  // ==================== LIGHTING ====================
  {
    id: 'prod-light-01',
    name: 'AquaVivid Bluetooth RGBW Planted Aquarium Light (60cm)',
    slug: 'aquavivid-bluetooth-rgbw-light-60cm',
    sku: 'LIGHT-RGBW-60',
    categoryId: 'lighting',
    subcategoryId: 'planted-rgb-lights',
    shortDescription: 'High-PAR full spectrum RGB+W light bar with mobile app controls for automated sunrise, sunset, and moonlight cycles.',
    fullDescription: 'Brings out the deepest reds in Rotala and richest greens in Anubias while providing vivid color rendition for fish scales. Slim anodized aluminum alloy casing with adjustable stainless steel brackets.',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3699,
    compareAtPrice: 4500,
    currency: 'INR',
    stockQuantity: 11,
    availabilityStatus: 'in_stock',
    productType: 'lighting',
    variants: [
      { id: 'v1', name: '60cm (45W - For 60P tanks)', sku: 'RGBW-60', price: 3699, stockQuantity: 7, isAvailable: true },
      { id: 'v2', name: '45cm (32W - For nano tanks)', sku: 'RGBW-45', price: 2899, compareAtPrice: 3400, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['lighting', 'rgbw', 'planted-tank', 'bluetooth', 'high-par'],
    specifications: {
      'App Control': 'Bluetooth Smartphone App (Android & iOS)',
      'Luminous Flux': '3,800 Lumens',
      'Spectrum': 'Full Spectrum 6500K with 660nm Deep Red'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-22T10:00:00Z',
    updatedAt: '2026-02-23T12:00:00Z'
  },

  // ==================== WATER CARE & HEATER ====================
  {
    id: 'prod-water-01',
    name: 'AquaShield Pure Prime Tap Water Dechlorinator (500ml)',
    slug: 'aquashield-pure-prime-dechlorinator',
    sku: 'CHEM-PRIME-500',
    categoryId: 'water-care',
    subcategoryId: 'conditioners',
    shortDescription: 'Super-concentrated formula. Neutralizes chlorine, chloramines, and binds toxic ammonia and heavy metals instantly.',
    fullDescription: 'Essential for every water change. Just 5ml treats up to 200 Liters of fresh tap water. Completely safe for fish, plants, and sensitive dwarf shrimp. Does not cause pH fluctuations.',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 420,
    compareAtPrice: 499,
    currency: 'INR',
    stockQuantity: 40,
    availabilityStatus: 'in_stock',
    productType: 'water-care',
    variants: [
      { id: 'v1', name: '500ml Bottle (Treats 20,000 Liters)', sku: 'PRIME-500', price: 420, stockQuantity: 30, isAvailable: true },
      { id: 'v2', name: '250ml Bottle (Treats 10,000 Liters)', sku: 'PRIME-250', price: 260, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['water-conditioner', 'dechlorinator', 'prime', 'water-care'],
    specifications: {
      'Dosage': '5ml per 200 Liters of new water'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-01-24T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },
  {
    id: 'prod-heat-01',
    name: 'Precision Quartz Submersible Aquarium Heater (150W)',
    slug: 'precision-quartz-submersible-heater-150w',
    sku: 'EQUIP-HEAT-150W',
    categoryId: 'water-equipment',
    subcategoryId: 'aquarium-heaters',
    shortDescription: 'Shatter-resistant quartz tube with electronic thermostat dial, pilot indicator lamp, and safety suction brackets.',
    fullDescription: 'Maintains steady water temperature between 20°C and 34°C with ±0.5°C accuracy. Protects your tropical fish from dangerous temperature drops during cooler months.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 699,
    compareAtPrice: 850,
    currency: 'INR',
    stockQuantity: 20,
    availabilityStatus: 'in_stock',
    productType: 'equipment',
    variants: [
      { id: 'v1', name: '150W (For tanks 80 - 150L)', sku: 'HEAT-150', price: 699, stockQuantity: 12, isAvailable: true },
      { id: 'v2', name: '300W (For tanks 150 - 300L)', sku: 'HEAT-300', price: 899, compareAtPrice: 1100, stockQuantity: 8, isAvailable: true }
    ],
    tags: ['heater', 'equipment', 'temperature', 'tropical'],
    specifications: {
      'Temperature Range': '20°C to 34°C (Adjustable dial)',
      'Safety': 'Double insulated waterproof IP68 rating'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-01-26T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },

  // ==================== FISH FOOD ====================
  {
    id: 'prod-food-01',
    name: 'Hikari Tropical Micro Pellets (80g)',
    slug: 'hikari-tropical-micro-pellets',
    sku: 'FOOD-HIK-MIC80',
    categoryId: 'fish-food',
    subcategoryId: 'flakes-pellets',
    shortDescription: 'Multi-colored slow-sinking micro bites specially formulated for small-mouth Tetras, Guppies, and Barbs.',
    fullDescription: 'Rich in marine proteins, krill, and spirulina to enhance natural coloration without clouding aquarium water. The slow-sinking design allows fish at all water levels to feed naturally.',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 320,
    currency: 'INR',
    stockQuantity: 30,
    availabilityStatus: 'in_stock',
    productType: 'food',
    variants: [
      { id: 'v1', name: '80g Pouch', sku: 'HIK-80G', price: 320, stockQuantity: 20, isAvailable: true },
      { id: 'v2', name: '150g Economy Tub', sku: 'HIK-150G', price: 560, compareAtPrice: 650, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['fish-food', 'pellets', 'hikari', 'micro-bites', 'tetras'],
    specifications: {
      'Crude Protein': 'Min 42.0%',
      'Origin': 'Made in Japan'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-28T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },

  // ==================== SHRIMP & SNAILS ====================
  {
    id: 'prod-shrimp-01',
    name: 'Blue Dream Neocaridina Dwarf Shrimp (Pack of 5)',
    slug: 'blue-dream-shrimp-pack-5',
    sku: 'SHRIMP-BD-05',
    categoryId: 'shrimp-snails',
    subcategoryId: 'dwarf-shrimp',
    scientificName: 'Neocaridina davidi var. Blue Dream',
    variety: 'High Grade Deep Sapphire Blue',
    shortDescription: 'Stunning solid royal blue coloration. Excellent peaceful algae grazing and biofilm cleaner.',
    fullDescription: 'High-grade Neocaridina shrimp selected for solid sapphire blue saturation throughout legs and body. Extremely active, constantly cleaning plant leaves and mosses. Breeds readily in established freshwater aquariums.',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
    ],
    price: 499,
    compareAtPrice: 650,
    currency: 'INR',
    stockQuantity: 25,
    availabilityStatus: 'in_stock',
    productType: 'shrimp-snail',
    variants: [
      { id: 'v1', name: 'Pack of 5 Shrimp', sku: 'BD-5', price: 499, stockQuantity: 15, isAvailable: true },
      { id: 'v2', name: 'Pack of 10 Shrimp (Free Moss)', sku: 'BD-10', price: 899, compareAtPrice: 1150, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['shrimp', 'blue-dream', 'neocaridina', 'clean-up-crew', 'nano'],
    specifications: {
      'Breeding': 'High fecundity in freshwater'
    },
    careRequirements: {
      adultSize: '2.5 - 3 cm',
      recommendedTankSize: '15 Liters',
      waterTemperature: '21°C - 26°C',
      phRange: '6.5 - 7.5',
      temperament: 'Peaceful',
      diet: 'Algae Grazer',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater',
      compatibilityNotes: 'Safe with peaceful nano fish (Micro Rasboras, Otocinclus). Avoid aggressive or large fish.'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-30T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },
  {
    id: 'prod-snail-01',
    name: 'Zebra Nerite Snail (Trio - 3 Pcs)',
    slug: 'zebra-nerite-snail-trio',
    sku: 'SNAIL-NER-ZEB03',
    categoryId: 'shrimp-snails',
    subcategoryId: 'aquarium-snails',
    scientificName: 'Neritina natalensis',
    variety: 'Zebra Striped',
    shortDescription: 'The undisputed champion glass and hardscape algae eater. Will NOT reproduce or overpopulate freshwater tanks.',
    fullDescription: 'Zebra Nerites have striking gold and black tiger-like stripes. They relentlessly graze on diatoms, green spot algae, and biofilm from glass, rocks, and plant leaves without damaging delicate plant foliage. Their eggs do not hatch in freshwater, preventing population explosions.',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
    ],
    price: 249,
    currency: 'INR',
    stockQuantity: 30,
    availabilityStatus: 'in_stock',
    productType: 'shrimp-snail',
    variants: [
      { id: 'v1', name: 'Pack of 3 Snails', sku: 'NER-3', price: 249, stockQuantity: 20, isAvailable: true },
      { id: 'v2', name: 'Clean-Up Pack of 6 Snails', sku: 'NER-6', price: 440, compareAtPrice: 500, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['snail', 'nerite', 'algae-eater', 'clean-up-crew'],
    specifications: {
      'Reproduction': 'Larvae require brackish water (No freshwater pests)'
    },
    careRequirements: {
      adultSize: '2.5 cm',
      recommendedTankSize: '20 Liters',
      waterTemperature: '22°C - 28°C',
      phRange: '7.0 - 8.2',
      temperament: 'Peaceful',
      diet: 'Algae Grazer',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },

  // ==================== CLEANING TOOLS ====================
  {
    id: 'prod-clean-01',
    name: 'Magnetic Floating Glass Cleaner with Stainless Blade',
    slug: 'magnetic-floating-glass-cleaner',
    sku: 'CLEAN-MAG-FLT',
    categoryId: 'cleaning',
    subcategoryId: 'siphons-scrapers',
    shortDescription: 'Strong neodymium magnets that clean aquarium glass without getting your hands wet. Floats if separated.',
    fullDescription: 'Say goodbye to wet sleeves and scratched glass. Strong magnetic attraction cuts through stubborn diatoms and green spot algae with an optional interchangeable stainless steel blade for glass tanks. The inner scrubber floats instantly if detached.',
    images: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 599,
    compareAtPrice: 750,
    currency: 'INR',
    stockQuantity: 15,
    availabilityStatus: 'in_stock',
    productType: 'cleaning',
    variants: [
      { id: 'v1', name: 'Medium (Up to 10mm glass)', sku: 'MAG-MED', price: 599, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Large (Up to 15mm glass)', sku: 'MAG-LG', price: 899, compareAtPrice: 1100, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['cleaning', 'glass-cleaner', 'magnetic', 'scraper'],
    specifications: {
      'Glass Compatibility': '6mm to 12mm thickness',
      'Blade': 'Replaceable surgical steel blade'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-02T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },
  {
    id: 'prod-tool-01',
    name: '5-in-1 Stainless Aquascaping Tool Kit with Leather Case',
    slug: '5-in-1-aquascaping-tool-kit',
    sku: 'TOOL-SCAPE-5IN1',
    categoryId: 'cleaning',
    subcategoryId: 'scaping-tools',
    shortDescription: 'Surgical stainless steel curved scissors, wave scissors, straight & curved tweezers, and sand flattener.',
    fullDescription: 'Professional tool set designed specifically for precision plant trimming and delicate stem planting. Rust-resistant satin finish stainless steel ensures longevity and smooth ergonomics.',
    images: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1199,
    compareAtPrice: 1550,
    currency: 'INR',
    stockQuantity: 12,
    availabilityStatus: 'in_stock',
    productType: 'cleaning',
    variants: [
      { id: 'v1', name: 'Full 5-Piece Kit + Zipper Case', sku: 'SCAPE-5SET', price: 1199, stockQuantity: 12, isAvailable: true }
    ],
    tags: ['tools', 'aquascaping', 'scissors', 'tweezers', 'planting'],
    specifications: {
      'Pieces': 'Wave scissors (25cm), Straight scissors (25cm), Pin-point curved tweezers (27cm), Straight tweezers (27cm), Substrate spatula (32cm)'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  }
];
