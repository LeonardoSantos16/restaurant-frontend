import type { MenuItem } from '@/types/menu';

/** Popularity at/above this threshold earns the "mais pedido" badge. */
export const POPULAR_THRESHOLD = 85;

export function isPopular(item: MenuItem): boolean {
  return item.popularity >= POPULAR_THRESHOLD;
}

export function isSoldOut(item: MenuItem): boolean {
  return item.available === false;
}

/** Other items in the same category as `current`, excluding it. Source order, capped at `limit`. */
export function relatedItems(
  items: MenuItem[],
  current: MenuItem,
  limit = 3,
): MenuItem[] {
  return items
    .filter(
      (item) => item.category === current.category && item.id !== current.id,
    )
    .slice(0, limit);
}
