import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const SharkIsland = () => {
  return (
    <DiveSiteDetail
      name="Shark Island"
      description="Prachtige paarse zachte boomkoralen en gorgonen met veel onderwaterleven."
      depth="8-20m"
      difficulty="Beginner-gemiddeld"
      location="Zuidkust"
      highlights={["Zeewaaiers", "Zwepkoralen", "Zwartpuntrifhaaien", "Tropische vissen"]}
      detailedDescription="Shark Island ligt aan de zuidkust van Koh Tao en staat bekend om spectaculaire koraalformaties en hoge biodiversiteit. Je vindt hier prachtige paarse zachte boomkoralen en kleurrijke gorgonen, waaronder grote zeewaaiers en dynamische zweepkoralen die meebewegen met de stroming. Zwartpuntrifhaaien worden hier regelmatig gezien terwijl ze langs het rif trekken - daar dankt de site haar naam aan. Het onderwaterlandschap met met koraal bedekte rotsblokken en zandstroken creëert gevarieerde habitats. Door de kleur en het vaak goede zicht is dit een favoriete plek voor onderwaterfotografie."
      bestTime="Hele jaar, uitstekend in droogseizoen"
      current="Licht, meestal rustige omstandigheden"
      visibility="20-30m, uitstekende helderheid"
      marineLife={[
        "Zwartpuntrifhaaien",
        "Diverse rifvissen",
        "Gorgoon-zeewaaiers",
        "Zachte boomkoralen",
        "Anthias",
        "Papegaaivissen en lipvissen",
        "Murenen",
        "Naaktslakken en andere ongewervelden"
      ]}
      tips={[
        "Geschikt voor alle brevetniveaus",
        "Uitstekend voor onderwaterfotografie",
        "Zoek haaien in het blauwe water boven het rif",
        "Verken de koraalformaties met zorg",
        "Geweldige locatie voor observatie van onderwaterleven",
        "Perfect voor langere duiken",
        "Goede plek om fotografietechniek te oefenen",
        "Spaar energie voor de terugzwem"
      ]}
      images={[
        "/images/sharkisand.jpg", // Unique main image for Shark Island
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default SharkIsland;