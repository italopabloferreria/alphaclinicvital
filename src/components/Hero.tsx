import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageRoute } from '../types';
import frontImage from '../assets/front.jpeg';
import backImage from '../assets/back.jpeg';

const BG_IMAGE_1 = frontImage;
const BG_IMAGE_2 = backImage;

type CursorPoint = {
  x: number;
  y: number;
};

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
  radius: number;
  strength: number;
}

/**
 * RevealLayer: Desenha o gradiente radial no canvas e aplica como máscara SVG/CSS
 * Suporta o controle dinâmico de opacidade (strength) e raio (radius) para desktop e mobile.
 */
const RevealLayer: React.FC<RevealLayerProps> = ({
  image,
  cursorX,
  cursorY,
  radius,
  strength,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [maskUrl, setMaskUrl] = useState<string>('');

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Se strength for 0 ou ponto fora de tela, limpa a máscara
    if (strength <= 0 || cursorX < -100 || cursorY < -100) {
      setMaskUrl('');
      return;
    }

    const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, radius);
    grad.addColorStop(0, `rgba(255, 255, 255, ${1 * strength})`);
    grad.addColorStop(0.4, `rgba(255, 255, 255, ${1 * strength})`);
    grad.addColorStop(0.6, `rgba(255, 255, 255, ${0.75 * strength})`);
    grad.addColorStop(0.75, `rgba(255, 255, 255, ${0.4 * strength})`);
    grad.addColorStop(0.88, `rgba(255, 255, 255, ${0.12 * strength})`);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
    ctx.fill();

    setMaskUrl(canvas.toDataURL());
  }, [cursorX, cursorY, radius, strength]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 pointer-events-none hero-zoom"
        style={{
          backgroundImage: `url('${image}')`,
          maskImage: maskUrl ? `url('${maskUrl}')` : 'none',
          WebkitMaskImage: maskUrl ? `url('${maskUrl}')` : 'none',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          opacity: maskUrl ? 1 : 0,
        }}
      />
    </>
  );
};

interface HeroProps {
  onNavigate?: (route: PageRoute) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const mouse = useRef<CursorPoint>({ x: -999, y: -999 });
  const smooth = useRef<CursorPoint>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  const [cursorPos, setCursorPos] = useState<CursorPoint>({ x: -999, y: -999 });
  const [revealStrength, setRevealStrength] = useState<number>(1);

  // [MOBILE-ONLY]: Detecção refinada de toque/ponteiro grosso
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  // [ACESSIBILIDADE]: Respeito à preferência de redução de movimento do sistema
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Raio adaptado: menor no mobile para toque preciso, amplo no desktop para mouse suave
  const SPOTLIGHT_R = isTouchDevice ? 155 : 260;

  // [DESKTOP-ONLY]: Acompanhamento contínuo de cursor via mousemove + RAF smoothing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isTouchDevice) {
      mouse.current = { x: -999, y: -999 };
      smooth.current = { x: -999, y: -999 };
      setCursorPos({ x: -999, y: -999 });
      setRevealStrength(0);
      return;
    }

    setRevealStrength(1);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };

    const animate = () => {
      if (mouse.current.x !== -999) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  // [MOBILE-ONLY]: Lógica de toque touch (pointerdown, pointermove, pointerup, pointercancel)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isTouchDevice) return;

    const section = sectionRef.current;
    if (!section) return;

    let hideTimeout: number | null = null;

    const stopFade = () => {
      if (fadeRafRef.current) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
        hideTimeout = null;
      }
    };

    // Animação suave de saída após soltar o toque
    const fadeOut = () => {
      stopFade();

      if (prefersReducedMotion) {
        setRevealStrength(0);
        return;
      }

      let current = 1;

      const step = () => {
        current -= 0.07;
        if (current <= 0) {
          setRevealStrength(0);
          fadeRafRef.current = null;
          return;
        }
        setRevealStrength(current);
        fadeRafRef.current = requestAnimationFrame(step);
      };

      fadeRafRef.current = requestAnimationFrame(step);
    };

    const activateAt = (clientX: number, clientY: number) => {
      stopFade();

      mouse.current = { x: clientX, y: clientY };
      smooth.current = { x: clientX, y: clientY };
      setCursorPos({ x: clientX, y: clientY });
      setRevealStrength(1);
    };

    const handlePointerDown = (e: PointerEvent) => {
      activateAt(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      activateAt(e.clientX, e.clientY);
    };

    const handlePointerUp = () => {
      hideTimeout = window.setTimeout(() => {
        fadeOut();
      }, 180);
    };

    const handlePointerCancel = () => {
      fadeOut();
    };

    section.addEventListener('pointerdown', handlePointerDown, { passive: true });
    section.addEventListener('pointermove', handlePointerMove, { passive: true });
    section.addEventListener('pointerup', handlePointerUp, { passive: true });
    section.addEventListener('pointercancel', handlePointerCancel, { passive: true });

    return () => {
      section.removeEventListener('pointerdown', handlePointerDown);
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerup', handlePointerUp);
      section.removeEventListener('pointercancel', handlePointerCancel);

      stopFade();
    };
  }, [isTouchDevice, prefersReducedMotion]);

  return (
    <div className="relative z-0 w-full tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main Fullscreen Hero Section com touch-action: manipulation */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-black select-none"
        style={{ height: 'calc(100vh - 5rem)', minHeight: '580px', touchAction: 'manipulation' }}
      >
        {/* Layer 1: Base Image (z-0) with Slow Ken Burns Zoom */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0 hero-zoom"
          style={{ backgroundImage: `url('${BG_IMAGE_1}')` }}
        />

        {/* Layer 2: Reveal Layer (z-10) */}
        <RevealLayer
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
          radius={SPOTLIGHT_R}
          strength={revealStrength}
        />

        {/* Layer 3: Heading (z-20) */}
        <div className="absolute top-[18%] sm:top-[22%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-20">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Retoque na
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              medida certa.
            </span>
          </h1>
        </div>

        {/* Layer 4: Bottom-left block (z-20) */}
        <div
          className="hidden sm:block absolute bottom-12 left-8 md:left-14 max-w-[320px] z-20 hero-anim hero-fade pointer-events-auto"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="glass-card text-white border border-white/15">
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
              Medicina estética de alto padrão com atendimento exclusivo e protocolos personalizados no Jardim Botânico, Brasília.
            </p>
          </div>
        </div>

        {/* Layer 5: Bottom-right block (z-20) */}
        <div
          className="absolute bottom-10 sm:bottom-12 left-5 right-5 sm:left-auto sm:right-8 md:right-14 max-w-full sm:max-w-[320px] z-20 hero-anim hero-fade pointer-events-auto"
          style={{ animationDelay: '0.85s' }}
        >
          <div className="glass-card text-white border border-white/15 flex flex-col items-start gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
              Realce sua essência com naturalidade, sofisticação e tecnologia médica de ponta.
            </p>
            <button
              type="button"
              onClick={() => onNavigate?.('contato')}
              className="inline-flex items-center gap-2 bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-full transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>Agendar Avaliação</span>
            </button>
          </div>
        </div>

        {/* [MOBILE-ONLY]: Indicador visual discreto de toque no mobile */}
        {isTouchDevice && (
          <div className="pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center px-6 sm:hidden">
            <div className="glass-pill px-4 py-1.5 text-[11px] tracking-[0.08em] text-white/80 shadow-xs">
              Toque para revelar
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Hero;
