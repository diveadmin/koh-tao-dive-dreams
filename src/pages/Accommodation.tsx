import React from 'react';


const Accommodation = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/acc-head.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Accommodatie op Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Vind je perfecte verblijf, van luxe resorts tot budgethostels en alles ertussenin.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Waar overnachten</h2>
      <p className="mb-4">Koh Tao biedt een breed aanbod aan accommodaties voor elke stijl en elk budget. Of je nu zoekt naar een villa aan het strand, een knusse bungalow of een sociaal hostel: op het eiland is volop keuze.</p>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Luxe resorts:</strong> Geniet van zeezicht, infinity pools en spa-behandelingen bij topaccommodaties.</li>
        <li><strong>Strandbungalows:</strong> Stap direct vanuit je kamer het zand op — perfect voor een tropische sfeer.</li>
        <li><strong>Hostels & guesthouses:</strong> Ideaal voor backpackers en solo-reizigers, met sociale ruimtes en betaalbare prijzen.</li>
        <li><strong>Familiehotels:</strong> Ervaar lokale gastvrijheid en comfort in de dorpen van het eiland.</li>
        <li><strong>Eco-lodges:</strong> Verblijf duurzaam in accommodaties midden in de natuur.</li>
      </ul>
      <p className="mb-4">Populaire gebieden zijn <strong>Sairee Beach</strong> (levendig, veel restaurants en uitgaan), <strong>Mae Haad</strong> (handig voor de ferry) en <strong>Chalok Baan Kao</strong> (rustig en relaxed).</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/accommodation-booking" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Booking.com</a>
        <a href="/trip-booking" className="inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">Trip.com</a>
        <a href="/#contact" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">Boek duiken + verblijf</a>
      </div>
      <p className="text-sm text-gray-500">Tip: boek vroeg voor de beste keuze, vooral in december–april en juli–augustus.</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Inspiratie nodig?</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Reis je met vrienden? Kies een strandbungalow voor een gezellige sfeer.</li>
        <li>Beperkt budget? Hostels en guesthouses in Mae Haad en Sairee bieden veel waarde.</li>
        <li>Op zoek naar romantiek? Boek een villa op de heuvel met zonsondergangzicht.</li>
      </ul>
      <p className="mt-2">Voor meer tips kun je contact opnemen via <a href="mailto:contact@divinginasia.com" className="text-blue-600 underline hover:text-blue-800">contact@divinginasia.com</a>.</p>
    </section>
  </main>
);

export default Accommodation;
