import { Link } from 'react-router';
import { Spotlight } from '@/components/Spotlight';

export default function About() {
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
            Uma sala de luz âmbar, uma refeição sem pressa.
          </h1>
          <p className="text-body-md font-body text-stone max-w-md text-pretty m-auto">
            Cozinha contemporânea no centro da cidade. Ingredientes da estação,
            espaço generoso, atenção que não se apressa.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <p className="text-body-lg font-body text-pretty">
          Âmbar nasceu de uma ideia simples: um bom jantar pede tempo.
          Trabalhamos com o que a estação oferece e servimos cada prato quando
          ele está pronto — o menu muda com os ingredientes, não com o
          calendário.
        </p>
        <p className="text-body-lg font-body text-pretty">
          A sala foi desenhada para a conversa. Luz baixa e quente, distância
          confortável entre as mesas, o ritmo de uma refeição inteira sem
          interrupção. A cozinha é o protagonista; o resto é moldura.
        </p>
      </section>

      <section className="border-t border-stone/20 pt-8">
        <dl className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="text-body-sm font-body text-stone sm:w-28">
              Horários
            </dt>
            <dd className="text-body-md text-ivory">
              Terça a sábado, <span className="font-mono">19h–23h</span>
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="text-body-sm font-body text-stone sm:w-28">
              Endereço
            </dt>
            <dd className="text-body-md font-body text-ivory">
              Rua Exemplo, <span className="font-mono">000</span> · Bairro,
              Cidade
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <dt className="text-body-sm font-body text-stone sm:w-28">
              Reservas
            </dt>
            <dd className="text-body-md font-body text-ivory">
              <span className="font-mono">(11) 0000-0000</span> ·
              reservas@ambar.com.br
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <Link
          to="/reservas"
          className="text-body-md font-body text-brass underline-offset-4 transition-[text-decoration-color] duration-150 hover:underline"
        >
          Reservar uma mesa →
        </Link>
      </section>
    </div>
  );
}
