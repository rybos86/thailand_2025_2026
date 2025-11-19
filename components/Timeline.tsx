import React from 'react';
import { TripLeg } from '../types';

interface TimelineProps {
  legs: TripLeg[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ legs, selectedId, onSelect }) => {
  return (
    <div className="flex overflow-x-auto py-4 px-4 space-x-4 bg-white no-scrollbar items-center justify-start md:justify-center">
      {legs.map((leg, index) => {
        const isSelected = leg.id === selectedId;
        return (
          <button
            key={leg.id}
            onClick={() => onSelect(leg.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
              isSelected ? 'bg-thailand-100 text-thailand-700 ring-2 ring-thailand-500' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
             <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
               isSelected ? 'bg-thailand-500 text-white border-thailand-500' : 'bg-white border-slate-300'
             }`}>
               {index + 1}
             </div>
             <div className="text-xs font-bold whitespace-nowrap">
               {leg.location}
             </div>
          </button>
        );
      })}
    </div>
  );
};
