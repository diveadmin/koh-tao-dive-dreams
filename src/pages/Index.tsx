
import React from 'react';
import Hero from '../components/Hero';
import DiveSites from '../components/DiveSites';
import Courses from '../components/Courses';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Contact from '../components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <DiveSites />
      <Courses />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Index;
