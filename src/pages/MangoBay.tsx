import React from 'react';
import DiveSiteDetail from '../components/DiveSiteDetail';

const MangoBay = () => {
  return (
    <DiveSiteDetail
      name="Mango Bay"
      description="Ondiepe koraalriffen, perfect voor ontspannen duiken met een levendig marien ecosysteem."
      depth="5-18m"
      difficulty="Beginner"
      location="Baai aan de westkust"
      highlights={["Kleurrijk koraal", "Rifvissen", "Zeeanemonen"]}
      detailedDescription="Mango Bay is een mooie ondiepe duiklocatie aan de westkust van Koh Tao, ideaal voor beginners en duikers die rustig willen duiken. De site heeft een gezond rifecosysteem met kleurrijke harde en zachte koralen, zeeanemonen en veel onderwaterleven. Door de geringe diepte is de plek geschikt voor langere duiken en herhaalde verkenning van hetzelfde gebied. De beschutte ligging van de baai zorgt voor kalm water en goed zicht, waardoor het een uitstekende plek is om duikvaardigheden te leren en ontspannen van de onderwaterwereld te genieten."
      bestTime="Hele jaar, beste bij rustig weer"
      current="Zeer licht, beschutte baai"
      visibility="15-25m, goed zicht in beschut water"
      marineLife={[
        "Kleurrijke rifvissen",
        "Clownvissen en anemonen",
        "Papegaaivissen en lipvissen",
        "Vlindervissen",
        "Diverse keizersvissen",
        "Kleine rifhaaien"
      ]}
      tips={[
        "Perfect voor beginners en trainingsduiken",
        "Ook uitstekend geschikt om te snorkelen",
        "Kijk uit naar grazers in zeegras en rifleven",
        "Mooie plek voor onderwaterfotografie",
        "Rustig water ideaal om drijfvermogen te leren",
        "Meerdere koraalbommies om te verkennen",
        "Geschikt voor langere duiken",
        "Perfect voor Open Water-brevetduiken"
      ]}
      fullHeightHero={true}
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/mango-bay.webp",
        "/images/photo-1613853250147-2f73e55c1561.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default MangoBay;