import React from 'react';

const HowToGetHere = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/sailrock.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Hoe kom je op Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Verschillende routes om dit eilandparadijs te bereiken.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Reisopties</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Met de ferry:</strong> Koh Tao is alleen per boot bereikbaar. Ferries vertrekken vanaf Chumphon, Surat Thani, Koh Samui en Koh Phangan. Bekende aanbieders zijn Lomprayah, Songserm en Seatran.</li>
        <li><strong>Met de trein:</strong> Reis met de trein van Bangkok naar Chumphon en stap daar over op de ferry.</li>
        <li><strong>Met de bus:</strong> Bussen vanuit Bangkok en andere steden sluiten aan op ferryterminals in Chumphon en Surat Thani.</li>
        <li><strong>Met het vliegtuig:</strong> Vlieg naar Koh Samui, Chumphon of Surat Thani en neem daarna de ferry naar Koh Tao.</li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Boek verblijf</a>
        <a href="/VisasKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Visuminformatie</a>
      </div>
      <p className="text-sm text-gray-500">Tip: boek ferrytickets in het hoogseizoen op tijd. De meeste ferries komen aan bij Mae Haad Pier.</p>
    </section>

    {/* Ferry Options Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Ferry-opties</h3>
      <ul className="list-disc pl-6 mb-2">
        <li><strong>Speedboot:</strong> 1-1,5 uur, duurder maar sneller</li>
        <li><strong>Nachtferry:</strong> Goedkopere optie, aankomst in de ochtend</li>
        <li><strong>Dagferry:</strong> Standaardoptie met mooie uitzichten</li>
        <li>Bekijk websites van operators voor schema’s en kortingen</li>
      </ul>
    </section>
  </main>
);

export default HowToGetHere;
