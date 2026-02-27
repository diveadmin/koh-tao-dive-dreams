import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const BandedSeaKrait = () => {
  return (
    <MarineLifeDetail
      name="Gebandeerde Zeekrait"
      scientificName="Laticauda colubrina"
      description="Giftige zeeslang met opvallende zwarte en blauwe banden, jaagt op vis en palingen in ondiepe rifzones."
      size="Tot 1,5m (5ft)"
      habitat="Ondiepe riffen, zeegrasvelden, koraalgebieden"
      conservationStatus="Niet geëvalueerd"
      diet="Vis, palingen, kleine schaaldieren"
      behavior="Actieve jager die elke 30-40 minuten naar de oppervlakte moet om lucht te halen; meestal niet agressief naar duikers, vooral actief in de schemer en nacht."
      bestTime="Hele jaar"
      frequency="Af en toe waargenomen in ondiepe gebieden"
      detailedDescription="De gebandeerde zeekrait is een van de meest intrigerende zeedieren in het ondiepe water rond Koh Tao. Hoewel het een van de giftigste zeeslangen ter wereld is, is deze soort meestal rustig en bijt zelden tenzij geprovoceerd. Door het duidelijke zwart-blauwe bandenpatroon zijn ze goed herkenbaar. Het observeren van hun jachtgedrag op ondiepe riffen is een bijzondere ervaring. Omdat ze elke 30-40 minuten aan de oppervlakte moeten ademen, ontstaan er mooie kansen voor observatie en fotografie."
      interestingFacts={[
        "Gebandeerde zeekraiten behoren tot de giftigste zeeslangen ter wereld",
        "Ondanks hun gif bijten ze mensen zelden, tenzij sterk geprovoceerd",
        "Ze moeten elke 30-40 minuten naar de oppervlakte om lucht te halen",
        "Ze hebben een afgeplatte staart die als roer werkt tijdens het zwemmen",
        "Ze zijn eierlevendbarend en brengen levende jongen ter wereld",
        "Hun kleurpatroon werkt als waarschuwing voor mogelijke roofdieren"
      ]}
      photographyTips={[
        "Houd altijd minimaal 1-2 meter veilige afstand",
        "Gebruik tele- of macrolens zodat je niet te dichtbij hoeft te komen",
        "Raak ze nooit aan en probeer ze niet in te sluiten",
        "Fotografeer frontaal of zijwaarts om het bandenpatroon te tonen",
        "Blijf geduldig en stil en laat het dier natuurlijk bewegen",
        "Beweeg langzaam weg als het dier jouw kant op lijkt te komen"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/snakecamo.png"
      images={[
        "/images/seasnake.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default BandedSeaKrait;