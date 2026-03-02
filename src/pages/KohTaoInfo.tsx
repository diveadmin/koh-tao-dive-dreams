import React from 'react';
import { useTranslation } from 'react-i18next';

const KohTaoInfo = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = {
    nl: {
      title: 'Over Koh Tao',
      description:
        'Koh Tao, wat "Schildpadeiland" betekent, is een klein paradijs in de Golf van Thailand dat bekendstaat om kristalhelder water, kleurrijke koraalriffen en een ontspannen eilandsfeer. Het is een van de beste duikbestemmingen ter wereld en biedt activiteiten voor ieder type reiziger.',
      facts: [
        'Locatie: 70 km uit de oostkust van Zuid-Thailand',
        'Beroemd om: duiken, snorkelen, mooie stranden en zeeleven',
        'Beste reistijd: februari t/m oktober',
        'Populaire gebieden: Sairee Beach, Chalok Baan Kao, Mae Haad',
      ],
      highlightsTitle: 'Hoogtepunten van het eiland',
      highlights: [
        'Duiklocaties en duikscholen van wereldklasse',
        'Prachtige uitzichtpunten en wandelroutes',
        'Ontspannen uitgaansleven en strandbars',
        'Verse seafood en Thaise keuken',
        'Vriendelijke lokale gemeenschap',
      ],
    },
    en: {
      title: 'About Koh Tao',
      description:
        'Koh Tao, which means "Turtle Island", is a small paradise in the Gulf of Thailand known for crystal-clear water, colorful coral reefs, and a laid-back island vibe. It is one of the best diving destinations in the world and offers activities for every type of traveler.',
      facts: [
        'Location: 70 km off the east coast of Southern Thailand',
        'Famous for: diving, snorkeling, beautiful beaches, and marine life',
        'Best travel season: February to October',
        'Popular areas: Sairee Beach, Chalok Baan Kao, Mae Haad',
      ],
      highlightsTitle: 'Island highlights',
      highlights: [
        'World-class dive sites and dive schools',
        'Beautiful viewpoints and hiking routes',
        'Relaxed nightlife and beach bars',
        'Fresh seafood and Thai cuisine',
        'Friendly local community',
      ],
    },
  };

  const pageContent = isDutch ? content.nl : content.en;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{pageContent.title}</h1>
      <p className="mb-4">{pageContent.description}</p>
      <ul className="list-disc pl-6 mb-4">
        {pageContent.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">{pageContent.highlightsTitle}</h2>
      <ul className="list-disc pl-6">
        {pageContent.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </main>
  );
};

export default KohTaoInfo;
