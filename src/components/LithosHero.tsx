import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

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

// [DESKTOP-ONLY]: RevealLayer com Canvas e Máscara Radial Suave
function RevealLayer({
  image,
  cursorX,
  cursorY,
  radius,
}: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [maskUrl, setMaskUrl] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (cursorX < 0 || cursorY < 0) {
      setMaskUrl('');
      return;
    }

    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      radius
    );

    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
    ctx.fill();

    setMaskUrl(canvas.toDataURL());
  }, [cursorX, cursorY, radius]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: 'none' }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-30 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          WebkitMaskImage: maskUrl ? `url(${maskUrl})` : 'none',
          maskImage: maskUrl ? `url(${maskUrl})` : 'none',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    </>
  );
}

export default function LithosHero() {
  const mouse = useRef<CursorPoint>({ x: -999, y: -999 });
  const smooth = useRef<CursorPoint>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  const [cursorPos, setCursorPos] = useState<CursorPoint>({ x: -999, y: -999 });
  const [mobileRevealed, setMobileRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // [REGRAS DE DETECÇÃO]: Considera touch/mobile quando hover for ausente ou ponteiro for grosso
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  // [ACESSIBILIDADE]: Respeita preferência do usuário por redução de movimento
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const SPOTLIGHT_R = 260;

  // [DESKTOP-ONLY]: Movimento contínuo de mouse com interpolação suave
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  // Bloqueio de rolagem do body quando menu mobile estiver aberto
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // [MOBILE-ONLY]: Toque na hero alterna entre imagem base e imagem revelada
  const handleMobileRevealToggle = () => {
    if (!isTouchDevice) return;
    setMobileRevealed((prev) => !prev);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="font-playfair text-2xl italic text-white">Lithos</span>
        </div>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white">
            Course
          </button>
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
            Field Guides
          </button>
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
            Geology
          </button>
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
            Plans
          </button>
          <button className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
            Live Tour
          </button>
        </div>

        <button className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 md:block">
          Sign Up
        </button>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-md md:hidden cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* [MOBILE-ONLY]: Menu Mobile com Contraste Corrigido */}
      <div
        className={`fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed right-0 top-0 z-[95] h-full w-[84vw] max-w-[320px] border-l border-white/10 bg-[rgba(10,10,10,0.85)] shadow-[-12px_0_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col px-5 pb-6 pt-20">
          <div className="rounded-2xl bg-black/25 p-2 border border-white/5">
            <div className="flex flex-col gap-2 rounded-[1rem] bg-black/20 p-2">
              {['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour'].map((item) => (
                <button
                  key={item}
                  onClick={closeMenu}
                  className="rounded-xl bg-white/[0.05] px-4 py-4 text-left text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-200 hover:bg-white/[0.12] active:scale-[0.99] cursor-pointer"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.45)' }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button
              onClick={closeMenu}
              className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-lg shadow-black/20 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </aside>

      {/* Hero Section */}
      <section
        onClick={handleMobileRevealToggle}
        className="relative h-screen w-full overflow-hidden bg-black"
        style={{ height: '100dvh', touchAction: 'manipulation' }}
      >
        <div
          className="hero-zoom absolute inset-0 z-10 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* [DESKTOP-ONLY]: Canvas Radial Mask Spotlight */}
        {!isTouchDevice && (
          <RevealLayer
            image={BG_IMAGE_2}
            cursorX={cursorPos.x}
            cursorY={cursorPos.y}
            radius={SPOTLIGHT_R}
          />
        )}

        {/* [MOBILE-ONLY]: Full-image reveal por toque com fade suave de opacidade */}
        {isTouchDevice && (
          <div
            className={`absolute inset-0 z-30 bg-center bg-cover bg-no-repeat ${
              prefersReducedMotion ? '' : 'transition-opacity duration-500 ease-out'
            } ${mobileRevealed ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${BG_IMAGE_2})`,
            }}
          />
        )}

        <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
          <h1 className="leading-[0.95] text-white">
            <span
              className="hero-anim hero-reveal block font-playfair text-5xl font-normal italic sm:text-7xl md:text-8xl"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Layers hold
            </span>
            <span
              className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              tales of time
            </span>
          </h1>
        </div>

        <div
          className="hero-anim hero-fade pointer-events-none absolute bottom-14 left-10 z-50 hidden max-w-[260px] sm:block md:left-14"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm leading-relaxed text-white/80">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        <div
          className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
          </p>

          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95 cursor-pointer"
          >
            Start Digging
          </button>
        </div>

        {/* [MOBILE-ONLY]: Indicador de toque no rodapé */}
        {isTouchDevice && !menuOpen && (
          <div className="pointer-events-none absolute inset-x-0 bottom-28 z-50 flex justify-center px-6 sm:hidden">
            <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[11px] tracking-[0.08em] text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
              {mobileRevealed ? 'Toque novamente' : 'Toque para revelar'}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
