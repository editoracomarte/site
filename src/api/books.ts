import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';
import type { ApiAuthor } from './authors';

export type ApiBook = {
  slug: string;
  titulo: string;
  autoria: ApiAuthor[];
};

export type Book = {
  slug: string;
  title: string;
  autoria: string;
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
    autoria: book.autoria.map((author) => author.nome).join(', '),
  };
}

export async function getBooks(params: GetBooksParams = {}): Promise<BooksListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 24;

  const qs = new URLSearchParams();
  qs.set('pagination[page]', String(page));
  qs.set('pagination[pageSize]', String(pageSize));
  qs.set('fields[0]', 'titulo');
  qs.set('fields[1]', 'slug');
  qs.set('populate', 'autoria');
  // qs.set('sort', 'title:asc');

  const res = await apiGet<StrapiCollectionResponse<ApiBook>>(`/obras?${qs.toString()}`);

  return {
    data: res.data.map(convertApiBook),
    pagination: res.meta?.pagination,
  };
}
