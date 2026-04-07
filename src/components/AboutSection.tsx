'use client';

import { useRef } from 'react';
import { Shield, Truck, BadgePercent, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: '50+ Anos de Experiência',
    description:
      'Mais de cinco décadas dedicadas à fabricação de vedações metálicas de qualidade',
  },
  {
    icon: <Truck className="w-7 h-7" />,
    title: 'Entrega 48-72h',
    description: 'Entrega rápida em Portugal continental e Espanha',
  },
  {
    icon: <BadgePercent className="w-7 h-7" />,
    title: 'Preço de Fábrica',
    description: 'Preços diretos de fabricante sem intermediários',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gray-50 py-16 md:py-24"
      aria-labelledby="about-title"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <h2
            id="about-title"
            className="text-3xl md:text-4xl font-bold tracking-wide text-black uppercase mb-4"
          >
            Que é a{' '}
            <span className="relative inline-block">
              <span className="relative z-10">SECURFIX</span>
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-[#ea6663] -z-0 rounded-full" />
            </span>
            ?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
            Temos uma vasta gama de malhas, portões, portas e cercados com redes, painéis,
            grades, para uso residencial, industrial, agrícola, cinegético, entre outros. Postes
            de metal e todos os acessórios, sem soldas para evitar corrosão. Portas metálicas e
            muito mais.
          </p>
        </motion.div>

        {/* Feature boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-14">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={index + 1}
              className="flex flex-col items-center text-center bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Icon circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#ea6663]/10 text-[#ea6663] mb-5 shrink-0">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-black mb-2 tracking-wide uppercase">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={5}
          className="text-center"
        >
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50">
            MAIS INFORMAÇÃO
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
