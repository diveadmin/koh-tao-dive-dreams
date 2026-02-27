import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const BeardedScorpionFish = () => {
  return (
    <MarineLifeDetail
      name="Baardschorpioenvis"
      scientificName="Scorpaenopsis barbata"
      description="Meester in camouflage met giftige stekels, perfect vermomd als koraal en spons."
      size="Tot 30cm (12 inch)"
      habitat="Koraalriffen, rotsachtige zones, diep rif"
      conservationStatus="Niet geëvalueerd"
      diet="Vis, schaaldieren"
      behavior="Hinderlaagjager die urenlang roerloos blijft; gebruikt extreme camouflage om te jagen en giftige stekels ter verdediging."
      bestTime="Hele jaar, actiever in de nacht"
      frequency="Niet heel algemeen, vraagt nauwkeurige observatie en ervaren gidsen"
      detailedDescription="De baardschorpioenvis is een van de lastigst te vinden vissen in de wateren rond Koh Tao en een echte vermommingsspecialist. Hij lijkt vaak perfect op omliggend koraal, spons en rifstructuur en blijft lange tijd stil liggen tot een prooi binnen bereik komt. Het vinden van deze cryptische roofvis vraagt geduld, goed kijkwerk en een ervaren gids. De giftige stekels dienen als bescherming tegen predatoren."
      interestingFacts={[
        "Baardschorpioenvissen hebben giftige stekels voor verdediging",
        "Ze zijn zo cryptisch dat ze dagenlang op dezelfde plek kunnen blijven",
        "Ze kunnen meerdere texturen en kleuren tegelijk nabootsen",
        "Ze hebben een traag metabolisme en bewegen weinig",
        "Voor ongetrainde ogen zijn ze bijna onzichtbaar",
        "Hun camouflage behoort tot de beste in het rifecosysteem"
      ]}
      photographyTips={[
        "Gebruik een macrolens en laat je helpen door een gids om ze eerst te vinden",
        "Scan rifoppervlakken zorgvuldig op subtiele kleur- en textuurverschillen",
        "Gebruik focuslicht om details zichtbaar te maken",
        "Wees klaar om snel te fotograferen zodra je er één ziet",
        "Neem de omliggende rifcontext mee in je compositie",
        "Veel geduld en een goede duikgids zijn essentieel"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/sscorpio2.png"
      images={[
        "/images/bearded-scorpionfish.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default BeardedScorpionFish;