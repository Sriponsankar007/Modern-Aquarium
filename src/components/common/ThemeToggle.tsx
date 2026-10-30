import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { Sun, Moon, Laptop, Check } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'segmented';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'button' }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'segmented') {
    const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
      { mode: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
      { mode: 'system', label: 'Auto', icon: <Laptop className="w-3.5 h-3.5" /> },
      { mode: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> }
    ];

    return (
      <div className={`flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${className}`}>
        {options.map((opt) => {
          const isActive = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              type="button"
              onClick={() => setTheme(opt.mode)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title={`Switch to ${opt.label} theme`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => toggleTheme()}
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuOpen((prev) => !prev);
        }}
        className="relative p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500"
        title={`Current: ${theme} (${resolvedTheme} mode). Click to toggle, right-click for options.`}
        aria-label={`Toggle color theme. Current mode: ${resolvedTheme}`}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 transition-transform duration-200 hover:-rotate-12" />
        )}
      </button>

      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95">
          <button
            type="button"
            onClick={() => {
              setTheme('light');
              setMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              theme === 'light'
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </div>
            {theme === 'light' && <Check className="w-3 h-3 text-cyan-500" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              setMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dark</span>
            </div>
            {theme === 'dark' && <Check className="w-3 h-3 text-cyan-500" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme('system');
              setMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              theme === 'system'
                ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-slate-400" />
              <span>System</span>
            </div>
            {theme === 'system' && <Check className="w-3 h-3 text-cyan-500" />}
          </button>
        </div>
      )}
    </div>
  );
};
