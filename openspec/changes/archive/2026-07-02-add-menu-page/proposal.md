# Proposal: add-menu-page

## Why

A rota `/cardapio` (`pages/Menu.tsx`) é hoje um stub (`<h1>Cardápio</h1>`). Toda a
linguagem visual já existe nos componentes e foi validada na Home, mas nunca
chegou à página do cardápio — que é o destino do CTA do prato em destaque, dos
links de categoria (`/cardapio?categoria={slug}`) e dos cards de "Mais pedidos".
Esta proposta constrói a tela principal do cardápio como uma **lista editorial
agrupada por categoria** (fiel ao `DESIGN.md`: dot-leaders, divisórias, sem
cards), enriquecida com features que dão profundidade real ao menu sem quebrar a
disciplina do design system.

## What Changes

- **ADDED**: Página de cardápio (`/cardapio`) com título editorial e a lista de
  pratos agrupada por categoria, no padrão dot-leader (nome … preço), sem cards.
- **ADDED**: Filtro por categoria via query param `?categoria={slug}` (o contrato
  que o `CategoryGrid` da Home já usa), com chips no topo e chip "Tudo".
- **ADDED**: Estado "Esgotado" de item (token `wine`, item esmaecido e não
  clicável) e selo "mais pedido" derivado de `popularity` (metadado em `stone`).
- **ADDED**: Tags de dieta/alergênicos por prato (vegetariano, vegano, sem glúten,
  picante) como metadado em `stone`.
- **ADDED**: Ação de adicionar ao carrinho inline em cada linha (usa o
  `CartContext` já existente).
- **ADDED**: Cardápio para imprimir (`window.print()` + estilo `@media print`
  tinta-sobre-papel que reforça a tese de "menu impresso").
- **MODIFIED**: `MenuItem` ganha os campos opcionais `tags` e `available`.
- **MODIFIED**: Refactors de consistência — Home reusa o novo `MenuItemRow`;
  `CategoryGrid` e a página derivam categorias/slugs de uma fonte única.

## Out of Scope

- Página de detalhe do prato (`/cardapio/:id`) e página `/categorias` — cada uma
  é um change separado (permanecem como stubs).
- Busca dentro do cardápio (decisão: a busca continua exclusiva da Home).
- Persistência do carrinho (o `CartContext` atual é em memória; persistência é
  change futura).
- Backend real de disponibilidade/estoque — `available` é apenas um campo mockado
  para exercitar o estado "Esgotado".
- Adaptação mobile completa (mesma nota de `add-home-page`: desktop é o alvo
  principal desta proposta).
