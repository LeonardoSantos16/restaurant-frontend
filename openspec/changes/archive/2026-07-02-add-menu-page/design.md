# Design: add-menu-page

## 1. Estrutura da página

`pages/Menu.tsx` usa o mesmo container central da Home
(`mx-auto max-w-3xl space-y-16 px-6 py-12`), dentro do `Layout` compartilhado
(sidebar já persistente). De cima para baixo:

1. **Header editorial** — título "Cardápio" em `display-xl` (`font-display`) +
   subtítulo curto em `stone`, e um botão "Imprimir cardápio" (ver §6). Sem
   spotlight hero — a decisão é não repetir o prato em destaque que já é o hero da
   Home.
2. **Filtro de categorias** (`CategoryFilter`) — chips.
3. **Grupos por categoria** — cada grupo com uma divisória (`CategoryDivider`) e
   suas linhas de item.

## 2. Dados e agrupamento

- Fonte: `useMenu()` (hook TanStack Query já existente) → `MenuItem[]`.
- `MenuItem` é estendido com dois campos **opcionais** (dados atuais continuam
  válidos por default):

  ```ts
  type DietTag = 'vegetariano' | 'vegano' | 'sem-gluten' | 'picante';
  interface MenuItem {
    // ...campos atuais...
    tags?: DietTag[]; // ausente = sem tags
    available?: boolean; // ausente/true = disponível; false = esgotado
  }
  ```

- Agrupamento por `category`, na ordem canônica definida em `lib/categories.ts`
  (Entradas, Principais, Vinhos, Sobremesas). Categorias sem itens são omitidas.
- Selo "mais pedido" é **derivado**, não um campo novo: `popularity >= 85`.

## 3. Filtro por categoria (contrato `?categoria={slug}`)

- O `CategoryGrid` da Home já linka para `/cardapio?categoria={slug}` com o slug
  em minúsculas/sem acento, enquanto o dado guarda o label capitalizado
  (`Principais`). `lib/categories.ts` centraliza a resolução:
  - `CATEGORIES`: array canônico e ordenado `{ label, slug }`.
  - `slugify(label)`: `toLowerCase()` + `normalize('NFD')` removendo diacríticos.
  - `categoryFromSlug(slug)`: slug → label canônico (ou `undefined`).
- A página lê `categoria` via `useSearchParams` (react-router). Com slug válido,
  renderiza **apenas** aquele grupo; sem param (ou "Tudo"), renderiza todos.
- Os chips são `Link`s que setam/limpam o param — o estado do filtro mora no URL
  (compartilhável, botão "voltar" do navegador funciona). Chip ativo: `text-brass`
  - `aria-current`; inativos `text-stone hover:text-ivory`.

## 4. Linha de item (`MenuItemRow`) e destaque (`FeaturedMenuItem`)

O padrão dot-leader hoje vive inline nos resultados de busca da Home
(`Home.tsx:35-49`). É extraído para `components/MenuItemRow.tsx` e reusado nos
dois lugares. Cada linha:

- É um `Link` para `/cardapio/{id}`; nome (`font-body`), leader pontilhado
  flexível, preço (`font-mono text-brass` via `formatPrice`), descrição
  (`body-sm text-stone`).
- **Tags** (se houver): labels em `body-sm text-stone` traduzidas por
  `lib/dietTags.ts` (`DietTag → label pt-BR`).
- **Selo "mais pedido"** (se `popularity >= 85`): texto curto em `stone`.
- **Adicionar ao carrinho**: botão-ícone `+` (`aria-label` explícito) que chama
  `useCart().add(item)` com `stopPropagation` para não navegar. Fica `text-stone`
  e vira `brass` só no hover/focus da própria linha.
- **Esgotado** (`available === false`): renderiza como `div` (não `Link`),
  `opacity-60`, sem botão adicionar, com label "esgotado" em `wine`.

`FeaturedMenuItem` é a variante do item `featured`: `Spotlight size="featured"`
(120px, animação `spotlight-in` já existente) ao lado do nome/descrição/preço/tags.
Máximo um por grupo.

## 5. Decisões de cor (restrição do DESIGN.md)

O `DESIGN.md` limita `brass` a 1–2 elementos por viewport (CTAs/preços) e `wine`
a no máximo um uso por página ("sold out").

- **`brass`** fica reservado a preços e ao chip ativo. O botão adicionar é `stone`
  por default (brass só no hover/focus da linha), evitando competir com o preço.
- **`wine`** é usado **exclusivamente** no estado "Esgotado" (uso literalmente
  previsto no `DESIGN.md`). Consequência: o `FeaturedMenuItem` **não** recebe
  badge wine — o spotlight já sinaliza "destaque". Se houver múltiplos itens
  esgotados na mesma viewport, o rótulo é mantido mínimo (texto pequeno).
- Selo "mais pedido" e tags são metadados em `stone`, preservando a hierarquia.

## 6. Cardápio para imprimir

- O botão "Imprimir cardápio" no header chama `window.print()`. Fica `text-stone`
  → `brass` no hover, mesma disciplina do botão adicionar.
- `styles/globals.css` ganha um bloco `@media print`:
  - Esconde `Sidebar`, `CategoryFilter`, botões adicionar e o botão imprimir.
  - Remove o `margin-left` do `<main>`.
  - Inverte para tinta-sobre-papel (fundo branco, texto `basalt`) — economiza
    tinta e materializa a tese de "menu impresso" do design system.
  - A impressão mostra o cardápio **completo**, ignorando o filtro ativo da UI
    (marcar as classes de forma que o print revele todos os grupos).

## 7. Acessibilidade / motion

- Chips, linhas e botão adicionar recebem o foco visível `brass` global.
- Estado "esgotado" é comunicado por **texto** ("esgotado"), não só cor/opacidade.
- Tags e selo são texto real, não apenas cor.
- `CategoryDivider` é um `<h2>` (âncora semântica sobre linha 1px `stone/20%`).
- Nenhuma animação nova de lista (o `DESIGN.md` proíbe scroll-reveal por item);
  o único movimento é o `spotlight-in` existente, que já respeita
  `prefers-reduced-motion`.

## 8. Testes

Seguindo o critério de "componente crítico" de `setup-project` e o exemplo de
`Spotlight.test.tsx`:

- `MenuItemRow.test.tsx`: renderiza tags e selo; item esgotado não é link e não
  tem botão adicionar; clicar `+` chama `add` do cart.
- `CategoryFilter.test.tsx`: filtro reflete/atualiza o query param; "Tudo" limpa.

## 9. Responsividade (nota, não implementação completa)

Como em `add-home-page`, o alvo principal é desktop. Empilhamento dos chips e
ajustes finos de mobile ficam registrados como trabalho futuro, não bloqueante.
