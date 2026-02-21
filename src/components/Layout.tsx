import React from 'react';
import Navigation from './Navigation';

const Footer: React.FC = () => (
  <footer className="bg-white border-t mt-12">
    <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">© {new Date().getFullYear()} Pro Diving Asia — All rights reserved</div>
      <div className="space-x-4">
        <a href="../home" className="hover:text-blue-600">Home</a>
        <a href="/courses" className="hover:text-blue-600">Courses</a>
        <a href="/koh-tao-dive-sites" className="hover:text-blue-600">Dive Sites</a>
        <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Contact</a>
      </div>
    </div>
  </footer>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
