import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MapPin, Waves, Fish, Anchor, Eye, Clock } from 'lucide-react';

interface MarineSpecies {
  name: string;
  description: string;
  size: string;
  habitat: string;
  season: string;
  link?: string;
}

const MarineLifePage = () => {
  const pelagicSpecies = [
    {
      name: "Walvishaai",
      description: "De grootste vis ter wereld. Deze vriendelijke reuzen worden regelmatig gezien in diepere wateren rond Koh Tao, vooral tijdens planktonbloei.",
      size: "Tot 12m",
      habitat: "Diep water uit de kust",
      season: "Hele jaar, piek nov-mrt",
      link: "/marine-life/whaleshark"
    },
    {
      name: "Grote barracuda",
      description: "Indrukwekkende roofvissen die in groepen jagen rond rotspieken uit de kust, met snelheden tot 40 km/u.",
      size: "Tot 2m",
      habitat: "Diepe rotspieken",
      season: "Hele jaar",
      link: "/marine-life/great-barracuda"
    },
    {
      name: "Mantaroggen",
      description: "Elegante planktoneters die tijdens het voeden spectaculaire draaibewegingen maken.",
      size: "Spanwijdte tot 7m",
      habitat: "Diepe wateren",
      season: "Nov-Mar",
      link: null
    },
    {
      name: "Malabar tandbaars",
      description: "Grote roofzuchtige tandbaars die in dieper water leeft en bekendstaat om hinderlaagjacht.",
      size: "Tot 2,3m, 100kg",
      habitat: "Diepe riffen en rotspieken",
      season: "Hele jaar",
      link: "/marine-life/malabar-grouper"
    }
  ];

  const reefSharks = [
    {
      name: "Zwartpuntrifhaai",
      description: "Veelvoorkomende rifhaaien met kenmerkende zwarte vinpunten, vaak jagend in ondiep water.",
      size: "Tot 2m",
      habitat: "Koraalriffen",
      season: "Hele jaar",
      link: "/marine-life/black-tip-reef-shark"
    },
    {
      name: "Grijze rifhaai",
      description: "Schuwere rifhaaien die dieper water verkiezen en minder vaak worden gezien.",
      size: "Tot 2,5m",
      habitat: "Diepe riffen",
      season: "Hele jaar",
      link: null
    }
  ];

  const seaTurtles = [
    {
      name: "Groene zeeschildpad",
      description: "Plantenetende zeeschildpadden die grazen op zeegras en algen, vaak gezien in ondiepe baaien.",
      size: "Tot 1,5m",
      habitat: "Ondiepe baaien en riffen",
      season: "Hele jaar",
      link: "/marine-life/green-sea-turtle"
    },
    {
      name: "Karetschildpad",
      description: "Mooie schildpadden met een kenmerkende snavelvormige bek, bekend om het eten van sponsen.",
      size: "Tot 1m",
      habitat: "Koraalriffen",
      season: "Hele jaar",
      link: "/marine-life/hawksbill-sea-turtle"
    }
  ];

  const macroLife = [
    {
      name: "Naaktslakken",
      description: "Kleurrijke zeenaaktslakken met bijzondere patronen en vormen, perfect voor macrofotografie.",
      size: "1-15cm",
      habitat: "Koraalriffen",
      season: "Hele jaar",
      link: "/marine-life/nudibranchs"
    },
    {
      name: "Gebandeerde zeekrait",
      description: "Giftige zeeslangen die in ondiep water op vis en paling jagen.",
      size: "Tot 1,5m",
      habitat: "Ondiepe riffen",
      season: "Hele jaar",
      link: "/marine-life/banded-sea-krait"
    },
    {
      name: "Baardschorpioenvis",
      description: "Meester in camouflage met giftige stekels, perfect vermomd als koraal.",
      size: "Tot 30cm",
      habitat: "Koraalriffen",
      season: "Hele jaar",
      link: "/marine-life/bearded-scorpion-fish"
    },
    {
      name: "Koppotigen",
      description: "Intelligente octopussen en inktvissen, meesters in camouflage en probleemoplossing.",
      size: "5cm-3m",
      habitat: "Koraalriffen en diep water",
      season: "Hele jaar",
      link: "/marine-life/cephalopods"
    }
  ];

  const renderSpeciesCard = (species: MarineSpecies) => (
    <Card key={species.name} className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Fish className="h-5 w-5 text-blue-600" />
          {species.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {species.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Waves className="h-4 w-4 text-blue-500" />
            <span>Grootte: {species.size}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>Habitat: {species.habitat}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>Beste periode: {species.season}</span>
          </div>
          {species.link && (
            <Link to={species.link}>
              <Button variant="outline" size="sm" className="mt-2">
                Meer info
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/marine.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Marien leven van Koh Tao
          </h1>
          <p className="text-lg md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
            Ontdek de indrukwekkende biodiversiteit van Koh Tao’s onderwaterwereld, met meer dan 350 vissoorten en bijzondere zeedieren.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Marien leven op Koh Tao</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            De tropische wateren rond Koh Tao kennen een enorme rijkdom aan zeeleven en biodiversiteit.
            Met stabiele watertemperaturen tussen 26-29°C het hele jaar door vormt de zee een ideaal leefgebied voor diverse soorten fauna en flora.
            Van vriendelijke reuzen zoals walvishaaien tot kleine macrosoorten: Koh Tao biedt ontmoetingen met enkele van de meest fascinerende zeedieren ter wereld.
          </p>
        </div>

        {/* Pelagic Species */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Anchor className="h-6 w-6 text-blue-600" />
            Pelagische soorten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pelagicSpecies.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Reef Sharks */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Fish className="h-6 w-6 text-blue-600" />
            Rifhaaien
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reefSharks.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Sea Turtles */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-600" />
            Zeeschildpadden
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seaTurtles.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Macro Life */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Waves className="h-6 w-6 text-blue-600" />
            Macro marien leven
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {macroLife.map(renderSpeciesCard)}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Klaar om het mariene leven van Koh Tao te beleven?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Doe mee met onze PADI-gecertificeerde cursussen en fun dive trips om deze geweldige dieren van dichtbij in hun natuurlijke habitat te zien.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Bekijk cursussen
              </Button>
            </Link>
            <Link to="/fun-diving-koh-tao">
              <Button size="lg" variant="outline">
                Fun dive trips
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineLifePage;