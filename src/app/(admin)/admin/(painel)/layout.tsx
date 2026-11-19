import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import BotaoSair from "@/app/(admin)/admin/(painel)/BotaoSair";
import MenuPainel from "@/app/(admin)/admin/(painel)/MenuPainel";
import { sessaoAtual } from "@/lib/admin/guarda";
import { rotuloPapel } from "@/lib/admin/papeis";
import { evento } from "@/data/evento";

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

// Painel privado, com número que muda o tempo todo: nada é pré-renderizado.
export const dynamic = "force-dynamic";

/**
 * Segunda barreira do painel — a primeira é o proxy.
 *
 * Aqui dentro não entra nada do site: sem cabeçalho, sem rodapé, sem aviso de
 * cookies, sem Meta Pixel e sem medição. É o grupo de rota (admin) que garante
 * isso: a moldura do site vive em (site), e as duas nunca se encontram.
 */
export default async function LayoutPainel({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessao = await sessaoAtual();
  if (!sessao) redirect("/admin/entrar");

  return (
    <div className="flex min-h-screen flex-col bg-sand/30">
      <header className="bg-brand-700 text-white">
        <div className="container-page flex flex-wrap items-center gap-4 py-4">
          <Image
            src="/images/marca/logo-conesquemas-branco.png"
            alt=""
            width={900}
            height={76}
            className="h-5 w-auto shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-none">
              Painel de métricas
            </p>
            <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-blush">
              {evento.nome} · {evento.ano}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <p className="hidden text-right text-xs leading-tight text-brand-100 sm:block">
              {sessao.nome}
              <br />
              <span className="text-brand-200">
                {rotuloPapel(sessao.papel)}
              </span>
            </p>
            <BotaoSair />
          </div>
        </div>
      </header>

      <MenuPainel ehAdmin={sessao.papel === "administrador"} />

      <main className="flex-1">{children}</main>
    </div>
  );
}
