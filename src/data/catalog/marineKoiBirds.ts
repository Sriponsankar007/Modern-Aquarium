import { Product } from '../../types';

export const marineKoiBirdsCatalog: Product[] = [
// ==========================================
  // 2. JAPANESE KOI (Missing Varieties)
  // ==========================================
  {
    id: 'prod-koi-sanke-01',
    name: 'Taisho Sanke Japanese Koi (Champion Bloodline)',
    slug: 'taisho-sanke-japanese-koi',
    sku: 'KOI-SANKE-01',
    categoryId: 'koi',
    subcategoryId: 'sanke',
    scientificName: 'Cyprinus rubrofuscus',
    variety: 'Taisho Sanke (Tri-Color)',
    shortDescription: 'Prestigious tri-color koi with snow-white porcelain base, crimson Hi plates, and deep lacquered black Sumi spots.',
    fullDescription: 'Hand-selected from Niigata prefecture champion genetics. Features step-pattern crimson plates along the dorsal ridge punctuated by inky lacquer-black Sumi markings above the lateral line.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3200,
    compareAtPrice: 4200,
    currency: 'INR',
    stockQuantity: 5,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Nisai (20-25 cm)', sku: 'SANKE-NISAI', price: 3200, stockQuantity: 3, isAvailable: true },
      { id: 'v2', name: 'Sansai Show Grade (32-35 cm)', sku: 'SANKE-SANSAI', price: 6800, compareAtPrice: 8500, stockQuantity: 2, isAvailable: true }
    ],
    tags: ['koi', 'sanke', 'pond-fish', 'japanese-koi', 'luxury'],
    specifications: {
      'Bloodline': 'Dainichi / Sakai Sanke',
      'Quarantine Status': 'Fully certified 28-day KHV-negative quarantine'
    },
    careRequirements: {
      adultSize: '65 - 80 cm',
      recommendedTankSize: 'Outdoor Pond / Minimum 3000 Liters',
      waterTemperature: '15°C - 26°C',
      phRange: '7.2 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-18T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-koi-showa-01',
    name: 'Showa Sanshoku Japanese Koi',
    slug: 'showa-sanshoku-koi',
    sku: 'KOI-SHOWA-01',
    categoryId: 'koi',
    subcategoryId: 'showa',
    scientificName: 'Cyprinus rubrofuscus',
    variety: 'Kindai Showa',
    shortDescription: 'Bold black base koi with dynamic lightning bolt Sumi across the face, deep scarlet plates, and white contrast.',
    fullDescription: 'The Showa is admired for its muscular, aggressive sumi presence. Displays Motoguro (black pectoral fin joints) and an iconic black lightning band dividing the head.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3400,
    compareAtPrice: 4500,
    currency: 'INR',
    stockQuantity: 4,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Nisai (22-26 cm)', sku: 'SHOWA-NISAI', price: 3400, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['koi', 'showa', 'japanese-koi', 'pond'],
    specifications: {
      'Sumi Development': 'Deepens as water cools in winter'
    },
    careRequirements: {
      adultSize: '70 cm',
      recommendedTankSize: 'Minimum 4000 Liters Pond',
      waterTemperature: '14°C - 26°C',
      phRange: '7.4 - 8.4',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-19T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-koi-asagi-01',
    name: 'Asagi Blue Net Scale Japanese Koi',
    slug: 'asagi-blue-net-scale-koi',
    sku: 'KOI-ASAGI-01',
    categoryId: 'koi',
    subcategoryId: 'asagi',
    variety: 'Indigo Asagi Fukurin',
    shortDescription: 'Ancient classical koi variety featuring diamond blue reticulated netting across the back and orange belly accents.',
    fullDescription: 'One of the founding ancestral koi lines. The scales on the dorsal side show a light blue center with dark indigo edging resembling fine armor chainmail, flanked by fiery Hi belly coloration.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 2800,
    compareAtPrice: 3600,
    currency: 'INR',
    stockQuantity: 6,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Nisai (20-22 cm)', sku: 'ASAGI-20', price: 2800, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['koi', 'asagi', 'blue-koi', 'heritage'],
    specifications: {
      'Heritage': 'Traditional Japanese classical lineage'
    },
    careRequirements: {
      adultSize: '65 cm',
      recommendedTankSize: '3000 Liters Pond',
      waterTemperature: '15°C - 26°C',
      phRange: '7.2 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-19T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-koi-ogon-01',
    name: 'Yamabuki Ogon Solid Metallic Golden Koi',
    slug: 'yamabuki-ogon-golden-koi',
    sku: 'KOI-OGON-01',
    categoryId: 'koi',
    subcategoryId: 'ogon',
    variety: 'Yamabuki Metallic Gold',
    shortDescription: 'Monochromatic pure molten gold metallic luster that gleams like a gold bar through pond water.',
    fullDescription: 'Ogons are legendary for their friendly personality—often the first koi in a pond to feed directly from your hand. Immaculate golden yellow metallic sheen with zero blemishes.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 2950,
    compareAtPrice: 3800,
    currency: 'INR',
    stockQuantity: 8,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Nisai (20-24 cm)', sku: 'OGON-20', price: 2950, stockQuantity: 5, isAvailable: true },
      { id: 'v2', name: 'Jumbo Nisai (28-30 cm)', sku: 'OGON-30', price: 5200, compareAtPrice: 6500, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['koi', 'ogon', 'metallic', 'golden-koi', 'hand-feeding'],
    specifications: {
      'Skin Quality': 'Full metallic luster (Hikari-Muji)'
    },
    careRequirements: {
      adultSize: '75 cm',
      recommendedTankSize: '3500 Liters Pond',
      waterTemperature: '15°C - 26°C',
      phRange: '7.2 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-19T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-koi-tancho-01',
    name: 'Tancho Kohaku (Single Red Head Crest)',
    slug: 'tancho-kohaku-crest-koi',
    sku: 'KOI-TANCHO-01',
    categoryId: 'koi',
    subcategoryId: 'tancho',
    variety: 'Tancho Pure Crimson Sun',
    shortDescription: 'The national bird symbol of Japan: snow-white body with an immaculate round crimson circle on the forehead.',
    fullDescription: 'Highly revered among koi collectors. A true Tancho Kohaku exhibits zero red pigment on the body, featuring only a perfectly symmetrical round red emblem positioned squarely between the eyes.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 4500,
    compareAtPrice: 6000,
    currency: 'INR',
    stockQuantity: 3,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Show Grade Nisai (25 cm)', sku: 'TANCHO-25', price: 4500, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['koi', 'tancho', 'show-grade', 'rare', 'japanese-flag'],
    specifications: {
      'Crest Symmetry': 'Near-perfect circular crimson emblem'
    },
    careRequirements: {
      adultSize: '70 cm',
      recommendedTankSize: '3500 Liters Pond',
      waterTemperature: '15°C - 26°C',
      phRange: '7.4 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-koi-ginrin-01',
    name: 'Ginrin Showa (Diamond Sparkling Scales)',
    slug: 'ginrin-showa-diamond-scales',
    sku: 'KOI-GINRIN-01',
    categoryId: 'koi',
    subcategoryId: 'ginrin',
    variety: 'Diamond Ginrin Showa',
    shortDescription: 'Mesmerizing diamond scales that reflect sunlight like prism crystals across a bold black and crimson Showa pattern.',
    fullDescription: 'Each scale features an arched prismatic ridge that catches sunlight, making the koi glitter like crushed diamonds when swimming near the surface.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3800,
    compareAtPrice: 5000,
    currency: 'INR',
    stockQuantity: 4,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Nisai (22-26 cm)', sku: 'GINRIN-NISAI', price: 3800, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['koi', 'ginrin', 'sparkling', 'diamond-scale'],
    specifications: {
      'Scale Type': 'Diamond Ginrin (Hiroshima type)'
    },
    careRequirements: {
      adultSize: '68 cm',
      recommendedTankSize: '3500 Liters Pond',
      waterTemperature: '15°C - 26°C',
      phRange: '7.2 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==========================================
  // 3. MARINE FISH (Missing Varieties)
  // ==========================================
  {
    id: 'prod-marine-angel-01',
    name: 'Flame Angelfish (Captive Conditioned)',
    slug: 'flame-angelfish-dwarf-reef',
    sku: 'MAR-ANGEL-FLAME',
    categoryId: 'marine-fish',
    subcategoryId: 'marine-angelfish',
    scientificName: 'Centropyge loricula',
    variety: 'Marshall Islands Super Red',
    shortDescription: 'Spectacular glowing ember-orange body with vertical black bars and royal electric violet edges on fins.',
    fullDescription: 'The Flame Angel is universally considered the crown jewel of dwarf marine angelfish. Quarantined for 21 days and feeding actively on Mysis shrimp, marine flakes, and spirulina.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 4500,
    compareAtPrice: 5800,
    currency: 'INR',
    stockQuantity: 4,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Small/Medium (5-6 cm)', sku: 'FLAME-SM', price: 4500, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['marine-fish', 'angelfish', 'flame-angel', 'saltwater', 'reef'],
    specifications: {
      'Salinity Requirement': '1.023 - 1.025 Specific Gravity',
      'Reef Safety': 'Reef safe with caution (feed well)'
    },
    careRequirements: {
      adultSize: '10 cm',
      recommendedTankSize: '150 Liters (40 Gallons)',
      waterTemperature: '24°C - 26°C',
      phRange: '8.1 - 8.4',
      temperament: 'Semi-Aggressive',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Marine'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-marine-goby-01',
    name: 'Red Firefish Goby (Dartfish)',
    slug: 'red-firefish-goby-dartfish',
    sku: 'MAR-GOBY-FIRE',
    categoryId: 'marine-fish',
    subcategoryId: 'gobies-blennies',
    scientificName: 'Nemateleotris magnifica',
    variety: 'Indo-Pacific Vibrant Red',
    shortDescription: 'Slender, aerodynamic fish with brilliant white head, flaming crimson tail, and an erect antenna-like dorsal banner.',
    fullDescription: 'A gentle, reef-safe favorite that hovers above the substrate flicking its dorsal fin. Requires a covered tank with an anti-jump lid.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1450,
    compareAtPrice: 1900,
    currency: 'INR',
    stockQuantity: 8,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Single Firefish (5-6 cm)', sku: 'FIRE-GOBY-1', price: 1450, stockQuantity: 8, isAvailable: true }
    ],
    tags: ['marine-fish', 'goby', 'firefish', 'reef-safe', 'nano-reef'],
    specifications: {
      'Lid Requirement': 'Tightly fitted mesh lid mandatory (prone to jumping)'
    },
    careRequirements: {
      adultSize: '7.5 cm',
      recommendedTankSize: '75 Liters (20 Gallons)',
      waterTemperature: '24°C - 26°C',
      phRange: '8.1 - 8.4',
      temperament: 'Peaceful',
      diet: 'Carnivore',
      careDifficulty: 'Moderate',
      waterType: 'Marine'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-marine-wrasse-01',
    name: 'Six Line Wrasse (Pest Eradicator)',
    slug: 'six-line-wrasse-reef',
    sku: 'MAR-WRAS-6LINE',
    categoryId: 'marine-fish',
    subcategoryId: 'wrasses',
    scientificName: 'Pseudocheilinus hexataenia',
    variety: 'Electric Rainbow 6-Line',
    shortDescription: 'Vivid orange and blue pinstripes with iridescent ruby eyes. Hunts bristleworms and pyramidellid snails.',
    fullDescription: 'An indispensable worker fish for reef aquariums. Weaves tirelessly through live rock crevices hunting down coral-eating flatworms, bristleworms, and nuisance pests.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1850,
    compareAtPrice: 2300,
    currency: 'INR',
    stockQuantity: 6,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Active Specimen (5 cm)', sku: 'WRAS-6L', price: 1850, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['marine-fish', 'wrasse', 'reef-safe', 'pest-control'],
    specifications: {
      'Pest Control': 'Eats flatworms, parasitic snails, and bristleworms'
    },
    careRequirements: {
      adultSize: '7.5 cm',
      recommendedTankSize: '100 Liters (25 Gallons)',
      waterTemperature: '24°C - 26°C',
      phRange: '8.1 - 8.4',
      temperament: 'Semi-Aggressive',
      diet: 'Carnivore',
      careDifficulty: 'Moderate',
      waterType: 'Marine'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-marine-cardinal-01',
    name: 'Banggai Cardinalfish (Captive-Bred)',
    slug: 'banggai-cardinalfish-captive-bred',
    sku: 'MAR-CARD-BANG',
    categoryId: 'marine-fish',
    subcategoryId: 'cardinals-firefish',
    scientificName: 'Pterapogon kauderni',
    variety: 'Captive-Bred Silver Pearl',
    shortDescription: 'Regal silver body with vertical obsidian bars and dotted pearlescent pin-stripes. Peaceful mouthbrooder.',
    fullDescription: '100% sustainably captive-bred. Banggai Cardinals hover elegantly in water currents, often taking refuge among long-spined sea urchins. Acclimated to frozen and pellet foods.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1650,
    compareAtPrice: 2100,
    currency: 'INR',
    stockQuantity: 7,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Captive Bred Juvenile (4 cm)', sku: 'BANG-JUV', price: 1650, stockQuantity: 7, isAvailable: true }
    ],
    tags: ['marine-fish', 'cardinalfish', 'captive-bred', 'peaceful'],
    specifications: {
      'Breeding': 'Male mouthbrooder (easy to breed in captivity)'
    },
    careRequirements: {
      adultSize: '8 cm',
      recommendedTankSize: '80 Liters (20 Gallons)',
      waterTemperature: '24°C - 27°C',
      phRange: '8.1 - 8.4',
      temperament: 'Peaceful',
      diet: 'Carnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Marine'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-marine-lion-01',
    name: 'Volitan Lionfish (Red Zebra Moray Predator)',
    slug: 'volitan-lionfish-predator',
    sku: 'MAR-LION-VOL',
    categoryId: 'marine-fish',
    subcategoryId: 'predators-marine',
    scientificName: 'Pterois volitans',
    variety: 'Zebra Striped Fan Fin',
    shortDescription: 'Magnificent apex predator with fan-like pectoral pectoral plumage and venomous dorsal spines.',
    fullDescription: 'A jaw-dropping predator display fish. Highly intelligent, they recognize their feeding tongs and glide serenely with huge feathered fins. Strictly predatory—do not house with small fish or shrimp.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3600,
    compareAtPrice: 4800,
    currency: 'INR',
    stockQuantity: 3,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Small Specimen (8-10 cm)', sku: 'LION-SM', price: 3600, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['marine-fish', 'lionfish', 'predator', 'venomous', 'display-tank'],
    specifications: {
      'Caution': 'Venomous dorsal spine tips. Handle with care during maintenance.',
      'Feeding': 'Trained on frozen whole silversides, krill, and prawns'
    },
    careRequirements: {
      adultSize: '35 cm',
      recommendedTankSize: '350 Liters minimum',
      waterTemperature: '23°C - 26°C',
      phRange: '8.1 - 8.4',
      temperament: 'Aggressive',
      diet: 'Carnivore',
      careDifficulty: 'Moderate',
      waterType: 'Marine'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },

  // ==========================================
  // 4. BIRDS & BIRD CARE (Missing Varieties)
  // ==========================================
  {
    id: 'prod-bird-budgie-01',
    name: 'English Show Budgerigars (Budgie Pair)',
    slug: 'english-show-budgerigars-pair',
    sku: 'BIRD-BUDG-SHOWPR',
    categoryId: 'birds',
    subcategoryId: 'budgies',
    scientificName: 'Melopsittacus undulatus',
    variety: 'English Exhibition Feathered Mask',
    shortDescription: 'Pair of docile, gentle English exhibition budgies with full forehead crest feathering and vibrant plumage.',
    fullDescription: 'Larger and calmer than wild-type Australian budgies, English show budgies have sweet temperaments and distinct cheek spots. Sold as an active bonded pair. Hand-reared and healthy.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1400,
    compareAtPrice: 1800,
    currency: 'INR',
    stockQuantity: 6,
    availabilityStatus: 'in_stock',
    productType: 'live-bird',
    variants: [
      { id: 'v1', name: 'Bonded Pair (1 Male + 1 Female)', sku: 'BUDG-SHOW-PR', price: 1400, stockQuantity: 6, isAvailable: true }
    ],
    tags: ['birds', 'budgie', 'parakeet', 'store-pickup-only'],
    specifications: {
      'Policy': 'STORE PICKUP ONLY (Live Bird Welfare Enforced)',
      'Lifespan': '8 - 12 Years'
    },
    careRequirements: {
      adultSize: '22 cm',
      recommendedTankSize: 'Minimum 60cm Flight Cage',
      waterTemperature: 'Room Temperature (20°C - 28°C)',
      phRange: 'N/A',
      temperament: 'Community Safe',
      diet: 'Specialized',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'store_pickup_only',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-bird-canary-01',
    name: 'Red Factor Song Canary (Vocal Male)',
    slug: 'red-factor-song-canary-male',
    sku: 'BIRD-CAN-RED',
    categoryId: 'birds',
    subcategoryId: 'canaries',
    scientificName: 'Serinus canaria domestica',
    variety: 'Deep Red Factor Intense',
    shortDescription: 'Vibrant flame-red song canary famed for complex melodic rolling warbles and sweet disposition.',
    fullDescription: 'Renowned world-wide for their glorious vocal repertoire. Fed natural beta-carotene enriched diet to maintain deep scarlet plumage. Singing actively in store.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80'
    ],
    price: 2400,
    compareAtPrice: 3000,
    currency: 'INR',
    stockQuantity: 4,
    availabilityStatus: 'in_stock',
    productType: 'live-bird',
    variants: [
      { id: 'v1', name: 'Vocal Singing Male', sku: 'CAN-RED-M', price: 2400, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['birds', 'canary', 'songbird', 'store-pickup-only'],
    specifications: {
      'Singing': 'Male birds sing melodious rolling trills',
      'Policy': 'STORE PICKUP ONLY'
    },
    careRequirements: {
      adultSize: '13 cm',
      recommendedTankSize: 'Minimum 50cm Cage with horizontal flight room',
      waterTemperature: 'Indoor ambient',
      phRange: 'N/A',
      temperament: 'Peaceful',
      diet: 'Specialized',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'store_pickup_only',
    featured: true,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-bird-food-01',
    name: 'Prestige Premium Australian Parakeet & Cockatiel Seed Mix (1kg)',
    slug: 'prestige-premium-bird-seed-mix-1kg',
    sku: 'BIRD-FOOD-PRES1K',
    categoryId: 'birds',
    subcategoryId: 'bird-food',
    shortDescription: 'Enriched seed mixture with VAM pellets, dried oyster shells, chia seeds, and essential amino acids.',
    fullDescription: 'Formulated in consultation with scientific avian nutritionists. Features clean, dust-free canary seed, yellow & red millet, striped sunflower seeds, and extruded vitamin-mineral pellets.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80'
    ],
    price: 490,
    compareAtPrice: 620,
    currency: 'INR',
    stockQuantity: 30,
    availabilityStatus: 'in_stock',
    productType: 'food',
    variants: [
      { id: 'v1', name: '1 kg Pouch', sku: 'BIRD-SEED-1K', price: 490, stockQuantity: 20, isAvailable: true },
      { id: 'v2', name: '2.5 kg Value Tub', sku: 'BIRD-SEED-2.5K', price: 1090, compareAtPrice: 1350, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['bird-food', 'cockatiel-food', 'seeds', 'nutrition'],
    specifications: {
      'Ingredients': 'Yellow millet, white millet, safflower, canary seed, peeled oats, VAM granules',
      'Net Weight': '1 kg / 2.5 kg'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  },
  {
    id: 'prod-bird-perch-01',
    name: 'Natural Calcium Mineral Perch & Cotton Rope Foraging Swing Kit',
    slug: 'mineral-perch-foraging-swing-kit',
    sku: 'BIRD-ACC-PERCHKIT',
    categoryId: 'birds',
    subcategoryId: 'bird-accessories',
    shortDescription: 'Textured natural volcanic calcium conditioning perch trims bird claws and beak safely while preventing bumblefoot.',
    fullDescription: 'Essential aviary accessory kit including one ergonomic contour calcium conditioning perch that trims nails naturally plus a flexible colorful cotton rope climbing spiral with wooden chew blocks.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80'
    ],
    price: 399,
    compareAtPrice: 550,
    currency: 'INR',
    stockQuantity: 25,
    availabilityStatus: 'in_stock',
    productType: 'accessory',
    variants: [
      { id: 'v1', name: 'Standard Kit (Medium 20cm)', sku: 'BIRD-PERCH-STD', price: 399, stockQuantity: 25, isAvailable: true }
    ],
    tags: ['bird-accessories', 'perch', 'toys', 'beak-trimmer'],
    specifications: {
      'Materials': 'Natural mineral calcium, non-toxic dyed pine wood, stainless steel wing-nut clamp'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-25T12:00:00Z'
  }
];
