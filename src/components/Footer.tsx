'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  CreditCard,
  Shield,
} from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const empresaLinks: FooterLink[] = [
  { label: 'Quem Somos', href: '#' },
  { label: 'Contacte-Nos', href: '#' },
  { label: 'Tutoriais', href: '#' },
  { label: 'Blog / Conselhos', href: '#' },
  { label: 'Perguntas Frequentes', href: '#' },
  { label: 'Trabalhe Connosco', href: '#' },
];

const informacaoLinks: FooterLink[] = [
  { label: 'Condições Legais', href: '#' },
  { label: 'Política de Privacidade', href: '#' },
  { label: 'Política de Cookies', href: '#' },
  { label: 'Condições de Envio', href: '#' },
  { label: 'Cancelar e Devolver', href: '#' },
  { label: 'Garantia de Preço Mais Baixo', href: '#' },
];

const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/securfix/',
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/securfix/',
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    label: 'Pinterest',
    href: 'https://www.pinterest.es/securfix/',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/34669386327',
    icon: <MessageCircle className="h-5 w-5" />,
  },
];

const paymentMethods: string[] = [
  'Visa',
  'Mastercard',
  'Maestro',
  'Apple Pay',
  'Google Pay',
];

export default function Footer() {
  const [email, setEmail] = useState<string>('');

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="mt-auto w-full" role="contentinfo">
      {/* Newsletter Bar */}
      <div
        className="bg-[#ea6663] py-6 px-4"
        role="region"
        aria-label="Newsletter subscription"
      >
        <div className="mx-auto max-w-7xl">
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <span className="text-base font-semibold text-white sm:text-lg">
              Subscreva a nossa newsletter
            </span>
            <div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O seu email..."
                required
                aria-label="Email para newsletter"
                className="h-10 w-full flex-1 rounded-lg border-0 bg-white px-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50 sm:min-w-[260px]"
              />
              <button
                type="submit"
                className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#ea6663]"
                aria-label="Subscrever newsletter"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Subscrever</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#1a1a2e] py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Column 1: SECURFIX Logo & Info */}
            <div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
                SECURFIX
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                Especialistas em vedações metálicas com mais de 50 anos de
                experiência. Preços de fábrica, entrega rápida e assessoria
                profissional.
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+351300528280"
                    className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                    aria-label="Ligar para (+351) 300 528 280"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[#ea6663]" />
                    <span>(+351) 300 528 280</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:comercial@securfix.pt"
                    className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
                    aria-label="Enviar email para comercial@securfix.pt"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#ea6663]" />
                    <span>comercial@securfix.pt</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: A Empresa */}
            <FooterColumnSection column={{ title: 'A Empresa', links: empresaLinks }} />

            {/* Column 3: Informação */}
            <FooterColumnSection column={{ title: 'Informação', links: informacaoLinks }} />

            {/* Column 4: Redes Sociais */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Siga-nos
              </h3>
              <div className="grid grid-cols-2 gap-3" role="list" aria-label="Redes sociais">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-700 text-gray-400 transition-all hover:border-[#ea6663] hover:bg-[#ea6663]/10 hover:text-white"
                  >
                    {social.icon}
                    <span className="text-xs font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 bg-[#1a1a2e] py-6 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-center text-xs leading-relaxed text-gray-500 md:text-left">
              © 2026 Securfix. É uma loja destinada a profissionais, todos os
              preços são com IVA.
            </p>
            <div className="flex items-center gap-4" aria-label="Métodos de pagamento aceites">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <CreditCard className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Pagamento seguro:</span>
              </span>
              <div className="flex items-center gap-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="flex h-7 items-center rounded border border-gray-700 bg-gray-800/50 px-2 text-[10px] font-medium text-gray-400"
                  >
                    {method}
                  </span>
                ))}
              </div>
              <Shield className="h-4 w-4 text-gray-600" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumnSection({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
        {column.title}
      </h3>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
