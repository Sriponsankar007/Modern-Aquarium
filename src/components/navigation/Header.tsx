import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { generateStoreChatUrl } from '../../lib/whatsapp';
import {
  ShoppingCart,
  Menu,
  X,
  Fish,
  Wrench,
  MessageCircle,
  Clock,
  Search,
  ChevronRight
} from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { SearchBar } from './SearchBar';
import { NavCarousel } from './NavCarousel';

export const Header: React.FC = () => {
  const { categories, settings, cartCount, setIsCartOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logoTapCountRef = useRef(0);
  const logoTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Discreet Admin Gateway: Triple-click / triple-tap on the logo emblem opens /admin
  const handleLogoEmblemClick = (e: React.MouseEvent) => {
    logoTapCountRef.current += 1;
    if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current);

    if (logoTapCountRef.current >= 3) {
      e.preventDefault();
      e.stopPropagation();
      logoTapCountRef.current = 0;
      navigate('/admin');
      return;
    }

    logoTapTimerRef.current = setTimeout(() => {
      logoTapCountRef.current = 0;
    }, 1200);
  };

  // Discreet Admin Gateway: Secret keyboard hotkey (Ctrl + Shift + A or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Close mobile menus on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const chatUrl = generateStoreChatUrl(settings).url || '#';

  const visibleCategories = categories.filter((c) => {
    if (c.id === 'marine-fish' && !settings.enableMarineCategory) {
      return false;
    }
    return c.active;
  });

  const isActiveRoute = (path: string) => {
    if (path === '/shop') return location.pathname === '/shop';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 md:gap-8 w-full min-w-0">
          
          {/* ZONE 1: BRAND WORDMARK (Single text element with emblem, zero pill clutter) */}
          <Link
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
            aria-label="Modern Aquarium Home"
          >
            <div
              onClick={handleLogoEmblemClick}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center text-slate-950 shadow-sm shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200 shrink-0 cursor-pointer"
              title="Modern Aquarium"
            >
              <Fish className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
            </div>
            <span className="text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
              MODERN<span className="text-cyan-600 dark:text-cyan-400 ml-1">AQUARIUM</span>
            </span>
          </Link>

          {/* ZONE 2: PROMINENT REAL-TIME GLOBAL SEARCH (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-3 sm:mx-6 min-w-0">
            <SearchBar className="w-full" />
          </div>

          {/* ZONE 3: BALANCED ACTION CLUSTER */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">

            {/* Mobile Search Icon Button (Never squishes header layout) */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500"
              aria-label="Toggle search input"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Track Orders / Account */}
            <Link
              to="/account"
              className={`hidden sm:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                location.pathname === '/account' ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400' : ''
              }`}
              title="Track Orders & Account"
              aria-label="Track Orders"
            >
              <Clock className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="hidden xl:inline text-xs font-semibold">Orders</span>
            </Link>

            {/* Persistent Theme Toggle */}
            <ThemeToggle />

            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500"
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-cyan-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* WhatsApp Quick Concierge Action */}
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors active:scale-95 whitespace-nowrap shrink-0"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* SECONDARY NAVIGATION: SMOOTH INTERACTIVE CAROUSEL */}
      <NavCarousel />

      {/* Mobile Slide-Down Search Input */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 px-4 py-3 shadow-inner animate-in slide-in-from-top-1 duration-150">
          <div className="relative">
            <SearchBar
              className="w-full"
              autoFocus
              onSelect={() => setMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-4 pb-8 space-y-4 max-h-[82vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {/* Mobile In-Drawer Search */}
          <div>
            <SearchBar className="w-full" onSelect={() => setMobileMenuOpen(false)} />
          </div>

          {/* Theme Switcher Segmented Control */}
          <div className="pb-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Appearance Theme
            </div>
            <ThemeToggle variant="segmented" />
          </div>

          {/* Primary Mobile Navigation Links */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-between group"
            >
              <span>All Products</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500" />
            </Link>
            <Link
              to="/category/freshwater-fish"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-between group"
            >
              <span>Freshwater Fish</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500" />
            </Link>
            <Link
              to="/category/koi"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-between group"
            >
              <span>Japanese Koi</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500" />
            </Link>
            <Link
              to="/category/aquariums-tanks"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-between group"
            >
              <span>Planted Tanks</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500" />
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-cyan-600 dark:text-cyan-400 flex items-center justify-between group"
            >
              <div className="flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Services</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
            </Link>
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-between group"
            >
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Track Orders</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500" />
            </Link>
          </div>

          {/* All Departments Grid */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Browse All Departments ({visibleCategories.length})
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {visibleCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 truncate flex items-center justify-between"
                >
                  <span className="truncate">{cat.name}</span>
                  {cat.id === 'birds' && (
                    <span className="text-[8px] text-amber-700 dark:text-amber-400 ml-1 shrink-0">Pickup</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile WhatsApp Concierge Direct Button */}
          <div className="pt-2">
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
