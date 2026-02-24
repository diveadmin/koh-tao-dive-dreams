import React from 'react';

const BeachesKohTao = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/photo-1618865181016-a80ad83a06d3.avif')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Beaches of Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Pristine shores, crystal waters, and island paradise await.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Beach Guide</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Sairee Beach:</strong> The longest and most popular beach, great for swimming, sunsets, and nightlife.</li>
        <li><strong>Chalok Baan Kao:</strong> Quiet, family-friendly, and scenic.</li>
        <li><strong>Ao Leuk:</strong> Beautiful bay with clear water, ideal for snorkeling.</li>
        <li><strong>Tanote Bay:</strong> Rocky bay, excellent for snorkeling and cliff jumping.</li>
        <li><strong>Freedom Beach:</strong> Small, peaceful, and surrounded by palm trees.</li>
      </ul>
      <p className="mb-4">Most beaches are easily accessible by scooter or taxi. Please respect the environment and help keep them clean!</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Beach Activities</a>
        <a href="/FoodDrink" className="inline-block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">Beachside Dining</a>
      </div>
    </section>

    {/* Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Beach Tips</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Bring reef-safe sunscreen to protect marine life</li>
        <li>Best time for swimming: February to October</li>
        <li>Bring water and snacks for beach days</li>
        <li>Respect local rules and beach closures</li>
      </ul>
    </section>
  </main>
);

export default BeachesKohTao;
