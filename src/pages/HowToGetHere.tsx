import React from 'react';
import { useTranslation } from 'react-i18next';

const HowToGetHere = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const content = {
    nl: {
      title: 'Hoe kom je op Koh Tao',
      subtitle: 'Verschillende routes om dit eilandparadijs te bereiken.',
      optionsTitle: 'Reisopties',
      options: [
        { label: 'Met de ferry:', text: 'Koh Tao is alleen per boot bereikbaar. Ferries vertrekken vanaf Chumphon, Surat Thani, Koh Samui en Koh Phangan. Bekende aanbieders zijn Lomprayah, Songserm en Seatran.' },
        { label: 'Met de trein:', text: 'Reis met de trein van Bangkok naar Chumphon en stap daar over op de ferry.' },
        { label: 'Met de bus:', text: 'Bussen vanuit Bangkok en andere steden sluiten aan op ferryterminals in Chumphon en Surat Thani.' },
        { label: 'Met het vliegtuig:', text: 'Vlieg naar Koh Samui, Chumphon of Surat Thani en neem daarna de ferry naar Koh Tao.' },
      ],
      bookStay: 'Boek verblijf',
      visaInfo: 'Visuminformatie',
      tip: 'Tip: boek ferrytickets in het hoogseizoen op tijd. De meeste ferries komen aan bij Mae Haad Pier.',
      ferryTitle: 'Ferry-opties',
      ferryOptions: [
        { label: 'Speedboot:', text: '1-1,5 uur, duurder maar sneller' },
        { label: 'Nachtferry:', text: 'Goedkopere optie, aankomst in de ochtend' },
        { label: 'Dagferry:', text: 'Standaardoptie met mooie uitzichten' },
        { label: '', text: 'Bekijk websites van operators voor schema’s en kortingen' },
      ],
    },
    en: {
      title: 'How to get to Koh Tao',
      subtitle: 'Different routes to reach this island paradise.',
      optionsTitle: 'Travel options',
      options: [
        { label: 'By ferry:', text: 'Koh Tao is only accessible by boat. Ferries depart from Chumphon, Surat Thani, Koh Samui, and Koh Phangan. Popular operators include Lomprayah, Songserm, and Seatran.' },
        { label: 'By train:', text: 'Take a train from Bangkok to Chumphon and transfer to the ferry there.' },
        { label: 'By bus:', text: 'Buses from Bangkok and other cities connect to ferry terminals in Chumphon and Surat Thani.' },
        { label: 'By plane:', text: 'Fly to Koh Samui, Chumphon, or Surat Thani and then take a ferry to Koh Tao.' },
      ],
      bookStay: 'Book accommodation',
      visaInfo: 'Visa information',
      tip: 'Tip: book ferry tickets early during high season. Most ferries arrive at Mae Haad Pier.',
      ferryTitle: 'Ferry options',
      ferryOptions: [
        { label: 'Speed boat:', text: '1-1.5 hours, more expensive but faster' },
        { label: 'Night ferry:', text: 'Cheaper option, arrival in the morning' },
        { label: 'Day ferry:', text: 'Standard option with scenic views' },
        { label: '', text: 'Check operator websites for schedules and discounts' },
      ],
    },
  };
  const pageContent = isDutch ? content.nl : content.en;

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/sailrock.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{pageContent.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{pageContent.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{pageContent.optionsTitle}</h2>
      <ul className="list-disc pl-6 mb-4">
        {pageContent.options.map((option) => (
          <li key={option.label + option.text}><strong>{option.label}</strong> {option.text}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{pageContent.bookStay}</a>
        <a href="/VisasKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{pageContent.visaInfo}</a>
      </div>
      <p className="text-sm text-gray-500">{pageContent.tip}</p>
    </section>

    {/* Ferry Options Section */}
    <section className="bg-gray-50 rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{pageContent.ferryTitle}</h3>
      <ul className="list-disc pl-6 mb-2">
        {pageContent.ferryOptions.map((option) => (
          <li key={option.label + option.text}>{option.label ? <strong>{option.label}</strong> : null} {option.text}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default HowToGetHere;
