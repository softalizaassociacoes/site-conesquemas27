import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_SESSAO, lerSessao } from "@/lib/admin/sessao";

/**
 * Primeira barreira do painel.
 *
 * No Next 16 este arquivo se chama `proxy` — o antigo `middleware` foi
 * renomeado, e um arquivo com o nome velho simplesmente não roda.
 *
 * A conferência de verdade acontece de novo no layout de /admin, que roda no
 * servidor da rota. São duas barreiras de propósito: esta evita que quem não
 * tem sessão chegue a carregar a página, e a outra garante que nenhuma rota do
 * painel confie só nela.
 *
 * As rotas /api/admin/* não entram no matcher porque conferem a sessão por
 * conta própria — e porque o próprio login é uma delas.
 */
export async function proxy(req: NextRequest) {
  const sessao = await lerSessao(req.cookies.get(COOKIE_SESSAO)?.value).catch(
    () => null,
  );
  if (sessao) return NextResponse.next();

  const destino = new URL("/admin/entrar", req.url);
  const atual = req.nextUrl.pathname + req.nextUrl.search;
  if (atual !== "/admin") destino.searchParams.set("proximo", atual);
  return NextResponse.redirect(destino);
}

export const config = {
  // tudo sob /admin menos a própria tela de entrar
  matcher: ["/admin", "/admin/((?!entrar).*)"],
};
