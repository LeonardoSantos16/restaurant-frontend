# Design: add-dish-detail

## 1. Estrutura da página

`pages/MenuItemDetail.tsx` usa o container central editorial das outras páginas
(`mx-auto max-w-3xl space-y-12 px-6 py-12`), dentro do `Layout` compartilhado. O
`id` vem de `useParams()` e alimenta `useMenuItem(id)`. De cima para baixo:

1. **Voltar** — `Link` discreto "← Voltar ao cardápio" (`text-stone` → `brass` no
   hover/focus).
2. **Hero** — `Spotlight size="hero"` (280px), centralizado; a animação
   `spotlight-in` já existente respeita `prefers-reduced-motion`. Fallback
   `item.imageUrl || '/placeholder-dish.svg'`.
3. **Eyebrow de categoria** — `body-sm text-stone`, é um `Link` para
   `/cardapio?categoria={slug}` usando `slugify(item.category)` de
   `lib/categories.ts` (mesmo contrato que o `CategoryGrid`/filtro já usam).
4. **Nome** — `text-display-lg font-display text-balance`.
5. **Preço + metadados** — preço em `text-mono-md font-mono text-brass`
   (`formatPrice`); `<DishMeta item={item} />` reusado para selo "mais pedido"
   (derivado de `popularity >= 85`) e tags de dieta, ambos em `stone`.
6. **Descrição** — `body-lg font-body text-pretty` (conteúdo primário de leitura,
   mais destaque do que a descrição `body-sm` das linhas de lista).
7. **Ação de compra** (item disponível) — `<QuantitySelector>` (stepper − N +) +
   botão CTA "Adicionar ao carrinho". Estado local `quantity` (default 1);
   clique chama `add(item, quantity)`. Ambos `print:hidden`.
8. **Esgotado** (`isSoldOut(item)`) — no lugar da ação: rótulo "esgotado" em
   `wine`; sem seletor nem CTA.
9. **Outros de {categoria}** — `<CategoryDivider label={`Outros de ${category}`}/>`
   - até 3 `MenuItemRow` de `relatedItems(...)`. Se vazio, a seção é omitida.

## 2. Dados e relacionados

- Prato: `useMenuItem(id)` → `MenuItem` (queryKey `['menu', id]`, já existente).
- Relacionados: `useMenu()` (lista completa, já cacheada) filtrada por um helper
  novo em `lib/menu.ts`:

  ```ts
  relatedItems(items: MenuItem[], current: MenuItem, limit = 3): MenuItem[]
  // mesma categoria, exclui o próprio id, mantém a ordem da fonte, corta em limit
  ```

  Itens esgotados **não** são filtrados — `MenuItemRow` já os renderiza esmaecidos
  e não clicáveis, mantendo a honestidade do menu.

## 3. Ação de compra e carrinho

- `QuantitySelector` é controlado (`value`, `onChange`, `min = 1`), com botões −
  e + (`aria-label` "Diminuir/Aumentar quantidade") e o valor em `font-mono`. O −
  fica `disabled` em `value === min`.
- `CartContext.add` é estendido para `add(item, quantity = 1)`, somando `quantity`
  à quantidade existente (ou criando o item com essa quantidade). É retrocompatível:
  `AddToCartButton` continua chamando `add(item)` (= +1). `total` continua
  `Σ price × quantity`, agora refletindo a quantidade escolhida.

## 4. Decisões de cor (restrição do DESIGN.md)

O `DESIGN.md` limita `brass` a 1–2 elementos por viewport e `wine` a ≤1 por página.

- No viewport do hero, os usos de `brass` são exatamente **preço** e **CTA**
  (`bg-brass text-basalt` — brass/basalt ≈6.2:1, AA para UI/label). O
  `QuantitySelector` é `stone` por default (brass só em hover/focus), para não
  criar um terceiro acento nem competir com o CTA.
- `wine` é usado **exclusivamente** no rótulo "esgotado" (uso previsto no
  DESIGN.md), no máximo uma vez na página.
- Selo "mais pedido" e tags permanecem metadados em `stone`.
- Os preços das linhas em "Outros de {categoria}" também são `brass`, mas caem em
  outro viewport (após scroll), respeitando o limite por viewport.

## 5. Estados

- **Carregando**: "Carregando o prato…" (`body-md text-stone`).
- **Erro / não encontrado**: `getMenuItem` lança em `!response.ok`, então um id
  inválido cai em `isError`. Mensagem "Prato não encontrado." + `Link` "Ver
  cardápio" para `/cardapio` — mesma voz dos estados do `Menu.tsx`.

## 6. Acessibilidade / motion

- Voltar, eyebrow, botões de quantidade, CTA e linhas relacionadas recebem o anel
  de foco `brass` global.
- Estado "esgotado" é comunicado por **texto**, não só cor.
- O CTA é um `<button>` com rótulo textual; os botões ± têm `aria-label`.
- Nenhuma animação nova: o único movimento é o `spotlight-in` do hero, que já
  respeita `prefers-reduced-motion` (só fade quando reduzido).

## 7. Testes

Seguindo o critério de "componente crítico" e o padrão de testes co-locados:

- `QuantitySelector.test.tsx`: + e − atualizam o valor via `onChange`; − fica
  desabilitado no mínimo.
- `MenuItemDetail.test.tsx`: renderiza nome/preço/descrição do prato; CTA com
  quantidade chama `add` com a quantidade escolhida; item esgotado mostra
  "esgotado" e não expõe CTA; id inválido mostra o estado "não encontrado";
  a seção de relacionados lista outros pratos da categoria.

## 8. Responsividade (nota, não implementação completa)

Como nas propostas anteriores, o alvo principal é desktop. A ação de compra e o
hero empilham naturalmente no container estreito; ajustes finos de mobile ficam
registrados como trabalho futuro, não bloqueante.
