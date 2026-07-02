# Tasks: add-home-page

## 1. Roteamento

- [x] 1.1 Adicionar rota `/categorias` em `routes/index.tsx` (página placeholder
      por enquanto, implementação completa é change futura)
- [x] 1.2 Confirmar que `/cardapio` aceita query param `?categoria={slug}` na
      definição de rota (mesmo que o filtro em si seja implementado depois)
- [x] 1.3 Definir rota de detalhe `/cardapio/:id` no roteador (placeholder por
      enquanto)

## 2. Sidebar

- [x] 2.1 Criar `components/Sidebar.tsx` com os 6 itens (ordem, rota, ícone
      conforme design.md)
- [x] 2.2 Implementar estado colapsado/expandido via hover (`onMouseEnter` /
      `onMouseLeave`), com transição de largura e fade dos labels
- [x] 2.3 Destacar visualmente o item da rota ativa (usar `useLocation` ou
      equivalente do React Router para comparar pathname)
- [x] 2.4 Integrar `Sidebar` ao `Layout` compartilhado (criado em
      setup-project), afetando todas as rotas

## 3. Mock de dados

- [x] 3.1 Estender `mocks/data/menu.json` com os campos `featured` (boolean)
      e `popularity` (number) em cada item
- [x] 3.2 Adicionar pelo menos um item com `featured: true`
- [x] 3.3 Garantir que `services/menuService.ts` exponha uma forma de buscar
      por texto (ex: `searchMenu(query: string)`) e por destaque/popularidade

## 4. Busca

- [x] 4.1 Criar `hooks/useMenuSearch.ts` (TanStack Query) consumindo
      `searchMenu`
- [x] 4.2 Implementar input de busca em `pages/Home.tsx`, alternando entre
      seções padrão e seção de resultados conforme valor digitado
- [x] 4.3 Implementar estado vazio de resultado ("Nenhum prato encontrado
      para '{termo}'")
- [x] 4.4 Cada resultado navega para `/cardapio/:id` ao clicar

## 5. Spotlight (prato em destaque)

- [x] 5.1 Criar `components/FeaturedDish.tsx` usando o padrão de foto
      circular com vinheta do design system
- [x] 5.2 Aplicar motion de fade + scale (0.97→1, ~600ms ease-out),
      respeitando `prefers-reduced-motion`
- [x] 5.3 Botão "Ver cardápio completo" navega para `/cardapio`

## 6. Categorias mais buscadas

- [x] 6.1 Criar `components/CategoryGrid.tsx`, grid de 4 colunas com ícone +
      label por categoria
- [x] 6.2 Cada categoria navega para `/cardapio?categoria={slug}`

## 7. Mais pedidos

- [x] 7.1 Criar `components/PopularDishCard.tsx` (sem foto: nome, descrição
      curta, preço em mono)
- [x] 7.2 Renderizar grid de 3 colunas em `pages/Home.tsx`, usando os 3 itens
      de maior `popularity` do mock
- [x] 7.3 Cada card navega para `/cardapio/:id` ao clicar

## 8. Validação final

- [x] 8.1 Sidebar expande/colapsa corretamente ao passar o mouse, em todas as
      rotas
- [x] 8.2 Buscar um termo existente mostra resultado(s); termo inexistente
      mostra estado vazio; limpar o campo restaura as seções padrão
- [x] 8.3 Todos os pontos clicáveis (spotlight CTA, categoria, card de
      pedido, resultado de busca) navegam para a rota correta
- [x] 8.4 Nenhum CTA de reserva presente na Home fora do item de sidebar
