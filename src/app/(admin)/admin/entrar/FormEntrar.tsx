"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CLASSE_BOTAO,
  CLASSE_BOTAO_SECUNDARIO,
  CLASSE_CAMPO,
} from "@/components/admin/ui";

type Etapa = "senha" | "pedir-codigo" | "definir-senha";

/**
 * Entrada do painel.
 *
 * O primeiro acesso e o esquecimento são o MESMO caminho, num botão só:
 * ninguém nasce com senha definida por outra pessoa, então não existe tela de
 * "senha provisória". Quem nunca entrou e quem esqueceu pedem o mesmo código.
 */
export default function FormEntrar({ proximo }: { proximo: string }) {
  const router = useRouter();
  const [etapa, setEtapa] = useState<Etapa>("senha");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const caixaMensagem = useRef<HTMLDivElement>(null);

  // O formulário é alto, e a resposta aparecia acima do botão que a pessoa
  // acabou de clicar — fora da tela, em notebook. Sem isto, um erro de verdade
  // passa por "nada aconteceu".
  useEffect(() => {
    if (!erro && !aviso) return;
    caixaMensagem.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    caixaMensagem.current?.focus();
  }, [erro, aviso]);

  /** Erro e aviso nunca convivem: o último estado é o que vale. */
  function avisar(texto: string) {
    setErro("");
    setAviso(texto);
  }
  function falhar(texto: string) {
    setAviso("");
    setErro(texto);
  }

  async function chamar(rota: string, corpo: unknown) {
    const r = await fetch(rota, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
    });
    let dados: { ok?: boolean; erro?: string; mensagem?: string } = {};
    try {
      dados = await r.json();
    } catch {
      dados = { erro: "Resposta inesperada do servidor." };
    }
    return { status: r.status, ...dados };
  }

  function entrou() {
    router.replace(proximo || "/admin/acessos");
    router.refresh();
  }

  async function aoEntrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setAviso("");
    setOcupado(true);
    try {
      const r = await chamar("/api/admin/entrar", { email, senha });
      if (!r.ok) {
        falhar(r.erro ?? "Não foi possível entrar.");
        return;
      }
      entrou();
    } catch {
      falhar("Falha de conexão. Verifique a internet e tente de novo.");
    } finally {
      setOcupado(false);
    }
  }

  async function aoPedirCodigo(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setAviso("");
    setOcupado(true);
    try {
      const r = await chamar("/api/admin/codigo", { email });
      if (!r.ok) {
        falhar(r.erro ?? "Não foi possível enviar o código.");
        return;
      }
      avisar(r.mensagem ?? "Código enviado.");
      setEtapa("definir-senha");
    } catch {
      falhar("Falha de conexão. Verifique a internet e tente de novo.");
    } finally {
      setOcupado(false);
    }
  }

  async function aoDefinirSenha(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setOcupado(true);
    try {
      const r = await chamar("/api/admin/senha", {
        email,
        codigo,
        senha: novaSenha,
      });
      if (!r.ok) {
        falhar(r.erro ?? "Não foi possível salvar a senha.");
        return;
      }
      entrou();
    } catch {
      falhar("Falha de conexão. Verifique a internet e tente de novo.");
    } finally {
      setOcupado(false);
    }
  }

  const mensagens = (
    <div ref={caixaMensagem} tabIndex={-1} className="space-y-4 outline-none">
      {erro && (
        <p
          role="alert"
          className="rounded-xl border border-plum-200 bg-plum-50 px-4 py-3 text-sm leading-relaxed text-plum-700"
        >
          {erro}
        </p>
      )}
      {aviso && (
        <p className="rounded-xl border border-brand-100 bg-sand/60 px-4 py-3 text-sm leading-relaxed text-brand-700">
          {aviso}
        </p>
      )}
    </div>
  );

  if (etapa === "senha") {
    return (
      <form onSubmit={aoEntrar} className="space-y-4">
        {mensagens}
        <label className="block">
          <span className="text-sm font-semibold text-brand-700">E-mail</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1.5 ${CLASSE_CAMPO}`}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-brand-700">Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={`mt-1.5 ${CLASSE_CAMPO}`}
          />
        </label>
        <button type="submit" disabled={ocupado} className={`w-full ${CLASSE_BOTAO}`}>
          {ocupado ? "Entrando..." : "Entrar"}
        </button>
        <button
          type="button"
          onClick={() => {
            setEtapa("pedir-codigo");
            setErro("");
            setAviso("");
          }}
          className="w-full text-center text-sm font-semibold text-plum-600 underline underline-offset-4"
        >
          Esqueci a senha ou é meu primeiro acesso
        </button>
      </form>
    );
  }

  if (etapa === "pedir-codigo") {
    return (
      <form onSubmit={aoPedirCodigo} className="space-y-4">
        {mensagens}
        <p className="text-sm leading-relaxed text-brand-600">
          Informe o e-mail da sua conta. Enviamos um código de seis dígitos, que
          vale por 15 minutos e serve tanto para o primeiro acesso quanto para
          trocar uma senha esquecida.
        </p>
        <label className="block">
          <span className="text-sm font-semibold text-brand-700">E-mail</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1.5 ${CLASSE_CAMPO}`}
          />
        </label>
        <button type="submit" disabled={ocupado} className={`w-full ${CLASSE_BOTAO}`}>
          {ocupado ? "Enviando..." : "Enviar código"}
        </button>
        <div className="flex flex-wrap justify-between gap-3">
          <button
            type="button"
            onClick={() => setEtapa("senha")}
            className="text-sm font-semibold text-brand-500 underline underline-offset-4"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={() => {
              setEtapa("definir-senha");
              setErro("");
            }}
            className="text-sm font-semibold text-plum-600 underline underline-offset-4"
          >
            Já tenho um código
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={aoDefinirSenha} className="space-y-4">
      {mensagens}
      <label className="block">
        <span className="text-sm font-semibold text-brand-700">E-mail</span>
        <input
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1.5 ${CLASSE_CAMPO}`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-brand-700">
          Código de seis dígitos
        </span>
        <input
          inputMode="numeric"
          required
          maxLength={6}
          autoComplete="one-time-code"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
          className={`mt-1.5 tracking-[0.4em] ${CLASSE_CAMPO}`}
        />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-brand-700">Nova senha</span>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className={`mt-1.5 ${CLASSE_CAMPO}`}
        />
        <span className="mt-1.5 block text-xs text-brand-500">
          Pelo menos 10 caracteres, com uma letra e um número.
        </span>
      </label>
      <button type="submit" disabled={ocupado} className={`w-full ${CLASSE_BOTAO}`}>
        {ocupado ? "Salvando..." : "Salvar senha e entrar"}
      </button>
      <div className="flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={() => setEtapa("senha")}
          className="text-sm font-semibold text-brand-500 underline underline-offset-4"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => {
            setEtapa("pedir-codigo");
            setErro("");
          }}
          className={CLASSE_BOTAO_SECUNDARIO}
        >
          Pedir outro código
        </button>
      </div>
    </form>
  );
}
