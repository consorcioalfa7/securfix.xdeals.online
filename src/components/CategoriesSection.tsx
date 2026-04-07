'use client';

import { useRef } from 'react';
import {
  Grid3x3,
  Link,
  Ruler,
  Hexagon,
  DoorOpen,
  LayoutGrid,
  Lock,
  Flame,
  Warehouse,
  ArrowRightLeft,
  Construction,
  CircleDot,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface Category {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  { name: 'Painel de Vedação', icon: <Grid3x3 className="w-7 h-7" />, color: '#ea6663' },
  { name: 'Rede Malha Solta', icon: <Link className="w-7 h-7" />, color: '#4a90d9' },
  { name: 'Grades e Corrimãos', icon: <Ruler className="w-7 h-7" />, color: '#8b5cf6' },
  { name: 'Rede Hexagonal', icon: <Hexagon className="w-7 h-7" />, color: '#10b981' },
  { name: 'Portões de Rede', icon: <DoorOpen className="w-7 h-7" />, color: '#f59e0b' },
  { name: 'Rede Eletrossoldada', icon: <LayoutGrid className="w-7 h-7" />, color: '#6366f1' },
  { name: 'Portas de Segurança', icon: <Lock className="w-7 h-7" />, color: '#ef4444' },
  { name: 'Portas Corta-Fogo', icon: <Flame className="w-7 h-7" />, color: '#f97316' },
  { name: 'Portas de Serviço', icon: <Warehouse className="w-7 h-7" />, color: '#64748b' },
  { name: 'Portas de Correr', icon: <ArrowRightLeft className="w-7 h-7" />, color: '#0ea5e9' },
  { name: 'Gradil Tramex', icon: <Construction className="w-7 h-7" />, color: '#78716c' },
  { name: 'Chapa Perfurada', icon: <CircleDot className="w-7 h-7" />, color: '#a855f7' },
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
                {/* Icon background */}
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-lg mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${category.color}14`,
                    color: category.color,
                  }}
                >
                  {category.icon}
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
