import MolduraSite from "@/components/MolduraSite";

/** Todas as páginas públicas, dentro da moldura que mede. */
export default function LayoutSite({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MolduraSite>{children}</MolduraSite>;
}
