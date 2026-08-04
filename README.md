# Site ConEsquemas 2027

Site do **III Congresso Internacional de Práticas em Terapia do Esquema**
(III ConEsquemas), 29 e 30 de abril e 01 de maio de 2027, no Espaço RioMar
Eventos, Recife/PE.

Substitui o site em WordPress da edição de 2026. O conteúdo de 2026 permanece
publicado na seção **Edição Anterior**.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4

---

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

O site sobe em <http://localhost:3000>.

---

## Onde mexer no conteúdo

Todo o conteúdo editável vive em `src/data/` — não é preciso tocar em componentes
para atualizar textos, datas ou valores.

| Arquivo | O que controla |
| --- | --- |
| `evento.ts` | Datas, local, contatos, redes, URL de inscrição, ID do pixel, Lote Zero |
| `lotes.ts` | Valores e períodos dos 5 lotes das 3 categorias, regras de reembolso |
| `palestrantes.ts` | Palestrantes de 2027 e de 2026 (edição anterior) |
| `minicursos.ts` | Os 3 minicursos e os slides do carrossel da home |
| `institucional.ts` | Textos do evento, público-alvo, comissões, Recife, patrocinadores |
| `faq.ts` | As 26 perguntas frequentes, agrupadas por tema |
| `edital.ts` | Edital de submissão: prazos, modalidades, eixos temáticos |
| `programacao-2026.ts` | Programação completa da edição anterior |
| `navegacao.ts` | Itens do menu principal e submenus |

Imagens: veja **[`public/images/LEIA-ME.md`](public/images/LEIA-ME.md)**.

### Alterar uma data ou valor

Exemplo — mudar o início do Lote Zero:

```ts
// src/data/evento.ts
loteZero: {
  inicioISO: "2026-08-07T13:00:00-03:00",         // alimenta a contagem regressiva
  rotulo: "07/08/2026 (13h) a 08/08/2026 (13h)",  // texto exibido na tela
}
```

**Altere os dois juntos**, senão o contador e o texto ficam divergentes.

---

## Meta Pixel

- **ID:** `622935097150845` (`evento.pixelId` em `src/data/evento.ts`)
- **Código-base:** carregado em todas as páginas via `src/components/MetaPixel.tsx`
- **Evento `Purchase`:** disparado apenas em `/obrigado`
  (`src/app/obrigado/PurchaseEvent.tsx`)

**URL da página de obrigado a informar para a equipe de tráfego:**
`https://conesquemas.com.br/obrigado`
(em validação: `https://conesquemas.softaliza.com.br/obrigado`)

Essa página está marcada como `noindex` e bloqueada no `robots.txt`.

---

## Formulário de captura de leads

Exigido pelo guia (p. 35). Aparece na home e na página de contato.

- **Componente:** `src/components/LeadForm.tsx`
- **Endpoint:** `POST /api/leads` (`src/app/api/leads/route.ts`)
- Valida nome, e-mail, telefone e categoria, tem campo-armadilha anti-spam e
  dispara o evento `Lead` do Meta Pixel nos envios bem-sucedidos
- Cada lead é **enviado por e-mail via SendGrid** para a organização, com
  `reply_to` do próprio interessado — responder no e-mail já fala com ele

### Configuração obrigatória

Faltando qualquer uma das obrigatórias, o endpoint responde **503** e apenas
registra o lead no log — o nome da variável ausente aparece lá. Defina em
*Vercel → Project Settings → Environment Variables* (ou no `.env` do servidor)
e refaça o deploy:

| Variável | Obrigatória | Para que serve |
| --- | --- | --- |
| `SENDGRID_API_KEY` | sim | Chave de API do SendGrid com permissão **Mail Send** |
| `SENDGRID_EMAIL` | sim | Remetente. Precisa ser um **Verified Sender** no SendGrid (*Settings → Sender Authentication*) |
| `LEADS_EMAIL_PARA` | não | Destinatários, separados por vírgula. Padrão: `marcos@softaliza.com.br` e `conesquemas@ceppape.com.br` |

O assunto é fixo: **“Conesquemas interesse”**. Destinatários e assunto ficam no
topo de `src/app/api/leads/route.ts`.

> O remetente é exigido de propósito, sem valor padrão: cair no e-mail do
> congresso sem ele estar verificado no SendGrid só produziria erro 403 na
> hora do envio, que é mais difícil de diagnosticar do que a falta da variável.

> Se o remetente não estiver verificado no SendGrid, a API devolve 403 e o
> formulário mostra erro. O motivo exato aparece no log do servidor.

Nunca comite a chave: o `.gitignore` já cobre `.env*`.

---

## Deploy

O projeto declara o preset do framework em `vercel.json`. **Não remova esse
arquivo:** o projeto foi importado na Vercel sem detectar o Next.js e, sem ele,
o build passa mas todas as rotas respondem `404: NOT_FOUND`.

### Vercel

O deploy é automático a cada push na `main`. A configuração necessária são as
variáveis `SENDGRID_API_KEY` e `SENDGRID_EMAIL` (veja a seção de leads acima).

Para liberar o acesso do cliente sem login, desative *Deployment Protection*
em *Project Settings → Deployment Protection* — por padrão a Vercel exige
autenticação e a URL redireciona para a tela de login.

### Servidor próprio — conesquemas.softaliza.com.br

O site roda em **Node com SSR** (`next start`), atrás de um proxy reverso.

