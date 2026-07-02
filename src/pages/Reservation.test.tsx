import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { server } from '@/mocks/server';
import Reservation from '@/pages/Reservation';

function renderReservation() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/reservas']}>
        <Reservation />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  fireEvent.change(screen.getByLabelText('Data'), {
    target: { value: '2026-08-01' },
  });
  await user.click(screen.getByRole('button', { name: '19:30' }));
  await user.type(screen.getByLabelText('Nome'), 'Maria Silva');
  await user.type(screen.getByLabelText('Telefone'), '11999998888');
}

describe('Reservation', () => {
  it('renders the hero and all fixed time slots', () => {
    renderReservation();

    expect(
      screen.getByRole('heading', { name: /reserve sua mesa/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '19:00' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '22:00' })).toBeInTheDocument();
  });

  it('blocks submission and shows a validation message when required fields are empty', async () => {
    const user = userEvent.setup();
    renderReservation();

    await user.click(
      screen.getByRole('button', { name: /confirmar reserva/i }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /data, horário, nome, telefone/i,
    );
    expect(screen.queryByText('Reserva confirmada.')).toBeNull();
  });

  it('marks only the selected time slot as current', async () => {
    const user = userEvent.setup();
    renderReservation();

    await user.click(screen.getByRole('button', { name: '20:00' }));

    expect(screen.getByRole('button', { name: '20:00' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: '19:00' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('adjusts the party size via the quantity selector', async () => {
    const user = userEvent.setup();
    renderReservation();

    expect(screen.getByText('2')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /aumentar/i }));

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows a confirmation summary after a successful submission, and resets on "Nova reserva"', async () => {
    const user = userEvent.setup();
    renderReservation();

    await fillRequiredFields(user);
    await user.click(
      screen.getByRole('button', { name: /confirmar reserva/i }),
    );

    expect(await screen.findByText('Reserva confirmada.')).toBeInTheDocument();
    expect(screen.getByText('19:30')).toBeInTheDocument();
    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /confirmar reserva/i }),
    ).toBeNull();

    await user.click(screen.getByRole('button', { name: /nova reserva/i }));

    expect(
      screen.getByRole('button', { name: /confirmar reserva/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toHaveValue('');
  });

  it('shows an error message and keeps the form when the request fails', async () => {
    server.use(
      http.post('/api/reservations', () =>
        HttpResponse.json(null, { status: 500 }),
      ),
    );
    const user = userEvent.setup();
    renderReservation();

    await fillRequiredFields(user);
    await user.click(
      screen.getByRole('button', { name: /confirmar reserva/i }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /não foi possível confirmar/i,
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /confirmar reserva/i }),
      ).toBeInTheDocument(),
    );
  });
});
