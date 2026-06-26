import { useQuery } from '@tanstack/react-query';
import { getMenu, getMenuItem } from '@/services/menuService';

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
