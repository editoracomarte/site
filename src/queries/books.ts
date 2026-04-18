import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getBooks } from '@/api/books';
import { queryKeys } from './queryKeys';

export function useBooksQuery(params?: { page?: number; pageSize?: number }) {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 12;

  return useQuery({
    queryKey: queryKeys.books.list({ page, pageSize }),
    queryFn: () => getBooks({ page, pageSize }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
