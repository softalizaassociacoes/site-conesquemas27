"use client";

import { useState } from "react";

type Estado = "parado" | "enviando" | "ok" | "erro";

const CATEGORIAS = [
  "Estudante de graduação",
  "Estudante de pós-graduação",
  "Profissional",
  "Outro",
];

export default function LeadForm() {
  const [estado, setEstado] = useState<Estado>("parado");
  const [mensagem, setMensagem] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const dados = Object.fromEntries(new FormData(form));

    setEstado("enviando");
    try {
      const resposta = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      const corpo = await resposta.json();

      if (!resposta.ok) {
        setEstado("erro");
        setMensagem(corpo.erro ?? "Não foi possível enviar. Tente novamente.");
        return;
      }

      setEstado("ok");
      form.reset();
      if (typeof window !== "undefined" && "fbq" in window) {
        (window as unknown as { fbq: (...a: unknown[]) => void }).fbq(
          "track",
          "Lead",
        );
      }
    } catch {
      setEstado("erro");
      setMensagem("Falha de conexão. Verifique sua internet e tente de novo.");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-2xl border border-plum-200 bg-plum-50 p-8 text-center">
        <p className="text-3xl" aria-hidden="true">
          ✿
        </p>
        <h3 className="mt-3 text-xl text-brand-800">Contato registrado!</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-600">
          Você será avisado assim que o Lote Zero abrir. Fique de olho no seu
          e-mail e no WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setEstado("parado")}
          className="mt-5 text-sm font-semibold text-plum-500 underline underline-offset-4"
        >
          Cadastrar outro contato
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="space-y-4">
        <Campo id="nome" rotulo="Nome completo" autoComplete="name" required />
        <Campo
          id="email"
          rotulo="E-mail"
          type="email"
          autoComplete="email"
          required
        />
        <Campo
          id="telefone"
          rotulo="WhatsApp"
          type="tel"
          autoComplete="tel"
          placeholder="(00) 00000-0000"
          required
        />

        <div>
          <label
            htmlFor="categoria"
            className="mb-1.5 block text-sm font-medium text-brand-700"
          >
            Categoria
          </label>
          <select
            id="categoria"
            name="categoria"
            className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-brand-800 transition focus:border-plum-400 focus:outline-none"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione…
            </option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Armadilha anti-spam: invisível para pessoas, preenchida por robôs. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="empresa">Não preencher</label>
          <input id="empresa" name="empresa" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {estado === "erro" && (
        <p role="alert" className="mt-4 text-sm font-medium text-plum-600">
          {mensagem}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-6 w-full rounded-full bg-plum-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-plum-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Quero ser avisado"}
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-brand-400">
        Seus dados são usados apenas para comunicações do III ConEsquemas.
      </p>
    </form>
  );
}

function Campo({
  id,
  rotulo,
  ...props
}: { id: string; rotulo: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-brand-700"
      >
        {rotulo}
      </label>
      <input
        id={id}
        name={id}
        className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-brand-800 transition placeholder:text-brand-300 focus:border-plum-400 focus:outline-none"
        {...props}
      />
    </div>
  );
}
