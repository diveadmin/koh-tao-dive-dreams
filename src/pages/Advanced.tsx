import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingForm from '../components/BookingForm';

const Advanced: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/photo-1647825194145-2d94e259c745.avif')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">Advanced Open Water</h1>
          <p className="mt-4 max-w-2xl">Expand your skills with five Adventure Dives including deep and navigation; perfect for divers who want to explore deeper sites and build confidence.</p>
          <div className="mt-6">
            <a href="#booking"><Button size="lg">Book Advanced</Button></a>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Highlights</h2>
            <p className="mb-6">The PADI Advanced Open Water course focuses on improving your underwater skills through hands-on dives. Typical Adventure Dives include Deep, Underwater Navigation, Peak Performance Buoyancy, and two electives such as Night Diving or Wreck.</p>

            <h3 className="text-xl font-semibold mb-3">What you'll do</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>5 adventure dives (can be done over 2-3 days)</li>
              <li>Practice deep dive techniques and navigation</li>
              <li>Improve buoyancy and comfort underwater</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
            <p className="mb-6">Open Water Diver certification (or equivalent) and minimum age of 12.</p>

            <h3 className="text-xl font-semibold mb-3">Inclusions</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Course materials & certification</li>
              <li>All equipment rental</li>
              <li>Boat fees where applicable</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>How long does it take?</CardTitle>
                </CardHeader>
                <CardContent>
                  Most students complete the course in 2-3 days depending on chosen electives and sea conditions.
                </CardContent>
              </Card>
            </div>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Intermediate</Badge>
                </div>
                <CardDescription>2-3 days · 5 dives · Certification</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿8,500</p>
                <p className="text-sm text-muted-foreground mb-4">Includes materials & equipment</p>
                <a href="#booking"><Button>Book Advanced</Button></a>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Booking</h3>
          <p className="mb-4">Select preferred dates and we'll confirm availability. Contact us for custom schedules.</p>
        </section>

        <section id="booking" className="mt-8">
          <BookingForm isOpen={false} onClose={() => {}} itemType="course" itemTitle="Advanced Open Water" />
        </section>
      </main>
    </div>
  );
};

export default Advanced;
