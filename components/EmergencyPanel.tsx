import React, { useState } from 'react';

export const EmergencyPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Tourist Police', number: '1155', icon: '👮' },
    { name: 'Ambulancia / Emergency', number: '1669', icon: '🚑' },
    { name: 'Police', number: '191', icon: '🚓' },
    { name: 'Fire Department', number: '199', icon: '🚒' },
  ];

  const embassy = {
    name: 'Slovenské veľvyslanectvo (Manila)',
    phone: '+63 2 478 8184',
    email: 'emb.manila@mzv.sk',
    note: 'Konzulárna jurisdikcia pre Thajsko',
  };

  const importantPhrases = [
    { thai: 'ช่วยด้วย', english: 'Chuai duai', meaning: 'Pomoc!' },
    { thai: 'โรงพยาบาล', english: 'Rohng phayaban', meaning: 'Nemocnica' },
    { thai: 'ตำรวจ', english: 'Tamruat', meaning: 'Polícia' },
  ];

  return (
    <>
      {/* Floating Emergency Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Emergency Contacts"
      >
        <span className="text-2xl">🆘</span>
      </button>

      {/* Emergency Panel Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed bottom-24 right-6 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-80 max-h-[600px] overflow-y-auto border-2 border-red-200 dark:border-red-800">
            {/* Header */}
            <div className="sticky top-0 bg-red-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span>🆘</span>
                  Emergency Contacts
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Thai Emergency Numbers */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  Thajské emergency čísla
                </h4>
                <div className="space-y-2">
                  {emergencyContacts.map((contact, idx) => (
                    <a
                      key={idx}
                      href={`tel:${contact.number}`}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{contact.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {contact.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            Tap to call
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                        {contact.number}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Embassy */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  Slovenské zastúpenie
                </h4>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    {embassy.name}
                  </div>
                  <div className="space-y-1 text-sm">
                    <a
                      href={`tel:${embassy.phone}`}
                      className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      📞 {embassy.phone}
                    </a>
                    <a
                      href={`mailto:${embassy.email}`}
                      className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      ✉️ {embassy.email}
                    </a>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
                      {embassy.note}
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Phrases */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  Dôležité frázy
                </h4>
                <div className="space-y-2">
                  {importantPhrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-lg font-thai dark:text-slate-200">{phrase.thai}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                          {phrase.english}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {phrase.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* General Tips */}
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="font-semibold text-slate-700 dark:text-slate-300 mb-2">💡 Tipy:</div>
                <ul className="space-y-1 text-xs">
                  <li>• V prípade núdze volaj 1155 (Tourist Police - hovoria anglicky)</li>
                  <li>• Nemocnice: Bangkok Hospital, Samui International Hospital</li>
                  <li>• Lekárne: Boots, Watson's (v každom meste)</li>
                  <li>• Najdi najbližšiu nemocnicu v Google Maps</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
