import React, { useState, useRef } from 'react';
import { Download, Upload, FileSpreadsheet } from 'lucide-react';
import { Product } from '../../types';
import { Storage } from '../../lib/storage';

interface AdminCsvTabProps {
  products: Product[];
  onReloadProducts: () => void;
}

export const AdminCsvTab: React.FC<AdminCsvTabProps> = ({
  products,
  onReloadProducts,
}) => {
  const [csvText, setCsvText] = useState('');
  const [csvResult, setCsvResult] = useState<{
    successCount?: number;
    errors: string[];
    warnings: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportCSV = () => {
    const csvContent = Storage.exportProductsToCSV(products);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `modern_aquarium_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = () => {
    if (!csvText.trim()) return;
    const { validProducts, errors, warnings } = Storage.parseProductsFromCSV(csvText);

    if (validProducts.length > 0) {
      validProducts.forEach((vp) => Storage.upsertProduct(vp));
      onReloadProducts();
    }

    setCsvResult({
      successCount: validProducts.length,
      errors,
      warnings
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvText((event.target?.result as string) || '');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Catalog CSV Import &amp; Export</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Export your catalog safely with formula injection defense, or import items in bulk.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Download Catalog CSV</span>
          </button>
        </div>

        {/* Upload file or paste CSV */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider mb-1">
              Upload .CSV File
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileUpload}
              className="block w-full text-xs text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 dark:file:bg-slate-800 file:text-slate-800 dark:file:text-white hover:file:bg-slate-200 dark:hover:file:bg-slate-700 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider mb-1">
              Or Paste CSV Data Directly:
            </label>
            <textarea
              rows={6}
              placeholder="name,sku,categoryId,variety,price,stockQuantity,shortDescription..."
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white font-mono text-[11px] focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">
              Mandatory headers: <code>name</code>, <code>price</code>, <code>sku</code>
            </span>
            <button
              onClick={handleImportCSV}
              disabled={!csvText.trim()}
              className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Validate &amp; Import Products
            </button>
          </div>

          {/* Import Result Feedback */}
          {csvResult && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Import Summary</h4>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ {csvResult.successCount} product(s) validated and imported successfully.
              </p>

              {csvResult.warnings.length > 0 && (
                <div className="space-y-1 text-amber-600 dark:text-amber-300">
                  <p className="font-semibold">Warnings ({csvResult.warnings.length}):</p>
                  <ul className="list-disc list-inside text-[11px]">
                    {csvResult.warnings.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {csvResult.errors.length > 0 && (
                <div className="space-y-1 text-rose-600 dark:text-rose-300">
                  <p className="font-semibold">Errors ({csvResult.errors.length}):</p>
                  <ul className="list-disc list-inside text-[11px]">
                    {csvResult.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
