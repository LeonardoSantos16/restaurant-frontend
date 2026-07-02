# Tasks: add-reservations-page

## 1. Tipos e config

- [x] 1.1 Criar `types/reservation.ts`: `ReservationRequest` (`date`,
      `time`, `partySize`, `name`, `phone`, `email?`, `notes?`) e
      `Reservation` (estende + `id`, `status: 'confirmed'`, `createdAt`)
- [x] 1.2 Criar `lib/reservations.ts`: `TIME_SLOTS` (`'19:00'`…`'22:00'`,
      30 em 30 min) e `DEFAULT_PARTY_SIZE = 2`

## 2. Camada de dados

- [x] 2.1 Criar `services/reservationService.ts`: `createReservation(request)`
      → `POST /api/reservations`, lança em `!response.ok`
- [x] 2.2 Criar `hooks/useReservation.ts`: `useCreateReservation()` via
      `useMutation({ mutationFn: createReservation })`
- [x] 2.3 Criar `mocks/handlers/reservations.ts`: handler `POST
    /api/reservations` — 400 se faltar campo obrigatório, senão 201 com
      `id`/`status`/`createdAt` gerados
- [x] 2.4 Registrar `reservationHandlers` em `mocks/browser.ts` e
      `mocks/server.ts`, ao lado de `menuHandlers`

## 3. Componente TimeSlotPicker

- [x] 3.1 Criar `components/TimeSlotPicker.tsx`: chips controlados
      (`slots`, `value`, `onChange`), `role="group"`, `aria-current` no
      ativo, brass/stone (`hover:text-ivory`), texto em `font-mono`
- [x] 3.2 `TimeSlotPicker.test.tsx`: renderiza todos os slots; `value`
      ativo tem `aria-current="true"`; clique chama `onChange` com o
      horário certo

## 4. Página de reservas

- [x] 4.1 Reescrever `pages/Reservation.tsx`: shell `mx-auto max-w-3xl
    space-y-16 px-6 py-12`, hero `Spotlight size="hero"`
      (`/placeholder-room.svg`) + `h1`/lede
- [x] 4.2 Formulário em grid de 12 colunas dentro de `<fieldset
    disabled={isPending}>`: data (`input type="date"`), `TimeSlotPicker`,
      `QuantitySelector` (pessoas), nome, telefone, e-mail opcional,
      observações opcional — todos controlados via `useState`, labels
      visíveis, estilo `border-b` de `Home.tsx`
- [x] 4.3 Validação client-side: `attemptedSubmit` + checagem de
      obrigatórios (`date`/`time`/`name`/`phone`); slot único `role="alert"
    text-wine` compartilhado entre erro de validação e erro de mutation;
      campos vazios após tentativa ganham `aria-invalid` + `border-ivory`
- [x] 4.4 CTA `bg-brass text-basalt` "Confirmar reserva"/"Confirmando…"
      chamando `useCreateReservation().mutate(request)`
- [x] 4.5 Estado de confirmação: `<dl>` de resumo (data, horário, pessoas,
      nome) + botão "Nova reserva" (`mutation.reset()` + limpa estado local)

## 5. Testes

- [x] 5.1 `Reservation.test.tsx` (com `QueryClientProvider` de teste
      inline + `MemoryRouter`): hero e chips renderizam; submit vazio
      bloqueia com mensagem de validação; seleção de chip marca
      `aria-current`; fluxo feliz mostra confirmação com resumo e "Nova
      reserva" reseta o formulário; erro de rede (`server.use` pontual)
      mostra mensagem no mesmo slot e volta o botão a "Confirmar reserva"

## 6. Validação final

- [x] 6.1 `npm test`, lint e typecheck passam
