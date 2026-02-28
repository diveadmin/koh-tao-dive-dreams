import React from 'react';
import { useTranslation } from 'react-i18next';

const MedicalServices = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const content = {
    nl: {
      title: 'Medische zorg op Koh Tao',
      subtitle: 'Gezondheidszorg en nooddiensten, 24/7 beschikbaar.',
      careTitle: 'Zorg & noodgevallen',
      care: [
        'Meerdere klinieken en apotheken in Mae Haad en Sairee',
        'Basiszorg en eerste hulp beschikbaar',
        'Nooddiensten: bel 1669',
        'Dichtstbijzijnde ziekenhuis ligt op Koh Samui (boottransfer nodig bij ernstige gevallen)',
        'Recompressiekamer voor duiknoodgevallen',
      ],
      insurance:
        'Een goede reisverzekering wordt sterk aangeraden. Neem noodzakelijke medicijnen op recept zelf mee, beschikbaarheid kan beperkt zijn.',
      travelInfo: 'Reisinformatie',
      wellness: 'Wellnessactiviteiten',
      importantTitle: 'Belangrijke informatie',
      important: [
        'Regel een reis- en zorgverzekering voordat je aankomt',
        'Malariapreventie kan zinvol zijn — overleg met een arts',
        'De zon is sterk — gebruik zonnebrand met hoge SPF',
        'Uitdroging komt vaak voor — drink voldoende water',
      ],
    },
    en: {
      title: 'Medical services on Koh Tao',
      subtitle: 'Healthcare and emergency services, available 24/7.',
      careTitle: 'Care & emergencies',
      care: [
        'Multiple clinics and pharmacies in Mae Haad and Sairee',
        'Basic care and first aid available',
        'Emergency services: call 1669',
        'Nearest hospital is on Koh Samui (boat transfer required for serious cases)',
        'Recompression chamber for diving emergencies',
      ],
      insurance:
        'Comprehensive travel insurance is strongly recommended. Bring essential prescription medication yourself, as availability may be limited.',
      travelInfo: 'Travel information',
      wellness: 'Wellness activities',
      importantTitle: 'Important information',
      important: [
        'Arrange travel and health insurance before arrival',
        'Malaria prevention may be useful — consult a doctor',
        'The sun is strong — use high-SPF sunscreen',
        'Dehydration is common — drink enough water',
      ],
    },
  };
  const pageContent = isDutch ? content.nl : content.en;

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/medical.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{pageContent.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{pageContent.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{pageContent.careTitle}</h2>
      <ul className="list-disc pl-6 mb-4">
        {pageContent.care.map((item) => (
          <li key={item}>{item === 'Nooddiensten: bel 1669' || item === 'Emergency services: call 1669' ? <>{item.split('1669')[0]}<strong>1669</strong></> : item}</li>
        ))}
      </ul>
      <p className="mb-4">{pageContent.insurance}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/HowToGetHere" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{pageContent.travelInfo}</a>
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{pageContent.wellness}</a>
      </div>
    </section>

    {/* Important Info Section */}
    <section className="bg-red-50 rounded-lg shadow p-6 md:p-10 border-l-4 border-red-600">
      <h3 className="text-xl font-semibold mb-2 text-red-700">{pageContent.importantTitle}</h3>
      <ul className="list-disc pl-6 mb-2 text-red-900">
        {pageContent.important.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default MedicalServices;
