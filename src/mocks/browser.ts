import { setupWorker } from 'msw/browser';
import { menuHandlers } from '@/mocks/handlers/menu';
import { reservationHandlers } from '@/mocks/handlers/reservations';

export const worker = setupWorker(...menuHandlers, ...reservationHandlers);
