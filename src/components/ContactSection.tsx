'use client';

import { MapPin, Clock, Phone, Mail, MessageCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Location {
  title: string;
  badge?: string;
  address: string;
  hours?: string;
}

const locations: Location[] = [
  {
    title: 'Madrid',
    address: 'P. de las Flores, 23\n28823, Coslada',
    hours: 'L a V: 8h - 14h / 15h - 17h',
  },
  {
    title: 'Barcelona',
    address: 'Carretera C-17, Km 17\n08150, Parets del Vallés',
    hours: 'L a V: 8h - 13h / 15h - 18h',
  },
  {
    title: 'Lisboa, Portugal',
    badge: 'Escritórios',
    address: 'Rua Fialho de Almeida, nº 14\n1070-129 Avenidas Novas',
  },
];

const contactInfo = [
  { icon: Phone, label: 'Espanha', value: '(+34) 910 606 414' },
  { icon: Phone, label: 'Portugal', value: '(+351) 300 528 280' },
  { icon: MessageCircle, label: 'WhatsApp', value: '(+34) 669 386 327' },
  { icon: Mail, label: 'Email', value: 'comercial@securfix.pt' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="bg-gray-50 py-16 md:py-24"
      aria-labelledby="contact-title"
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
            id="contact-title"
            className="mb-2 text-3xl font-bold tracking-wide text-black uppercase md:text-4xl"
          >
            Contacte-<span className="relative">
              Nos
              <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-[#ea6663]" />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[rgb(111,111,111)] md:text-lg">
            Na Securfix somos especialistas em vedações. Temos mais de 50 anos
            fabricando cercas metálicas. Ajudamos você a encontrar a melhor
            vedação para o seu terreno, com uma grande variedade de redes, malhas
            e grades para atender aos requisitos regulatórios e atingir o nível
            de proteção que você precisa.
          </p>
        </motion.div>

        {/* Location Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {locations.map((location) => (
            <motion.div
              key={location.title}
              variants={cardVariants}
              className="group rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              {/* MapPin Icon */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ea6663]">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-black">
                    {location.title}
                  </h3>
                  {location.badge && (
                    <span className="rounded-full bg-[#ea6663]/10 px-2.5 py-0.5 text-xs font-medium text-[#ea6663]">
                      {location.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="mb-3 flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <p className="whitespace-pre-line text-sm leading-relaxed text-[rgb(111,111,111)]">
                  {location.address}
                </p>
              </div>

              {/* Hours */}
              {location.hours && (
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <p className="text-sm text-[rgb(111,111,111)]">
                    {location.hours}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl bg-white p-6 shadow-md md:p-8"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50"
                aria-label={`${item.label}: ${item.value}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ea6663]/10">
                  <item.icon className="h-5 w-5 text-[#ea6663]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Google Rating */}
            <div className="flex items-center gap-3 rounded-lg p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-400/15">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Google
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  4.6<span className="ml-1 text-yellow-400">★</span>
                  <span className="ml-1.5 text-xs font-normal text-gray-400">
                    (235 avaliações)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
