import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useShop } from '../../context/ShopContext';
import { formatMoney, generateCartCheckoutUrl, isValidWhatsAppConfig } from '../../lib/whatsapp';
import { CustomerDetails, FulfilmentMethod } from '../../types';
import {
  X,
  MessageCircle,
  AlertTriangle,
  Store,
  Truck,
  CheckCircle2,
  Info,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleSheets } from '../../lib/googleSheets';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    settings,
    addOrderToHistory
  } = useShop();

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    fulfilmentMethod: 'delivery_enquiry',
    deliveryArea: '',
    preferredPickupTime: '',
    notes: ''
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCheckoutModalOpen) return null;

  // Check if cart contains birds or items that are store pickup only
  const containsPickupOnly = cart.some(
    (item) => item.product.productType === 'live-bird' || item.product.deliveryPolicy === 'store_pickup_only'
  );

  // If bird present, enforce store pickup
  const effectiveFulfilment: FulfilmentMethod = containsPickupOnly
    ? 'store_pickup'
    : customer.fulfilmentMethod;

  const isConfigured = isValidWhatsAppConfig(settings);

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isConfigured) {
      setErrorMessage(
        'The shop administrator has not configured a WhatsApp phone number. Please update it in the Admin Dashboard.'
      );
      return;
    }

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    const payload: CustomerDetails = {
      ...customer,
      fulfilmentMethod: effectiveFulfilment
    };

    const result = generateCartCheckoutUrl(cart, payload, settings);

    if (result.error) {
      setErrorMessage(result.error);
      return;
    }

    if (result.url) {
      // Trigger festive celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      const generatedRef = result.orderRef || `MA-ORD-${Date.now()}`;

      // Save order to orderHistory
      addOrderToHistory({
        id: `ord-${Date.now()}`,
        orderRef: generatedRef,
        createdAt: new Date().toISOString(),
        customerName: customer.name || 'Valued Customer',
        customerPhone: customer.phone,
        fulfilmentMethod: effectiveFulfilment,
        deliveryArea: customer.deliveryArea,
        preferredPickupTime: customer.preferredPickupTime,
        notes: customer.notes,
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          variantId: item.variantId,
          variantName: item.variantName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.lineTotal,
          image: item.product.images[0] || '',
          isPickupOnly: item.product.productType === 'live-bird' || item.product.deliveryPolicy === 'store_pickup_only'
        })),
        subtotal: cartSubtotal,
        whatsappUrl: result.url,
        status: 'whatsapp_opened',
        statusUpdatedAt: new Date().toISOString(),
        statusNote: 'WhatsApp opened with pre-filled message. Awaiting customer to press Send.'
      });

      // Synchronize with Google Sheets backend if configured
      GoogleSheets.appendOrder({
        orderId: generatedRef,
        timestamp: new Date().toISOString(),
        customerName: customer.name || 'Valued Customer',
        customerPhone: customer.phone || '',
        itemsSummary: cart.map((i) => `${i.product.name} (x${i.quantity})`).join(', '),
        totalAmount: cartSubtotal,
        deliveryAddress: customer.deliveryArea || 'Showroom Pickup',
        deliveryMethod: effectiveFulfilment || 'standard_delivery',
        paymentStatus: 'AWAITING_CONFIRMATION',
      }).catch((e) => console.log('Sheets auto-sync logged', e));

      setSubmittedRef(generatedRef);
      // Open WhatsApp in new tab
      window.open(result.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setSubmittedRef(null);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150 transition-colors">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Checkout</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review your cart &amp; generate your pre-filled WhatsApp order
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post-submission Success State */}
        {submittedRef ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">WhatsApp Opened!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">Ref: {submittedRef}</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl text-left text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                Action Required: Press &quot;Send&quot; in WhatsApp
              </p>
              <p className="leading-relaxed">
                We have generated your order message with all item quantities, variants, and reference number. <strong>Please tap &quot;Send&quot; in the WhatsApp window</strong> to submit your order to our showroom team.
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Our aquarists will inspect the livestock, confirm availability, and reply with the final invoice and dispatch/pickup time slot.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/account"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors text-center shadow-xs"
              >
                Track in Order History
              </Link>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-medium text-xs transition-colors"
              >
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSendOrder} className="p-6 space-y-5">
            {/* WhatsApp Config Warning if missing */}
            {!isConfigured && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-700 dark:text-rose-300">WhatsApp Number Not Configured</p>
                  <p className="mt-0.5 text-rose-700/90 dark:text-rose-200/90">
                    The shop owner must set the phone number in settings before outbound orders can be sent.
                  </p>
                  <Link
                    to="/admin"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-300 underline font-medium mt-1 hover:text-cyan-700 dark:hover:text-cyan-200"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Configure in Admin Dashboard
                  </Link>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-300">
                {errorMessage}
              </div>
            )}

            {/* Cart Preview Summary */}
            <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span>Items in Order ({cart.length})</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                  Subtotal: {formatMoney(cartSubtotal, settings.currencySymbol)}
                </span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-1.5 divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-1.5 first:pt-0 flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="truncate max-w-[280px]">
                      {item.quantity}× {item.product.name} {item.variantName ? `(${item.variantName})` : ''}
                    </span>
                    <span className="text-slate-900 dark:text-slate-200 shrink-0 font-medium">
                      {formatMoney(item.lineTotal, settings.currencySymbol)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fulfilment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Fulfilment Method
              </label>

              {containsPickupOnly ? (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/70 rounded-xl flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-700 dark:text-amber-300">Strictly Store Pickup Only</p>
                    <p className="text-[11px] text-amber-700/90 dark:text-amber-200/90 mt-0.5">
                      Your cart includes live birds or restricted livestock. To ensure live animal welfare, home delivery is disabled.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, fulfilmentMethod: 'delivery_enquiry' })}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors ${
                      effectiveFulfilment === 'delivery_enquiry'
                        ? 'bg-cyan-50 dark:bg-cyan-950/50 border-cyan-500 text-slate-900 dark:text-white shadow-xs'
                        : 'bg-white dark:bg-slate-950/50 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Delivery Enquiry</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Local &amp; express courier delivery</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, fulfilmentMethod: 'store_pickup' })}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-colors ${
                      effectiveFulfilment === 'store_pickup'
                        ? 'bg-cyan-50 dark:bg-cyan-950/50 border-cyan-500 text-slate-900 dark:text-white shadow-xs'
                        : 'bg-white dark:bg-slate-950/50 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700'
                    }`}
                  >
                    <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Store Pickup</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Collect at Chennai Showroom</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Customer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9840012345"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none shadow-xs"
                />
              </div>
            </div>

            {/* Conditional Delivery / Pickup fields */}
            {effectiveFulfilment === 'delivery_enquiry' ? (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Delivery Area / Pincode
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anna Nagar, Chennai - 600040"
                  value={customer.deliveryArea}
                  onChange={(e) => setCustomer({ ...customer, deliveryArea: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none shadow-xs"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Pickup Date / Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Saturday afternoon between 3 PM - 6 PM"
                  value={customer.preferredPickupTime}
                  onChange={(e) => setCustomer({ ...customer, preferredPickupTime: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none shadow-xs"
                />
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Request video of betta flare before dispatch, or require plant planting advice."
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-cyan-500 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none resize-none shadow-xs"
              />
            </div>

            {/* Notice */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                No Online Payment Required
              </div>
              <p>
                Final delivery quotes, stock check, and live livestock confirmation are completed over WhatsApp. You do not enter any credit card or banking details.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isConfigured}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Order to WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
