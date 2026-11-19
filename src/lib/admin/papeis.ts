/**
 * Papéis do painel.
 *
 * Mora num arquivo próprio porque a tela de contas (componente de cliente)
 * precisa dos rótulos: se viessem de `sessao.ts`, a assinatura de cookie iria
 * junto para o pacote do navegador sem necessidade nenhuma.
 *
 * O papel SIGNIFICA alguma coisa: administrador mexe em contas, editor não.
 * A regra é conferida no servidor, em /api/admin/contas.
 */
export type Papel = "administrador" | "editor";

export const PAPEIS: { valor: Papel; rotulo: string; explicacao: string }[] = [
  {
    valor: "administrador",
    rotulo: "Administrador",
    explicacao: "Vê os acessos e gerencia as contas do painel.",
  },
  {
    valor: "editor",
    rotulo: "Editor",
    explicacao: "Vê os acessos. Não cria, edita nem remove contas.",
  },
];

export function rotuloPapel(papel: Papel): string {
  return PAPEIS.find((p) => p.valor === papel)?.rotulo ?? papel;
}

export function ehPapel(v: unknown): v is Papel {
  return v === "administrador" || v === "editor";
}
