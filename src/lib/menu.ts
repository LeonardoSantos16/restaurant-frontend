import type { MenuItem } from '@/types/menu';

/** Popularity at/above this threshold earns the "mais pedido" badge. */
export const POPULAR_THRESHOLD = 85;

export function isPopular(item: MenuItem): boolean {
  return item.popularity >= POPULAR_THRESHOLD;
}

export function isSoldOut(item: MenuItem): boolean {
  return item.available === false;
}
