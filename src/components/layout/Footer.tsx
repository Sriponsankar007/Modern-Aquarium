import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { generateStoreChatUrl } from '../../lib/whatsapp';
import { Fish, MapPin, Clock, Phone, Mail, MessageCircle, ShieldCheck, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, categories } = useShop();
  const chatUrl = generateStoreChatUrl(settings).url || '#';

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-slate-600 dark:text-slate-400 text-sm transition-colors">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-200 dark:border-slate-900/80 bg-white/60 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 mx-auto md:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Strict Health Quarantine</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  All live freshwater, koi, and marine fish are quarantined for 14-21 days prior to availability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mx-auto md:mx-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Transparent WhatsApp Ordering</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Instant stock verification, video inspection before dispatch, and personalized delivery quotes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mx-auto md:mx-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-semibold text-sm">Ethical Avian &amp; Live Policies</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Birds and sensitive livestock are strictly Store Pickup Only to safeguard animal welfare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center text-slate-950">
                <Fish className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                MODERN<span className="text-cyan-600 dark:text-cyan-400 ml-0.5">AQUARIUM</span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Chennai&apos;s premier destination for luxury aquascaping, healthy freshwater and marine livestock, Japanese Nishikigoi, bird care, and certified maintenance services.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{settings.storeTiming}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{settings.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Living Stock */}
          <div>
            <h4 className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-4">
              Living Stock
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/category/freshwater-fish" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Freshwater Species
                </Link>
              </li>
              <li>
                <Link to="/category/koi" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Japanese Nishikigoi
                </Link>
              </li>
              {settings.enableMarineCategory && (
                <li>
                  <Link to="/category/marine-fish" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                    Reef &amp; Marine Fish
                  </Link>
                </li>
              )}
              <li>
                <Link to="/category/birds" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center justify-between">
                  <span>Ornamental Birds</span>
                  <span className="text-[9px] text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-1 py-0.5 rounded border border-amber-200 dark:border-amber-800">Pickup</span>
                </Link>
              </li>
              <li>
                <Link to="/category/plants" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Aquatic Live Plants
                </Link>
              </li>
              <li>
                <Link to="/category/shrimp-snails" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Dwarf Shrimp &amp; Snails
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hardware & Scaping */}
          <div>
            <h4 className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-4">
              Aquariums &amp; Tech
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/category/aquariums-tanks" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Rimless Glass Tanks
                </Link>
              </li>
              <li>
                <Link to="/category/substrate" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Aqua Soils &amp; Hardscape
                </Link>
              </li>
              <li>
                <Link to="/category/filters" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Canisters &amp; Filter Media
                </Link>
              </li>
              <li>
                <Link to="/category/lighting" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Planted RGB Lighting
                </Link>
              </li>
              <li>
                <Link to="/category/water-equipment" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Heaters &amp; Water Testers
                </Link>
              </li>
              <li>
                <Link to="/category/hardware" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  CO2 Systems &amp; Pumps
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services & Policies */}
          <div>
            <h4 className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider mb-4">
              Services &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Aquarium Setup &amp; Installation
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Regular Tank Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Master Aquascaping Design
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Shipping &amp; Pickup Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/live-animals" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Live Animal Care Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Terms &amp; Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
                  <span>My WhatsApp Orders</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.shopName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">About Us</Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Contact</Link>
            <span aria-hidden="true">·</span>
            <Link to="/faqs" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
