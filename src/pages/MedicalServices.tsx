import React from 'react';

const MedicalServices = () => (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center bg-cover bg-center mb-8" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/medical.png')" }}>
      <div className="text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Medische zorg op Koh Tao</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">Gezondheidszorg en nooddiensten, 24/7 beschikbaar.</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-white rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Zorg & noodgevallen</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Meerdere klinieken en apotheken in Mae Haad en Sairee</li>
        <li>Basiszorg en eerste hulp beschikbaar</li>
        <li>Nooddiensten: bel <strong>1669</strong></li>
        <li>Dichtstbijzijnde ziekenhuis ligt op Koh Samui (boottransfer nodig bij ernstige gevallen)</li>
        <li>Recompressiekamer voor duiknoodgevallen</li>
      </ul>
      <p className="mb-4">Een goede reisverzekering wordt sterk aangeraden. Neem noodzakelijke medicijnen op recept zelf mee, beschikbaarheid kan beperkt zijn.</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/HowToGetHere" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Reisinformatie</a>
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Wellnessactiviteiten</a>
      </div>
    </section>

    {/* Important Info Section */}
    <section className="bg-red-50 rounded-lg shadow p-6 md:p-10 border-l-4 border-red-600">
      <h3 className="text-xl font-semibold mb-2 text-red-700">Belangrijke informatie</h3>
      <ul className="list-disc pl-6 mb-2 text-red-900">
        <li>Regel een reis- en zorgverzekering voordat je aankomt</li>
        <li>Malariapreventie kan zinvol zijn — overleg met een arts</li>
        <li>De zon is sterk — gebruik zonnebrand met hoge SPF</li>
        <li>Uitdroging komt vaak voor — drink voldoende water</li>
      </ul>
    </section>
  </main>
);

export default MedicalServices;
