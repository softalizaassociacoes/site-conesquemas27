import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/** O painel abre direto nos acessos, que é o que ele tem para mostrar. */
export default function Painel() {
  redirect("/admin/acessos");
}
