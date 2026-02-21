import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingForm from '../components/BookingForm';

const Divemaster: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/photo-1659518893171-b15e20a8e201.avif')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">PADI Divemaster Course</h1>
          <p className="mt-4 max-w-2xl">Begin your professional diving career — learn leadership, supervision, and dive management skills to work as a dive professional worldwide.</p>
          <div className="mt-6">
            <a href="#booking"><Button size="lg">Enquire About Divemaster</Button></a>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
            <p className="mb-6">The Divemaster program develops your dive leadership skills including supervising dive activities, assisting instructors, and guiding certified divers. This course combines knowledge development, water skills and stamina exercises, and practical experience.</p>

            <h3 className="text-xl font-semibold mb-3">Key competencies</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Supervising dive operations and safety</li>
              <li>Search and recovery, boat operations, and briefings</li>
              <li>Assisting instructors during training</li>
              <li>Customer service and dive center procedures</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Duration & Prerequisites</h3>
            <p className="mb-6">Typical program length: 2-4 weeks depending on experience. Prerequisites: Rescue Diver certification, 40 logged dives to start and 60 to certify (PADI requirements).</p>

            <h3 className="text-xl font-semibold mb-3">What we provide</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Supervised dive practicals and real-world guide experience</li>
              <li>Mentoring and job placement assistance</li>
              <li>Course materials and PADI registration</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Will I get work after certification?</CardTitle>
                </CardHeader>
                <CardContent>
                  We assist graduates with local work placements, CV advice and introductions to partner centers.
                </CardContent>
              </Card>
            </div>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Pro Level</Badge>
                </div>
                <CardDescription>2-4 weeks · Practical & theory · PADI Divemaster</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿35,000+</p>
                <p className="text-sm text-muted-foreground mb-4">Price varies by program length and experience level. Contact us for tailored pricing.</p>
                <a href="#booking"><Button>Enquire / Apply</Button></a>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">How to apply</h3>
          <p className="mb-4">Send us your diving resume and preferred start date. We will assess experience and recommend a schedule.</p>
        </section>

        <section id="booking" className="mt-8">
          <BookingForm isOpen={false} onClose={() => {}} itemType="course" itemTitle="Divemaster" />
        </section>
      </main>
    </div>
  );
};

export default Divemaster;
