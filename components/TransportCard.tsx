import React from 'react';
import { Transport } from '../types';

// Simple Icons
const PlaneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
);
const BoatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const BusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
);

export const TransportCard: React.FC<{ transports: Transport[] }> = ({ transports }) => {
  if (!transports || transports.length === 0) return null;

  return (
    <div className="bg-slate-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Príchod / Transfer</h3>
      <div className="space-y-3">
        {transports.map((t, idx) => (
          <div key={idx} className="flex items-start space-x-3 text-slate-700">
            <div className="mt-1 text-amber-500">
               {t.type === 'flight' ? <PlaneIcon /> : t.type === 'boat' ? <BoatIcon /> : <BusIcon />}
            </div>
            <div>
              <div className="font-medium">{t.details}</div>
              {(t.departureTime || t.arrivalTime) && (
                <div className="text-sm text-slate-500">
                  {t.departureTime && <span>Odchod: {t.departureTime}</span>}
                  {t.departureTime && t.arrivalTime && <span className="mx-2">•</span>}
                  {t.arrivalTime && <span>Príchod: {t.arrivalTime}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
