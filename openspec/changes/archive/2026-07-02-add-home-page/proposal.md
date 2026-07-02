# Proposal: add-home-page

## Why

A Home é o ponto de entrada do site e precisa orientar o visitante a três
caminhos principais — explorar o cardápio, buscar algo específico, ou navegar
por categoria — sem repetir o cardápio completo na própria página. Esta
proposta define a estrutura e o comportamento de navegação da Home, com base
no protótipo visual já validado (sidebar retrátil, busca, prato em destaque,
categorias mais buscadas, mais pedidos).

## What Changes

- **ADDED**: Layout de página com sidebar de navegação retrátil (expande no
  hover), persistente em todas as rotas.
- **ADDED**: Barra de busca na Home que substitui as seções padrão por
  resultados em tempo real (via mock MSW).
- **ADDED**: Seção de prato em destaque (spotlight) com CTA para o cardápio
  completo.
- **ADDED**: Seção "Categorias mais buscadas" com navegação para o cardápio
  filtrado por categoria.
- **ADDED**: Seção "Mais pedidos" em cards, cada um navegando para o detalhe
  do item no cardápio.

## Out of Scope

- Implementação das páginas de destino (Cardápio, Categorias, Carrinho,
  Reservas, Sobre) — cada uma é um change separado.
- CTA de reserva na Home (decisão consciente: reserva só é acessível via item
  de menu "Reservas").
- Testes automatizados (nenhum componente da Home foi classificado como
  crítico, conforme critério definido em setup-project).
- Lógica real de busca/filtro (fica a cargo da camada de serviço já definida
  em setup-project; aqui apenas o comportamento de UI é especificado).
