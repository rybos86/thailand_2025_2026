import React, { useState, useRef, useEffect } from 'react';
import { useTheme, Theme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Svetlý';
      case 'dark':
        return 'Tmavý';
      case 'system':
        return 'Systém';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
        aria-label="Toggle theme"
      >
        <span className="text-lg">{getIcon()}</span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:inline">
          {getLabel()}
        </span>
        <svg
          className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
          <button
            onClick={() => handleThemeChange('light')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
              theme === 'light' ? 'bg-thailand-50 dark:bg-thailand-900/30' : ''
            }`}
          >
            <span className="text-xl">☀️</span>
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Svetlý</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Svetlý režim</div>
            </div>
            {theme === 'light' && (
              <svg className="w-5 h-5 ml-auto text-thailand-600 dark:text-thailand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleThemeChange('dark')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
              theme === 'dark' ? 'bg-thailand-50 dark:bg-thailand-900/30' : ''
            }`}
          >
            <span className="text-xl">🌙</span>
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Tmavý</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Tmavý režim</div>
            </div>
            {theme === 'dark' && (
              <svg className="w-5 h-5 ml-auto text-thailand-600 dark:text-thailand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button
            onClick={() => handleThemeChange('system')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
              theme === 'system' ? 'bg-thailand-50 dark:bg-thailand-900/30' : ''
            }`}
          >
            <span className="text-xl">💻</span>
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Systém</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Podľa zariadenia</div>
            </div>
            {theme === 'system' && (
              <svg className="w-5 h-5 ml-auto text-thailand-600 dark:text-thailand-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