### 1. Build

```bash
npm ci && npm run build
```

### 2. Subir com PM2

```bash
pm2 start npm --name conesquemas --cwd /var/www/conesquemas -- start
```

```bash
pm2 save
```

O `next start` escuta na porta `3000` por padrão. Para mudar a porta:
`pm2 start npm --name conesquemas -- start -- -p 3001`.

### 3. Nginx

```nginx
server {
    server_name conesquemas.softaliza.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    client_max_body_size 20M;
}
```

Depois, emita o certificado:

```bash
certbot --nginx -d conesquemas.softaliza.com.br
```

### 4. Indexação (importante)

**O site está bloqueado para buscadores.** Enquanto roda em
`conesquemas27.softaliza.com.br`, ele não pode aparecer no Google nem competir
com o domínio oficial por conteúdo duplicado. O bloqueio é feito em três
camadas, todas ligadas à mesma variável:

- `robots.txt` responde `Disallow: /`
- cabeçalho HTTP `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`
- `<meta name="robots" content="noindex, nofollow, nocache">` em todas as páginas

### 5. Ao trocar para o domínio definitivo

Na virada para `conesquemas.com.br`, defina as duas variáveis de ambiente:

| Variável | Valor |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://conesquemas.com.br` |
| `NEXT_PUBLIC_SITE_INDEXAVEL` | `true` |

A primeira alimenta o sitemap, o `robots.txt` e as tags Open Graph; a segunda
libera a indexação. Sem a segunda, o site continua invisível para o Google —
**não esqueça dela no dia da virada.**

### Atualizações

```bash
git pull && npm ci && npm run build && pm2 restart conesquemas
```

> A pasta `data/` (leads) fica fora do Git e **não deve ser apagada** entre
> deploys.

---

## Estrutura de rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/sobre-o-evento` | O evento, público-alvo, pré-requisitos |
| `/comissoes` | Comissão organizadora |
| `/exposicao-comercial` | Expositores, patrocínio e apoio |
| `/local-do-evento` | RioMar Eventos, Recife e agência parceira |
| `/palestrantes` | Palestrantes de 2027 |
| `/programacao` | Estrutura dos três dias |
| `/minicursos` | Os 3 minicursos |
| `/submissoes` | Edital de trabalhos científicos |
| `/inscricoes` | Valores, lotes e regulamento |
| `/certificados` | Certificados digitais |
| `/monitoria` | Edital de monitoria |
| `/faq` | 26 perguntas frequentes |
| `/contato` | Canais de contato e newsletter |
| `/obrigado` | Pós-compra (dispara `Purchase`) |
| `/api/leads` | Recebe o formulário e envia por e-mail (SendGrid) |

> **Edições anteriores** não é uma rota deste site: o item de menu aponta para
> `conesquemas26.softaliza.com.br`, onde vive a edição de 2026. As rotas
> `/edicao-anterior*` e `/edicao-passada` redirecionam para lá (301), para não
> quebrar links antigos nem duplicar conteúdo. A URL fica em `siteEdicao2026`
> (`src/data/navegacao.ts`) e nos `redirects` do `next.config.ts`.
>
> `/certificados` continua publicada e é citada no FAQ, mas saiu do menu
> principal a pedido do cliente.

---

## Regra de conteúdo

**O guia do ConEsquemas é a fonte de verdade.** Todo dado publicado deve sair
de lá; o que não estiver no guia não entra no site. Duas exceções, ambas
material oficial enviado pelo cliente:

- **Palestrantes e comissão** são exatamente quem está em
  `public/images/palestrantes` e `public/images/comissoes`.
- **Contatos operacionais** (WhatsApp da central e URL da plataforma de
  inscrição) vieram do site da edição anterior, porque o guia pede o botão de
  WhatsApp e o link de inscrição sem informar os valores.

Os botões **"Inscreva-se"** levam à página do evento na plataforma
(`eventos.softaliza.com.br/iii-conesquemas#newsletter`). A âncora abre direto o
formulário, que até 07/08/2026 funciona como lista de espera.

> **Em 07/08/2026:** remova a âncora `#newsletter` de `inscricaoUrl`, em
> `src/data/evento.ts`. O rótulo e a URL alimentam todos os botões do site, no
> cabeçalho e nas páginas — não há texto solto em lugar nenhum.

Não há link para a **área do participante**: ela não existe nesta edição. As
menções em texto (certificados e edital) vêm do guia e devem permanecer.

Ao atualizar, confira também `src/data/` — os comentários marcam a página do
guia de onde cada bloco veio.

## Pendências de conteúdo

- Mini-currículo de 8 palestrantes (Aline Reis, Johnatan Felipe, Karen
  Szupszynski, Margareth Oliveira, Melissa Fioravante, Natanna Schutz e
  Renata Brasil)
- Foto de **Rodrigo Trapp** no padrão da comissão. O guia (p. 8) o cita na
  Direção Científica, mas não há arte dele em `public/images/comissoes`, então
  ele não aparece na página
- Versão **clara oficial** do logo, se houver: a que está no ar é a arte
  original recolorida por script para funcionar sobre a faixa roxa
- **Patrocinadores e apoiadores de 2027.** Os grupos estão vazios: as marcas
  que apareciam eram da edição de 2026 e o guia ainda está captando patrocínio
- Grade horária da programação de 2027, data e horário dos minicursos
- Edital de monitoria de 2027
