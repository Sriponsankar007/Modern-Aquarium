import { Category } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'freshwater-fish',
    name: 'Freshwater Fish',
    slug: 'freshwater-fish',
    description: 'Vibrant ornamental freshwater species, hand-selected healthy morphs, and exotic specimens.',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    active: true,
    subcategories: [
      { id: 'betta', name: 'Betta / Fighting Fish', slug: 'betta' },
      { id: 'guppy', name: 'Guppies & Endlers', slug: 'guppy' },
      { id: 'goldfish', name: 'Fancy Goldfish', slug: 'goldfish' },
      { id: 'tetra', name: 'Tetras & Characins', slug: 'tetra' },
      { id: 'cichlids', name: 'African & American Cichlids', slug: 'cichlids' },
      { id: 'angelfish', name: 'Angelfish', slug: 'angelfish' },
      { id: 'discus', name: 'Discus Varieties', slug: 'discus' },
      { id: 'arowana', name: 'Arowana & Monster Fish', slug: 'arowana' },
      { id: 'corydoras', name: 'Corydoras & Bottom Feeders', slug: 'corydoras' },
      { id: 'pleco', name: 'Plecos & L-Numbers', slug: 'pleco' },
      { id: 'barbs', name: 'Barbs & Danios', slug: 'barbs' },
      { id: 'rasbora', name: 'Rasboras & Nano Fish', slug: 'rasbora' },
      { id: 'gourami', name: 'Gouramis & Anabantoids', slug: 'gourami' },
      { id: 'rainbowfish', name: 'Rainbowfish', slug: 'rainbowfish' },
      { id: 'livebearers', name: 'Mollies, Platies & Swords', slug: 'livebearers' },
      { id: 'loaches', name: 'Loaches & Botias', slug: 'loaches' },
      { id: 'freshwater-sharks', name: 'Freshwater Sharks & Eels', slug: 'freshwater-sharks' },
      { id: 'exotic-freshwater', name: 'Pufferfish & Exotic Fish', slug: 'exotic-freshwater' }
    ]
  },
  {
    id: 'koi',
    name: 'Japanese Koi',
    slug: 'koi',
    description: 'Magnificent pond and luxury display Koi with champion bloodline patterns and metallic brilliance.',
    image: 'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
    active: true,
    subcategories: [
      { id: 'kohaku', name: 'Kohaku (Red & White)', slug: 'kohaku' },
      { id: 'sanke', name: 'Taisho Sanke (Tri-Color)', slug: 'sanke' },
      { id: 'showa', name: 'Showa Sanshoku', slug: 'showa' },
      { id: 'asagi', name: 'Asagi & Shusui', slug: 'asagi' },
      { id: 'ogon', name: 'Metallic Ogon (Gold/Platinum)', slug: 'ogon' },
      { id: 'tancho', name: 'Tancho (Red Crown)', slug: 'tancho' },
      { id: 'butterfly-koi', name: 'Longfin Butterfly Koi', slug: 'butterfly-koi' },
      { id: 'ginrin', name: 'Ginrin Diamond Scale Koi', slug: 'ginrin' }
    ]
  },
  {
    id: 'marine-fish',
    name: 'Marine & Saltwater Fish',
    slug: 'marine-fish',
    description: 'Captive-bred & quarantined saltwater reef inhabitants, dazzling clownfish, and tangs.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
    active: true,
    subcategories: [
      { id: 'clownfish', name: 'Clownfish Varieties', slug: 'clownfish' },
      { id: 'tangs', name: 'Tangs & Surgeonfish', slug: 'tangs' },
      { id: 'marine-angelfish', name: 'Dwarf & Large Angelfish', slug: 'marine-angelfish' },
      { id: 'gobies-blennies', name: 'Gobies & Blennies', slug: 'gobies-blennies' },
      { id: 'wrasses', name: 'Fairy & Cleaner Wrasses', slug: 'wrasses' },
      { id: 'cardinals-firefish', name: 'Cardinals & Firefish', slug: 'cardinals-firefish' },
      { id: 'predators-marine', name: 'Lionfish & Triggers', slug: 'predators-marine' }
    ]
  },
  {
    id: 'birds',
    name: 'Ornamental Birds & Care',
    slug: 'birds',
    description: 'Healthy aviary birds and comprehensive avian nutrition. All live birds are strictly Store Pickup Only.',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
    active: true,
    subcategories: [
      { id: 'lovebirds', name: 'Lovebirds & Parakeets', slug: 'lovebirds' },
      { id: 'cockatiels', name: 'Cockatiels', slug: 'cockatiels' },
      { id: 'budgies', name: 'Budgerigars & Finches', slug: 'budgies' },
      { id: 'canaries', name: 'Song Canaries', slug: 'canaries' },
      { id: 'bird-cages', name: 'Aviary & Flight Cages', slug: 'bird-cages' },
      { id: 'bird-food', name: 'Bird Nutrition & Seeds', slug: 'bird-food' },
      { id: 'bird-accessories', name: 'Feeders, Toys & Perches', slug: 'bird-accessories' }
    ]
  },
  {
    id: 'aquariums-tanks',
    name: 'Aquariums & Tanks',
    slug: 'aquariums-tanks',
    description: 'Ultra-clear low-iron rimless tanks, luxury furniture cabinets, nano setups, and custom aquariums.',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5,
    active: true,
    subcategories: [
      { id: 'rimless-tanks', name: 'Ultra-Clear Rimless Tanks', slug: 'rimless-tanks' },
      { id: 'nano-cubes', name: 'Nano All-In-One Cubes', slug: 'nano-cubes' },
      { id: 'betta-tanks', name: 'Betta & Desktop Aquariums', slug: 'betta-tanks' },
      { id: 'large-planted', name: 'Panoramic & Planted Tanks', slug: 'large-planted' },
      { id: 'cabinets-stands', name: 'Aquarium Stands & Cabinets', slug: 'cabinets-stands' },
      { id: 'bow-front', name: 'Bow-Front & Specialty Glass', slug: 'bow-front' }
    ]
  },
  {
    id: 'plants',
    name: 'Live Aquatic Plants',
    slug: 'plants',
    description: 'Pest-free tissue culture and potted plants, lush carpeting species, mosses, and background foliage.',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 6,
    active: true,
    subcategories: [
      { id: 'anubias-bucephalandra', name: 'Anubias & Bucephalandra', slug: 'anubias-bucephalandra' },
      { id: 'mosses', name: 'Aquatic Mosses & Ferns', slug: 'mosses' },
      { id: 'stem-plants', name: 'Stem & Background Plants', slug: 'stem-plants' },
      { id: 'carpet-plants', name: 'Foreground & Carpet Plants', slug: 'carpet-plants' },
      { id: 'floating-plants', name: 'Floating Surface Plants', slug: 'floating-plants' }
    ]
  },
  {
    id: 'substrate',
    name: 'Sand, Gravel & Substrate',
    slug: 'substrate',
    description: 'Active plant aqua soils, natural cosmetic sands, river pebbles, and hardscaping rocks.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    displayOrder: 7,
    active: true,
    subcategories: [
      { id: 'aqua-soil', name: 'Active Plant Aqua Soils', slug: 'aqua-soil' },
      { id: 'natural-sand', name: 'Cosmetic White & Black Sands', slug: 'natural-sand' },
      { id: 'hardscape-stones', name: 'Dragon & Seiryu Scaping Stones', slug: 'hardscape-stones' },
      { id: 'shrimp-substrate', name: 'Shrimp Mineral Substrates', slug: 'shrimp-substrate' }
    ]
  },
  {
    id: 'decorations',
    name: 'Aquarium Hardscape & Decor',
    slug: 'decorations',
    description: 'Natural Malaysian driftwood, spiderwood bonsai, ceramic breeding caves, and temple ruins.',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 8,
    active: true,
    subcategories: [
      { id: 'driftwood', name: 'Natural Driftwood & Roots', slug: 'driftwood' },
      { id: 'ceramic-caves', name: 'Pleco & Shrimp Breeding Caves', slug: 'ceramic-caves' },
      { id: 'themed-decor', name: 'Sunken Shipwrecks & Ruins', slug: 'themed-decor' }
    ]
  },
  {
    id: 'lighting',
    name: 'Aquarium Lighting',
    slug: 'lighting',
    description: 'High-PAR full-spectrum RGBW planted lights, app-programmable timers, and clip-on nano lamps.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    displayOrder: 9,
    active: true,
    subcategories: [
      { id: 'planted-rgb-lights', name: 'Planted Tank RGBW Fixtures', slug: 'planted-rgb-lights' },
      { id: 'clip-on-lights', name: 'Nano & Clip-On Lights', slug: 'clip-on-lights' },
      { id: 'light-accessories', name: 'Light Brackets & Smart Timers', slug: 'light-accessories' }
    ]
  },
  {
    id: 'filters',
    name: 'Filters & Filter Media',
    slug: 'filters',
    description: 'Silent external canisters, hang-on-back filtration, bio-sponges, and premium sintered ceramic rings.',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 10,
    active: true,
    subcategories: [
      { id: 'canister-filters', name: 'External Canister Filters', slug: 'canister-filters' },
      { id: 'hob-filters', name: 'Hang-On-Back (HOB) Filters', slug: 'hob-filters' },
      { id: 'sponge-filters', name: 'Bio-Sponge & Corner Filters', slug: 'sponge-filters' },
      { id: 'filter-media', name: 'Ceramic Rings, Matrix & Carbon', slug: 'filter-media' }
    ]
  },
  {
    id: 'air-equipment',
    name: 'Air Pumps & Aeration',
    slug: 'air-equipment',
    description: 'Ultra-silent diaphragm air pumps, micro-pore air stones, check valves, and silicone hoses.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 11,
    active: true,
    subcategories: [
      { id: 'air-pumps', name: 'Single & Multi-Outlet Air Pumps', slug: 'air-pumps' },
      { id: 'air-accessories', name: 'Air Stones, Tubing & Valves', slug: 'air-accessories' }
    ]
  },
  {
    id: 'water-equipment',
    name: 'Heaters & Testing Equipment',
    slug: 'water-equipment',
    description: 'Precision electronic heaters, digital pH pens, calibrated TDS meters, and master reagent test kits.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 12,
    active: true,
    subcategories: [
      { id: 'aquarium-heaters', name: 'Submersible Heaters', slug: 'aquarium-heaters' },
      { id: 'testing-meters', name: 'Liquid Test Kits & Digital Meters', slug: 'testing-meters' }
    ]
  },
  {
    id: 'water-care',
    name: 'Water Care & Conditioners',
    slug: 'water-care',
    description: 'Concentrated dechlorinators, beneficial nitrifying bacteria starters, plant fertilizers, and trace minerals.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 13,
    active: true,
    subcategories: [
      { id: 'conditioners', name: 'Dechlorinators & Water Purifiers', slug: 'conditioners' },
      { id: 'bacteria-cycling', name: 'Live Nitrifying Bio Starters', slug: 'bacteria-cycling' },
      { id: 'plant-fertilizers', name: 'Liquid Plant Micro & Macro Nutrients', slug: 'plant-fertilizers' },
      { id: 'buffers-salts', name: 'Aquarium Tonic Salts & Buffers', slug: 'buffers-salts' }
    ]
  },
  {
    id: 'fish-food',
    name: 'Fish Food & Nutrition',
    slug: 'fish-food',
    description: 'Protein-rich flakes, slow-sinking micro pellets, bottom wafers, and freeze-dried bloodworms.',
    image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=800&q=80',
    displayOrder: 14,
    active: true,
    subcategories: [
      { id: 'flakes-pellets', name: 'Tropical Flakes & Micro Pellets', slug: 'flakes-pellets' },
      { id: 'cichlid-koi-food', name: 'Koi & Cichlid Growth Diets', slug: 'cichlid-koi-food' },
      { id: 'freeze-dried', name: 'Freeze-Dried Bloodworms & Tubifex', slug: 'freeze-dried' },
      { id: 'specialty-food', name: 'Betta & Fry Baby Foods', slug: 'specialty-food' }
    ]
  },
  {
    id: 'shrimp-snails',
    name: 'Shrimp & Ornamental Snails',
    slug: 'shrimp-snails',
    description: 'Clean-up crew Neocaridina shrimp varieties, algae-devouring Amano shrimp, and Nerite snails.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    displayOrder: 15,
    active: true,
    subcategories: [
      { id: 'dwarf-shrimp', name: 'Neocaridina & Caridina Dwarf Shrimp', slug: 'dwarf-shrimp' },
      { id: 'aquarium-snails', name: 'Nerite & Mystery Clean-Up Snails', slug: 'aquarium-snails' }
    ]
  },
  {
    id: 'cleaning',
    name: 'Cleaning & Maintenance Tools',
    slug: 'cleaning',
    description: 'Gravel siphons, magnetic floating glass scrapers, surgical steel scaping wave scissors, and soft catch nets.',
    image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=800&q=80',
    displayOrder: 16,
    active: true,
    subcategories: [
      { id: 'siphons-scrapers', name: 'Gravel Siphons & Glass Scrapers', slug: 'siphons-scrapers' },
      { id: 'scaping-tools', name: 'Aquascaping Scissors & Tweezers', slug: 'scaping-tools' },
      { id: 'nets-brushes', name: 'Fish Catch Nets & Pipe Brushes', slug: 'nets-brushes' }
    ]
  },
  {
    id: 'hardware',
    name: 'Pumps, CO2 & Hardware',
    slug: 'hardware',
    description: 'Submersible DC return pumps, silent wavemakers, pressurized CO2 solenoid regulators, and UV clarifiers.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    displayOrder: 17,
    active: true,
    subcategories: [
      { id: 'wavemakers-pumps', name: 'Circulation Wavemakers & Water Pumps', slug: 'wavemakers-pumps' },
      { id: 'co2-systems', name: 'Pressurized CO2 Cylinders & Regulators', slug: 'co2-systems' },
      { id: 'uv-sterilizers', name: 'In-Line UV Algae Sterilizers', slug: 'uv-sterilizers' }
    ]
  }
];
