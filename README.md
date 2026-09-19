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

## Estrutura

```
src/
  api/tmdb.js              busca as seções da home e os detalhes de um título
  components/
    Header.jsx             barra superior que fica preta ao rolar
    FeaturedMovie.jsx      destaque sorteado entre os "Originais da Netflix"
    MovieRow.jsx           carrossel horizontal de pôsteres
  App.jsx                  composição da página e carregamento dos dados
  main.jsx                 ponto de entrada (createRoot)
```

## Como os dados são carregados

`getHomeList()` busca as oito seções da home em paralelo (`Promise.all`). O destaque é
sorteado entre os resultados de "Originais da Netflix" e os detalhes completos vêm de
`/tv/{id}`. Todas as chamadas usam `language=pt-BR`.
