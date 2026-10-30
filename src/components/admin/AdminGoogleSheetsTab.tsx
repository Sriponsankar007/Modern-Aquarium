import React, { useState } from 'react';
import { FileSpreadsheet, Check, Copy, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GoogleSheets, GoogleSheetsConfig } from '../../lib/googleSheets';

export const AdminGoogleSheetsTab: React.FC = () => {
  const [config, setConfig] = useState<GoogleSheetsConfig>(() => GoogleSheets.getConfig());
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = GoogleSheets.saveConfig(config);
    setConfig(updated);
    setTestResult({ success: true, message: 'Google Sheets configuration saved!' });
    setTimeout(() => setTestResult(null), 3000);
  };

  const handleTestConnection = async () => {
    if (!config.appsScriptUrl) {
      setTestResult({ success: false, message: 'Please enter a Google Apps Script Webhook URL first.' });
      return;
    }
    setIsTesting(true);
    const result = await GoogleSheets.testConnection(config.appsScriptUrl);
    setIsTesting(false);
    setTestResult({ success: result.success, message: result.details });
    setConfig(GoogleSheets.getConfig());
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GoogleSheets.getAppsScriptTemplate());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider mb-1 text-xs">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Cloud Storage Integration</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Google Sheets Backend Connector</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Store customer orders, product catalog, and inquiries directly in a Google Sheet in real time.
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              config.syncStatus === 'CONNECTED'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                config.syncStatus === 'CONNECTED' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>{config.syncStatus === 'CONNECTED' ? 'Sheets Connected' : 'Setup Pending'}</span>
          </span>
        </div>

        {testResult && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider mb-1">
              Google Apps Script Webhook URL (Recommended - Zero Auth)
            </label>
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              value={config.appsScriptUrl}
              onChange={(e) => setConfig({ ...config, appsScriptUrl: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white font-mono text-[11px] focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Deploy the provided script in your Google Sheet to receive orders without requiring Google Cloud API keys.
            </p>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider mb-1">
              Google Spreadsheet ID (Optional for direct link)
            </label>
            <input
              type="text"
              placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              value={config.spreadsheetId}
              onChange={(e) => setConfig({ ...config, spreadsheetId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white font-mono text-[11px] focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Save Configuration
            </button>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
            </button>
          </div>
        </form>

        {/* Step-by-Step Instructions */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Step-by-Step Connection Guide (Takes 60 Seconds)</span>
            </h3>
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 font-medium transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied Script!' : 'Copy Apps Script Code'}</span>
            </button>
          </div>

          <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <li>
              Open a new spreadsheet in <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">Google Sheets</a> and name it <strong>Modern Aquarium Database</strong>.
            </li>
            <li>
              In the top menu, click <strong>Extensions → Apps Script</strong>.
            </li>
            <li>
              Delete any default code, paste the script using the <strong>Copy Apps Script Code</strong> button above, and click <strong>Save</strong>.
            </li>
            <li>
              Click the blue <strong>Deploy → New deployment</strong> button in the top right.
            </li>
            <li>
              Select type: <strong>Web app</strong>. Under <em>Execute as</em> select <strong>Me</strong>, and under <em>Who has access</em> select <strong>Anyone</strong>.
            </li>
            <li>
              Click <strong>Deploy</strong>, copy the generated <strong>Web app URL</strong>, paste it into the field above, and click <strong>Save Configuration</strong>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
