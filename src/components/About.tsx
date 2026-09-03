import React from 'react';
import { ShieldCheck, Award, Sparkles, UserCheck, CheckCircle2 } from 'lucide-react';

interface ClinicPillar {
  title: string;
  description: string;
}

const PILLARS: readonly ClinicPillar[] = [
  {
    title: 'Corpo Clínico Especializado',
    description: 'Biomédicos e dermatologistas com formação contínua em congressos mundiais de estética.',
  },
  {
    title: 'Ambiente Sofisticado & Privativo',
    description: 'Suítes de atendimento individuais planejadas para máximo conforto, sigilo e serenidade.',
  },
  {
    title: 'Equipamentos de Última Geração',
    description: 'Parque tecnológico 100% regulamentado pela Anvisa, com manutenção e calibragem rigorosas.',
  },
];

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white border-y border-[#A59A91]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna 1: Conteúdo Textual */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5E9DF] border border-[#DD9299]/50 text-[#A74447] text-xs font-semibold tracking-wider uppercase shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#A74447]" />
              <span>Sobre a Alpha Clinic Vital</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#28242C] leading-tight">
              Onde o rigor científico se une ao acolhimento de alto padrão em Brasília.
            </h2>

            <p className="text-base text-[#28242C]/80 leading-relaxed">
              Localizada no AlphaCenter, no Jardim Botânico (SH Tororó), a <strong>Alpha Clinic Vital</strong> nasceu
              para proporcionar um refúgio de tranquilidade, estética avançada e longevidade. Acreditamos que a verdadeira
              sofisticação reside na naturalidade: realçar sua beleza autêntica com protocolos sob medida.
            </p>

            <p className="text-base text-[#28242C]/80 leading-relaxed">
              Nossa equipe multidisciplinar dedica tempo a cada paciente. Realizamos anamnese aprofundada,
              mapeamento facial e corporal minucioso e acompanhamento contínuo em todas as etapas do
              tratamento.
            </p>

            {/* Pilares com ícones Terracotta */}
            <div className="pt-2 space-y-4">
              {PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-[#FAF4EF] transition-colors">
                  <div className="p-2 rounded-lg bg-[#F5E9DF] text-[#A74447] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#28242C]">{pillar.title}</h3>
                    <p className="text-xs text-[#A59A91] mt-0.5 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pílulas de Credibilidade */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#28242C] bg-[#F5E9DF]/70 px-4 py-2 rounded-full border border-[#A59A91]/30">
                <ShieldCheck className="w-4 h-4 text-[#A74447]" />
                <span>Certificação Anvisa Grau Médico</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#28242C] bg-[#F5E9DF]/70 px-4 py-2 rounded-full border border-[#A59A91]/30">
                <UserCheck className="w-4 h-4 text-[#A74447]" />
                <span>Atendimento 100% Individualizado</span>
              </div>
            </div>
          </div>

          {/* Coluna 2: Placeholder Elegante para Imagem */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              
              {/* Moldura Visual */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-[#F5E9DF] via-[#FAF4EF] to-[#DD9299]/20 border border-[#A59A91]/25 shadow-sm flex flex-col items-center justify-center p-8 text-center group">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#A74447_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-[#DD9299]/30 flex items-center justify-center text-[#A74447] mb-4 transition-transform duration-300 group-hover:scale-105">
                  <Sparkles className="w-9 h-9 text-[#A74447]" />
                </div>

                <div className="relative z-10 space-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#A74447] font-bold">
                    Espaço Conceito & Bem-Estar
                  </span>
                  <h4 className="text-xl font-bold text-[#28242C]">
                    Ambientes Projetados para a Serenidade
                  </h4>
                  <p className="text-xs text-[#A59A91] max-w-xs mx-auto">
                    [Placeholder de Imagem da Clínica / Recepção e Salas de Atendimento AlphaCenter]
                  </p>
                </div>

                <div className="relative z-10 mt-6 inline-flex items-center gap-2 text-[11px] text-[#A59A91] font-mono bg-white/80 px-3 py-1 rounded-md border border-[#A59A91]/30">
                  <span>Dimensões ideais: 1200x900px • Formato WebP</span>
                </div>
              </div>

              {/* Badges Flutuantes */}
              <div className="absolute -top-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#A59A91]/25 rounded-2xl p-4 shadow-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5E9DF] text-[#A74447] flex items-center justify-center font-bold text-sm">
                  10+
                </div>
                <div>
                  <p className="text-xs font-bold text-[#28242C]">Anos de Tradição</p>
                  <p className="text-[11px] text-[#A59A91]">Excelência e pioneirismo</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#A59A91]/25 rounded-2xl p-4 shadow-md flex items-center gap-3 max-w-[220px]">
                <div className="w-3 h-3 rounded-full bg-[#A74447] animate-ping" />
                <div>
                  <p className="text-xs font-bold text-[#28242C]">Tecnologia Padrão Ouro</p>
                  <p className="text-[11px] text-[#A59A91]">Aprovada por FDA e Anvisa</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
