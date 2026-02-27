import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const HTMSSattakut = () => {
  return (
    <DiveSiteDetail
      name="HTMS Sattakut"
      description="Voormalig US Navy-schip uit WOII, door de Thaise marine geschonken en nu een bloeiend kunstmatig rif."
      depth="18-30m"
      difficulty="Gevorderd"
      location="Tussen de eilanden"
      highlights={["Wrakduiken", "Onderwaterleven", "Doorgangen", "Historische waarde"]}
      detailedDescription="HTMS Sattakut is een fascinerend voormalig US Navy-schip uit de Tweede Wereldoorlog dat in 2011 bewust is afgezonken om een kunstmatig rif te vormen. Dit wrak van circa 30 meter ligt tussen Koh Tao en Koh Nang Yuan op 18-30 meter diepte. Inmiddels is het uitgegroeid tot een levendig rif, bedekt met koralen en bewoond door uiteenlopend onderwaterleven. De scheepsstructuur biedt interessante doorgangen, van machinekamer tot brug. Grote tandbaarzen, snappers en barracuda's gebruiken het wrak als leefgebied, waardoor dit een topbestemming is voor wrakduiken in Zuidoost-Azië."
      bestTime="Hele jaar, beste in droogseizoen"
      current="Licht tot matig, meestal voorspelbaar"
      visibility="15-25m, goed zicht rondom het wrak"
      marineLife={[
        "Malabar tandbaarzen (resident)",
        "Reuzenbarracuda",
        "Scholen snapper en fusilier",
        "Murenen",
        "Koraalduivels en schorpioenvissen",
        "Koraalgroei op wrakstructuur",
        "Diverse rifvissen",
        "Kogelvissen en trekkervissen"
      ]}
      tips={[
        "Gevorderde certificering vereist voor wrakduiken",
        "Uitstekende site voor wrakspecialisaties",
        "Respecteer de historische betekenis van deze locatie",
        "Gebruik passende wrakduiktechnieken en penetratievaardigheden",
        "Blijf bij je gids bij verkenning van het interieur",
        "Zeer geschikt voor onderwaterfotografie",
        "Spaar lucht door diepte en verkenning",
        "Let op de historische kenmerken van het schip"
      ]}
      images={[
        "/images/htms-sattakut-wreck.jpg", // Unique main image for HTMS Sattakut
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default HTMSSattakut;