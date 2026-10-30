import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors">
      <div className="max-w-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mx-auto shadow-xs">
          <Fish className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Page Swam Away</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The page or aquarium species you are searching for might have moved, or never existed in our current living showroom tanks.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-medium text-xs transition-colors border border-slate-300 dark:border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
