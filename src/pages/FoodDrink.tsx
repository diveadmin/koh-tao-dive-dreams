import React from 'react';
import { useTranslation } from 'react-i18next';

const FoodDrink = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const content = {
    nl: {
      title: 'Eten & drinken op Koh Tao',
      subtitle: 'Ontdek heerlijke Thaise gerechten, verse seafood en strandbars bij zonsondergang.',
      highlightsTitle: 'Culinaire highlights',
      highlights: [
        'Groot aanbod aan Thaise en internationale restaurants',
        'Verse seafood bij veel plekken aan het strand',
        'Streetfood-kraampjes voor snelle en betaalbare maaltijden',
        'Veel vegetarische en vegan opties',
        'Strandbars en cafés voor drankjes bij zonsondergang',
      ],
      intro:
        'Probeer lokale favorieten zoals Pad Thai, Som Tam en vers gegrilde vis. Op Koh Tao vind je alles: van eenvoudige strandtentjes tot luxe restaurants.',
      moreActivities: 'Meer activiteiten',
      findStay: 'Zoek verblijf',
      tip: 'Tip: kraanwater is niet drinkbaar — koop flessenwater of vul bij waterpunten.',
      tasteTitle: 'Aanraders om te proeven',
      tastes: [
        'Pad Thai - gebakken rijstnoedels met garnalen of kip',
        'Som Tam - pittige groene papajasalade',
        'Verse gegrilde vis met limoen en chili',
        'Mango sticky rice als dessert',
      ],
    },
    en: {
      title: 'Food & drinks on Koh Tao',
      subtitle: 'Discover delicious Thai dishes, fresh seafood, and sunset beach bars.',
      highlightsTitle: 'Culinary highlights',
      highlights: [
        'Wide range of Thai and international restaurants',
        'Fresh seafood available at many beachfront spots',
        'Street food stalls for quick and affordable meals',
        'Many vegetarian and vegan options',
        'Beach bars and cafés for sunset drinks',
      ],
      intro:
        'Try local favorites like Pad Thai, Som Tam, and freshly grilled fish. On Koh Tao you will find everything from simple beach shacks to upscale restaurants.',
      moreActivities: 'More activities',
      findStay: 'Find accommodation',
      tip: 'Tip: tap water is not drinkable — buy bottled water or refill at water stations.',
      tasteTitle: 'Must-try dishes',
      tastes: [
        'Pad Thai - stir-fried rice noodles with shrimp or chicken',
        'Som Tam - spicy green papaya salad',
        'Fresh grilled fish with lime and chili',
        'Mango sticky rice for dessert',
      ],
    },
  };
  const pageContent = isDutch ? content.nl : content.en;

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/food-drink-hero.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{pageContent.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{pageContent.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{pageContent.highlightsTitle}</h2>
      <ul className="list-disc pl-6 mb-4">
        {pageContent.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mb-4">{pageContent.intro}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{pageContent.moreActivities}</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{pageContent.findStay}</a>
      </div>
      <p className="text-sm text-gray-500">{pageContent.tip}</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{pageContent.tasteTitle}</h3>
      <ul className="list-disc pl-6 mb-2">
        {pageContent.tastes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default FoodDrink;
