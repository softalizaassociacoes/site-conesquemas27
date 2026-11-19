import type { Metadata } from "next";
import GerenciarContas from "@/app/(admin)/admin/(painel)/contas/GerenciarContas";
import { Recado } from "@/components/admin/ui";
import { SemBlob } from "@/lib/admin/blob";
import { sendgridConfigurado } from "@/lib/admin/email";
import { LOG, sessaoAtual } from "@/lib/admin/guarda";
import { listarVisiveis, type UsuarioVisivel } from "@/lib/admin/usuarios";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contas",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

/**
 * Contas do painel.
 *
 * Todas vivem aqui: criar, editar, trocar senha e remover valem na hora, sem
 * deploy e sem mexer na Vercel. A rota confere o papel no servidor — esconder
 * o link do menu não é controle de acesso.
 */
export default async function TelaContas() {
  const sessao = await sessaoAtual();
  if (!sessao) redirect("/admin/entrar");

  if (sessao.papel !== "administrador") {
    return (
      <div className="container-page max-w-3xl py-8">
        <h1 className="text-2xl text-brand-800 sm:text-3xl">Contas</h1>
        <div className="mt-6">
          <Recado titulo="Esta seção é de quem administra">
            A sua conta tem papel de editor: vê os acessos, mas não cria, edita
            nem remove contas. Se precisar desse acesso, peça a um
            administrador do painel.
          </Recado>
        </div>
      </div>
    );
  }

  let usuarios: UsuarioVisivel[] = [];
  let falha: string | null = null;
  try {
    usuarios = await listarVisiveis();
  } catch (e) {
    if (e instanceof SemBlob) {
      falha =
        "O armazenamento das contas ainda não foi ligado. Falta conectar um store do Vercel Blob a este projeto, na aba Storage, e publicar de novo. Até lá, nenhuma conta pode ser criada nem lida.";
    } else {
      falha =
        "Não foi possível ler as contas agora. O detalhe ficou no log da função, em Vercel · Logs, com o prefixo [ADMIN-CONESQUEMAS].";
      console.error(`${LOG} Leitura das contas na tela:`, e);
    }
  }

  return (
    <div className="container-page py-8">
      <div>
        <h1 className="text-2xl text-brand-800 sm:text-3xl">Contas do painel</h1>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-brand-500">
          Toda conta nasce e vive aqui. Ninguém recebe senha pronta: quem entra
          pela primeira vez usa o mesmo código por e-mail de quem esqueceu a
          senha. Guardamos só o resumo criptográfico da senha, então não existe
          ver a senha de alguém — existe trocar.
        </p>
      </div>

      {falha ? (
        <div className="mt-8 max-w-3xl">
          <Recado titulo="As contas não puderam ser carregadas">{falha}</Recado>
        </div>
      ) : (
        <div className="mt-8">
          <GerenciarContas
            iniciais={usuarios}
            euSou={sessao.email}
            temEmail={sendgridConfigurado()}
          />
        </div>
      )}
    </div>
  );
}
