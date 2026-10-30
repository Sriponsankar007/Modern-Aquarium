import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { formatMoney } from '../../lib/whatsapp';
import { Product, Category, ServiceItem } from '../../types';
import {
  Search,
  X,
  Fish,
  Grid,
  Wrench,
  ArrowRight,
  Sparkles,
  Tag,
  CornerDownLeft,
} from 'lucide-react';

interface SearchBarProps {
  className?: string;
  variant?: 'header' | 'hero' | 'compact';
  autoFocus?: boolean;
  onSelect?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  autoFocus = false,
  onSelect,
}) => {
  const { products, categories, services, settings } = useShop();
  const [searchVal, setSearchVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const query = searchVal.trim().toLowerCase();

  // Create an indexed category & subcategory lookup for rapid real-time matching
  const categoryMap = useMemo(() => {
    const map = new Map<string, { name: string; slug: string; subcategories: Map<string, string> }>();
    categories.forEach((cat) => {
      const subMap = new Map<string, string>();
      cat.subcategories?.forEach((sub) => subMap.set(sub.id, sub.name));
      map.set(cat.id, { name: cat.name, slug: cat.slug, subcategories: subMap });
    });
    return map;
  }, [categories]);

  // 1. Real-time Product Filtering matching against product name, category name, subcategory name, tags, and sku
  const matchedProducts: { product: Product; categoryName: string; matchReason: string }[] = useMemo(() => {
    if (query.length < 1) return [];

    const matches: { product: Product; categoryName: string; matchReason: string }[] = [];

    for (const p of products) {
      if (!p.active) continue;
      const catInfo = categoryMap.get(p.categoryId);
      const categoryName = catInfo?.name || p.categoryId;
      const categoryLower = categoryName.toLowerCase();
      const subcategoryName = (p.subcategoryId && catInfo?.subcategories.get(p.subcategoryId)) || '';
      const subcategoryLower = subcategoryName.toLowerCase();
      const nameLower = p.name.toLowerCase();

      let reason = '';
      if (nameLower.includes(query)) {
        reason = 'name';
      } else if (categoryLower.includes(query)) {
        reason = `category: ${categoryName}`;
      } else if (subcategoryLower.includes(query)) {
        reason = `subcategory: ${subcategoryName}`;
      } else if (p.variety?.toLowerCase().includes(query)) {
        reason = `variety: ${p.variety}`;
      } else if (p.scientificName?.toLowerCase().includes(query)) {
        reason = 'species';
      } else if (p.tags.some((t) => t.toLowerCase().includes(query))) {
        reason = 'tag';
      } else if (p.sku.toLowerCase().includes(query)) {
        reason = 'sku';
      }

      if (reason) {
        matches.push({ product: p, categoryName, matchReason: reason });
        if (matches.length >= 6) break;
      }
    }

    return matches;
  }, [products, query, categoryMap]);

  // 2. Real-time Category Filtering
  const matchedCategories: Category[] = useMemo(() => {
    if (query.length < 1) return [];

    return categories
      .filter((c) => {
        if (c.id === 'marine-fish' && !settings.enableMarineCategory) return false;
        if (!c.active) return false;
        return (
          c.name.toLowerCase().includes(query) ||
          c.slug.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.subcategories?.some((s) => s.name.toLowerCase().includes(query) || s.slug.toLowerCase().includes(query))
        );
      })
      .slice(0, 3);
  }, [categories, query, settings.enableMarineCategory]);

  // 3. Real-time Services Filtering
  const matchedServices: ServiceItem[] = useMemo(() => {
    if (query.length < 1) return [];

    return services
      .filter((s) => {
        if (!s.active) return false;
        return (
          s.name.toLowerCase().includes(query) ||
          s.shortDescription.toLowerCase().includes(query) ||
          s.fullDescription.toLowerCase().includes(query) ||
          s.slug.toLowerCase().includes(query) ||
          s.idealFor?.toLowerCase().includes(query) ||
          s.includes?.some((d) => d.toLowerCase().includes(query))
        );
      })
      .slice(0, 3);
  }, [services, query]);

  const totalResults = matchedCategories.length + matchedProducts.length + matchedServices.length;

  // Flatten items for keyboard navigation
  const flatItems = useMemo(() => {
    const items: { type: 'category' | 'product' | 'service'; slug: string }[] = [];
    matchedCategories.forEach((c) => items.push({ type: 'category', slug: c.slug }));
    matchedProducts.forEach((p) => items.push({ type: 'product', slug: p.product.slug }));
    matchedServices.forEach((s) => items.push({ type: 'service', slug: s.slug }));
    return items;
  }, [matchedCategories, matchedProducts, matchedServices]);

  // Handle clicking outside to dismiss
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Global keyboard shortcuts (Slash key to focus search)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Keyboard navigation within suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      setSelectedIndex((prev) => (prev < flatItems.length - 1 ? prev + 1 : 0));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatItems.length - 1));
      return;
    }

    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < flatItems.length) {
        e.preventDefault();
        const selected = flatItems[selectedIndex];
        if (selected.type === 'category') handleSelectCategory(selected.slug);
        else if (selected.type === 'product') handleSelectProduct(selected.slug);
        else if (selected.type === 'service') handleSelectService(selected.slug);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setIsOpen(false);
      onSelect?.();
    }
  };

  const handleClear = () => {
    setSearchVal('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSelectProduct = useCallback(
    (slug: string) => {
      navigate(`/product/${slug}`);
      setIsOpen(false);
      setSearchVal('');
      setSelectedIndex(-1);
      onSelect?.();
    },
    [navigate, onSelect]
  );

  const handleSelectCategory = useCallback(
    (slug: string) => {
      navigate(`/category/${slug}`);
      setIsOpen(false);
      setSearchVal('');
      setSelectedIndex(-1);
      onSelect?.();
    },
    [navigate, onSelect]
  );

  const handleSelectService = useCallback(
    (slug: string) => {
      navigate(`/service/${slug}`);
      setIsOpen(false);
      setSearchVal('');
      setSelectedIndex(-1);
      onSelect?.();
    },
    [navigate, onSelect]
  );

  const popularSearches = [
    { label: 'Japanese Koi', query: 'Koi' },
    { label: 'Betta Fish', query: 'Betta' },
    { label: 'Rimless Tanks', query: 'Tanks' },
    { label: 'Maintenance', query: 'Maintenance' },
    { label: 'Canister Filters', query: 'Canister' },
    { label: 'Live Plants', query: 'Plants' },
  ];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={searchVal}
          autoFocus={autoFocus}
          onChange={(e) => {
            setSearchVal(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search fish, tanks, plants, categories, services..."
          className="w-full pl-9 pr-14 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-cyan-500 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
          aria-label="Global search across products, categories, and services"
        />

        {/* Search Icon */}
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />

        {/* Right Action Icons: Keyboard Shortcut Hint & Clear */}
        <div className="absolute right-2.5 top-2 flex items-center gap-1">
          {searchVal ? (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Clear search text"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-200/70 dark:bg-slate-800/80 rounded border border-slate-300 dark:border-slate-700 select-none">
              /
            </kbd>
          )}
        </div>
      </form>

      {/* Real-time Search Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 md:w-[460px] max-w-[94vw] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 text-xs">
          {query.length === 0 ? (
            // Prompt / Quick Suggestions
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Popular Showroom Searches</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Press / to focus</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularSearches.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setSearchVal(item.query);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 dark:bg-slate-800 dark:hover:bg-cyan-950/60 dark:hover:text-cyan-300 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Tag className="w-3 h-3 opacity-60" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            // Empty State
            <div className="p-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                No matches found for &quot;{searchVal}&quot;
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Try searching for category terms like <em>Koi</em>, <em>Freshwater</em>, <em>Tanks</em>, or <em>Maintenance</em>.
              </p>
            </div>
          ) : (
            // Matching Results Sections
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {/* Category / Department Matches */}
              {matchedCategories.length > 0 && (
                <div className="p-2 bg-slate-50/70 dark:bg-slate-950/40">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                    <Grid className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span>Categories &amp; Departments ({matchedCategories.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedCategories.map((cat, idx) => {
                      const isHighlighted = selectedIndex === idx;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategory(cat.slug)}
                          className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors group cursor-pointer ${
                            isHighlighted
                              ? 'bg-cyan-50 dark:bg-cyan-950/60 ring-1 ring-cyan-500'
                              : 'hover:bg-white dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-8 h-8 rounded-lg object-cover bg-slate-200 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-800"
                            />
                            <div className="truncate">
                              <span className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                                {cat.name}
                              </span>
                              <span className="text-[10px] text-slate-500 block truncate">
                                {cat.description}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0 ml-2">
                            <span className="hidden sm:inline">Explore Category</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Product Matches */}
              {matchedProducts.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Fish className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      <span>Products &amp; Livestock ({matchedProducts.length})</span>
                    </div>
                    <span className="text-[9px] font-normal text-slate-400">Matches Name &amp; Category</span>
                  </div>
                  <div className="space-y-1">
                    {matchedProducts.map((item, idx) => {
                      const itemIndex = matchedCategories.length + idx;
                      const isHighlighted = selectedIndex === itemIndex;
                      const p = item.product;

                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectProduct(p.slug)}
                          className={`w-full text-left p-2 rounded-xl flex items-center gap-3 transition-colors group cursor-pointer ${
                            isHighlighted
                              ? 'bg-cyan-50 dark:bg-cyan-950/60 ring-1 ring-cyan-500'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg bg-slate-100 dark:bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                              {p.name}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 rounded text-[10px] text-slate-600 dark:text-slate-300 font-medium">
                                {item.categoryName}
                              </span>
                              {p.variety && <span>{p.variety}</span>}
                              <span className="font-bold text-cyan-600 dark:text-cyan-400 ml-auto">
                                {formatMoney(p.price, settings.currencySymbol)}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Service Matches */}
              {matchedServices.length > 0 && (
                <div className="p-2 bg-slate-50/70 dark:bg-slate-950/40">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                    <span>Specialist Services &amp; Maintenance ({matchedServices.length})</span>
                  </div>
                  <div className="space-y-1">
                    {matchedServices.map((srv, idx) => {
                      const itemIndex = matchedCategories.length + matchedProducts.length + idx;
                      const isHighlighted = selectedIndex === itemIndex;

                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => handleSelectService(srv.slug)}
                          className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors group cursor-pointer ${
                            isHighlighted
                              ? 'bg-cyan-50 dark:bg-cyan-950/60 ring-1 ring-cyan-500'
                              : 'hover:bg-white dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className="min-w-0 flex-1 mr-2">
                            <p className="font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 truncate">
                              {srv.name}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {srv.shortDescription}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 block">
                              {formatMoney(srv.startingPrice, settings.currencySymbol)}
                            </span>
                            <span className="text-[9px] text-slate-400">starting price</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Footer Action */}
              <div className="p-2.5 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <CornerDownLeft className="w-3 h-3" />
                  <span>Press Enter to view catalog</span>
                </span>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="py-1 px-2.5 rounded-lg text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View all matching results ({totalResults})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
