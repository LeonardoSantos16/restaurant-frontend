# Tasks: setup-project

## 1. Scaffold

- [ ] 1.1 `pnpm create vite@latest . -- --template react-ts`
- [ ] 1.2 Fixar Node 24.18.0 em `.nvmrc` e `engines.node`
- [ ] 1.3 Fixar `packageManager` (pnpm) no `package.json`

## 2. Estrutura e alias

- [ ] 2.1 Criar pastas: `assets/ components/ui/ pages/ hooks/ services/ mocks/
    context/ lib/ types/ routes/ styles/` e `tests/` na raiz
- [ ] 2.2 Configurar alias `@/` em `tsconfig.json` e `vite.config.ts`

## 3. Roteamento

- [ ] 3.1 Instalar `react-router` (v7, modo library)
- [ ] 3.2 Criar `routes/index.tsx` com as 5 rotas + Layout compartilhado
- [ ] 3.3 Criar componentes de página placeholder (Home, Menu, Cart, Reservation,
      About) só com `<h1>` por enquanto

## 4. MSW + Service Layer

- [ ] 4.1 Instalar `msw`, rodar `npx msw init public/ --save`
- [ ] 4.2 Criar `mocks/data/menu.json` com itens de exemplo
- [ ] 4.3 Criar `mocks/handlers/menu.ts` (GET /api/menu)
- [ ] 4.4 Criar `mocks/browser.ts` (dev) e `mocks/server.ts` (testes)
- [ ] 4.5 Ativar o worker do MSW em `main.tsx` apenas em modo dev
- [ ] 4.6 Criar `services/menuService.ts` com `getMenu()`

## 5. TanStack Query + Context

- [ ] 5.1 Instalar `@tanstack/react-query`
- [ ] 5.2 Configurar `QueryClientProvider` em `main.tsx`
- [ ] 5.3 Criar `hooks/useMenu.ts` usando `useQuery` + `menuService`
- [ ] 5.4 Criar `context/CartContext.tsx` (items, add, remove, total) + provider

## 6. Qualidade de código

- [ ] 6.1 Configurar ESLint (`@typescript-eslint`, `eslint-plugin-react-hooks`,
      `eslint-plugin-jsx-a11y`) + Prettier + `eslint-config-prettier`
- [ ] 6.2 Instalar e configurar Husky (`pnpm dlx husky init`)
- [ ] 6.3 Configurar `lint-staged` (ESLint --fix + Prettier nos staged)
- [ ] 6.4 Instalar e configurar `commitlint` (Conventional Commits) no hook
      `commit-msg`

## 7. Testes

- [ ] 7.1 Instalar `vitest`, `@testing-library/react`, `@testing-library/jest-dom`,
      `jsdom`
- [ ] 7.2 Criar `vitest.config.ts` (environment jsdom, alias, setupFiles)
- [ ] 7.3 Criar `tests/setup.ts` (jest-dom + MSW server lifecycle)
- [ ] 7.4 Escrever primeiro teste de exemplo (`tests/hooks/useMenu.test.ts`)
      validando que o mock do MSW responde corretamente

## 8. CI

- [ ] 8.1 Criar `.github/workflows/ci.yml` rodando install, lint e test em PR

## 9. Deploy

- [ ] 9.1 Criar `vercel.json` com rewrite de SPA fallback
- [ ] 9.2 Conectar repositório ao projeto na Vercel (ação manual fora do código)

## 10. Validação final

- [ ] 10.1 `pnpm dev` sobe sem erro, as 5 rotas navegam entre si
- [ ] 10.2 `pnpm lint` e `pnpm test` passam limpos
- [ ] 10.3 Commit de teste é bloqueado se mensagem não seguir Conventional Commits
