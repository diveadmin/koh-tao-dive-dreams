import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const SailRock = () => {
  return (
    <DiveSiteDetail
      name="Sail Rock"
      description="Dé top-diepduiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda's."
      depth="18-40m"
      difficulty="Gevorderd"
      location="40 minuten uit de kust"
      highlights={["Walvishaaien", "Reuzenbarracuda", "Malabar tandbaars", "Zeilvis"]}
      detailedDescription="Sail Rock wordt algemeen beschouwd als de beste duiksite in de Golf van Thailand. Deze imposante granieten pinnacle ligt op ongeveer 40 minuten varen van Koh Tao en stijgt op vanuit diepblauw water tot circa 18 meter onder het oppervlak. De site is beroemd om de 'Chimney': een verticale swim-through die een natuurlijke stroming creëert en grote pelagische vissen aantrekt. Walvishaaien worden hier regelmatig gezien, samen met enorme scholen snappers, fusiliers en chevron-barracuda's. Ook adelaarsroggen en zeilvissen verschijnen hier vaak, wat het een spectaculaire diepduikervaring maakt."
      bestTime="Hele jaar, beste periode in droogseizoen (december-mei)"
      current="Matig tot sterk, kan uitdagend zijn"
      visibility="20-30m, uitstekende helderheid"
      marineLife={[
        "Walvishaaien (regelmatige waarnemingen)",
        "Scholen reuzenbarracuda",
        "Malabar tandbaars",
        "Zeilvis en adelaarsrog",
        "Chevron-barracuda",
        "Grote scholen snapper en fusilier",
        "Koningsmakreel",
        "Gemarmerde tandbaars"
      ]}
      tips={[
        "Gevorderde certificering vereist - dit is een diepduiksite",
        "Stromingsbewustzijn is essentieel - blijf bij je gids",
        "Gebruik een duikcomputer voor nauwkeurige diepte- en tijdsbewaking",
        "Walvishaaien zijn vaak actiever in de ochtend - vroeg vertrek aanbevolen",
        "Neem een groothoeklens mee voor grote pelagische soorten",
        "Spaar lucht in verband met diepte en mogelijke stroming",
        "Perfect voor specialisaties in diepduiken"
      ]}
      images={[
        "/images/sailrock.webp", // Unique main image for Sail Rock
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default SailRock;