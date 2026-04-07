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
  title: "Securfix - Vedações Metálicas | Preços de Fábrica | Entrega Europa",
  description: "Fabricantes de Vedações Metálicas, Cercas - Preços Líderes - Entrega em toda a Europa - Orçamento Sem Compromisso - Mais de 50 anos de Experiência - Assessoria Profissional. Metal fencing, gates, doors at factory prices.",
  keywords: [
    "vedações metálicas", "cercas", "painéis hercules", "portas corta-fogo", "portas de segurança",
    "securfix", "vedação residencial", "vedação industrial", "vedação agrícola",
    "metal fencing", "chain link", "welded mesh", "fire doors", "security doors",
    "vallados metálicos", "clôtures métalliques", "metallzäune",
    "rejas", "cercas", "hekkwerk", "recinzioni",
    "preços de fábrica", "entrega rápida", "Europa",
  ],
  authors: [{ name: "Securfix - Hierros Tous, S.L.U" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Securfix - Vedações Metálicas Preços de Fábrica | Metal Fencing Europe",
    description: "Fabricantes de Vedações Metálicas, Cercas - Preços Líderes - Entrega em toda a Europa - Mais de 50 anos de Experiência",
    url: "https://securfix.xdeals.online",
    siteName: "Securfix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Securfix - Vedações Metálicas Preços de Fábrica",
    description: "Fabricantes de Vedações Metálicas, Cercas - Preços Líderes - Entrega em toda a Europa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
