import { useQuery } from '@tanstack/react-query';
import { searchMenu } from '@/services/menuService';

export function useMenuSearch(query: string) {
  return useQuery({
    queryKey: ['menu', 'search', query],
    queryFn: () => searchMenu(query),
    enabled: query.trim().length > 0,
  });
}
