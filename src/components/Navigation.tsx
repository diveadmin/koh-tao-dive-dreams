import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const { t } = useTranslation();

  const courseItems = [
    { name: t('courses.openWater.title'), href: '#course-openWater' },
    { name: t('courses.advanced.title'), href: '#course-advanced' },
    { name: t('courses.efr.title'), href: '#course-efr' },
    { name: t('courses.rescue.title'), href: '#course-rescue' },
    { name: t('courses.divemaster.title'), href: '#course-divemaster' },
    { name: t('courses.instructor.title'), href: '#course-instructor' },
  ];

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.diveSites'), href: '#dive-sites' },
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

            {/* Courses dropdown */}
            <div className="relative group">
              <a
                href="#courses"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {t('nav.courses')}
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </a>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[220px]">
                  {courseItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      {item.name}
                    </a>
                  ))}
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
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200" onClick={() => setIsOpen(false)}>
                {t('nav.home')}
              </a>

              {/* Mobile courses accordion */}
              <div>
                <button
                  onClick={() => setCoursesOpen(!coursesOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {t('nav.courses')}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${coursesOpen ? 'rotate-180' : ''}`} />
                </button>
                {coursesOpen && (
                  <div className="pl-6 space-y-1">
                    <a href="#courses" className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                      {t('courses.title')}
                    </a>
                    {courseItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(1).map((item) => (
                <a key={item.name} href={item.href} className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200" onClick={() => setIsOpen(false)}>
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