# Proposal: add-dish-detail

## Why

A rota `/cardapio/:id` (`pages/MenuItemDetail.tsx`) é hoje um stub
(`<h1>Detalhe do prato</h1>`), mas já é o destino de todos os links de prato do
app: as linhas do cardápio (`MenuItemRow`), o item em destaque
(`FeaturedMenuItem`) e os cards "Mais pedidos" da Home (`PopularDishCard`) todos
apontam para `/cardapio/{id}`. Toda a infraestrutura de dados também já existe
(`useMenuItem`, `getMenuItem`, handler MSW `GET /api/menu/:id` com 404). Falta a
tela em si.

Esta proposta constrói a página de detalhe como uma **peça editorial focada num
único prato** — hero circular (o elemento-assinatura do `DESIGN.md`), nome,
preço, metadados e descrição — com uma ação de compra de primeira classe (CTA +
quantidade) e uma seção "Outros de {categoria}" que dá profundidade e mantém o
usuário navegando pelo cardápio, tudo sem inventar dados além do modelo atual.

## What Changes

- **ADDED**: Página de detalhe do prato (`/cardapio/:id`) com hero `Spotlight`
  (280px), eyebrow de categoria linkado, nome (`display-lg`), preço (mono/brass),
  metadados (selo "mais pedido" + tags) e descrição.
- **ADDED**: Ação de compra — seletor de quantidade (`QuantitySelector`) + CTA
  proeminente "Adicionar ao carrinho" (`brass`), adicionando a quantidade
  escolhida ao carrinho.
- **ADDED**: Seção "Outros de {categoria}" com até 3 pratos da mesma categoria
  (exceto o atual), reusando `MenuItemRow`.
- **ADDED**: Estado "esgotado" na página de detalhe (`available === false`):
  rótulo em `wine`, sem seletor/CTA — o prato continua visível, só a compra fica
  indisponível.
- **ADDED**: Estados de carregando e "prato não encontrado" (404) com link de
  volta ao cardápio, na voz da própria interface.
- **MODIFIED**: `CartContext.add` passa a aceitar uma quantidade opcional
  (`add(item, quantity = 1)`), retrocompatível com as chamadas atuais.

## Out of Scope

- Impressão da página de detalhe — a impressão continua exclusiva do cardápio
  completo (`/cardapio`).
- Conteúdo além do modelo atual (ingredientes, informação nutricional, tempo de
  preparo) — não há esses dados no mock.
- Persistência do carrinho — o `CartContext` segue em memória.
- Página `/carrinho` — continua stub; esta proposta só alimenta o carrinho.
- Adaptação mobile completa (mesma nota das propostas anteriores: desktop é o
  alvo principal).
