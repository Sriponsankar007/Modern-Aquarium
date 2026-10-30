import { ServiceItem } from '../types';

export const initialServices: ServiceItem[] = [
  {
    id: 'aquarium-setup-installation',
    name: 'Turnkey Aquarium Setup & Installation',
    slug: 'aquarium-setup-installation',
    shortDescription: 'Complete professional delivery, leveling, plumbing, hardscaping, substrate laying, and biological cycling setup.',
    fullDescription: 'From bare glass to a breathtaking underwater ecosystem. Our senior aquarists handle tank leveling, canister filter plumbing, substrate stratification, hardscape anchoring (driftwood & stones), precision plant planting, water conditioning, and beneficial bacteria seeding. We ensure zero leaks and safe biological maturation.',
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 2499,
    durationEstimate: '3 - 5 Hours',
    includes: [
      'Site inspection and precision leveling check',
      'Filter plumbing, media layering & leak testing',
      'Hardscape layout (Iwagumi, Nature or Biotope style)',
      'Substrate installation and plant planting',
      'Water conditioning, mineral balancing & bio-starter inoculation',
      '14-day post-installation cycling support via WhatsApp'
    ],
    idealFor: 'New tank owners, luxury home installations, planted nano setups, and office lobbies.',
    active: true
  },
  {
    id: 'routine-aquarium-maintenance',
    name: 'Regular Aquarium Maintenance & Water Care',
    slug: 'routine-aquarium-maintenance',
    shortDescription: 'Bi-weekly or monthly expert maintenance: 30% water change, gravel vacuuming, glass polishing, and water analysis.',
    fullDescription: 'Keep your aquarium crystal clear and your livestock thriving without lifting a heavy bucket. Our certified technicians visit your location with sterilized equipment to perform gentle gravel siphoning, front-and-back glass polishing, mechanical pre-filter rinsing, and precise master liquid parameter testing.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 999,
    durationEstimate: '1.5 - 2 Hours',
    includes: [
      'Up to 35% conditioned water change',
      'Substrate debris and detritus siphoning',
      'Glass algae scraping (inside & outside streak-free)',
      'Pre-filter mechanical sponge cleansing in tank water',
      'Comprehensive 6-parameter chemical water testing',
      'Livestock wellness examination & feeding dosage tuning'
    ],
    idealFor: 'Busy hobbyists, family community tanks, planted tanks, and boutique showpieces.',
    active: true
  },
  {
    id: 'deep-cleaning-algae-restoration',
    name: 'Deep Cleaning & Severe Algae Restoration',
    slug: 'deep-cleaning-algae-restoration',
    shortDescription: 'Intensive tank overhaul for hair algae, black beard algae (BBA), cyanobacteria, and neglected aquariums.',
    fullDescription: 'Transform a murky, overgrown, or algae-choked tank back into pristine showroom condition. We safely target black beard algae, green spot, hair algae, and cyanobacteria using plant-safe spot treatments, deep substrate purging, sterilizing filter impellers, and recalibrating photoperiod and nutrient ratios.',
    iconName: 'ShieldAlert',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 1899,
    durationEstimate: '2.5 - 4 Hours',
    includes: [
      'Hydrogen peroxide / glutaraldehyde targeted spot treatment',
      'Manual removal of black beard and hair algae from hardscape',
      'Filter impeller and plumbing line deep brush scrubbing',
      'Substrate aeration and anaerobic pocket degassing',
      '50% multi-stage temperature-matched water exchange',
      'Algae root-cause diagnosis and customized light/CO2 schedule'
    ],
    idealFor: 'Severely overgrown tanks, green water blooms, and tanks requiring complete revival.',
    active: true
  },
  {
    id: 'professional-aquascaping-design',
    name: 'Master Aquascaping & Custom Layout Design',
    slug: 'professional-aquascaping-design',
    shortDescription: 'Custom Nature Aquarium, Dutch style, or Iwagumi layout created by award-winning aquascaping artists.',
    fullDescription: 'Bring an artistic slice of nature into your interior. Our aquascaping specialists select premium Ryuoh/Dragon stones, aged bonsai driftwood, and tier-one tissue culture plants to craft breathtaking depth, golden ratio focal points, and harmonious balance.',
    iconName: 'Palette',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 4999,
    durationEstimate: 'Full Day / Tailored Project',
    includes: [
      'Consultation & 3D layout mockup sketch',
      'Curated premium hardscape selection (Seiryu/Dragon stones, rootwood)',
      'Substrate slope structuring with active soil and cosmetic path sands',
      'High-density planting (carpeting, midground accents, background stems)',
      'CO2 diffusion optimization & PAR light intensity mapping',
      '30-day plant stabilization and trimming roadmap'
    ],
    idealFor: 'High-tech planted tanks, luxury residences, showroom features, and competitive scapes.',
    active: true
  },
  {
    id: 'aquarium-relocation-moving',
    name: 'Safe Aquarium Relocation & Moving',
    slug: 'aquarium-relocation-moving',
    shortDescription: 'Zero-stress moving service for glass tanks, live fish, delicate corals, and biological filter media.',
    fullDescription: 'Moving house or office? Transporting an established aquarium is fraught with biological shock risks. We provide aerated livestock transport containers, battery-operated bubblers, preserve your active biological filter bacteria, and re-establish your tank at the new address within hours.',
    iconName: 'Truck',
    image: 'https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 3499,
    durationEstimate: '4 - 8 Hours',
    includes: [
      'Stress-free fish and plant catching and oxygenated packing',
      'Preservation of cycled bio-media in oxygen-rich tank water',
      'Safe glass tank disassembly, padded wrapping & secure transport',
      'Immediate reassembly, leveling & acclimation at destination',
      'Anti-stress water conditioning and gradual temperature matching',
      'Post-relocation 48-hour monitoring'
    ],
    idealFor: 'Residential relocations, corporate office shifts, and inter-city aquarium transfers.',
    active: true
  },
  {
    id: 'fish-health-water-consultation',
    name: 'Fish Health & Water Parameter Consultation',
    slug: 'fish-health-water-consultation',
    shortDescription: 'Diagnosis of fish sickness (Ich, fin rot, dropsy, swim bladder) and lab-grade liquid parameter tests.',
    fullDescription: 'Notice lethargic fish, cloudy eyes, clamped fins, or unexplained losses? Our senior aquatic pathologists assess behavior, examine water parameters (Ammonia, Nitrite, Nitrate, pH, GH, KH, TDS), identify pathogens, and provide accurate quarantine and medication regimens.',
    iconName: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 799,
    durationEstimate: '1 Hour Consultation',
    includes: [
      'On-site or video microscope symptom examination',
      'Digital multi-reagent water testing for 8 key water parameters',
      'Pathogen identification (parasitic, bacterial, fungal, or environmental)',
      'Hospital tank isolation guidance and dosage schedules',
      'Follow-up review on WhatsApp until fish recovers'
    ],
    idealFor: 'Sudden fish illness, mystery deaths, cloudy water crises, or tank cycling stalls.',
    active: true
  },
  {
    id: 'corporate-amc-maintenance',
    name: 'Corporate & Commercial Aquarium AMC Contracts',
    slug: 'corporate-amc-maintenance',
    shortDescription: 'Hassle-free Annual Maintenance Contracts (AMC) for offices, luxury hotels, clinics, and restaurants.',
    fullDescription: 'A magnificent aquarium in your corporate lobby creates a calm, prestigious atmosphere for clients and staff. With our Annual Maintenance Contract, we handle all feeding, cleaning, equipment monitoring, livestock health checks, and emergency callouts with guaranteed 4-hour response.',
    iconName: 'Building2',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    startingPrice: 4499,
    durationEstimate: 'Monthly / Quarterly / Annual Contract',
    includes: [
      'Weekly scheduled maintenance visits by uniformed certified technicians',
      'Automatic feeder calibration and premium food supply included',
      'Replacement filter media, carbon, and conditioners included',
      '24/7 priority emergency response for filter failure or leaks',
      'Free livestock replacement under maintenance guarantee',
      'Monthly executive parameter and wellness reporting'
    ],
    idealFor: 'Corporate headquarters, boutique hotel lobbies, private medical clinics, and upscale dining.',
    active: true
  }
];
