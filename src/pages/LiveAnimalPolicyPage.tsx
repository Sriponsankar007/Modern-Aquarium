import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Heart, Droplets } from 'lucide-react';

export const LiveAnimalPolicyPage: React.FC = () => {
  const { settings } = useShop();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-2">
            Ethics &amp; Biological Welfare
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Live Animal Care &amp; Availability Policy
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Authoritative biological standards enforced at {settings.shopName}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
          <div className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>1. Strict Pre-Sale Quarantine Protocol</span>
            </h2>
            <p>
              Every living aquatic creature received from domestic breeders or international imports is immediately placed in an isolated quarantine holding facility. We follow a 14 to 21-day quarantine protocol including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
              <li>Preventative parasite clearance (treating for Cryptocaryon, Ichthyophthirius, and gill flukes).</li>
              <li>Gradual acclimation to stable tap water hardness and pH.</li>
              <li>Observation of feeding response and territorial swimming posture.</li>
              <li>Daily microscopic visual inspections before listing any batch for sale.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>2. Customer Tank Water Parameter Verification</span>
            </h2>
            <p>
              To prevent accidental livestock loss due to New Tank Syndrome, we urge customers to verify their water parameters. Your nitrogen cycle must be fully established (Ammonia 0 ppm, Nitrite 0 ppm, Nitrate &lt; 20 ppm) prior to adding sensitive species such as Discus, Arowanas, Rams, or Caridina dwarf shrimp.
            </p>
            <p>
              We provide free liquid water testing at our Chennai showroom anytime you bring an aquarium sample.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>3. Companion Avian Welfare Protocol</span>
            </h2>
            <p>
              Ornamental birds are highly social, sentient creatures. In accordance with our store policy:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-2">
              <li>All live birds are strictly <strong>STORE PICKUP ONLY</strong>.</li>
              <li>We will not release birds into undersized travel boxes or unsuitable bird cages.</li>
              <li>Bonded lovebird or finch pairs are preserved and never separated arbitrarily.</li>
              <li>We provide free dietary guidance and transitional food samples with every adoption.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Drip Acclimation Guide for New Arrivals</h2>
            <p>
              Always float your fish bag in your aquarium for 15 minutes to equalize water temperature. Subsequently, slowly drip aquarium water into the transport bag over 30 to 45 minutes before netting the fish into your display. Never dump transport bag water directly into your display tank.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
