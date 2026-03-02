import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { MapPin, Waves, Fish, Clock, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DiveSiteDetailProps {
  name: string;
  description: string;
  depth: string;
  difficulty: string;
  location: string;
  highlights: string[];
  detailedDescription: string;
  bestTime: string;
  current: string;
  visibility: string;
  marineLife: string[];
  tips: string[];
  images: string[];
}

const DiveSiteDetail: React.FC<DiveSiteDetailProps> = ({
  name,
  description,
  depth,
  difficulty,
  location,
  highlights,
  detailedDescription,
  bestTime,
  current,
  visibility,
  marineLife,
  tips,
  images
}) => {
  const navigate = useNavigate();
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Beginner-Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-blue-900 to-teal-600">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <Link to="/koh-tao-dive-sites" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dive Sites
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">{description}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Site Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{detailedDescription}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Waves className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Depth:</span>
                    <span>{depth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Location:</span>
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Visibility:</span>
                    <span>{visibility}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fish className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Current:</span>
                    <span>{current}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-medium">Difficulty:</span>
                  <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Best Time:</span>
                  <span className="text-muted-foreground">{bestTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* Marine Life */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Marine Life Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {marineLife.map((animal, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Fish className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{animal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Diving Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Diving Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="font-medium text-sm">Depth Range:</span>
                  <p className="text-sm text-muted-foreground">{depth}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Difficulty:</span>
                  <p className="text-sm text-muted-foreground">{difficulty}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Location:</span>
                  <p className="text-sm text-muted-foreground">{location}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Best Time:</span>
                  <p className="text-sm text-muted-foreground">{bestTime}</p>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>What to See</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline">{highlight}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Book Now */}
            <Card>
              <CardHeader>
                <CardTitle>Ready to Dive?</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Experience {name} with our expert guides and premium equipment.
                  </p>
                  <Button className="w-full" size="lg" onClick={() => navigate(`/booking?item=${encodeURIComponent(name)}&type=dive`)}>
                    Book This Dive Site
                  </Button>
                </CardContent>
            </Card>
          </div>
        </div>

        {/* Gallery Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`${name} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Booking Section */}
        <section className="mt-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Book Your Dive at {name}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to explore this incredible dive site? Contact us to arrange your diving adventure.
            </p>
            <Button onClick={() => navigate(`/booking?item=${encodeURIComponent(name)}&type=dive`)} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Go to booking page</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiveSiteDetail;