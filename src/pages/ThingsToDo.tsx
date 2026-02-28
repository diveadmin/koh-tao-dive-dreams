import React from 'react';
import { useTranslation } from 'react-i18next';

const ThingsToDo = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const content = {
    nl: {
      title: 'Wat te doen op Koh Tao',
      subtitle: 'Ontdek avontuur, ontspanning en eilandcultuur — er is meer dan alleen duiken!',
      activitiesTitle: 'Populaire activiteiten',
      activities: [
        'Maak een snorkeltour naar verborgen baaien',
        'Volg een Thaise kookles',
        'Huur een kajak of paddleboard',
        'Verken de wandelroutes op het eiland',
        'Ontspan met een massage op het strand',
        'Doe mee aan een yoga- of fitnessles',
        'Geniet van de zonsondergang bij een rooftop bar',
        'Bezoek lokale kunstgaleries en markten',
      ],
      goFunDive: 'Ga fun diven',
      discoverBeaches: 'Ontdek stranden',
      viewpoints: 'Uitzichtpunten',
      note: 'Koh Tao is meer dan alleen duiken — er is genoeg te ontdekken op land en zee.',
      ideasTitle: 'Meer ideeën nodig?',
      ideas: [
        'Maak een dagtrip naar Koh Nang Yuan voor snorkelen en iconische uitzichten',
        'Probeer rotsklimmen of boulderen voor avontuur op het land',
        'Proef streetfood op de avondmarkt in Sairee',
      ],
      moreInspiration: 'Voor meer inspiratie, bekijk onze',
      activityGuide: 'gids met activiteiten',
    },
    en: {
      title: 'Things to do on Koh Tao',
      subtitle: 'Discover adventure, relaxation, and island culture — there is more than just diving!',
      activitiesTitle: 'Popular activities',
      activities: [
        'Take a snorkeling tour to hidden bays',
        'Join a Thai cooking class',
        'Rent a kayak or paddleboard',
        'Explore the island hiking trails',
        'Relax with a beach massage',
        'Join a yoga or fitness class',
        'Enjoy sunset views from a rooftop bar',
        'Visit local art galleries and markets',
      ],
      goFunDive: 'Go fun diving',
      discoverBeaches: 'Discover beaches',
      viewpoints: 'Viewpoints',
      note: 'Koh Tao is more than just diving — there is plenty to explore on land and at sea.',
      ideasTitle: 'Need more ideas?',
      ideas: [
        'Take a day trip to Koh Nang Yuan for snorkeling and iconic views',
        'Try rock climbing or bouldering for land-based adventure',
        'Taste street food at the Sairee night market',
      ],
      moreInspiration: 'For more inspiration, check out our',
      activityGuide: 'activity guide',
    },
  };
  const pageContent = isDutch ? content.nl : content.en;

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/things-to-do.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{pageContent.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{pageContent.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{pageContent.activitiesTitle}</h2>
      <ul className="list-disc pl-6 mb-4">
        {pageContent.activities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/fun-diving-koh-tao" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">{pageContent.goFunDive}</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{pageContent.discoverBeaches}</a>
        <a href="/ViewpointsKohTao" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{pageContent.viewpoints}</a>
      </div>
      <p className="text-sm text-gray-500">{pageContent.note}</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{pageContent.ideasTitle}</h3>
      <ul className="list-disc pl-6 mb-2">
        {pageContent.ideas.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-2">{pageContent.moreInspiration} <a href="#contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800"> {pageContent.activityGuide}</a>.</p>
    </section>
  </main>
  );
};

export default ThingsToDo;
