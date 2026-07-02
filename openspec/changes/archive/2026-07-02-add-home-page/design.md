# Design: add-home-page

## 1. Layout geral

A página usa um layout persistente de duas regiões:

- **Sidebar** (fixa à esquerda, compartilhada por todas as rotas — vive em
  `components/Sidebar.tsx` dentro do `Layout` já criado em `setup-project`).
- **Conteúdo principal** (`pages/Home.tsx`), com `margin-left` compensando a
  largura colapsada da sidebar.

## 2. Sidebar retrátil

- Estado padrão: colapsada, ~64px de largura, mostrando apenas ícones.
- Ao hover (`mouseenter`): expande para ~180px, revelando os labels de texto
  com fade-in (~150ms).
- Ao `mouseleave`: retorna ao estado colapsado.
- Comportamento mobile: fora de escopo desta proposta (a definir em change
  futura de responsividade — por padrão, em viewport estreita, a sidebar deve
  iniciar colapsada e não expandir por hover, já que não há mouse; isso fica
  como nota para a spec de responsividade, não implementado aqui).

Itens do menu, em ordem, com rota e ícone:

| Ordem | Label      | Rota          | Ícone (Tabler)       |
| ----- | ---------- | ------------- | -------------------- |
| 1     | Início     | `/`           | `ti-home`            |
| 2     | Cardápio   | `/cardapio`   | `ti-tools-kitchen-2` |
| 3     | Categorias | `/categorias` | `ti-category`        |
| 4     | Carrinho   | `/carrinho`   | `ti-shopping-bag`    |
| 5     | Reservas   | `/reservas`   | `ti-calendar-event`  |
| 6     | Sobre      | `/sobre`      | `ti-info-circle`     |

O item correspondente à rota ativa recebe destaque visual (fundo `brass` a
baixa opacidade + ícone em `brass`), os demais ficam em `stone`.

Nota: a rota `/categorias` é nova em relação ao que foi definido em
`setup-project` (que listava `/`, `/cardapio`, `/carrinho`, `/reservas`,
`/sobre`). Esta proposta adiciona `/categorias` às rotas do roteador.

## 3. Busca

- Input de texto no topo do conteúdo principal, sempre visível.
- Estado vazio (`value.length === 0`): mostra as seções padrão (spotlight,
  categorias mais buscadas, mais pedidos).
- Estado com texto (`value.length > 0`): oculta as seções padrão e mostra a
  seção de resultados, consultando os mesmos dados mockados do cardápio
  (`services/menuService.ts`) filtrados por nome/descrição no client-side.
- Sem debounce nesta primeira versão (lista mockada é pequena); se a fonte de
  dados crescer, debounce é candidato a change futura.
- Resultado vazio: mostrar mensagem simples ("Nenhum prato encontrado para
  '{termo}'") — não é uma seção elaborada nesta proposta.
- Cada resultado da busca é um link clicável que navega para o detalhe do
  item no cardápio (`/cardapio/{id}`).

## 4. Seção de prato em destaque (spotlight)

- Usa o elemento-assinatura definido no design system (`DESIGN.md`): foto
  circular com vinheta, motion de fade+scale ao carregar.
- Conteúdo: nome do prato, descrição curta, botão "Ver cardápio completo".
- O botão navega para `/cardapio` (cardápio completo, não um item específico
  — é uma chamada geral para explorar, não para o prato em si).
- A escolha de qual prato é o "destaque do dia" vem de um campo no mock de
  dados (ex: `featured: true` em um item de `menu.json`); a lógica de seleção
  é fora de escopo aqui — pega o primeiro item marcado como destaque.

## 5. Categorias mais buscadas

- Grid de 4 colunas (desktop), cada item: ícone + label, sem foto.
- Lista fixa nesta primeira versão: Entradas, Principais, Vinhos, Sobremesas
  (correspondendo às categorias existentes no mock de cardápio).
- Cada categoria navega para `/cardapio?categoria={slug}` — o cardápio (que
  será especificado em change futura) deve ler esse query param e aplicar o
  filtro correspondente ao carregar.

## 6. Mais pedidos

- Grid de 3 colunas (desktop) de cards simples: nome do prato, descrição
  curta, preço (em `mono`). Sem foto (reforça a regra do design system de
  reservar o spotlight para no máximo um item).
- Borda fina (`stone` a baixa opacidade), sem sombra, sem elevação — consis-
  tente com o princípio "editorial, não SaaS-card".
- Cada card é um link clicável, navegando para `/cardapio/{id}` do item.
- Itens vêm do mock, ordenados por um campo `popularity` (ou equivalente) já
  presente nos dados — corte nos 3 primeiros.

## 7. O que NÃO está na Home

- Nenhum CTA de reserva (reserva só é acessível pelo item de menu lateral).
- Nenhum carrinho/contador visível na sidebar nesta versão (pode ser adicio-
  nado em change futura, ex: badge de quantidade no ícone "Carrinho").
- Nenhuma foto de prato fora do spotlight central (reforça a regra do design
  system).

## 8. Responsividade (nota, não implementação completa)

Esta proposta assume desktop como alvo principal. Adaptação mobile completa
(sidebar como menu hambúrguer, grids colapsando para 1-2 colunas) fica
registrada como trabalho futuro, não bloqueante para esta change.
