import React, { useEffect, useRef, useState } from 'react';
import { PageRoute } from '../types';
import frontImage from '../assets/front.jpeg';
import backImage from '../assets/back.jpeg';

const BG_IMAGE_1 = frontImage;
const BG_IMAGE_2 = backImage;

const SPOTLIGHT_R = 260;

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

const RevealLayer: React.FC<RevealLayerProps> = ({ image, cursorX, cursorY }) => {
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

    if (cursorX > -100 && cursorY > -100) {
      const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)');
      grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)');
      grad.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      setMaskUrl(canvas.toDataURL());
    } else {
      setMaskUrl('');
    }
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 pointer-events-none transition-opacity duration-300 hero-zoom"
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
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // initialize smooth position on first movement
      if (smoothRef.current.x === -999) {
        smoothRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      if (mouseRef.current.x !== -999) {
        smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
        smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;
        setCursorPos({ x: smoothRef.current.x, y: smoothRef.current.y });
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative z-0 w-full tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main Fullscreen Hero Section */}
      <section
        className="relative w-full overflow-hidden bg-black"
        style={{ height: 'calc(100vh - 5rem)', minHeight: '580px' }}
      >
        {/* Layer 1: Base Image (z-0) with Slow Ken Burns Zoom */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0 hero-zoom"
          style={{ backgroundImage: `url('${BG_IMAGE_1}')` }}
        />

        {/* Layer 2: Reveal Layer (z-10) */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

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

        {/* Layer 4: Bottom-left paragraph (z-20) */}
        <div
          className="hidden sm:block absolute bottom-12 left-8 md:left-14 max-w-[280px] z-20 hero-anim hero-fade pointer-events-none"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Medicina estética de alto padrão com atendimento exclusivo e protocolos personalizados no Jardim Botânico, Brasília.
          </p>
        </div>

        {/* Layer 5: Bottom-right block (z-20) */}
        <div
          className="absolute bottom-10 sm:bottom-12 left-5 right-5 sm:left-auto sm:right-8 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-3 sm:gap-4 z-20 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Realce sua essência com naturalidade, sofisticação e tecnologia médica de ponta.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('contato')}
            className="inline-flex items-center gap-2 bg-[#A74447] hover:bg-[#8F393C] text-[#F5E9DF] text-xs uppercase tracking-widest font-medium px-6 py-3 transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer"
          >
            <span>Agendar Avaliação</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
