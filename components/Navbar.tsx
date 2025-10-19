'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookingClick: () => void;
}

export default function Navbar({ onBookingClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              CleanAuto
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('advantages')}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Tarifs
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Témoignages
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={onBookingClick}
              className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Réserver maintenant
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-dark hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left text-dark hover:text-primary transition-colors font-medium py-2"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('advantages')}
              className="block w-full text-left text-dark hover:text-primary transition-colors font-medium py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left text-dark hover:text-primary transition-colors font-medium py-2"
            >
              Tarifs
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left text-dark hover:text-primary transition-colors font-medium py-2"
            >
              Témoignages
            </button>
            <button
              onClick={() => scrollToSection('footer')}
              className="block w-full text-left text-dark hover:text-primary transition-colors font-medium py-2"
            >
              Contact
            </button>
            <button
              onClick={onBookingClick}
              className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
