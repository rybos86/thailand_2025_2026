import React from 'react';
import { TripLeg } from '../types';
import { TransportCard } from './TransportCard';
import { GeminiActivities } from './GeminiActivities';
import { MarkdownContent } from './MarkdownContent';

interface Props {
  leg: TripLeg;
  index: number;
  isLast: boolean;
}

export const LegDetail: React.FC<Props> = ({ leg, index, isLast }) => {
  const isFirst = index === 0;

  return (
    <div id={leg.id} className="flex gap-4 md:gap-8 group scroll-mt-32 relative">
      
      {/* Continuous Timeline Line */}
      {!isFirst && (
        <div className="absolute left-5 md:left-7 top-0 h-6 w-0.5 md:w-1 bg-slate-200 transform -translate-x-1/2 z-0" />
      )}
      {!isLast && (
        <div className="absolute left-5 md:left-7 top-6 bottom-0 w-0.5 md:w-1 bg-slate-200 transform -translate-x-1/2 z-0" />
      )}

      {/* Left Column: Marker */}
      <div className="flex flex-col items-center flex-shrink-0 w-10 md:w-14 pt-0 relative z-10">
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border-4 border-thailand-500 shadow-sm flex items-center justify-center text-thailand-700 font-bold text-lg md:text-xl transition-transform group-hover:scale-110 duration-300 mt-1">
          {index + 1}
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="flex-grow pb-12 md:pb-16 min-w-0 mt-1">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-100 overflow-hidden transition-shadow duration-300">
          
          {/* Hero Image Section */}
          <div className="relative h-48 md:h-64 w-full">
            <img 
              src={leg.imagePlaceholder} 
              alt={leg.location} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white shadow-black drop-shadow-md">{leg.location}</h2>
                  {leg.subLocation && <span className="text-thailand-300 font-semibold text-lg shadow-black drop-shadow-md">{leg.subLocation}</span>}
                </div>
                <div className="flex items-center gap-2 mt-1 md:mt-0">
                   <span className="bg-white/90 backdrop-blur text-slate-800 px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {leg.dates}
                  </span>
                  <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {leg.nights} nocí
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 md:p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <p className="text-slate-700 text-lg leading-relaxed font-medium border-l-4 border-thailand-200 pl-4">
                  {leg.description}
                </p>

                <TransportCard transports={leg.transportTo || []} />

                {leg.contentMarkdown && (
                    <div className="bg-slate-50 rounded-xl p-4 md:p-6 border border-slate-100">
                       <MarkdownContent content={leg.contentMarkdown} />
                    </div>
                )}
                
                <GeminiActivities leg={leg} />
              </div>

              {/* Accommodation Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 sticky top-32">
                  <div className="flex items-center gap-2 mb-3 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <h3 className="text-xs font-bold uppercase tracking-wider">Ubytovanie</h3>
                  </div>
                  
                  <div className="mb-4">
                    <div className="font-bold text-slate-800 text-lg leading-tight mb-1">
                      {leg.accommodation.name}
                    </div>
                    <div className="text-sm text-slate-500 leading-snug">
                      {leg.accommodation.address}
                    </div>
                  </div>

                  <a
                    href={leg.accommodation.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(leg.accommodation.name + ' ' + leg.accommodation.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-full py-2 px-4 bg-white text-thailand-600 border border-thailand-200 rounded-lg text-sm font-medium hover:bg-thailand-50 hover:border-thailand-300 transition-all shadow-sm group/link"
                  >
                    <span>Otvoriť na mape</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};