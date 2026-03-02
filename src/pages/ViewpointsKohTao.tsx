import React from 'react';
import { useTranslation } from 'react-i18next';

const ViewpointsKohTao = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const content = {
    nl: {
      title: 'Uitzichtpunten op Koh Tao',
      subtitle: 'Adembenemende panorama’s en onvergetelijke fotomomenten.',
      sectionTitle: 'Uitzichtpunten op het eiland',
      points: [
        { label: 'John-Suwan Viewpoint:', text: 'Panoramisch uitzicht over Chalok Baan Kao en Shark Bay.' },
        { label: 'Fraggle Rock:', text: 'Uitzicht over Sairee Beach en de westkust.' },
        { label: 'Love Koh Tao Viewpoint:', text: 'Perfect voor zonsopkomst en foto’s.' },
        { label: 'Mango Viewpoint:', text: 'Weids uitzicht over het noorden van het eiland.' },
      ],
      note: 'Voor de meeste uitzichtpunten is een korte wandeling nodig. Neem water, zonbescherming en een camera mee!',
      hikingActivities: 'Wandelen & activiteiten',
      discoverBeaches: 'Ontdek stranden',
      hikingTipsTitle: 'Wandeltips',
      hikingTips: [
        'Begin vroeg voor zonsopkomst en koelere temperaturen',
        'Draag stevige schoenen en neem voldoende water mee',
        'Paden kunnen steil en glad zijn na regen',
        'Beste licht voor fotografie: vroeg in de ochtend en bij zonsondergang',
      ],
    },
    en: {
      title: 'Viewpoints on Koh Tao',
      subtitle: 'Breathtaking panoramas and unforgettable photo moments.',
      sectionTitle: 'Island viewpoints',
      points: [
        { label: 'John-Suwan Viewpoint:', text: 'Panoramic views over Chalok Baan Kao and Shark Bay.' },
        { label: 'Fraggle Rock:', text: 'Views over Sairee Beach and the west coast.' },
        { label: 'Love Koh Tao Viewpoint:', text: 'Perfect for sunrise and photos.' },
        { label: 'Mango Viewpoint:', text: 'Wide views over the north of the island.' },
      ],
      note: 'Most viewpoints require a short hike. Bring water, sun protection, and a camera!',
      hikingActivities: 'Hiking & activities',
      discoverBeaches: 'Discover beaches',
      hikingTipsTitle: 'Hiking tips',
      hikingTips: [
        'Start early for sunrise and cooler temperatures',
        'Wear sturdy shoes and bring enough water',
        'Trails can be steep and slippery after rain',
        'Best light for photography: early morning and sunset',
      ],
    },
  };
  const pageContent = isDutch ? content.nl : content.en;

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/viewpoints-hero.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{pageContent.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{pageContent.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{pageContent.sectionTitle}</h2>
      <ul className="list-disc pl-6 mb-4">
        {pageContent.points.map((point) => (
          <li key={point.label + point.text}><strong>{point.label}</strong> {point.text}</li>
        ))}
      </ul>
      <p className="mb-4">{pageContent.note}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{pageContent.hikingActivities}</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{pageContent.discoverBeaches}</a>
      </div>
    </section>

    {/* Hiking Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{pageContent.hikingTipsTitle}</h3>
      <ul className="list-disc pl-6 mb-2">
        {pageContent.hikingTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default ViewpointsKohTao;
