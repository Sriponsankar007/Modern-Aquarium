import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { generateStoreChatUrl } from '../lib/whatsapp';
import { Fish, ShieldCheck, Heart, Award, ArrowRight, MessageCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { settings } = useShop();
  const chatUrl = generateStoreChatUrl(settings).url || '#';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Fish className="w-4 h-4" />
            <span>Our Heritage &amp; Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Modern Aquarium
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded with a passion for underwater ecosystems, we blend luxury design aesthetics with certified biological aquatic care.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">From Passion to Flagship Showroom</h2>
          <p>
            Modern Aquarium started in Chennai with a singular vision: to elevate the aquarium hobby beyond standard glass boxes into living artistic centrepieces. We believe an aquarium is not merely a decorative fixture—it is a delicately balanced biological sanctuary that brings tranquility, focus, and nature into modern homes and corporate spaces.
          </p>
          <p>
            Every fish, from our show-grade Halfmoon Bettas to champion Niigata Nishikigoi, undergoes a minimum 14-day dedicated quarantine period. We feed biologically diverse diets, monitor water chemistry using laboratory reagents, and ensure zero pathogens before any live animal is approved for our customers.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-2 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Health-First Policy</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never compromise livestock health for sales speed. Every fish is quarantined, conditioned, and inspected.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-2 shadow-xs">
            <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Authentic Lineages</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Direct breeder relationships in Japan, Thailand, and certified domestic hatcheries guarantee genuine varieties.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-2 shadow-xs">
            <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Ethical Avian Care</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We uphold mandatory Store Pickup Only policies for all live birds to guarantee zero courier transit stress.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visit Our Living Showroom</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{settings.address}</p>
          </div>
          <div className="flex gap-3">
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Showroom</span>
            </a>
            <Link
              to="/shop"
              className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
