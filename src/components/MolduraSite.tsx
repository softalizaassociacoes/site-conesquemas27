import AvisoCookies from "@/components/AvisoCookies";
import ConsentimentoPadrao from "@/components/ConsentimentoPadrao";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MedicaoGoogle from "@/components/MedicaoGoogle";
import MetaPixel from "@/components/MetaPixel";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Moldura do site público. Tudo que mede está aqui dentro — e só aqui: o
 * painel em /admin tem outra moldura e não carrega nada disto.
 *
 * Existe como componente, e não só como layout de (site), porque o
 * `not-found.tsx` da raiz também precisa dela: uma URL que não casa com rota
 * nenhuma não passa pelo layout de (site), e sem isto o 404 apareceria sem
 * cabeçalho nem rodapé.
 *
 * ConsentimentoPadrao vem primeiro de propósito: declara todo o Consent Mode
 * como negado antes de qualquer script de medição existir.
 */
export default function MolduraSite({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ConsentimentoPadrao />
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
      <AvisoCookies />
      <MedicaoGoogle />
      <MetaPixel />
    </>
  );
}
