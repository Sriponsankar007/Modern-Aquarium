import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatMoney, generateServiceEnquiryUrl } from '../lib/whatsapp';
import { ServiceItem } from '../types';
import {
  CheckCircle,
  Clock,
  MessageCircle,
  X
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, settings } = useShop();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Service Booking Form modal state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [tankDetails, setTankDetails] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [addressOrArea, setAddressOrArea] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');

  const handleOpenBookingModal = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleSendServiceEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    const result = generateServiceEnquiryUrl(
      selectedService,
      {
        customerName: clientName,
        phone: clientPhone,
        tankDetails,
        preferredDate,
        addressOrArea,
        serviceNotes
      },
      settings
    );

    if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
      setSelectedService(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
            <span>Modern Aquarium Services</span>
            <span aria-hidden="true">·</span>
            <span>Certified Aquatic Technicians</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Professional Aquarium Installation, Maintenance &amp; Care
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Whether you are commissioning a showstopping planted nature aquarium for your home, need regular expert water servicing, or require urgent algae restoration, our experienced team provides end-to-end biological care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 dark:hover:border-slate-700 transition-all hover:shadow-xl shadow-xs"
            >
              <div>
                {/* Service Image Banner */}
                <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-md text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{srv.durationEstimate}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {srv.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {srv.shortDescription}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-2">
                      What&apos;s Included:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {srv.includes.slice(0, 4).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                    <strong>Ideal for:</strong> {srv.idealFor}
                  </p>
                </div>
              </div>

              {/* Service Footer Actions */}
              <div className="p-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Starting from</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {formatMoney(srv.startingPrice, settings.currencySymbol)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/service/${srv.slug}`}
                    className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-300 dark:border-slate-700"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleOpenBookingModal(srv)}
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Booking Enquiry Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Book {selectedService.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Send your requirements directly via WhatsApp
                </p>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendServiceEnquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9840012345"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Tank Dimensions / Volume</label>
                <input
                  type="text"
                  placeholder="e.g. 60x30x36cm (64L Planted Tank) or 4-Foot Marine"
                  value={tankDetails}
                  onChange={(e) => setTankDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Preferred Date / Time</label>
                  <input
                    type="text"
                    placeholder="e.g. Next Tuesday morning"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Location / Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Adyar, Chennai"
                    value={addressOrArea}
                    onChange={(e) => setAddressOrArea(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Special Notes / Problem Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe your setup or any algae/sickness issues..."
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 resize-none shadow-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send WhatsApp Enquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
