# Proposal: setup-project

## Why

Antes de implementar qualquer página, o projeto precisa de uma fundação consistente:
ferramentas, estrutura de pastas, camada de dados mockados (preparada para troca
futura pela API C#/.NET), qualidade de código e CI. Sem isso definido, cada change
subsequente reinventa convenções diferentes.

## What Changes

- **ADDED**: Projeto Vite + React + TypeScript, gerenciado com pnpm, Node 24 LTS.
- **ADDED**: Estrutura de pastas por tipo, com path alias `@/`.
- **ADDED**: Roteamento com React Router v7 (modo SPA) e as 5 rotas iniciais.
- **ADDED**: Camada de mock de API via MSW + camada de serviço (`services/`),
  preparada para apontar para a futura API .NET sem alterar componentes.
- **ADDED**: TanStack Query para data-fetching/cache; Context API para estado
  global simples (ex: carrinho).
- **ADDED**: ESLint + Prettier, Husky + lint-staged, commitlint (Conventional
  Commits).
- **ADDED**: Vitest + React Testing Library, pasta dedicada de testes.
- **ADDED**: CI no GitHub Actions rodando lint + test em cada PR.
- **ADDED**: Configuração de build compatível com deploy na Vercel.

## Out of Scope

- Variáveis de ambiente reais de API (adicionadas quando a API .NET existir).
- Conteúdo/UI das páginas — vem em changes separados, consumindo esta fundação e
  o `define-design-system`.
- Checagem automática de acessibilidade nos testes (decisão consciente de adiar).
