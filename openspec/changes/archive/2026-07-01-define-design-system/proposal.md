# Proposal: define-design-system

## Why

O projeto ainda não tem uma fonte única de verdade para cor, tipografia, espaçamento
e tratamento visual. Sem isso, cada página/feature implementada pelo Claude Code vai
"inventar" estilo próprio, gerando inconsistência e puxando para o padrão genérico de
UI gerada por IA (fundo creme + serifa + terracota, ou dark + verde-ácido).

Esta proposta define o design system do site do restaurante — paleta, tipografia,
princípios de layout e o elemento-assinatura — para ser referenciado por todas as
specs de página que vierem depois (home, cardápio, reservas, etc.). Nenhuma página é
implementada aqui; apenas os tokens e a infraestrutura de estilo.

## What Changes

- **ADDED**: Paleta de cores nomeada (5 tokens) com mapeamento para Tailwind.
- **ADDED**: Sistema tipográfico (display, corpo, mono) com escala de tamanhos e pesos.
- **ADDED**: Princípios de layout editorial (sem cards com sombra, divisores finos,
  espaçamento generoso).
- **ADDED**: Especificação do elemento-assinatura — foto de prato em recorte circular
  com vinheta, usado em hero e itens em destaque.
- **ADDED**: Diretrizes de motion (mínimo, respeitando `prefers-reduced-motion`) e de
  acessibilidade (contraste, foco visível).
- **ADDED**: Configuração de `tailwind.config` e camada CSS base com os tokens acima.

## Out of Scope

- Implementação de páginas (Home, Cardápio, Reservas) — viram changes separados que
  consomem este design system.
- Componentes de UI específicos (cards de prato, formulário de reserva) além do
  elemento-assinatura de spotlight circular.
- Conteúdo/copy real do restaurante.

## Direção de marca (contexto para quem implementar)

Contemporâneo / fine dining minimalista. Fundo escuro contido (não preto puro),
um único accent quente (latão), tipografia serifada "soft" para personalidade e
sans-serif neutra para legibilidade. Layout editorial, não SaaS-card. O momento de
destaque visual é a foto do prato — não caixas, sombras ou ícones decorativos.
