import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { formatMoney, generateServiceEnquiryUrl } from '../lib/whatsapp';
import {
  ChevronRight,
  Clock,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, settings } = useShop();

  const service = services.find((s) => s.slug === slug || s.id === slug);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [tankDetails, setTankDetails] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [addressOrArea, setAddressOrArea] = useState('');
  const [serviceNotes, setServiceNotes] = useState('');

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Service Not Found</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">The requested service could not be found.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Services</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = generateServiceEnquiryUrl(
      service,
      {
        customerName,
        phone,
        tankDetails,
        preferredDate,
        addressOrArea,
        serviceNotes
      },
      settings
    );

    if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <Link to="/services" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{service.name}</span>
        </nav>

        {/* Service Header & Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>Modern Aquarium Certified Service</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {service.name}
              </h1>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
                  <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Est. Time: {service.durationEstimate}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Certified Aquarists</span>
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  Starting from {formatMoney(service.startingPrice, settings.currencySymbol)}
                </div>
              </div>
            </div>

            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Service Scope & WhatsApp Enquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Scope & Checklist Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Detailed Service Scope</h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Every service visit follows our rigorous biological checklist to ensure zero stress to fish, crystal water clarity, and prolonged equipment life.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {service.includes.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 shadow-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Ideal Aquarium Scenarios</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.idealFor}
              </p>
            </div>
          </div>

          {/* Booking / Enquiry Form Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md h-fit space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Book via WhatsApp</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Submit your details to receive an instant WhatsApp quotation
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand R"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9840012345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Aquarium Details / Dimensions</label>
                <input
                  type="text"
                  placeholder="e.g. 60P Rimless / 4-Foot Community"
                  value={tankDetails}
                  onChange={(e) => setTankDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Location / Chennai Area</label>
                <input
                  type="text"
                  placeholder="e.g. Besant Nagar / ECR"
                  value={addressOrArea}
                  onChange={(e) => setAddressOrArea(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Preferred Date / Timing</label>
                <input
                  type="text"
                  placeholder="e.g. Sunday 10:00 AM"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Specific Requests or Issues</label>
                <textarea
                  rows={2}
                  placeholder="Any known issues (algae, cloudy water, leaks)..."
                  value={serviceNotes}
                  onChange={(e) => setServiceNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 resize-none shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
