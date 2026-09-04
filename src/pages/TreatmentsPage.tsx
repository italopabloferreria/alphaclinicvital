import React, { useState } from 'react';
import { Calendar, Check, ArrowRight, Clock, RotateCcw } from 'lucide-react';
import { PageRoute } from '../types';
import { TREATMENTS } from '../data/treatments';
import { getProcedureSlugForTreatmentId } from '../data/procedures';

interface TreatmentsPageProps {
  onNavigate: (route: PageRoute, slug?: string) => void;
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-wrap gap-2.5 sm:gap-4">
          {[
            { id: 'todos', label: 'Todos os Procedimentos' },
            { id: 'facial', label: 'Face e Rejuvenescimento' },
            { id: 'corporal', label: 'Remodelação Corporal' },
            { id: 'laser', label: 'Tecnologias e Laser' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as FilterCategory)}
                className={`glass-pill px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? '!bg-[#A74447] text-[#F5E9DF] shadow-sm'
                    : 'text-[#28242C]/80 hover:text-[#28242C]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Treatments Cards Grid Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div
            key={activeCategory}
            className="cards-fade-in grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {filteredTreatments.map((treatment, index) => {
              const IconComp = treatment.icon;
              const isFeatured = index === 0;

              // Featured Card (First item in list - "Mais Procurado")
              if (isFeatured) {
                return (
                  <article
                    key={treatment.id}
                    id={treatment.id}
                    className="treatment-card md:col-span-2 flex flex-col h-full overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row md:gap-8 lg:gap-10 h-full">
                      {/* Left Column (Desktop md+): Thumbnail + Floating Badge + Icon + Desktop Metadata */}
                      <div className="flex flex-col md:w-5/12 lg:w-5/12 shrink-0">
                        {/* Miniature Photo Container */}
                        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden border border-[#783c28]/15 bg-[#FAF4EF] group">
                          {treatment.image && (
                            <img
                              src={treatment.image}
                              alt={treatment.title}
                              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                              loading="lazy"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                          {/* 1. Floating Badge no topo da foto */}
                          <div className="absolute top-3.5 left-3.5 z-10">
                            <span
                              className="inline-flex items-center px-3 py-1 glass-pill text-xs font-semibold uppercase tracking-wide text-[#A74447] shadow-sm"
                            >
                              {treatment.tag || 'Mais Procurado'}
                            </span>
                          </div>

                          {/* Ícone discreto no canto da foto */}
                          <div className="absolute bottom-3.5 right-3.5 z-10 glass-button-circle text-[#A74447] shadow-sm">
                            <IconComp className="w-5 h-5 text-[#A74447]" strokeWidth={1.5} />
                          </div>
                        </div>

                        {/* Metadados no Desktop */}
                        <div className="hidden md:flex items-center justify-between pt-3 text-xs text-neutral-600 border-t border-[#783c28]/10 mt-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#A74447]" strokeWidth={1.5} />
                            <span>Duração: <strong className="text-[#28242C] font-medium">{treatment.duration}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <RotateCcw className="w-3.5 h-3.5 text-[#A74447]" strokeWidth={1.5} />
                            <span>Recuperação: <strong className="text-[#28242C] font-medium">{treatment.recovery}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column (Desktop md+): Title, Description, Benefits, Mobile Meta, CTAs */}
                      <div className="flex flex-col flex-1 h-full mt-4 md:mt-0">
                        {/* 3. Título do tratamento */}
                        <h2
                          className="text-2xl md:text-3xl font-serif font-medium text-[#28242C] leading-snug"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {treatment.title}
                        </h2>

                        {/* 4. Descrição curta (1-2 frases) */}
                        <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                          {treatment.description}
                        </p>

                        {/* 5. Lista de 2-3 benefícios principais com check fino */}
                        <div className="mt-5 space-y-2">
                          <span className="text-xs uppercase tracking-wider font-semibold text-[#A74447]">
                            Benefícios Principais
                          </span>
                          <ul className="space-y-2 pt-0.5">
                            {(treatment.benefits || []).slice(0, 3).map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-sm text-[#28242C]/85">
                                <span className="text-[#A74447] shrink-0 mt-0.5">
                                  <Check className="w-4 h-4" strokeWidth={1.5} />
                                </span>
                                <span className="leading-snug">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 6. Metadados em linha (Mobile) */}
                        <div className="flex md:hidden items-center flex-wrap gap-2 text-xs text-neutral-600 mt-4 pt-3 border-t border-[#783c28]/10">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#A74447]" strokeWidth={1.5} />
                            <span>{treatment.duration}</span>
                          </div>
                          <span className="text-neutral-300 font-light">•</span>
                          <div className="flex items-center gap-1.5">
                            <RotateCcw className="w-3.5 h-3.5 text-[#A74447]" strokeWidth={1.5} />
                            <span>{treatment.recovery}</span>
                          </div>
                        </div>

                        {/* 7. Rodapé com dois CTAs */}
                        <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
                          <button
                            type="button"
                            onClick={() => onNavigate('contato')}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <Calendar className="w-4 h-4" strokeWidth={1.5} />
                            <span>Agendar Sessão</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const slug = getProcedureSlugForTreatmentId(treatment.id);
                              onNavigate('procedimento', slug);
                            }}
                            className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#28242C]/25 text-[#28242C] hover:border-[#28242C] hover:bg-[#28242C]/5 text-xs font-semibold uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Ler mais sobre o procedimento</span>
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              // Standard Cards (2 Columns on md+)
              return (
                <article
                  key={treatment.id}
                  id={treatment.id}
                  className="treatment-card flex flex-col h-full overflow-hidden"
                >
                  {/* Miniature photo container */}
                  <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 border border-[#783c28]/15 bg-[#FAF4EF] group">
                    {treatment.image && (
                      <img
                        src={treatment.image}
                        alt={treatment.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                    {/* 1. Selo/Badge no topo esquerdo da foto */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="inline-flex items-center px-2.5 py-1 glass-pill text-[11px] font-semibold uppercase tracking-wide text-[#A74447] shadow-sm"
                      >
                        {treatment.tag || 'Procedimento'}
                      </span>
                    </div>

                    {/* 2. Ícone discreto no canto inferior direito da foto */}
                    <div className="absolute bottom-3 right-3 z-10 glass-button-circle !w-9 !h-9 text-[#A74447] shadow-sm">
                      <IconComp className="w-4 h-4 text-[#A74447]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* 3. Título do tratamento */}
                  <h3
                    className="text-xl md:text-2xl font-serif font-medium text-[#28242C] leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {treatment.title}
                  </h3>

                  {/* 4. Descrição curta */}
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {treatment.description}
                  </p>

                  {/* 5. Lista de 2-3 benefícios principais com check fino */}
                  <div className="mt-4 space-y-2">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#A74447]">
                      Benefícios Principais
                    </span>
                    <ul className="space-y-1.5 pt-0.5">
                      {(treatment.benefits || []).slice(0, 3).map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-sm text-[#28242C]/85">
                          <span className="text-[#A74447] shrink-0 mt-0.5">
                            <Check className="w-4 h-4" strokeWidth={1.5} />
                          </span>
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 6. Metadados em linha */}
                  <div className="mt-4 pt-3 border-t border-[#783c28]/10 flex items-center flex-wrap gap-2 text-xs text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#A74447]" strokeWidth={1.5} />
                      <span>{treatment.duration}</span>
                    </div>
                    <span className="text-neutral-300 font-light">•</span>
                    <div className="flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-[#A74447]" strokeWidth={1.5} />
                      <span>{treatment.recovery}</span>
                    </div>
                  </div>

                  {/* 7. Rodapé com dois CTAs */}
                  <div className="mt-auto pt-6 flex flex-col md:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => onNavigate('contato')}
                      className="w-full md:flex-1 py-3 px-3 rounded-xl bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-center"
                    >
                      <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Agendar Sessão</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const slug = getProcedureSlugForTreatmentId(treatment.id);
                        onNavigate('procedimento', slug);
                      }}
                      className="w-full md:flex-1 py-3 px-3 rounded-xl border border-[#28242C]/25 text-[#28242C] hover:border-[#28242C] hover:bg-[#28242C]/5 text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <span className="md:hidden lg:inline">Ler mais sobre o procedimento</span>
                      <span className="hidden md:inline lg:hidden">Ler mais</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Help Banner */}
      <section className="py-20 sm:py-28 bg-[#FAF4EF] border-t border-[#A59A91]/25">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-sm rounded-xl"
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
