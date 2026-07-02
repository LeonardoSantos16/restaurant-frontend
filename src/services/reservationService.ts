import type { Reservation, ReservationRequest } from '@/types/reservation';

const BASE_URL = '/api';

export async function createReservation(
  request: ReservationRequest,
): Promise<Reservation> {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error('Failed to create reservation');
  return response.json() as Promise<Reservation>;
}
