import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = {
    headline: isDutch
      ? 'Klein eiland, 21 km², groen en omringd door meer dan 15 duiklocaties.'
      : 'Small island, 21 km², lush and surrounded by more than 15 dive sites.',
    mapAlt: isDutch
      ? 'Kaart van Koh Tao en duiklocaties'
      : 'Map of Koh Tao and dive sites',
    title: isDutch
      ? 'Van PADI Open Water-certificering tot PADI Divemaster-internships'
      : 'From PADI Open Water certifications to PADI Divemaster internships',
    paragraph1: isDutch
      ? 'Koh Tao is niet alleen een topbestemming in Thailand voor je duikvakantie, maar ook ideaal om bijna alle PADI-duikcertificaten te behalen, voor zowel beginners als ervaren duikers.'
      : 'Koh Tao is not only a top destination in Thailand for your diving holiday, but also ideal for completing almost all PADI dive certifications, for both beginners and experienced divers.',
    paragraph2: isDutch
      ? 'Levenslange certificaten die wereldwijd geldig zijn, voor een verrassend lage prijs. Behaal je PADI-duikcertificaat hier voor 9000 baht, nu inclusief 4 overnachtingen (kamer met badkamer) in de cursusprijs.'
      : 'Lifetime certifications valid worldwide, at a surprisingly low price. Earn your PADI diving certification here for 9000 baht, now including 4 nights accommodation (room with private bathroom) in the course price.',
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            WHITE ROCK - TWINS - GREEN ROCK - CHUMPHON PINNACLE - SAIL ROCK - SOUTHWEST PINNACLE - EN MEER
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img
              src="/aamapkohtao.gif"
              alt={content.mapAlt}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {content.title}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {content.paragraph1}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {content.paragraph2}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
