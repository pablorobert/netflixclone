# Netflix Clone

Clone da interface da Netflix construído com React 19 e Vite, consumindo o catálogo da
[TMDB](https://www.themoviedb.org). Projeto de estudo — sem afiliação com a Netflix.

## Stack

| Peça | Versão |
|---|---|
| React | 19 |
| Vite | 8 |
| Material UI (ícones) | 9 |
| Vitest + Testing Library | 5 / 16 |
| ESLint | 10 (flat config) |
| Runtime / gerenciador | bun |

## Pré-requisitos

- [bun](https://bun.sh) 1.4+
- Uma chave de API da TMDB (gratuita): https://www.themoviedb.org/settings/api

## Configuração

```bash
bun install
cp .env.example .env.local
```

Preencha a chave em `.env.local`:

```
VITE_TMDB_API_KEY=sua_chave_aqui
```

`.env.local` está no `.gitignore` — a chave nunca vai para o repositório.
Sem a variável definida, a aplicação exibe um erro em tela em vez de falhar em silêncio.

## Scripts

| Comando | O que faz |
|---|---|
| `bun run dev` | Servidor de desenvolvimento (abre o navegador automaticamente) |
| `bun run build` | Build de produção em `dist/` |
| `bun run preview` | Serve o build de produção localmente |
| `bun run test` | Testes (Vitest, uma execução) |
| `bun run test:watch` | Testes em modo watch |
| `bun run lint` | ESLint |

> Use `bun run test`, não `bun test`. O segundo aciona o runner nativo do bun, que
> ignora o `vite.config.js` — sem jsdom e sem `setupTests.js`, os testes falham com
> `ReferenceError: document is not defined`.

## Estrutura

```
src/
  api/tmdb.js              busca as seções da home e os detalhes de um título
  hooks/
    useHomeCatalog.js      carrega as seções e sorteia o destaque
    useScrolledPast.js     avisa quando a página passou de N pixels de rolagem
  components/
    Header.jsx             barra de navegação, fica sólida ao rolar
    FeaturedMovie.jsx      destaque sorteado entre os "Originais da Netflix"
    MovieRowList.jsx       renderiza uma MovieRow por seção
    MovieRow.jsx           carrossel horizontal de pôsteres
    Feedback.jsx           telas de carregamento e de erro
    Footer.jsx             rodapé com o crédito da TMDB
  App.jsx                  só compõe a página
  main.jsx                 ponto de entrada (createRoot)
```

## Como os dados são carregados

`getHomeList()` busca as oito seções da home em paralelo (`Promise.all`). O destaque é
sorteado entre os resultados de "Originais da Netflix" e os detalhes completos vêm de
`/tv/{id}`. Todas as chamadas usam `language=pt-BR`.
