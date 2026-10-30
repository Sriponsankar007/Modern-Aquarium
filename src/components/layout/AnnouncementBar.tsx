import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { MapPin, Clock, Phone, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CAROUSEL_MESSAGES = [
  {
    icon: Sparkles,
    highlight: 'New Showroom Arrivals:',
    text: 'Quarantined Niigata Koi, Galaxy Nemo Bettas & Live Planted Flora',
  },
  {
    icon: Truck,
    highlight: 'Express Doorstep Delivery:',
    text: 'Insulated live-arrival guaranteed delivery across Chennai & Tamil Nadu',
  },
  {
    icon: ShieldCheck,
    highlight: 'Live Video Proof:',
    text: 'Inspect active fish behavior & coloration on WhatsApp prior to dispatch',
  },
];

export const AnnouncementBar: React.FC = () => {
  const { settings } = useShop();
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-rotate announcement carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CAROUSEL_MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + CAROUSEL_MESSAGES.length) % CAROUSEL_MESSAGES.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % CAROUSEL_MESSAGES.length);
  };

  const activeMsg = CAROUSEL_MESSAGES[currentIdx];
  const IconComp = activeMsg.icon;

  return (
    <div className="w-full max-w-full overflow-hidden bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 text-xs py-1.5 px-3 sm:px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 w-full min-w-0">
        {/* Left: Interactive Announcement Carousel */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Next announcement"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <IconComp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <div className="truncate text-[11px] sm:text-xs">
              <strong className="text-slate-900 dark:text-white font-semibold mr-1.5 whitespace-nowrap">
                {activeMsg.highlight}
              </strong>
              <span className="text-slate-600 dark:text-slate-300">
                {activeMsg.text}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Store Hours & Contact Info (Responsive layout) */}
        <div className="flex items-center gap-3 sm:gap-4 text-slate-600 dark:text-slate-400 text-[11px] shrink-0">
          <div className="hidden lg:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>{settings.storeTiming}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Chennai Showroom</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-slate-900 dark:text-slate-200 font-medium">{settings.phoneDisplay}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
