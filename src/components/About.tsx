
import React from 'react';
import { Award, Users, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Award, label: t('about.stats.certifications'), value: '500+' },
    { icon: Users, label: t('about.stats.divers'), value: '2000+' },
    { icon: MapPin, label: t('about.stats.sites'), value: '25+' },
    { icon: Clock, label: t('about.stats.experience'), value: '15+' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Small Island, 21 km², green and surrounded by more than 15 dive sites.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            WHITE ROCK - TWINS - GREEN ROCK - CHUMPHON PINNACLE - SAIL ROCK - SOUTHWEST PINNACLE - ETC
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img
              src="/aamapkohtao.gif"
              alt="Koh Tao map and dive sites"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              PADI Open Water Diver certification, through to PADI Divemaster internships
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Koh Tao is not only an excellent place in Thailand to spend your dive vacation, but also very attractive to get almost all PADI dive certificates, for beginners and experienced scuba divers.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Lifetime certificates valid worldwide at an unbelievable low price. Get your PADI dive certificate here for 9000 baht, now with 4 nights accommodation (room and bathroom) included in the course fee! (100 baht = 2.40 EUR = 3.28 USD)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
