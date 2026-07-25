import { useQuery } from '@tanstack/react-query';
import { getAboutUs } from '@/api/aboutUs';
import { queryKeys } from '@/queries/queryKeys';

export function useAboutUsQuery() {
  return useQuery({
    queryKey: queryKeys.aboutUs(),
    queryFn: getAboutUs,
    staleTime: 5 * 60_000,
  });
}
