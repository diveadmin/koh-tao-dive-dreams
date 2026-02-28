import Contact from '../components/Contact';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const EFR: React.FC = () => {
  const navigate = useNavigate();
  const bookingUrl = '/booking?item=Emergency%20First%20Response%20(EFR)&type=course&price=3500&currency=THB';
  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 md:h-80 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/efr.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-3xl md:text-4xl font-bold">Emergency First Response (EFR)</h1>
          <p className="mt-3 max-w-2xl">Leer essentiële EHBO-, CPR- en noodhulpvaardigheden — een waardevolle zelfstandige certificering en vereiste voor Rescue Diver.</p>
          <div className="mt-5">
            <Button size="lg" onClick={() => navigate(bookingUrl)}>Boek EFR</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
            <p className="mb-6">EFR behandelt Primary en Secondary Care, CPR, gebruik van AED en eerste hulp bij veelvoorkomende duikverwondingen. De cursus is gericht op theorie en praktische vaardigheden en is essentieel voor wie wil doorgaan naar Rescue Diver.</p>

            <h3 className="text-xl font-semibold mb-3">Wat je leert</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Principes van primary & secondary care</li>
              <li>CPR en gebruik van AED</li>
              <li>Eerste hulp bij ademhalings- en hartnoodsituaties</li>
              <li>Eerste hulp bij duikgerelateerde incidenten</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3">Duur & vereisten vooraf</h3>
            <p className="mb-6">Duur: 1 dag. Geen duikvereiste — geschikt voor duikers en niet-duikers.</p>

            <h3 className="text-xl font-semibold mb-3">Inbegrepen</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Lesmateriaal en certificering</li>
              <li>Praktische CPR- en EHBO-training</li>
              <li>Ervaren instructeurs</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">FAQ</h3>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Is EFR verplicht voor Rescue Diver?</CardTitle>
                </CardHeader>
                <CardContent>
                  Ja — EFR (of gelijkwaardig) is een vereiste voor de Rescue Diver-cursus.
                </CardContent>
              </Card>
            </div>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cursusdetails</CardTitle>
                  <Badge>Eerste hulp</Badge>
                </div>
                <CardDescription>1 dag · Certificering inbegrepen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿3,500</p>
                <p className="text-sm text-muted-foreground mb-4">Inclusief lesmateriaal en certificering</p>
                <Button onClick={() => navigate(bookingUrl)}>Boek EFR</Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Boeken</h3>
          <p className="mb-4">Vul het formulier hieronder in om je plek te reserveren. We organiseren regelmatig EFR-cursussen — neem contact op voor privédata.</p>
        </section>

        <section className="mt-8">
          <div className="mb-4">
            <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Neem contact op om te boeken/informatie aan te vragen</a>
            <div className="text-muted-foreground text-sm mb-4">Of gebruik het formulier hieronder om direct een boekingsaanvraag te sturen.</div>
          </div>
          <Button onClick={() => navigate(bookingUrl)}>Verstuur boekingsaanvraag</Button>
        </section>
      </main>
    </div>
  );
};

export default EFR;
