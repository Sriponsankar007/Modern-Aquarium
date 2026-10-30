import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Sparkles, ShieldCheck, Waves, Wrench } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { generateStoreChatUrl } from '../../lib/whatsapp';

interface Slide {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryLink: string;
  primaryCta: string;
  secondaryCta: string;
  isWhatsAppSecondary?: boolean;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 'slide-koi',
    tag: 'Living Aquatic Masterpieces',
    title: 'Champion Niigata Koi &',
    highlight: 'Living Showroom Art',
    description: 'Hand-graded Kohaku, Sanke, Showa, and Butterfly Koi conditioned for peak vitality, pattern symmetry, and pristine pond health.',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44a0ec8?auto=format&fit=crop&w=1600&q=85',
    primaryLink: '/category/koi',
    primaryCta: 'Explore Koi Collection',
    secondaryCta: 'Request Live Video on WhatsApp',
    isWhatsAppSecondary: true,
  },
  {
    id: 'slide-betta',
    tag: 'Show-Grade Bloodlines',
    title: 'Galaxy Nemo Bettas &',
    highlight: 'Purebred Guppies',
    description: 'Full 180-degree Halfmoons, Plakats, Dumbo Ears, and Moscow Blues thoroughly quarantined, parasite-free, and conditioned to thrive.',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1600&q=85',
    primaryLink: '/category/freshwater-fish',
    primaryCta: 'Shop Freshwater Rarities',
    secondaryCta: 'Browse Full Catalog',
    isWhatsAppSecondary: false,
  },
  {
    id: 'slide-tanks',
    tag: 'Aquascaping & Clear Vision',
    title: 'Opti-White Rimless Tanks &',
    highlight: 'Live Flora Aquascaping',
    description: 'Ultra-clear low-iron glass aquariums, nutrient-rich volcanic aqua soils, and pest-free in-vitro tissue culture plants.',
    image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=1600&q=85',
    primaryLink: '/category/aquariums-tanks',
    primaryCta: 'Discover Tanks & Flora',
    secondaryCta: 'Custom Consultation',
    isWhatsAppSecondary: false,
  },
  {
    id: 'slide-services',
    tag: 'White-Glove Care & Setup',
    title: 'Custom Installations &',
    highlight: 'Bi-Weekly Maintenance',
    description: 'Turnkey residential and corporate aquariums, water parameter balancing, algae remediation, and professional health visits.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85',
    primaryLink: '/services',
    primaryCta: 'View Setup Services',
    secondaryCta: 'Chat With Specialist',
    isWhatsAppSecondary: true,
  },
];

export const HeroCarousel: React.FC = () => {
  const { settings } = useShop();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chatUrl = generateStoreChatUrl(settings).url || '#';

  // Auto-play interval (5.5s)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Image with adaptive Light & Dark contrast treatments */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-center transform transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Adaptive Theme Gradient Overlays */}
                {/* 1. Light Mode Overlay: Soft atmospheric veil with high-contrast text backing */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-slate-50/40 dark:hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent opacity-90 dark:hidden" />

                {/* 2. Dark Mode Overlay: Deep oceanic obsidian with vibrant glowing accents */}
                <div className="absolute inset-0 hidden dark:block bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30" />
                <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
              </div>

              {/* Slide Content Overlay */}
              <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-16 sm:py-20">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-cyan-100/90 text-cyan-800 border border-cyan-300 dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-800/80 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
                    {slide.title}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500 dark:from-cyan-400 dark:to-teal-300">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  {/* Call to Actions */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <Link
                      to={slide.primaryLink}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{slide.primaryCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {slide.isWhatsAppSecondary ? (
                      <a
                        href={chatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-white dark:border-slate-700/80 font-semibold text-xs transition-colors backdrop-blur-sm shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{slide.secondaryCta}</span>
                      </a>
                    ) : (
                      <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-white dark:border-slate-700/80 font-semibold text-xs transition-colors backdrop-blur-sm shadow-xs"
                      >
                        <span>{slide.secondaryCta}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Controls */}
      <div className="absolute z-30 bottom-6 right-4 sm:right-8 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 shadow-md backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Indicators (Pills) */}
      <div className="absolute z-30 bottom-6 left-4 sm:left-8 flex items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIdx(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIdx
                ? 'w-8 bg-cyan-600 dark:bg-cyan-400'
                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
