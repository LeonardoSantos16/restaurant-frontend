# Tasks: add-menu-page

## 1. Modelo de dados e mock

- [x] 1.1 Estender `types/menu.ts`: adicionar `type DietTag` e os campos opcionais
      `tags?: DietTag[]` e `available?: boolean` em `MenuItem`
- [x] 1.2 Popular `mocks/data/menu.json` com `tags` em alguns pratos e marcar ao
      menos um item com `available: false` (para exercitar o estado esgotado)

## 2. Fontes únicas (libs)

- [x] 2.1 Criar `lib/categories.ts` com `CATEGORIES` (array canônico e ordenado
      `{ label, slug }`), `slugify(label)` e `categoryFromSlug(slug)`
- [x] 2.2 Criar `lib/dietTags.ts` com o mapa `DietTag → label pt-BR`

## 3. Componentes de listagem

- [x] 3.1 Criar `components/MenuItemRow.tsx` extraindo o padrão dot-leader hoje
      inline em `Home.tsx` (nome, leader pontilhado, preço em mono/brass, descrição)
- [x] 3.2 Adicionar ao `MenuItemRow`: render das tags (via `dietTags`) e do selo
      "mais pedido" (quando `popularity >= 85`), como metadados em `stone`
- [x] 3.3 Adicionar ao `MenuItemRow` o botão adicionar ao carrinho (`+`,
      `aria-label`, `stopPropagation`, `useCart().add`, `stone` → `brass` no hover)
- [x] 3.4 Adicionar ao `MenuItemRow` o estado esgotado (`available === false`):
      `div` não clicável, `opacity-60`, label "esgotado" em `wine`, sem botão
- [x] 3.5 Criar `components/FeaturedMenuItem.tsx` (Spotlight 120px + dados ao lado,
      sem badge wine; placeholder `imageUrl || '/placeholder-dish.svg'`)
- [x] 3.6 Criar `components/CategoryDivider.tsx` (`<h2>` sobre linha 1px `stone/20%`)
- [x] 3.7 Criar `components/CategoryFilter.tsx` (chips via `useSearchParams`: "Tudo" + um `Link` por categoria; ativo em `brass` + `aria-current`)

## 4. Página do cardápio

- [x] 4.1 Reescrever `pages/Menu.tsx`: header (título `display-xl` + subtítulo +
      botão imprimir), `CategoryFilter`, e os grupos por categoria
- [x] 4.2 Agrupar `useMenu()` por `category` na ordem de `CATEGORIES`, omitindo
      categorias vazias; aplicar filtro do `?categoria` (`categoryFromSlug`)
- [x] 4.3 Em cada grupo: `CategoryDivider` + item `featured` como `FeaturedMenuItem`
      e os demais como `MenuItemRow` (máx. um destaque por grupo)
- [x] 4.4 Estados: carregando, erro, e categoria vazia/slug inválido (mensagem +
      link "Ver tudo")
- [x] 4.5 Botão "Imprimir cardápio" chamando `window.print()`

## 5. Impressão

- [x] 5.1 Adicionar bloco `@media print` em `styles/globals.css`: esconder
      sidebar, chips, botões adicionar e imprimir; remover `margin-left` do `main`;
      inverter para tinta-sobre-papel; revelar todos os grupos (ignorar filtro)

## 6. Refactors de consistência

- [x] 6.1 `pages/Home.tsx`: substituir o bloco dot-leader inline (linhas ~35-49)
      por `<MenuItemRow item={...} />`
- [x] 6.2 `components/CategoryGrid.tsx`: derivar itens/slugs de `lib/categories.ts`
      em vez do array hardcoded

## 7. Testes

- [x] 7.1 `MenuItemRow.test.tsx`: tags e selo renderizam; item esgotado não é link
      e não tem botão; clicar `+` chama `add` do cart
- [x] 7.2 `CategoryFilter.test.tsx`: filtro reflete/atualiza o query param e "Tudo"
      limpa

## 8. Validação final

- [x] 8.1 `/cardapio` mostra grupos com divisórias e dot-leaders, sem cards; item
      em destaque com spotlight; tags/selo em stone; item esgotado esmaecido (wine)
- [x] 8.2 Filtro por chip e por URL (`?categoria=principais`) restringe corretamente;
      "Tudo" limpa; back do navegador funciona; vindo do `CategoryGrid` cai certo
- [x] 8.3 Adicionar `+` incrementa o carrinho (conferir em `/carrinho`) sem navegar;
      item esgotado não tem `+`
- [x] 8.4 Imprimir mostra o cardápio completo em tinta-sobre-papel, sem
      sidebar/chips/botões
- [x] 8.5 Foco por teclado (anel brass) em chips, linhas e `+`; `prefers-reduced-motion`
- [x] 8.6 `npm test` e typecheck/lint passam
