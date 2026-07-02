import { useQuery } from '@tanstack/react-query';
import {
  getFeaturedDish,
  getMenu,
  getMenuItem,
  getPopularDishes,
} from '@/services/menuService';

export function useMenu() {
  return useQuery({
    queryKey: ['menu'],
    queryFn: getMenu,
  });
}

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: ['menu', id],
    queryFn: () => getMenuItem(id),
    enabled: Boolean(id),
  });
}

export function useFeaturedDish() {
  return useQuery({
    queryKey: ['menu', 'featured'],
    queryFn: getFeaturedDish,
  });
}

export function usePopularDishes(limit = 3) {
  return useQuery({
    queryKey: ['menu', 'popular', limit],
    queryFn: () => getPopularDishes(limit),
  });
}
