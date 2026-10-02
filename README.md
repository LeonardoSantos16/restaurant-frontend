# Âmbar — Site de Restaurante

Front-end de um site para um restaurante fictício de alta gastronomia
(fine dining contemporâneo), desenvolvido como projeto pessoal com foco em
processo: planejamento estruturado antes da implementação, design system
autoral definido desde o início, e um fluxo de desenvolvimento assistido por
IA guiado por especificação (Spec-Driven Development), não por "vibe coding".

> **Demo:** _link da Vercel aqui_ · Instruções de execução local abaixo.

## Sobre o processo

Diferente de simplesmente pedir para uma IA "criar um site de restaurante",
este projeto foi conduzido em etapas deliberadas:

1. **Definição do design system antes de qualquer código** — paleta,
   tipografia, princípios de layout e um elemento visual de assinatura
   próprio foram documentados e validados visualmente antes da implementação,
   evitando o padrão visual genérico comum em interfaces geradas por IA
   (fundo creme + serifa + terracota, ou dark mode + verde-ácido).
2. **Especificação formal de cada funcionalidade (SDD com OpenSpec)** — cada
   página/feature nasceu como uma _change_ documentada (`proposal.md`,
   `design.md`, `tasks.md` e spec delta em formato EARS) antes de qualquer
   linha de código, revisada manualmente antes da implementação.
3. **Implementação assistida via Claude Code**, seguindo as specs à risca,
   com refinamento visual pontual via [Impeccable](https://github.com/pbakaus/impeccable)
   (skill de polish/motion) em páginas selecionadas.

O histórico completo de propostas e specs está versionado em `openspec/`.

## Stack

- **React 19 + TypeScript**
- **Vite** — build e dev server
- **Tailwind CSS** — estilização, com tokens de design customizados
- **React Router v7** — roteamento (modo SPA)
- **TanStack Query** — cache e data-fetching
- **Context API** — estado global do carrinho
- **MSW (Mock Service Worker)** — mock de API na camada de rede, preparado
  para troca futura por uma API real em C#/.NET sem alterar componentes
- **Vitest + React Testing Library** — testes de componentes críticos
- **ESLint + Prettier + Husky + lint-staged + commitlint** — qualidade de
  código e Conventional Commits
- **GitHub Actions** — CI rodando lint e testes em cada PR
- **npm**, Node 24 LTS (versão fixada em `.nvmrc`)

## Design System

Identidade visual autoral, documentada em [`DESIGN.md`](./DESIGN.md) e
[`PRODUCT.md`](./PRODUCT.md):

| Token              | Uso                              |
| ------------------ | -------------------------------- |
| `basalt` `#15140F` | fundo principal                  |
| `ivory` `#F1ECDD`  | texto principal                  |
| `brass` `#C49A4A`  | accent único (CTAs, preços)      |
| `wine` `#5B2430`   | accent raro (destaques pontuais) |
| `stone` `#8A8577`  | texto secundário, divisores      |

- **Tipografia**: Fraunces (display) + Work Sans (corpo) + IBM Plex Mono
  (preços e números)
- **Layout**: princípio editorial — sem cards com sombra, separação por
  espaço negativo e divisores finos, inspirado em menus impressos
- **Elemento-assinatura**: fotos de prato em recorte circular com vinheta,
  uso restrito a hero e itens em destaque — evita repetição decorativa
- Contraste de texto validado em nível AAA (ivory sobre basalt ≈ 14.8:1)

## Estrutura do projeto

```
src/
├── assets/
├── components/       # componentes reutilizáveis
│   └── ui/            # primitivos
├── pages/             # uma página por rota
├── hooks/             # hooks customizados (ex: useMenu, useMenuSearch)
├── services/          # camada de acesso a dados (abstrai a origem do dado)
├── mocks/             # handlers e dados do MSW
├── context/            # providers de Context API (ex: CartContext)
├── lib/
├── types/
├── routes/
└── styles/
tests/                 # testes, organizados por tipo (não co-localizados)
openspec/
├── specs/              # specs "vivas", fundidas após cada change
└── changes/             # histórico de propostas (arquivadas)
```

A organização por tipo (em vez de por feature) e o path alias `@/` foram
decisões deliberadas, registradas na spec `setup-project`.

## Páginas

| Rota            | Página           | Destaques de implementação                                                                                                                          |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`             | Home             | Sidebar retrátil (expande no hover), busca em tempo real, prato em destaque com spotlight circular, categorias mais buscadas, cards de mais pedidos |
| `/cardapio`     | Cardápio         | Listagem com filtro por categoria                                                                                                                   |
| `/cardapio/:id` | Detalhe do prato | Página individual de cada prato, com adição ao carrinho                                                                                             |
| `/carrinho`     | Carrinho         | Gerenciamento de itens via Context API                                                                                                              |
| `/reservas`     | Reservas         | Formulário de reserva                                                                                                                               |
| `/sobre`        | Sobre            | Conteúdo institucional                                                                                                                              |

## Camada de dados mockados

Todo dado passa por `services/` → nunca há chamada `fetch` direta em
componentes. O MSW intercepta as chamadas HTTP como se fossem para uma API
real, replicando o formato de resposta esperado da futura API em .NET —
quando ela existir, apenas a URL base muda, sem alteração em componentes ou
hooks.

Como ainda não há API real, o MSW também roda no build de produção
(`VITE_USE_MOCKS=true` em `.env.production`), para que a demo publicada
funcione com os mesmos dados. Basta trocar a flag para `false` quando a API
estiver no ar.

## Testes

Cobertura focada em componentes críticos — que lidam com valores monetários,
envio de dados ou navegação condicional (ex: cálculo de total no carrinho,
submissão do formulário de reservas) — não cobertura ampla por padrão.

## Rodando localmente

```bash
npm install --legacy-peer-deps
npm run dev
```

```bash
npm run lint      # ESLint
npm test          # Vitest (modo watch)
npm run test:run  # Vitest (execução única, como no CI)
```

## Processo de design assistido por IA

Este projeto foi construído com apoio de Claude Code, mas com um fluxo
deliberadamente afastado de "vibe coding":

- Nenhuma feature foi implementada sem uma spec revisada previamente
- O design system foi definido e validado visualmente (protótipos) antes de
  qualquer componente ser codado
- Regras explícitas (ex: "brass em no máximo 1-2 elementos por tela", "sem
  cards com sombra") foram documentadas para restringir decisões visuais da
  IA e evitar o padrão genérico de interfaces geradas por IA
- Foi definido previamente a Stack e estrutura do projeto

## Próximos passos

- [x] Deploy na Vercel
- [ ] Integração com API real em C#/.NET
- [ ] Ampliar uso do Impeccable para as páginas restantes
