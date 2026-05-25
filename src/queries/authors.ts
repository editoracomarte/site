import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getAuthors } from '@/api/authors';
import { queryKeys } from './queryKeys';

export function useAuthorsQuery(params?: { page?: number; pageSize?: number }) {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 100;

  return useQuery({
    queryKey: queryKeys.authors.list({ page, pageSize }),
    queryFn: () => getAuthors({ page, pageSize }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
