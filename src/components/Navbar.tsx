import React, { useState, useEffect } from 'react';
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
  { label: 'Clube', route: 'clube' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Monitora a rolagem para aplicar elevação e blur adaptativo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // [ACESSIBILIDADE / UX]: Travar rolagem da página quando o menu mobile estiver aberto
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = (route: PageRoute): void => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full backdrop-blur-md border-b transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5E9DF]/95 border-[#A59A91]/30 shadow-[0_8px_30px_rgba(40,36,44,0.08)]'
            : 'bg-[#F5E9DF]/90 border-[#A59A91]/20 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
        }`}
      >
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
                      ? 'bg-white/40 text-[#A74447] font-semibold shadow-sm'
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#A59A91]/25 bg-white/40 text-[#28242C] shadow-[0_4px_15px_rgba(0,0,0,0.05)] backdrop-blur-md cursor-pointer hover:bg-white/60 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#28242C]" />
              ) : (
                <Menu className="w-5 h-5 text-[#28242C]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* [MOBILE-ONLY]: Menu Mobile com Contraste Corrigido e Glassmorphism Escuro */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay escuro de alto contraste com blur suave */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-sm transition-opacity duration-300 md:hidden"
            aria-hidden="true"
          />

          {/* Drawer / Painel Lateral com fundo escuro e borda fina */}
          <aside
            className="fixed top-0 right-0 bottom-0 w-[84vw] max-w-[320px] z-[120] border-l border-white/10 bg-[rgba(10,10,10,0.85)] shadow-[-12px_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl p-6 flex flex-col justify-between text-white md:hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-white/80 font-semibold font-sans">
                  Navegação
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Camada de contraste interna para os links (garante legibilidade absoluta) */}
              <div className="rounded-2xl bg-black/25 p-2 border border-white/5 shadow-inner">
                <nav className="flex flex-col gap-2 rounded-[1rem] bg-black/20 p-2">
                  {NAV_ITEMS.map((item) => {
                    const isActive = currentRoute === item.route;
                    return (
                      <button
                        key={item.route}
                        type="button"
                        onClick={() => handleNavClick(item.route)}
                        className={`text-left px-4 py-3.5 rounded-xl text-[15px] font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${
                          isActive
                            ? 'bg-white/20 text-white font-bold border border-white/20'
                            : 'bg-white/[0.05] text-white hover:bg-white/[0.12] hover:text-white active:scale-[0.99]'
                        }`}
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-white/80 space-y-1">
              <p className="font-semibold text-white tracking-wide text-sm">Alpha Clinic Vital</p>
              <p className="text-white/70">AlphaCenter, Jardim Botânico</p>
              <p className="text-white/70">Brasília - DF</p>
            </div>
          </aside>
        </>
      )}
    </header>

      {/* Spacer que garante que o layout nunca sofra salto e a página não fique oculta sob a navbar fixa */}
      <div className="h-20 sm:h-24 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </>
  );
};

export default Navbar;
