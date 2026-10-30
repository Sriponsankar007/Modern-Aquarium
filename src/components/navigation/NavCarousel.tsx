import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Fish,
  Wrench,
  Clock,
  Sparkles,
  Compass,
  Award,
  Waves
} from 'lucide-react';

interface NavItem {
  id: string;
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

export const NavCarousel: React.FC = () => {
  const { categories, settings } = useShop();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const visibleCategories = categories.filter((c) => {
    if (c.id === 'marine-fish' && !settings.enableMarineCategory) {
      return false;
    }
    return c.active;
  });

  // Construct comprehensive, curated carousel navigation items
  const navItems: NavItem[] = [
    {
      id: 'all-catalog',
      name: 'All Showroom',
      path: '/shop',
      icon: LayoutGrid,
      highlight: true
    },
    {
      id: 'freshwater-fish',
      name: 'Freshwater Fish',
      path: '/category/freshwater-fish',
      icon: Fish,
      badge: 'Popular',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    },
    {
      id: 'koi',
      name: 'Japanese Koi',
      path: '/category/koi',
      icon: Sparkles,
      badge: 'Niigata',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
    },
    {
      id: 'aquariums-tanks',
      name: 'Planted Tanks',
      path: '/category/aquariums-tanks',
      icon: Waves
    },
    {
      id: 'services',
      name: 'Aquascaping & Setup',
      path: '/services',
      icon: Wrench,
      badge: 'Expert',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20'
    },
    // Append remaining categories seamlessly
    ...visibleCategories
      .filter((c) => !['freshwater-fish', 'koi', 'aquariums-tanks'].includes(c.id))
      .map((c) => ({
        id: c.id,
        name: c.name,
        path: `/category/${c.slug}`,
        badge: c.id === 'birds' ? 'Pickup Only' : undefined,
        badgeColor: c.id === 'birds' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : undefined
      })),
    {
      id: 'account-orders',
      name: 'Track Orders',
      path: '/account',
      icon: Clock
    },
    {
      id: 'about',
      name: 'Showroom Story',
      path: '/about',
      icon: Compass
    },
    {
      id: 'contact',
      name: 'Contact & Visit',
      path: '/contact',
      icon: Award
    }
  ];

  // Update scroll boundary states
  const checkScrollBounds = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollBounds();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);

    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds, visibleCategories]);

  // Center active item smoothly on route changes
  useEffect(() => {
    if (activeItemRef.current && scrollContainerRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
    // Re-check bounds after layout settles
    const timer = setTimeout(checkScrollBounds, 350);
    return () => clearTimeout(timer);
  }, [location.pathname, checkScrollBounds]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.65, 260);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Mouse Drag-To-Scroll interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.4; // Scroll multiplier
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    el.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  const isActive = (itemPath: string) => {
    if (itemPath === '/shop') return location.pathname === '/shop';
    if (itemPath === '/') return location.pathname === '/';
    return location.pathname === itemPath || (itemPath !== '/' && location.pathname.startsWith(itemPath));
  };

  return (
    <div className="relative w-full border-t border-slate-200/70 dark:border-slate-800/70 bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative flex items-center">
        
        {/* Left Carousel Navigation Button */}
        <div
          className={`absolute left-0 z-20 flex items-center h-full pl-1 sm:pl-2 pointer-events-none transition-opacity duration-200 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-50 dark:from-slate-900 via-slate-50/80 dark:via-slate-900/80 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left in navigation carousel"
            className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Scroll Track */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`no-scrollbar flex items-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-4 sm:px-8 overflow-x-auto select-none scroll-smooth w-full ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                ref={active ? activeItemRef : null}
                to={item.path}
                onClick={(e) => {
                  if (hasDragged) {
                    e.preventDefault();
                  }
                }}
                className={`group shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap border ${
                  active
                    ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 border-cyan-500 shadow-sm shadow-cyan-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-xs'
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110 shrink-0 ${
                      active
                        ? 'text-white dark:text-slate-950'
                        : 'text-cyan-600 dark:text-cyan-400'
                    }`}
                  />
                )}
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${
                      active
                        ? 'bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950 border-transparent'
                        : item.badgeColor || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Carousel Navigation Button */}
        <div
          className={`absolute right-0 z-20 flex items-center h-full pr-1 sm:pl-2 pointer-events-none transition-opacity duration-200 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-50 dark:from-slate-900 via-slate-50/80 dark:via-slate-900/80 to-transparent pointer-events-none" />
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right in navigation carousel"
            className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
