import { http, HttpResponse } from 'msw';
import type { Reservation, ReservationRequest } from '@/types/reservation';

export const reservationHandlers = [
  http.post('/api/reservations', async ({ request }) => {
    const body = (await request.json()) as ReservationRequest;

    if (!body.date || !body.time || !body.name || !body.phone) {
      return HttpResponse.json(
        { message: 'Campos obrigatórios ausentes.' },
        { status: 400 },
      );
    }

    const reservation: Reservation = {
      ...body,
      id: crypto.randomUUID(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    return HttpResponse.json(reservation, { status: 201 });
  }),
];
