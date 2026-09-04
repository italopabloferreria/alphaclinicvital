import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
  HelpCircle,
  ChevronDown,
  Layers,
  HeartPulse,
} from 'lucide-react';
import { PageRoute } from '../types';
import { BlurText } from '../components/BlurText';
import { getProcedureBySlugOrId } from '../data/procedures';

interface ProcedureDetailPageProps {
  initialProcedureSlug?: string;
  onNavigate: (route: PageRoute) => void;
}

export const ProcedureDetailPage: React.FC<ProcedureDetailPageProps> = ({
  initialProcedureSlug = 'limpeza-de-pele',
  onNavigate,
}) => {
  const activeProcedure = getProcedureBySlugOrId(initialProcedureSlug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const scrollToSection = (id: string): void => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = (procedureName: string): void => {
    const url = `https://wa.me/5561981112868?text=${encodeURIComponent(
      `Olá! Estava no site da Alpha Clinic Vital e gostaria de agendar uma avaliação para ${procedureName}.`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#F5E9DF] text-[#28242C] font-body selection:bg-[#DD9299]/30">
      
      {/* =========================================================================
          BREADCRUMB & BACK NAVIGATION BAR (Clean, without rolling menus)
          ========================================================================= */}
      <div className="border-b border-[#A59A91]/25 bg-white/10 backdrop-blur-lg sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('tratamentos')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#A74447] hover:text-[#8F393C] transition-colors cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Voltar para todos os tratamentos</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#A59A91]">
            <span
              className="hidden sm:inline hover:underline cursor-pointer"
              onClick={() => onNavigate('tratamentos')}
            >
              Tratamentos
            </span>
            <span className="hidden sm:inline">/</span>
            <span className="font-semibold text-[#28242C]">{activeProcedure.name}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HERO SECTION (High Contrast, Bold CTAs, BlurText & Main Photo)
          ========================================================================= */}
      <section className="relative py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#A59A91]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Explanation & High-Contrast CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Tag & Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#A74447]/15 text-[#A74447] text-xs font-semibold uppercase tracking-wider">
                {activeProcedure.categoryTag}
              </span>
              <span className="text-xs text-[#A59A91] font-medium hidden sm:inline">
                • {activeProcedure.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#28242C] leading-[1.08] tracking-tight">
              <BlurText text={activeProcedure.headline} delay={0.1} />
            </h1>

            {/* Explanation paragraph */}
            <p className="text-base sm:text-lg text-[#28242C]/80 leading-relaxed font-light">
              {activeProcedure.subtext}
            </p>

            {/* Key Clinical Indicators */}
            <div className="grid grid-cols-2 gap-4 py-3 max-w-md">
              <div className="glass-card">
                <Clock className="w-5 h-5 text-[#A74447] mb-2" />
                <p className="text-2xl sm:text-3xl font-serif font-semibold text-[#28242C]">
                  {activeProcedure.stat1.number}
                </p>
                <p className="text-xs text-[#28242C]/70 mt-1 font-medium">
                  {activeProcedure.stat1.label}
                </p>
              </div>

              <div className="glass-card">
                <CheckCircle2 className="w-5 h-5 text-[#A74447] mb-2" />
                <p className="text-2xl sm:text-3xl font-serif font-semibold text-[#28242C]">
                  {activeProcedure.stat2.number}
                </p>
                <p className="text-xs text-[#28242C]/70 mt-1 font-medium">
                  {activeProcedure.stat2.label}
                </p>
              </div>
            </div>

            {/* High-Contrast Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleWhatsApp(activeProcedure.name)}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#A74447] hover:bg-[#8F393C] text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#A74447]/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer rounded-none"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span className="text-white">Agendar Avaliação</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('como-funciona')}
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#28242C] text-[#28242C] hover:bg-[#28242C] hover:text-white text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer rounded-none"
              >
                <span>Como Funciona &darr;</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('protocolo')}
                className="inline-flex items-center gap-2 px-6 py-4 border border-[#A59A91]/40 text-[#A74447] hover:bg-[#FAF4EF] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer rounded-none"
              >
                <span>Ver Passo a Passo &darr;</span>
              </button>
            </div>

          </div>

          {/* Right Column: Featured Procedure Photo with Liquid Glass Framing */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#28242C]/10 border border-[#A59A91]/25 bg-[#FAF4EF]">
              <img
                src={activeProcedure.image}
                alt={activeProcedure.name}
                className="w-full aspect-[4/3] sm:aspect-[1/1] object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 glass-pill text-[#28242C] text-xs font-semibold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#A74447]" />
                  <span>Procedimento Clínico: {activeProcedure.name}</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 1: DETAILED MECHANISM OF ACTION (Como Funciona a Nível Biológico)
          ========================================================================= */}
      <section id="como-funciona" className="py-20 bg-[#FAF4EF] border-b border-[#A59A91]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A74447]">
                Ciência &amp; Mecanismo de Ação
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#28242C]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {activeProcedure.howItWorks.mechanismTitle}
              </h2>
              <p className="text-base sm:text-lg text-[#28242C]/85 leading-relaxed font-light">
                {activeProcedure.howItWorks.mechanismText}
              </p>

              {/* Technical badges */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card !p-4 flex items-start gap-3">
                  <Layers className="w-5 h-5 text-[#A74447] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#28242C]">
                      Camadas Alvo
                    </h4>
                    <p className="text-xs text-[#28242C]/75 mt-0.5">
                      {activeProcedure.howItWorks.targetLayers}
                    </p>
                  </div>
                </div>

                <div className="glass-card !p-4 flex items-start gap-3">
                  <HeartPulse className="w-5 h-5 text-[#A74447] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#28242C]">
                      Conforto &amp; Anestesia
                    </h4>
                    <p className="text-xs text-[#28242C]/75 mt-0.5">
                      {activeProcedure.howItWorks.anesthesiaInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Para quem é indicado */}
            <div className="lg:col-span-5 glass-card space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#A74447]">
                  Avaliação &amp; Diagnóstico
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-serif text-[#28242C]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Para quem é indicado?
                </h3>
              </div>

              <ul className="space-y-4">
                {activeProcedure.whoIsItFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#A74447]/15 text-[#A74447] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm text-[#28242C]/85 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: STEP-BY-STEP CLINICAL PROTOCOL (id="protocolo" for smooth scroll)
          ========================================================================= */}
      <section id="protocolo" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#A59A91]/25">
        
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A74447]">
            Protocolo Clínico Detalhado
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#28242C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Passo a passo da sua sessão
          </h2>
          <p className="text-sm sm:text-base text-[#28242C]/75 leading-relaxed">
            Cada etapa é conduzida sob rígidos protocolos sanitários, pontualidade e respeito à anatomia do seu rosto.
          </p>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeProcedure.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card flex flex-col justify-between transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-[#A74447] text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm">
                    0{idx + 1}
                  </span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {step.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-white/70 text-[#28242C]/75 border border-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3
                  className="text-xl font-serif font-medium text-[#28242C] pt-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {step.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#28242C]/80 font-light leading-relaxed pt-5">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: TIMELINE & EVOLUTION OF RESULTS
          ========================================================================= */}
      <section className="py-20 bg-[#FAF4EF] border-b border-[#A59A91]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A74447]">
              Evolução Temporal
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#28242C]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              O que esperar nos dias e meses seguintes
            </h2>
            <p className="text-sm text-[#28242C]/75">
              Transparência absoluta quanto ao tempo biológico de acomodação e consolidação dos resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeProcedure.timeline.map((item, idx) => (
              <div
                key={idx}
                className="glass-card space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#A74447]/15 text-[#A74447] flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="font-serif text-lg font-semibold text-[#28242C]">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-[#28242C]/80 leading-relaxed font-light">
                  {item.effect}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FAQ (Dúvidas Frequentes)
          ========================================================================= */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-[#A74447] text-xs uppercase tracking-widest font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-serif font-medium text-[#28242C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Dúvidas comuns sobre {activeProcedure.name}
          </h2>
        </div>

        <div className="space-y-3">
          {activeProcedure.faqs.map((faq, fIdx) => {
            const isOpen = openFaqIndex === fIdx;
            return (
              <div
                key={fIdx}
                className="glass-card !p-0 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(fIdx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F5E9DF]/60 transition-colors"
                >
                  <span className="font-serif text-lg text-[#28242C] font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A74447] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-[#28242C]/80 leading-relaxed border-t border-[#A59A91]/15 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: FINAL BOOKING CALLOUT
          ========================================================================= */}
      <section className="py-16 bg-[#FAF4EF] border-t border-[#A59A91]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 glass-card text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-[#A74447]/15 text-[#A74447] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h3
              className="text-3xl sm:text-4xl font-serif font-medium text-[#28242C]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Agende sua avaliação para {activeProcedure.name}
            </h3>
            <p className="text-sm sm:text-base text-[#28242C]/75 max-w-xl mx-auto leading-relaxed">
              Atendimento médico individualizado com hora marcada no Centro Comercial AlphaCenter, Jardim Botânico, Brasília - DF.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleWhatsApp(activeProcedure.name)}
              className="px-8 py-4 bg-[#A74447] hover:bg-[#8F393C] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer rounded-none"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-white">Falar no WhatsApp e Agendar</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('tratamentos')}
              className="px-8 py-4 border border-[#28242C] text-[#28242C] hover:bg-[#28242C] hover:text-white text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer rounded-none"
            >
              Ver Outros Procedimentos
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProcedureDetailPage;
