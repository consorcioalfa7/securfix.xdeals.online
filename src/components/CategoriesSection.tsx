'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { images } from '@/lib/images';

interface Category {
  name: string;
}

const categories: Category[] = [
  { name: 'Painel de Vedação' },
  { name: 'Rede Malha Solta' },
  { name: 'Grades e Corrimãos' },
  { name: 'Rede Hexagonal' },
  { name: 'Portões de Rede' },
  { name: 'Rede Eletrossoldada' },
  { name: 'Portas de Segurança' },
  { name: 'Portas Corta-Fogo' },
  { name: 'Portas de Serviço' },
  { name: 'Portas de Correr' },
  { name: 'Gradil Tramex' },
  { name: 'Chapa Perfurada' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 md:py-24"
      aria-labelledby="categories-title"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <h2
            id="categories-title"
            className="text-3xl md:text-4xl font-bold tracking-wide text-black uppercase mb-3"
          >
            As Nossas{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Categorias</span>
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-[#ea6663] rounded-full" />
            </span>
          </h2>
        </motion.div>

        {/* Categories grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={cardVariants}>
              <a
                href="#"
                className="flex flex-col items-center text-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.04] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2"
                aria-label={`Ver ${category.name}`}
              >
                {/* Category image */}
                <div className="relative w-16 h-16 mb-4 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={images.categories[category.name as keyof typeof images.categories]}
                    alt={category.name}
                    fill
                    className="object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    unoptimized
                  />
                </div>

                {/* Category name */}
                <span className="text-sm font-semibold text-gray-800 leading-snug">
                  {category.name}
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
