import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Klein eiland, 21 km², groen en omringd door meer dan 15 duiklocaties.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            WHITE ROCK - TWINS - GREEN ROCK - CHUMPHON PINNACLE - SAIL ROCK - SOUTHWEST PINNACLE - EN MEER
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img
              src="/aamapkohtao.gif"
              alt="Kaart van Koh Tao en duiklocaties"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Van PADI Open Water-certificering tot PADI Divemaster-internships
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Koh Tao is niet alleen een topbestemming in Thailand voor je duikvakantie, maar ook ideaal om bijna alle PADI-duikcertificaten te behalen, voor zowel beginners als ervaren duikers.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Levenslange certificaten die wereldwijd geldig zijn, voor een verrassend lage prijs. Behaal je PADI-duikcertificaat hier voor 9000 baht, nu inclusief 4 overnachtingen (kamer met badkamer) in de cursusprijs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
