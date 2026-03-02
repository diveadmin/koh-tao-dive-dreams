import React from 'react';
import MarineLifeDetail from '../components/MarineLifeDetail';
import { useTranslation } from 'react-i18next';

const GreenSeaTurtle = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  const content = isDutch
    ? {
        description:
          'Plantenetende zeeschildpadden die op zeegras en algen grazen en zo gezonde mariene ecosystemen helpen behouden.',
        size: 'Tot 1,5m (5ft), 150-200kg',
        habitat: 'Ondiep kustwater, zeegrasvelden, koraalriffen',
        conservationStatus: 'Bedreigd',
        diet: 'Zeegras, algen, zeeplanten',
        behavior:
          'Brengt het grootste deel van de tijd grazend door op zeegrasvelden en migreert over lange afstanden om te nestelen. Jonge schildpadden maken een gevaarlijke tocht van strand naar zee.',
        bestTime: 'Hele jaar, vooral in ondiepe baaien',
        frequency: 'Veelvoorkomend in geschikte leefgebieden',
        detailedDescription:
          'De groene zeeschildpad is een van de meest voorkomende zeeschildpadden rond Koh Tao en speelt een belangrijke rol in de gezondheid van zeegrasvelden en koraalriffen. Deze rustige planteneters brengen hun dagen door met grazen op zeegras en algen, waardoor deze habitats in balans blijven. Volwassen dieren worden vaak gezien in ondiepe baaien en rifgebieden, terwijl jonge schildpadjes soms te zien zijn tijdens hun risicovolle tocht van het neststrand naar open zee. Beschermingsmaatregelen in Thailand hebben geholpen deze oeroude zeereizigers te beschermen, en een ontmoeting in het wild blijft altijd bijzonder.',
        interestingFacts: [
          'Groene zeeschildpadden kunnen tot 80 jaar oud worden',
          'Ze zijn genoemd naar hun groene lichaamsvet, niet naar hun schild',
          'Vrouwtjes keren terug naar het strand waar ze zelf uitkwamen om eieren te leggen',
          'Tijdens rust kunnen ze tot 7 uur hun adem inhouden',
          'Jonge schildpadjes moeten binnen 72 uur de zee bereiken om te overleven',
          'Ze migreren duizenden kilometers tussen foerageer- en nestgebieden',
        ],
        photographyTips: [
          'Benader langzaam en vermijd plotselinge bewegingen',
          'Fotografeer op waterniveau voor een sterke perspectiefwerking',
          'Neem ook de leefomgeving van de schildpad mee in je compositie',
          'Gebruik natuurlijk licht en vermijd flits',
          'Wees geduldig en laat de schildpad naar jou toe komen',
          'Respecteer hun ruimte en jaag ze niet op',
        ],
      }
    : {
        description:
          'Herbivorous sea turtles that graze on seagrass and algae, helping maintain healthy marine ecosystems.',
        size: 'Up to 1.5m (5ft), 150-200kg',
        habitat: 'Shallow coastal waters, seagrass beds, coral reefs',
        conservationStatus: 'Endangered',
        diet: 'Seagrass, algae, marine plants',
        behavior:
          'Spends most of its time grazing on seagrass beds and migrates long distances to nest. Juveniles make a dangerous journey from beach to sea.',
        bestTime: 'Year-round, especially in shallow bays',
        frequency: 'Common in suitable habitats',
        detailedDescription:
          'The green sea turtle is one of the most common sea turtle species around Koh Tao and plays an important role in the health of seagrass beds and coral reefs. These calm herbivores spend their days grazing on seagrass and algae, keeping these habitats in balance. Adults are often seen in shallow bays and reef areas, while hatchlings are sometimes observed during their risky journey from nesting beaches to open sea. Conservation efforts in Thailand have helped protect these ancient ocean travelers, and encountering one in the wild is always special.',
        interestingFacts: [
          'Green sea turtles can live up to 80 years',
          'They are named after their green body fat, not their shell',
          'Females return to the beach where they hatched to lay eggs',
          'While resting, they can hold their breath for up to 7 hours',
          'Hatchlings must reach the ocean within 72 hours to survive',
          'They migrate thousands of kilometers between feeding and nesting areas',
        ],
        photographyTips: [
          'Approach slowly and avoid sudden movements',
          'Shoot at water level for a stronger perspective',
          'Include the turtle’s habitat in your composition',
          'Use natural light and avoid flash',
          'Be patient and let the turtle come to you',
          'Respect their space and never chase them',
        ],
      };

  return (
    <MarineLifeDetail
      name={isDutch ? 'Groene Zeeschildpad' : 'Green sea turtle'}
      scientificName="Chelonia mydas"
      description={content.description}
      size={content.size}
      habitat={content.habitat}
      conservationStatus={content.conservationStatus}
      diet={content.diet}
      behavior={content.behavior}
      bestTime={content.bestTime}
      frequency={content.frequency}
      fullHeightHero={true}
      heroImageFit="cover"
      noOverlay={true}
      secondaryImage="/images/3turtle.png"
      detailedDescription={content.detailedDescription}
      interestingFacts={content.interestingFacts}
      photographyTips={content.photographyTips}
      images={[
        "/images/green-sea-turtle.png",
        "/images/photo-1618865181016-a80ad83a06d3.avif",
        "/images/photo-1647825194145-2d94e259c745.avif",
        "/images/photo-1659518893171-b15e20a8e201.avif",
        "/images/photo-1682686580849-3e7f67df4015.avif",
        "/images/photo-1682687982423-295485af248a.avif"
      ]}
    />
  );
};

export default GreenSeaTurtle;