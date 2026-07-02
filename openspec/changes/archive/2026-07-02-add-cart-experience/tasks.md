# Tasks: add-cart-experience

## 1. Extensão do `CartContext`

- [x] 1.1 `context/CartContext.tsx`: adicionar `updateQuantity(id, quantity)`
      (valor absoluto; `quantity <= 0` remove o item) e `removeItem(id)`
      (remove o item inteiro)
- [x] 1.2 Adicionar `clear()` (esvazia `items`)
- [x] 1.3 Memoizar `total` e adicionar `itemCount` (soma de `quantity`), ambos
      via `useMemo(() => ..., [items])`
- [x] 1.4 Remover `remove(id)` (decrementava 1 por chamada) — confirmar via
      busca que não há call sites fora do próprio contexto/testes antes de
      apagar

## 2. `CartDrawerContext` e hook de foco

- [x] 2.1 Criar `context/CartDrawerContext.tsx`: `{ isOpen, open, close, notifyAdd }`;
      `notifyAdd()` abre o painel e reinicia um único temporizador de
      auto-close (`ref` de `setTimeout`, limpo e recriado a cada chamada)
- [x] 2.2 `CartDrawerProvider` fecha o painel em troca de rota (`useLocation`)
- [x] 2.3 Criar `hooks/useFocusTrap.ts`: prende Tab/Shift+Tab dentro de um
      container enquanto ativo, foca o elemento indicado ao ativar, restaura
      foco ao elemento de origem ao desativar

## 3. Componente `CartDrawer` e `CartItemRow` compartilhado

- [x] 3.1 Criar `components/CartItemRow.tsx`: nome (`Link` para
      `/cardapio/{id}`), descrição curta, dot-leader, `QuantitySelector`
      (`min=1`, `onChange` → `updateQuantity`), preço de linha (mono/brass),
      botão remover (`IconTrash`, stone→brass no hover, chama `removeItem`)
- [x] 3.2 Criar `components/CartDrawer.tsx`: portal para `document.body`,
      `role="dialog"` `aria-modal` `aria-labelledby`, backdrop
      (`bg-basalt/60`, fecha ao clicar), painel `fixed inset-y-0 right-0`
      (`bg-basalt`, `border-l border-stone/20`, sem sombra), título "Carrinho",
      lista via `CartItemRow`, resumo de total, link "Ver carrinho completo"
      → `/carrinho` (fecha o painel ao navegar)
- [x] 3.3 Integrar `useFocusTrap` no `CartDrawer`: foco no botão fechar ao
      abrir, Esc fecha, foco retorna à origem ao fechar
- [x] 3.4 Adicionar keyframes `drawer-in`/`drawer-in-reduced` em
      `styles/globals.css` e aplicar a classe `animate-drawer-in` ao painel

## 4. Integração nos pontos de adição ao carrinho

- [x] 4.1 `components/AddToCartButton.tsx`: chamar `drawer.notifyAdd()` após
      `cart.add(item)`
- [x] 4.2 `pages/MenuItemDetail.tsx`: chamar `drawer.notifyAdd()` após
      `cart.add(item, quantity)` no handler do CTA "Adicionar ao carrinho"
- [x] 4.3 Criar região `aria-live="polite"` (`sr-only`) montada uma vez no
      `Layout`, atualizada com "{nome do prato} adicionado ao carrinho." a
      cada `add()`

## 5. Montagem na árvore de componentes

- [x] 5.1 `routes/index.tsx`: renderizar `<CartDrawer />` dentro de `Layout()`,
      como irmão de `<Sidebar />`/`<main>`, fora do `<Outlet/>`
- [x] 5.2 **Correção de implementação:** `CartDrawerContext` usa `useLocation()`
      para fechar o painel em troca de rota, então `CartDrawerProvider` precisa
      estar _dentro_ da árvore do router, não em `main.tsx` envolvendo o
      `RouterProvider` (fora do contexto do Router, `useLocation()` lançaria
      erro). `CartDrawerProvider` passa a envolver o próprio `Layout()` em
      `routes/index.tsx`; `main.tsx` não muda.

## 6. Página `/carrinho`

- [x] 6.1 Reescrever `pages/Cart.tsx`: container `max-w-3xl`, header (`h1` +
      subtítulo `stone`), sem `Spotlight`
- [x] 6.2 Lista de itens via `CartItemRow`, resumo com `formatPrice(total)`
      em mono/brass
- [x] 6.3 CTA primário "Reservar uma mesa" (`Link` estilo botão brass) para
      `/reservas`
- [x] 6.4 Ação secundária "Esvaziar carrinho" (`clear()`), separada do CTA
      primário
- [x] 6.5 Estado vazio: mensagem + `Link` brass-underline "Ver cardápio" para
      `/cardapio`
- [x] 6.6 `print:hidden` nos controles interativos (seletor, remover,
      esvaziar, CTA)

## 7. Badge de contagem na `Sidebar`

- [x] 7.1 `components/Sidebar.tsx`: consumir `useCart()`, exibir `itemCount`
      sobreposto ao ícone "Carrinho" (`font-mono text-brass`, `aria-hidden`)
      só quando `itemCount > 0`
- [x] 7.2 `aria-label` dinâmico no `NavLink` ("Carrinho, N itens" / "Carrinho")
- [x] 7.3 Confirmar que `position: relative` no container do ícone não quebra
      a transição de largura no hover existente

## 8. Testes

- [x] 8.1 `context/CartContext.test.tsx` (novo): `add` soma quantidade;
      `updateQuantity` seta valor absoluto e remove em `<= 0`; `removeItem`
      remove o item inteiro; `clear` esvazia; `total` recalcula após mudança
      de quantidade; `itemCount` soma quantidades
- [x] 8.2 `pages/Cart.test.tsx` (novo): estado vazio; lista renderiza itens;
      alterar quantidade atualiza o total exibido; remover/esvaziar; CTA
      aponta para `/reservas`
- [x] 8.3 `components/CartDrawer.test.tsx` (novo): fechado por padrão; abre
      via `notifyAdd`; Esc e clique no backdrop fecham; foco vai ao botão
      fechar ao abrir e retorna à origem ao fechar; link "Ver carrinho
      completo" navega e fecha o painel
- [x] 8.4 `components/Sidebar.test.tsx` (novo): badge ausente/presente
      conforme `itemCount`; `aria-label` dinâmico
- [x] 8.5 Ajustados `components/MenuItemRow.test.tsx` e
      `pages/MenuItemDetail.test.tsx` para envolver com `CartDrawerProvider`
      (necessário porque `AddToCartButton`/`MenuItemDetail` agora chamam
      `useCartDrawer()`) — nenhum call site de `remove(id)` fora do próprio
      contexto foi encontrado

## 9. Validação final

- [x] 9.1 `npm test`, lint e typecheck passam
