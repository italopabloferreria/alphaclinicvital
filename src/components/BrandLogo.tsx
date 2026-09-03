import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ink' | 'cream' | 'light';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'ink',
  showSubtitle = true,
  className = '',
  onClick,
}) => {
  const iconSizes = {
    sm: 'w-7 h-auto',
    md: 'w-10 h-auto',
    lg: 'w-14 h-auto',
  };

  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-4xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  };

  const textColors = {
    ink: 'text-[#28242C]',
    cream: 'text-[#F5E9DF]',
    light: 'text-white',
    crimson: 'text-[#A74447]',
  };

  const strokeColors = {
    ink: 'stroke-[#28242C]',
    cream: 'stroke-[#F5E9DF]',
    light: 'stroke-white',
    crimson: 'stroke-[#A74447]',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* Exact Heraldic Upright Oval Sprig Brand Mark */}
      <svg
        className={`${iconSizes[size]} ${strokeColors[variant]} transition-transform duration-300 group-hover:scale-105 shrink-0`}
        viewBox="0 0 96 120"
        fill="none"
        strokeWidth="2.2"
        aria-hidden="true"
      >
        <ellipse cx="48" cy="60" rx="45" ry="57" />
        <path d="M48 88V46" strokeLinecap="round" />
        <path d="M48 58c-8-2-14-8-16-16 9 0 15 5 16 16Zm0 0c8-2 14-8 16-16-9 0-15 5-16 16Z" />
        <path d="M48 74c-9-2-15-8-17-17 10 0 16 6 17 17Zm0 0c9-2 15-8 17-17-10 0-16 6-17 17Z" />
        <path d="M48 46c-6-3-9-9-8-16 6 3 9 9 8 16Zm0 0c6-3 9-9 8-16-6 3-9 9-8 16Z" />
        <path d="M30 44c-5 1-9-1-12-5 5-2 9-1 12 5Zm36 0c5 1 9-1 12-5-5-2-9-1-12 5Z" />
      </svg>

      {/* Brand Typography in Cormorant Garamond 500 */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif font-medium tracking-tight ${titleSizes[size]} ${textColors[variant]}`}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Alpha Clinic Vital
        </span>
        {showSubtitle && (
          <span
            className={`font-sans tracking-[0.2em] font-medium uppercase mt-1 opacity-80 ${subtitleSizes[size]} ${textColors[variant]}`}
          >
            Estética Médica &amp; Longevidade
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
