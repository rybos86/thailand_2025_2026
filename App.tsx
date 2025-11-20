import React, { useState, useEffect } from 'react';
import { ITINERARY_DATA, FLIGHT_HOME } from './constants';
import { Timeline } from './components/Timeline';
import { LegDetail } from './components/LegDetail';
import { EmergencyPanel } from './components/EmergencyPanel';
import { BackToTop } from './components/BackToTop';
import { ProgressBar } from './components/ProgressBar';
import { Checklist } from './components/Checklist';

const App: React.FC = () => {
  const [activeLegId, setActiveLegId] = useState(ITINERARY_DATA[0].id);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown to departure
  useEffect(() => {
    const departureDate = new Date('2025-12-15T10:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = departureDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simple scroll spy to update the active bubble in the header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset
      
      for (const leg of ITINERARY_DATA) {
        const element = document.getElementById(leg.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLegId(leg.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveLegId(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-thailand-500 to-thailand-700">
              Thajsko 2025/26
            </h1>
            <p className="text-xs text-slate-500 font-medium">15. Dec - 9. Jan (25 dní)</p>
          </div>
        </div>

        {/* Navigation Bar (Mini Map) */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-5xl mx-auto">
             <Timeline
                legs={ITINERARY_DATA}
                selectedId={activeLegId}
                onSelect={handleScrollTo}
             />
          </div>
        </div>
      </header>

      {/* Main Content Timeline */}
      <main className="py-8 md:py-12 px-2 md:px-4 max-w-5xl mx-auto">

        {/* Countdown Section */}
        <div className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-thailand-50 to-amber-50 rounded-2xl p-6 md:p-8 border border-thailand-100 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-sm md:text-base font-bold text-thailand-700 uppercase tracking-wider">✈️ Odpočet do odletu</h2>
              <div className="flex gap-3 md:gap-6">
                <div className="flex flex-col items-center bg-white rounded-xl px-4 py-3 shadow-md min-w-[70px] md:min-w-[90px]">
                  <span className="text-3xl md:text-4xl font-bold text-thailand-600">{countdown.days}</span>
                  <span className="text-xs md:text-sm text-slate-600 font-semibold uppercase mt-1">dní</span>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl px-4 py-3 shadow-md min-w-[70px] md:min-w-[90px]">
                  <span className="text-3xl md:text-4xl font-bold text-thailand-600">{countdown.hours}</span>
                  <span className="text-xs md:text-sm text-slate-600 font-semibold uppercase mt-1">hodín</span>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl px-4 py-3 shadow-md min-w-[70px] md:min-w-[90px]">
                  <span className="text-3xl md:text-4xl font-bold text-thailand-600">{countdown.minutes}</span>
                  <span className="text-xs md:text-sm text-slate-600 font-semibold uppercase mt-1">minút</span>
                </div>
                <div className="flex flex-col items-center bg-white rounded-xl px-4 py-3 shadow-md min-w-[70px] md:min-w-[90px]">
                  <span className="text-3xl md:text-4xl font-bold text-thailand-600">{countdown.seconds}</span>
                  <span className="text-xs md:text-sm text-slate-600 font-semibold uppercase mt-1">sekúnd</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {ITINERARY_DATA.map((leg, index) => (
            <LegDetail 
              key={leg.id} 
              leg={leg} 
              index={index}
              isLast={index === ITINERARY_DATA.length - 1}
            />
          ))}
        </div>
        
        {/* Final Departure Card */}
        <div className="flex gap-4 md:gap-8 relative opacity-70 hover:opacity-100 transition-opacity">
           <div className="flex flex-col items-center flex-shrink-0 w-10 md:w-14 hidden md:flex">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-bold z-10">
                 ✈
              </div>
           </div>
           <div className="pb-12 flex-grow">
             <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-700 mb-2">Návrat domov</h3>
                <p className="text-sm text-slate-600">
                   {FLIGHT_HOME.route} <br/>
                   Odchod: {FLIGHT_HOME.depart}, Príchod: {FLIGHT_HOME.arrive}
                </p>
             </div>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm mt-12">
        <p className="font-semibold text-slate-200 mb-2">Thajská Dovolenka 2025/2026</p>
        <p className="text-xs opacity-60 max-w-md mx-auto">
          Itinerár je uložený lokálne. Pre generovanie tipov na aktivity je využívaný Google Gemini API.
        </p>
      </footer>

      {/* Floating Action Buttons */}
      <BackToTop />
      <Checklist />
      <EmergencyPanel />
    </div>
  );
};

export default App;