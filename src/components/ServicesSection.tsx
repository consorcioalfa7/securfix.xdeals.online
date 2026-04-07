'use client';

import { useRef } from 'react';
import { Home, Factory, TreePine, Check, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const services: ServiceCard[] = [
  {
    icon: <Home className="w-10 h-10" />,
    title: 'Vedação Residencial',
    description:
      'Cercas para jardins, chalets, piscinas, moradias unifamiliares e zonas residenciais. Podem ser utilizadas tanto para delimitar e manter um terreno protegido, como para decorar ou dar appeal estético a uma propriedade.',
    items: [
      'Painel Hercules',
      'Rede Malha Solta',
      'Decoração de Jardim',
      'Grades e Corrimãos',
      'Portas e Portões',
    ],
  },
  {
    icon: <Factory className="w-10 h-10" />,
    title: 'Vedação Industrial',
    description:
      'Cercas industriais e recintos para obras, polígonos industriais, estabelecimentos comerciais. Soluções robustas e duradouras para proteção de áreas industriais.',
    items: [
      'Painel de Obra',
      'Rede Eletrossoldada',
      'Gradil Tramex',
      'Chapa Perfurada',
      'Portas Industriais',
    ],
  },
  {
    icon: <TreePine className="w-10 h-10" />,
    title: 'Vedação Agrícola',
    description:
      'Recintos agrícolas para gado, avicultura, culturas. Soluções adequadas para a proteção de animais e delimitação de terrenos agrícolas.',
    items: [
      'Rede Ovelheira',
      'Rede Hexagonal',
      'Arame Farpado',
      'Cancelas',
      'Passos Canadianos',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-title"
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="services-title"
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-black uppercase"
          >
            Os Nossos Serviços
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-[#ea6663] rounded-full" />
        </div>

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient Top Section */}
              <div className="relative h-[120px] bg-gradient-to-br from-[#ea6663] to-[#d94f4c] flex items-center justify-center">
                <div className="text-white transform transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Items List */}
                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#ea6663] flex-shrink-0" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-[#ea6663] text-[#ea6663] font-semibold text-sm transition-all duration-300 hover:bg-[#ea6663] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2"
                  aria-label={`Saber mais sobre ${service.title}`}
                >
                  Saber Mais
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
