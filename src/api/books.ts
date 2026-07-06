import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';

type ApiBook = {
  slug: string;
  titulo: string;
  anoDePublicacao?: number;
  descricao?: Record<string, unknown>[];
  isbn?: string;
  issn?: string;
  formato?: string;
  numeroDePaginas?: number | null;
  autoria?: { nome: string }[];
  colecao?: { nome: string }[];
  generos?: { nome: string }[];
};

export type Book = {
  slug: string;
  title: string;
  autoria: string;
};

export type BookDetail = {
  slug: string;
  title: string;
  description: Record<string, unknown>[];
  isbn: string;
  issn: string;
  format: string;
  pages: number | null;
  publishingYear: number;
  autoria: string;
  collection: string;
  genres: string[];
};

export type BooksListResult = {
  data: Book[];
  pagination?: StrapiMetaPagination;
};

export async function getBook(slug: string): Promise<BookDetail> {
  const qs = new URLSearchParams();
  qs.set('filters[slug][$eq]', slug);
  qs.set('fields[0]', 'titulo');
  qs.set('fields[1]', 'slug');
  qs.set('fields[2]', 'isbn');
  qs.set('fields[3]', 'issn');
  qs.set('fields[4]', 'formato');
  qs.set('fields[5]', 'numeroDePaginas');
  qs.set('fields[6]', 'anoDePublicacao');
  qs.set('fields[7]', 'descricao');
  qs.set('populate[autoria][fields][0]', 'nome');
  qs.set('populate[colecao][fields][0]', 'nome');
  qs.set('populate[generos][fields][0]', 'nome');

  const res = await apiGet<StrapiCollectionResponse<ApiBook>>(`/obras?${qs.toString()}`);
  const raw = res.data[0];

  return {
    slug: raw.slug,
    title: raw.titulo,
    description: raw.descricao ?? [],
    isbn: raw.isbn ?? '',
    issn: raw.issn ?? '',
    format: raw.formato ?? '',
    pages: raw.numeroDePaginas ?? null,
    publishingYear: raw.anoDePublicacao ?? 0,
    autoria: raw.autoria?.map((a) => a.nome).join(', ') ?? '',
    collection: raw.colecao?.[0]?.nome ?? '',
    genres: raw.generos?.map((g) => g.nome) ?? [],
  };
}

export async function getFeaturedBooks(): Promise<BooksListResult> {
  const res = await apiGet<{ data: ApiBook[] }>('/obras/featured');
  return {
    data: [...res.data].map((book) => ({ slug: book.slug, title: book.titulo, autoria: '' })),
  };
}

export async function getBooks(
  params: { page?: number; pageSize?: number } = {},
): Promise<BooksListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 24;

  const qs = new URLSearchParams();
  qs.set('pagination[page]', String(page));
  qs.set('pagination[pageSize]', String(pageSize));
  qs.set('fields[0]', 'titulo');
  qs.set('fields[1]', 'slug');
  qs.set('populate', 'autoria');

  const res = await apiGet<StrapiCollectionResponse<ApiBook>>(`/obras?${qs.toString()}`);

  return {
    data: res.data.map((book) => ({
      slug: book.slug,
      title: book.titulo,
      autoria: book.autoria?.map((a) => a.nome).join(', ') ?? '',
    })),
    pagination: res.meta?.pagination,
  };
}
