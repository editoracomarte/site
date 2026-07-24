import { useQuery, useQueries, keepPreviousData } from '@tanstack/react-query';
import { getBook, getBooks, getFeaturedBooks } from '@/api/books';
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

export function useBooksBySlugQueries(slugs: string[]) {
  return useQueries({
    queries: slugs.map((slug) => ({
      queryKey: queryKeys.books.get({ slug }),
      queryFn: () => getBook(slug),
      staleTime: 60_000,
    })),
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
