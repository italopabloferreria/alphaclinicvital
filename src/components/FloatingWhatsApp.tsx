import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  /** Número de telefone no formato internacional (ex: 5511999999999) */
  phoneNumber?: string;
  /** Mensagem inicial pré-preenchida no WhatsApp */
  initialMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '5561981112868',
  initialMessage = 'Olá! Gostaria de agendar uma avaliação estética na Alpha Clinic Vital.',
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const encodedMessage = encodeURIComponent(initialMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      {/* Floating Tooltip Label (Desktop) */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-[#28242C] text-[#F5E9DF] text-xs font-semibold px-4 py-2.5 shadow-lg border border-[#A59A91]/30 transition-all duration-300 pointer-events-none ${
          isTooltipVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#DD9299] animate-pulse" />
        <span>Fale conosco pelo WhatsApp</span>
      </div>

      {/* WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com especialista no WhatsApp (abre nova aba)"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onFocus={() => setIsTooltipVisible(true)}
        onBlur={() => setIsTooltipVisible(false)}
        className="relative group p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-700/25 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
      >
        {/* Subtle Pulse Ring Effect */}
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-60 animate-ping duration-1000 -z-10"
        />

        {/* Message Icon from Lucide */}
        <MessageCircle className="w-7 h-7 text-white fill-white/10 transition-transform group-hover:rotate-6" />
      </a>
    </aside>
  );
};
export default FloatingWhatsApp;
