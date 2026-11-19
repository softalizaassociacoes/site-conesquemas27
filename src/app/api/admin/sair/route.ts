import { NextResponse } from "next/server";
import { COOKIE_SESSAO } from "@/lib/admin/sessao";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const resposta = NextResponse.json({ ok: true });
  resposta.cookies.set(COOKIE_SESSAO, "", { path: "/", maxAge: 0 });
  return resposta;
}
