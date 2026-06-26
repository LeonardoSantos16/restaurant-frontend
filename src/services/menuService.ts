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
