import React from 'react';
import { ShieldCheck, Award, Heart, MapPin, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';
import { TeamSlideSection } from '../components/TeamSlideSection';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F5E9DF] text-[#28242C] font-sans">
      
      {/* Main Story & Manifesto */}
      <section className="py-16 sm:py-24 border-b border-[#A59A91]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#28242C]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Sobre
            </h1>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#28242C]/90 max-w-3xl mx-auto italic pt-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              "Acreditamos que a verdadeira beleza não precisa ser reconstruída, apenas revelada com respeito e maestria."
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm sm:text-base text-[#28242C]/80 leading-relaxed pt-4 border-t border-[#A59A91]/20">
            <p>
              Instalada no <strong>Centro Comercial AlphaCenter</strong>, no Setor Habitacional Tororó (Jardim Botânico, Brasília - DF),
              a Alpha Clinic Vital foi estruturada com o objetivo de oferecer um atendimento diferenciado, longe da impessoalidade dos
              grandes centros clínicos urbanos.
            </p>
            <p>
              Nossa equipe médica e biomédica atua com foco estrito em rejuvenescimento preventivo e sustentável. Priorizamos produtos
              reabsorvíveis, biocompatíveis e respaldados por estudos científicos internacionais de longo prazo, garantindo que cada
              intervenção preserve integralmente sua identidade.
            </p>
          </div>

        </div>
      </section>

      {/* Strategic Full-Viewport Team Member Slide Showcase (Kollektiva Architecture) */}
      <TeamSlideSection />

      {/* 4 Pillars Grid */}
      <section className="py-16 sm:py-24 bg-[#FAF4EF] border-b border-[#A59A91]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#A74447] uppercase">
              Pilares Institucionais
            </span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-medium text-[#28242C]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Princípios que regem nossa prática diária
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="glass-card space-y-3">
              <div className="glass-button-circle text-[#A74447]">
                <Award className="w-5 h-5" />
              </div>
              <h3
                className="text-2xl font-serif font-medium text-[#28242C]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                1. Rigor Científico &amp; Ética
              </h3>
              <p className="text-sm text-[#28242C]/75 leading-relaxed">
                Indicação médica honesta. Se um procedimento não for tecnicamente recomendável ou não agregar harmonia real ao seu rosto,
                nós orientamos abertamente outras opções de autocuidado.
              </p>
            </div>

            <div className="glass-card space-y-3">
              <div className="glass-button-circle text-[#A74447]">
                <Heart className="w-5 h-5" />
              </div>
              <h3
                className="text-2xl font-serif font-medium text-[#28242C]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                2. Harmonia e Individualidade
              </h3>
              <p className="text-sm text-[#28242C]/75 leading-relaxed">
                Repudiamos o efeito padronizado. Cada linha do rosto carrega sua história e expressão. Nossos protocolos suavizam marcas de
                cansaço sem apagar sua essência.
              </p>
            </div>

            <div className="glass-card space-y-3">
              <div className="glass-button-circle text-[#A74447]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3
                className="text-2xl font-serif font-medium text-[#28242C]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                3. Certificação Anvisa &amp; FDA
              </h3>
              <p className="text-sm text-[#28242C]/75 leading-relaxed">
                Dispositivos de última geração (Liftera, Lavieen, Criofrequência) com rastreabilidade, lacres de segurança e substâncias
                completamente aprovadas pelos órgãos sanitários.
              </p>
            </div>

            <div className="glass-card space-y-3">
              <div className="glass-button-circle text-[#A74447]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3
                className="text-2xl font-serif font-medium text-[#28242C]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                4. Ambiente VIP &amp; Acolhedor
              </h3>
              <p className="text-sm text-[#28242C]/75 leading-relaxed">
                Suítes privativas individuais que asseguram total discrição aos nossos pacientes. Desde a chegada com estacionamento
                facilitado até o pós-procedimento assistido.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Location Callout */}
      <section className="py-16 bg-[#F5E9DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 glass-card text-center space-y-6">
          <div className="glass-button-circle text-[#A74447] mx-auto">
            <MapPin className="w-5 h-5" />
          </div>
          <h3
            className="text-3xl font-serif text-[#28242C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Venha nos visitar no AlphaCenter
          </h3>
          <p className="text-sm sm:text-base text-[#28242C]/75 max-w-xl mx-auto leading-relaxed">
            SH Tororó Centro Comercial AlphaCenter - Jardim Botânico, Brasília - DF, 72595-630.
            Ambiente com estacionamento no local, fácil acesso e segurança.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('contato')}
              className="px-8 py-4 border border-[#A74447] bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm"
            >
              Agendar Visita ou Consulta
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
