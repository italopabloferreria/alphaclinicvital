import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Smile, Heart, ShieldCheck, Droplets, Calendar, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';

interface ProcedureItem {
  name: string;
  slug: string;
  image: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const proceduresData: readonly ProcedureItem[] = [
  {
    name: "Limpeza de Pele",
    slug: "limpeza-de-pele",
    image: "/procedures/limpeza-de-pele.jpg",
    description: "Higienização profunda para remover impurezas, controlar a oleosidade e revitalizar a pele.",
    icon: Droplets,
  },
  {
    name: "Botox",
    slug: "botox",
    image: "/procedures/botox.jpg",
    description: "Procedimento estético para suavizar linhas de expressão e proporcionar aparência mais descansada.",
    icon: Smile,
  },
  {
    name: "Preenchimento Labial",
    slug: "preenchimento-labial",
    image: "/procedures/preenchimento-labial.jpg",
    description: "Técnica voltada para volume, contorno e harmonização dos lábios com resultado natural.",
    icon: Heart,
  },
  {
    name: "Bioestimuladores",
    slug: "bioestimuladores",
    image: "/procedures/bioestimuladores.jpg",
    description: "Tratamento que estimula a produção de colágeno e melhora firmeza, textura e sustentação da pele.",
    icon: Sparkles,
  },
  {
    name: "Peeling Químico",
    slug: "peeling-quimico",
    image: "/procedures/peeling-quimico.jpg",
    description: "Renovação controlada da pele para melhorar manchas, textura, viço e uniformidade.",
    icon: ShieldCheck,
  },
];

interface ProceduresSectionProps {
  onNavigate?: (route: PageRoute) => void;
}

export const ProceduresSection: React.FC<ProceduresSectionProps> = ({ onNavigate }) => {
  const [activeProcedure, setActiveProcedure] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-rotation every 4 seconds, pauses on user interaction
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveProcedure((prev) => (prev + 1) % proceduresData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleSelectProcedure = (index: number): void => {
    setActiveProcedure(index);
    setIsAutoPlaying(false); // Pause auto-rotation when user clicks
  };

  const handleBookClick = (): void => {
    if (onNavigate) {
      onNavigate('contato');
    } else {
      const activeName = proceduresData[activeProcedure].name;
      const url = `https://wa.me/5561981112868?text=${encodeURIComponent(
        `Olá! Gostaria de agendar uma avaliação para ${activeName} na Alpha Clinic Vital.`
      )}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const current = proceduresData[activeProcedure];

  return (
    <section
      id="procedimentos"
      className="w-full py-20 lg:py-28 bg-[#FAF4EF] border-b border-[#A59A91]/25 text-[#28242C] font-sans transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Fade Up */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] text-[#A74447] uppercase">
            Procedimentos
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#28242C] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Tratamentos pensados para realçar sua beleza natural
          </h2>
          <p className="text-sm sm:text-base text-[#28242C]/75 max-w-2xl mx-auto leading-relaxed">
            Oferecemos procedimentos faciais e corporais com atendimento personalizado, tecnologia de ponta e respeito à sua essência.
          </p>
        </motion.div>

        {/* Main 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Image Display + Description + CTA */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F5E9DF] border border-[#A59A91]/20 shadow-xl shadow-[#28242C]/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, scale: 0.98, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.02, x: 8 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle vignette gradient at bottom */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* Floating badge over image */}
                  <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 glass-pill text-[#28242C] text-xs font-semibold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#A74447]" />
                      <span>{current.name}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description & CTA Button */}
            <div className="space-y-4 pt-1">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.description}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm sm:text-base text-[#28242C]/85 leading-relaxed font-medium min-h-[48px]"
                >
                  {current.description}
                </motion.p>
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleBookClick}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#A74447] bg-[#A74447] hover:bg-[#8F393C] text-white text-xs uppercase tracking-widest font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-[#A74447]/20 cursor-pointer rounded-none"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span className="text-white">Agendar avaliação</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 text-white" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = `#/procedimento/${current.slug}`;
                    if (onNavigate) onNavigate('procedimento');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#28242C] text-[#28242C] hover:bg-[#28242C] hover:text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer rounded-none"
                >
                  <span>Ler mais sobre o procedimento</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical List of 5 Procedures */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {proceduresData.map((proc, index) => {
              const isActive = index === activeProcedure;
              const IconComponent = proc.icon || Sparkles;
              const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <button
                  key={proc.name}
                  type="button"
                  onClick={() => handleSelectProcedure(index)}
                  className={`w-full text-left glass-card !p-4 sm:!p-5 transition-all duration-300 flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A74447] ${
                    isActive
                      ? 'shadow-sm translate-x-1 sm:translate-x-2 ring-1 ring-[#A74447]'
                      : 'hover:scale-[1.01]'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Index Number */}
                    <span
                      className={`text-xs font-mono tracking-wider transition-colors ${
                        isActive ? 'text-[#A74447] font-semibold' : 'text-[#A59A91]'
                      }`}
                    >
                      {formattedIndex}
                    </span>

                    {/* Procedure Name */}
                    <span
                      className={`text-base sm:text-lg font-serif transition-colors ${
                        isActive
                          ? 'text-[#28242C] font-semibold'
                          : 'text-[#28242C]/75 group-hover:text-[#28242C]'
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {proc.name}
                    </span>
                  </div>

                  {/* Icon & Active Indicator */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`p-1.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-[#A74447]/15 text-[#A74447]'
                          : 'text-[#A59A91] group-hover:text-[#28242C]'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isActive ? 'bg-[#A74447] scale-100' : 'bg-transparent scale-0'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProceduresSection;
