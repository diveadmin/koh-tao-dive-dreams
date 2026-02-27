import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';

const Nudibranchs = () => {
  return (
    <MarineLifeDetail
      name="Naaktslakken"
      scientificName="Diverse soorten (Gastropoda)"
      description="Kleurrijke zeenaaktslakken met ongelooflijke patronen en vormen, perfect voor macrofotografie."
      size="1-15cm afhankelijk van soort"
      habitat="Koraalriffen, zandvlaktes, rotsachtige zones"
      conservationStatus="Niet geëvalueerd"
      diet="Sponzen, hydroïdpoliepen, zakpijpen, andere naaktslakken"
      behavior="Langzame grazers die vaak gespecialiseerd voedsel eten; sommige tonen waarschuwingskleuren vanwege giftigheid; hermafrodiet."
      bestTime="Hele jaar, vooral na sterkere stroming"
      frequency="Veelvoorkomend in geschikt habitat bij geduldige observatie"
      detailedDescription="Naaktslakken zijn levende kunstwerkjes die je overal op de riffen van Koh Tao kunt vinden. Deze schelploze weekdieren tonen een enorme variatie in kleur, patroon en lichaamsvorm. Met honderden soorten, van vingertopformaat tot bijna handgroot, blijven ze eindeloos boeiend voor macrofotografen en natuurliefhebbers. Juist door hun variatie en fotogenieke gedrag zijn ze geliefde onderwerpen in onderwaterfotografie."
      interestingFacts={[
        "Naaktslakken bestaan in honderden soorten met spectaculaire kleurvariaties",
        "Veel soorten zijn giftig en waarschuwen daarvoor met felle kleuren",
        "De meeste naaktslakken zijn hermafrodiet met zowel mannelijke als vrouwelijke organen",
        "Ze eten vaak zeer specifieke prooien - sommige sponzen, andere hydroïden",
        "Door hun vorm en kleur zijn ze ideale macro-onderwerpen",
        "In tropische wateren worden nog steeds nieuwe soorten ontdekt"
      ]}
      photographyTips={[
        "Gebruik macrolenzen (30-60mm) om het frame met detail te vullen",
        "Handmatige focus is essentieel voor scherpte op kleine onderwerpen",
        "Gebruik focuslicht om details goed uit te lichten",
        "Fotografeer close-up voor kieuwen, voelsprieten en textuur",
        "Wees geduldig en wacht op een goede positie",
        "Goede belichting laat kleuren en patronen echt uitkomen"
      ]}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/nudi.png"
      images={[
        "/images/headnudi.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default Nudibranchs;