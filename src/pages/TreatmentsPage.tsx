import React, { useState } from 'react';
import { Calendar, Check, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';
import { TREATMENTS } from '../data/treatments';
import { getProcedureSlugForTreatmentId } from '../data/procedures';

interface TreatmentsPageProps {
  onNavigate: (route: PageRoute) => void;
}

type FilterCategory = 'todos' | 'facial' | 'corporal' | 'laser';

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('todos');

  const filteredTreatments = TREATMENTS.filter((t) => {
    if (activeCategory === 'todos') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="bg-[#F5E9DF] text-[#28242C] font-sans">
      
      {/* Page Header */}
      <section className="py-16 sm:py-24 border-b border-[#A59A91]/25 bg-[#FAF4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#A74447] uppercase">
            Protocolos Clínicos &amp; Estéticos
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#28242C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Nossos Tratamentos
          </h1>
          <p className="text-base sm:text-lg text-[#28242C]/75 max-w-2xl mx-auto leading-relaxed">
            Procedimentos não-cirúrgicos realizados com tecnologia regulamentada e produtos originais de primeira linha.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 border-b border-[#A59A91]/25 bg-[#F5E9DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap gap-2 sm:gap-4">
          {[
            { id: 'todos', label: 'Todos os Procedimentos' },
            { id: 'facial', label: 'Face & Rejuvenescimento' },
            { id: 'corporal', label: 'Remodelação Corporal' },
            { id: 'laser', label: 'Tecnologias a Laser' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as FilterCategory)}
                className={`px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#A74447] text-[#F5E9DF] border border-[#A74447] shadow-sm'
                    : 'bg-[#FAF4EF] text-[#28242C]/80 border border-[#A59A91]/30 hover:border-[#A74447]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Treatments List */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredTreatments.map((treatment) => {
            const IconComp = treatment.icon;

            return (
              <article
                key={treatment.id}
                id={treatment.id}
                className="border border-[#A59A91]/25 bg-[#FAF4EF] p-8 sm:p-12 transition-all hover:border-[#A74447] shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Icon + Overview */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="w-14 h-14 border border-[#A74447]/30 bg-[#F5E9DF] text-[#A74447] flex items-center justify-center">
                      <IconComp className="w-7 h-7" />
                    </div>
                    
                    <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#A74447]">
                      {treatment.tag}
                    </span>

                    <h2
                      className="text-2xl sm:text-3xl font-serif font-medium text-[#28242C]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {treatment.title}
                    </h2>

                    <p className="text-sm text-[#28242C]/80 leading-relaxed font-normal">
                      {treatment.description}
                    </p>

                    <div className="pt-2 flex flex-col gap-2 text-xs text-[#28242C]/70">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#A74447]" />
                        <span><strong>Duração da sessão:</strong> {treatment.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#A74447]" />
                        <span><strong>Tempo de recuperação:</strong> {treatment.recovery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Benefits List */}
                  <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-[#A59A91]/20 lg:pl-8">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-[#A74447]">
                      Benefícios Clínicos
                    </h3>
                    <ul className="space-y-3">
                      {(treatment.benefits || []).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#28242C]/85">
                          <span className="p-1 rounded-full bg-[#A74447]/15 text-[#A74447] shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: CTAs */}
                  <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-[#A59A91]/20 lg:pl-8">
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-wider text-[#A59A91] block">
                        Atendimento Exclusivo
                      </span>
                      <p className="text-xs text-[#28242C]/70 leading-relaxed">
                        Consulte disponibilidade de horários no AlphaCenter, Jardim Botânico.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const slug = getProcedureSlugForTreatmentId(treatment.id);
                          window.location.hash = `#/procedimento/${slug}`;
                          onNavigate('procedimento');
                        }}
                        className="w-full py-3 border border-[#28242C] text-[#28242C] hover:bg-[#28242C] hover:text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Ler mais sobre o procedimento</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigate('contato')}
                        className="w-full py-3.5 border border-[#A74447] bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Agendar Sessão</span>
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Help Banner */}
      <section className="py-16 bg-[#FAF4EF] border-t border-[#A59A91]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3
            className="text-3xl font-serif text-[#28242C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Não tem certeza de qual protocolo é o mais indicado?
          </h3>
          <p className="text-sm text-[#28242C]/75 max-w-xl mx-auto">
            Nossa equipe médica realiza avaliação estética individual com análise global da face e expectativas reais.
          </p>
          <div>
            <button
              type="button"
              onClick={() => onNavigate('contato')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm"
            >
              <span>Solicitar Avaliação Médica</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TreatmentsPage;
