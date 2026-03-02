import React from 'react';
import { useTranslation } from 'react-i18next';

const WeatherKohTao = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const content = {
    nl: {
      title: 'Weer op Koh Tao',
      subtitle: 'Plan je reis met inzicht in het tropische klimaat van Koh Tao.',
      climateTitle: 'Klimaat & seizoenen',
      climate: [
        'Droog seizoen: februari t/m oktober, warm en zonnig',
        'Regenseizoen: november t/m januari, korte maar hevige buien',
        'Gemiddelde temperatuur: 28–32°C',
        'Zeetemperatuur: 27–30°C',
      ],
      paragraph:
        'De meeste activiteiten zijn het hele jaar mogelijk, maar controleer de voorspelling voordat je een boottrip plant. Het droge seizoen biedt meestal de beste duikomstandigheden met kalme zee en goed zicht.',
      planActivities: 'Plan activiteiten',
      goDiving: 'Ga duiken',
      packingTitle: 'Wat neem je mee',
      packing: [
        'Zonnebrand met hoge SPF (reef-safe)',
        'Lichte, ademende kleding',
        'Regenjas of poncho (voor het regenseizoen)',
        'Waterdichte tas voor elektronica',
        'Pet/hoed en zonnebril',
        'Sneldrogende kleding voor wateractiviteiten',
      ],
    },
    en: {
      title: 'Weather on Koh Tao',
      subtitle: 'Plan your trip with insight into Koh Tao’s tropical climate.',
      climateTitle: 'Climate & seasons',
      climate: [
        'Dry season: February to October, warm and sunny',
        'Rainy season: November to January, short but heavy showers',
        'Average temperature: 28–32°C',
        'Sea temperature: 27–30°C',
      ],
      paragraph:
        'Most activities are possible year-round, but check the forecast before planning a boat trip. The dry season usually offers the best diving conditions with calm seas and good visibility.',
      planActivities: 'Plan activities',
      goDiving: 'Go diving',
      packingTitle: 'What to pack',
      packing: [
        'High-SPF reef-safe sunscreen',
        'Lightweight, breathable clothing',
        'Rain jacket or poncho (for rainy season)',
        'Waterproof bag for electronics',
        'Cap/hat and sunglasses',
        'Quick-dry clothing for water activities',
      ],
    },
  };
  const pageContent = isDutch ? content.nl : content.en;

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/weather.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{pageContent.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{pageContent.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{pageContent.climateTitle}</h2>
      <ul className="list-disc pl-6 mb-4">
        {pageContent.climate.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mb-4">{pageContent.paragraph}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{pageContent.planActivities}</a>
        <a href="/fun-diving-koh-tao" className="inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition">{pageContent.goDiving}</a>
      </div>
    </section>

    {/* Packing Tips Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{pageContent.packingTitle}</h3>
      <ul className="list-disc pl-6 mb-2">
        {pageContent.packing.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default WeatherKohTao;
