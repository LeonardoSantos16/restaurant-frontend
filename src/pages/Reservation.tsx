import { useState, type FormEvent } from 'react';
import { Spotlight } from '@/components/Spotlight';
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { QuantitySelector } from '@/components/QuantitySelector';
import { useCreateReservation } from '@/hooks/useReservation';
import { DEFAULT_PARTY_SIZE, TIME_SLOTS } from '@/lib/reservations';

const today = new Date().toISOString().slice(0, 10);

const inputClass =
  'w-full border-b border-stone/40 py-3 text-body-md font-body text-ivory placeholder:text-stone aria-[invalid=true]:border-ivory';
const labelClass = 'mb-1 block text-body-sm font-body text-stone';

export default function Reservation() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState<string | null>(null);
  const [partySize, setPartySize] = useState(DEFAULT_PARTY_SIZE);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const { mutate, data, isPending, isError, isSuccess, reset } =
    useCreateReservation();

  const missingFields = [
    !date && 'data',
    !time && 'horário',
    !name.trim() && 'nome',
    !phone.trim() && 'telefone',
  ].filter((field): field is string => Boolean(field));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setAttemptedSubmit(true);
    if (missingFields.length > 0 || !time) return;

    mutate({
      date,
      time,
      partySize,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  }

  function handleReset() {
    reset();
    setDate('');
    setTime(null);
    setPartySize(DEFAULT_PARTY_SIZE);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setAttemptedSubmit(false);
  }

  const showValidationError = attemptedSubmit && missingFields.length > 0;
  const alertMessage = showValidationError
    ? `Preencha ${missingFields.join(', ')} para confirmar.`
    : isError
      ? 'Não foi possível confirmar sua reserva agora. Tente novamente.'
      : null;

  return (
    <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
      <section className="flex flex-col items-center gap-6 text-center">
        <Spotlight
          src="/placeholder-room.svg"
          alt="Sala de jantar em luz âmbar, mesas espaçadas"
          size="hero"
        />
        <div className="space-y-2">
          <h1 className="text-display-xl font-display text-balance">
            Reserve sua mesa
          </h1>
          <p className="text-body-md font-body text-stone max-w-md text-pretty m-auto">
            Terça a sábado, das 19h às 23h. Escolha data, horário e o número de
            pessoas.
          </p>
        </div>
      </section>

      {isSuccess && data ? (
        <section className="space-y-6">
          <h2 className="text-display-lg font-display">Reserva confirmada.</h2>
          <dl className="space-y-4 border-t border-stone/20 pt-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="text-body-sm font-body text-stone sm:w-28">
                Data
              </dt>
              <dd className="text-body-md font-mono text-ivory">{data.date}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="text-body-sm font-body text-stone sm:w-28">
                Horário
              </dt>
              <dd className="text-body-md font-mono text-ivory">{data.time}</dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="text-body-sm font-body text-stone sm:w-28">
                Pessoas
              </dt>
              <dd className="text-body-md font-mono text-ivory">
                {data.partySize}
              </dd>
            </div>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="text-body-sm font-body text-stone sm:w-28">
                Nome
              </dt>
              <dd className="text-body-md font-body text-ivory">{data.name}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={handleReset}
            className="text-body-md font-body text-brass underline-offset-4 transition-[text-decoration-color] duration-150 hover:underline"
          >
            Nova reserva
          </button>
        </section>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <fieldset
            disabled={isPending}
            className="grid grid-cols-1 gap-x-6 gap-y-8 border-none sm:grid-cols-12"
          >
            <div className="sm:col-span-4">
              <label htmlFor="reservation-date" className={labelClass}>
                Data
              </label>
              <input
                id="reservation-date"
                type="date"
                min={today}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                aria-invalid={attemptedSubmit && !date ? 'true' : undefined}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-8">
              <span className={labelClass}>Pessoas</span>
              <QuantitySelector value={partySize} onChange={setPartySize} />
            </div>

            <div className="sm:col-span-12">
              <span className={labelClass}>Horário</span>
              <TimeSlotPicker
                slots={TIME_SLOTS}
                value={time}
                onChange={setTime}
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="reservation-name" className={labelClass}>
                Nome
              </label>
              <input
                id="reservation-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={
                  attemptedSubmit && !name.trim() ? 'true' : undefined
                }
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="reservation-phone" className={labelClass}>
                Telefone
              </label>
              <input
                id="reservation-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-invalid={
                  attemptedSubmit && !phone.trim() ? 'true' : undefined
                }
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="reservation-email" className={labelClass}>
                E-mail (opcional)
              </label>
              <input
                id="reservation-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-12">
              <label htmlFor="reservation-notes" className={labelClass}>
                Observações (opcional)
              </label>
              <textarea
                id="reservation-notes"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className={inputClass}
              />
            </div>
          </fieldset>

          <p role="alert" className="min-h-6 text-body-sm font-body text-wine">
            {alertMessage}
          </p>

          <button
            type="submit"
            disabled={isPending}
            className="bg-brass px-6 py-3 text-body-md font-body text-basalt transition-opacity duration-150 hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? 'Confirmando…' : 'Confirmar reserva'}
          </button>
        </form>
      )}
    </div>
  );
}
