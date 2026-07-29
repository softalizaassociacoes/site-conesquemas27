import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Parisienne } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MetaPixel from "@/components/MetaPixel";
import WhatsAppButton from "@/components/WhatsAppButton";
import { evento, siteIndexavel, siteUrl } from "@/data/evento";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Usada só na marca d'água decorativa das faixas roxas. */
const manuscrito = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-manuscrito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${evento.nome} — ${evento.nomeCompleto}`,
    template: `%s | ${evento.nome}`,
  },
  description:
    "A Terapia do Esquema como ela acontece de verdade: ao vivo, na prática, entre pessoas. 29 e 30 de abril e 01 de maio de 2027, no RioMar Eventos, Recife/PE.",
  keywords: [
    "ConEsquemas",
    "Terapia do Esquema",
    "congresso",
    "psicologia",
    "Recife",
    "CEPPA",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: evento.nome,
    title: `${evento.nome} — ${evento.nomeCompleto}`,
    description: `${evento.datas.rotulo} · ${evento.local.nome}, ${evento.local.cidade}/${evento.local.uf}`,
  },
  robots: siteIndexavel
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      },
};

export const viewport: Viewport = {
  themeColor: "#67699a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${manuscrito.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MetaPixel />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-plum-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
