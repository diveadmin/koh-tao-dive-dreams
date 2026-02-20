import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [sitesOpen, setSitesOpen] = useState(false);
  const { t } = useTranslation();

  const courseCategories = [
    {
      label: 'Beginner Courses',
      items: [
        { name: t('courses.openWater.title'), href: '#course-openWater' },
      ],
    },
    {
      label: 'Advanced Courses',
      items: [
        { name: t('courses.advanced.title'), href: '#course-advanced' },
        { name: t('courses.efr.title'), href: '#course-efr' },
        { name: t('courses.rescue.title'), href: '#course-rescue' },
      ],
    },
    {
      label: 'Pro Level Courses',
      items: [
        { name: t('courses.divemaster.title'), href: '#course-divemaster' },
        { name: t('courses.instructor.title'), href: '#course-instructor' },
      ],
    },
  ];

  const siteItems = [
    { name: t('diveSites.sites.sailRock.name'), href: '#site-sailRock' },
    { name: t('diveSites.sites.chumphon.name'), href: '#site-chumphon' },
    { name: t('diveSites.sites.southwest.name'), href: '#site-southwest' },
    { name: t('diveSites.sites.sharkIsland.name'), href: '#site-sharkIsland' },
    { name: t('diveSites.sites.whiteRock.name'), href: '#site-whiteRock' },
    { name: t('diveSites.sites.greenRock.name'), href: '#site-greenRock' },
  ];

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 border-solid border-0">
          <div className="flex items-center">
            <img src="/images/logo.avif" alt="Pro Diving Asia Logo" className="h-14 w-auto" />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
              {t('nav.home')}
            </a>

            {/* Courses mega dropdown */}
            <div className="relative group">
              <a
                href="#courses"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {t('nav.courses')}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d] rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[520px] p-6 flex gap-8">
                  {courseCategories.map((cat) => (
                    <div key={cat.label} className="flex-1">
                      <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                        {cat.label}
                      </h4>
                      <ul className="space-y-1">
                        {cat.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150 uppercase tracking-wide"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dive Sites dropdown */}
            <div className="relative group">
              <a
                href="#dive-sites"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {t('nav.diveSites')}
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-[#0b1e3d] rounded-lg shadow-2xl border border-[#1a3a5c] min-w-[240px] p-5">
                  <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-[#1a3a5c] pb-2">
                    Dive Sites
                  </h4>
                  <ul className="space-y-1">
                    {siteItems.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="block py-1.5 text-sm text-gray-300 hover:text-white hover:pl-1 transition-all duration-150"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <a key={item.name} href={item.href} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                {item.name}
              </a>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                {t('nav.home')}
              </a>

              <div>
                <button
                  onClick={() => setCoursesOpen(!coursesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {t('nav.courses')}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${coursesOpen ? 'rotate-90' : ''}`} />
                </button>
                {coursesOpen && (
                  <div className="pl-4 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                    {courseCategories.map((cat) => (
                      <div key={cat.label} className="mb-2">
                        <span className="block px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider">{cat.label}</span>
                        {cat.items.map((item) => (
                          <a key={item.href} href={item.href} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                            {item.name}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile dive sites accordion */}
              <div>
                <button
                  onClick={() => setSitesOpen(!sitesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {t('nav.diveSites')}
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${sitesOpen ? 'rotate-90' : ''}`} />
                </button>
                {sitesOpen && (
                  <div className="pl-4 space-y-1 bg-gray-50 rounded-lg mx-2 py-2">
                    {siteItems.map((item) => (
                      <a key={item.href} href={item.href} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(1).map((item) => (
                <a key={item.name} href={item.href} className="block px-3 py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;