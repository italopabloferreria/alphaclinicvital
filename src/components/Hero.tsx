import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageRoute } from '../types';
import frontImage from '../assets/front.webp';
import backImage from '../assets/back.webp';

const BG_IMAGE_1 = frontImage;
const BG_IMAGE_2 = backImage;

type CursorPoint = {
  x: number;
  y: number;
};

type RevealLayerProps = {
  image: string;
  cursorX: number;
  cursorY: number;
  radius: number;
};

/**
 * [DESKTOP-ONLY]: RevealLayer
 * Aplica máscara radial acelerada por GPU acompanhando o cursor do mouse
 * sobre a imagem secundária (BG_IMAGE_2), sem sobrecarga de CPU ou canvas.
 */
function RevealLayer({
  image,
  cursorX,
  cursorY,
  radius,
}: RevealLayerProps) {
  const hasCursor = cursorX >= 0 && cursorY >= 0;
  const maskStyle = hasCursor
    ? `radial-gradient(circle ${radius}px at ${cursorX}px ${cursorY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.12) 88%, transparent 100%)`
    : 'none';

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 bg-center bg-cover bg-no-repeat hero-zoom"
      style={{
        backgroundImage: `url('${image}')`,
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    />
  );
}

interface HeroProps {
  onNavigate?: (route: PageRoute, slug?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const mouse = useRef<CursorPoint>({ x: -999, y: -999 });
  const smooth = useRef<CursorPoint>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  const [cursorPos, setCursorPos] = useState<CursorPoint>({ x: -999, y: -999 });
  const [mobileRevealed, setMobileRevealed] = useState<boolean>(false);

  // [REGRAS DE DETECÇÃO]: Considera touch/mobile somente sob as condições especificadas
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  // [ACESSIBILIDADE]: Respeita preferência por redução de movimento
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const SPOTLIGHT_R = 260;

  // [DESKTOP-ONLY]: Acompanhamento contínuo de cursor via mousemove + RAF smoothing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isTouchDevice) return;

    let active = true;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!active) return;
      const dx = Math.abs(mouse.current.x - smooth.current.x);
      const dy = Math.abs(mouse.current.y - smooth.current.y);
      if (dx > 0.15 || dy > 0.15) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.15;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.15;
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  // [MOBILE-ONLY]: Toque alterna entre imagem base e imagem secundária inteira com fade suave
  const handleMobileRevealToggle = () => {
    if (!isTouchDevice) return;
    setMobileRevealed((prev) => !prev);
  };

  return (
    <div
      className="relative z-0 w-full tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Hero Container: No mobile, toque na hero alterna a revelação da imagem */}
      <section
        onClick={handleMobileRevealToggle}
        className="relative w-full overflow-hidden bg-black select-none"
        style={{ height: 'calc(100vh - 5rem)', minHeight: '580px', touchAction: 'manipulation' }}
      >
        {/* Layer 1: Imagem Base (BG_IMAGE_1) com Ken Burns zoom suave */}
        <div
          className="hero-zoom absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${BG_IMAGE_1}')` }}
        />

        {/* Layer 2 [DESKTOP-ONLY]: Spotlight circular com canvas radial mask que segue o cursor */}
        {!isTouchDevice && (
          <RevealLayer
            image={BG_IMAGE_2}
            cursorX={cursorPos.x}
            cursorY={cursorPos.y}
            radius={SPOTLIGHT_R}
          />
        )}

        {/* Layer 2 [MOBILE-ONLY]: Full-image reveal por toque (fade suave com opacidade, sem spotlight) */}
        {isTouchDevice && (
          <div
            className={`absolute inset-0 z-10 bg-center bg-cover bg-no-repeat ${
              prefersReducedMotion ? '' : 'transition-opacity duration-500 ease-out'
            } ${mobileRevealed ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${BG_IMAGE_2}')`,
            }}
          />
        )}

        {/* Layer 3: Tipografia de Título Principal */}
        <div className="pointer-events-none absolute left-0 right-0 top-[18%] sm:top-[22%] z-20 flex flex-col items-center px-5 text-center">
          <h1 className="leading-[0.95] text-white">
            <span
              className="hero-anim hero-reveal block font-playfair text-5xl font-normal italic sm:text-7xl md:text-8xl"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Retoque na
            </span>
            <span
              className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              medida certa.
            </span>
          </h1>
        </div>

        {/* Layer 4: Descrição Inferior Esquerda (Desktop/Tablet) */}
        <div
          className="hero-anim hero-fade pointer-events-auto absolute bottom-12 left-8 z-20 hidden max-w-[320px] sm:block md:left-14"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="glass-card border border-white/15 text-white">
            <p className="text-xs font-light leading-relaxed text-white/90 sm:text-sm">
              Medicina estética de alto padrão com atendimento exclusivo e protocolos personalizados no Jardim Botânico, Brasília.
            </p>
          </div>
        </div>

        {/* Layer 5: Card de Ação Inferior Direito com CTA */}
        <div
          className="hero-anim hero-fade pointer-events-auto absolute bottom-10 left-5 right-5 z-20 max-w-full sm:bottom-12 sm:left-auto sm:right-8 sm:max-w-[320px] md:right-14"
          style={{ animationDelay: '0.85s' }}
        >
          <div className="glass-card flex flex-col items-start gap-3 border border-white/15 text-white sm:gap-4">
            <p className="text-xs font-light leading-relaxed text-white/90 sm:text-sm">
              Realce sua essência com naturalidade, sofisticação e tecnologia médica de ponta.
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate?.('contato');
              }}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A74447] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#F5E9DF] shadow-md transition-all hover:scale-[1.02] hover:bg-[#8F393C] active:scale-95 sm:w-auto"
            >
              <span>Agendar Avaliação</span>
            </button>
          </div>
        </div>

        {/* [MOBILE-ONLY]: Indicador de toque na base da hero */}
        {isTouchDevice && (
          <div className="pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center px-6 sm:hidden">
            <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[11px] tracking-[0.08em] text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
              {mobileRevealed ? 'Toque novamente' : 'Toque para revelar'}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Hero;

