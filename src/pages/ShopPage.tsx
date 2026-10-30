import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';
import { formatMoney } from '../lib/whatsapp';
import {
  SlidersHorizontal,
  Search,
  X,
  ChevronRight,
  Filter,
  RotateCcw
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, categories, settings } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Parameters
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [priceMax, setPriceMax] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [difficulty, setDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Update URL on search change
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory('all');
    const params = new URLSearchParams(searchParams);
    if (catId !== 'all') {
      params.set('category', catId);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setPriceMax(50000);
    setInStockOnly(false);
    setDifficulty('all');
    setSortBy('featured');
    setSearchParams({});
  };

  // Subcategories for current selected category
  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);
  const availableSubcategories = currentCategoryObj?.subcategories || [];

  // Keep query in sync with URL parameter
  useEffect(() => {
    const s = searchParams.get('search') || '';
    setQuery(s);
  }, [searchParams]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.active);

    // Hide marine if disabled
    if (!settings.enableMarineCategory) {
      result = result.filter((p) => p.categoryId !== 'marine-fish');
    }

    // Search query matching against product names and categories in real-time
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) => {
        const catObj = categories.find((c) => c.id === p.categoryId);
        const catName = catObj?.name.toLowerCase() || '';
        const subName = (p.subcategoryId && catObj?.subcategories?.find((s) => s.id === p.subcategoryId)?.name.toLowerCase()) || '';
        return (
          p.name.toLowerCase().includes(q) ||
          catName.includes(q) ||
          subName.includes(q) ||
          p.categoryId.toLowerCase().includes(q) ||
          p.variety?.toLowerCase().includes(q) ||
          p.scientificName?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // Subcategory
    if (selectedSubcategory !== 'all') {
      result = result.filter((p) => p.subcategoryId === selectedSubcategory);
    }

    // Price Max
    result = result.filter((p) => p.price <= priceMax);

    // In Stock Only
    if (inStockOnly) {
      result = result.filter(
        (p) => p.availabilityStatus === 'in_stock' || p.availabilityStatus === 'low_stock'
      );
    }

    // Care Difficulty
    if (difficulty !== 'all') {
      result = result.filter((p) => p.careRequirements?.careDifficulty === difficulty);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, query, selectedCategory, selectedSubcategory, priceMax, inStockOnly, difficulty, sortBy, settings]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubcategory !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (difficulty !== 'all' ? 1 : 0) +
    (query ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-900 dark:text-white font-medium">All Products</span>
          {selectedCategory !== 'all' && currentCategoryObj && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{currentCategoryObj.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {currentCategoryObj ? currentCategoryObj.name : 'Complete Aquatic Catalog'}
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              {currentCategoryObj
                ? currentCategoryObj.description
                : 'Browse our full catalog of freshwater fish, koi, rimless aquariums, live plants, and equipment.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600 dark:text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none shadow-xs"
              >
                <option value="featured">Featured First</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical (A - Z)</option>
              </select>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-900 dark:text-white shadow-xs"
            >
              <Filter className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>
          </div>
        </div>

        {/* Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            {/* Active Filters Clear Bar */}
            {activeFiltersCount > 0 && (
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs shadow-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                </span>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>
            )}

            {/* Search within Catalog */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Search Catalog
              </label>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Filter by name, variety..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none shadow-xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-2.5 top-2.5" />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      const params = new URLSearchParams(searchParams);
                      params.delete('search');
                      setSearchParams(params);
                    }}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Categories
              </label>
              <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  All Categories ({products.length})
                </button>

                {categories
                  .filter((c) => (c.id === 'marine-fish' ? settings.enableMarineCategory : c.active))
                  .map((cat) => {
                    const count = products.filter((p) => p.categoryId === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[10px] opacity-75">{count}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Subcategory Filter (If category has subcategories) */}
            {availableSubcategories.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Varieties / Subcategories
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedSubcategory('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedSubcategory === 'all'
                        ? 'bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Varieties
                  </button>
                  {availableSubcategories.map((sub) => {
                    const subCount = products.filter(
                      (p) => p.categoryId === selectedCategory && p.subcategoryId === sub.id
                    ).length;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubcategory(sub.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          selectedSubcategory === sub.id
                            ? 'bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="truncate">{sub.name}</span>
                        <span className="text-[10px] opacity-75">{subCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Max Price</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  {formatMoney(priceMax, settings.currencySymbol)}
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={50000}
                step={200}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Availability */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-500 focus:ring-cyan-500"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>

            {/* Care Difficulty */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Care Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none shadow-xs"
              >
                <option value="all">Any Difficulty</option>
                <option value="Easy / Beginner">Easy / Beginner</option>
                <option value="Moderate">Moderate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert Only">Expert Only</option>
              </select>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400 shadow-xs">
                <SlidersHorizontal className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Matching Products Found</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                  We could not find items matching your current search or filter combination. Try clearing selected filters or searching with different terms.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                  Showing <span className="text-slate-900 dark:text-white font-semibold">{filteredProducts.length}</span> product{filteredProducts.length > 1 ? 's' : ''}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col text-slate-900 dark:text-slate-100 overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Filter Products</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category List */}
              <div className="space-y-4 flex-1">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider block mb-2">
                    Department
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="all">All Departments</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider block mb-2">
                    Max Price: {formatMoney(priceMax, settings.currencySymbol)}
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={50000}
                    step={200}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-cyan-600 dark:accent-cyan-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-cyan-600 dark:text-cyan-500"
                    />
                    <span>In Stock Items Only</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 py-2.5 rounded-lg bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 text-xs font-bold shadow-xs"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
