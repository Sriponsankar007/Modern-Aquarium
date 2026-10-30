import React from 'react';
import { ShieldCheck, Cookie, KeyRound, LogOut, Info, RefreshCw } from 'lucide-react';
import { AdminSecuritySettings } from '../../lib/auth';
import { ADMIN_COOKIE_NAME } from '../../lib/cookieUtils';
import { Product } from '../../types';

interface AdminHeaderProps {
  secSettings: AdminSecuritySettings;
  products: Product[];
  lowStockCount: number;
  outOfStockCount: number;
  onOpenSecurity: () => void;
  onLogout: () => void;
  onResetSeedData: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  secSettings,
  products,
  lowStockCount,
  outOfStockCount,
  onOpenSecurity,
  onLogout,
  onResetSeedData,
}) => {
  return (
    <>
      {/* Admin Authentication & Security Status Bar */}
      <div className="mb-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">Store Owner:</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-semibold">
                {secSettings.ownerEmail}
              </span>
              <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Session
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-[10px] text-cyan-800 dark:text-cyan-300 font-semibold">
                <Cookie className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                <span>24h Strict Cookie Active ({ADMIN_COOKIE_NAME})</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                <span>Security Patched (100%)</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Out-of-band WhatsApp Guard connected to <strong>+{secSettings.ownerPhone}</strong> • Dynamic OTP + 24-hr cookie persistence
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onOpenSecurity}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors font-medium border border-slate-300 dark:border-slate-700 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Security Settings</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/80 hover:bg-rose-200 dark:hover:bg-rose-900 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 transition-colors font-bold cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Persistence Info & Reset Banner */}
      <div className="mb-6 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-cyan-900 dark:text-cyan-200">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Store Database &amp; Local Persistence Active</p>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5">
              All live changes, catalog updates, price edits, and 24-hr sessions persist automatically. Use the <strong>Production Hosting</strong> tab to connect external hosting.
            </p>
          </div>
        </div>
        <button
          onClick={onResetSeedData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 transition-colors font-medium cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Factory Catalog</span>
        </button>
      </div>

      {/* Dashboard Title & Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-medium">Total Products</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{products.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-medium">Active In Store</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{products.filter((p) => p.active).length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-medium">Low Stock Alerts</span>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{lowStockCount}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-medium">Out of Stock</span>
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{outOfStockCount}</p>
        </div>
      </div>
    </>
  );
};
