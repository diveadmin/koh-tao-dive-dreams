import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const Twins = () => {
  return (
    <DiveSiteDetail
      name="Twins Pinnacle"
      description="De populairste duiksite van Koh Tao met drie granieten pinnacles, rijk onderwaterleven en geschikt voor alle brevetniveaus."
      depth="5-20m"
      difficulty="Beginner tot gemiddeld"
      location="Westkust van Koh Nang Yuan"
      highlights={["Drie granieten pinnacles", "Boog en rotsformaties", "Rijk onderwaterleven", "Perfect voor training", "Rustige omstandigheden", "Anemonen met clownvissen"]}
      detailedDescription="Twins Pinnacle is waarschijnlijk de meest populaire duiksite van Koh Tao en ideaal voor recreatief duiken en PADI-trainingen. De site heeft drie duidelijke pieken: twee grotere groepen met koraal bedekte rotsblokken en een kleinere, diepere rotsgroep verder naar het westen. Samen vormen ze een oost-west as die eenvoudig te navigeren is. De naam verwijst waarschijnlijk naar de twee hoofdformaties onder water of naar de twee pieken van Koh Nang Yuan die op de site uitkijken. Door de beschutte ligging en relatieve bescherming tegen moessonweer biedt Twins bijna altijd fijne duikomstandigheden en veel leven. De plek is bekend om macro-onderwerpen en variatie in rifvissen, en daardoor perfect voor fotografie, soortherkenning en drijfvermogenoefeningen."
      bestTime="Hele jaar, beste periode november-mei"
      current="Bijna het hele jaar vlak water met zeer weinig stroming"
      visibility="Gemiddeld 5-20 meter"
      marineLife={[
        "Zadel-clownvis en Sebae-anemonen (bekende bewoners)",
        "Naaktslakken",
        "Pijpvissen",
        "Gele koffervis",
        "Longface emperor",
        "White's vlindervis",
        "Keizersvissen (o.a. six-banded)",
        "Rifvissen",
        "Murenen",
        "Trevally",
        "Blauwgestippelde lintstaartrog",
        "Snapper",
        "Tandbaarzen (gemarmerde)",
        "Papegaaivissen",
        "Diverse lipvissen",
        "Bannerfish",
        "Zeeschildpadden",
        "Scribbled filefish",
        "Anemoonvissen",
        "Koffervissen en wratslakken"
      ]}
      tips={[
        "Perfect voor Open Water-duikers en trainingsduiken",
        "Verken eerst de diepere westelijke piek en kleine rotsen voor longface emperor en pijpvissen",
        "Navigeer naar de middelste piek en bekijk de boog aan de noordzijde (goed drijfvermogen nodig)",
        "Kijk onder overhangen bij de ondiepe piek voor blauwgestippelde roggen en snapper",
        "Mis de bekende clownvis met Sebae-anemoon ten zuidoosten van de middelste pinnacle niet",
        "Let op: rond de beroemde clownvis is een stenen cirkel gemaakt - ga daar niet binnen",
        "Geweldig voor macrofotografie en visherkenning",
        "Oefen drijfvermogen op de boog en rotsformaties",
        "Als drijfvermogen lastig is, is nabijgelegen Buoyancy World speciaal daarvoor ingericht",
        "Uitstekend voor mariene bewustwording en herkenningscursussen",
        "Eenvoudige navigatie dankzij de drie pieken als routepunten"
      ]}
      images={[
        "/images/twins-header.png",
        "/images/twins.jpg",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif"
      ]}
    />
  );
};

export default Twins;
