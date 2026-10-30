import React, { useState } from 'react';
import { Package, Settings, ShieldCheck, FileSpreadsheet, Database } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AdminAuth } from '../lib/auth';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminProductsTab } from '../components/admin/AdminProductsTab';
import { AdminSettingsTab } from '../components/admin/AdminSettingsTab';
import { AdminSecurityTab } from '../components/admin/AdminSecurityTab';
import { AdminGoogleSheetsTab } from '../components/admin/AdminGoogleSheetsTab';
import { AdminCsvTab } from '../components/admin/AdminCsvTab';
import { AdminProductionTab } from '../components/admin/AdminProductionTab';

export const AdminPage: React.FC = () => {
  const {
    products,
    categories,
    settings,
    updateProduct,
    deleteProduct,
    addProduct,
    updateSettings,
    reloadProducts,
    resetAllData
  } = useShop();

  // Authentication State Guard
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => AdminAuth.isAuthenticated());
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'security' | 'sheets' | 'csv' | 'production'>('products');
  const [secSettings, setSecSettings] = useState(() => AdminAuth.getSecuritySettings());

  const lowStockCount = products.filter((p) => p.stockQuantity <= 5 && p.availabilityStatus !== 'out_of_stock').length;
  const outOfStockCount = products.filter((p) => p.stockQuantity <= 0 || p.availabilityStatus === 'out_of_stock').length;

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the catalog?`)) {
      deleteProduct(id);
    }
  };

  const handleResetSeedData = () => {
    if (window.confirm('Reset all catalog products and shop settings back to factory seed defaults?')) {
      resetAllData();
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Status Bar */}
        <AdminHeader
          secSettings={secSettings}
          products={products}
          lowStockCount={lowStockCount}
          outOfStockCount={outOfStockCount}
          onOpenSecurity={() => setActiveTab('security')}
          onLogout={() => {
            AdminAuth.logout();
            setIsAuthenticated(false);
          }}
          onResetSeedData={handleResetSeedData}
        />

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'products'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Shop &amp; WhatsApp Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'security'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Security &amp; 24h Cookies</span>
          </button>

          <button
            onClick={() => setActiveTab('sheets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'sheets'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Google Sheets Backend</span>
          </button>

          <button
            onClick={() => setActiveTab('csv')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'csv'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>CSV Import &amp; Export</span>
          </button>

          <button
            onClick={() => setActiveTab('production')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-colors border-b-2 cursor-pointer ${
              activeTab === 'production'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Production Hosting</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'products' && (
          <AdminProductsTab
            products={products}
            categories={categories}
            settings={settings}
            onUpdateProduct={updateProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddProduct={addProduct}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettingsTab
            settings={settings}
            onUpdateSettings={updateSettings}
          />
        )}

        {activeTab === 'security' && (
          <AdminSecurityTab
            secSettings={secSettings}
            onUpdateSecuritySettings={setSecSettings}
          />
        )}

        {activeTab === 'sheets' && (
          <AdminGoogleSheetsTab />
        )}

        {activeTab === 'csv' && (
          <AdminCsvTab
            products={products}
            onReloadProducts={reloadProducts}
          />
        )}

        {activeTab === 'production' && (
          <AdminProductionTab />
        )}
      </div>
    </div>
  );
};
