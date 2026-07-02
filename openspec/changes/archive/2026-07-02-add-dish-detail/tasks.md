# Tasks: add-dish-detail

## 1. Carrinho e libs

- [x] 1.1 Estender `context/CartContext.tsx`: `add(item, quantity = 1)` somando a
      quantidade (retrocompatível com `add(item)`)
- [x] 1.2 Adicionar `relatedItems(items, current, limit = 3)` em `lib/menu.ts`
      (mesma categoria, exclui o id atual, corta em `limit`)

## 2. Componente QuantitySelector

- [x] 2.1 Criar `components/QuantitySelector.tsx` controlado (`value`, `onChange`,
      `min = 1`): botões − e + com `aria-label`, valor em `font-mono`, − desabilitado
      no mínimo, foco brass global
- [x] 2.2 `QuantitySelector.test.tsx`: + e − chamam `onChange`; − desabilitado no mínimo

## 3. Página de detalhe

- [x] 3.1 Reescrever `pages/MenuItemDetail.tsx`: `useParams` + `useMenuItem`;
      container `max-w-3xl`; link "Voltar"; estados de carregando e não encontrado
- [x] 3.2 Hero `Spotlight size="hero"` (fallback placeholder) + eyebrow de categoria
      (`Link` para `/cardapio?categoria={slug}`) + nome (`display-lg`)
- [x] 3.3 Preço (mono/brass) + `DishMeta` + descrição (`body-lg`)
- [x] 3.4 Ação de compra: estado local `quantity`, `QuantitySelector` + CTA brass
      "Adicionar ao carrinho" chamando `add(item, quantity)`; ambos `print:hidden`
- [x] 3.5 Estado esgotado (`isSoldOut`): rótulo "esgotado" em `wine`, sem seletor/CTA
- [x] 3.6 Seção "Outros de {categoria}": `useMenu()` + `relatedItems`,
      `CategoryDivider` + até 3 `MenuItemRow`; omitida quando vazia

## 4. Testes

- [x] 4.1 `MenuItemDetail.test.tsx`: nome/preço/descrição renderizam; CTA com
      quantidade chama `add` com a quantidade; esgotado sem CTA; id inválido mostra
      "não encontrado"; relacionados listam outros da categoria

## 5. Validação final

- [x] 5.1 Navegar da Home/`/cardapio` até um prato: hero, nome, preço, meta,
      descrição e "Outros de {categoria}" aparecem corretos
- [x] 5.2 Ajustar quantidade e "Adicionar ao carrinho" reflete `price × quantity`
      no `total` do carrinho
- [x] 5.3 `/cardapio/3` (esgotado) sem CTA; `/cardapio/999` mostra "não encontrado"
      com link ao cardápio
- [x] 5.4 Foco por teclado (anel brass) em voltar/quantidade/CTA/relacionados;
      `prefers-reduced-motion` mantém só o fade do spotlight
- [x] 5.5 `npm test`, lint e typecheck passam
