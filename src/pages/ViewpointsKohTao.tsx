import React from 'react';

const ViewpointsKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/viewpoints-hero.jpg')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Uitzichtpunten op Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Adembenemende panorama’s en onvergetelijke fotomomenten.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Uitzichtpunten op het eiland</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>John-Suwan Viewpoint:</strong> Panoramisch uitzicht over Chalok Baan Kao en Shark Bay.</li>
        <li><strong>Fraggle Rock:</strong> Uitzicht over Sairee Beach en de westkust.</li>
        <li><strong>Love Koh Tao Viewpoint:</strong> Perfect voor zonsopkomst en foto’s.</li>
        <li><strong>Mango Viewpoint:</strong> Weids uitzicht over het noorden van het eiland.</li>
      </ul>
      <p className="mb-4">Voor de meeste uitzichtpunten is een korte wandeling nodig. Neem water, zonbescherming en een camera mee!</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Wandelen & activiteiten</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Ontdek stranden</a>
      </div>
    </section>

    {/* Hiking Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Wandeltips</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Begin vroeg voor zonsopkomst en koelere temperaturen</li>
        <li>Draag stevige schoenen en neem voldoende water mee</li>
        <li>Paden kunnen steil en glad zijn na regen</li>
        <li>Beste licht voor fotografie: vroeg in de ochtend en bij zonsondergang</li>
      </ul>
    </section>
  </main>
);

export default ViewpointsKohTao;
