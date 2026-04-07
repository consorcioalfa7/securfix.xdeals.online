'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Star,
  Shield,
  Clock,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { images } from '@/lib/images';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Carlos Silva',
    role: 'Empreendedor',
    text: 'Excelente qualidade nos painéis de vedação. A entrega foi rápida e o produto superou as minhas expectativas. Recomendo a Securfix a todos os profissionais do setor.',
    rating: 5,
    avatar: images.testimonials[0],
  },
  {
    name: 'Ana Rodrigues',
    role: 'Arquiteta',
    text: 'As grades e corrimãos que encomendei ficaram perfeitas no projeto. Qualidade de fábrica a preços muito competitivos. O suporte ao cliente foi sempre disponível.',
    rating: 5,
    avatar: images.testimonials[1],
  },
  {
    name: 'Manuel Santos',
    role: 'Construtor',
    text: 'Trabalho com a Securfix há mais de 3 anos. A consistência na qualidade e a pontualidade nas entregas fazem toda a diferença nos meus projetos.',
    rating: 5,
    avatar: images.testimonials[2],
  },
  {
    name: 'Joana Ferreira',
    role: 'Paisagista',
    text: 'As soluções de vedação residencial da Securfix são ideais para os meus projetos de jardins. Variedade de opções e preços imbatíveis.',
    rating: 4,
    avatar: images.testimonials[3],
  },
  {
    name: 'Pedro Costa',
    role: 'Engenheiro Civil',
    text: 'Para obras industriais, os painéis de obra e as redes eletrossoldadas da Securfix são a melhor opção. Robustez e durabilidade garantidas.',
    rating: 5,
    avatar: images.testimonials[4],
  },
  {
    name: 'Maria Lopes',
    role: 'Gestora de Propriedades',
    text: 'As portas de segurança e corta-fogo são de excelente qualidade. O processo de compra online é simples e eficiente.',
    rating: 5,
    avatar: images.testimonials[5],
  },
];

const trustItems: TrustItem[] = [
  {
    icon: <Star className="w-6 h-6 text-[#ea6663]" />,
    title: '4.6/5',
    subtitle: '235 Avaliações Google',
  },
  {
    icon: <Shield className="w-6 h-6 text-[#ea6663]" />,
    title: 'Preço Mais Baixo',
    subtitle: 'Garantia de melhor preço',
  },
  {
    icon: <Clock className="w-6 h-6 text-[#ea6663]" />,
    title: 'Entrega 48-72h',
    subtitle: 'Portugal e Espanha',
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-[#ea6663]" />,
    title: 'Devoluções 15 dias',
    subtitle: 'Devoluções gratuitas',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-200 fill-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-[#ea6663]/20 mb-3 flex-shrink-0" />

      {/* Star rating */}
      <StarRating rating={testimonial.rating} />

      {/* Text */}
      <p className="text-gray-500 italic text-sm leading-relaxed mt-4 mb-6 flex-grow">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Avatar, Name & Role */}
      <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
          <p className="text-gray-400 text-xs mt-0.5">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine how many cards to show at once
  const getVisibleCount = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3; // lg breakpoint
    if (window.innerWidth >= 768) return 2; // md breakpoint
    return 1;
  }, []);

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      // Clamp currentIndex when resizing
      const maxIndex = Math.max(0, testimonials.length - getVisibleCount());
      setCurrentIndex((prev) => Math.min(prev, maxIndex));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleCount]);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Auto-rotate
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1 < 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, goTo]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-title"
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            id="testimonials-title"
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-black uppercase"
          >
            O que pensam os nossos clientes
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-[#ea6663] rounded-full" />
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-xl p-6 mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ea6663]/10">
                  {item.icon}
                </div>
                <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Testemunhos de clientes"
        >
          {/* Navigation Buttons */}
          <div className="flex items-center justify-end gap-2 mb-6">
            <button
              onClick={goPrev}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:border-[#ea6663] hover:text-[#ea6663] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2"
              aria-label="Testemunho anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:border-[#ea6663] hover:text-[#ea6663] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2"
              aria-label="Próximo testemunho"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {testimonials
                  .slice(currentIndex, currentIndex + visibleCount)
                  .map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.name}
                      testimonial={testimonial}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div
            className="flex items-center justify-center gap-2 mt-8"
            role="tablist"
            aria-label="Selecionar testemunho"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Testemunho grupo ${i + 1}`}
                className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2 ${
                  i === currentIndex
                    ? 'bg-[#ea6663] w-8 h-3'
                    : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
