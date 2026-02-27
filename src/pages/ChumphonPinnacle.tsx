import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const ChumphonPinnacle = () => {
  return (
    <DiveSiteDetail
      name="Chumphon Pinnacle"
      description="Granieten pinnacle met uitstekende kans op walvishaaien en grote scholen trevally's."
      depth="15-30m"
      difficulty="Gevorderd"
      location="30 minuten uit de kust"
      highlights={["Walvishaaien", "Scholen trevally", "Adelaarsroggen", "Chevron-barracuda"]}
      detailedDescription="Chumphon Pinnacle is een van de meest spectaculaire diepduiklocaties van Koh Tao, op ongeveer 30 minuten varen uit de kust. Deze granieten pinnacle rijst steil op vanaf de oceaanbodem en vormt een natuurlijke schoonmaakplek voor grote zeedieren. De locatie staat vooral bekend om betrouwbare walvishaaiwaarnemingen, waarbij deze zachte reuzen regelmatig door de diepte cruisen. Grote scholen trevally en chevron-barracuda zorgen voor indrukwekkende scenes, terwijl adelaarsroggen en andere pelagische soorten extra dynamiek geven. De structuur van de pinnacle biedt ook mooie doorgangen en sterke fotomogelijkheden."
      bestTime="Hele jaar, piekseizoen december-april"
      current="Matig, soms sterk"
      visibility="25-35m, uitstekende zichtbaarheid"
      marineLife={[
        "Walvishaaien (regelmatige waarnemingen)",
        "Grote scholen giant trevally",
        "Chevron-barracuda",
        "Adelaarsroggen",
        "Scholen horsmakreel en fusilier",
        "Reuzenbarracuda",
        "Kingfish",
        "Diverse rifvissen"
      ]}
      tips={[
        "Gevorderde certificering aanbevolen door diepte en stroming",
        "Vroege ochtendtrips vergroten kans op wildlife-waarnemingen",
        "Groothoeklens aanbevolen voor grote onderwerpen",
        "Blijf bij je gids bij matige stroming",
        "Perfect voor specialisaties in diepduiken",
        "Walvishaaien zijn vaak actiever bij opkomend tij",
        "Neem een goede onderwatercamera mee"
      ]}
      images={[
        "/images/photo-1682686580849-3e7f67df4015.avif", // Unique main image for Chumphon Pinnacle
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default ChumphonPinnacle;