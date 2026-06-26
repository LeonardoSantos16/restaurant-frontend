import { setupServer } from 'msw/node';
import { menuHandlers } from '@/mocks/handlers/menu';

export const server = setupServer(...menuHandlers);
