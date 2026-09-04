import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { FAQItem } from '../types';
import { TREATMENTS } from '../data/treatments';

const FAQS: readonly FAQItem[] = [
  {
    question: 'Como funciona a primeira consulta de avaliação estética?',
    answer:
      'Realizamos uma anamnese completa, avaliando sua saúde geral, histórico de procedimentos e queixas principais. Analisamos detalhadamente a simetria facial, qualidade da pele e dinâmica muscular, desenhando um plano terapêutico exclusivo e transparente com prioridades bem definidas.',
  },
  {
    question: 'Os procedimentos estéticos injetáveis causam dor ou desconforto?',
    answer:
      'Utilizamos anestésicos tópicos de alta potência manipulados sob medida e, nos preenchedores e toxinas, cânulas atraumáticas com orifícios laterais. O desconforto é mínimo e muito bem tolerado pela imensa maioria das pacientes.',
  },
  {
    question: 'Em quanto tempo é possível perceber os resultados dos tratamentos?',
    answer:
      'Tratamentos como ácido hialurônico exibem efeito volumétrico imediato com acomodação final em 14 dias. A toxina botulínica inicia ação em 72h com pico aos 14 dias. Já os bioestimuladores de colágeno e ultrassom Liftera apresentam evolução contínua entre 30 e 90 dias.',
  },
  {
    question: 'Quais são as formas de pagamento aceitas pela clínica?',
    answer:
      'Disponibilizamos pagamento facilitado em cartão de crédito em até 10x sem juros para protocolos integrados, transferência PIX com condições especiais e boleto bancário mediante consulta.',
  },
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    procedure: 'Avaliação Estética Global',
    shift: 'Manhã (08h às 12h)',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number): void => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de agendar uma consulta na Alpha Clinic Vital.\n\nNome: ${formData.name}\nProcedimento de interesse: ${formData.procedure}\nTurno preferido: ${formData.shift}`
  );
  const whatsappUrl = `https://wa.me/5561981112868?text=${whatsappMessage}`;

  return (
    <div className="bg-[#F5E9DF] text-[#28242C] font-sans">
      
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-[#A59A91]/25 bg-[#FAF4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#A74447] uppercase">
            Cuidado &amp; Atendimento
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#28242C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Agendamento &amp; Contato
          </h1>
          <p className="text-base sm:text-lg text-[#28242C]/75 max-w-2xl mx-auto leading-relaxed">
            Estamos prontas para acolher você no AlphaCenter, Jardim Botânico. Escolha o canal de sua preferência.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Clinic Info */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="glass-card space-y-8">
                <div>
                  <h2
                    className="text-2xl sm:text-3xl font-serif font-medium text-[#28242C]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Solicite seu Horário VIP
                  </h2>
                  <p className="text-sm text-[#28242C]/75 mt-1">
                    Preencha o formulário abaixo e nossa equipe retornará em poucos minutos para confirmar sua data.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="glass-card text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-[#A74447] text-[#F5E9DF] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3
                      className="text-2xl font-serif text-[#28242C]"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Solicitação Recebida com Sucesso!
                    </h3>
                    <p className="text-sm text-[#28242C]/80 max-w-md mx-auto leading-relaxed">
                      Obrigada, <strong>{formData.name}</strong>. Nossa recepção entrará em contato pelo WhatsApp{' '}
                      <strong>{formData.phone}</strong> para finalizar os detalhes do seu agendamento.
                    </p>
                    <div className="pt-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
                      >
                        <span>Confirmar Imediatamente no WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="form-name" className="text-xs uppercase tracking-wider font-semibold text-[#28242C]">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="form-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ex: Dra. Mariana Costa"
                          className="w-full px-4 py-3 border border-[#A59A91]/30 bg-[#F5E9DF] text-sm text-[#28242C] focus:outline-none focus:border-[#A74447]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="form-phone" className="text-xs uppercase tracking-wider font-semibold text-[#28242C]">
                          WhatsApp com DDD *
                        </label>
                        <input
                          type="tel"
                          id="form-phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(61) 98111-2868"
                          className="w-full px-4 py-3 border border-[#A59A91]/30 bg-[#F5E9DF] text-sm text-[#28242C] focus:outline-none focus:border-[#A74447]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="text-xs uppercase tracking-wider font-semibold text-[#28242C]">
                        E-mail de Contato
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="mariana@exemplo.com.br"
                        className="w-full px-4 py-3 border border-[#A59A91]/30 bg-[#F5E9DF] text-sm text-[#28242C] focus:outline-none focus:border-[#A74447]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="form-procedure" className="text-xs uppercase tracking-wider font-semibold text-[#28242C]">
                          Tratamento de Interesse
                        </label>
                        <select
                          id="form-procedure"
                          name="procedure"
                          value={formData.procedure}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#A59A91]/30 bg-[#F5E9DF] text-sm text-[#28242C] focus:outline-none focus:border-[#A74447]"
                        >
                          <option value="Avaliação Estética Global">Avaliação Estética Global</option>
                          {TREATMENTS.map((t) => (
                            <option key={t.id} value={t.title}>
                              {t.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="form-shift" className="text-xs uppercase tracking-wider font-semibold text-[#28242C]">
                          Turno Preferencial
                        </label>
                        <select
                          id="form-shift"
                          name="shift"
                          value={formData.shift}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-[#A59A91]/30 bg-[#F5E9DF] text-sm text-[#28242C] focus:outline-none focus:border-[#A74447]"
                        >
                          <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                          <option value="Tarde (13h às 17h)">Tarde (13h às 17h)</option>
                          <option value="Noite (17h às 20h)">Noite (17h às 20h)</option>
                          <option value="Sábado (09h às 14h)">Sábado (09h às 14h)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="form-message" className="text-xs uppercase tracking-wider font-semibold text-[#28242C]">
                        Mensagem ou Queixa Principal (Opcional)
                      </label>
                      <textarea
                        id="form-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Ex: Gostaria de melhorar a flacidez do contorno da mandíbula..."
                        className="w-full px-4 py-3 border border-[#A59A91]/30 bg-[#F5E9DF] text-sm text-[#28242C] focus:outline-none focus:border-[#A74447] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 border border-[#A74447] bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitação de Agendamento</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Clinic Info Column */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Location Card */}
              <div className="glass-card space-y-6">
                <h3
                  className="text-2xl font-serif font-medium text-[#28242C]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Onde Estamos
                </h3>

                <ul className="space-y-4 text-sm text-[#28242C]/85">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#A74447] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#28242C]">Endereço</strong>
                      <span>SH Tororó Centro Comercial AlphaCenter - Jardim Botânico, Brasília - DF, 72595-630</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#A74447] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#28242C]">Telefone &amp; WhatsApp</strong>
                      <a href="tel:+5561981112868" className="hover:underline text-[#A74447]">
                        (61) 98111-2868
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#A74447] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#28242C]">E-mail de Atendimento</strong>
                      <a href="mailto:contato@alphaclinicvital.com.br" className="hover:underline text-[#A74447]">
                        contato@alphaclinicvital.com.br
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#A74447] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#28242C]">Horário de Atendimento</strong>
                      <span>Segunda a Sexta: 08h às 20h<br />Sábados: 09h às 14h</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-2 border-t border-[#A59A91]/20">
                  <a
                    href="https://www.google.com/search?q=alpha+clinica+vital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 border border-[#A74447] text-xs font-semibold uppercase tracking-widest text-[#A74447] hover:bg-[#A74447]/10 transition-colors"
                  >
                    <span>Abrir Rota no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* WhatsApp Fast CTA Card */}
              <div className="glass-card space-y-4 text-[#28242C]">
                <h4
                  className="text-2xl font-serif text-[#28242C]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Prefere agendar via WhatsApp?
                </h4>
                <p className="text-sm text-[#28242C]/80 leading-relaxed">
                  Nossa concierge clínica está online de segunda a sábado para sanar dúvidas e verificar horários imediatos.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/5561981112868?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20hor%C3%A1rios%20na%20Alpha%20Clinic%20Vital."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#A74447] text-[#F5E9DF] text-xs font-bold uppercase tracking-widest hover:bg-[#8F393C] transition-colors"
                  >
                    <span>Falar no WhatsApp agora</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 border-t border-[#A59A91]/25 bg-[#FAF4EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#A74447] uppercase">
              Tire Suas Dúvidas
            </span>
            <h3
              className="text-3xl sm:text-4xl font-serif font-medium text-[#28242C]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Perguntas Frequentes
            </h3>
          </div>

          <div className="space-y-4 pt-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="glass-card !p-0 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-base font-medium text-[#28242C]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#A74447] transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[#28242C]/80 leading-relaxed border-t border-[#A59A91]/15">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;
