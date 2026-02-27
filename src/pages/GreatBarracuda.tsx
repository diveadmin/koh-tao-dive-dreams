import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const GreatBarracuda = () => {
  return (
    <MarineLifeDetail
      name="Grote Barracuda"
      scientificName="Sphyraena barracuda"
      description="Indrukwekkende roofvis met messcherpe tanden, bekend om zijn gestroomlijnde zilveren lichaam en jacht in groepen."
      size="Tot 2m (6,5ft), 50kg"
      habitat="Koraalriffen, open water, wrakken"
      conservationStatus="Niet bedreigd"
      diet="Vis, inktvis, schaaldieren"
      behavior="Hinderlaagjager die met snelheid en scherpe tanden in groepen jaagt. Vaak gezien rond pinnacles en wrakken."
      bestTime="Hele jaar"
      frequency="Veelvoorkomend op diepere duiksites"
      detailedDescription="De grote barracuda is een van de meest indrukwekkende roofvissen in de wateren rond Koh Tao, met een strak zilverkleurig lichaam en opvallende rijen scherpe tanden. Deze krachtige jagers kunnen in korte sprints snelheden tot 40 km/u halen. Hoewel ze intimiderend ogen, zijn barracuda's doorgaans niet agressief naar duikers tenzij ze worden geprovoceerd. Je ziet ze vaak op diepere locaties zoals Sail Rock en Chumphon Pinnacle, waar ze in scholen rond granieten formaties jagen. Hun aanwezigheid wijst op een gezond ecosysteem met voldoende prooisoorten."
      interestingFacts={[
        "Barracuda's kunnen snelheden tot 40 km/u halen",
        "Ze hebben twee rijen messcherpe tanden",
        "Ondanks hun uiterlijk vallen ze zelden mensen aan",
        "Ze kunnen tot 2 meter lang worden",
        "Barracuda's jagen in groepen voor meer succes",
        "Ze hebben uitstekend zicht en kunnen gepolariseerd licht waarnemen"
      ]}
      photographyTips={[
        "Fotografeer op veilige afstand om ze niet te laten schrikken",
        "Leg hun gestroomlijnde profiel en scherpe tanden vast",
        "Gebruik snelle sluitertijden om hun bewegingen te bevriezen",
        "Probeer groepsgedrag mee te nemen in je beelden",
        "Fotografeer tegen blauw water voor een sterk effect",
        "Blijf alert op je omgeving wanneer ze in de buurt zijn"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/great-barracuda.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default GreatBarracuda;