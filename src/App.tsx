import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { ThemeProvider } from './context/ThemeContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/navigation/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { generateStoreChatUrl } from './lib/whatsapp';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { LiveAnimalPolicyPage } from './pages/LiveAnimalPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AccountPage } from './pages/AccountPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton: React.FC = () => {
  const { settings } = useShop();
  const chatUrl = generateStoreChatUrl(settings).url || '#';

  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950/60 transition-all hover:scale-105 active:scale-95 group"
      aria-label="Chat with Modern Aquarium on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 text-white" />
      <span className="hidden sm:inline">WhatsApp Order &amp; Stock</span>
    </a>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ShopProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans transition-colors duration-200">
          {/* Global Announcement Header */}
          <AnnouncementBar />

          {/* Sticky Navigation */}
          <Header />

          {/* Main Routing Views */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/service/:slug" element={<ServiceDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faqs" element={<FaqPage />} />
              <Route path="/policies/shipping" element={<ShippingPolicyPage />} />
              <Route path="/policies/live-animals" element={<LiveAnimalPolicyPage />} />
              <Route path="/policies/terms" element={<TermsPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/orders" element={<AccountPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Global Slide-Over Cart Drawer */}
          <CartDrawer />

          {/* Global Checkout Modal */}
          <CheckoutModal />

          {/* Floating WhatsApp Action Pill */}
          <FloatingWhatsAppButton />
        </div>
      </BrowserRouter>
    </ShopProvider>
  </ThemeProvider>
  );
};

export default App;
