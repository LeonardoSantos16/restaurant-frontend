# Design: setup-project

## 1. Stack base

- **Build**: Vite + plugin `@vitejs/plugin-react`
- **Linguagem**: TypeScript (`strict: true`)
- **Package manager**: pnpm (`packageManager` field no `package.json` fixando
  versão)
- **Node**: 24.18.0 LTS — fixar via `.nvmrc` e `engines.node` no `package.json`

## 2. Estrutura de pastas (por tipo + path alias)

```
src/
├── assets/             # imagens, ícones, fontes locais
├── components/         # componentes reutilizáveis de UI
│   └── ui/             # primitivos (Button, Input, etc.)
├── pages/              # um arquivo por rota (Home, Menu, Cart, Reservation, About)
├── hooks/              # hooks customizados
├── services/           # camada de acesso a dados (ex: menuService.ts)
├── mocks/              # handlers e setup do MSW
├── context/            # providers de Context API
├── lib/                # utilitários puros (formatadores, helpers)
├── types/              # tipos/interfaces compartilhados
├── routes/             # definição de rotas do React Router
└── styles/             # globals.css, tokens do design system
tests/                  # pasta dedicada de testes (ver seção 6)
```

Path alias no `tsconfig.json` e `vite.config.ts`:

```ts
// tsconfig.json (trecho)
"paths": { "@/*": ["./src/*"] }
```

```ts
// vite.config.ts (trecho)
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

## 3. Roteamento — React Router v7 (modo SPA/library)

Rotas iniciais:

| Path        | Página      |
| ----------- | ----------- |
| `/`         | Home        |
| `/cardapio` | Menu        |
| `/carrinho` | Cart        |
| `/reservas` | Reservation |
| `/sobre`    | About       |

Definidas em `src/routes/index.tsx` via `createBrowserRouter`, com um `Layout`
compartilhado (header/nav + outlet) envolvendo todas as rotas.

## 4. Camada de dados mockados — MSW + Service Layer

Fluxo: `Componente → hook (TanStack Query) → service (services/menuService.ts) →
fetch('/api/...') → MSW intercepta → handler retorna mock`.

```
src/mocks/
├── handlers/
│   └── menu.ts        # define GET /api/menu, etc.
├── data/
│   └── menu.json       # dados mockados em si
├── browser.ts          # setupWorker, usado em dev
└── server.ts           # setupServer, usado nos testes (Vitest)
```

`services/menuService.ts` expõe funções (`getMenu()`, `getMenuItem(id)`) que fazem
`fetch` para `/api/menu`. Quando a API .NET existir, só se troca a base URL (via env
var, fora de escopo agora) — nenhum componente muda.

## 5. Data-fetching e estado

- **TanStack Query**: um hook por recurso (ex: `useMenu()` em `hooks/useMenu.ts`),
  encapsulando `useQuery` + chamada ao service. `QueryClientProvider` configurado
  na raiz (`main.tsx`).
- **Context API**: `CartContext` em `context/CartContext.tsx` para estado do
  carrinho (itens, quantidade, total). Reservado para estado realmente global e
  pequeno — não usar Context para cache de dados de servidor (isso é papel do
  TanStack Query).

## 6. Qualidade de código

- **ESLint**: base `eslint-config-react-app`-like via `@eslint/js` + plugins
  `eslint-plugin-react`, `eslint-plugin-react-hooks`, `@typescript-eslint`,
  `eslint-plugin-jsx-a11y` (regras básicas ligadas, sem teste automatizado — só
  lint estático, conforme decidido).
- **Prettier**: config padrão (semi: true, singleQuote: true, trailingComma: 'all'),
  integrado ao ESLint via `eslint-config-prettier` (evita conflito de regras).
- **Husky + lint-staged**: hook `pre-commit` rodando `lint-staged` (ESLint --fix +
  Prettier nos arquivos staged) e `vitest related --run` nos arquivos afetados.
- **commitlint**: hook `commit-msg` validando Conventional Commits
  (`feat:`, `fix:`, `chore:`, `test:`, `docs:`, etc.).

## 7. Testes — Vitest + React Testing Library

Pasta dedicada (não co-localizado):

```
tests/
├── setup.ts             # jest-dom matchers, MSW server.listen/close
├── components/
│   └── MenuItem.test.tsx
├── hooks/
│   └── useMenu.test.ts
└── pages/
    └── Cart.test.tsx
```

Critério: **componente crítico tem teste** — definição de "crítico" para este
projeto: qualquer componente que (a) lida com dinheiro/quantidade (carrinho), (b)
envia dados (formulário de reserva), ou (c) controla navegação condicional. Não é
exigida cobertura de componentes puramente visuais/estáticos.

`vitest.config.ts` configura `environment: 'jsdom'`, `setupFiles:
['tests/setup.ts']`, e alias `@/` espelhando o Vite.

## 8. CI — GitHub Actions

`.github/workflows/ci.yml`, gatilho em `pull_request`:

```yaml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: '24.18.0', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test -- --run
```

## 9. Deploy — Vercel

- `vercel.json` com rewrite de SPA fallback (`"/(.*)" → "/index.html"`), necessário
  porque React Router v7 em modo SPA depende de roteamento client-side.
- Build command padrão (`pnpm build`), output `dist/`.
- Preview deployments automáticos por PR (comportamento padrão da Vercel, sem
  configuração extra).

## 10. i18n / a11y

- Conteúdo só em `pt-BR` — `<html lang="pt-BR">`, sem biblioteca de i18n por
  enquanto.
- `eslint-plugin-jsx-a11y` ativo no lint (pega erros óbvios estaticamente), mas sem
  `vitest-axe` ou checagem em runtime nos testes — decisão consciente de adiar.
