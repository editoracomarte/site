import { useQuery } from '@tanstack/react-query';
import { getPublish } from '@/api/publish';
import { queryKeys } from '@/queries/queryKeys';

export function usePublishQuery() {
  return useQuery({
    queryKey: queryKeys.publish(),
    queryFn: getPublish,
    staleTime: 5 * 60_000,
  });
}
