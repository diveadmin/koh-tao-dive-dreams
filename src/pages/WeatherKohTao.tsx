import React from 'react';

const WeatherKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/weather.png')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Weer op Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Plan je reis met inzicht in het tropische klimaat van Koh Tao.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Klimaat & seizoenen</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Droog seizoen: februari t/m oktober, warm en zonnig</li>
        <li>Regenseizoen: november t/m januari, korte maar hevige buien</li>
        <li>Gemiddelde temperatuur: 28–32°C</li>
        <li>Zeetemperatuur: 27–30°C</li>
      </ul>
      <p className="mb-4">De meeste activiteiten zijn het hele jaar mogelijk, maar controleer de voorspelling voordat je een boottrip plant. Het droge seizoen biedt meestal de beste duikomstandigheden met kalme zee en goed zicht.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Plan activiteiten</a>
        <a href="/fun-diving-koh-tao" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Ga duiken</a>
      </div>
    </section>

    {/* Packing Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Wat neem je mee</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Zonnebrand met hoge SPF (reef-safe)</li>
        <li>Lichte, ademende kleding</li>
        <li>Regenjas of poncho (voor het regenseizoen)</li>
        <li>Waterdichte tas voor elektronica</li>
        <li>Pet/hoed en zonnebril</li>
        <li>Sneldrogende kleding voor wateractiviteiten</li>
      </ul>
    </section>
  </main>
);

export default WeatherKohTao;
