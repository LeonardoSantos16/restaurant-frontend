# Design: add-cart-experience

## 1. `CartContext` (extensão)

Contrato atual (`context/CartContext.tsx`):

```ts
interface CartContextValue {
  items: CartItem[];
  add: (item: MenuItem, quantity?: number) => void;
  remove: (id: string) => void; // decrementa 1, remove ao chegar em 0
  total: number;
}
```

Novo contrato:

```ts
interface CartContextValue {
  items: CartItem[];
  add: (item: MenuItem, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void; // valor absoluto; quantity <= 0 remove o item
  removeItem: (id: string) => void; // remove o item inteiro, qualquer que seja a quantidade
  clear: () => void; // esvazia o carrinho
  total: number; // useMemo(() => Σ price*quantity, [items])
  itemCount: number; // useMemo(() => Σ quantity, [items])
}
```

`remove` é removida (nenhum call site fora do próprio contexto/testes) em
favor de `updateQuantity`/`removeItem` — mais honesto para a UI da página de
carrinho, onde "diminuir até sumir" seria uma remoção acidental fácil. O
estado de abertura do painel **não** entra neste contexto; fica isolado no
`CartDrawerContext` (seção 3), para que o `CartContext` continue sendo dado
puro e testável sem depender de nada de UI.

## 2. Página `/carrinho` (`pages/Cart.tsx`)

Mesmo container editorial das demais páginas (`mx-auto max-w-3xl space-y-12
px-6 py-12`), dentro do `Layout` compartilhado. De cima para baixo:

1. **Header** — `<h1 className="text-display-xl font-display">Carrinho</h1>`
   com subtítulo `body-md text-stone`. Sem `Spotlight`: o elemento-assinatura
   é reservado a hero com imagem de prato/ambiente, e o carrinho é uma lista
   de dados sem uma imagem "hero" natural — usá-lo aqui estouraria a regra de
   "no máx um item em destaque".
2. **Lista de itens** (`items.length > 0`) — novo componente
   `CartItemRow.tsx`, compartilhado entre a página e o `CartDrawer` (não
   duplicar lógica de quantidade/remoção em dois lugares):
   - Nome como `Link` para `/cardapio/{id}` (`body-md`, `stone` → `ivory` no
     hover, mesmo padrão do `MenuItemRow`).
   - Descrição curta (`item.description`, `body-sm text-stone`) — não inventa
     campo novo.
   - Dot-leader (`border-b border-dotted border-stone/40`) entre nome e
     preço, igual ao resto do site.
   - `<QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} min={1} />`
     — reuso 1:1 do componente existente.
   - Preço de linha (`price * quantity`, `formatPrice`, `font-mono
text-brass`).
   - Botão remover (`IconTrash`, `text-stone` → `brass` no hover/focus — não
     `wine`, que é reservado a estado negativo/"esgotado", e remover não é um
     erro), `aria-label="Remover {nome} do carrinho"`, chama
     `removeItem(item.id)`.
   - Divisor `border-t border-stone/20` entre linhas (mesmo token de
     `CategoryDivider`).
3. **Resumo** — linha "Total" + `formatPrice(total)` em `font-mono
text-brass`, abaixo da lista.
4. **Ação primária** — `Link` com a mesma classe de botão brass usada em
   `MenuItemDetail`/`Reservation` (`bg-brass text-basalt px-6 py-3`), texto
   "Reservar uma mesa", destino `/reservas`.
5. **Esvaziar carrinho** — ação secundária discreta (`body-sm text-stone
hover:text-brass`, sem ícone), chama `clear()`; posicionada separada do CTA
   primário para não competir visualmente.
