import { http, HttpResponse } from 'msw';
import menuData from '@/mocks/data/menu.json';

export const menuHandlers = [
  http.get('/api/menu', () => {
    return HttpResponse.json(menuData);
  }),

  http.get('/api/menu/:id', ({ params }) => {
    const item = menuData.find((i) => i.id === params['id']);
    if (!item) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(item);
  }),
];
