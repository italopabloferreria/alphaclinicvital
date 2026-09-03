import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { ProcedureDetailPage } from './pages/ProcedureDetailPage';

export const App: React.FC = () => {
  // Parse initial route from URL hash or default to 'home'
  const getRouteFromHash = (): PageRoute => {
    const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
    if (hash.startsWith('procedimento')) return 'procedimento';
    if (hash === 'tratamentos') return 'tratamentos';
    if (hash === 'sobre') return 'sobre';
    if (hash === 'contato') return 'contato';
    if (hash === 'privacidade') return 'privacidade';
    if (hash === 'termos') return 'termos';
    if (hash === 'cookies') return 'cookies';
    return 'home';
  };

  const getProcedureSlugFromHash = (): string => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (hash.startsWith('procedimento/')) {
      return hash.replace('procedimento/', '').toLowerCase();
    }
    return 'limpeza-de-pele';
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getRouteFromHash());
  const [currentProcedureSlug, setCurrentProcedureSlug] = useState<string>(getProcedureSlugFromHash());

  const navigateTo = (route: PageRoute): void => {
    setCurrentRoute(route);
    if (route !== 'procedimento') {
      window.location.hash = route === 'home' ? '' : `#/${route}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync route on browser back/forward navigation
  useEffect(() => {
    const handleHashChange = (): void => {
      setCurrentRoute(getRouteFromHash());
      setCurrentProcedureSlug(getProcedureSlugFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'procedimento':
        return (
          <ProcedureDetailPage
            initialProcedureSlug={currentProcedureSlug}
            onNavigate={navigateTo}
          />
        );
      case 'tratamentos':
        return <TreatmentsPage onNavigate={navigateTo} />;
      case 'sobre':
        return <AboutPage onNavigate={navigateTo} />;
      case 'contato':
        return <ContactPage />;
      case 'privacidade':
        return <LegalPage initialTab="privacidade" onNavigate={navigateTo} />;
      case 'termos':
        return <LegalPage initialTab="termos" onNavigate={navigateTo} />;
      case 'cookies':
        return <LegalPage initialTab="cookies" onNavigate={navigateTo} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E9DF] text-[#28242C] flex flex-col font-sans antialiased selection:bg-[#A74447]/20 selection:text-[#A74447]">
      {/* Top Navbar with brand mark & routes */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Full-Bleed Video Experiential Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp
        phoneNumber="5561981112868"
        initialMessage="Olá! Gostaria de agendar uma avaliação estética na Alpha Clinic Vital."
      />
    </div>
  );
};

export default App;
