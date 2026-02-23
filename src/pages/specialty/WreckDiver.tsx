import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function WreckDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Wreck Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Discover the history and mysteries of underwater wrecks with specialized training and techniques.
          </p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            Learn to safely explore underwater wreck sites with proper planning and advanced diving techniques. This specialty trains you in wreck navigation, penetration procedures, and hazard awareness.
          </p>
          <p className="text-gray-700">
            Wreck diving combines history, adventure, and technical skill to create unforgettable underwater experiences.
          </p>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Basic wreck diving hazards and safety procedures</li>
            <li>Non-penetration and limited-penetration techniques</li>
            <li>External wreck navigation</li>
            <li>Equipment and tool use for wreck diving</li>
            <li>Wreck penetration guidelines and planning</li>
            <li>Environmental impact and preservation</li>
            <li>Underwater photography opportunities</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>PADI Deep Diver Specialty recommended</li>
            <li>Minimum age: 15 years old</li>
            <li>Minimum 20 logged dives</li>
          </ul>
        </Card>

        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">2-3 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">4 dives on wrecks</p>
            </div>
          </div>
        </Card>

        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿4,500</div>
          <p className="text-gray-600 text-sm">Includes all training, materials, and 4 training dives</p>
        </Card>

        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Explore Sunken History</h2>
          <p className="text-gray-700 mb-4">Discover the mysteries of underwater wrecks with our experienced wreck diving instructors.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=wreck-diver')}>Book Now</Button>
        </Card>

        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}
