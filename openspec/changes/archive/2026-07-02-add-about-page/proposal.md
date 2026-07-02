# Proposal: add-about-page

## Why

A rota `/sobre` (`pages/About.tsx`) é hoje um stub (`<h1>Sobre</h1>`), embora já
esteja registrada no roteador e no menu lateral. É a única página do site cujo
trabalho é falar da Âmbar diretamente — para o turista sem confiança prévia, que
precisa _sentir_ o restaurante antes de reservar, e para o local, que quer
_confirmar_ horário, endereço e contato sem fricção. O `PRODUCT.md` impõe a
restrição que guia toda a composição: **"Earn every pixel. No section headers
that say 'Our Story.'"** — a página não pode ser uma narrativa genérica rotulada;
precisa comunicar a identidade de forma editorial, na voz medida da marca
(sem exclamações, sem superlativos, sem convite a "explorar").

Esta proposta reescreve o stub como uma página **estática e editorial**: um hero
de atmosfera (Spotlight), prosa curta de filosofia sem cabeçalho rotulado, um
bloco prático de informações e um CTA de reserva discreto. Ela reusa a linguagem
visual já validada (Spotlight, padrão `FeaturedDish`) sem introduzir nenhum
componente novo.

## What Changes

- **ADDED**: Página Sobre (`/sobre`) com hero de atmosfera — `Spotlight`
  (tamanho hero) com foto do ambiente, seguido da frase de posicionamento como
  `<h1>` (em `display`, **não** a palavra "Sobre") e um lede curto em `stone`.
- **ADDED**: Prosa editorial de filosofia — 2 a 3 parágrafos curtos, sem
  cabeçalho do tipo "Nossa História", na voz da marca.
- **ADDED**: Bloco prático de informações — lista de definição (`<dl>`) com
  horários, endereço e contato, precedida por uma divisória fina `stone/20`;
  partes numéricas em `mono` (regra: mono só para números/horários). Valores são
  placeholders plausíveis, a substituir por dados reais depois.
- **ADDED**: CTA de reserva discreto — link `brass` ("Reservar uma mesa") ao
  final, navegando para `/reservas`.

## Out of Scope

- Rota e navegação: já existem (`/sobre` no roteador e item "Sobre" na sidebar);
  esta change não os altera.
- Página de reservas (`/reservas`): permanece stub; o CTA apenas navega até ela.
- Dados reais de horário/endereço/contato e integração com mapa: os valores são
  placeholders; substituição por conteúdo real fica como trabalho futuro.
- Novos componentes reutilizáveis: a página é composta inline reusando o que já
  existe; nada é extraído para `components/` nesta proposta.
- Adaptação mobile completa (mesma nota de `add-home-page`: desktop é o alvo
  principal desta proposta).
