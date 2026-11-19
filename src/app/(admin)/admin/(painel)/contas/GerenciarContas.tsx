"use client";

import { useState } from "react";
import {
  CLASSE_BOTAO,
  CLASSE_BOTAO_SECUNDARIO,
  CLASSE_CAMPO,
  CartaoPainel,
  Recado,
} from "@/components/admin/ui";
import { PAPEIS, type Papel } from "@/lib/admin/papeis";
import type { UsuarioVisivel } from "@/lib/admin/usuarios";

type Resposta = {
  ok?: boolean;
  erro?: string;
  usuario?: UsuarioVisivel;
  avisada?: boolean;
};

const rotuloPapel = (p: Papel) =>
  PAPEIS.find((x) => x.valor === p)?.rotulo ?? p;

function quando(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
}

export default function GerenciarContas({
  iniciais,
  euSou,
  temEmail,
}: {
  iniciais: UsuarioVisivel[];
  euSou: string;
  temEmail: boolean;
}) {
  const [contas, setContas] = useState(iniciais);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);

  // formulário de criação
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [papel, setPapel] = useState<Papel>("editor");

  const administradores = contas.filter(
    (c) => c.papel === "administrador",
  ).length;

  async function chamar(metodo: string, corpo: unknown): Promise<Resposta> {
    const r = await fetch("/api/admin/contas", {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
    });
    try {
      return (await r.json()) as Resposta;
    } catch {
      return { ok: false, erro: "Resposta inesperada do servidor." };
    }
  }

  async function criar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setAviso("");
    setOcupado(true);
    try {
      const r = await chamar("POST", { nome, email, papel });
      if (!r.ok || !r.usuario) {
        setErro(r.erro ?? "Não foi possível criar a conta.");
        return;
      }
      setContas((c) => [...c, r.usuario!]);
      setAviso(
        r.avisada
          ? `Conta criada. Enviamos para ${r.usuario.email} o código do primeiro acesso.`
          : `Conta criada. ${r.usuario.email} ainda precisa usar "Esqueci a senha ou é meu primeiro acesso" na tela de entrada para definir a senha.`,
      );
      setNome("");
      setEmail("");
      setPapel("editor");
    } catch {
      setErro("Falha de conexão. Tente de novo.");
    } finally {
      setOcupado(false);
    }
  }

  async function salvarEdicao(
    original: string,
    mudancas: Record<string, string>,
  ) {
    setErro("");
    setAviso("");
    setOcupado(true);
    try {
      const r = await chamar("PATCH", { email: original, ...mudancas });
      if (!r.ok || !r.usuario) {
        setErro(r.erro ?? "Não foi possível salvar.");
        return;
      }
      const atualizada = r.usuario;
      setContas((c) =>
        c.map((x) => (x.email === original ? atualizada : x)),
      );
      setAviso(`Conta de ${atualizada.email} atualizada.`);
      setEditando(null);
    } catch {
      setErro("Falha de conexão. Tente de novo.");
    } finally {
      setOcupado(false);
    }
  }

  async function remover(alvo: UsuarioVisivel) {
    if (
      !confirm(
        `Remover o acesso de ${alvo.nome} (${alvo.email})? A pessoa perde o acesso ao painel na hora.`,
      )
    ) {
      return;
    }
    setErro("");
    setAviso("");
    setOcupado(true);
    try {
      const r = await chamar("DELETE", { email: alvo.email });
      if (!r.ok) {
        setErro(r.erro ?? "Não foi possível remover.");
        return;
      }
      setContas((c) => c.filter((x) => x.email !== alvo.email));
      setAviso(`Acesso de ${alvo.email} removido.`);
    } catch {
      setErro("Falha de conexão. Tente de novo.");
    } finally {
      setOcupado(false);
    }
  }

  return (
    <div className="space-y-6">
      {erro && (
        <Recado titulo="Não deu certo">
          <p role="alert">{erro}</p>
        </Recado>
      )}
      {aviso && (
        <Recado titulo="Pronto" tom="bom">
          <p>{aviso}</p>
        </Recado>
      )}

      {!temEmail && (
        <Recado titulo="O envio de e-mail não está configurado" tom="neutro">
          Faltam SENDGRID_API_KEY e SENDGRID_EMAIL no projeto. As contas podem
          ser criadas, mas o código do primeiro acesso não sai, e ninguém
          consegue definir a própria senha.
        </Recado>
      )}

      <CartaoPainel>
        <h2 className="text-lg text-brand-800">Dar acesso a alguém</h2>
        <p className="mt-1 text-sm leading-relaxed text-brand-500">
          A conta nasce sem senha. Mandamos na hora o código do primeiro acesso
          para o e-mail informado.
        </p>
        <form onSubmit={criar} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-brand-700">Nome</span>
            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`mt-1.5 ${CLASSE_CAMPO}`}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-brand-700">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1.5 ${CLASSE_CAMPO}`}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-brand-700">Papel</span>
            <select
              value={papel}
              onChange={(e) => setPapel(e.target.value as Papel)}
              className={`mt-1.5 ${CLASSE_CAMPO}`}
            >
              {PAPEIS.map((p) => (
                <option key={p.valor} value={p.valor}>
                  {p.rotulo}
                </option>
              ))}
            </select>
            <span className="mt-1.5 block text-xs text-brand-500">
              {PAPEIS.find((p) => p.valor === papel)?.explicacao}
            </span>
          </label>
          <div className="flex items-start sm:pt-7">
            <button type="submit" disabled={ocupado} className={CLASSE_BOTAO}>
              {ocupado ? "Criando..." : "Criar conta"}
            </button>
          </div>
        </form>
      </CartaoPainel>

      <CartaoPainel>
        <h2 className="text-lg text-brand-800">
          Quem tem acesso{" "}
          <span className="text-sm font-normal text-brand-500">
            ({contas.length})
          </span>
        </h2>

        <ul className="mt-5 space-y-3">
          {contas.map((c) => {
            const ehUltimoAdmin =
              c.papel === "administrador" && administradores <= 1;
            return (
              <li
                key={c.email}
                className="rounded-xl border border-brand-100 bg-sand/30 p-4"
              >
                {editando === c.email ? (
                  <FormEdicao
                    conta={c}
                    ocupado={ocupado}
                    ehUltimoAdmin={ehUltimoAdmin}
                    aoCancelar={() => setEditando(null)}
                    aoSalvar={(m) => salvarEdicao(c.email, m)}
                  />
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-800">
                        {c.nome}
                        {c.email === euSou && (
                          <span className="ml-2 rounded-full bg-plum-50 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-plum-600">
                            você
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-brand-600">
                        {c.email}
                      </p>
                      <p className="mt-1 text-xs text-brand-500">
                        {rotuloPapel(c.papel)} ·{" "}
                        {c.temSenha
                          ? "senha definida"
                          : "ainda sem senha (primeiro acesso pendente)"}{" "}
                        · criada em {quando(c.criadoEm)}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditando(c.email);
                          setErro("");
                          setAviso("");
                        }}
                        className={CLASSE_BOTAO_SECUNDARIO}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => remover(c)}
                        disabled={ocupado || ehUltimoAdmin || c.email === euSou}
                        title={
                          ehUltimoAdmin
                            ? "É a última conta de administrador: não pode ser removida."
                            : c.email === euSou
                              ? "Você não pode remover a sua própria conta."
                              : undefined
                        }
                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-500 ring-1 ring-brand-200 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-5 text-xs leading-relaxed text-brand-500">
          A última conta de administrador não pode ser removida nem rebaixada —
          é isso que impede alguém de trancar a equipe do lado de fora.
        </p>
      </CartaoPainel>
    </div>
  );
}

function FormEdicao({
  conta,
  ocupado,
  ehUltimoAdmin,
  aoCancelar,
  aoSalvar,
}: {
  conta: UsuarioVisivel;
  ocupado: boolean;
  ehUltimoAdmin: boolean;
  aoCancelar: () => void;
  aoSalvar: (mudancas: Record<string, string>) => void;
}) {
  const [nome, setNome] = useState(conta.nome);
  const [novoEmail, setNovoEmail] = useState(conta.email);
  const [papel, setPapel] = useState<Papel>(conta.papel);
  const [senha, setSenha] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const mudancas: Record<string, string> = {};
    if (nome !== conta.nome) mudancas.nome = nome;
    if (novoEmail !== conta.email) mudancas.novoEmail = novoEmail;
    if (papel !== conta.papel) mudancas.papel = papel;
    if (senha) mudancas.senha = senha;
    if (Object.keys(mudancas).length === 0) {
      aoCancelar();
      return;
    }
    aoSalvar(mudancas);
  }

  return (
    <form onSubmit={enviar} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="text-sm font-semibold text-brand-700">Nome</span>
        <input
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={`mt-1.5 ${CLASSE_CAMPO}`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-brand-700">E-mail</span>
        <input
          type="email"
          required
          value={novoEmail}
          onChange={(e) => setNovoEmail(e.target.value)}
          className={`mt-1.5 ${CLASSE_CAMPO}`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-brand-700">Papel</span>
        <select
          value={papel}
          onChange={(e) => setPapel(e.target.value as Papel)}
          disabled={ehUltimoAdmin}
          className={`mt-1.5 ${CLASSE_CAMPO} disabled:opacity-60`}
        >
          {PAPEIS.map((p) => (
            <option key={p.valor} value={p.valor}>
              {p.rotulo}
            </option>
          ))}
        </select>
        {ehUltimoAdmin && (
          <span className="mt-1.5 block text-xs text-brand-500">
            Última conta de administrador: o papel não pode mudar.
          </span>
        )}
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-brand-700">
          Nova senha (opcional)
        </span>
        <input
          type="password"
          autoComplete="new-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="deixe em branco para não mexer"
          className={`mt-1.5 ${CLASSE_CAMPO}`}
        />
        <span className="mt-1.5 block text-xs text-brand-500">
          Pelo menos 10 caracteres, com uma letra e um número.
        </span>
      </label>
      <div className="flex flex-wrap gap-2 sm:col-span-2">
        <button type="submit" disabled={ocupado} className={CLASSE_BOTAO}>
          {ocupado ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={aoCancelar}
          className={CLASSE_BOTAO_SECUNDARIO}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
