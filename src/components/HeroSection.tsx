'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { images } from '@/lib/images';

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
}

const slides: Slide[] = [
  {
    title: 'Portas Corta-Fogo',
    subtitle: 'Proteção máxima contra incêndios com certificação EI 60 a EI 120',
    cta: 'Saber Mais',
  },
  {
    title: 'Painel de Vedação',
    subtitle: 'Vedações metálicas de alta qualidade a preços de fábrica',
    cta: 'Ver Coleção',
  },
  {
    title: 'Rede Malha Solta',
    subtitle: 'Cercas versáteis para uso residencial, industrial e agrícola',
    cta: 'Ver Coleção',
  },
  {
    title: 'Rede Eletrossoldada',
    subtitle: 'Painéis electrossoldados galvanizados para máxima resistência',
    cta: 'Saber Mais',
  },
  {
    title: 'Portas de Segurança',
    subtitle: 'Portas blindadas de grau 3 a 5 com fecho multipontos',
    cta: 'Saber Mais',
  },
];

const SLIDE_INTERVAL_MS = 5000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((prev) => {
        const next = index < 0 ? slides.length - 1 : index >= slides.length ? 0 : index;
        return next;
      });
    },
    []
  );

  const goNext = useCallback(() => goToSlide(currentSlide + 1), [currentSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(currentSlide - 1), [currentSlide, goToSlide]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused, goToSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative w-full h-[350px] md:h-[500px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Securfix Products Slider"
    >
      {/* Background image crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images.hero[currentSlide]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-[1]" />

      {/* Slide content with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-white mb-4 drop-shadow-lg uppercase">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 drop-shadow-md">
            {slide.subtitle}
          </p>
          <button
            className="inline-flex items-center justify-center gap-2 px-8 py-3 min-h-[44px] bg-white text-black font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
          >
            {slide.cta}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Previous arrow */}
      <button
        onClick={goPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next arrow */}
      <button
        onClick={goNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Selecionar slide"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Ir para slide ${index + 1}`}
            className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-[#ea6663]'
                  : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
