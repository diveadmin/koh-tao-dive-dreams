import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import BookingForm from './BookingForm';

const DiveSites = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  
  const sites = [
    {
      name: "Sail Rock",
      depth: "8-40m",
      level: "Advanced",
      highlights: ["Whale sharks", "Bull sharks", "Vertical swim-through"],
      description: "The pinnacle dive site in the Gulf of Thailand, famous for whale shark encounters.",
      image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Chumphon Pinnacle",
      depth: "14-32m",
      level: "Intermediate",
      highlights: ["Barracudas", "Trevally", "Coral gardens"],
      description: "Underwater seamount covered in colorful soft corals and bustling with marine life.",
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Southwest Pinnacle",
      depth: "14-33m",
      level: "Intermediate",
      highlights: ["Whale sharks", "Giant groupers", "Coral formations"],
      description: "A submerged pinnacle offering excellent chances of big fish encounters.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Shark Island",
      depth: "5-18m",
      level: "Beginner",
      highlights: ["Reef sharks", "Moray eels", "Easy diving"],
      description: "Perfect for beginners with gentle currents and abundant marine life.",
      image: "https://images.unsplash.com/photo-1546518718-033ad80ba69c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "White Rock",
      depth: "8-22m",
      level: "Beginner",
      highlights: ["Coral gardens", "Tropical fish", "Photography"],
      description: "Beautiful coral formations and diverse marine life in shallow, calm waters.",
      image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Green Rock",
      depth: "6-18m",
      level: "Beginner",
      highlights: ["Sea turtles", "Angelfish", "Butterflyfish"],
      description: "Known for frequent turtle sightings and vibrant reef fish communities.",
      image: "https://images.unsplash.com/photo-1615731502155-e3a6b35fbb86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="dive-sites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            World-Class Dive Sites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Koh Tao's most spectacular underwater locations, each offering unique marine encounters and breathtaking coral formations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sites.map((site, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(site.level)}`}>
                    {site.level}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{site.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{site.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="mr-4">Depth: {site.depth}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {site.highlights.map((highlight, idx) => (
                      <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedSite(site.name)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Book This Dive
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingForm
        isOpen={!!selectedSite}
        onClose={() => setSelectedSite(null)}
        itemType="dive"
        itemTitle={selectedSite || ''}
      />
    </section>
  );
};

export default DiveSites;
