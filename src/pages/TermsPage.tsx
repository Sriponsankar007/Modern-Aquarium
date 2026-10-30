import React from 'react';
import { useShop } from '../context/ShopContext';

export const TermsPage: React.FC = () => {
  const { settings } = useShop();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-2">
            Legal &amp; Store Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Terms of Service &amp; Privacy Policy
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Editable operational template for {settings.shopName}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Nature of WhatsApp Order Requests</h2>
            <p>
              Submitting an order via this website constructs a pre-filled WhatsApp message. Opening or generating a WhatsApp order does not constitute a legally binding transaction until our showroom team manually confirms livestock availability, health clearance, and final delivery logistics with the customer.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Pricing &amp; Inventory Accuracy</h2>
            <p>
              All prices displayed in {settings.currencySymbol} ({settings.currency}) are configured by the store owner and are subject to stock availability. Live fish variations (such as rare Betta patterns or imported Discus morphs) are unique specimens; subtle natural coloration variances from catalog photography may occur.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Customer Privacy &amp; Data Collection</h2>
            <p>
              We do not collect or store credit card, debit card, or banking credentials. Any contact details (name, delivery address, phone) entered on this site are stored solely in your local browser storage to assemble your WhatsApp message. We never sell or share customer contact records with third-party advertising networks.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Local Law &amp; Wildlife Compliance</h2>
            <p>
              All ornamental freshwater, koi, and marine fish sold by {settings.shopName} comply with domestic non-wildlife trade regulations. We strictly do not sell protected native wildlife, endangered species, or invasive restricted fauna.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
