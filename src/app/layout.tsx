import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Securfix - Vedações Metálicas | Preços de Fábrica",
  description: "Fabricantes de Vedações Metálicas, Cercas - Preços Líderes - Entrega no Local - Orçamento Sem Compromisso - Mais de 50 anos de Experiência no Setor - Assessoria Profissional",
  keywords: ["vedações metálicas", "cercas", "painéis hercules", "portas corta-fogo", "portas de segurança", "securfix", "vedação residencial", "vedação industrial", "vedação agrícola"],
  authors: [{ name: "Securfix - Hierros Tous, S.L.U" }],
  icons: {
    icon: "https://securfix.pt/cdn/shop/files/favicon-securfix_32x32.png",
  },
  openGraph: {
    title: "Securfix - Vedações Metálicas Preços de Fábrica",
    description: "Fabricantes de Vedações Metálicas, Cercas - Preços Líderes - Entrega no Local - Orçamento Sem Compromisso - Mais de 50 anos de Experiência no Setor",
    url: "https://securfix.pt/",
    siteName: "Securfix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Securfix - Vedações Metálicas Preços de Fábrica",
    description: "Fabricantes de Vedações Metálicas, Cercas - Preços Líderes - Entrega no Local",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
