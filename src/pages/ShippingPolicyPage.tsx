import React from 'react';
import { useShop } from '../context/ShopContext';
import { Truck, Store, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  const { settings } = useShop();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-2">
            Fulfilment Policies
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Shipping &amp; Store Pickup Policy
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Effective as of 2026 · Subject to periodic review by {settings.shopName}
          </p>
        </div>

        {/* Birds Disclaimer Callout */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3 text-xs text-amber-800 dark:text-amber-200 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-700 dark:text-amber-300">Live Birds: Strictly Store Pickup Only</h3>
            <p className="mt-1 leading-relaxed">
              In accordance with ethical companion animal welfare standards, live birds (Lovebirds, Cockatiels, Budgies, Finches, Canaries) are <strong>never shipped via postal or commercial couriers</strong>. All birds must be collected in person from our Chennai showroom where we verify the new owner&apos;s carrier and provide transitional seed rations.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>1. Live Freshwater &amp; Marine Fish Delivery</span>
            </h2>
            <p>
              We package live fish using heavy-gauge medical poly bags filled with conditioned water and inflated with pure 100% industrial oxygen. Shipments are packed in thick molded thermocol (expanded polystyrene) insulated boxes with seasonal hot or cold gel packs.
            </p>
            <p>
              Delivery time slots are coordinated over WhatsApp to guarantee you are physically present to receive and drip-acclimate your livestock immediately upon delivery.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>2. Live Arrival Guarantee (LAG)</span>
            </h2>
            <p>
              We guarantee all approved fish orders will arrive healthy and alive. If transit mortality occurs, please send a clear photo and video of the unopened bag within <strong>2 hours of recorded delivery</strong> via WhatsApp. We will issue an immediate replacement or full livestock store credit.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>3. In-Store Showroom Pickup</span>
            </h2>
            <p>
              Store pickup is completely free on all items. Once your WhatsApp order is placed, our team pre-packs your non-living supplies and prepares the live stock for your scheduled arrival. Pickup is available daily during showroom hours: {settings.storeTiming}.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Dry Goods &amp; Glass Aquarium Shipping</h2>
            <p>
              Standard dry goods (food, treatments, tools, small filters) are dispatched via express regional couriers within 24 hours. Ultra-clear rimless glass aquariums require specialized wooden crating and point-to-point courier transport to prevent edge damage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
