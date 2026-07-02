# Design: add-reservations-page

## 1. Estrutura da página

`pages/Reservation.tsx` usa o mesmo container central editorial das outras
páginas (`mx-auto max-w-3xl space-y-16 px-6 py-12`), dentro do `Layout`
compartilhado. Dois estados mutuamente exclusivos no mesmo componente
(mesmo padrão de carregando/erro em `MenuItemDetail.tsx`): **formulário**
(default) e **confirmação** (após `useCreateReservation` resolver com
sucesso).

1. **Hero** — `Spotlight size="hero"` com `/placeholder-room.svg` (mesmo
   asset de `About.tsx`; o orçamento do elemento-assinatura é por página) +
   `h1 text-display-xl font-display` + lede `text-body-md font-body
text-stone`.
2. **Formulário** — `<form onSubmit={handleSubmit} noValidate>` com
   `<fieldset disabled={isPending}>` envolvendo um grid de 12 colunas
   (`grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12`) — o único uso do
   grid citado nominalmente em `DESIGN.md` como opção para "reservations",
   em contraste com o empilhamento vertical puro das outras páginas:
   - Data: `<input type="date" min={today}>`.
   - Horário: `<TimeSlotPicker slots={TIME_SLOTS} value={time}
onChange={setTime} />`, span full.
   - Pessoas: `<QuantitySelector value={partySize} onChange={setPartySize}
min={1} />` com label visível "Pessoas" acima (compensa a ausência de
     um `aria-label` customizável no componente).
   - Nome, Telefone (`type="tel"`), E-mail (`type="email"`, opcional),
     Observações (`textarea`, opcional) — inputs nativos controlados, estilo
     de `Home.tsx` (`border-b border-stone/40 bg-transparent ...
text-ivory placeholder:text-stone`), cada um com `<label>` visível
     `text-body-sm font-body text-stone` (formulário de 7 campos justifica
     labels visíveis em vez de só `aria-label`).
   - Slot único de erro (ver seção 4).
   - CTA `bg-brass text-basalt`: "Confirmar reserva" / "Confirmando…"
     enquanto `isPending`.
3. **Confirmação** — `h2` "Reserva confirmada.", `<dl>` de resumo
   reaproveitando o padrão `dt`/`dd` de `About.tsx` (Data, Horário, Pessoas,
   Nome — partes numéricas em `font-mono`), e botão-link "Nova reserva"
   (`text-brass`) que chama `mutation.reset()` e limpa o estado local do
   formulário.

## 2. Componente novo: TimeSlotPicker

Visual derivado de `CategoryFilter.tsx` (mesma função `chipClass`,
`aria-current` no ativo, `brass` ativo / `stone` + hover `ivory` no resto),
com duas diferenças deliberadas:

- Mecânica: `<button type="button" onClick={() => onChange(slot)}>` dentro
  de `<div role="group" aria-label="Horário">`, não `<Link>`/
  `useSearchParams` — é estado local do formulário, não deve tocar a URL.
- Tipografia: `font-mono`, não `font-body` — `DESIGN.md` reserva mono a
  números/horários, e `About.tsx` já mostra `19h–23h` em mono.

```ts
interface TimeSlotPickerProps {
  slots: readonly string[];
  value: string | null;
  onChange: (time: string) => void;
}
```

Horários fixos em `lib/reservations.ts`:

```ts
export const TIME_SLOTS = [
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
] as const;
export const DEFAULT_PARTY_SIZE = 2;
```

Sem lógica de disponibilidade/capacidade — cobre o intervalo `19h–23h` já
citado em `About.tsx`, com último horário às 22h.

## 3. Dados e mutation

- `types/reservation.ts`: `ReservationRequest` (`date`, `time`,
  `partySize`, `name`, `phone`, `email?`, `notes?`) e `Reservation`
  (estende `ReservationRequest` + `id`, `status: 'confirmed'`,
  `createdAt`).
- `services/reservationService.ts`: `createReservation(request)` — `POST
/api/reservations`, mesmo formato de erro (`if (!response.ok) throw`) de
  `getMenu`.
- `hooks/useReservation.ts`: `useCreateReservation()` via
  `useMutation({ mutationFn: createReservation })` — primeira mutation do
  projeto; sem invalidação de cache (não há listagem de reservas a
  invalidar).
- `mocks/handlers/reservations.ts`: `POST /api/reservations` valida campos
  obrigatórios (400 se faltar), senão responde 201 com a reserva completa
  (`id`/`status`/`createdAt` gerados no handler). Sempre sucesso por
  padrão — o cenário de erro de rede é coberto em teste via `server.use(...)`
  pontual, não no handler padrão (evita teste flaky).
- Registrado em `mocks/browser.ts`/`mocks/server.ts` ao lado de
  `menuHandlers`.

## 4. Validação e a restrição do wine

`DESIGN.md` limita `wine` a no máximo uma vez por página. Solução: um único
`<p role="alert" className="... text-wine">` sempre presente no DOM (com
`min-h` para evitar layout shift), reusado para os dois únicos erros
possíveis — que nunca coexistem, porque a mutation só dispara depois que a
validação client-side passa:

1. Submit tentado com `date`/`time`/`name`/`phone` vazios → mensagem
   listando os campos faltando.
2. Mutation falha (erro de rede) → mensagem "Não foi possível confirmar sua
   reserva agora. Tente novamente."

`attemptedSubmit` (estado local) controla quando exibir a mensagem/realce,
evitando erro prematuro antes da primeira tentativa. Campos vazios após uma
tentativa de submit recebem `aria-invalid="true"` e trocam `border-stone/40`
→ `border-ivory` (tom já dentro da paleta, sem introduzir cor nova) para
indicar visualmente qual campo falta.

Sem validação de formato (regex de e-mail/telefone) — só `type="email"`/
`type="tel"` nativos, sem lib nova.

## 5. Estado de pending

`<fieldset disabled={isPending}>` desabilita nativamente todos os inputs e
os botões do `QuantitySelector`/`TimeSlotPicker` em cascata (comportamento
padrão do HTML sobre `<button>`/`<input>` descendentes) — sem propagar
`disabled` manualmente por prop.

## 6. Acessibilidade / motion

- Todos os campos, chips e botões recebem o anel de foco `brass` global.
- Erros são comunicados por **texto** (`role="alert"`), não só por cor.
- Nenhuma animação nova: o único movimento é o `spotlight-in` do hero, que
  já respeita `prefers-reduced-motion`.

## 7. Testes

- `TimeSlotPicker.test.tsx`: renderiza os slots recebidos em mono; `value`
  ativo tem `aria-current="true"`; clique chama `onChange` com o horário
  certo.
- `Reservation.test.tsx` (com `QueryClientProvider` real de teste — sem
  precedente de helper compartilhado, então inline no arquivo, já que é a
  primeira mutation do projeto): hero e chips renderizam; submit vazio
  bloqueia com mensagem de validação; seleção de chip marca
  `aria-current`; fluxo feliz mostra confirmação com resumo e "Nova
  reserva" reseta; erro de rede (`server.use` pontual) mostra mensagem no
  mesmo slot e volta o botão a "Confirmar reserva".

## 8. Responsividade (nota, não implementação completa)

Como nas propostas anteriores, o alvo principal é desktop. O grid de 12
colunas colapsa para 1 coluna em telas estreitas (`sm:grid-cols-12`); ajuste
fino de mobile fica registrado como trabalho futuro, não bloqueante.
