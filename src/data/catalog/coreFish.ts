import { Product } from '../../types';

export const coreFish: Product[] = [
// ==================== FRESHWATER FISH ====================
  {
    id: 'prod-fish-01',
    name: 'Halfmoon Betta — Blue Rim Royal',
    slug: 'halfmoon-betta-blue-rim',
    sku: 'BETTA-HM-BLR01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'betta',
    scientificName: 'Betta splendens',
    variety: 'Halfmoon Blue Rim',
    shortDescription: 'Exquisite 180-degree spread caudal fin with porcelain white body and brilliant royal cobalt rimming.',
    fullDescription: 'Our Blue Rim Halfmoon Bettas are hand-picked from premier breeding bloodlines. Featuring a pristine white iridescent body and crisp cobalt blue edges along the fins with full 180-degree flare potential. Thoroughly conditioned, parasite-free, and trained to feed on micro pellets and live culture.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
    ],
    price: 650,
    compareAtPrice: 850,
    currency: 'INR',
    stockQuantity: 14,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Show Grade Male (3-4cm)', sku: 'BETTA-HM-M', price: 650, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Breeder Pair (Male + Female)', sku: 'BETTA-HM-PAIR', price: 1200, compareAtPrice: 1500, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['betta', 'halfmoon', 'freshwater', 'show-grade', 'easy'],
    specifications: {
      'Average Lifespan': '3 - 5 Years',
      'Current Size': '3.5 - 4 cm',
      'Housing': 'Single male per tank'
    },
    careRequirements: {
      adultSize: '6.5 cm',
      recommendedTankSize: 'Minimum 15 Liters (4 Gallons)',
      waterTemperature: '24°C - 28°C',
      phRange: '6.5 - 7.5',
      temperament: 'Semi-Aggressive',
      diet: 'Carnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater',
      compatibilityNotes: 'Keep males strictly solitary. Peaceful with mystery snails and small Corydoras.'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-02-15T12:00:00Z'
  },
  {
    id: 'prod-fish-02',
    name: 'Koi Plakat Betta — Galaxy Nemo',
    slug: 'koi-plakat-betta-galaxy-nemo',
    sku: 'BETTA-PK-NEMO',
    categoryId: 'freshwater-fish',
    subcategoryId: 'betta',
    scientificName: 'Betta splendens',
    variety: 'Galaxy Nemo Plakat',
    shortDescription: 'Short-finned athletic plakat with mottled orange, black, and iridescent turquoise starry scales.',
    fullDescription: 'The Galaxy Nemo Plakat is celebrated for vigorous health, high activity levels, and dazzling calico marbling. As short-finned fighters, they swim effortlessly in planted tanks without heavy fin drag. Every specimen displays a one-of-a-kind marbling mosaic.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 750,
    compareAtPrice: 950,
    currency: 'INR',
    stockQuantity: 8,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Select Male (Active Flaring)', sku: 'BETTA-PK-M', price: 750, stockQuantity: 8, isAvailable: true }
    ],
    tags: ['betta', 'plakat', 'galaxy', 'nemo', 'live-fish'],
    specifications: {
      'Origin': 'Captive-Bred Selective Strains',
      'Fin Type': 'Traditional Plakat (Short Fin)'
    },
    careRequirements: {
      adultSize: '5.5 cm',
      recommendedTankSize: '20 Liters (5 Gallons)',
      waterTemperature: '25°C - 28°C',
      phRange: '6.8 - 7.4',
      temperament: 'Semi-Aggressive',
      diet: 'Carnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-01-12T10:00:00Z',
    updatedAt: '2026-02-15T12:00:00Z'
  },
  {
    id: 'prod-fish-03',
    name: 'Moscow Blue Guppy Trio (1M + 2F)',
    slug: 'moscow-blue-guppy-trio',
    sku: 'GUPPY-MOS-TRIO',
    categoryId: 'freshwater-fish',
    subcategoryId: 'guppy',
    scientificName: 'Poecilia reticulata',
    variety: 'Moscow Blue Pure Strain',
    shortDescription: 'Deep metallic midnight blue sheen spreading fully from snout to tail. 100% true-breeding line.',
    fullDescription: 'Purebred Moscow Blue Guppies exhibiting an intense deep navy to teal metallic glow across their head, body, and dorsal fin. Livebearer trio includes 1 conditioned male and 2 virgin breeding females.',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 499,
    compareAtPrice: 650,
    currency: 'INR',
    stockQuantity: 20,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Breeding Trio (1 Male + 2 Females)', sku: 'GUPPY-MOS-3', price: 499, stockQuantity: 15, isAvailable: true },
      { id: 'v2', name: 'Show Colony (3 Pairs)', sku: 'GUPPY-MOS-6', price: 950, compareAtPrice: 1200, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['guppy', 'moscow-blue', 'livebearer', 'peaceful', 'community'],
    specifications: {
      'Breeding': 'Livebearer (High fecundity)',
      'Line Stability': '98% True to strain'
    },
    careRequirements: {
      adultSize: '4 cm (M) / 5.5 cm (F)',
      recommendedTankSize: '30 Liters',
      waterTemperature: '22°C - 27°C',
      phRange: '7.0 - 8.2',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater',
      compatibilityNotes: 'Ideal for planted community aquariums with peaceful tetras and rasboras.'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-02-16T12:00:00Z'
  },
  {
    id: 'prod-fish-04',
    name: 'Red Cap Oranda Goldfish (Grade A)',
    slug: 'red-cap-oranda-goldfish',
    sku: 'GOLDF-ORAN-RC',
    categoryId: 'freshwater-fish',
    subcategoryId: 'goldfish',
    scientificName: 'Carassius auratus',
    variety: 'Red Cap Oranda',
    shortDescription: 'Silvery snow-white round body topped by a prominent, ruby-red strawberry wen (hood).',
    fullDescription: 'Selected Grade A Red Cap Orandas with deep spherical symmetry, high double-tail posture, and an immaculate, well-defined scarlet raspberry hood. Fully quarantined in conditioned cool water.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 550,
    currency: 'INR',
    stockQuantity: 12,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Medium Size (6 - 8 cm)', sku: 'ORANDA-RC-M', price: 550, stockQuantity: 8, isAvailable: true },
      { id: 'v2', name: 'Jumbo Show Size (10 - 12 cm)', sku: 'ORANDA-RC-XL', price: 1100, compareAtPrice: 1400, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['goldfish', 'oranda', 'red-cap', 'fancy-goldfish'],
    specifications: {
      'Wen Formation': 'Full head crown',
      'Fin Symmetry': 'Dual fan tail'
    },
    careRequirements: {
      adultSize: '18 - 22 cm',
      recommendedTankSize: '80 Liters per fish',
      waterTemperature: '18°C - 23°C',
      phRange: '7.2 - 7.8',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater',
      compatibilityNotes: 'Requires strong bio-filtration and regular water changes. Keep only with other fancy goldfish.'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-02-18T12:00:00Z'
  },
  {
    id: 'prod-fish-05',
    name: 'Cardinal Tetra (School of 10)',
    slug: 'cardinal-tetra-school-10',
    sku: 'TETRA-CARD-10',
    categoryId: 'freshwater-fish',
    subcategoryId: 'tetra',
    scientificName: 'Paracheirodon axelrodi',
    variety: 'Cardinal Tetra Wild-Conditioned',
    shortDescription: 'Brilliant neon blue dorsal line with full-length deep scarlet crimson lower stripe. Tight schoolers.',
    fullDescription: 'Unlike the Neon Tetra, the Cardinal Tetra boasts a full unbroken red body bar running from snout to caudal tail. Our specimens are acclimated to tap water parameters, active, feeding greedily, and school tightly in planted tanks.',
    images: [
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 450,
    compareAtPrice: 600,
    currency: 'INR',
    stockQuantity: 35,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'School of 10 Fish', sku: 'CARD-10', price: 450, stockQuantity: 25, isAvailable: true },
      { id: 'v2', name: 'Aquascaper Pack of 25 Fish', sku: 'CARD-25', price: 999, compareAtPrice: 1250, stockQuantity: 10, isAvailable: true }
    ],
    tags: ['tetra', 'schooling', 'planted', 'nano', 'peaceful'],
    specifications: {
      'Schooling Behavior': 'Tight group schooling',
      'Acclimation': '14-Day Quarantined'
    },
    careRequirements: {
      adultSize: '4 cm',
      recommendedTankSize: '40 Liters',
      waterTemperature: '24°C - 28°C',
      phRange: '5.5 - 7.0',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater',
      compatibilityNotes: 'Classic companion for planted aquascapes, rasboras, and dwarf shrimp.'
    },
    deliveryPolicy: 'standard_delivery',
    featured: true,
    active: true,
    createdAt: '2026-01-22T10:00:00Z',
    updatedAt: '2026-02-18T12:00:00Z'
  },
  {
    id: 'prod-fish-06',
    name: 'Pigeon Blood Discus (Master Grade)',
    slug: 'pigeon-blood-discus',
    sku: 'DISCUS-PB-01',
    categoryId: 'freshwater-fish',
    subcategoryId: 'discus',
    scientificName: 'Symphysodon aequifasciatus',
    variety: 'Pigeon Blood Red',
    shortDescription: 'The undisputed King of the Aquarium. Intense fire-orange mosaic with zero peppering.',
    fullDescription: 'High-body round morphology Discus bred by certified hatcheries. Exhibits a radiant fiery reddish-orange background with intricate cream-white lattice patterns. Free of peppering blemishes, healthy red eyes, and high vigor.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 2200,
    compareAtPrice: 2800,
    currency: 'INR',
    stockQuantity: 6,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Sub-Adult (7.5 - 9 cm)', sku: 'DISC-PB-MED', price: 2200, stockQuantity: 4, isAvailable: true },
      { id: 'v2', name: 'Breeder Size (12 - 14 cm)', sku: 'DISC-PB-LG', price: 4200, compareAtPrice: 5000, stockQuantity: 2, isAvailable: true }
    ],
    tags: ['discus', 'king-of-aquarium', 'cichlid', 'exotic'],
    specifications: {
      'Dietary Needs': 'Beefheart paste, high-protein discus granules',
      'Water Hygiene': 'Warm pristine soft water'
    },
    careRequirements: {
      adultSize: '16 - 20 cm',
      recommendedTankSize: '200 Liters minimum',
      waterTemperature: '28°C - 31°C',
      phRange: '6.0 - 6.8',
      temperament: 'Peaceful',
      diet: 'Carnivore',
      careDifficulty: 'Advanced',
      waterType: 'Freshwater',
      compatibilityNotes: 'Keep in schools of 5+ individuals with peaceful companions such as Rummy-Nose Tetras and Sterbai Corys.'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-01-25T10:00:00Z',
    updatedAt: '2026-02-20T12:00:00Z'
  },
  {
    id: 'prod-fish-07',
    name: 'Super Red Asian Arowana (Microchipped)',
    slug: 'super-red-arowana-certified',
    sku: 'AROW-SR-CHIP',
    categoryId: 'freshwater-fish',
    subcategoryId: 'arowana',
    scientificName: 'Scleropages formosus',
    variety: 'Super Red Chili Bloodline',
    shortDescription: 'Prestigious Asian Dragon Fish with authentic CITES microchip certificate, broad spoon-head, and vivid red gill plates.',
    fullDescription: 'The pinnacle of luxury ornamental fishkeeping. Authentic farm-bred Asian Super Red Arowana featuring deep red gill-plates, full fin spread, and thick prominent barbels. Comes complete with formal CITES certification and implanted microchip ID.',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 35000,
    currency: 'INR',
    stockQuantity: 2,
    availabilityStatus: 'contact_for_price',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Juvenile 18-20cm (CITES Certified)', sku: 'AROW-SR-20', price: 35000, stockQuantity: 2, isAvailable: true }
    ],
    tags: ['arowana', 'dragon-fish', 'monster-fish', 'luxury', 'cites'],
    specifications: {
      'Certification': 'CITES Certificate & Tag Included',
      'Diet': 'Mealworms, market shrimp, crickets'
    },
    careRequirements: {
      adultSize: '60 - 80 cm',
      recommendedTankSize: 'Minimum 500 Liters',
      waterTemperature: '26°C - 30°C',
      phRange: '6.5 - 7.5',
      temperament: 'Aggressive',
      diet: 'Carnivore',
      careDifficulty: 'Expert Only',
      waterType: 'Freshwater',
      compatibilityNotes: 'Requires heavy-duty weighted tank lid. Solitary or kept with large bottom dwellers like giant Plecos.'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-01-28T10:00:00Z',
    updatedAt: '2026-02-20T12:00:00Z'
  },

  // ==================== JAPANESE KOI ====================
  {
    id: 'prod-koi-01',
    name: 'Kohaku Japanese Koi — Niigata Bloodline',
    slug: 'kohaku-japanese-koi',
    sku: 'KOI-KOH-NIIG01',
    categoryId: 'koi',
    subcategoryId: 'kohaku',
    scientificName: 'Cyprinus rubrofuscus',
    variety: 'Kohaku (Red & White)',
    shortDescription: 'Snow-white skin (Shiroji) accented with sharp-edged deep crimson patterns (Hi). Classic Japanese favorite.',
    fullDescription: 'Directly sourced from Niigata breeder stock. Features thick, lustrous white base skin and distinct crimson island patterns known as Danmoyo. Vigorous, friendly feeders that readily interact with pond owners.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1800,
    compareAtPrice: 2200,
    currency: 'INR',
    stockQuantity: 10,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Nisai (18 - 22 cm)', sku: 'KOI-KOH-20', price: 1800, stockQuantity: 6, isAvailable: true },
      { id: 'v2', name: 'Sansai Large (28 - 35 cm)', sku: 'KOI-KOH-30', price: 4500, compareAtPrice: 5500, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['koi', 'kohaku', 'pond', 'japanese-koi', 'outdoor'],
    specifications: {
      'Breeder Heritage': 'Niigata lineage',
      'Pattern Style': 'Nidan / Sandan step'
    },
    careRequirements: {
      adultSize: '65 - 85 cm',
      recommendedTankSize: 'Outdoor pond or 1,000+ Liters',
      waterTemperature: '15°C - 25°C',
      phRange: '7.2 - 8.0',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Moderate',
      waterType: 'Freshwater',
      compatibilityNotes: 'Pond community with Taisho Sanke, Showa, and Butterfly Koi.'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-01-30T10:00:00Z',
    updatedAt: '2026-02-22T12:00:00Z'
  },
  {
    id: 'prod-koi-02',
    name: 'Longfin Butterfly Koi — Platinum & Gold',
    slug: 'longfin-butterfly-koi',
    sku: 'KOI-BUTT-02',
    categoryId: 'koi',
    subcategoryId: 'butterfly-koi',
    scientificName: 'Cyprinus rubrofuscus var.',
    variety: 'Butterfly Longfin',
    shortDescription: 'Flowing, silk-like finnage and glistening metallic scales that glide gracefully in deep pond waters.',
    fullDescription: 'Prized for their dramatic flowing fins and whiskers, Butterfly Koi resemble aquatic dragons gliding through water. Highly peaceful and exceptionally hardy across seasonal pond temperatures.',
    images: [
      'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1450,
    currency: 'INR',
    stockQuantity: 15,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Juvenile (15 - 18 cm)', sku: 'KOI-BF-15', price: 1450, stockQuantity: 10, isAvailable: true },
      { id: 'v2', name: 'Show Specimen (25 cm)', sku: 'KOI-BF-25', price: 3200, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['koi', 'butterfly-koi', 'longfin', 'pond'],
    specifications: {
      'Fin Development': 'Full dragon veil finnage'
    },
    careRequirements: {
      adultSize: '60 cm',
      recommendedTankSize: 'Pond or 800+ Liters',
      waterTemperature: '16°C - 26°C',
      phRange: '7.0 - 7.8',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Freshwater'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-02-22T12:00:00Z'
  },

  // ==================== MARINE FISH ====================
  {
    id: 'prod-marine-01',
    name: 'Ocellaris Clownfish (Captive-Bred Pair)',
    slug: 'ocellaris-clownfish-pair',
    sku: 'MAR-CLOWN-OC01',
    categoryId: 'marine-fish',
    subcategoryId: 'clownfish',
    scientificName: 'Amphiprion ocellaris',
    variety: 'Captive-Bred False Percula',
    shortDescription: 'Hearty captive-bred bonded pair. Classic orange body with vivid white striping outlined in crisp black.',
    fullDescription: 'The classic Nemo reef ambassador! Being 100% captive-bred, our clownfish pairs are conditioned to readily accept dry flake and pellet foods, and show superior parasite resistance compared to wild catches. Bonded and ready to host anemones or corals.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1850,
    compareAtPrice: 2200,
    currency: 'INR',
    stockQuantity: 8,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Bonded Pair (1.5 - 2 inches)', sku: 'CLOWN-PAIR', price: 1850, stockQuantity: 6, isAvailable: true },
      { id: 'v2', name: 'Single Specimen', sku: 'CLOWN-SGL', price: 950, stockQuantity: 2, isAvailable: true }
    ],
    tags: ['marine', 'clownfish', 'saltwater', 'reef-safe', 'captive-bred'],
    specifications: {
      'Salinity': '1.023 - 1.025 SG',
      'Breeding': 'Captive-Bred Aquacultured'
    },
    careRequirements: {
      adultSize: '8 cm',
      recommendedTankSize: '80 Liters',
      waterTemperature: '24°C - 26°C',
      phRange: '8.1 - 8.4',
      temperament: 'Peaceful',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      waterType: 'Marine',
      compatibilityNotes: '100% Reef safe with SPS, LPS, and soft corals. Peaceful community reef tank mate.'
    },
    deliveryPolicy: 'local_express',
    featured: true,
    active: true,
    createdAt: '2026-02-02T10:00:00Z',
    updatedAt: '2026-02-23T12:00:00Z'
  },
  {
    id: 'prod-marine-02',
    name: 'Blue Regal Tang / Hippo Tang (Quarantined)',
    slug: 'blue-regal-tang-quarantined',
    sku: 'MAR-TANG-REG01',
    categoryId: 'marine-fish',
    subcategoryId: 'tangs',
    scientificName: 'Paracanthurus hepatus',
    variety: 'Pacific Blue Tang',
    shortDescription: 'Vivid electric blue body with black palette marking and bright yellow triangular caudal fin.',
    fullDescription: 'Known worldwide as "Dory", the Blue Tang is an energetic active cruiser. Every individual undergoes our strict 21-day copper and praziquantel quarantine protocol to ensure zero Ich or velvet parasites.',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3800,
    currency: 'INR',
    stockQuantity: 4,
    availabilityStatus: 'in_stock',
    productType: 'live-fish',
    variants: [
      { id: 'v1', name: 'Small/Medium (5 - 6 cm)', sku: 'TANG-SM', price: 3800, stockQuantity: 4, isAvailable: true }
    ],
    tags: ['marine', 'tang', 'hippo-tang', 'reef-safe'],
    specifications: {
      'Dietary Need': 'Enriched Nori seaweed sheets & mysis'
    },
    careRequirements: {
      adultSize: '25 cm',
      recommendedTankSize: 'Minimum 350 Liters (Long tank)',
      waterTemperature: '24°C - 26°C',
      phRange: '8.2 - 8.4',
      temperament: 'Semi-Aggressive',
      diet: 'Herbivore',
      careDifficulty: 'Moderate',
      waterType: 'Marine'
    },
    deliveryPolicy: 'local_express',
    featured: false,
    active: true,
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-23T12:00:00Z'
  },

  // ==================== ORNAMENTAL BIRDS (STORE PICKUP ONLY) ====================
  {
    id: 'prod-bird-01',
    name: 'Peach-Faced Lovebirds (Breeding Pair)',
    slug: 'peach-faced-lovebirds-pair',
    sku: 'BIRD-LOVE-PF01',
    categoryId: 'birds',
    subcategoryId: 'lovebirds',
    scientificName: 'Agapornis roseicollis',
    variety: 'Peach-Faced Classic Green/Peach',
    shortDescription: 'Affectionate bonded pair with emerald green plumage, coral peach face, and playful personalities.',
    fullDescription: 'STORE PICKUP ONLY. Our aviary-raised lovebird pairs are healthy, active, and fully feathered. Bonded pairs spend their days preening and chattering together. We ensure full dietary weaning on seeds, fresh veggies, and cuttlebone before rehoming.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80'
    ],
    price: 1800,
    compareAtPrice: 2200,
    currency: 'INR',
    stockQuantity: 5,
    availabilityStatus: 'in_stock',
    productType: 'live-bird',
    variants: [
      { id: 'v1', name: 'Bonded Pair (Male + Female)', sku: 'LOVE-PAIR', price: 1800, stockQuantity: 5, isAvailable: true }
    ],
    tags: ['birds', 'lovebirds', 'store-pickup-only', 'aviary', 'pets'],
    specifications: {
      'Age': '8 - 10 Months (Mature)',
      'Fulfilment Policy': 'STORE PICKUP ONLY (Live animal welfare regulation)'
    },
    careRequirements: {
      adultSize: '15 cm',
      diet: 'Omnivore',
      careDifficulty: 'Easy / Beginner',
      compatibilityNotes: 'Strictly Store Pickup Only. Must not be housed with smaller finches.'
    },
    deliveryPolicy: 'store_pickup_only',
    featured: true,
    active: true,
    createdAt: '2026-02-05T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },
  {
    id: 'prod-bird-02',
    name: 'Hand-Tamed Lutino Cockatiel',
    slug: 'hand-tamed-lutino-cockatiel',
    sku: 'BIRD-COCK-LUT01',
    categoryId: 'birds',
    subcategoryId: 'cockatiels',
    scientificName: 'Nymphicus hollandicus',
    variety: 'Lutino Yellow & Orange Cheeks',
    shortDescription: 'Gentle, hand-tamed whistling companion with sunny yellow crest and vibrant orange circular cheeks.',
    fullDescription: 'STORE PICKUP ONLY. Hand-fed from chick stage, this Lutino cockatiel is exceptionally social, loves stepping onto fingers, and whistles cheerful tunes. Acclimated to home surroundings, clean aviary pellets, and seed blends.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80'
    ],
    price: 3200,
    currency: 'INR',
    stockQuantity: 3,
    availabilityStatus: 'in_stock',
    productType: 'live-bird',
    variants: [
      { id: 'v1', name: 'Hand-Tamed Young Male (Whistling)', sku: 'COCK-LUT-M', price: 3200, stockQuantity: 3, isAvailable: true }
    ],
    tags: ['birds', 'cockatiel', 'hand-tamed', 'store-pickup-only'],
    specifications: {
      'Temperament': 'Affectionate & Vocal',
      'Delivery': 'STORE PICKUP ONLY'
    },
    careRequirements: {
      adultSize: '32 cm (with tail)',
      diet: 'Herbivore',
      careDifficulty: 'Easy / Beginner',
      compatibilityNotes: 'Requires daily interaction and a roomy cage with multiple wooden perches.'
    },
    deliveryPolicy: 'store_pickup_only',
    featured: true,
    active: true,
    createdAt: '2026-02-06T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  },
  {
    id: 'prod-bird-acc-01',
    name: 'Deluxe Wrought Iron Flight Aviary Cage',
    slug: 'deluxe-flight-aviary-cage',
    sku: 'CAGE-FLIGHT-01',
    categoryId: 'birds',
    subcategoryId: 'bird-cages',
    shortDescription: 'Spacious non-toxic powder-coated bird cage with pull-out debris tray, feeder cups, and natural perches.',
    fullDescription: 'Give your birds freedom to stretch their wings. Constructed from durable hammered-finish wrought iron with safe 0.5-inch bar spacing suitable for lovebirds, cockatiels, budgies, and finches. Features 4 rolling casters, storage shelf, and easy-clean slide-out bottom grate.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80'
    ],
    price: 4999,
    compareAtPrice: 6200,
    currency: 'INR',
    stockQuantity: 7,
    availabilityStatus: 'in_stock',
    productType: 'equipment',
    variants: [
      { id: 'v1', name: 'Medium Flight (60x40x85 cm)', sku: 'CAGE-MED', price: 4999, stockQuantity: 5, isAvailable: true },
      { id: 'v2', name: 'Large Aviary on Stand (75x50x140 cm)', sku: 'CAGE-LG', price: 8500, compareAtPrice: 9990, stockQuantity: 2, isAvailable: true }
    ],
    tags: ['cages', 'birds', 'aviary', 'flight-cage'],
    specifications: {
      'Bar Spacing': '12 mm (Safe for small birds)',
      'Material': 'Non-toxic powder coated wrought iron'
    },
    deliveryPolicy: 'standard_delivery',
    featured: false,
    active: true,
    createdAt: '2026-02-07T10:00:00Z',
    updatedAt: '2026-02-24T12:00:00Z'
  }
];
