import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FormEntrar from "@/app/(admin)/admin/entrar/FormEntrar";
import { Recado } from "@/components/admin/ui";
import { blobConfigurado } from "@/lib/admin/blob";
import { sendgridConfigurado } from "@/lib/admin/email";
import { temSegredo } from "@/lib/admin/sessao";
import { evento } from "@/data/evento";

export const metadata: Metadata = {
  title: "Entrar no painel",
  robots: { index: false, follow: false },
};

// Tela de autenticação: nada aqui pode ser pré-renderizado nem guardado.
export const dynamic = "force-dynamic";

/**
 * Entrada do painel. Fica FORA do grupo (painel) de propósito: se estivesse
 * dentro, o próprio login cairia no redirecionamento de quem não tem sessão.
 *
 * Faltando configuração, a tela aparece assim mesmo e diz o que falta — dá
 * para construir agora e cadastrar as variáveis depois.
 */
export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ proximo?: string }>;
}) {
  const { proximo } = await searchParams;
  // só caminhos internos: um "proximo" vindo de fora viraria redirecionamento aberto
  const destino =
    proximo && proximo.startsWith("/admin") ? proximo : "/admin/acessos";

  const faltando: string[] = [];
  if (!temSegredo()) faltando.push("ADMIN_SESSION_SECRET");
  if (!blobConfigurado()) faltando.push("um store do Vercel Blob");
  if (!sendgridConfigurado()) faltando.push("SENDGRID_API_KEY e SENDGRID_EMAIL");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-sand/40 px-4 py-14">
      <div className="w-full max-w-md">
        <Link href="/" className="mx-auto block w-fit">
          <Image
            src="/images/marca/logo-conesquemas.png"
            alt={evento.nomeCompleto}
            width={900}
            height={76}
            priority
            className="h-6 w-auto"
          />
        </Link>

        <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum-500">
            Painel
          </p>
          <h1 className="mt-2 text-2xl text-brand-800">Entrar</h1>
          <p className="mt-2 text-sm leading-relaxed text-brand-600">
            Área restrita da organização. Os acessos do site e as contas do
            painel ficam aqui.
          </p>

          <div className="mt-6">
            <FormEntrar proximo={destino} />
          </div>
        </div>

        {faltando.length > 0 && (
          <div className="mt-6">
            <Recado titulo="O painel ainda não está completamente configurado">
              <p>
                Falta cadastrar, no projeto da Vercel: {faltando.join("; ")}.
                Depois de cadastrar, é preciso publicar de novo — variável nova
                só vale em build novo.
              </p>
            </Recado>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-brand-400">
          <Link href="/" className="underline underline-offset-4">
            Voltar para o site
          </Link>
        </p>
      </div>
    </main>
  );
}
