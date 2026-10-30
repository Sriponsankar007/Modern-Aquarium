import { Product } from '../../types';

export const suppliesEquipmentCatalog: Product[] = [
  // ==================== 10. FILTERS & FILTER MEDIA ====================
  {
    id: 'exp-filt-01',
    name: 'Sunsun HW-3000 UV Canister Filter (1200 - 3000 LPH)',
    slug: 'sunsun-hw-3000-canister-filter',
    sku: 'FILT-CAN-HW3000',
    categoryId: 'filters',
    subcategoryId: 'canister-filters',
    shortDescription: 'Variable speed DC intelligent canister filter with integrated 9W UV clarifier and digital display.',
    fullDescription: 'Heavy-duty multi-stage external filtration engineered for community aquariums and planted setups up to 400 liters. Offers 6 adjustable flow rates, an integrated UV sterilizer to eradicate green water algae and pathogens, and self-priming quick-release valves for mess-free maintenance.',
    images: [
      'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=900&q=80'
    ],
    price: 9499,
    compareAtPrice: 11500,
    currency: 'INR',
    stockQuantity: 7,
    availabilityStatus: 'in_stock',
    productType: 'filter',
    variants: [
      { id: 'v1', name: 'HW-3000 Complete Media Kit', sku: 'HW-3000-KIT', price: 9499, stockQuantity: 7, isAvailable: true }
    ],
    tags: ['filter', 'canister', 'uv-clarifier', 'external', 'high-flow'],
    specifications: {
      'Flow Rate': 'Adjustable 1200 - 3000 LPH',
      'Power': '10W - 30W Variable DC',
      'UV Lamp': '9W Sterilizer',
      'Basket Capacity': '4 Layer Media Trays'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-05T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-filt-hob-01',
    name: 'AquaClear Slim Hang-On-Back (HOB) Waterfall Filter with Skimmer',
    slug: 'aquaclear-slim-hob-waterfall-filter',
    sku: 'FILT-HOB-SLIM',
    categoryId: 'filters',
    subcategoryId: 'hob-filters',
    shortDescription: 'Ultra-slim hang-on-back power filter with built-in surface oil skimmer and multi-stage biological basket.',
    fullDescription: 'Preserves swimming space inside nano and rimless aquariums. Features an adjustable flow control valve, surface skimmer attachment to eradicate protein film, and a large-capacity media basket packed with bio-sponge and sintered glass rings.',
    images: [
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1250,
    compareAtPrice: 1550,
    currency: 'INR',
    stockQuantity: 18,
    availabilityStatus: 'in_stock',
    productType: 'filter',
    variants: [
      { id: 'v1', name: 'Slim 250 (For tanks up to 60L)', sku: 'HOB-250', price: 1250, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Slim 400 (For tanks up to 100L)', sku: 'HOB-400', price: 1650, stockQuantity: 8, isAvailable: true }
    ],
    tags: ['filter', 'hob', 'hang-on-back', 'waterfall', 'skimmer'],
    specifications: {
      'Flow Rate': '400 LPH Adjustable',
      'Power': '4.5W Whisper Motor',
      'Filtration': 'Mechanical Sponge + Activated Carbon + Bio-Ceramics'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-06T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-filt-02',
    name: 'Aquarium Sponge Filter — Bio-Master Dual Chamber',
    slug: 'bio-master-dual-sponge-filter',
    sku: 'FILT-SPG-BIO2',
    categoryId: 'filters',
    subcategoryId: 'sponge-filters',
    shortDescription: 'Gentle air-driven biological foam filter with mineral bio-ball chamber, ideal for shrimp and fry breeding.',
    fullDescription: 'Essential safe filtration for dwarf Neocaridina shrimp breeding, fry rearing, and Betta tanks. Dense biochemical foam traps fine debris while providing colossal surface area for beneficial nitrifying colonies without suction risks.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 399,
    compareAtPrice: 550,
    currency: 'INR',
    stockQuantity: 28,
    availabilityStatus: 'in_stock',
    productType: 'filter',
    variants: [
      { id: 'v1', name: 'Medium (Up to 80L)', sku: 'SPG-MED', price: 399, stockQuantity: 18, isAvailable: true },
      { id: 'v2', name: 'Large (Up to 150L)', sku: 'SPG-LRG', price: 549, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['filter', 'sponge-filter', 'shrimp-safe', 'breeder', 'fry'],
    specifications: {
      'Operation': 'Air Pump Driven (Air pump sold separately)',
      'Media': 'Dense biochemical foam + Ceramic ring chamber'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-08T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-filt-03',
    name: 'Porous Sintered Quartz Bio-Rings & Media Matrix (1kg)',
    slug: 'sintered-quartz-bio-rings-1kg',
    sku: 'MEDIA-QRZ-1KG',
    categoryId: 'filters',
    subcategoryId: 'filter-media',
    shortDescription: 'Ultra-porous sintered glass ceramic rings providing 3000 sq.ft/liter surface area for deep biological filtration.',
    fullDescription: 'High-performance filtration media containing deep micro-tunnels for aerobic and anaerobic bacteria cultivation. Rapidly eliminates toxic ammonia and nitrite while aiding nitrate reduction. Includes free zip mesh bag.',
    images: [
      'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=900&q=80'
    ],
    price: 549,
    compareAtPrice: 750,
    currency: 'INR',
    stockQuantity: 34,
    availabilityStatus: 'in_stock',
    productType: 'filter',
    variants: [
      { id: 'v1', name: '1000g Net Bag', sku: 'QRZ-1KG', price: 549, stockQuantity: 34, isAvailable: true }
    ],
    tags: ['filter-media', 'bio-rings', 'biological', 'bacteria', 'porous'],
    specifications: {
      'Specific Surface Area': '3,000 m²/L',
      'pH Influence': 'Neutral (Zero hardness shift)'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==================== 11. AIR PUMPS & AERATION ====================
  {
    id: 'exp-air-01',
    name: 'Sobo Ultra-Silent Dual-Outlet Air Pump (SB-8806)',
    slug: 'sobo-ultra-silent-air-pump',
    sku: 'AIR-SOBO-8806',
    categoryId: 'air-equipment',
    subcategoryId: 'air-pumps',
    shortDescription: 'Whisper-quiet magnetic vibration dampening air compressor with dual dial-controlled flow outlets.',
    fullDescription: 'Delivers continuous, reliable dissolved oxygen to fish tanks up to 250 liters. Designed with sound-insulated silicone chambers and shock-absorbing feet producing under 30dB of noise.',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 649,
    compareAtPrice: 850,
    currency: 'INR',
    stockQuantity: 22,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: 'Dual Outlet (2x 3.5 L/min)', sku: 'SB-8806', price: 649, stockQuantity: 22, isAvailable: true }
    ],
    tags: ['air-pump', 'aeration', 'silent', 'oxygen', 'dual-outlet'],
    specifications: {
      'Outlets': '2 Adjustable Outlets',
      'Air Flow': '2x 3.5 Liters/min',
      'Power Consumption': '5 Watts'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-12T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-air-acc-01',
    name: 'Micro-Pore Ceramic Air Diffuser & Non-Return Check Valve Kit',
    slug: 'micro-pore-air-diffuser-check-valve-kit',
    sku: 'AIR-DIFF-KIT',
    categoryId: 'air-equipment',
    subcategoryId: 'air-accessories',
    shortDescription: 'Creates high-density micro-bubbles for superior gas exchange. Includes 4m airline tubing and 2 check valves.',
    fullDescription: 'High-temperature sintered carborundum ceramic stone generates uniform micro-fine bubbling curtains that dissolve oxygen efficiently with zero water splashing. Comes with soft silicone tubing and one-way valves.',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 299,
    compareAtPrice: 420,
    currency: 'INR',
    stockQuantity: 30,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: 'Complete 5-Piece Aeration Accessory Kit', sku: 'AER-KIT-5P', price: 299, stockQuantity: 30, isAvailable: true }
    ],
    tags: ['aeration', 'air-stone', 'check-valve', 'tubing', 'air-accessories'],
    specifications: {
      'Disc Diameter': '50 mm sintered disc',
      'Tubing Length': '4 meters food-grade silicone'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-13T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==================== 12. HEATERS & TESTING EQUIPMENT ====================
  {
    id: 'exp-eq-01',
    name: 'Submersible Automatic Quartz Glass Aquarium Heater (150W)',
    slug: 'submersible-quartz-aquarium-heater-150w',
    sku: 'EQ-HEAT-150W',
    categoryId: 'water-equipment',
    subcategoryId: 'aquarium-heaters',
    shortDescription: 'Explosion-proof thermal quartz tube with precision thermostat (20°C - 34°C) for tanks up to 150 liters.',
    fullDescription: 'Essential climate control for tropical freshwater fish, discus, and sensitive betta morphs. Automatic shut-off prevents overheating while dual suction clamps secure it easily to any glass surface.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 799,
    compareAtPrice: 999,
    currency: 'INR',
    stockQuantity: 19,
    availabilityStatus: 'in_stock',
    productType: 'equipment',
    variants: [
      { id: 'v1', name: '150 Watts (50 - 150L)', sku: 'HEAT-150W', price: 799, stockQuantity: 12, isAvailable: true },
      { id: 'v2', name: '300 Watts (150 - 300L)', sku: 'HEAT-300W', price: 999, stockQuantity: 7, isAvailable: true }
    ],
    tags: ['heater', 'equipment', 'temperature', 'tropical', 'submersible'],
    specifications: {
      'Temperature Range': '20°C - 34°C',
      'Glass Material': 'Shock-Resistant Quartz',
      'Safety': 'Auto thermal safety cutoff'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-14T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-eq-02',
    name: 'High-Precision Digital Aquarium Thermometer & TDS Meter Kit',
    slug: 'digital-aquarium-thermometer-tds-meter',
    sku: 'EQ-TEST-DIGI',
    categoryId: 'water-equipment',
    subcategoryId: 'testing-meters',
    shortDescription: 'LCD digital thermometer with submerged probe plus digital TDS pen to test total dissolved solids and hardness.',
    fullDescription: 'Accurately monitors water temperature and purity to protect fish and sensitive dwarf shrimp from parameter shifts. Includes high-contrast LCD thermometer and calibrated digital ppm TDS pen.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80'
    ],
    price: 499,
    compareAtPrice: 699,
    currency: 'INR',
    stockQuantity: 40,
    availabilityStatus: 'in_stock',
    productType: 'equipment',
    variants: [
      { id: 'v1', name: 'Thermometer + TDS Meter Dual Set', sku: 'TEST-SET-DUO', price: 499, stockQuantity: 40, isAvailable: true }
    ],
    tags: ['thermometer', 'tds-meter', 'digital', 'monitoring', 'testing-meters'],
    specifications: {
      'Thermometer Accuracy': '±0.1°C',
      'TDS Range': '0 - 9990 ppm',
      'Batteries': 'Included'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==================== 13. WATER CARE & CONDITIONERS ====================
  {
    id: 'exp-care-01',
    name: 'Complete Dechlorinator & Heavy Metal Detoxifier (250ml)',
    slug: 'complete-dechlorinator-detox-250ml',
    sku: 'CARE-DECH-250',
    categoryId: 'water-care',
    subcategoryId: 'conditioners',
    shortDescription: 'Concentrated water conditioner that instantly neutralizes chlorine, chloramines, ammonia, and heavy metals in tap water.',
    fullDescription: 'Safe for all freshwater and marine fish, shrimp, and live plants. Essential during routine water changes to protect fish gills and prevent toxic osmotic stress. 5ml treats 200 liters of fresh tap water.',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 449,
    compareAtPrice: 599,
    currency: 'INR',
    stockQuantity: 35,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: '250ml Bottle (Treats 10,000L)', sku: 'DECH-250', price: 449, stockQuantity: 25, isAvailable: true },
      { id: 'v2', name: '500ml Bottle (Treats 20,000L)', sku: 'DECH-500', price: 799, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['water-care', 'conditioner', 'dechlorinator', 'tap-water', 'safe'],
    specifications: {
      'Dosage': '5 ml per 200 Liters',
      'Functions': 'Removes Chlorine, Chloramine, Ammonia & Heavy Metals'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-16T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-care-02',
    name: 'Live Nitrifying Bacteria Biological Starter Culture (250ml)',
    slug: 'nitrifying-bacteria-bio-starter-250ml',
    sku: 'CARE-BIO-250',
    categoryId: 'water-care',
    subcategoryId: 'bacteria-cycling',
    shortDescription: 'Rapidly cycles new aquariums and restocks beneficial nitrifying colonies after water changes.',
    fullDescription: 'Contains billions of dormant live nitrifying bacteria that activate instantly in the tank filter to convert harmful ammonia into harmless nitrate, preventing New Tank Syndrome and sudden fish mortality.',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 499,
    compareAtPrice: 650,
    currency: 'INR',
    stockQuantity: 26,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: '250ml Bio Starter', sku: 'BIO-250', price: 499, stockQuantity: 26, isAvailable: true }
    ],
    tags: ['bacteria', 'cycling', 'filter-starter', 'water-care', 'bacteria-cycling'],
    specifications: {
      'Application': 'New tanks, filter cleanings, post-medication recovery',
      'Target Path': 'Ammonia → Nitrite → Nitrate'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-18T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-care-fert-01',
    name: 'MasterScape All-in-One Macro & Micro Liquid Plant Fertilizer (300ml)',
    slug: 'masterscape-all-in-one-plant-fertilizer',
    sku: 'CARE-FERT-300',
    categoryId: 'water-care',
    subcategoryId: 'plant-fertilizers',
    shortDescription: 'Comprehensive bio-chelated iron, potassium, nitrogen, and trace minerals for vibrant red and green foliage.',
    fullDescription: 'Specially engineered for low-tech and high-tech planted tanks. Prevents leaf yellowing and pinholes while stimulating vigorous growth without triggering nuisance hair or brush algae.',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 520,
    compareAtPrice: 680,
    currency: 'INR',
    stockQuantity: 24,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: '300ml Pump Dispenser', sku: 'FERT-300', price: 520, stockQuantity: 24, isAvailable: true }
    ],
    tags: ['fertilizer', 'planted-aquarium', 'iron', 'potassium', 'plant-fertilizers'],
    specifications: {
      'Composition': 'N, P, K, Fe, Mg, Mn, Zn, B',
      'Dosing': '1 pump per 50 Liters 2x per week'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-18T12:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-care-salt-01',
    name: 'Aquarium Pure Mineral Tonic Salt & pH Stabilizer (500g)',
    slug: 'aquarium-pure-mineral-tonic-salt',
    sku: 'CARE-SALT-500',
    categoryId: 'water-care',
    subcategoryId: 'buffers-salts',
    shortDescription: 'Pharmaceutical-grade evaporated sea salt that supports gill osmotic balance, reduces nitrite toxicity, and promotes slime coat.',
    fullDescription: 'Natural remedy for stress reduction, fungal and parasitic prevention, and recovery after long transport. Free from iodine and anti-caking agents.',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
    ],
    price: 220,
    compareAtPrice: 300,
    currency: 'INR',
    stockQuantity: 45,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: '500g Resealable Tub', sku: 'SALT-500G', price: 220, stockQuantity: 45, isAvailable: true }
    ],
    tags: ['tonic-salt', 'osmotic', 'stress-relief', 'buffers-salts', 'water-care'],
    specifications: {
      'Purity': '99.8% Sodium Chloride (Non-iodized)',
      'Usage': '1 tablespoon per 20 Liters for routine tonic conditioning'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-18T14:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==================== 14. FISH FOOD & NUTRITION ====================
  {
    id: 'exp-food-01',
    name: 'Ultra-Color Enhancing Sinking Micro Pellets for Discus & Tetras',
    slug: 'ultra-color-enhancing-sinking-pellets',
    sku: 'FOOD-CLR-250G',
    categoryId: 'fish-food',
    subcategoryId: 'flakes-pellets',
    shortDescription: 'High-protein (48%) sinking granules formulated with Antarctic krill, astaxanthin, and spirulina.',
    fullDescription: 'Specially engineered for middle-to-bottom dwelling fish including dwarf cichlids, angels, tetras, and barbs. Slowly sinking formula won’t cloud crystal aquarium water and brings out vibrant reds, blues, and iridescent scales.',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 380,
    compareAtPrice: 480,
    currency: 'INR',
    stockQuantity: 30,
    availabilityStatus: 'in_stock',
    productType: 'food',
    variants: [
      { id: 'v1', name: '250g Tin Canister', sku: 'FOOD-250', price: 380, stockQuantity: 20, isAvailable: true },
      { id: 'v2', name: '500g Value Pack', sku: 'FOOD-500', price: 699, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['fish-food', 'pellets', 'color-enhancing', 'astaxanthin', 'flakes-pellets'],
    specifications: {
      'Crude Protein': 'Minimum 48%',
      'Crude Fat': 'Minimum 9%',
      'Pellet Size': '0.8mm - 1.2mm Slow Sinking'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-19T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-food-koi-01',
    name: 'Pro-Growth High-Protein Cichlid & Koi Floating Pellets (500g)',
    slug: 'pro-growth-cichlid-koi-floating-pellets',
    sku: 'FOOD-KOI-500G',
    categoryId: 'fish-food',
    subcategoryId: 'cichlid-koi-food',
    shortDescription: 'Balanced daily floating staple diet enriched with spirulina and stabilizing vitamins for show koi and cichlids.',
    fullDescription: 'Nutritionally complete floating feed formulated for maximum digestion and waste reduction. Promotes rapid muscle mass and vivid pattern definition without fatty liver risks.',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 490,
    compareAtPrice: 650,
    currency: 'INR',
    stockQuantity: 25,
    availabilityStatus: 'in_stock',
    productType: 'food',
    variants: [
      { id: 'v1', name: '500g Resealable Pouch', sku: 'KOI-FEED-500', price: 490, stockQuantity: 25, isAvailable: true }
    ],
    tags: ['koi-food', 'cichlid-food', 'floating-pellets', 'nutrition', 'cichlid-koi-food'],
    specifications: {
      'Crude Protein': '40%',
      'Pellet Size': '3mm Medium Floating'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-19T12:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-food-fd-01',
    name: 'Freeze-Dried Grade-A Bloodworms & Tubifex Cubes (100g)',
    slug: 'freeze-dried-bloodworms-tubifex-cubes',
    sku: 'FOOD-FD-100G',
    categoryId: 'fish-food',
    subcategoryId: 'freeze-dried',
    shortDescription: 'Gamma-irradiated pathogen-free whole bloodworms and tubifex cubes that stick directly to the aquarium glass.',
    fullDescription: 'A favorite treat for all tropical freshwater fish. Quick-frozen to preserve 100% of natural nutrition and enzymes without the parasite risks of live wild-caught worms.',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 340,
    compareAtPrice: 450,
    currency: 'INR',
    stockQuantity: 35,
    availabilityStatus: 'in_stock',
    productType: 'food',
    variants: [
      { id: 'v1', name: '100g Container', sku: 'BW-100G', price: 340, stockQuantity: 35, isAvailable: true }
    ],
    tags: ['bloodworms', 'freeze-dried', 'treats', 'high-protein', 'freeze-dried'],
    specifications: {
      'Protein': '55% Crude Protein',
      'Sterilization': 'Gamma Irradiated Pathogen-Free'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-19T14:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-food-spec-01',
    name: 'Decapsulated Baby Brine Shrimp & Nano Micro-Fry Liquid Diet',
    slug: 'decapsulated-artemia-brine-shrimp-fry-diet',
    sku: 'FOOD-SPEC-BBS',
    categoryId: 'fish-food',
    subcategoryId: 'specialty-food',
    shortDescription: 'Shell-free ready-to-feed high-energy Artemia cyst embryos designed for newborn fry and nano micro-predators.',
    fullDescription: 'Eliminates the time and hassle of hatching live brine shrimp. Highly nutritious Artemia embryos packed with yolk lipids and amino acids that baby guppies, bettas, and clownfish can consume immediately.',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 420,
    compareAtPrice: 550,
    currency: 'INR',
    stockQuantity: 28,
    availabilityStatus: 'in_stock',
    productType: 'food',
    variants: [
      { id: 'v1', name: '60g Squeeze Bottle', sku: 'BBS-60G', price: 420, stockQuantity: 28, isAvailable: true }
    ],
    tags: ['baby-fish', 'fry-food', 'brine-shrimp', 'artemia', 'specialty-food'],
    specifications: {
      'Hatch Needed': 'Zero (Shell-free direct feed)',
      'Target': 'Betta fry, nano fish, coral filter feeders'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-19T16:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==================== 16. CLEANING & MAINTENANCE TOOLS ====================
  {
    id: 'exp-clean-01',
    name: 'Floating Magnetic Aquarium Glass Cleaner with Scraper Blade',
    slug: 'floating-magnetic-glass-cleaner',
    sku: 'CLEAN-MAG-FLT-SUP',
    categoryId: 'cleaning',
    subcategoryId: 'siphons-scrapers',
    shortDescription: 'Strong neodymium magnetic algae wiper with floating inner handle and detachable stainless steel razor.',
    fullDescription: 'Cleans stubborn green spot algae effortlessly without putting your hands in the water. If the inner brush separates from the outer magnet, it floats safely to the top so you never scratch the glass with gravel.',
    images: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 699,
    compareAtPrice: 899,
    currency: 'INR',
    stockQuantity: 17,
    availabilityStatus: 'in_stock',
    productType: 'cleaning',
    variants: [
      { id: 'v1', name: 'Medium (For 6mm - 10mm Glass)', sku: 'MAG-MED-S', price: 699, stockQuantity: 12, isAvailable: true },
      { id: 'v2', name: 'Large (For 10mm - 15mm Glass)', sku: 'MAG-LRG-S', price: 999, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['cleaning', 'magnet', 'algae', 'scraper', 'siphons-scrapers'],
    specifications: {
      'Glass Thickness': '6mm to 12mm',
      'Feature': 'Self-floating buoyancy + interchangeable plastic & steel blades'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-clean-net-01',
    name: 'Soft Fine-Mesh Fish Catch Net & Flexible Stainless Hose Brush Set',
    slug: 'soft-fine-mesh-net-hose-brush-set',
    sku: 'CLEAN-NET-BRUSH',
    categoryId: 'cleaning',
    subcategoryId: 'nets-brushes',
    shortDescription: 'Tear-resistant non-abrasive soft nylon catch net and 1.5m spring-wound stainless steel pipe cleaner.',
    fullDescription: 'Protects delicate fish slime coats and betta caudal fins during transfer. Spring-wound double-ended brush easily snakes through ribbed canister filter hoses and lily pipes to clear bio-sludge.',
    images: [
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 320,
    compareAtPrice: 450,
    currency: 'INR',
    stockQuantity: 28,
    availabilityStatus: 'in_stock',
    productType: 'cleaning',
    variants: [
      { id: 'v1', name: 'Net (6-inch) + Pipe Brush (150cm)', sku: 'NET-BRUSH-SET', price: 320, stockQuantity: 28, isAvailable: true }
    ],
    tags: ['cleaning', 'fish-net', 'pipe-brush', 'maintenance', 'nets-brushes'],
    specifications: {
      'Net Dimensions': '15 x 12 cm fine soft mesh',
      'Brush Length': '155 cm flexible stainless steel spring'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-20T12:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==================== 17. PUMPS, CO2 & HARDWARE ====================
  {
    id: 'exp-hw-pump-01',
    name: 'Sobo Silent Magnetic-Mount Wavemaker & Circulation Pump (3000 LPH)',
    slug: 'sobo-silent-magnetic-wavemaker-pump',
    sku: 'HW-WAVE-3000',
    categoryId: 'hardware',
    subcategoryId: 'wavemakers-pumps',
    shortDescription: 'Wide-angle omnidirectional water circulation wavemaker with magnetic vibration dampening bracket.',
    fullDescription: 'Eliminates dead zones, stimulates coral polyp extension, and keeps fish actively exercising against gentle natural currents. Strong magnetic mount secures firmly through glass up to 12mm without suction cup decay.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
    ],
    price: 890,
    compareAtPrice: 1150,
    currency: 'INR',
    stockQuantity: 19,
    availabilityStatus: 'in_stock',
    productType: 'equipment',
    variants: [
      { id: 'v1', name: '3000 LPH Wavemaker (6W)', sku: 'WAVE-3000', price: 890, stockQuantity: 19, isAvailable: true }
    ],
    tags: ['wavemaker', 'circulation-pump', 'reef', 'water-movement', 'wavemakers-pumps'],
    specifications: {
      'Flow Rate': '3000 Liters / Hour',
      'Power': '6 Watts',
      'Mount': 'Reinforced Neodymium Magnet Mount'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-21T08:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-hw-01',
    name: 'Aquascaping Inline CO2 Atomizer & Ceramic Bubble Diffuser',
    slug: 'aquascaping-co2-atomizer-diffuser',
    sku: 'CO2-ATOM-16MM',
    categoryId: 'hardware',
    subcategoryId: 'co2-systems',
    shortDescription: 'Produces micro-fine CO2 mist for 100% gas dissolution directly in canister filter outflow hose.',
    fullDescription: 'Maximizes photosynthesis and vibrant pearling in demanding red aquatic plants while conserving pressurized carbon dioxide gas. Installs cleanly inline on 12/16mm or 16/22mm canister return tubing.',
    images: [
      'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1199,
    compareAtPrice: 1450,
    currency: 'INR',
    stockQuantity: 15,
    availabilityStatus: 'in_stock',
    productType: 'equipment',
    variants: [
      { id: 'v1', name: 'Inline Atomizer (12/16mm)', sku: 'CO2-IN-12', price: 1199, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Inline Atomizer (16/22mm)', sku: 'CO2-IN-16', price: 1299, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['co2', 'atomizer', 'planted-aquarium', 'diffuser', 'co2-systems', 'hardware'],
    specifications: {
      'Working Pressure': '1.5 - 2.5 bar',
      'Ceramic Membrane': 'Nano-porous micro bubble mist'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'exp-hw-uv-01',
    name: 'In-Line Submersible 9W UV Algae & Pathogen Sterilizer Clarifier',
    slug: 'inline-submersible-9w-uv-clarifier',
    sku: 'HW-UV-9W-INL',
    categoryId: 'hardware',
    subcategoryId: 'uv-sterilizers',
    shortDescription: 'Clarifies green pea-soup water and eliminates bacterial blooms within 72 hours without chemicals.',
    fullDescription: 'High-efficiency germicidal quartz lamp neutralizes free-floating planktonic algae and infectious parasites before they harm fish. Safe enclosed chamber ensures zero UV leakage into the aquarium.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1750,
    compareAtPrice: 2200,
    currency: 'INR',
    stockQuantity: 14,
    availabilityStatus: 'in_stock',
    productType: 'equipment',
    variants: [
      { id: 'v1', name: '9W UV Clarifier Kit', sku: 'UV-9W-KIT', price: 1750, stockQuantity: 14, isAvailable: true }
    ],
    tags: ['uv-sterilizer', 'clarifier', 'green-water', 'algae-cure', 'uv-sterilizers'],
    specifications: {
      'UV Bulb': '9W Germicidal 254nm Quartz Tube',
      'Service Life': '8,000 Operating Hours'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-21T12:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  }
];
