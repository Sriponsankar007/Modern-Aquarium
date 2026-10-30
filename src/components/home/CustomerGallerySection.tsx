import React, { useState } from 'react';
import { customerSetups } from '../../data/customerSetups';
import { CustomerSetupGalleryItem } from '../../types';
import { useShop } from '../../context/ShopContext';
import { generateStoreChatUrl } from '../../lib/whatsapp';
import {
  Sparkles,
  MapPin,
  Calendar,
  Star,
  Maximize2,
  X,
  MessageCircle,
  CheckCircle,
  Eye,
  Layers,
  Fish,
  Compass
} from 'lucide-react';

export const CustomerGallerySection: React.FC = () => {
  const { settings } = useShop();
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [activeSetup, setActiveSetup] = useState<CustomerSetupGalleryItem | null>(null);

  const styles = [
    { id: 'all', label: 'All Showcases' },
    { id: 'Nature Aquarium', label: 'Nature Aquascapes' },
    { id: 'Iwagumi Scape', label: 'Iwagumi Stone' },
    { id: 'Reef Marine', label: 'Reef Marine' },
    { id: 'Koi Pond', label: 'Koi Ponds' },
    { id: 'Biotope', label: 'Bespoke Biotopes' }
  ];

  const filteredSetups = filterStyle === 'all'
    ? customerSetups
    : customerSetups.filter((s) => s.tankStyle === filterStyle);

  const handleInquireAboutSetup = (setup: CustomerSetupGalleryItem) => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `👋 Hello Modern Aquarium Team,\n`;
    text += `I saw your customer setup *"${setup.title}"* on your website and would love to consult about a similar aquarium for my space!\n\n`;
    text += `📐 *Style:* ${setup.tankStyle} (${setup.dimensions})\n`;
    text += `💧 *Volume:* ~${setup.volumeLiters} Liters\n`;
    text += `📍 Please let me know how we can schedule an on-site consultation. Thank you!`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200 dark:border-slate-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom Portfolio &amp; Reviews</span>
            <span aria-hidden="true">·</span>
            <span>Client Aquascapes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client Tanks Installed by Modern Aquarium
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Explore authentic living aquariums installed and maintained across residential estates, luxury penthouses, and corporate spaces.
          </p>
        </div>

        {/* Style Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterStyle(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStyle === s.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSetups.map((setup) => (
          <div
            key={setup.id}
            onClick={() => setActiveSetup(setup)}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-2xl hover:shadow-cyan-950/10 dark:hover:shadow-cyan-950/20 flex flex-col justify-between"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={setup.image}
                  alt={setup.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Style Badge */}
                <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-700/60 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                  {setup.tankStyle}
                </div>

                {/* Expand Hint */}
                <div className="absolute bottom-3 right-3 bg-slate-900/90 p-1.5 rounded-lg text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {setup.title}
                </h3>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                    <MapPin className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span>{setup.clientLocation}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{setup.dimensions}</span>
                </div>

                {/* Authentic Testimonial Quote */}
                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed line-clamp-3 bg-slate-50 dark:bg-slate-950/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
                  &ldquo;{setup.clientReview}&rdquo;
                </p>
              </div>
            </div>

            {/* Card Footer: Client Info & Star Rating */}
            <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{setup.clientName}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{setup.dateCompleted}</p>
              </div>

              <div className="flex items-center gap-0.5 text-amber-500 dark:text-amber-400">
                {[...Array(setup.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Detailed Setup Breakdown */}
      {activeSetup && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] max-h-[380px] w-full overflow-hidden bg-slate-950">
              <img
                src={activeSetup.image}
                alt={activeSetup.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/60" />

              <button
                onClick={() => setActiveSetup(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-md">
                  {activeSetup.tankStyle}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1 drop-shadow-md">
                  {activeSetup.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Client Testimonial Callout */}
              <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{activeSetup.clientName}</span>
                    <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{activeSetup.clientLocation}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 dark:text-amber-400">
                    {[...Array(activeSetup.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 italic leading-relaxed">
                  &ldquo;{activeSetup.clientReview}&rdquo;
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                    Dimensions &amp; Volume
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">{activeSetup.dimensions}</p>
                  <p className="text-cyan-600 dark:text-cyan-400">Approx. {activeSetup.volumeLiters} Liters Capacity</p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                    Filtration &amp; Lighting
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">{activeSetup.equipmentSummary}</p>
                </div>
              </div>

              {/* Flora & Fauna Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Aquatic Plants &amp; Hardscape:</span>
                  </h4>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {activeSetup.plantsUsed.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <Fish className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Livestock &amp; Clean-Up Crew:</span>
                  </h4>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {activeSetup.fishStocked.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Completed in {activeSetup.dateCompleted} by Modern Aquarium Master Scapers
                </span>

                <button
                  onClick={() => handleInquireAboutSetup(activeSetup)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 dark:shadow-emerald-950/40 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Similar Custom Setup on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
