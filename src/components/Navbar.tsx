import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute, NavItem } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Início', route: 'home' },
  { label: 'Tratamentos', route: 'tratamentos' },
  { label: 'A Clínica', route: 'sobre' },
  { label: 'Contato', route: 'contato' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = (route: PageRoute): void => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[100] w-full backdrop-blur-lg bg-white/10 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Logo */}
          <BrandLogo
            size="md"
            variant="ink"
            onClick={() => handleNavClick('home')}
          />

          {/* Desktop Navigation Links in glass-nav pill */}
          <nav className="glass-nav hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer font-sans ${
                    isActive
                      ? 'bg-white/20 text-[#A74447] font-semibold'
                      : 'text-[#28242C]/80 hover:text-[#A74447] hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="glass-button-circle text-[#28242C] cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu: glass-overlay + glass-drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Background Overlay */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[110] glass-overlay transition-opacity"
            aria-hidden="true"
          />

          {/* Sliding Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-72 sm:w-80 z-[120] glass-drawer p-6 flex flex-col justify-between shadow-2xl text-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-white/70 font-semibold font-sans">
                  Navegação
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="glass-button-circle text-white cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.route}
                      type="button"
                      onClick={() => handleNavClick(item.route)}
                      className={`text-left px-4 py-3 rounded-2xl text-sm font-medium tracking-wider uppercase transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/20 text-[#DD9299] font-semibold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/60 space-y-1">
              <p className="font-semibold text-white/80">Alpha Clinic Vital</p>
              <p>AlphaCenter, Jardim Botânico</p>
              <p>Brasília - DF</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
