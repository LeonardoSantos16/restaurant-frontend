import { useMutation } from '@tanstack/react-query';
import { createReservation } from '@/services/reservationService';

export function useCreateReservation() {
  return useMutation({ mutationFn: createReservation });
}
