# Com Arte — Frontend

Interface web do projeto Com Arte, construída com [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) e [Vite](https://vite.dev/).

## Pré-requisitos

- Node.js 20+

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

| Variável         | Descrição                                                              | Exemplo                        |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------ |
| `VITE_API_URL`   | URL base da API do backend                                             | `http://localhost:1337/api`    |
| `VITE_API_TOKEN` | Token de API gerado no painel admin do Strapi (read-only já basta)     | `7dd...`                  |

Para acessar token e copiar: acesse `http://localhost:1337/admin` → **Settings** → **API Tokens** → **Read only** → **View Token**.

## Para rodar

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Comandos

| Comando                | O que faz                                      |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento           |
| `npm run build`        | Compila para produção (TypeScript + Vite)      |
| `npm run preview`      | Serve o build de produção localmente           |
| `npm run lint`         | Verifica erros de lint (ESLint)                |
| `npm run lint:fix`     | Corrige automaticamente erros de lint          |
| `npm run format`       | Verifica formatação (Prettier)                 |
| `npm run format:fix`   | Formata o código                               |
| `npm test`             | Roda a suíte de testes (Vitest)                |
| `npm run test:ui`      | Abre a interface visual do Vitest              |
| `npm run test:coverage`| Gera relatório de cobertura                    |

## Integração com o backend

Todas as chamadas à API passam por `src/api/http.ts`, que injeta automaticamente `VITE_API_URL` e `VITE_API_TOKEN` em cada requisição.

Os dados são buscados e cacheados com [TanStack Query](https://tanstack.com/query). As queries ficam em `src/queries/` e as funções de fetch em `src/api/`.

## Estrutura do projeto

```
src/
├── api/          # Funções de fetch (http.ts, books.ts, authors.ts, ...)
├── components/   # Componentes reutilizáveis
├── db/           # Dados locais de fallback (books.json)
├── pages/        # Páginas da aplicação (roteadas pelo React Router)
└── queries/      # Hooks TanStack Query (queryClient.ts, queryKeys.ts, ...)
```
