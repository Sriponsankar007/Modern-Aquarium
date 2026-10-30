import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatMoney, generateProductOrderUrl } from '../lib/whatsapp';
import { ProductCard } from '../components/products/ProductCard';
import {
  ChevronRight,
  ShoppingCart,
  MessageCircle,
  AlertTriangle,
  Check,
  Truck,
  Store,
  Plus,
  Minus,
  Droplets,
  ArrowLeft,
  Share2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, settings, addToCart, recentlyViewed, addRecentlyViewed, addOrderToHistory } = useShop();

  const product = products.find((p) => p.slug === slug || p.id === slug);

  // Variant & Quantity state
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      if (product.variants && product.variants.length > 0) {
        setSelectedVariantId(product.variants[0].id);
      }
      setQuantity(1);
      setActiveImageIdx(0);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Product Not Found</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">This item is no longer available or the URL is incorrect.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const comparePrice = selectedVariant?.compareAtPrice || product.compareAtPrice;

  const isBird = product.productType === 'live-bird' || product.deliveryPolicy === 'store_pickup_only';
  const isOutOfStock = product.availabilityStatus === 'out_of_stock' || product.stockQuantity <= 0;
  const isContactForPrice = product.availabilityStatus === 'contact_for_price';

  // Add to cart action
  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedVariant?.id, quantity);
  };

  // Direct WhatsApp "Order Now"
  const handleWhatsAppOrderNow = () => {
    const result = generateProductOrderUrl(product, selectedVariant?.id, quantity, settings);
    if (result.url) {
      const generatedRef = result.orderRef || `DIR-${Date.now()}`;
      addOrderToHistory({
        id: `ord-${Date.now()}`,
        orderRef: generatedRef,
        createdAt: new Date().toISOString(),
        customerName: 'Direct Order Customer',
        fulfilmentMethod: isBird ? 'store_pickup' : 'delivery_enquiry',
        items: [
          {
            productId: product.id,
            name: product.name,
            variantId: selectedVariant?.id,
            variantName: selectedVariant?.name,
            quantity,
            unitPrice: currentPrice,
            lineTotal: currentPrice * quantity,
            image: product.images[0] || '',
            isPickupOnly: isBird
          }
        ],
        subtotal: currentPrice * quantity,
        whatsappUrl: result.url,
        status: 'whatsapp_opened',
        statusUpdatedAt: new Date().toISOString(),
        statusNote: 'Direct product WhatsApp link opened. Awaiting customer to press Send.'
      });
      window.open(result.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id && p.active)
    .slice(0, 4);

  // Other recently viewed excluding current
  const otherRecentlyViewed = recentlyViewed.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <Link to="/shop" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Shop</Link>
          {category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
              <Link to={`/category/${category.slug}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-cyan-600 dark:text-cyan-400 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {isBird && (
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-950/90 border border-amber-300 dark:border-amber-700/60 px-2.5 py-1 rounded backdrop-blur-md shadow-xs">
                    Store Pickup Only
                  </span>
                )}
                {product.featured && !isBird && (
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100 dark:text-cyan-300 dark:bg-cyan-950/90 border border-cyan-300 dark:border-cyan-800/60 px-2.5 py-1 rounded backdrop-blur-md shadow-xs">
                    Showcase
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 backdrop-blur-md transition-colors shadow-xs"
                title="Share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIdx === i ? 'border-cyan-500 scale-95 shadow-xs' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Purchase & Spec Column */}
          <div className="space-y-6">
            <div>
              {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                <span>{category ? category.name : 'Aquarium Living'}</span>
                {product.variety && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{product.variety}</span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 dark:text-slate-500 font-mono">SKU: {selectedVariant?.sku || product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {product.scientificName && (
                <p className="text-sm italic text-slate-600 dark:text-slate-400 mt-1">
                  Scientific: {product.scientificName}
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 py-3 border-y border-slate-200 dark:border-slate-800/80">
              {isContactForPrice ? (
                <div>
                  <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">Contact for Price</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Custom quotation on WhatsApp</p>
                </div>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {formatMoney(currentPrice, settings.currencySymbol)}
                  </span>
                  {comparePrice && comparePrice > currentPrice && (
                    <span className="text-base text-slate-400 dark:text-slate-500 line-through">
                      {formatMoney(comparePrice, settings.currencySymbol)}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Taxes included</span>
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variant Selector (if multiple variants) */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Select Option / Size:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedVariantId === variant.id
                          ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 text-slate-900 dark:text-white shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold">{variant.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">SKU: {variant.sku}</p>
                      </div>
                      <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 ml-2">
                        {formatMoney(variant.price, settings.currencySymbol)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-1 shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                    className="p-1.5 hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-400 transition-colors rounded disabled:opacity-40"
                    title="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="p-1.5 hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-400 transition-colors rounded disabled:opacity-40"
                    title="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Stock Indicator */}
                <div className="text-xs">
                  {isOutOfStock ? (
                    <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Out of Stock
                    </span>
                  ) : product.stockQuantity <= 5 ? (
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">
                      Only {product.stockQuantity} left in stock
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock &amp; Quarantined
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider transition-all border border-slate-800 dark:border-slate-700 active:scale-95 shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4 text-cyan-400" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={handleWhatsAppOrderNow}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Now on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Fulfilment & Live Animal Warning Box */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 space-y-2 text-xs shadow-xs">
              {isBird ? (
                <div className="flex items-start gap-2.5 text-amber-800 dark:text-amber-200">
                  <Store className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-700 dark:text-amber-300">Mandatory Store Pickup Only</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                      To safeguard animal welfare and prevent transit distress, live birds are never shipped via couriers. You must collect your companion at our Chennai showroom.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                  <Truck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Live Fish &amp; Supplies Fulfilment</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                      Local express temperature-controlled courier or in-store pickup available. Live livestock health and delivery fee confirmed over WhatsApp before dispatch.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Care Requirements & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 border-t border-slate-200 dark:border-slate-800">
          {/* Full Description */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Full Product Description</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Live Fish / Plant Care Details */}
            {product.careRequirements && (
              <div className="pt-6 space-y-3">
                <h4 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span>Aquatic Care Requirements</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.careRequirements.adultSize && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Adult Size</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{product.careRequirements.adultSize}</span>
                    </div>
                  )}

                  {product.careRequirements.recommendedTankSize && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Min Tank Size</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{product.careRequirements.recommendedTankSize}</span>
                    </div>
                  )}

                  {product.careRequirements.waterTemperature && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Temperature</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{product.careRequirements.waterTemperature}</span>
                    </div>
                  )}

                  {product.careRequirements.phRange && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">pH Range</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{product.careRequirements.phRange}</span>
                    </div>
                  )}

                  {product.careRequirements.careDifficulty && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Difficulty</span>
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{product.careRequirements.careDifficulty}</span>
                    </div>
                  )}

                  {product.careRequirements.temperament && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
                      <span className="text-[10px] text-slate-500 uppercase block font-semibold">Temperament</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{product.careRequirements.temperament}</span>
                    </div>
                  )}
                </div>

                {product.careRequirements.compatibilityNotes && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
                    <strong>Compatibility:</strong> {product.careRequirements.compatibilityNotes}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Specifications</h3>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800/80 text-xs shadow-xs">
              <div className="p-3 flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Department</span>
                <span className="text-slate-900 dark:text-white font-medium capitalize">{product.categoryId.replace(/-/g, ' ')}</span>
              </div>
              {product.variety && (
                <div className="p-3 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Variety / Morph</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-medium">{product.variety}</span>
                </div>
              )}
              {Object.entries(product.specifications || {}).map(([key, val]) => (
                <div key={key} className="p-3 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{key}</span>
                  <span className="text-slate-900 dark:text-white font-medium text-right max-w-[180px]">{val}</span>
                </div>
              ))}
              <div className="p-3 flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Fulfilment</span>
                <span className="text-slate-900 dark:text-white font-medium">
                  {isBird ? 'Store Pickup Only' : 'Courier / Local Pickup'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 mb-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Related from {category?.name || 'Department'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {otherRecentlyViewed.length > 0 && (
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recently Viewed</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {otherRecentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
