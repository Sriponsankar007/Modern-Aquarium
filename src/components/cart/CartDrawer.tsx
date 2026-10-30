import React from 'react';
import { useShop } from '../../context/ShopContext';
import { formatMoney } from '../../lib/whatsapp';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutModalOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    settings
  } = useShop();

  if (!isCartOpen) return null;

  // Check for restricted store pickup items
  const hasStorePickupOnly = cart.some(
    (item) => item.product.productType === 'live-bird' || item.product.deliveryPolicy === 'store_pickup_only'
  );

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col text-slate-900 dark:text-slate-100 transition-colors">
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Your Shopping Cart</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">({cartCount} items)</span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Store Pickup Notice Banner (for Birds/Live Animals) */}
          {hasStorePickupOnly && (
            <div className="bg-amber-50 dark:bg-amber-950/70 border-b border-amber-200 dark:border-amber-800/60 p-3 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-700 dark:text-amber-300">Live Animal Fulfilment Notice</p>
                <p className="text-[11px] text-amber-700/90 dark:text-amber-200/90 mt-0.5">
                  Your cart contains live birds or restricted items. In accordance with animal welfare policy, this order will be set to <strong>Store Pickup Only</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Drawer Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
                  Discover rare bettas, purebred guppies, Japanese koi, rimless aquascapes, and professional supplies.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-semibold text-xs transition-colors shadow-xs"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.variantId || idx}`} className="py-4 flex gap-3 group">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.variantId)}
                          className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variantName && (
                        <p className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-0.5">
                          {item.variantName}
                        </p>
                      )}

                      {(item.product.productType === 'live-bird' || item.product.deliveryPolicy === 'store_pickup_only') && (
                        <span className="inline-block text-[10px] text-amber-700 bg-amber-100 dark:text-amber-400 font-semibold dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/50 px-1.5 py-0.2 rounded mt-1">
                          Store Pickup Only
                        </span>
                      )}

                      <div className="mt-2 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700/60 p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.variantId, item.quantity - 1)}
                            className="p-1 hover:text-slate-900 dark:hover:text-white text-slate-400 transition-colors rounded"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-medium text-slate-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.variantId, item.quantity + 1)}
                            className="p-1 hover:text-slate-900 dark:hover:text-white text-slate-400 transition-colors rounded"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {formatMoney(item.lineTotal, settings.currencySymbol)}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {formatMoney(item.unitPrice, settings.currencySymbol)} ea
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatMoney(cartSubtotal, settings.currencySymbol)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Delivery / Pickup</span>
                  <span>Calculated via WhatsApp</span>
                </div>
                <div className="pt-2 flex justify-between text-sm font-bold text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800">
                  <span>Estimated Total</span>
                  <span className="text-cyan-600 dark:text-cyan-400">
                    {formatMoney(cartSubtotal, settings.currencySymbol)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <span>Proceed to WhatsApp Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Zero pre-payment required
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
