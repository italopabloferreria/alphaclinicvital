import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Heart,
  Award,
  AlertCircle,
} from 'lucide-react';
import { PageRoute } from '../types';

interface ClubePageProps {
  onNavigate?: (route: PageRoute) => void;
}

const PROCEDURES_OPTIONS = [
  'Bioestimuladores',
  'Toxina botulínica',
  'Ultrassom microfocado',
  'Laser',
  'Preenchimento facial',
  'Remodelação corporal',
  'Avaliação personalizada',
] as const;

const HOW_HEARD_OPTIONS = [
  'Instagram',
  'Indicação',
  'Google',
  'Evento',
  'Já sou paciente',
  'Outro',
] as const;

const SEX_OPTIONS = [
  'Feminino',
  'Masculino',
  'Prefiro não informar',
  'Outro',
] as const;

export const ClubePage: React.FC<ClubePageProps> = ({ onNavigate }) => {
  // Controle de Etapa do Formulário (1: Contato, 2: Perfil, 3: Interesses)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Estado dos campos do formulário (Estado fixo como DF padrão)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    sex: 'Feminino',
    birthDate: '',
    city: 'Brasília',
    state: 'DF',
    isPatient: 'Sim',
    procedures: [] as string[],
    howHeard: 'Instagram',
    objective: '',
    consent: false,
  });

  const [stepErrors, setStepErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Máscara dinâmica para WhatsApp brasileiro (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }

    setFormData((prev) => ({ ...prev, phone: val }));
    if (stepErrors.phone) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (stepErrors[name]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleProcedureToggle = (proc: string) => {
    setFormData((prev) => {
      const exists = prev.procedures.includes(proc);
      return {
        ...prev,
        procedures: exists
          ? prev.procedures.filter((p) => p !== proc)
          : [...prev.procedures, proc],
      };
    });
  };

  // Validação por etapa antes de avançar
  const validateStep1 = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Por favor, informe seu nome completo.';
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Informe um número de WhatsApp válido com DDD.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Informe um endereço de e-mail válido.';
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.birthDate) errors.birthDate = 'Informe sua data de nascimento.';
    if (!formData.city.trim()) errors.city = 'Informe sua cidade / região administrativa.';
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.consent) {
      errors.consent = 'Você precisa autorizar o contato para participar da lista de espera.';
    }
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    setStepErrors({});
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de me inscrever para o Clube Alpha Clinic Vital.\n\n` +
      `Nome: ${formData.name}\n` +
      `WhatsApp: ${formData.phone}\n` +
      `E-mail: ${formData.email}\n` +
      `Cidade: ${formData.city} - ${formData.state}\n` +
      `Já é paciente: ${formData.isPatient}\n` +
      `Procedimentos de interesse: ${formData.procedures.join(', ') || 'Geral'}\n` +
      `Como conheceu: ${formData.howHeard}\n` +
      `Objetivo: ${formData.objective || 'Acesso a vantagens e acompanhamento exclusivo'}`
  );
  const whatsappUrl = `https://wa.me/5561981112868?text=${whatsappMessage}`;

  return (
    <div className="bg-black text-white selection:bg-[#b46e79]/40 selection:text-white font-sans min-h-screen">
      
      {/* =========================================================================
          HERO SECTION FULL-BLEED COM VÍDEO E FORMULÁRIO MULTI-STEP
          ========================================================================= */}
      <section className="relative w-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)] overflow-hidden bg-black flex items-center justify-center py-10 sm:py-12 lg:py-16">
        
        {/* Background Video Layer */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-95"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4"
            type="video/mp4"
          />
        </video>

        {/* Camada suave e sutil para legibilidade sem escurecer excessivamente o vídeo */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/35 z-[1] pointer-events-none"
          aria-hidden="true"
        />

        {/* Conteúdo Foreground */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex items-center justify-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            
            {/* -------------------------------------------------------------
                COLUNA ESQUERDA: MENSAGEM EDITORIAL E PILARES DO CLUBE
                ------------------------------------------------------------- */}
            <div className="space-y-6 lg:space-y-8 animate-[fadeIn_0.8s_ease_forwards] max-w-2xl">
              
              {/* Selo Editorial */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#b46e79] animate-pulse" />
                <span className="text-[11px] tracking-[0.24em] uppercase text-white/85 font-medium">
                  ALPHA CLINIC VITAL — CLUBE EXCLUSIVO
                </span>
              </div>

              {/* Título Principal em Instrument Serif com sombra suave para legibilidade */}
              <h1
                className="font-instrument text-[2.75rem] leading-[0.96] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-normal text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Entre para o Clube da Alpha Clinic Vital e receba benefícios exclusivos
              </h1>

              {/* Subtexto Distribuído com sombra suave */}
              <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                Cadastre-se para ter acesso prioritário a novidades, condições especiais, experiências selecionadas e convites pensados para pacientes que valorizam cuidado, estética médica e exclusividade no Jardim Botânico.
              </p>

              {/* Benefícios Integrados com Excelente Distribuição e Leitura */}
              <div className="space-y-3.5 pt-2">
                {[
                  {
                    icon: Sparkles,
                    title: 'Acesso Antecipado & Lançamentos',
                    desc: 'Primeira escolha na agenda para novas tecnologias e protocolos clínicos avançados.',
                  },
                  {
                    icon: Heart,
                    title: 'Condições & Benefícios Exclusivos',
                    desc: 'Vantagens reservadas para pacientes que mantêm constância no autocuidado.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Curadoria & Convites Especiais',
                    desc: 'Encontros intimistas sobre longevidade, estética e experiências médicas sob medida.',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-black/25 border border-white/15 backdrop-blur-md hover:bg-black/35 transition-all shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#b46e79]/25 border border-[#b46e79]/50 text-[#d7b7b0] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm sm:text-base font-medium text-white tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Assinatura de Localização e Discrição */}
              <div className="flex items-center gap-3 text-xs text-white/60 pt-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                <span className="font-medium text-white/80">Jardim Botânico • Brasília — DF</span>
                <span>•</span>
                <span>Atendimento Médico Individualizado</span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                COLUNA DIREITA: CARD DO FORMULÁRIO EM ETAPAS (MULTI-STEP)
                ------------------------------------------------------------- */}
            <div className="w-full">
              <div className="rounded-[1.75rem] border border-white/15 bg-black/35 backdrop-blur-md shadow-[0_16px_50px_rgba(0,0,0,0.3)] p-5 sm:p-6 md:p-8 transition-all">
                
                {isSubmitted ? (
                  /* ESTADO DE CONFIRMAÇÃO */
                  <div className="text-center py-10 px-2 space-y-6 animate-[fadeIn_0.5s_ease_forwards]">
                    <div className="w-16 h-16 rounded-full bg-[#b46e79]/20 border border-[#b46e79]/50 text-[#d7b7b0] flex items-center justify-center mx-auto shadow-lg shadow-[#b46e79]/20">
                      <Award className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3
                        className="text-3xl font-instrument font-normal text-white"
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                      >
                        Inscrição enviada com sucesso!
                      </h3>
                      <p className="text-sm text-white/75 max-w-md mx-auto leading-relaxed">
                        Obrigada, <strong className="text-white">{formData.name}</strong>. Seus dados foram recebidos pela curadoria da Alpha Clinic Vital. Entraremos em contato pelo WhatsApp informado conforme a abertura de vagas para o Clube.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#b46e79] hover:bg-[#a45d69] text-white font-medium py-3.5 px-7 transition-all shadow-md active:scale-95 text-xs uppercase tracking-widest"
                      >
                        <span>Falar com concierge no WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('home');
                          } else {
                            setIsSubmitted(false);
                            setCurrentStep(1);
                          }
                        }}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/10 text-xs uppercase tracking-widest font-medium transition-all cursor-pointer"
                      >
                        Voltar ao Início
                      </button>
                    </div>
                  </div>
                ) : (
                  /* FORMULÁRIO EM ETAPAS */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Topo do Card com Indicador e Barra de Progresso */}
                    <div className="border-b border-white/10 pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#d7b7b0] px-2.5 py-1 rounded-full bg-[#b46e79]/20 border border-[#b46e79]/40">
                            Etapa {currentStep} de 3
                          </span>
                          <span className="text-xs text-white/50 hidden sm:inline">
                            {currentStep === 1 && 'Identificação'}
                            {currentStep === 2 && 'Perfil'}
                            {currentStep === 3 && 'Preferências'}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-[#d7b7b0]">
                          {currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%'}
                        </span>
                      </div>

                      {/* Barra de Progresso Segmentada */}
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex gap-1.5 mb-4">
                        <div
                          className={`h-full rounded-full transition-all duration-400 flex-1 ${
                            currentStep >= 1
                              ? 'bg-[#b46e79] shadow-[0_0_10px_rgba(180,110,121,0.6)]'
                              : 'bg-white/10'
                          }`}
                        />
                        <div
                          className={`h-full rounded-full transition-all duration-400 flex-1 ${
                            currentStep >= 2
                              ? 'bg-[#b46e79] shadow-[0_0_10px_rgba(180,110,121,0.6)]'
                              : 'bg-white/10'
                          }`}
                        />
                        <div
                          className={`h-full rounded-full transition-all duration-400 flex-1 ${
                            currentStep >= 3
                              ? 'bg-[#b46e79] shadow-[0_0_10px_rgba(180,110,121,0.6)]'
                              : 'bg-white/10'
                          }`}
                        />
                      </div>

                      {/* Títulos e Subtítulos Dinâmicos por Etapa */}
                      <h2 className="text-white font-medium text-lg md:text-xl">
                        {currentStep === 1 && 'Solicite sua entrada — Contato'}
                        {currentStep === 2 && 'Sobre Você — Perfil do Paciente'}
                        {currentStep === 3 && 'Preferências & Finalização'}
                      </h2>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mt-1">
                        {currentStep === 1 &&
                          'Preencha seus dados para entrar na lista de interesse do Clube. Nossa equipe poderá entrar em contato pelo WhatsApp.'}
                        {currentStep === 2 &&
                          'Informações para que a equipe médica compreenda seu perfil de forma personalizada.'}
                        {currentStep === 3 &&
                          'Selecione seus interesses para receber benefícios e convites alinhados ao seu autocuidado.'}
                      </p>
                    </div>

                    {/* =========================================================
                        ETAPA 1: DADOS DE CONTATO E IDENTIFICAÇÃO
                        ========================================================= */}
                    {currentStep === 1 && (
                      <div className="space-y-4 animate-[fadeIn_0.3s_ease_forwards]">
                        {/* 1. Nome Completo */}
                        <div>
                          <label
                            htmlFor="clube-name"
                            className="block text-[13px] font-medium text-white/88 mb-1.5"
                          >
                            Nome completo *
                          </label>
                          <input
                            type="text"
                            id="clube-name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Seu nome completo"
                            className={`w-full bg-white/[0.06] border text-white placeholder:text-white/35 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 transition-all ${
                              stepErrors.name
                                ? 'border-red-400/80 ring-1 ring-red-400/50'
                                : 'border-white/12 focus:border-[#d7b7b0]/30'
                            }`}
                          />
                          {stepErrors.name && (
                            <p className="flex items-center gap-1.5 text-xs text-red-300 mt-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{stepErrors.name}</span>
                            </p>
                          )}
                        </div>

                        {/* 2. WhatsApp */}
                        <div>
                          <label
                            htmlFor="clube-phone"
                            className="block text-[13px] font-medium text-white/88 mb-1.5"
                          >
                            WhatsApp com DDD *
                          </label>
                          <input
                            type="tel"
                            id="clube-phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="(61) 98111-2868"
                            className={`w-full bg-white/[0.06] border text-white placeholder:text-white/35 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 transition-all ${
                              stepErrors.phone
                                ? 'border-red-400/80 ring-1 ring-red-400/50'
                                : 'border-white/12 focus:border-[#d7b7b0]/30'
                            }`}
                          />
                          {stepErrors.phone && (
                            <p className="flex items-center gap-1.5 text-xs text-red-300 mt-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{stepErrors.phone}</span>
                            </p>
                          )}
                        </div>

                        {/* 3. E-mail */}
                        <div>
                          <label
                            htmlFor="clube-email"
                            className="block text-[13px] font-medium text-white/88 mb-1.5"
                          >
                            E-mail *
                          </label>
                          <input
                            type="email"
                            id="clube-email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="seuemail@exemplo.com"
                            className={`w-full bg-white/[0.06] border text-white placeholder:text-white/35 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 transition-all ${
                              stepErrors.email
                                ? 'border-red-400/80 ring-1 ring-red-400/50'
                                : 'border-white/12 focus:border-[#d7b7b0]/30'
                            }`}
                          />
                          {stepErrors.email && (
                            <p className="flex items-center gap-1.5 text-xs text-red-300 mt-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{stepErrors.email}</span>
                            </p>
                          )}
                        </div>

                        {/* Botão Avançar da Etapa 1 */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handleNext}
                            className="w-full rounded-full bg-[#b46e79] hover:bg-[#a45d69] hover:shadow-[0_12px_40px_rgba(180,110,121,0.35)] active:scale-[0.99] text-white font-medium py-3.5 px-6 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
                          >
                            <span>Continuar</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* =========================================================
                        ETAPA 2: PERFIL DO PACIENTE (ESTADO REMOVIDO / PADRÃO DF)
                        ========================================================= */}
                    {currentStep === 2 && (
                      <div className="space-y-4 animate-[fadeIn_0.3s_ease_forwards]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* 4. Sexo */}
                          <div>
                            <label
                              htmlFor="clube-sex"
                              className="block text-[13px] font-medium text-white/88 mb-1.5"
                            >
                              Sexo
                            </label>
                            <select
                              id="clube-sex"
                              name="sex"
                              value={formData.sex}
                              onChange={handleInputChange}
                              className="w-full bg-black/70 border border-white/12 text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 focus:border-[#d7b7b0]/30 transition-all cursor-pointer"
                            >
                              {SEX_OPTIONS.map((opt) => (
                                <option key={opt} value={opt} className="bg-[#1f1b1a] text-white">
                                  {opt}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* 5. Data de Nascimento */}
                          <div>
                            <label
                              htmlFor="clube-birthDate"
                              className="block text-[13px] font-medium text-white/88 mb-1.5"
                            >
                              Data de nascimento *
                            </label>
                            <input
                              type="date"
                              id="clube-birthDate"
                              name="birthDate"
                              required
                              value={formData.birthDate}
                              onChange={handleInputChange}
                              className={`w-full bg-white/[0.06] border text-white placeholder:text-white/35 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 transition-all ${
                                stepErrors.birthDate
                                  ? 'border-red-400/80 ring-1 ring-red-400/50'
                                  : 'border-white/12 focus:border-[#d7b7b0]/30'
                              }`}
                            />
                            {stepErrors.birthDate && (
                              <p className="flex items-center gap-1.5 text-xs text-red-300 mt-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{stepErrors.birthDate}</span>
                              </p>
                            )}
                          </div>

                          {/* 6. Cidade (Estado DF é padrão implícito) */}
                          <div className="sm:col-span-2">
                            <div className="flex items-center justify-between mb-1.5">
                              <label
                                htmlFor="clube-city"
                                className="block text-[13px] font-medium text-white/88"
                              >
                                Cidade / Região Administrativa *
                              </label>
                              <span className="text-[11px] text-[#d7b7b0] font-medium px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                                Distrito Federal (Padrão)
                              </span>
                            </div>
                            <input
                              type="text"
                              id="clube-city"
                              name="city"
                              required
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Ex: Brasília, Lago Sul, Sudoeste, Asa Sul..."
                              className={`w-full bg-white/[0.06] border text-white placeholder:text-white/35 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 transition-all ${
                                stepErrors.city
                                  ? 'border-red-400/80 ring-1 ring-red-400/50'
                                  : 'border-white/12 focus:border-[#d7b7b0]/30'
                              }`}
                            />
                            {stepErrors.city && (
                              <p className="flex items-center gap-1.5 text-xs text-red-300 mt-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{stepErrors.city}</span>
                              </p>
                            )}
                          </div>

                          {/* 7. Você já é paciente da clínica? (Segmented Control) */}
                          <div className="sm:col-span-2">
                            <label className="block text-[13px] font-medium text-white/88 mb-1.5">
                              Você já é paciente da clínica?
                            </label>
                            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-white/[0.04] border border-white/10">
                              {['Sim', 'Não'].map((opt) => {
                                const isSelected = formData.isPatient === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() =>
                                      setFormData((prev) => ({ ...prev, isPatient: opt }))
                                    }
                                    className={`py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#b46e79] text-white shadow-sm'
                                        : 'text-white/70 hover:text-white'
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Botões de Ação da Etapa 2 */}
                        <div className="pt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handlePrev}
                            className="flex-1 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/10 text-white/85 hover:text-white font-medium py-3.5 px-4 transition-all duration-200 cursor-pointer text-sm flex items-center justify-center gap-2"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Voltar</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleNext}
                            className="flex-[2] rounded-full bg-[#b46e79] hover:bg-[#a45d69] hover:shadow-[0_12px_40px_rgba(180,110,121,0.35)] active:scale-[0.99] text-white font-medium py-3.5 px-6 transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
                          >
                            <span>Próximo: Interesses</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* =========================================================
                        ETAPA 3: INTERESSES, CONSENTIMENTO & FINALIZAÇÃO
                        ========================================================= */}
                    {currentStep === 3 && (
                      <div className="space-y-4 animate-[fadeIn_0.3s_ease_forwards]">
                        {/* 8. Procedimentos de maior interesse (Multi-select pills) */}
                        <div>
                          <label className="block text-[13px] font-medium text-white/88 mb-1.5">
                            Procedimentos de maior interesse (selecione um ou mais)
                          </label>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {PROCEDURES_OPTIONS.map((proc) => {
                              const isSelected = formData.procedures.includes(proc);
                              return (
                                <button
                                  key={proc}
                                  type="button"
                                  onClick={() => handleProcedureToggle(proc)}
                                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                                    isSelected
                                      ? 'bg-[#b46e79] border-[#b46e79] text-white shadow-sm'
                                      : 'bg-white/[0.04] border-white/12 text-white/75 hover:border-white/30 hover:text-white'
                                  }`}
                                >
                                  {isSelected ? `✓ ${proc}` : `+ ${proc}`}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 9. Como conheceu a clínica? */}
                        <div>
                          <label
                            htmlFor="clube-howHeard"
                            className="block text-[13px] font-medium text-white/88 mb-1.5"
                          >
                            Como conheceu a clínica?
                          </label>
                          <select
                            id="clube-howHeard"
                            name="howHeard"
                            value={formData.howHeard}
                            onChange={handleInputChange}
                            className="w-full bg-black/70 border border-white/12 text-white rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 focus:border-[#d7b7b0]/30 transition-all cursor-pointer"
                          >
                            {HOW_HEARD_OPTIONS.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#1f1b1a] text-white">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* 10. Objetivo principal com o Clube */}
                        <div>
                          <label
                            htmlFor="clube-objective"
                            className="block text-[13px] font-medium text-white/88 mb-1.5"
                          >
                            Objetivo principal com o Clube
                          </label>
                          <textarea
                            id="clube-objective"
                            name="objective"
                            rows={3}
                            value={formData.objective}
                            onChange={handleInputChange}
                            placeholder="Conte brevemente o que você busca: vantagens exclusivas, acompanhamento, acesso antecipado, experiências da clínica..."
                            className="w-full bg-white/[0.06] border border-white/12 text-white placeholder:text-white/35 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b46e79]/60 focus:border-[#d7b7b0]/30 transition-all resize-none"
                          />
                        </div>

                        {/* 11. Checkbox de Consentimento LGPD */}
                        <div className="pt-1">
                          <label className="flex items-start gap-3 cursor-pointer select-none group">
                            <input
                              type="checkbox"
                              name="consent"
                              required
                              checked={formData.consent}
                              onChange={handleInputChange}
                              className="mt-1 w-4 h-4 rounded border-white/20 text-[#b46e79] focus:ring-[#b46e79]/60 focus:ring-offset-0 bg-white/10 cursor-pointer"
                            />
                            <span className="text-xs text-white/70 leading-relaxed group-hover:text-white/85 transition-colors">
                              Autorizo o contato da Alpha Clinic Vital por WhatsApp, e-mail ou telefone e concordo com o uso dos meus dados para fins de relacionamento e informações sobre o Clube.
                            </span>
                          </label>
                          {stepErrors.consent && (
                            <p className="flex items-center gap-1.5 text-xs text-red-300 mt-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{stepErrors.consent}</span>
                            </p>
                          )}
                        </div>

                        {/* Botões de Ação da Etapa 3 */}
                        <div className="pt-3">
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            <button
                              type="button"
                              onClick={handlePrev}
                              className="w-full sm:w-auto px-6 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/10 text-white/85 hover:text-white font-medium py-3.5 transition-all duration-200 cursor-pointer text-sm flex items-center justify-center gap-2"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              <span>Voltar</span>
                            </button>

                            <button
                              type="submit"
                              disabled={!formData.consent}
                              className="w-full flex-1 rounded-full bg-[#b46e79] hover:bg-[#a45d69] hover:shadow-[0_12px_40px_rgba(180,110,121,0.35)] active:scale-[0.99] text-white font-medium py-3.5 px-6 transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <span>Quero entrar para o Clube</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Microcopy */}
                          <p className="text-xs text-white/55 text-center mt-2.5">
                            Entraremos em contato conforme disponibilidade e abertura de novas experiências do Clube.
                          </p>
                        </div>
                      </div>
                    )}

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
};

export default ClubePage;
