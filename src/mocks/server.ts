import { setupServer } from 'msw/node';
import { menuHandlers } from '@/mocks/handlers/menu';
import { reservationHandlers } from '@/mocks/handlers/reservations';

export const server = setupServer(...menuHandlers, ...reservationHandlers);
