import React from 'react';

const ThingsToDo = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/things-to-do.jpg')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Wat te doen op Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Ontdek avontuur, ontspanning en eilandcultuur — er is meer dan alleen duiken!</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Populaire activiteiten</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Maak een snorkeltour naar verborgen baaien</li>
        <li>Volg een Thaise kookles</li>
        <li>Huur een kajak of paddleboard</li>
        <li>Verken de wandelroutes op het eiland</li>
        <li>Ontspan met een massage op het strand</li>
        <li>Doe mee aan een yoga- of fitnessles</li>
        <li>Geniet van de zonsondergang bij een rooftop bar</li>
        <li>Bezoek lokale kunstgaleries en markten</li>
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/fun-diving-koh-tao" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Ga fun diven</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Ontdek stranden</a>
        <a href="/ViewpointsKohTao" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Uitzichtpunten</a>
      </div>
      <p className="text-sm text-gray-500">Koh Tao is meer dan alleen duiken — er is genoeg te ontdekken op land en zee.</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Meer ideeën nodig?</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Maak een dagtrip naar Koh Nang Yuan voor snorkelen en iconische uitzichten</li>
        <li>Probeer rotsklimmen of boulderen voor avontuur op het land</li>
        <li>Proef streetfood op de avondmarkt in Sairee</li>
      </ul>
      <p className="mt-2">Voor meer inspiratie, bekijk onze <a href="#contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800"> gids met activiteiten</a>.</p>
    </section>
  </main>
);

export default ThingsToDo;
