import React from 'react';
import { Database, Server, Globe, Shield } from 'lucide-react';

export const AdminProductionTab: React.FC = () => {
  return (
    <div className="max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed shadow-sm">
      <div>
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider mb-1">
          <Database className="w-4 h-4" />
          <span>Production Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hosting &amp; Production Deployment</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Architected for separate frontend and backend hosting or unified single-container deployment.
        </p>
      </div>

      {/* Architecture Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold">
            <Globe className="w-4 h-4" />
            <span>Frontend Hosting (SPA)</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Deploy the static build output (<code>dist/</code>) to Vercel, Netlify, Cloudflare Pages, AWS S3, or Firebase Hosting.
          </p>
          <code className="block p-2 bg-slate-100 dark:bg-slate-900 rounded font-mono text-[10px] text-slate-800 dark:text-cyan-300">
            npm run build
          </code>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <Server className="w-4 h-4" />
            <span>Backend API Server</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            Run the dedicated Express API server in <code>server/</code> on Render, Railway, Fly.io, Cloud Run, or any VPS.
          </p>
          <code className="block p-2 bg-slate-100 dark:bg-slate-900 rounded font-mono text-[10px] text-slate-800 dark:text-cyan-300">
            npm run server
          </code>
        </div>
      </div>

      {/* Optional Relational Cloud SQL Setup */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
          <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Cloud Database Schema (PostgreSQL)</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          When scaling to a multi-admin relational database, apply this SQL schema:
        </p>
        <pre className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-x-auto text-[11px] text-slate-800 dark:text-cyan-300 font-mono">
{`CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category_id TEXT NOT NULL,
  variety TEXT,
  price NUMERIC NOT NULL,
  stock_quantity INT DEFAULT 0,
  availability_status TEXT DEFAULT 'in_stock',
  delivery_policy TEXT DEFAULT 'standard_delivery',
  active BOOLEAN DEFAULT true,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
        </pre>
      </div>
    </div>
  );
};
