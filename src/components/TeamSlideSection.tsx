import React, { useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    name: 'Dr. Andrei Baranov',
    role: 'Diretor Clínico & Dermatologia Estética',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225202_f9e684f3-dc19-469a-8142-eb391bfc601b.png&w=1280&q=85',
    description:
      'Lidera o planejamento estético facial com foco em resultados naturais e harmônicos. Transforma queixas em protocolos precisos e sustentáveis que valorizam a identidade de cada paciente.',
  },
  {
    name: 'Dra. Daria Lebedeva',
    role: 'Especialista em Harmonização Facial',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225149_7937e8ea-3b0a-46ab-919f-775627695a23.png&w=1280&q=85',
    description:
      'Especialista em mapeamento e arquitetura facial. Desenvolve planos de preenchimento e sustentação com precisão milimétrica, proporcionando jovialidade e elegância sem excessos.',
  },
  {
    name: 'Dr. Ivan Sorokin',
    role: 'Tecnologias Médicas & Lasers Avançados',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225153_f2b1fc04-776a-4f2e-879b-b764ea762e77.png&w=1280&q=85',
    description:
      'Responsável pelos protocolos de alta tecnologia como Liftera e Lavieen. Combina energia fracionada e regeneração celular para restaurar a textura e o viço da pele com total conforto.',
  },
  {
    name: 'Dra. Anna Fedorova',
    role: 'Bioestimulação & Longevidade Cutânea',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225847_f456fd9c-8938-4103-836d-51b0e88a9510.png&w=1280&q=85',
    description:
      'Pioneira em estratégias de estímulo contínuo de colágeno. Conduz intervenções progressivas que fortalecem a derme e mantêm o tônus natural da face ao longo do tempo.',
  },
  {
    name: 'Dr. Pavel Smirnov',
    role: 'Remodelação Corporal & Contorno',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_225854_3958a522-6203-4f84-a7fa-3b3f1dcd7256.png&w=1280&q=85',
    description:
      'Dedicado a protocolos corporais integrados para definição e firmeza. Une drenagem avançada, criofrequência e bioestimuladores para resultados visíveis e seguros.',
  },
  {
    name: 'Dra. Olga Kravtsova',
    role: 'Anamnese & Acompanhamento Clínico',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231111_fcefaa07-6851-4fdc-ac7b-98754ac9d5c4.png&w=1280&q=85',
    description:
      'Acompanha de perto cada fase da recuperação do paciente. Garante conforto integral, orientações personalizadas de cuidados diários e suporte contínuo após cada procedimento.',
  },
  {
    name: 'Dr. Igor Zakharenko',
    role: 'Rejuvenescimento Periocular & Lábios',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_231124_9a1505aa-8c44-4046-aff8-1aa0bc7b3ef3.png&w=1280&q=85',
    description:
      'Foco minucioso nas áreas delicadas do rosto: olhar descansado e lábios naturalmente definidos. Valoriza detalhes que iluminam a expressão sem alterar sua essência.',
  },
  {
    name: 'Dra. Ksenia Romanova',
    role: 'Coordenação Médica & Concierge VIP',
    image:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260727_230413_62e8b331-89be-4d35-84fe-330ba9b1b64f.png&w=1280&q=85',
    description:
      'Assegura que cada visita ao AlphaCenter seja um momento acolhedor e seguro. Conecta cuidado médico de excelência com pontualidade, sigilo e atendimento verdadeiramente humano.',
  },
];

export const TeamSlideSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeSlide = TEAM_MEMBERS[activeIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden font-geist text-white select-none">
      {/* 8 Full-bleed stacked background portraits */}
      {TEAM_MEMBERS.map((member, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={member.name}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ backgroundImage: `url('${member.image}')` }}
            aria-hidden={!isActive}
          />
        );
      })}

      {/* Light dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content Layer (z-10) */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-14 lg:px-16">
        
        {/* Top Zone — Headline + Bio */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Static H1 */}
          <h2 className="max-w-xl text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white">
            A excelência médica e o cuidado que acompanham você a cada&nbsp;dia
          </h2>

          {/* Dynamic description with fadeIn keyframe on key remount */}
          <p
            key={activeSlide.name}
            className="max-w-xs text-sm font-medium leading-relaxed text-white/85 sm:text-base md:pt-2 animate-[fadeIn_0.5s_ease]"
          >
            {activeSlide.description}
          </p>
        </div>

        {/* Bottom Zone — Avatar picker + Meta footer */}
        <div className="flex flex-col gap-8">
          
          {/* Avatar picker row */}
          <div className="flex items-end gap-2 sm:gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 sm:overflow-visible sm:pb-0">
            {TEAM_MEMBERS.map((member, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Ver perfil de ${member.name}`}
                  className="flex shrink-0 flex-col items-center gap-2 cursor-pointer focus:outline-none group"
                >
                  {/* Active indicator dot */}
                  <span
                    className={`h-1 w-1 rounded-full bg-[#DD9299] transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Circular thumbnail */}
                  <span className={`block h-10 w-10 overflow-hidden rounded-full sm:h-14 sm:w-14 border transition-transform duration-300 group-hover:scale-105 ${
                    isActive ? 'border-[#DD9299] ring-2 ring-[#DD9299]/50' : 'border-white/30'
                  }`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Meta footer */}
          <div className="border-t border-white/20 pt-5 flex flex-wrap items-center justify-between gap-4 text-sm font-medium">
            {/* 1. Name */}
            <span
              key={activeSlide.name}
              className="text-white font-semibold animate-[fadeIn_0.5s_ease]"
            >
              {activeSlide.name}
            </span>

            {/* 2. Role (hidden on mobile) */}
            <span
              key={activeSlide.role}
              className="text-white/80 hidden sm:inline"
            >
              {activeSlide.role}
            </span>

            {/* 3. Static tenure (hidden until md) */}
            <span className="text-white/70 hidden md:inline">
              Excelência médica em Brasília desde 2020
            </span>

            {/* 4. WhatsApp link */}
            <a
              href="https://wa.me/5561981112868"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-[#DD9299] text-white"
            >
              Falar no WhatsApp
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TeamSlideSection;
