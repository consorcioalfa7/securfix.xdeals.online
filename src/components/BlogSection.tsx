'use client';

import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlogPost {
  title: string;
  category: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Como Instalar Painéis de Vedação',
    category: 'Tutoriais',
    date: '15 Dez 2025',
  },
  {
    title: 'Guia Completo de Vedações Residenciais',
    category: 'Guia',
    date: '10 Dez 2025',
  },
  {
    title: 'Vedações Industriais: O que Precisa Saber',
    category: 'Guia',
    date: '5 Dez 2025',
  },
  {
    title: 'Como Escolher a Porta de Segurança Ideal',
    category: 'Conselhos',
    date: '28 Nov 2025',
  },
  {
    title: 'Rede Ovelheira vs Rede Hexagonal: Qual Escolher?',
    category: 'Comparação',
    date: '20 Nov 2025',
  },
  {
    title: 'Como Comprar Porta Corta-Fogo',
    category: 'Tutoriais',
    date: '15 Nov 2025',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-24"
      aria-labelledby="blog-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            id="blog-title"
            className="mb-2 text-3xl font-bold tracking-wide text-black uppercase md:text-4xl"
          >
            Conselhos sobre{' '}
            <span className="relative inline-block">
              Vedações
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-[#ea6663]" />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[rgb(111,111,111)] md:text-lg">
            No nosso Blog encontra uma coleção de conselhos, guias e informações
            relevantes sobre todos os tipos de vedações metálicas que temos na
            Securfix.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={cardVariants}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <a href="#" className="block" aria-label={post.title}>
                {/* Image Placeholder */}
                <div className="relative aspect-video bg-gray-100">
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-300 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {/* Category Badge */}
                  <span className="absolute top-3 right-3 rounded-full bg-[#ea6663] px-3 py-1 text-xs font-medium text-white">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Date */}
                  <div className="mb-2 flex items-center gap-1.5 text-sm text-gray-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 line-clamp-2 text-base font-semibold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-[#ea6663]">
                    {post.title}
                  </h3>

                  {/* Read More */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#ea6663] transition-colors duration-200 group-hover:underline">
                    Ler Mais
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
