"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BotaoSair() {
  const router = useRouter();
  const [saindo, setSaindo] = useState(false);

  return (
    <button
      type="button"
      disabled={saindo}
      onClick={async () => {
        setSaindo(true);
        await fetch("/api/admin/sair", { method: "POST" }).catch(() => {});
        router.replace("/admin/entrar");
        router.refresh();
      }}
      className="shrink-0 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/40 transition hover:bg-white/20 disabled:opacity-60"
    >
      {saindo ? "Saindo..." : "Sair"}
    </button>
  );
}
