import { setupWorker } from 'msw/browser';
import { menuHandlers } from '@/mocks/handlers/menu';

export const worker = setupWorker(...menuHandlers);
