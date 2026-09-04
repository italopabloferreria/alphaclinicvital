import React from 'react';
import {
  Sparkles,
  Droplets,
  Sun,
  Activity,
  Smile,
  Flame,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tag?: string;
}

const MOCK_SERVICES: readonly Service[] = [
  {
    id: 'bioestimuladores',
    title: 'Bioestimuladores de Colágeno',
    description:
      'Estimule a produção natural de colágeno da pele com Radiesse e Sculptra, recuperando a firmeza, elasticidade e contorno facial de forma gradual e duradoura.',
    icon: Sparkles,
    tag: 'Mais Procurado',
  },
  {
    id: 'botox-harmonizacao',
    title: 'Toxina Botulínica Preventiva',
    description:
      'Suavize linhas de expressão na testa, glabela e pés de galinha sem perder a sua expressividade. Resultados elegantes e harmoniosos.',
    icon: Smile,
    tag: 'Procedimento Rápido',
  },
  {
    id: 'acido-hialuronico',
    title: 'Preenchimento com Ácido Hialurônico',
    description:
      'Restaure volumes perdidos, delineie o contorno labial e mandíbula e amenize olheiras profundas com precisão milimétrica e sofisticação.',
    icon: Droplets,
    tag: 'Resultado Imediato',
  },
  {
    id: 'ultrassom-microfocado',
    title: 'Ultrassom Microfocado (Lifting)',
    description:
      'Tecnologia não-invasiva de lifting facial e de pescoço. Atinge as camadas musculares mais profundas (SMAS), promovendo retração e rejuvenescimento.',
    icon: Activity,
    tag: 'Padrão Ouro',
  },
  {
    id: 'laser-lavieen',
    title: 'Laser Fracionado & Glow Skin',
    description:
      'Feche poros dilatados, clareie melasmas e manchas solares e conquiste uma textura aveludada conhecida como "pele de porcelana".',
    icon: Sun,
    tag: 'Efeito BB Cream',
  },
  {
    id: 'remodelacao-corporal',
    title: 'Remodelação Corporal Avançada',
    description:
      'Combinação de criofrequência e bioestimulação corporal para redução de gordura localizada, flacidez e tratamento eficaz de celulite.',
    icon: Flame,
    tag: 'Corpo & Contorno',
  },
];

export const Services: React.FC = () => {
  return (
    <section id="tratamentos" className="py-20 lg:py-28 bg-[#FAF4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#F5E9DF] border border-[#DD9299]/40 text-[#A74447] text-xs font-semibold tracking-wider uppercase">
            Protocolos Exclusivos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#28242C]">
            Tratamentos Criados para Realçar Sua Autenticidade
          </h2>
          <p className="text-base sm:text-lg text-[#28242C]/75 font-normal leading-relaxed">
            Cada procedimento é precedido por um diagnóstico clínico aprofundado, garantindo
            resultados naturais, seguros e plenamente alinhados aos seus objetivos.
          </p>
        </div>

        {/* CSS Grid de Tratamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MOCK_SERVICES.map((service) => {
            const IconComponent = service.icon;

            return (
              <article
                key={service.id}
                className="group relative bg-white rounded-2xl p-7 sm:p-8 border border-[#A59A91]/25 shadow-sm hover:shadow-md hover:border-[#DD9299] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Linha do Topo: Ícone + Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5E9DF] text-[#A74447] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#A74447] group-hover:text-white shadow-sm">
                      <IconComponent className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    {service.tag && (
                      <span className="text-[11px] font-medium tracking-wide px-3 py-1 rounded-full bg-[#FAF4EF] text-[#28242C]/80 border border-[#A59A91]/30 group-hover:bg-[#F5E9DF] group-hover:text-[#A74447] group-hover:border-[#DD9299]/50 transition-colors">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  {/* Título & Descrição */}
                  <h3 className="text-xl font-bold text-[#28242C] tracking-tight group-hover:text-[#A74447] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#28242C]/75 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Ação do Card */}
                <div className="mt-8 pt-5 border-t border-[#A59A91]/15 flex items-center justify-between text-sm font-semibold text-[#A74447] group-hover:text-[#8B3437]">
                  <span>Saiba mais sobre o protocolo</span>
                  <div className="w-8 h-8 rounded-full bg-[#F5E9DF] group-hover:bg-[#A74447] text-[#A74447] group-hover:text-white flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Banner Inferior com tons da paleta */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#28242C] to-[#3B3441] border border-[#A59A91]/25 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold tracking-tight">
              Em dúvida sobre qual o procedimento ideal para você?
            </h4>
            <p className="text-[#F5E9DF]/85 text-sm">
              Realize uma consulta de avaliação personalizada com nosso corpo clínico especialista.
            </p>
          </div>
          <a
            href="/contato"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#A74447] hover:bg-[#8B3437] text-white font-semibold text-sm active:scale-95 transition-all shadow-sm"
          >
            Conversar com um Especialista
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
