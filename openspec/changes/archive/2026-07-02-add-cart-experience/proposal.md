# Proposal: add-cart-experience

## Why

A rota `/carrinho` (`pages/Cart.tsx`) é hoje um stub (`<h1>Carrinho</h1>`), sem
lista, sem estado, sem teste — diferente de toda outra página do site. O
`CartContext` já existe e já é global (montado em `main.tsx` acima do
`RouterProvider`), e o `AddToCartButton` já é usado em três pontos
(`MenuItemRow`, `FeaturedMenuItem`, `MenuItemDetail`), mas o contexto só
oferece `add`/`remove` (decrementa 1 por chamada) e `total` — não há como
editar a quantidade de um item diretamente, remover um item inteiro, ou
esvaziar o carrinho. Além disso, adicionar um item em qualquer uma dessas
páginas não dá nenhum retorno visual: o usuário só descobre se funcionou
navegando manualmente até `/carrinho`.

Esta proposta constrói a página de carrinho como uma lista editorial (mesmo
padrão dot-leader do cardápio) e introduz um painel de carrinho (`CartDrawer`)
que abre automaticamente ao adicionar um item em qualquer página, permitindo
revisar e ajustar quantidade ou remover sem sair do fluxo atual — sem inventar
um conceito de "checkout" que não existe no domínio (a única ação de
conversão do site é reservar uma mesa).

## What Changes

- **ADDED**: Página `/carrinho` completa: lista de itens (`CartItemRow`) com
  nome, descrição curta, seletor de quantidade, remoção individual e preço em
  mono/brass; resumo com total; CTA primário "Reservar uma mesa" para
  `/reservas`; ação secundária "Esvaziar carrinho"; estado vazio com link para
  `/cardapio`.
- **ADDED**: Painel de carrinho (`CartDrawer`) que abre automaticamente
  quando um item é adicionado em qualquer página, mostrando a mesma lista de
  itens (via `CartItemRow` compartilhado) e um link "Ver carrinho completo".
  Fecha por temporizador (~4-5s), tecla Esc, clique no backdrop, botão fechar,
  ou troca de rota.
- **ADDED**: Indicador de contagem de itens (`itemCount`) sobreposto ao ícone
  "Carrinho" na `Sidebar`, com `aria-label` dinâmico.
- **ADDED**: Região `aria-live="polite"` que anuncia a adição de um item para
  leitores de tela, independentemente do painel estar visível.
- **MODIFIED**: `CartContext` ganha `updateQuantity` (valor absoluto),
  `removeItem` (remove o item inteiro) e `clear` (esvazia o carrinho); `total`
  passa a incluir `itemCount` (soma de quantidades) e ambos passam a ser
  memoizados. A função `remove` (decrementava 1 por chamada) é removida em
  favor de `updateQuantity`/`removeItem`.
- **ADDED**: `CartDrawerContext`, um contexto de UI separado do `CartContext`
  (dados), controlando apenas abertura/fechamento do painel — mantém o
  `CartContext` testável isoladamente.

## Out of Scope

- Persistência do carrinho (localStorage) — mesma decisão já registrada em
  `add-dish-detail`; o `CartContext` segue em memória.
- Checkout, pedido ou pagamento — não existe esse conceito no domínio;
  `createReservation` não aceita itens de carrinho. O carrinho é uma lista de
  pratos pretendidos, não um fluxo de compra.
- Impressão do carrinho — não há caso de uso de "recibo impresso" no domínio;
  a impressão continua exclusiva do cardápio completo.
- Tratamento de item que se torna indisponível depois de já estar no
  carrinho — o mock atual não muda disponibilidade em tempo real.
- Adaptação mobile completa (mesma nota das propostas anteriores: desktop é o
  alvo principal; o `CartDrawer` registra apenas uma nota de comportamento em
  telas estreitas).
