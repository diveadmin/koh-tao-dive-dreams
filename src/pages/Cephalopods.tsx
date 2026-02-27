import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const Cephalopods = () => {
  return (
    <MarineLifeDetail
      name="Koppotigen"
      scientificName="Diverse soorten (Cephalopoda)"
      description="Intelligente ongewervelden zoals octopussen en inktvissen, meesters in camouflage en probleemoplossing."
      size="5cm-3m afhankelijk van soort"
      habitat="Koraalriffen, zandvlaktes, rotszones, diep water"
      conservationStatus="Niet geëvalueerd"
      diet="Vis, schaaldieren, weekdieren, andere koppotigen"
      behavior="Meesters in camouflage; veranderen in seconden van kleur en textuur, leven vaak solitair en jagen vooral in de schemer of nacht."
      bestTime="Hele jaar, actiever bij zonsopkomst en zonsondergang"
      frequency="Regelmatige waarnemingen met geduld en macrolens"
      detailedDescription="Koppotigen behoren tot de meest fascinerende ongewervelden in de wateren van Koh Tao. Met hun hoge intelligentie, probleemoplossend vermogen en directe camouflage horen ze bij de meest geavanceerde ongewervelde dieren op aarde. Hun vermogen om binnen milliseconden kleur, patroon en textuur te veranderen is indrukwekkend om te zien. Zowel octopussen als inktvissen zijn favoriete onderwerpen voor duikers en macrofotografen en bieden eindeloze mogelijkheden voor observatie en fotografie."
      interestingFacts={[
        "Koppotigen hebben drie harten: twee voor de kieuwen en één voor het lichaam",
        "Hun bloed is blauw door koperhoudend hemocyanine in plaats van ijzerhoudend hemoglobine",
        "Ze behoren tot de intelligentste ongewervelden en kunnen complexe problemen oplossen",
        "Sommige soorten veranderen in milliseconden van kleur en patroon via chromatoforen",
        "Verschillende soorten zijn sterk giftig, waaronder de blauwgeringde octopus",
        "Ze kunnen zich door elke opening wringen die groter is dan hun harde snavel"
      ]}
      photographyTips={[
        "Gebruik macrolenzen (30-60mm) voor detailopnames van ogen en zuignappen",
        "Fotografeer in de schemer wanneer koppotigen het actiefst zijn",
        "Blijf zeer rustig en stil, plotselinge bewegingen jagen ze weg",
        "Maak close-ups van ogen en zuignapdetails",
        "Gebruik goede belichting om kleurverandering zichtbaar te maken",
        "Handmatige focus is essentieel voor scherpe macrofoto's"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/squid.png"
      images={[
        "/images/cephalopods.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default Cephalopods;