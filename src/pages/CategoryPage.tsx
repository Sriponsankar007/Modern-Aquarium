import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';
import { ChevronRight, AlertTriangle, ArrowLeft } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, products } = useShop();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  const category = categories.find((c) => c.slug === slug || c.id === slug);

  const isBirdCategory = category?.id === 'birds';

  const filteredProducts = useMemo(() => {
    if (!category) return [];

    let list = products.filter((p) => p.categoryId === category.id && p.active);

    if (selectedSubcategory !== 'all') {
      list = list.filter((p) => p.subcategoryId === selectedSubcategory);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.availabilityStatus === 'in_stock' || p.availabilityStatus === 'low_stock');
    }

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [category, products, selectedSubcategory, inStockOnly, sortBy]);

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Category Not Found</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">The requested department could not be located.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <Link to="/shop" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{category.name}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-2">
              Department
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {category.description}
            </p>

            {/* Special Policy Notices */}
            {isBirdCategory && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 rounded-xl inline-flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-200 shadow-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  <strong>Strict Animal Welfare Policy:</strong> Live birds are strictly <strong>STORE PICKUP ONLY</strong> at our Chennai showroom.
                </span>
              </div>
            )}
          </div>

          <div className="w-36 h-36 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0 relative shadow-md">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>
        </div>

        {/* Subcategory / Variety Tabs */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
              Filter by Variety / Morph:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-xs ${
                  selectedSubcategory === 'all'
                    ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800'
                }`}
              >
                All Varieties ({products.filter((p) => p.categoryId === category.id && p.active).length})
              </button>

              {category.subcategories.map((sub) => {
                const subCount = products.filter(
                  (p) => p.categoryId === category.id && p.subcategoryId === sub.id && p.active
                ).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcategory(sub.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-xs ${
                      selectedSubcategory === sub.id
                        ? 'bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-800'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className="ml-1.5 text-[10px] opacity-70">({subCount})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Controls Bar: In-Stock Toggle & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800/80 mb-8">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300 self-start sm:self-auto">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-cyan-600 dark:text-cyan-500"
            />
            <span>In Stock Only</span>
          </label>

          <div className="flex items-center gap-2 text-xs self-end sm:self-auto">
            <span className="text-slate-600 dark:text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none shadow-xs"
            >
              <option value="featured">Featured First</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-600 dark:text-slate-400 shadow-xs">
            <p className="text-base font-semibold text-slate-900 dark:text-white mb-2">No items found in this section</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
              There are currently no active products matching the selected variety. Try selecting &quot;All Varieties&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedSubcategory('all');
                setInStockOnly(false);
              }}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
