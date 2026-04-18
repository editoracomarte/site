import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';

export type ApiBook = {
  slug: string;
  titulo: string;
};

export type Book = {
  slug: string;
  title: string;
};

export type BooksListResult = {
  data: Book[];
  pagination?: StrapiMetaPagination;
};

export type GetBooksParams = {
  page?: number;
  pageSize?: number;
};

function convertApiBook(book: ApiBook): Book {
  return {
    slug: book.slug,
    title: book.titulo,
  };
}

export async function getBooks(params: GetBooksParams = {}): Promise<BooksListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 12;

  const qs = new URLSearchParams();
  qs.set('pagination[page]', String(page));
  qs.set('pagination[pageSize]', String(pageSize));
  qs.set('fields[0]', 'titulo');
  qs.set('fields[1]', 'slug');
  // qs.set('sort', 'title:asc');
  // qs.set('populate', '*');

  const res = await apiGet<StrapiCollectionResponse<ApiBook>>(`/obras?${qs.toString()}`);

  return {
    data: res.data.map(convertApiBook),
    pagination: res.meta?.pagination,
  };
}
