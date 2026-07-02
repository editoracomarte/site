import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getBooks, getFeaturedBooks } from '@/api/books';
import { queryKeys } from './queryKeys';

export function useFeaturedBooksQuery() {
  return useQuery({
    queryKey: queryKeys.books.featured(),
    queryFn: getFeaturedBooks,
    staleTime: 60_000,
  });
}

export function useBooksQuery(params?: { page?: number; pageSize?: number }) {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 24;

  return useQuery({
    queryKey: queryKeys.books.list({ page, pageSize }),
    queryFn: () => getBooks({ page, pageSize }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
