import React, { useState } from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';
import { ShopSettings } from '../../types';

interface AdminSettingsTabProps {
  settings: ShopSettings;
  onUpdateSettings: (settings: ShopSettings) => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<ShopSettings>(settings);
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    setSettingsSavedAlert(true);
    setTimeout(() => setSettingsSavedAlert(false), 3000);
  };

  return (
    <div className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Shop &amp; WhatsApp Configuration</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure store information and the verified WhatsApp business number for instant customer orders.
        </p>
      </div>

      {settingsSavedAlert && (
        <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Settings successfully saved and live in store!</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
        {/* WhatsApp Number (Mandatory format 91XXXXXXXXXX) */}
        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider mb-1">
            WhatsApp Ordering Number (Country code + digits without spaces)
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="919840012345"
              value={localSettings.whatsappNumber}
              onChange={(e) =>
                setLocalSettings({ ...localSettings, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })
              }
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-none focus:border-cyan-500"
            />
            <Phone className="w-4 h-4 text-emerald-500 dark:text-emerald-400 absolute left-3 top-3" />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Standard India format: <code>91XXXXXXXXXX</code> (12 digits, no plus or hyphens).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Store Name</label>
            <input
              type="text"
              value={localSettings.shopName}
              onChange={(e) => setLocalSettings({ ...localSettings, shopName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Display Phone</label>
            <input
              type="text"
              value={localSettings.phoneDisplay}
              onChange={(e) => setLocalSettings({ ...localSettings, phoneDisplay: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Showroom Address</label>
          <input
            type="text"
            value={localSettings.address}
            onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Store Hours</label>
            <input
              type="text"
              value={localSettings.storeTiming}
              onChange={(e) => setLocalSettings({ ...localSettings, storeTiming: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Currency Symbol</label>
            <input
              type="text"
              value={localSettings.currencySymbol}
              onChange={(e) => setLocalSettings({ ...localSettings, currencySymbol: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Announcement Bar Text</label>
          <input
            type="text"
            value={localSettings.announcementText}
            onChange={(e) => setLocalSettings({ ...localSettings, announcementText: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Marine Fish Department Toggle */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.enableMarineCategory}
              onChange={(e) => setLocalSettings({ ...localSettings, enableMarineCategory: e.target.checked })}
              className="rounded bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-cyan-600 focus:ring-cyan-500"
            />
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Enable Marine &amp; Saltwater Fish Department</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Displays the marine and saltwater department in the header and navigation.
              </p>
            </div>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
