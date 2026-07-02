import type { MenuItem } from '@/types/menu';

const BASE_URL = '/api';

export async function getMenu(): Promise<MenuItem[]> {
  const response = await fetch(`${BASE_URL}/menu`);
  if (!response.ok) throw new Error('Failed to fetch menu');
  return response.json() as Promise<MenuItem[]>;
}

export async function getMenuItem(id: string): Promise<MenuItem> {
  const response = await fetch(`${BASE_URL}/menu/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch menu item ${id}`);
  return response.json() as Promise<MenuItem>;
}

export async function searchMenu(query: string): Promise<MenuItem[]> {
  const term = query.trim().toLowerCase();
  if (!term) return [];
  const items = await getMenu();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term),
  );
}

export async function getFeaturedDish(): Promise<MenuItem | undefined> {
  const items = await getMenu();
  return items.find((item) => item.featured);
}

export async function getPopularDishes(limit = 3): Promise<MenuItem[]> {
  const items = await getMenu();
  return [...items].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}
