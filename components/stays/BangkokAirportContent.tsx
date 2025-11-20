import React from 'react';

export const BangkokAirportContent: React.FC = () => {
  return (
    <>
      <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
        <strong className="font-bold text-slate-900 dark:text-slate-100">Dátumy:</strong> 8.1 - 9.1.2026 (1 noc)
      </p>

      <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
        <strong className="font-bold text-slate-900 dark:text-slate-100">Účel:</strong> Odpočinok pred letom domov, pohodlný prístup na letisko
      </p>

      <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
        <strong className="font-bold text-slate-900 dark:text-slate-100">Odlet:</strong> 9.1.2026, 10:10 (Bangkok BKK → Vienna VIE cez Istanbul)
      </p>

      <hr className="my-6 border-slate-200 dark:border-slate-700" />

      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">📍 O Lokalite</h2>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Prečo Airport Hotel?</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">✈️ Blízko letiska - žiadny stres ráno</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">😴 Pokojný odpočinok po dlhej dovolenke</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">🛍️ Last-minute shopping možnosti</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">🚗 Jednoduchý transfer na letisko</li>
      </ul>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Vzdialenosť na Letisko</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed"><strong className="font-bold text-slate-900 dark:text-slate-100">Suvarnabhumi Airport (BKK):</strong> Cca 10-15 min taxíkom/Grab</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Ideálne na skorý let (odlet 10:10)</li>
      </ul>

      <hr className="my-6 border-slate-200 dark:border-slate-700" />

      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">🛍️ Shopping Malls v Okolí</h2>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Mega Bangna ⭐⭐⭐</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Vzdialenosť: Cca 15-20 min</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Najväčšie shopping centrum v Bangna oblasti</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Najväčšie low-rise shopping centrum v JV Ázii (800+ obchodov!)</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">IKEA, Robinson, Big C, Home Pro, Top's Supermarket</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Ideálne pre: Last-minute shopping, suveníry, thajské produkty</li>
      </ul>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Seacon Square Srinakarin ⭐⭐</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Najbližší veľký department store k letisku</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Stores, reštaurácie, kino, zábavný park</li>
      </ul>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">The Paseo Shopping Mall</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Len 10 min taxíkom z letiska</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Rýchly shopping blízko hotela</li>
      </ul>

      <hr className="my-6 border-slate-200 dark:border-slate-700" />

      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">🏛️ Atrakcie v Okolí</h2>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">The Ancient City (Muang Boran) ⭐⭐⭐</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Vzdialenosť: 30 min</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Jeden z najväčších open-air múzeí na svete</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Life-size repliky 77 provincií Thajska</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Tip: Len ak prídem skoro a máme veľa času</li>
      </ul>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Suvarnabhumi Flea Market</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Lokálny večerný market blízko letiska</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Street food, čerstvé ovocie/zelenina, dezerty</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Atmosféra: Lokálna, autentická</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Ideálne: Posledný večer v Thajsku</li>
      </ul>

      <hr className="my-6 border-slate-200 dark:border-slate-700" />

      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">✈️ Suvarnabhumi Airport Shopping</h2>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Duty Free Shopping</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Lokácia: International Departure Zone, Floor 4</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Luxury brands: Bally, Burberry, Bvlgari, Cartier, Coach, Dior, Dunhill, Hugo Boss</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Tip: Ceny často lepšie ako v meste!</li>
      </ul>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3">Čo Kúpiť v Duty Free</h3>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Parfumy & Kozmetika: Často lacnejšie ako v Európe</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Thai Products: Čaje, koreniny, thajské suveníry</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Alkohol: Thai whiskey, rum</li>
        <li className="text-slate-700 dark:text-slate-300 leading-relaxed">Čokoláda & Sladkosti: Thajské značky</li>
      </ul>
    </>
  );
};
