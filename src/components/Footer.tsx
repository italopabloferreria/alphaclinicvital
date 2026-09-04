import React from 'react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate?: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, route: PageRoute): void => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route);
    }
  };

  return (
    <footer id="contato" className="site-footer">
      {/* Background Video Layer (Full-Bleed on Desktop) */}
      <div className="footer-media" aria-hidden="true">
        <video
          className="footer-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/footer-poster.webp"
        >
          <source
            src="/footer.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Inner Content Container */}
      <div className="footer-inner">
        <div className="footer-grid">
          
          {/* Brand & Contact Information */}
          <div className="brand">
            <div
              className="brand-lockup cursor-pointer"
              onClick={(e) => handleNav(e, 'home')}
            >
              <svg
                className="brand-mark"
                viewBox="0 0 96 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <ellipse cx="48" cy="60" rx="45" ry="57" />
                <path d="M48 88V46" strokeLinecap="round" />
                <path d="M48 58c-8-2-14-8-16-16 9 0 15 5 16 16Zm0 0c8-2 14-8 16-16-9 0-15 5-16 16Z" />
                <path d="M48 74c-9-2-15-8-17-17 10 0 16 6 17 17Zm0 0c9-2 15-8 17-17-10 0-16 6-17 17Z" />
                <path d="M48 46c-6-3-9-9-8-16 6 3 9 9 8 16Zm0 0c6-3 9-9 8-16-6 3-9 9-8 16Z" />
                <path d="M30 44c-5 1-9-1-12-5 5-2 9-1 12 5Zm36 0c5 1 9-1 12-5-5-2-9-1-12 5Z" />
              </svg>
              <h2 className="brand-name">Alpha Clinic Vital</h2>
            </div>
            
            <p className="brand-blurb">
              Estética médica avançada, rejuvenescimento natural e longevidade no Jardim Botânico, Brasília.
            </p>

            <ul className="contact-list">
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:contato@alphaclinicvital.com.br">contato@alphaclinicvital.com.br</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:+5561981112868">(61) 98111-2868</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>SH Tororó AlphaCenter - Brasília - DF</span>
              </li>
            </ul>
          </div>

          {/* Column 1: Tratamentos */}
          <nav className="col" aria-label="Tratamentos">
            <h3 className="col-title">Tratamentos</h3>
            <ul className="link-list">
              <li>
                <a href="/tratamentos" onClick={(e) => handleNav(e, 'tratamentos')}>
                  Bioestimuladores
                </a>
              </li>
              <li>
                <a href="/tratamentos" onClick={(e) => handleNav(e, 'tratamentos')}>
                  Toxina Botulínica
                </a>
              </li>
              <li>
                <a href="/tratamentos" onClick={(e) => handleNav(e, 'tratamentos')}>
                  Ultrassom Liftera
                </a>
              </li>
              <li>
                <a href="/tratamentos" onClick={(e) => handleNav(e, 'tratamentos')}>
                  Laser Lavieen
                </a>
              </li>
              <li>
                <a href="/tratamentos" onClick={(e) => handleNav(e, 'tratamentos')}>
                  Preenchimento Facial
                </a>
              </li>
              <li>
                <a href="/tratamentos" onClick={(e) => handleNav(e, 'tratamentos')}>
                  Remodelação Corporal
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 2: A Clínica */}
          <nav className="col" aria-label="A Clínica">
            <h3 className="col-title">A Clínica</h3>
            <ul className="link-list">
              <li>
                <a href="/sobre" onClick={(e) => handleNav(e, 'sobre')}>
                  Nossa Essência
                </a>
              </li>
              <li>
                <a href="/sobre" onClick={(e) => handleNav(e, 'sobre')}>
                  Corpo Clínico
                </a>
              </li>
              <li>
                <a href="/sobre" onClick={(e) => handleNav(e, 'sobre')}>
                  Tecnologia Médica
                </a>
              </li>
              <li>
                <a href="/sobre" onClick={(e) => handleNav(e, 'sobre')}>
                  Espaço VIP &amp; Spa
                </a>
              </li>
              <li>
                <a href="/sobre" onClick={(e) => handleNav(e, 'sobre')}>
                  Diferenciais
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3: Cuidado & Atendimento */}
          <nav className="col" aria-label="Cuidado e Atendimento">
            <h3 className="col-title">Cuidado &amp; Atendimento</h3>
            <ul className="link-list">
              <li>
                <a href="/contato" onClick={(e) => handleNav(e, 'contato')}>
                  Agendamento VIP
                </a>
              </li>
              <li>
                <a href="/contato" onClick={(e) => handleNav(e, 'contato')}>
                  Avaliação Facial
                </a>
              </li>
              <li>
                <a href="/contato" onClick={(e) => handleNav(e, 'contato')}>
                  Onde Estamos
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5561981112868"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale no WhatsApp
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 4: Newsletter */}
          <div className="newsletter">
            <h3 className="col-title">Informativo Exclusivo</h3>
            <p>
              Cadastre-se para receber avisos exclusivos sobre novos protocolos, artigos &amp; novidades para pacientes.
            </p>
            <form className="subscribe" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="nl-email" className="sr-only">
                Endereço de e-mail
              </label>
              <input
                id="nl-email"
                type="email"
                name="email"
                placeholder="Digite seu melhor e-mail"
                autoComplete="email"
                required
              />
              <button type="submit" aria-label="Inscrever-se">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <nav className="legal" aria-label="Informações Legais">
            <a href="/privacidade" onClick={(e) => handleNav(e, 'privacidade')}>
              Política de Privacidade
            </a>
            <a href="/termos" onClick={(e) => handleNav(e, 'termos')}>
              Termos de Uso
            </a>
            <a href="/cookies" onClick={(e) => handleNav(e, 'cookies')}>
              Política de Cookies
            </a>
            <a
              href="/copyright"
              onClick={(e) => handleNav(e, 'copyright')}
              className="text-[#A59A91]/80 hover:text-[#A74447] transition-colors cursor-pointer"
              title="Copyright - I can't believe it's ai"
            >
              © Copyright
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
