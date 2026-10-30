import { Product } from '../../types';

export const freshwaterCatalog: Product[] = [
// ==========================================
  // 1. FRESHWATER FISH (Missing Varieties)
  // ==========================================
  {
    id: 'prod-fish-cichlid-01',
    name: 'Electric Yellow Lab Cichlid',
    slug: 'electric-yellow-lab-cichlid',
    sku: 'CICHLID-YEL-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'cichlids',
    scientificName: 'Labidochromis caeruleus',
    variety: 'Lion’s Cove Electric Yellow',
    shortDescription: 'Striking vivid electric yellow African Lake Malawi Mbuna with crisp jet-black dorsal fin trims.',
    fullDescription: 'One of the most peaceful and radiant African cichlids in the hobby. Sourced from authentic Lake Malawi bloodlines, these active swimmers thrive in hard, alkaline water with limestone or Seiryu stone hardscape.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 320,
    compareAtPrice: 400,
    currency: 'INR',
    stockQuantity: 25,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Juvenile (4-5 cm)', sku: 'CICHLID-YEL-JUV', price: 320, stockQuantity: 15, isAvailable: true },
      { id: 'v2', name: 'Breeder Pair (Male + Female)', sku: 'CICHLID-YEL-PAIR', price: 750, compareAtPrice: 900, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['cichlids', 'malawi', 'african-cichlid', 'yellow-lab', 'freshwater'],
    specifications: {
      'Origin': 'Lake Malawi (Africa)',
      'Water Hardness': '10 - 20 dGH',
      'Min Group Size': '5+ individuals'
    },
    careRequirements: {
      adultSize: '10 cm',
      recommendedTankSize: '120 Liters (30 Gallons)',
      waterTemperature: '24°C - 28°C',
      phRange: '7.8 - 8.6',
      temperament: 'Semi-Aggressive',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater',
      compatibilityNotes: 'Ideal with Demasoni, Rusties, and Peacock cichlids. Provide plenty of rocky caves.'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-cichlid-02',
    name: 'Frontosa Blue Zaire Cichlid (Kigoma)',
    slug: 'frontosa-blue-zaire-cichlid',
    sku: 'CICHLID-FRON-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'cichlids',
    scientificName: 'Cyphotilapia frontosa',
    variety: '7-Stripe Kigoma Deep Blue',
    shortDescription: 'Regal Lake Tanganyika giant with majestic cranial hump and deep iridescent cobalt-blue fins.',
    fullDescription: 'The undisputed monarch of Lake Tanganyika. Frontosas are calm, deliberate swimmers that develop iconic nuchal humps as they mature. Quarantined, acclimated to captive pellet feeds, and suited for spacious biotope aquariums.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1850,
    compareAtPrice: 2200,
    currency: 'INR',
    stockQuantity: 6,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Sub-Adult (7-8 cm)', sku: 'FRON-SUB', price: 1850, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['cichlids', 'tanganyika', 'frontosa', 'monster-fish'],
    specifications: {
      'Origin': 'Lake Tanganyika',
      'Life Expectancy': '15 - 25 Years'
    },
    careRequirements: {
      adultSize: '30 - 35 cm',
      recommendedTankSize: '350 Liters minimum',
      waterTemperature: '24°C - 27°C',
      phRange: '8.0 - 9.0',
      temperament: 'Peaceful',
      diet: 'Carnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-10T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-angel-01',
    name: 'Platinum High-Fin Angelfish',
    slug: 'platinum-high-fin-angelfish',
    sku: 'ANGEL-PLAT-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'angelfish',
    scientificName: 'Pterophyllum scalare',
    variety: 'Pure Platinum Blue Luster',
    shortDescription: 'Pristine solid snow-white angel with shimmering metallic blue sheen and graceful extended veil fins.',
    fullDescription: 'Cultivated for immaculate purity, our Platinum Angelfish show zero striping, boasting a mother-of-pearl sheen that glistens under full-spectrum planted tank lighting. Ideal centerpiece for tall planted tanks.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 450,
    compareAtPrice: 600,
    currency: 'INR',
    stockQuantity: 18,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Single Medium (5-6 cm)', sku: 'ANGEL-PLAT-M', price: 450, stockQuantity: 12, isAvailable: true },
      { id: 'v2', name: 'Bonded Pair (Proven Spawners)', sku: 'ANGEL-PLAT-PR', price: 1250, compareAtPrice: 1500, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['angelfish', 'cichlids', 'planted-tank', 'centerpiece'],
    specifications: {
      'Tank Height Required': 'Minimum 45 cm (18 inches)',
      'Water Current': 'Gentle to moderate'
    },
    careRequirements: {
      adultSize: '15 cm height',
      recommendedTankSize: '100 Liters (25 Gallons)',
      waterTemperature: '25°C - 29°C',
      phRange: '6.5 - 7.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-12T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-cory-01',
    name: 'Panda Corydoras (Pack of 4)',
    slug: 'panda-corydoras-pack',
    sku: 'CORY-PANDA-4PK',
    categoryId: 'freshwater-fish',
    subcategoryId: 'corydoras',
    scientificName: 'Corydoras panda',
    variety: 'Pure Panda Mask',
    shortDescription: 'Playful miniature bottom-dwelling catfish with distinct dark eye patches and caudal stripe.',
    fullDescription: 'Panda Corys are beloved schooling bottom scavengers. Constantly sifting through fine sand with their sensitive sensory barbels, they keep the substrate oxygenated and free from leftover food debris.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 480,
    compareAtPrice: 600,
    currency: 'INR',
    stockQuantity: 12,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'School of 4 Corys', sku: 'CORY-PANDA-4', price: 480, stockQuantity: 8, isAvailable: true },
      { id: 'v2', name: 'School of 8 Corys', sku: 'CORY-PANDA-8', price: 880, compareAtPrice: 1100, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['corydoras', 'catfish', 'bottom-feeder', 'peaceful', 'cleanup'],
    specifications: {
      'Preferred Substrate': 'Fine soft silica sand',
      'Schooling Behaviour': 'Must be kept in groups of 4 or more'
    },
    careRequirements: {
      adultSize: '4.5 cm',
      recommendedTankSize: '50 Liters (13 Gallons)',
      waterTemperature: '22°C - 26°C',
      phRange: '6.0 - 7.4',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-12T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-pleco-01',
    name: 'Super Red Bristlenose Pleco (L144 Ancistrus)',
    slug: 'super-red-bristlenose-pleco',
    sku: 'PLECO-BN-SRED',
    categoryId: 'freshwater-fish',
    subcategoryId: 'pleco',
    scientificName: 'Ancistrus sp. "Super Red"',
    variety: 'German Bloodline Super Red',
    shortDescription: 'Compact algae grazer that stays manageable at 12cm. Intense fiery orange-red coloration.',
    fullDescription: 'Unlike common monster plecos that outgrow home aquariums, Bristlenose Plecos remain under 12cm. They are voracious diatom and film algae eaters that leave aquatic plants unharmed.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 650,
    compareAtPrice: 850,
    currency: 'INR',
    stockQuantity: 10,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Juvenile (4-5 cm)', sku: 'PLECO-BN-SRED-J', price: 650, stockQuantity: 7, isAvailable: true },
      { id: 'v2', name: 'Sub-Adult Male with Bristles', sku: 'PLECO-BN-SRED-M', price: 950, compareAtPrice: 1200, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['pleco', 'ancistrus', 'algae-eater', 'super-red', 'cleaner'],
    specifications: {
      'Max Size': '12 cm',
      'Dietary Need': 'Requires natural driftwood for digestion'
    },
    careRequirements: {
      adultSize: '10 - 12 cm',
      recommendedTankSize: '75 Liters (20 Gallons)',
      waterTemperature: '23°C - 27°C',
      phRange: '6.5 - 7.5',
      temperament: 'Peaceful',
      diet: 'Algae Grazer',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-14T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-barb-01',
    name: 'Denison Barb (Red Line Torpedo Barb)',
    slug: 'denison-barb-torpedo',
    sku: 'BARB-DEN-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'barbs',
    scientificName: 'Sahyadria denisonii',
    variety: 'Wild Form Captive-Bred',
    shortDescription: 'Streamlined athletic schooling barb with neon scarlet racing stripe and bright yellow-trimmed tail fork.',
    fullDescription: 'Originating from the fast-flowing streams of the Western Ghats, the Red Line Torpedo Barb is one of the most magnificent planted aquarium schooling species on Earth. Fast, active, and thoroughly peaceful in schools.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 350,
    compareAtPrice: 450,
    currency: 'INR',
    stockQuantity: 20,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Medium (5-6 cm)', sku: 'BARB-DEN-M', price: 350, stockQuantity: 14, isAvailable: true },
      { id: 'v2', name: 'School of 5 Barbs', sku: 'BARB-DEN-5PK', price: 1550, compareAtPrice: 1850, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['barbs', 'denison', 'torpedo-barb', 'schooling', 'active'],
    specifications: {
      'Water Flow': 'High oxygenation and moderate flow preferred',
      'School Requirement': 'Minimum 5 fish'
    },
    careRequirements: {
      adultSize: '14 cm',
      recommendedTankSize: '200 Liters (55 Gallons)',
      waterTemperature: '20°C - 26°C',
      phRange: '6.5 - 7.5',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-14T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-rasbora-01',
    name: 'Celestial Pearl Danio (Galaxy Rasbora - Pack of 5)',
    slug: 'celestial-pearl-danio-pack',
    sku: 'RASB-CPD-5PK',
    categoryId: 'freshwater-fish',
    subcategoryId: 'rasbora',
    scientificName: 'Danio margaritatus',
    variety: 'Starlight Galaxy Dot',
    shortDescription: 'Miniature gem with midnight-blue flank studded with pearlescent white dots and bright red fins.',
    fullDescription: 'The crown jewel of nano aquascaping. Maxing out at only 2.5cm, Celestial Pearl Danios are peaceful shoaling fish that sparkle like constellations in lushly planted aquariums.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 650,
    compareAtPrice: 800,
    currency: 'INR',
    stockQuantity: 15,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Pack of 5 Fish', sku: 'CPD-5', price: 650, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Pack of 10 Fish (Colony)', sku: 'CPD-10', price: 1199, compareAtPrice: 1500, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['rasbora', 'nano-fish', 'cpd', 'galaxy', 'planted-tank'],
    specifications: {
      'Adult Size': '2.2 - 2.5 cm',
      'Ideal Tank': 'Planted nano tank with mosses'
    },
    careRequirements: {
      adultSize: '2.5 cm',
      recommendedTankSize: '30 Liters (8 Gallons)',
      waterTemperature: '22°C - 26°C',
      phRange: '6.5 - 7.5',
      temperament: 'Peaceful',
      diet: 'Carnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-gourami-01',
    name: 'Pearl Gourami (Lace Gourami Pair)',
    slug: 'pearl-gourami-lace-pair',
    sku: 'GOUR-PEARL-PR',
    categoryId: 'freshwater-fish',
    subcategoryId: 'gourami',
    scientificName: 'Trichopodus leerii',
    variety: 'Diamond Mosaic Lace',
    shortDescription: 'Graceful labyrinth fish blanketed in mother-of-pearl polka dots with a brilliant sunset orange throat in males.',
    fullDescription: 'One of the most docile and visually stunning labyrinth fish. Pearl Gouramis navigate slow-moving planted waters using their tactile ventral feelers and can breathe atmospheric air.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 450,
    compareAtPrice: 580,
    currency: 'INR',
    stockQuantity: 14,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Breeder Pair (Male + Female)', sku: 'PEARL-PAIR', price: 450, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['gourami', 'pearl-gourami', 'labyrinth', 'peaceful'],
    specifications: {
      'Breathing': 'Access to surface air required',
      'Temperament': 'Very peaceful community fish'
    },
    careRequirements: {
      adultSize: '11 cm',
      recommendedTankSize: '80 Liters (20 Gallons)',
      waterTemperature: '24°C - 28°C',
      phRange: '6.0 - 7.5',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-rainbow-01',
    name: 'Boesemani Rainbowfish (Lake Aytinjo)',
    slug: 'boesemani-rainbowfish',
    sku: 'RAIN-BOES-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'rainbowfish',
    scientificName: 'Melanotaenia boesemani',
    variety: 'Lake Aytinjo Pure Biotope Strain',
    shortDescription: 'Dramatic two-tone body: deep cobalt blue forward half melting into fiery mandarin orange in the rear.',
    fullDescription: 'High-grade captive bred Boesemani Rainbows. Active midwater schooling fish that display intense morning flaring colors in mature planted setups.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 480,
    compareAtPrice: 650,
    currency: 'INR',
    stockQuantity: 16,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Select Male (6 cm)', sku: 'BOES-M', price: 480, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Pair (1 Male + 1 Female)', sku: 'BOES-PR', price: 850, compareAtPrice: 1100, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['rainbowfish', 'boesemani', 'schooling', 'active'],
    specifications: {
      'Swimming Level': 'Middle to Upper water column',
      'Color Intensity': 'Increases with age and live foods'
    },
    careRequirements: {
      adultSize: '10 cm',
      recommendedTankSize: '150 Liters (40 Gallons)',
      waterTemperature: '24°C - 28°C',
      phRange: '7.0 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-16T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-livebearer-01',
    name: 'Red Velvet Swordtail (Breeder Trio 1M + 2F)',
    slug: 'red-velvet-swordtail-trio',
    sku: 'LIVE-SWD-RED3',
    categoryId: 'freshwater-fish',
    subcategoryId: 'livebearers',
    scientificName: 'Xiphophorus hellerii',
    variety: 'Red Velvet Long Sword',
    shortDescription: 'Intense crimson red body with iconic elongated caudal sword on the male. Vigorous and hardy.',
    fullDescription: 'Swordtails are renowned for hardy constitution, active disposition, and prolific live-bearing reproduction. Ideal for community tanks with abundant stem plants.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 360,
    compareAtPrice: 480,
    currency: 'INR',
    stockQuantity: 20,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Trio (1 Male + 2 Females)', sku: 'SWD-TRIO', price: 360, stockQuantity: 20, isAvailable: true }
    ],
    tags: ['livebearers', 'swordtail', 'hardy', 'beginner'],
    specifications: {
      'Reproduction': 'Livebearer (gives birth to free-swimming fry)',
      'Water Chemistry': 'Tolerates wide parameters'
    },
    careRequirements: {
      adultSize: '10 cm (plus sword)',
      recommendedTankSize: '60 Liters (15 Gallons)',
      waterTemperature: '22°C - 28°C',
      phRange: '7.0 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-16T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-loach-01',
    name: 'Clown Loach (Wild Snail Controller)',
    slug: 'clown-loach-snail-controller',
    sku: 'LOACH-CLOWN-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'loaches',
    scientificName: 'Chromobotia macracanthus',
    variety: 'Sumatra Orange & Black Bar',
    shortDescription: 'Playful banded bottom fish with vibrant orange fins. The most effective natural control for pest snails.',
    fullDescription: 'Clown Loaches are lively, social characters known for their clicking sounds when excited and complete eradication of pest snails like ramshorns and bladder snails.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 280,
    compareAtPrice: 380,
    currency: 'INR',
    stockQuantity: 18,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Juvenile (5-6 cm)', sku: 'CLOWN-JUV', price: 280, stockQuantity: 12, isAvailable: true },
      { id: 'v2', name: 'Group of 3 Loaches', sku: 'CLOWN-3PK', price: 780, compareAtPrice: 950, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['loaches', 'clown-loach', 'snail-eater', 'bottom-dweller'],
    specifications: {
      'Social Group': 'Best kept in groups of 3 or more',
      'Snail Control': 'Consumes nuisance snail infestations rapidly'
    },
    careRequirements: {
      adultSize: '20 cm (slow growing)',
      recommendedTankSize: '150 Liters minimum',
      waterTemperature: '25°C - 30°C',
      phRange: '6.5 - 7.5',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-17T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-shark-01',
    name: 'Red Tail Black Shark',
    slug: 'red-tail-black-shark',
    sku: 'SHARK-RT-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'freshwater-sharks',
    scientificName: 'Epalzeorhynchos bicolor',
    variety: 'Velvet Black with Crimson Caudal',
    shortDescription: 'Iconic torpedo body with midnight black velvet texture and dazzling scarlet red caudal fin.',
    fullDescription: 'A dramatic territory-conscious centerpiece fish that patrols the bottom and midwater zones. Keeps algae grazed off rocks and driftwood.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 260,
    compareAtPrice: 350,
    currency: 'INR',
    stockQuantity: 15,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Select Specimen (6-7 cm)', sku: 'RT-SHARK-M', price: 260, stockQuantity: 15, isAvailable: true }
    ],
    tags: ['freshwater-sharks', 'red-tail-shark', 'centerpiece'],
    specifications: {
      'Territorial Note': 'Keep only 1 shark per aquarium',
      'Hiding Places': 'Provide caves and hollow driftwood'
    },
    careRequirements: {
      adultSize: '12 cm',
      recommendedTankSize: '120 Liters (30 Gallons)',
      waterTemperature: '24°C - 27°C',
      phRange: '6.5 - 7.8',
      temperament: 'Semi-Aggressive',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-17T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-fish-exotic-01',
    name: 'Dwarf Pea Puffer (Indian Freshwater Puffer)',
    slug: 'dwarf-pea-puffer',
    sku: 'PUFF-PEA-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'exotic-freshwater',
    scientificName: 'Carinotetraodon travancoricus',
    variety: 'Pure Freshwater Travancore Strain',
    shortDescription: 'The smallest pufferfish on the planet (2.5cm). Inquisitive independently moving eyes and snail specialist.',
    fullDescription: 'Dwarf pea puffers are true 100% freshwater puffers native to Kerala, India. Incredibly intelligent, they recognize their keeper and hunt down pest snails and frozen bloodworms with tactical precision.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 240,
    compareAtPrice: 320,
    currency: 'INR',
    stockQuantity: 22,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Single Puffer (2 cm)', sku: 'PEA-PUFF-1', price: 240, stockQuantity: 14, isAvailable: true },
      { id: 'v2', name: 'Trio of 3 Puffers', sku: 'PEA-PUFF-3', price: 650, compareAtPrice: 850, stockQuantity: 8, isAvailable: true }
    ],
    tags: ['pufferfish', 'pea-puffer', 'nano-tank', 'snail-hunter', 'exotic'],
    specifications: {
      'Water Type': '100% Pure Freshwater (No salt needed)',
      'Eye Movement': 'Independently swiveling chameleon eyes'
    },
    careRequirements: {
      adultSize: '2.5 cm',
      recommendedTankSize: '30 Liters (8 Gallons)',
      waterTemperature: '24°C - 28°C',
      phRange: '7.0 - 8.0',
      temperament: 'Semi-Aggressive',
      diet: 'Carnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-18T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  }
];
