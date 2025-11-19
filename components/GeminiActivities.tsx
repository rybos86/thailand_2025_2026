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

  const handleFetch = async () => {
    if (cache[leg.id]) {
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

  // Reset suggestions when leg changes, unless cached
  useEffect(() => {
    if (cache[leg.id]) {
      setSuggestions(cache[leg.id]);
    } else {
      setSuggestions([]);
    }
  }, [leg.id, cache]);

  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>✨</span> Tipy na aktivity
        </h3>
        {suggestions.length === 0 && !loading && (
          <button 
            onClick={handleFetch}
            className="px-4 py-2 bg-gradient-to-r from-thailand-500 to-thailand-700 text-white text-sm font-medium rounded-full shadow hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            Načítať AI odporúčania
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 space-y-3">
          <div className="w-8 h-8 border-4 border-thailand-300 border-t-thailand-700 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500">Gemini premýšľa o najlepších plážach...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
          Ups, niečo sa pokazilo pri načítaní tipov. Skúste to znova.
        </div>
      )}

      {!loading && suggestions.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {suggestions.map((activity, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-thailand-700 mb-1">{activity.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {!loading && suggestions.length === 0 && (
        <p className="text-slate-500 text-sm italic">
           Klikni na tlačidlo vyššie pre personalizované tipy pre {leg.location} {leg.subLocation}.
        </p>
      )}
    </div>
  );
};
