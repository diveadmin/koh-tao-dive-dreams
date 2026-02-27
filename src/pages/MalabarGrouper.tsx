import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const MalabarGrouper = () => {
  return (
    <MarineLifeDetail
      name="Malabar Tandbaars"
      scientificName="Epinephelus malabaricus"
      description="Grote roofvis uit de tandbaarsfamilie die op dieper water voorkomt, bekend om zijn indrukwekkende formaat en hinderlaagjacht."
      size="Tot 2,3m (7,5ft), 100kg"
      habitat="Diepe riffen, rotsformaties, pinnacles"
      conservationStatus="Niet geëvalueerd"
      diet="Vis, schaaldieren, koppotigen"
      behavior="Hinderlaagjager die zich verschuilt in grotten en spleten en razendsnel toeslaat. Leeft solitair of in paren en gebruikt krachtige zuigvoeding."
      bestTime="Hele jaar"
      frequency="Veelvoorkomend op diepere duiklocaties"
      detailedDescription="De Malabar tandbaars is een van de grootste en meest indrukwekkende tandbaarssoorten op de diepere duiksites van Koh Tao. Deze krachtige roofvis kan prooien snel uit koraalspleten trekken door sterke zuigkracht. Ze zijn relatief schuw en trekken zich vaak terug in grotten wanneer duikers naderen, maar met geduld zijn mooie waarnemingen mogelijk. Door hun formaat en jachtgedrag zijn ze een hoogtepunt van diep rifduiken."
      interestingFacts={[
        "Malabar tandbaarzen kunnen tot 100 kg wegen en 2,3 meter lang worden",
        "Ze gebruiken zuigvoeding om prooi snel uit koraalspleten te halen",
        "In het wild kunnen ze meer dan 40 jaar oud worden",
        "Ze zijn protogyne hermafrodieten: vrouwtjes kunnen mannetjes worden",
        "Ze komen voor in de hele Indo-Pacifische regio in geschikt habitat",
        "Als toppredator spelen ze een belangrijke rol in de rifbalans"
      ]}
      photographyTips={[
        "Gebruik groothoek om hun formaat en diepte goed te tonen",
        "Fotografeer van onderen om kracht en aanwezigheid te benadrukken",
        "Beweeg langzaam en pauzeer regelmatig om ze niet te laten schrikken",
        "Neem rifcontext en grotstructuren mee in je compositie",
        "Probeer zwemmend gedrag en jachtmomenten vast te leggen",
        "Respecteer altijd hun ruimte en houd veilige afstand"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/malabar-grouper.png"
      images={[
        "/images/groouper.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default MalabarGrouper;