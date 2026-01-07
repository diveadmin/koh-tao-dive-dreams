import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    t
  } = useTranslation();
  const navItems = [{
    name: t('nav.home'),
    href: '#home'
  }, {
    name: t('nav.courses'),
    href: '#courses'
  }, {
    name: t('nav.diveSites'),
    href: '#dive-sites'
  }, {
    name: t('nav.gallery'),
    href: '#gallery'
  }, {
    name: t('nav.contact'),
    href: '#contact'
  }];
  return <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 border-4 border-solid">
          <div className="flex items-center">
            <img src="/images/logo.avif" alt="Pro Diving Asia Logo" className="h-10 w-auto border-solid border-0 shadow-sm rounded-sm opacity-95 object-fill" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => <a key={item.name} href={item.href} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                {item.name}
              </a>)}
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => <a key={item.name} href={item.href} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200" onClick={() => setIsOpen(false)}>
                  {item.name}
                </a>)}
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;