import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const GreenSeaTurtle = () => {
  return (
    <MarineLifeDetail
      name="Groene Zeeschildpad"
      scientificName="Chelonia mydas"
      description="Plantenetende zeeschildpadden die op zeegras en algen grazen en zo gezonde mariene ecosystemen helpen behouden."
      size="Tot 1,5m (5ft), 150-200kg"
      habitat="Ondiep kustwater, zeegrasvelden, koraalriffen"
      conservationStatus="Bedreigd"
      diet="Zeegras, algen, zeeplanten"
      behavior="Brengt het grootste deel van de tijd grazend door op zeegrasvelden en migreert over lange afstanden om te nestelen. Jonge schildpadden maken een gevaarlijke tocht van strand naar zee."
      bestTime="Hele jaar, vooral in ondiepe baaien"
      frequency="Veelvoorkomend in geschikte leefgebieden"
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      detailedDescription="De groene zeeschildpad is een van de meest voorkomende zeeschildpadden rond Koh Tao en speelt een belangrijke rol in de gezondheid van zeegrasvelden en koraalriffen. Deze rustige planteneters brengen hun dagen door met grazen op zeegras en algen, waardoor deze habitats in balans blijven. Volwassen dieren worden vaak gezien in ondiepe baaien en rifgebieden, terwijl jonge schildpadjes soms te zien zijn tijdens hun risicovolle tocht van het neststrand naar open zee. Beschermingsmaatregelen in Thailand hebben geholpen deze oeroude zeereizigers te beschermen, en een ontmoeting in het wild blijft altijd bijzonder."
      interestingFacts={[
        "Groene zeeschildpadden kunnen tot 80 jaar oud worden",
        "Ze zijn genoemd naar hun groene lichaamsvet, niet naar hun schild",
        "Vrouwtjes keren terug naar het strand waar ze zelf uitkwamen om eieren te leggen",
        "Tijdens rust kunnen ze tot 7 uur hun adem inhouden",
        "Jonge schildpadjes moeten binnen 72 uur de zee bereiken om te overleven",
        "Ze migreren duizenden kilometers tussen foerageer- en nestgebieden"
      ]}
      photographyTips={[
        "Benader langzaam en vermijd plotselinge bewegingen",
        "Fotografeer op waterniveau voor een sterke perspectiefwerking",
        "Neem ook de leefomgeving van de schildpad mee in je compositie",
        "Gebruik natuurlijk licht en vermijd flits",
        "Wees geduldig en laat de schildpad naar jou toe komen",
        "Respecteer hun ruimte en jaag ze niet op"
      ]}
      images={[
        "/images/green-sea-turtle.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default GreenSeaTurtle;