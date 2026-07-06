import { useQuery } from '@tanstack/react-query';
import { getCollections } from '@/api/collections';
import { queryKeys } from './queryKeys';

export function useCollectionsQuery() {
  return useQuery({
    queryKey: queryKeys.collections.list(),
    queryFn: getCollections,
    staleTime: 60_000,
  });
}
