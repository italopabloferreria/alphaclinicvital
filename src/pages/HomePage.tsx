import React from 'react';
import { Award } from 'lucide-react';
import { PageRoute } from '../types';
import { Hero } from '../components/Hero';
import { ProceduresSection } from '../components/ProceduresSection';
import { InstagramFeedSection } from '../components/InstagramFeedSection';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F5E9DF] text-[#28242C] font-sans">
      
      {/* =========================================================================
          FULL-SCREEN DARK-THEMED SPOTLIGHT HERO SECTION
          ========================================================================= */}
      <Hero onNavigate={onNavigate} />

      {/* =========================================================================
          INTERACTIVE PROCEDURES SHOWCASE (Motion Side-List)
          ========================================================================= */}
      <ProceduresSection onNavigate={onNavigate} />

      {/* =========================================================================
          PHILOSOPHY & SPACE TEASER
          ========================================================================= */}
      <section className="py-20 lg:py-28 bg-[#F5E9DF] border-b border-[#A59A91]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#A74447] uppercase">
                O Espaço AlphaCenter
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#28242C] leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Um refúgio de serenidade e privacidade no Jardim Botânico.
              </h2>

              <p className="text-sm sm:text-base text-[#28242C]/80 leading-relaxed">
                Nossas suítes foram concebidas para que cada momento do seu atendimento seja imersivo,
                calmo e acolhedor. Da iluminação sensorial ao sigilo completo em cada protocolo, tudo foi
                planejado para respeitar seu tempo e seu bem-estar.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-medium text-[#28242C]">
                <div className="glass-card">
                  <p className="font-semibold text-sm mb-1 text-[#28242C]">Privacidade Absoluta</p>
                  <p className="text-[#A59A91]">Atendimento individual sem espera coletiva.</p>
                </div>
                <div className="glass-card">
                  <p className="font-semibold text-sm mb-1 text-[#28242C]">Localização Nobre</p>
                  <p className="text-[#A59A91]">Estacionamento privativo e fácil acesso.</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onNavigate('sobre')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A74447] hover:text-[#8F393C] transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Conheça nossa clínica e corpo clínico &rarr;</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-card space-y-6">
                <h3
                  className="text-2xl font-serif text-[#28242C]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Consultas de Avaliação Personalizada
                </h3>
                <p className="text-sm text-[#28242C]/75 leading-relaxed">
                  Não acreditamos em tratamentos padronizados. Antes de qualquer intervenção, nosso time realiza
                  um mapeamento das suas queixas, histórico e expectativas reais, elaborando um plano de tratamento
                  transparente e consciente.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('contato')}
                    className="w-full py-4 border border-[#A74447] bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm rounded-xl"
                  >
                    Agendar Horário com Especialista
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INSTAGRAM FEED SLIDER (@alphaclinicvital)
          ========================================================================= */}
      <InstagramFeedSection />

    </div>
  );
};

export default HomePage;
