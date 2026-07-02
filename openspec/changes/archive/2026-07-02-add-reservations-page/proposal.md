# Proposal: add-reservations-page

## Why

A rota `/reservas` (`pages/Reservation.tsx`) é hoje um stub
(`<h1>Reservas</h1>`), mas já é o destino do item "Reservas" na sidebar
(`IconCalendarEvent`) e do CTA "Reservar uma mesa →" ao final da página
`/sobre`. É a última tela "fantasma" do fluxo principal — cardápio, detalhe
de prato e sobre já estão implementados.

Esta proposta constrói a página de reservas como um formulário editorial de
uma única tela: data, horário (chips fixos), número de pessoas e dados de
contato, terminando numa confirmação inline — sem introduzir uma nova
dependência (nenhuma lib de formulário), sem novo padrão de estado global
(sem `ReservationContext`) e reusando a camada de dados já estabelecida no
cardápio (`service` + `hook` de React Query + handler MSW).

## What Changes

- **ADDED**: Página de reservas (`/reservas`) com hero `Spotlight` (reusa
  `/placeholder-room.svg`) e formulário: data, horário, número de pessoas,
  nome, telefone, e-mail opcional e observações opcionais.
- **ADDED**: Seleção de horário por chips fixos (19h–22h, intervalos de 30
  min), componente novo `TimeSlotPicker`, visual derivado de
  `CategoryFilter` mas com estado local (não dirigido por URL).
- **ADDED**: Reuso do `QuantitySelector` existente para o número de pessoas.
- **ADDED**: Validação client-side (data/horário/nome/telefone
  obrigatórios) com uma única mensagem de erro compartilhada
  (`role="alert"`, `text-wine`), respeitando o limite de "wine no máximo uma
  vez por página" do `DESIGN.md` — o mesmo slot é reusado para falha de
  validação e para falha de rede, que nunca ocorrem ao mesmo tempo.
- **ADDED**: Estado de confirmação inline (sem modal — não existe
  componente de modal no projeto) com resumo da reserva e ação "Nova
  reserva" que reseta o formulário.
- **ADDED**: Camada de dados para reservas, replicando o padrão do
  cardápio: `types/reservation.ts`, `lib/reservations.ts` (horários fixos),
  `services/reservationService.ts` (`createReservation`),
  `hooks/useReservation.ts` (`useCreateReservation` via `useMutation` — a
  primeira mutation do projeto) e `mocks/handlers/reservations.ts`
  (`POST /api/reservations`), registrado em `mocks/browser.ts` e
  `mocks/server.ts`.

## Out of Scope

- Checagem real de disponibilidade/capacidade de mesas — todos os horários
  fixos ficam sempre selecionáveis.
- Edição ou cancelamento de reserva pelo usuário — a tela é só de criação.
- Painel administrativo ou listagem de reservas (`GET /api/reservations`
  não existe).
- Persistência entre sessões ou backend real — MSW simula em memória;
  recarregar a página perde inclusive a confirmação exibida.
- Confirmação por e-mail ou SMS real.
- Validação de formato de e-mail/telefone além dos `type` nativos do input.
- Adaptação mobile completa (mesma nota das propostas anteriores: desktop é
  o alvo principal).
