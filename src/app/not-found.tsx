import Conteudo404 from "@/components/Conteudo404";
import MolduraSite from "@/components/MolduraSite";

/**
 * 404 de URL que não casa com rota nenhuma.
 *
 * Esta é a única rota fora dos grupos (site) e (admin), então a moldura do
 * site entra aqui explicitamente — senão o visitante cairia na tela preta
 * padrão do Next, sem cabeçalho, rodapé nem caminho de volta.
 */
export default function NotFound() {
  return (
    <MolduraSite>
      <Conteudo404 />
    </MolduraSite>
  );
}
