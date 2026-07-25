import { useQuery } from '@tanstack/react-query';
import { getInstagramPosts } from '@/api/instagram';
import { queryKeys } from '@/queries/queryKeys';

export function useInstagramFeedQuery() {
  return useQuery({
    queryKey: queryKeys.instagram.feed(),
    queryFn: getInstagramPosts,
    staleTime: 60_000,
  });
}
