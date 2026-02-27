import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const JapaneseGardens = () => {
  return (
    <DiveSiteDetail
      name="Japanese Gardens"
      description="Divers koraalrif met kleurrijk onderwaterleven en mooie doorgangen."
      depth="12-25m"
      difficulty="Gemiddeld"
      location="Nabij Koh Nang Yuan"
      highlights={["Roze staarttrekker", "Gevlekte adelaarsrog", "Kleurrijk koraal", "Gemarmerde octopus"]}
      detailedDescription="Japanese Gardens ligt bij Koh Nang Yuan en biedt een van de meest diverse koraalrifecosystemen van Thailand. Deze duiklocatie voor gemiddeld niveau heeft een indrukwekkende variatie aan koraalformaties, van kleurrijke zachte koralen tot grote gorgonen. De site staat bekend om gezonde koraaldekking en veel onderwaterleven. De roze staarttrekker, die elders rond Koh Tao minder vaak wordt gezien, maakt deze plek extra bijzonder. Gevlekte adelaarsroggen en gemarmerde octopussen verhogen de biodiversiteit. Het onderwaterlandschap met doorgangen, kleine grotten en met koraal begroeide rotsblokken biedt ideaal leefgebied voor veel soorten."
      bestTime="Hele jaar, beste zicht november-mei"
      current="Licht tot matig, meestal rustig"
      visibility="20-30m, goed helder"
      marineLife={[
        "Roze staarttrekker (bijzonder voor deze site)",
        "Gevlekte adelaarsrog",
        "Gemarmerde octopus",
        "Blauwgeringde octopus",
        "Naaktslakken en platwormen",
        "Anthias en juffervissen",
        "Papegaaivissen en lipvissen",
        "Murenen en koraalduivels"
      ]}
      tips={[
        "Gemiddeld niveau aanbevolen voor optimaal duikplezier",
        "Perfect voor onderwaterfotografie en macro-onderwerpen",
        "Zoek in zandgebieden naar de zeldzamere roze staarttrekker",
        "Verken de koraalformaties en kleine doorgangen",
        "Uitstekend voor cursussen soortherkenning",
        "Rustig water maakt langere duiken mogelijk",
        "Goede locatie om drijfvermogen te oefenen"
      ]}
      images={[
        "/images/japanandwins.jpg", // Unique main image for Japanese Gardens
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif"
      ]}
    />
  );
};

export default JapaneseGardens;