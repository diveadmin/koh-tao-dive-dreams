import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const Whaleshark = () => {
  return (
    <MarineLifeDetail
      name="Walvishaai"
      scientificName="Rhincodon typus"
      description="De grootste vis ter wereld: deze zachtaardige reuzen eten plankton en kunnen tot 12 meter lang worden."
      size="Tot 12m (40ft), 21 ton"
      habitat="Tropische en warm-gematigde oceanen, kust- en open water"
      conservationStatus="Bedreigd"
      diet="Plankton, kleine vissen, inktvis"
      behavior="Filtervoeder die met open bek zwemt, vaak begeleid door kleine vissen die parasieten verwijderen. Migreren over lange afstanden op zoek naar planktonbloei."
      bestTime="November tot maart (droogseizoen)"
      frequency="Regelmatige waarnemingen, vooral op diepere duiklocaties"
      detailedDescription="De walvishaai is de grootste vis ter wereld en een echte zachte reus van de oceaan. Ondanks hun enorme formaat zijn deze indrukwekkende dieren volledig ongevaarlijk voor mensen en leven ze uitsluitend van plankton en kleine mariene organismen. Koh Tao heeft het voorrecht om regelmatig walvishaaien te zien, vooral tijdens het droogseizoen wanneer planktonbloei deze filtervoeders aantrekt. Je ziet ze vaak op diepere duikplekken zoals Sail Rock en Chumphon Pinnacle, waar ze rustig door het blauwe water glijden en makkelijk herkenbaar zijn aan hun gevlekte patroon."
      interestingFacts={[
        "Walvishaaien kunnen 70-100 jaar oud worden",
        "Ze zijn filtervoeders en kunnen tot 6 ton plankton per dag eten",
        "Elke walvishaai heeft een uniek vlekkenpatroon, zoals een vingerafdruk",
        "Ze kunnen tot 12 meter lang worden en meer dan 20 ton wegen",
        "Ondanks hun grootte zijn ze zachtaardig en geen bedreiging voor duikers",
        "Ze migreren duizenden kilometers op zoek naar voedsel"
      ]}
      photographyTips={[
        "Gebruik een groothoeklens om hun enorme formaat vast te leggen",
        "Fotografeer van onderen en schuin opzij voor een dramatisch effect",
        "Wees geduldig en wacht tot ze rustig dichterbij komen",
        "Neem het vlekkenpatroon duidelijk op in je compositie",
        "Gebruik natuurlijk licht in plaats van flits om ze niet te laten schrikken",
        "Houd je drijfvermogen stabiel om stil in positie te blijven"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      images={[
        "/images/marine-life-hero.webp",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default Whaleshark;