6. **Estado vazio** (`items.length === 0`) — mensagem na voz medida da marca
   ("Nenhum prato selecionado ainda.") + `Link` brass-underline ("Ver
   cardápio") para `/cardapio`, mesmo padrão visual dos links de recuperação
   já usados em `Menu.tsx`/`MenuItemDetail.tsx`.
7. **Impressão** — não há botão "imprimir carrinho" (fora de escopo, ver
   proposal.md); os controles interativos (`QuantitySelector`, remover,
   esvaziar, CTA) recebem `print:hidden` por consistência defensiva com o
   resto do site.

Sem estado de "carregando": o `CartContext` já está em memória, populado por
navegação anterior — diferente de `Menu`/`MenuItemDetail`, que buscam dados
assíncronos.

## 3. Painel de carrinho (`CartDrawer`)

Nome escolhido para não colidir com o componente `Sidebar` (nav lateral
esquerda já existente).

### Alternativas avaliadas

**A. Toast/notificação compacta com link "ver carrinho".** Motion mínimo
(só fade), fácil `aria-live`, mas não permite revisar/ajustar sem navegar —
só confirma que o clique funcionou. Toasts empilhados também são o clichê
visual mais forte de "SaaS genérico"/e-commerce, que o `PRODUCT.md` rejeita
explicitamente.

**B. Badge de contagem na Sidebar + painel só ao clicar.** Zero motion não
solicitado, mas não dá o feedback imediato de "acabei de adicionar" pedido —
o usuário precisaria notar o número mudar e clicar manualmente.

**C. Drawer lateral direito, abre automaticamente ao adicionar item (escolhida).**
Painel desliza da borda direita, fundo `basalt` sólido (sem
blur/glassmorphism — fora do vocabulário do design system), separado do
conteúdo por 1px `border-stone/20` na borda esquerda do painel (não sombra —
"sem cards com sombra" é regra explícita do `DESIGN.md`). Abre por ~4-5s após
`add()`, permanece aberto se o usuário interage dentro dele, fecha por Esc,
clique no backdrop, botão fechar, ou troca de rota. Atende ao pedido de
revisão rápida (lista + quantidade + remover) sem recorrer a card-com-sombra
nem badge/pill colorido chamativo — é tratado como uma extensão da mesma
linguagem de "painel fixo lateral" que a `Sidebar` já estabelece, só que à
direita e temporário.

### Estrutura de componentes

- `context/CartDrawerContext.tsx` (novo) — `{ isOpen, open, close, notifyAdd }`.
  `notifyAdd()` abre o painel e (re)inicia o temporizador de auto-close com um
  único `setTimeout` guardado em `ref`, limpo e recriado a cada chamada (evita
  empilhar temporizadores em cliques rápidos).
- `components/CartDrawer.tsx` (novo) — portal (`createPortal` para
  `document.body`), `role="dialog"` `aria-modal="true"`
  `aria-labelledby="cart-drawer-title"`, largura fixa (~360-400px), `fixed
inset-y-0 right-0 z-20 bg-basalt`. Reaproveita `CartItemRow` (seção 2) e o
  resumo de total. Link secundário "Ver carrinho completo" → `/carrinho` em
  `text-stone hover:text-ivory` (não `brass`, para não competir com os preços
  dentro do painel).
- Backdrop — `<div className="fixed inset-0 z-10 bg-basalt/60" onClick={close} aria-hidden />`,
  renderizado só quando `isOpen`.
- `hooks/useFocusTrap.ts` (novo, sem dependência externa — não há
  Radix/headlessui no projeto) — prende Tab/Shift+Tab dentro do painel
  enquanto aberto, foca o botão de fechar ao abrir (não a lista, já que a
  abertura pode ser não intencional via auto-open), restaura foco ao elemento
  que originou a abertura ao fechar.
- Pontos de chamada (`AddToCartButton.tsx`, `MenuItemDetail.tsx`) passam a
  chamar `cart.add(item, qty)` **e** `drawer.notifyAdd()` em sequência — dois
  hooks, uma linha extra por call site, sem indireção.

### Onde entra na árvore

`routes/index.tsx`, dentro de `Layout()`, como irmão de `<Sidebar />`/`<main>`
(fora do `<Outlet/>`, para sobreviver a trocas de rota e ficar acima em
z-index; o fechamento ao navegar é tratado via `useLocation` dentro do
próprio provider):

```tsx
function Layout() {
  return (
    <CartDrawerProvider>
      <Sidebar />
      <main style={{ marginLeft: SIDEBAR_COLLAPSED_WIDTH }}>
        <Outlet />
      </main>
      <CartDrawer />
      <LiveRegion />
    </CartDrawerProvider>
  );
}
```

**Correção em relação ao plano inicial:** `CartDrawerProvider` precisa estar
_dentro_ da árvore do router, envolvendo o próprio `Layout()`, e não em
`main.tsx` envolvendo o `RouterProvider` — `CartDrawerContext` usa
`useLocation()` para fechar o painel em troca de rota, e esse hook só
funciona dentro do contexto de um `<Router>`. `main.tsx` não precisa de
nenhuma mudança; `CartProvider` continua na mesma posição, envolvendo o
`RouterProvider`.

## 4. Indicador de contagem na `Sidebar`

`components/Sidebar.tsx`, no item "Carrinho" (`IconShoppingBag`): número
sobreposto ao ícone, visível só quando `itemCount > 0`:

```tsx
<Icon size={22} stroke={1.5} className="shrink-0" aria-hidden />;
{
  itemCount > 0 && (
    <span
      aria-hidden
      className="absolute -translate-y-2 translate-x-3 text-body-sm font-mono text-brass"
    >
      {itemCount}
    </span>
  );
}
```

- Número em `font-mono text-brass` (é uma quantidade — mesma regra de "mono
  para números" do `DESIGN.md`), sem pill/círculo de fundo: introduzir um
  container colorido seria um sexto elemento visual que não existe no
  vocabulário atual; o próprio texto em brass já basta como acento.
- `aria-hidden` no número visual; o `NavLink` "Carrinho" ganha `aria-label`
  dinâmico (`"Carrinho, {itemCount} itens"` ou `"Carrinho"` quando vazio) para
  leitor de tela.
- Exige `useCart()` dentro da `Sidebar` (hoje só usa `useState` local de
  hover) e `position: relative` no container do ícone — checar que não quebra
  a transição de largura no hover já existente (`transition-[width]`).

## 5. Decisões de cor (restrição do DESIGN.md)

**Página `/carrinho`:** `brass` aparece no preço de cada linha, no total e no
CTA "Reservar uma mesa". Com várias linhas visíveis num mesmo viewport, isso
significa múltiplos usos simultâneos de `brass` — mesmo padrão já aceito em
`Menu.tsx` e no `design.md` de `add-dish-detail`, que trata "preço" como uma
categoria à parte do limite de "1-2 acentos de destaque por viewport" (que se
refere a elementos de ênfase/CTA, não a cada instância recorrente de preço).
`wine` não é usado no fluxo normal do carrinho — não há estado "esgotado"
aqui por padrão (ver Out of Scope).

**`CartDrawer`:** `brass` no preço de cada linha e no total; o link "Ver
carrinho completo" fica em `stone` → `ivory` (não `brass`), reservando o
acento só para valores monetários dentro de um painel pequeno. Fundo do
painel e do backdrop é `basalt` — nunca `brass`/`wine` como fundo de seção.
`wine` não é usado no drawer.

## 6. Motion

Regra do `DESIGN.md`: só fade + scale sutil no hero, hover é só mudança de
cor, sem scroll-reveal repetido por item de lista. O `CartDrawer` não é um
hero, então não reusa `spotlight-in` (que tem scale). Motion dedicado, mais
curto que o do hero:

```css
/* styles/globals.css */
@keyframes drawer-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes drawer-in-reduced {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-drawer-in {
  animation: drawer-in 250ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .animate-drawer-in {
    animation-name: drawer-in-reduced;
  }
}
```

- 250ms (vs. 600ms do `spotlight-in`) porque é feedback transitório de UI, não
  um momento editorial — mantém a hierarquia "spotlight é o movimento mais
  lento/cerimonioso do site".
- `prefers-reduced-motion: reduce` remove o `translateX`, mantém só fade —
  mesmo padrão já estabelecido por `spotlight-in`/`spotlight-in-reduced`.
- Backdrop usa só `transition-opacity duration-150` (mesma duração dos hovers
  de link do site), sem keyframe próprio.
- Fechar não tem animação de saída — o componente desmonta direto (o projeto
  não tem framer-motion e não deve ganhar uma dependência só para isso).
- Nenhuma animação por linha dentro da lista do drawer/página — reforça a
  regra "nada de scroll-reveal repetido por item de lista".

## 7. Acessibilidade

- `CartDrawer`: `role="dialog"` `aria-modal="true"` `aria-labelledby`
  apontando para um `<h2 id="cart-drawer-title">Carrinho</h2>` dentro do
  painel.
- Foco ao abrir vai para o botão de fechar (X) — mais seguro para um painel
  que pode abrir sem intenção direta do usuário (`notifyAdd` automático),
  evitando saltar foco para dentro de uma lista não solicitada.
- Esc fecha (`keydown` ativo só quando `isOpen`).
- Tab preso dentro do painel via `useFocusTrap` enquanto aberto; foco retorna
  ao elemento que originou a abertura ao fechar (o `AddToCartButton` clicado,
  por exemplo).
- Anúncio para leitor de tela: região `aria-live="polite"` visualmente oculta
  (`sr-only`), montada uma vez no `Layout` (fora do `CartDrawer`, para
  continuar existindo mesmo que o painel já tenha fechado por auto-close antes
  do SR anunciar). Texto: "{nome do prato} adicionado ao carrinho." a cada
  `add()`.
- Badge de contagem: ver seção 4 (`aria-label` dinâmico no `NavLink`, número
  visual `aria-hidden`).
- Todos os controles novos seguem o anel de foco `brass` 2px já global
  (`:focus-visible`), sem CSS extra. O backdrop não é alvo de teclado (só
  `onClick`); Esc cobre o caso de teclado.

## 8. Testes

Seguindo o padrão de testes co-locados e o requisito já fixado em
`openspec/specs/project-setup/spec.md` sobre recálculo de total ao mudar
quantidade:

- `CartContext.test.tsx` (novo — não existe hoje): `add` soma quantidade em
  item existente; `updateQuantity` seta valor absoluto e remove ao chegar a 0
  ou menos; `removeItem` remove o item inteiro independente da quantidade;
  `clear` esvazia; **`total` recalcula corretamente após mudança de
  quantidade**; `itemCount` soma quantidades.
- `Cart.test.tsx` (novo): estado vazio mostra mensagem + link para
  `/cardapio`; lista renderiza nome/preço/quantidade por item; alterar
  quantidade via `QuantitySelector` atualiza o total exibido; remover item
  tira da lista; "Esvaziar carrinho" zera a lista; CTA "Reservar uma mesa"
  aponta para `/reservas`.
- `CartDrawer.test.tsx` (novo): fechado por padrão; abre quando `notifyAdd()`
  é disparado (via `AddToCartButton` dentro do provider); Esc fecha; clique no
  backdrop fecha; foco vai para o botão fechar ao abrir; foco retorna à
  origem ao fechar; link "Ver carrinho completo" navega para `/carrinho` e
  fecha o painel.
- `Sidebar.test.tsx` (criar se não existir): badge ausente com carrinho
  vazio; presente com o número certo após `add`; `aria-label` do link muda
  de acordo.

## 9. Responsividade (nota, não implementação completa)

Como nas propostas anteriores, o alvo principal é desktop. Em telas estreitas,
o `CartDrawer` pode ocupar `w-full` em vez de largura fixa — registrado como
nota, não bloqueante.
