import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { PageRoute } from '../types';

interface CopyrightPageProps {
  onNavigate?: (route: PageRoute) => void;
}

export const CopyrightPage: React.FC<CopyrightPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const riseVariant = (delay: number) => ({
    initial: { y: '100%', opacity: 0 },
    animate: { y: '0%', opacity: 1 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative min-h-screen w-full bg-[#FF0000] flex flex-col z-10 font-manrope selection:bg-white selection:text-[#FF0000] overflow-x-hidden">

      {/* Cortina de abertura — cobre tela e sobe */}
      <motion.div
        className="fixed inset-0 bg-[#FF0000] z-50 origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Botão de retorno — responsivo com safe area no mobile */}
      <motion.div
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <button
          type="button"
          onClick={() => (onNavigate ? onNavigate('home') : (window.location.href = '/'))}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/40 bg-black/20 hover:bg-black/40 text-white text-[10px] sm:text-xs uppercase tracking-widest font-semibold transition-all backdrop-blur-md cursor-pointer shadow-lg hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Voltar ao site principal</span>
          <span className="xs:hidden sm:hidden">Voltar</span>
        </button>
      </motion.div>

      {/* 1. Conteúdo Central */}
      <div className="w-full flex flex-col items-center pt-16 sm:pt-20 md:pt-24 z-20 relative">
        <div className="flex flex-col items-center w-full px-5 sm:px-8 text-center relative max-w-[900px] mx-auto pb-2">

          {/* Logo */}
          <div className="overflow-hidden mb-6 sm:mb-8 md:mb-10">
            <motion.div
              className="flex justify-center items-center select-none"
              {...riseVariant(0.35)}
            >
              <img
                src="/logo-icbiai.svg"
                alt="I can't believe it's AI!"
                className="h-24 sm:h-36 md:h-52 w-auto max-w-[80vw] object-contain drop-shadow-md"
              />
            </motion.div>
          </div>

          {/* Parágrafos */}
          <div className="overflow-hidden mb-3 sm:mb-4">
            <motion.p
              className="text-white text-sm sm:text-[15px] md:text-[16px] w-full max-w-[520px] text-center leading-[1.7] font-light"
              {...riseVariant(0.65)}
            >
              Acreditamos que a tecnologia deve liberar o seu tempo, não criar novas tarefas. Nossa missão é transformar operações complexas em fluxos simples, inteligentes e automáticos — para que você tenha mais clareza, controle e espaço para crescer.
            </motion.p>
          </div>

          <div className="overflow-hidden mb-3 sm:mb-4">
            <motion.p
              className="text-white text-sm sm:text-[15px] md:text-[16px] w-full max-w-[520px] text-center leading-[1.7] font-light"
              {...riseVariant(0.82)}
            >
              Criamos esta solução porque estávamos cansados de softwares que exigiam mais esforço para administrar do que realmente economizavam. Por isso, desenvolvemos uma arquitetura autônoma, projetada para operar silenciosamente nos bastidores e manter sua operação funcionando com menos atrito.
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.p
              className="text-white text-sm sm:text-[15px] md:text-[16px] w-full max-w-[520px] text-center leading-[1.7] font-light"
              {...riseVariant(0.99)}
            >
              Seu negócio deve servir à sua vida — não consumi-la. Deixe nossa tecnologia assumir o trabalho repetitivo e operacional, enquanto você direciona sua energia para o que realmente importa: estratégia, visão e crescimento.
            </motion.p>
          </div>

        </div>
      </div>

      {/* Botão CTA */}
      <div className="relative w-full flex justify-center z-30 mt-8 sm:mt-12 md:mt-14 -mb-4 sm:-mb-6 md:-mb-7 px-5">
        <div className="overflow-hidden">
          <motion.div {...riseVariant(1.15)}>
            <a
              href="mailto:contato@icbiai.com"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white text-white text-xs sm:text-sm uppercase tracking-widest font-semibold bg-transparent hover:bg-white hover:text-[#FF0000] transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              Fale conosco
            </a>
          </motion.div>
        </div>
      </div>

      {/* 2. Vídeo de rodapé com fusão */}
      <div className="relative w-full shrink-0 z-20 mt-4">
        <div className="absolute top-0 left-0 w-full h-[50px] sm:h-[70px] md:h-[80px] bg-gradient-to-b from-[#FF0000] to-transparent z-10 pointer-events-none" />
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
        >
          <source src="/icbiai.mp4" type="video/mp4" />
          <source src="/track-video.mp4" type="video/mp4" />
          <source src="/track-video.webm" type="video/webm" />
          <source
            src="https://res.cloudinary.com/daklr2whx/video/upload/v1778602552/track-video_2_s9lp53.mp4"
            type="video/mp4"
          />
        </motion.video>
      </div>

    </section>
  );
};

export default CopyrightPage;
