import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PageRoute, NavigateFn } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { ProcedureDetailPage } from './pages/ProcedureDetailPage';
import { ClubePage } from './pages/ClubePage';
import { CopyrightPage } from './pages/CopyrightPage';

/**
 * ScrollToTop: Garante que a rolagem retorne instantaneamente ao topo ao navegar entre rotas
 * (Sem travar a thread principal com animações de smooth scroll)
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * ProcedureDetailPageWrapper: Extrai o slug da URL e repassa para a página de detalhes
 */
const ProcedureDetailPageWrapper: React.FC<{
  onNavigate: (route: PageRoute, slug?: string) => void;
}> = ({ onNavigate }) => {
  const { slug } = useParams<{ slug: string }>();
  const effectiveSlug = slug || 'limpeza-de-pele';

  return (
    <ProcedureDetailPage
      key={effectiveSlug}
      initialProcedureSlug={effectiveSlug}
      onNavigate={onNavigate}
    />
  );
};

/**
 * MainLayout: Estrutura permanente do site com Outlet.
 * Navbar, Footer e WhatsApp permanecem montados entre trocas de páginas,
 * evitando destruição e recriação de vídeos e elementos pesados.
 */
interface MainLayoutProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onNavigate }) => {
  const location = useLocation();

  const currentRoute: PageRoute = React.useMemo(() => {
    const p = location.pathname;
    if (p === '/' || p === '') return 'home';
    if (p.startsWith('/tratamentos')) return 'tratamentos';
    if (p.startsWith('/sobre')) return 'sobre';
    if (p.startsWith('/contato')) return 'contato';
    if (p.startsWith('/procedimento')) return 'procedimento';
    if (p.startsWith('/clube')) return 'clube';
    if (p.startsWith('/privacidade')) return 'privacidade';
    if (p.startsWith('/termos')) return 'termos';
    if (p.startsWith('/cookies')) return 'cookies';
    if (p.startsWith('/copyright')) return 'copyright';
    return 'home';
  }, [location.pathname]);

  const isClubePage = location.pathname.startsWith('/clube');

  return (
    <div className="min-h-screen bg-[#F5E9DF] text-[#28242C] flex flex-col font-sans antialiased selection:bg-[#A74447]/20 selection:text-[#A74447]">
      {/* Top Navbar com logo e navegação */}
      <Navbar currentRoute={currentRoute} onNavigate={onNavigate} />

      {/* Conteúdo dinâmico da rota */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer omitido na página Clube para foco total em conversão */}
      {!isClubePage && <Footer onNavigate={onNavigate} />}

      {/* Botão flutuante do WhatsApp */}
      <FloatingWhatsApp
        phoneNumber="5561981112868"
        initialMessage="Olá! Gostaria de agendar uma avaliação estética na Alpha Clinic Vital."
      />
    </div>
  );
};

export const App: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo: NavigateFn = (route: PageRoute, slug?: string): void => {
    if (route === 'home') {
      navigate('/');
    } else if (route === 'procedimento') {
      navigate(slug ? `/procedimento/${slug}` : '/tratamentos');
    } else {
      navigate(`/${route}`);
    }
  };

  // Suporte a redirecionamento suave de URLs legadas com hash (#/tratamentos -> /tratamentos)
  useEffect(() => {
    if (window.location.hash) {
      const hashPath = window.location.hash.replace(/^#\/?/, '/');
      if (hashPath && hashPath !== '/') {
        navigate(hashPath, { replace: true });
      }
    }
  }, [navigate]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rota Exclusiva Standalone /copyright (sem menu do site, foco total na autoria) */}
        <Route path="/copyright" element={<CopyrightPage onNavigate={navigateTo} />} />

        <Route element={<MainLayout onNavigate={navigateTo} />}>
          <Route path="/" element={<HomePage onNavigate={navigateTo} />} />
          <Route path="/tratamentos" element={<TreatmentsPage onNavigate={navigateTo} />} />
          <Route path="/sobre" element={<AboutPage onNavigate={navigateTo} />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/clube" element={<ClubePage onNavigate={navigateTo} />} />
          <Route path="/procedimento/:slug" element={<ProcedureDetailPageWrapper onNavigate={navigateTo} />} />
          <Route path="/procedimento" element={<ProcedureDetailPageWrapper onNavigate={navigateTo} />} />
          <Route path="/privacidade" element={<LegalPage initialTab="privacidade" onNavigate={navigateTo} />} />
          <Route path="/termos" element={<LegalPage initialTab="termos" onNavigate={navigateTo} />} />
          <Route path="/cookies" element={<LegalPage initialTab="cookies" onNavigate={navigateTo} />} />
          {/* Fallback de rotas desconhecidas para Home */}
          <Route path="*" element={<HomePage onNavigate={navigateTo} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
