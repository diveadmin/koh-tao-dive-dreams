import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const HawksbillSeaTurtle = () => {
  return (
    <MarineLifeDetail
      name="Karetschildpad"
      scientificName="Eretmochelys imbricata"
      description="Prachtige zeeschildpad met een kenmerkende snavelvormige bek, bekend om het eten van sponzen en het kleurrijke schild."
      size="Tot 1m (3,3ft), 50-80kg"
      habitat="Koraalriffen, rotsachtige zones, kustwater"
      conservationStatus="Ernstig bedreigd"
      diet="Sponzen, zakpijpen, kwallen"
      behavior="Gespecialiseerde sponseter die sponspopulaties op riffen helpt reguleren. Veel schuwer en moeilijker te benaderen dan andere schildpadden."
      bestTime="Hele jaar"
      frequency="Minder vaak gezien dan groene zeeschildpadden"
      detailedDescription="De karetschildpad is een ernstig bedreigde soort met een karakteristieke snavelbek die perfect is aangepast om sponzen en andere kleine organismen uit spleten te halen. Hun prachtige schild heeft overlappende schubben die een mozaïekpatroon vormen. Ze spelen een belangrijke rol in het rifecosysteem door sponsgroei te beperken. Karetschildpadden zijn veel schuwer dan groene zeeschildpadden en vereisen rustige, geduldige observatie. Hun aanwezigheid is een teken van een gezond rif, waardoor elke waarneming extra bijzonder is voor duikers en snorkelaars."
      interestingFacts={[
        "Karetschildpadden hebben een snavelachtige bek voor het eten van sponzen",
        "Hun schild werd vroeger gebruikt voor schildpadproducten (nu illegaal)",
        "Ze kunnen tot 35 minuten onder water blijven",
        "Vrouwtjes nestelen elke 2-3 jaar en leggen 3-5 legsels per seizoen",
        "Ze hebben een van de mooiste schildpatronen van alle zeeschildpadden",
        "Karetschildpadden zijn de meest tropische van alle zeeschildpaddensoorten"
      ]}
      photographyTips={[
        "Ga uiterst voorzichtig te werk - ze zijn erg schuw",
        "Fotografeer op afstand om verstoring te voorkomen",
        "Neem de karakteristieke snavel duidelijk op in je foto's",
        "Leg het mooie patroon van het schild vast",
        "Gebruik natuurlijk licht en indien mogelijk een langere lens",
        "Wees voorbereid op snelle, plotselinge bewegingen"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/hawksbill-sea-turtle.jpg",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default HawksbillSeaTurtle;