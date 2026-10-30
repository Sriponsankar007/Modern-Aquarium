import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { generateStoreChatUrl } from '../lib/whatsapp';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'ordering' | 'livestock' | 'birds' | 'services';
}

const faqs: FaqItem[] = [
  {
    category: 'ordering',
    question: 'How does WhatsApp ordering work?',
    answer: 'Simply add products to your cart or click "Order Now" on any product page. When you proceed to WhatsApp Checkout, our system compiles an itemized summary with unique order reference, variants, and quantities into a pre-filled WhatsApp message. Once you click Send in WhatsApp, our team verifies livestock health and availability, gives you a live video preview if requested, and shares final payment/delivery instructions.'
  },
  {
    category: 'ordering',
    question: 'Why is there no credit card checkout directly on the website?',
    answer: 'Unlike generic goods, ornamental fish and rare species require real-time health inspection and weather-appropriate shipping scheduling. Over WhatsApp, we verify water parameters, coordinate delivery times to ensure you are home for acclimation, and confirm livestock vigor before any transaction.'
  },
  {
    category: 'birds',
    question: 'Why are all live birds strictly Store Pickup Only?',
    answer: 'In strict adherence to ethical animal welfare practices, live birds cannot be packed and shipped via standard couriers. To protect them from respiratory shock, temperature extremes, and trauma, all lovebirds, cockatiels, budgies, and finches must be picked up in person from our Chennai showroom.'
  },
  {
    category: 'livestock',
    question: 'What is your quarantine protocol before selling fish?',
    answer: 'All incoming freshwater fish, koi, and marine species are quarantined in isolated hospital tanks for 14 to 21 days. During this time, they are treated prophylactically for external parasites (Ich, velvet, flukes), conditioned onto dry and frozen foods, and cleared by our aquatic health specialists.'
  },
  {
    category: 'livestock',
    question: 'Do you offer a Live Arrival Guarantee for fish?',
    answer: 'Yes! For all approved local and express fish shipments, we guarantee 100% Live Arrival. In the rare event of transit mortality, simply send us an unopened bag photo within 2 hours of delivery receipt over WhatsApp for an immediate replacement or credit.'
  },
  {
    category: 'services',
    question: 'How do I book an aquarium maintenance or setup service?',
    answer: 'Visit our Services section, select your desired service (e.g. Regular Maintenance, Deep Cleaning, or Aquascaping), and submit the booking form. We will coordinate a suitable date, technician schedule, and customized quote directly on WhatsApp.'
  }
];

export const FaqPage: React.FC = () => {
  const { settings } = useShop();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const chatUrl = generateStoreChatUrl(settings).url || '#';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Everything you need to know about our quarantine standards, ordering process, bird policies, and aquarium maintenance services.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Have a specific question about your tank?</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Ask our aquarists about stocking compatibility, water testing, or custom builds.
            </p>
          </div>
          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
