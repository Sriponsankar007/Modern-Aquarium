import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { formatMoney, generateProductOrderUrl } from '../../lib/whatsapp';
import { Product } from '../../types';
import { ShoppingCart, MessageCircle, AlertCircle, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { settings, addToCart } = useShop();

  const isBird = product.productType === 'live-bird' || product.deliveryPolicy === 'store_pickup_only';
  const isOutOfStock = product.availabilityStatus === 'out_of_stock' || product.stockQuantity <= 0;
  const isContactForPrice = product.availabilityStatus === 'contact_for_price';
  const hasVariants = product.variants && product.variants.length > 1;

  // Single product WhatsApp direct action
  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = generateProductOrderUrl(product, product.variants[0]?.id, 1, settings);
    if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, product.variants[0]?.id, 1);
  };

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-cyan-950/10 dark:hover:shadow-cyan-950/20">
      {/* Product Image Thumbnail */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Live Badges / Restraints */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {isBird && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100/95 dark:bg-amber-950/90 border border-amber-300 dark:border-amber-700/60 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">
              Store Pickup Only
            </span>
          )}

          {product.featured && !isBird && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 bg-cyan-100/95 dark:bg-cyan-950/90 border border-cyan-300 dark:border-cyan-800/60 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">
              Showcase
            </span>
          )}
        </div>

        {/* Stock Status Badge (Top Right) */}
        <div className="absolute top-2.5 right-2.5 z-10">
          {isOutOfStock ? (
            <span className="text-[10px] font-medium text-rose-800 dark:text-rose-300 bg-rose-100/95 dark:bg-rose-950/90 border border-rose-300 dark:border-rose-800/60 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">
              Out of Stock
            </span>
          ) : product.availabilityStatus === 'low_stock' ? (
            <span className="text-[10px] font-medium text-amber-800 dark:text-amber-300 bg-amber-100/95 dark:bg-amber-950/90 border border-amber-300 dark:border-amber-800/60 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">
              Only {product.stockQuantity} Left
            </span>
          ) : null}
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-4">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 truncate">
          <span className="capitalize">{product.categoryId.replace(/-/g, ' ')}</span>
          {product.variety && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-medium truncate">{product.variety}</span>
            </>
          )}
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.slug}`} className="block group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Scientific Name */}
        {product.scientificName && (
          <p className="text-[11px] italic text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {product.scientificName}
          </p>
        )}

        {/* Price & Variant Notice */}
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            {isContactForPrice ? (
              <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">Contact for Price</span>
            ) : (
              <>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {formatMoney(product.price, settings.currencySymbol)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                    {formatMoney(product.compareAtPrice, settings.currencySymbol)}
                  </span>
                )}
              </>
            )}
          </div>

          {hasVariants && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {product.variants.length} options
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 grid grid-cols-2 gap-2">
          <button
            onClick={handleQuickAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 dark:bg-slate-800/50 dark:text-slate-600 cursor-not-allowed'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-cyan-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:hover:text-cyan-300 active:scale-95'
            }`}
            title={isOutOfStock ? 'Currently out of stock' : 'Add to cart'}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add Cart'}</span>
          </button>

          <button
            onClick={handleQuickWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm active:scale-95"
            title="Order now directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
