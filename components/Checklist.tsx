import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface ChecklistData {
  preTrip: ChecklistItem[];
  packing: ChecklistItem[];
}

const initialChecklistData: ChecklistData = {
  preTrip: [
    { id: 'passport', text: 'Pas (platný min. 6 mesiacov)', checked: false },
    { id: 'visa', text: 'Víza / visa on arrival info', checked: false },
    { id: 'insurance', text: 'Cestovné poistenie', checked: false },
    { id: 'vaccination', text: 'Vakcinačný preukaz (ak potrebné)', checked: false },
    { id: 'bookings', text: 'Vytlačené booking potvrdenia', checked: false },
    { id: 'flight-tickets', text: 'Letenky (elektronické)', checked: false },
    { id: 'hotel-contacts', text: 'Kontakty na hotely uložené', checked: false },
    { id: 'emergency', text: 'Emergency kontakty (veľvyslanectvo)', checked: false },
    { id: 'credit-card', text: 'Kreditná karta + PIN', checked: false },
    { id: 'cash', text: 'EUR/USD na výmenu', checked: false },
    { id: 'phone', text: 'Telefón s roamingom/SIM kartou', checked: false },
    { id: 'chargers', text: 'Nabíjačky a powerbank', checked: false },
  ],
  packing: [
    { id: 'passport-pack', text: 'Pas a doklady', checked: false },
    { id: 'swimwear', text: 'Plavky (2-3 kusy)', checked: false },
    { id: 'beach-towel', text: 'Plážová osuška', checked: false },
    { id: 'sunscreen', text: 'Opaľovací krém (reef-safe, SPF 50+)', checked: false },
    { id: 'sunglasses', text: 'Slnečné okuliare', checked: false },
    { id: 'hat', text: 'Klobúk/šiltovka', checked: false },
    { id: 'sandals', text: 'Šľapky/sandále', checked: false },
    { id: 'sneakers', text: 'Tenisky (na výlety)', checked: false },
    { id: 'formal-clothes', text: 'Slušné oblečenie (chrámy)', checked: false },
    { id: 'light-clothes', text: 'Ľahké oblečenie (bavlna)', checked: false },
    { id: 'rain-jacket', text: 'Ľahká bunda (pre klimatizáciu)', checked: false },
    { id: 'meds', text: 'Lekárnička + osobné lieky', checked: false },
    { id: 'mosquito', text: 'Repelent na komáre', checked: false },
    { id: 'toiletries', text: 'Hygienické potreby', checked: false },
    { id: 'camera', text: 'Fotoaparát/GoPro', checked: false },
    { id: 'waterproof', text: 'Vodotesné puzdro na telefón', checked: false },
    { id: 'snorkel', text: 'Šnorchľovacie vybavenie (optional)', checked: false },
    { id: 'backpack', text: 'Malý batoh na výlety', checked: false },
  ],
};

export const Checklist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preTrip' | 'packing'>('preTrip');
  const [checklistData, setChecklistData] = useLocalStorage<ChecklistData>(
    'thailand-checklist',
    initialChecklistData
  );

  const toggleItem = (category: 'preTrip' | 'packing', id: string) => {
    setChecklistData({
      ...checklistData,
      [category]: checklistData[category].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  };

  const calculateProgress = (items: ChecklistItem[]) => {
    const checked = items.filter((item) => item.checked).length;
    return Math.round((checked / items.length) * 100);
  };

  const preTripProgress = calculateProgress(checklistData.preTrip);
  const packingProgress = calculateProgress(checklistData.packing);

  return (
    <>
      {/* Floating Checklist Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 bg-amber-600 dark:bg-amber-700 hover:bg-amber-700 dark:hover:bg-amber-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Checklist"
      >
        <span className="text-2xl">✓</span>
      </button>

      {/* Checklist Panel Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed bottom-40 right-6 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-96 max-h-[600px] flex flex-col border-2 border-amber-200 dark:border-amber-700">
            {/* Header */}
            <div className="sticky top-0 bg-amber-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span>✓</span>
                  Checklist
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-amber-700 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('preTrip')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'preTrip'
                      ? 'bg-white text-amber-600'
                      : 'bg-amber-700 text-white hover:bg-amber-800'
                  }`}
                >
                  Pred cestou
                  <div className="text-xs mt-1">{preTripProgress}%</div>
                </button>
                <button
                  onClick={() => setActiveTab('packing')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'packing'
                      ? 'bg-white text-amber-600'
                      : 'bg-amber-700 text-white hover:bg-amber-800'
                  }`}
                >
                  Balenie
                  <div className="text-xs mt-1">{packingProgress}%</div>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto flex-grow">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold">
                    {activeTab === 'preTrip' ? preTripProgress : packingProgress}%
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
                    style={{
                      width: `${activeTab === 'preTrip' ? preTripProgress : packingProgress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2">
                {checklistData[activeTab].map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                      item.checked
                        ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800'
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(activeTab, item.id)}
                      className="mt-0.5 w-5 h-5 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span
                      className={`text-sm flex-grow ${
                        item.checked
                          ? 'text-green-700 dark:text-green-400 line-through'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 rounded-b-2xl">
              <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
                {activeTab === 'preTrip'
                  ? `${checklistData.preTrip.filter((i) => i.checked).length} / ${checklistData.preTrip.length} úloh hotových`
                  : `${checklistData.packing.filter((i) => i.checked).length} / ${checklistData.packing.length} položiek zbalených`}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
