import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { AquariumHero3D } from '../components/aquarium-3d/AquariumHero3D';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { ProductCard } from '../components/products/ProductCard';
import { CustomerGallerySection } from '../components/home/CustomerGallerySection';
import { generateStoreChatUrl } from '../lib/whatsapp';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Wrench,
  CheckCircle,
  MessageCircle,
  Sparkles,
  Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, categories, services, settings } = useShop();
  const [heroView, setHeroView] = React.useState<'carousel' | '3d'>('carousel');

  const featuredFreshwater = products
    .filter((p) => p.categoryId === 'freshwater-fish' && p.active)
    .slice(0, 4);

  const bettaAndGuppies = products
    .filter((p) => (p.subcategoryId === 'betta' || p.subcategoryId === 'guppy') && p.active)
    .slice(0, 4);

  const koiProducts = products
    .filter((p) => p.categoryId === 'koi' && p.active)
    .slice(0, 4);

  const aquariumsAndPlants = products
    .filter((p) => (p.categoryId === 'aquariums-tanks' || p.categoryId === 'plants') && p.active)
    .slice(0, 4);

  const birdCollection = products
    .filter((p) => p.categoryId === 'birds' && p.active)
    .slice(0, 4);

  const chatUrl = generateStoreChatUrl(settings).url || '#';

  const visibleCategories = categories.filter((c) => {
    if (c.id === 'marine-fish' && !settings.enableMarineCategory) return false;
    return c.active;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero Showcase Switcher & Display */}
      <div className="relative">
        {heroView === 'carousel' ? <HeroCarousel /> : <AquariumHero3D />}

        {/* Floating View Switcher Pill */}
        <div className="absolute top-4 right-4 z-30">
          <div className="flex items-center gap-1 p-1 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg backdrop-blur-md text-[11px] font-semibold">
            <button
              onClick={() => setHeroView('carousel')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                heroView === 'carousel'
                  ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Showcase</span>
            </button>
            <button
              onClick={() => setHeroView('3d')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                heroView === '3d'
                  ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>3D Tank</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Shop by Category Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
              <span>Living Showroom</span>
              <span aria-hidden="true">·</span>
              <span>17 Curated Departments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Explore Our Specialist Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors self-start md:self-auto"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {visibleCategories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/60 dark:hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 dark:opacity-90" />
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 flex-1 flex flex-col justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                  View varieties →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Freshwater Fish */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 dark:border-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
              Freshwater Rarities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured Freshwater Species
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Quarantined, active, and conditioned to thrive in community and biotope aquariums.
            </p>
          </div>
          <Link
            to="/category/freshwater-fish"
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 inline-flex items-center gap-1"
          >
            <span>View All Freshwater ({products.filter((p) => p.categoryId === 'freshwater-fish').length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredFreshwater.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Popular Betta & Guppy Morphs Highlight */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl my-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
              Show-Grade Bloodlines
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Betta Morphs &amp; Purebred Guppies
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Halfmoons, Plakats, Dumbo Ears, Moscow Blues, and true-breeding livebearer colonies.
            </p>
          </div>
          <Link
            to="/shop?category=freshwater-fish"
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 inline-flex items-center gap-1"
          >
            <span>Shop Bettas &amp; Guppies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bettaAndGuppies.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Japanese Koi Collection */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 dark:border-slate-900">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-100 via-cyan-50/60 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-cyan-950/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 mb-8 shadow-xs">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 block mb-2">
              Japanese Nishikigoi Showroom
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Champion Niigata Koi Bloodlines
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Kohaku, Taisho Sanke, Showa Sanshoku, Ogon, and Longfin Butterfly Koi. Hand-graded for pattern symmetry, skin luster, and vigorous pond vitality.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/category/koi"
                className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                Explore Koi Collection
              </Link>
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
              >
                Request Video on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {koiProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Rimless Tanks & Aquascaping Plants */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 dark:border-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
              Aquascaping &amp; Clear Vision
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Opti-White Aquariums &amp; Live Flora
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Ultra-clear low-iron glass tanks, nutrient aqua soils, and in-vitro tissue culture plants.
            </p>
          </div>
          <Link
            to="/category/aquariums-tanks"
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 inline-flex items-center gap-1"
          >
            <span>View All Tanks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aquariumsAndPlants.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Birds & Avian Nutrition (STORE PICKUP ONLY HIGHLIGHT) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 dark:border-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <span>Avian Companions</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-700 dark:text-amber-300 font-bold">Store Pickup Only</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Ornamental Birds &amp; Aviary Care
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Lovebirds, Cockatiels, Budgies, flight cages, and premium avian nutrition. All live birds must be personally collected from our Chennai showroom.
            </p>
          </div>
          <Link
            to="/category/birds"
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 inline-flex items-center gap-1"
          >
            <span>View Avian Department</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {birdCollection.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Professional Aquarium Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 dark:border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-2">
            White-Glove Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certified Aquarium Installation &amp; Maintenance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            From luxury custom installations and bi-weekly water maintenance to emergency algae eradication and fish health consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((srv) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-cyan-500/50 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-center text-cyan-700 dark:text-cyan-400 mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{srv.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {srv.shortDescription}
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-6">
                  {srv.includes.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Starting from</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    ₹{srv.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <Link
                  to={`/service/${srv.slug}`}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs transition-colors shadow-xs"
                >
                  Book Service
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/services"
            className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 inline-flex items-center gap-1"
          >
            <span>Explore all 7 professional maintenance services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Customer Gallery & Testimonials (Real Tanks Set Up by Shop) */}
      <CustomerGallerySection />

      {/* 9. Why Shop With Us Pillars */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl my-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">14-Day Quarantine</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every freshwater and marine fish is conditioned in medical-grade quarantine tanks before dispatch.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Live WhatsApp Video</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Request live video of your selected fish flaring and feeding before approving your delivery.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero-Loss Guarantee</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Oxygen-injected thermal insulation packaging ensures 100% live arrival on all approved shipments.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pest-Free Guarantee</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tissue culture aquatic plants and dipped rootwood ensure no unwanted snails or nuisance algae.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Store Location & Pickup Information */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Visit Our Flagship Showroom
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Experience the Living Aquatic Gallery in Person
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {settings.address}. Open 7 days a week from {settings.storeTiming}. Bring a sample of your aquarium water for free master parameter testing on any visit!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-xs"
            >
              Get Showroom Directions
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-medium text-xs text-center border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
            >
              Contact Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
