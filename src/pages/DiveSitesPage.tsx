import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingForm from '../components/BookingForm';
import { MapPin, Waves, Fish, Anchor, Eye, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DiveSitesPage = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace('#', '') || '';
    const normalizedHash = hash === 'schedue' ? 'schedule' : hash;
    if (!normalizedHash) return;

    if (hash === 'schedue') {
      window.history.replaceState(null, '', `${location.pathname}#schedule`);
    }

    requestAnimationFrame(() => {
      const el = document.getElementById(normalizedHash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [location.hash, location.pathname]);

  const deepDiveSites = [
    {
      name: "Sail Rock",
      path: "/dive-sites/sail-rock",
      description: "De belangrijkste diepe duiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda.",
      depth: "18-40m",
      highlights: ["Walvishaaien", "Reuzenbarracuda", "Malabar grouper", "Zeilvis"],
      difficulty: "Gevorderd",
      location: "40 minuten offshore"
    },
    {
      name: "Chumphon Pinnacle",
      description: "Granieten pinnacle met uitstekende kansen op walvishaaien en grote scholen trevally.",
      depth: "15-30m",
      highlights: ["Walvishaaien", "Trevally-scholen", "Adelaarsroggen", "Chevron-barracuda"],
      difficulty: "Gevorderd",
      location: "30 minuten offshore"
    },
    {
      name: "South West Pinnacle",
      description: "Diepe pinnacle, bekend om walvishaaien, brydevinvissen en grote pelagische vis.",
      depth: "15-35m",
      highlights: ["Walvishaaien", "Brydevinvissen", "Reuzenbarracuda", "Koningsmakreel"],
      difficulty: "Gevorderd",
      location: "30-40 minuten offshore"
    }
  ];

  const coralReefSites = [
    {
      name: "Japanese Gardens",
      description: "Gevarieerde koraalriffen met kleurrijk zeeleven en swim-throughs.",
      depth: "12-25m",
      highlights: ["Pink-tailed triggerfish", "Ocellated adelaarsrog", "Kleurrijk koraal", "Gemarmerde octopus"],
      difficulty: "Gemiddeld",
      location: "Bij Koh Nang Yuan"
    },
    {
      name: "Shark Island",
      description: "Prachtige paarse boomkoralen en gorgonen met veel zeeleven.",
      depth: "8-20m",
      highlights: ["Zeewaaiers", "Zweepkoralen", "Zwartpuntrifhaaien", "Tropische vissen"],
      difficulty: "Beginner-Gemiddeld",
      location: "Zuidkust"
    },
    {
      name: "Mango Bay",
      description: "Ondiepe koraalriffen, ideaal voor ontspannen duiken met een gezond ecosysteem.",
      depth: "5-18m",
      highlights: ["Kleurrijk koraal", "Rifvissen", "Zeeanemonen"],
      difficulty: "Beginner",
      location: "Baai aan westkust"
    }
  ];

  const artificialSites = [
    {
      name: "HTMS Sattakut",
      description: "Voormalig Amerikaans marineschip uit WOII, geschonken door de Thaise marine en nu een bloeiend kunstmatig rif.",
      depth: "18-30m",
      highlights: ["Wrakverkenning", "Marien leven", "Swim-throughs", "Historische waarde"],
      difficulty: "Gevorderd",
      location: "Tussen de eilanden"
    },
    {
      name: "Junkyard Reef",
      description: "Kunstmatige stalen structuren met gezond koraal en divers zeeleven.",
      depth: "8-15m",
      highlights: ["Kunstmatige structuren", "Gezond koraal", "Diverse vissoorten", "Natuurproject"],
      difficulty: "Beginner-Gemiddeld",
      location: "Westkust"
    },
    {
      name: "Buoyancy World",
      description: "Betonblokken en buizen die nieuwe ecosystemen voor zeeleven vormen.",
      depth: "5-12m",
      highlights: ["Betonstructuren", "Nieuwe koraalgroei", "Klein zeeleven", "Educatief"],
      difficulty: "Beginner",
      location: "Aow Leuk"
    }
  ];

  const shallowSites = [
    {
      name: "Aow Leuk",
      description: "Ondiepe baai met koraaltuinen en makkelijke duikomstandigheden.",
      depth: "3-10m",
      highlights: ["Koraaltuinen", "Tropische vissen", "Makkelijke toegang", "Trainingslocatie"],
      difficulty: "Beginner",
      location: "Westkust"
    },
    {
      name: "Hin Ngam",
      description: "Ondiep rif met kunstmatige structuren en veel zeeleven.",
      depth: "5-12m",
      highlights: ["Kunstmatige riffen", "Kleurrijke vissen", "Veilig duiken", "Fotografie"],
      difficulty: "Beginner",
      location: "Westkust"
    },
    {
      name: "Tanote Bay",
      description: "Duiklocatie aan de oostkant met macrokansen en kleurrijk rifleven.",
      depth: "8-15m",
      highlights: ["Hengelaarsvis", "Pijpvis", "Macrofotografie", "Kleurrijk rif"],
      difficulty: "Gemiddeld",
      location: "Oostkust"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Beginner-Gemiddeld': return 'bg-blue-100 text-blue-800';
      case 'Gemiddeld': return 'bg-yellow-100 text-yellow-800';
      case 'Gevorderd': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/whale.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Duiklocaties op Koh Tao</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Ontdek meer dan 25 geweldige duiklocaties rond Koh Tao, van ondiepe koraalriffen
            tot diepe oceaanpinnacles. Elke plek biedt unieke onderwaterervaringen
            en rijk zeeleven.
          </p>
          <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              Boek je duik
            </Button>
          </a>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Beste duiklocaties op Koh Tao</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Koh Tao heeft meer dan 25 uitstekende duiklocaties met gevarieerde topografie
              en een overvloed aan zeeleven. Elke plek is uniek en biedt duikers van elk niveau
              iets anders, met genoeg variatie om ook ervaren duikers wekenlang te boeien.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Waves className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>25+ locaties</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Van ondiepe baaien tot diepe pinnacles</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Fish className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Divers zeeleven</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Walvishaaien, roggen en koraalriffen</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Anchor className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Kunstmatige riffen</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Wrakken en structuren voor unieke duiken</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Alle niveaus</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Locaties voor beginners tot gevorderde duikers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Dive Sites */}
      <section id="schedule" className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Diepe duiklocaties voor gevorderde duikers</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {deepDiveSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">
                        {site.path ? (
                          <Link to={site.path} className="hover:text-blue-600 underline-offset-4 hover:underline">
                            {site.name}
                          </Link>
                        ) : (
                          site.name
                        )}
                      </CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Diepte: {site.depth}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {site.location}
                    </span>
                  </div>
                  <CardDescription>{site.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {site.highlights.map((highlight, i) => (
                      <Badge key={i} variant="outline">{highlight}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coral Reef Sites */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Prachtige koraalrif-locaties</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {coralReefSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Diepte: {site.depth}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {site.location}
                    </span>
                  </div>
                  <CardDescription>{site.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {site.highlights.map((highlight, i) => (
                      <Badge key={i} variant="outline">{highlight}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Artificial Sites */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Kunstmatige duiklocaties</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {artificialSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Diepte: {site.depth}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {site.location}
                    </span>
                  </div>
                  <CardDescription>{site.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {site.highlights.map((highlight, i) => (
                      <Badge key={i} variant="outline">{highlight}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shallow Sites */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Ondiepe duiklocaties voor beginners</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {shallowSites.map((site, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                    </div>
                    <Badge className={getDifficultyColor(site.difficulty)}>{site.difficulty}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Diepte: {site.depth}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {site.location}
                    </span>
                  </div>
                  <CardDescription>{site.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {site.highlights.map((highlight, i) => (
                      <Badge key={i} variant="outline">{highlight}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ontdek de onderwaterwereld van Koh Tao</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Klaar om de geweldige duiklocaties van Koh Tao te ontdekken? Onze ervaren gidsen nemen
            je mee naar de beste plekken voor jouw niveau en interesses.
          </p>
          <BookingForm isOpen={false} onClose={() => {}} itemType="dive" itemTitle="Dive Sites" />
        </div>
      </section>
    </div>
  );
};

export default DiveSitesPage;