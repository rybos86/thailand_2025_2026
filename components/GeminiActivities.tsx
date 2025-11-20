import React, { useState, useEffect } from 'react';
import { TripLeg, ActivitySuggestion } from '../types';
import { fetchActivitySuggestions } from '../services/geminiService';

interface Props {
  leg: TripLeg;
}

export const GeminiActivities: React.FC<Props> = ({ leg }) => {
  const [suggestions, setSuggestions] = useState<ActivitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // Cache suggestions to avoid refetching on simple tab switches
  const [cache, setCache] = useState<Record<string, ActivitySuggestion[]>>({});

  const handleFetch = async (forceRegenerate = false) => {
    if (cache[leg.id] && !forceRegenerate) {
      setSuggestions(cache[leg.id]);
      return;
    }

    setLoading(true);
    setError(false);
    try {
      const results = await fetchActivitySuggestions(leg.location, leg.subLocation || '', leg.description);
      setSuggestions(results);
      setCache(prev => ({ ...prev, [leg.id]: results }));
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleFetch(true);
  };

  // Reset suggestions when leg changes, unless cached
  useEffect(() => {
    if (cache[leg.id]) {
      setSuggestions(cache[leg.id]);
    } else {
      setSuggestions([]);
    }
  }, [leg.id, cache]);

  return (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <span>✨</span> Tipy na aktivity
        </h3>
        {suggestions.length === 0 && !loading && (
          <button
            onClick={() => handleFetch()}
            className="px-4 py-2 bg-gradient-to-r from-thailand-500 to-thailand-700 dark:from-thailand-600 dark:to-thailand-800 text-white text-sm font-medium rounded-full shadow hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            Načítať AI odporúčania
          </button>
        )}
        {suggestions.length > 0 && !loading && (
          <button
            onClick={handleRegenerate}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full shadow hover:shadow-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center gap-2 border border-slate-200 dark:border-slate-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Pregenerovať
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 space-y-3">
          <div className="w-8 h-8 border-4 border-thailand-300 dark:border-thailand-700 border-t-thailand-700 dark:border-t-thailand-400 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gemini premýšľa o najlepších plážach...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">
          Ups, niečo sa pokazilo pri načítaní tipov. Skúste to znova.
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {suggestions.map((activity, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-thailand-700 dark:text-thailand-400 mb-1">{activity.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && suggestions.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400 text-sm italic">
           Klikni na tlačidlo vyššie pre personalizované tipy pre {leg.location} {leg.subLocation}.
        </p>
      )}
    </div>
  );
};
