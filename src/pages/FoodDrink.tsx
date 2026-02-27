import React from 'react';

const FoodDrink = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/food-drink-hero.jpg')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Eten & drinken op Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Ontdek heerlijke Thaise gerechten, verse seafood en strandbars bij zonsondergang.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Culinaire highlights</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Groot aanbod aan Thaise en internationale restaurants</li>
        <li>Verse seafood bij veel plekken aan het strand</li>
        <li>Streetfood-kraampjes voor snelle en betaalbare maaltijden</li>
        <li>Veel vegetarische en vegan opties</li>
        <li>Strandbars en cafés voor drankjes bij zonsondergang</li>
      </ul>
      <p className="mb-4">Probeer lokale favorieten zoals Pad Thai, Som Tam en vers gegrilde vis. Op Koh Tao vind je alles: van eenvoudige strandtentjes tot luxe restaurants.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Meer activiteiten</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Zoek verblijf</a>
      </div>
      <p className="text-sm text-gray-500">Tip: kraanwater is niet drinkbaar — koop flessenwater of vul bij waterpunten.</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">Aanraders om te proeven</h3>
      <ul className="list-disc pl-6 mb-2">
        <li>Pad Thai - gebakken rijstnoedels met garnalen of kip</li>
        <li>Som Tam - pittige groene papajasalade</li>
        <li>Verse gegrilde vis met limoen en chili</li>
        <li>Mango sticky rice als dessert</li>
      </ul>
    </section>
  </main>
);

export default FoodDrink;
