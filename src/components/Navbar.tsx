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
    <header className="sticky top-0 z-[100] w-full border-b border-[#A59A91]/25 bg-[#F5E9DF]/95 backdrop-blur-md transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Logo */}
          <BrandLogo
            size="md"
            variant="ink"
            onClick={() => handleNavClick('home')}
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`relative text-xs lg:text-sm font-medium tracking-wider uppercase transition-all duration-200 py-1 font-sans ${
                    isActive
                      ? 'text-[#A74447] font-semibold'
                      : 'text-[#28242C]/80 hover:text-[#A74447]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A74447] rounded-full"
                    />
                  )}
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
              className="p-2 rounded-md text-[#28242C] hover:bg-[#A59A91]/15 active:bg-[#A59A91]/25 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#A59A91]/25 bg-[#FAF4EF] shadow-lg px-5 pt-3 pb-6 space-y-2">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left px-4 py-3 rounded-md text-sm font-medium tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-[#A74447] text-[#F5E9DF] font-semibold'
                      : 'text-[#28242C] hover:bg-[#A74447]/10 hover:text-[#A74447]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
