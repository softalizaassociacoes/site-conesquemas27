# Imagens do site — III ConEsquemas 2027

Coloque os arquivos enviados pelo cliente nas pastas abaixo. **Os nomes dos
arquivos importam**: cada imagem é referenciada por nome dentro de `src/data/`.
Se você renomear ou trocar um arquivo, atualize também o arquivo de dados
correspondente (indicado em cada seção).

---

## `palestrantes/` → `src/data/palestrantes.ts`

Fotos oficiais dos palestrantes de **2027**.

- **Formato:** retrato **4:5** (ex.: 1080 × 1350 px), PNG ou JPG
- **Nome:** o nome da pessoa, exatamente como no campo `foto` de
  `palestrantes2027` (ex.: `Ana Rizzon.png`)

Para **adicionar um palestrante**, inclua um item em `palestrantes2027`:

```ts
{
  slug: "nome-da-pessoa",           // sem acentos, minúsculo, com hífens
  nome: "Esp. Nome da Pessoa",      // como aparece no site
  foto: "/images/palestrantes/Nome da Pessoa.png",
  bio: "Mini-currículo…",           // opcional — sem bio, o card mostra "Currículo em breve"
}
```

> **Pendência:** 8 palestrantes estão sem mini-currículo — Aline Reis,
> Johnatan Felipe, Karen Szupszynski, Margareth Oliveira, Melissa Fioravante,
> Natanna Schutz e Renata Brasil. Assim que a organização enviar as bios, basta
> preencher o campo `bio` de cada um.

---

## `comissoes/` → `comissoes` em `src/data/institucional.ts`

Fotos da comissão organizadora, no mesmo padrão retrato 4:5 sobre o roxo da
identidade 2027.

> **Pendência:** falta a foto de **Rodrigo Trapp (Direção Científica)** no padrão
> da comissão. No momento o site usa a foto dele da pasta `palestrantes/`.

---

## `minicursos/` → `minicursos` em `src/data/minicursos.ts`

Um card vertical por minicurso (1500 × 2000 px), com o nome do facilitador.
O nome do arquivo deve bater com o campo `imagem` de cada minicurso.

---

## `carrossel/` → `carrossel` em `src/data/minicursos.ts`

Banners rotativos da home, numerados: `1.png`, `2.png`, `3.png`…

- **Formato:** faixa larga **1058 × 389 px** (proporção ~2.7:1)
- Para adicionar ou remover slides, ajuste o array de números em
  `export const carrossel` (`src/data/minicursos.ts`).

---

## `patrocinadores/` → `parceiros` em `src/data/institucional.ts`

Logos de patrocinadores e apoiadores, preferencialmente **PNG com fundo
transparente**. Aparecem no rodapé de todas as páginas.

Para adicionar uma marca, inclua no grupo desejado (`Organização`,
`Patrocínio` ou `Apoio`):

```ts
{ nome: "Nome da Marca", logo: "/images/patrocinadores/arquivo.png" }
```

Uma marca **sem** o campo `logo` é exibida como texto, o que permite anunciar
um patrocinador antes de receber a arte.

---

## `marca/`

> ⚠️ **Falta o logo do III ConEsquemas (2027).** Hoje o cabeçalho e o rodapé
> usam a assinatura em **texto** (`CONESQUEMAS` + `2027`), porque nenhum dos
> arquivos disponíveis serve: são todos da edição de 2026 ou têm fundo chapado,
> que aparecia como um retângulo branco sobre a faixa roxa.
>
> Quando a arte de 2027 chegar — **PNG ou SVG com fundo transparente** —
> substitua o texto por `<Image>` em `src/components/Header.tsx` e
> `src/components/Footer.tsx`. Há um comentário marcando o ponto exato nos dois.

| Arquivo | Situação |
| --- | --- |
| `logo-ii-conesquemas-2026.png` | Logo da **edição anterior**, com fundo creme. Não usar em 2027 |
| `logo-conesquemas-branco.png` | Contorno em branco, sem o número da edição |
| `logo-conesquemas-alt.png` | Recorte incompleto (só "ESQUEMAS"). Descartável |
| `banner-home-2026.jpg` | Banner da edição de 2026 |

---

## Edição de 2026

**Não há pasta aqui.** A edição de 2026 tem site próprio, em
`conesquemas26.softaliza.com.br`, e as fotos daquela edição vivem lá.

As imagens que haviam sido importadas do WordPress (palestrantes, comissão,
local e galeria) foram removidas quando o site de 2026 passou a ser separado.
Se precisar delas de volta, estão no histórico do Git:

```bash
git checkout e16bcb7~1 -- public/images/edicao-anterior
```

---

## Recomendações técnicas

- **Otimize antes de subir.** O Next.js gera versões AVIF/WebP automaticamente,
  mas arquivos originais acima de ~1,5 MB deixam o build e o deploy lentos.
  Fotos de palestrantes: no máximo 1080 px no lado maior.
- **Acentos e espaços funcionam** nos nomes de arquivo, mas prefira nomes
  simples em arquivos novos — facilita a manutenção.
- **Não apague** as pastas: elas são lidas pelo código.
