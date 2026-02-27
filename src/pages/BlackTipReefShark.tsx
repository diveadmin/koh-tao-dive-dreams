import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const BlackTipReefShark = () => {
  return (
    <MarineLifeDetail
      name="Zwartpuntrifhaai"
      scientificName="Carcharhinus melanopterus"
      description="Veelvoorkomende rifhaai met herkenbare zwarte puntjes op de vinnen, belangrijk voor een gezond koraalrifecosysteem."
      size="Tot 2m (6,5ft), 13kg"
      habitat="Koraalriffen, ondiep kustwater"
      conservationStatus="Bijna bedreigd"
      diet="Vis, schaaldieren, koppotigen"
      behavior="Actieve jager overdag, rust 's nachts in grotten. Speelt een belangrijke rol in het reguleren van vispopulaties op riffen."
      bestTime="Hele jaar, vooral tijdens het voortplantingsseizoen"
      frequency="Zeer veelvoorkomend op ondiepe riffen"
      detailedDescription="De zwartpuntrifhaai is een van de meest geziene haaisoorten op de riffen van Koh Tao en is cruciaal voor de ecologische balans. De soort is genoemd naar de zwarte uiteinden van de vinnen. Overdag patrouilleren ze actief over het rif en rusten ze soms in kleine grotten. Ze zijn doorgaans niet agressief richting mensen en zorgen voor een spannende maar veilige duikervaring. Tijdens het voortplantingsseizoen zijn jonge haaien extra vaak te zien, wat mooie fotokansen geeft voor duikers en snorkelaars."
      interestingFacts={[
        "Zwartpuntrifhaaien kunnen tot 12 jaar oud worden",
        "Ze krijgen levende jongen (levendbarend)",
        "Vrouwtjes kunnen tot 4 jongen per worp krijgen",
        "Ze zijn vooral overdag actief",
        "Ondanks hun naam zijn ze meestal ongevaarlijk voor mensen",
        "Ze helpen vispopulaties op koraalriffen in balans te houden"
      ]}
      photographyTips={[
        "Benader langzaam en rustig",
        "Fotografeer van onderen voor krachtige vinbeelden",
        "Zorg dat de zwarte vinpunten duidelijk in beeld zijn",
        "Gebruik beschikbaar licht voor natuurlijke kleuren",
        "Wees geduldig en laat de haai naar jou toe komen",
        "Leg zowel zwemmend als rustend gedrag vast"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/blacktip-reef-shark.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default BlackTipReefShark;