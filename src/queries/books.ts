import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getBook, getBooks, getFeaturedBooks, getRelatedBooks } from '@/api/books';
import { queryKeys } from './queryKeys';

export function useBookQuery(params: { slug: string }) {
  return useQuery({
    queryKey: queryKeys.books.get(params),
    queryFn: () => getBook(params.slug),
    staleTime: 60_000,
  });
}

export function useFeaturedBooksQuery() {
  return useQuery({
    queryKey: queryKeys.books.featured(),
    queryFn: getFeaturedBooks,
    staleTime: 60_000,
  });
}

export function useRelatedBooksQuery(params: { slug: string; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.books.related(params),
    queryFn: () => getRelatedBooks(params.slug, params.limit),
    staleTime: 60_000,
    enabled: Boolean(params.slug),
  });
}

export function useBooksQuery(params?: { page?: number; pageSize?: number; search?: string }) {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 24;
  const search = params?.search?.trim() ?? '';

  return useQuery({
    queryKey: queryKeys.books.list({ page, pageSize, search }),
    queryFn: () => getBooks({ page, pageSize, search }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}
