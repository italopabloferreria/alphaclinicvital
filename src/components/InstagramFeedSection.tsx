import React, { useState, useEffect } from 'react';
import { Instagram, ChevronLeft, ChevronRight, Heart, MessageCircle, ExternalLink } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
}

const INSTAGRAM_POSTS: readonly InstagramPost[] = [
  {
    id: 'post-1',
    image: '/procedures/limpeza-de-pele.jpg',
    caption: 'O cuidado com a pele começa na base: higienização profunda e recuperação do viço biológico sem agressão. ✨ #AlphaClinicVital #SkincareBrasilia',
    likes: 142,
    comments: 18,
    date: 'Há 2 dias',
  },
  {
    id: 'post-2',
    image: '/procedures/botox.jpg',
    caption: 'Naturalidade é quando ninguém percebe o procedimento, apenas nota que você está mais descansada e radiante. Protocolo de toxina preventiva no AlphaCenter.',
    likes: 218,
    comments: 27,
    date: 'Há 4 dias',
  },
  {
    id: 'post-3',
    image: '/procedures/preenchimento-labial.jpg',
    caption: 'Harmonização labial focada em contorno, hidratação profunda e proporção áurea. Menos volume, mais elegância e sofisticação.',
    likes: 189,
    comments: 24,
    date: 'Há 6 dias',
  },
  {
    id: 'post-4',
    image: '/procedures/bioestimuladores.jpg',
    caption: 'Estímulo de colágeno progressivo: seu próprio organismo renovando a firmeza da pele pelos próximos 24 meses. Tecnologia padrão ouro.',
    likes: 276,
    comments: 35,
    date: 'Há 1 semana',
  },
  {
    id: 'post-5',
    image: '/procedures/peeling-quimico.jpg',
    caption: 'Uniformidade de tom, textura aveludada e clareamento de manchas solares com renovação celular médica programada.',
    likes: 164,
    comments: 19,
    date: 'Há 1 semana',
  },
];

export const InstagramFeedSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, INSTAGRAM_POSTS.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF4EF] border-t border-[#A59A91]/25 text-[#28242C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Profile Lockup & Follow Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#A74447]">
              <Instagram className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase">
                Instagram Oficial
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-[#28242C]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Acompanhe a @alphaclinicvital
            </h2>

            <p className="text-sm sm:text-base text-[#28242C]/75 max-w-xl leading-relaxed">
              Bastidores clínicos, orientações médicas de autocuidado e a rotina da nossa equipe no AlphaCenter, Brasília.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Follow Instagram Button */}
            <a
              href="https://www.instagram.com/alphaclinicvital/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#28242C] hover:bg-[#A74447] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm rounded-none group"
            >
              <Instagram className="w-4 h-4 text-[#DD9299] group-hover:text-white transition-colors" />
              <span>Seguir no Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Slider Arrow Controls */}
            <div className="flex items-center gap-2 ml-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Post anterior"
                className="glass-button-circle text-[#28242C] hover:text-[#A74447] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Próximo post"
                className="glass-button-circle text-[#28242C] hover:text-[#A74447] transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {INSTAGRAM_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <a
                    href="https://www.instagram.com/alphaclinicvital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group glass-card !p-0 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Post Image Container with Overlay */}
                    <div className="relative aspect-square overflow-hidden bg-[#FAF4EF]">
                      <img
                        src={post.image}
                        alt="Post do Instagram Alpha Clinic Vital"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Gradient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                        <div className="flex justify-end">
                          <div className="glass-button-circle text-white">
                            <Instagram className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        <div className="flex items-center gap-5 text-sm font-medium">
                          <span className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4 fill-white text-white" />
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4 fill-white text-white" />
                            <span>{post.comments}</span>
                          </span>
                        </div>
                      </div>

                      {/* Small floating Instagram icon in corner */}
                      <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full glass-pill flex items-center justify-center text-[#28242C] shadow-sm group-hover:opacity-0 transition-opacity">
                        <Instagram className="w-3.5 h-3.5 text-[#A74447]" />
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#A59A91]">
                        <span className="font-semibold text-[#A74447]">@alphaclinicvital</span>
                        <span>{post.date}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#28242C]/80 leading-relaxed line-clamp-2">
                        {post.caption}
                      </p>

                      <div className="pt-2 border-t border-[#A59A91]/20 flex items-center justify-between text-xs font-semibold text-[#A74447] group-hover:text-[#8F393C] transition-colors">
                        <span>Ver publicação</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir para slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-[#A74447]'
                    : 'w-2 bg-[#A59A91]/40 hover:bg-[#A59A91]'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default InstagramFeedSection;
