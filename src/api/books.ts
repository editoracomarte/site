import { apiGet, strapiUrl } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

type ApiBook = {
  slug: string;
  title: string;
  publishing_year?: number | null;
  description?: BlocksContent;
  isbn?: string | null;
  issn?: string | null;
  format?: string | null;
  page_num?: number | null;
  store_url?: string | null;
  authors?: { name: string; slug: string }[];
  collections?: { name: string; slug: string }[];
  genres?: { name: string; slug: string }[];
  cover?: { url: string } | null;
  sample?: { url: string } | null;
};

export type Book = {
  slug: string;
  title: string;
  autoria?: string;
  coverUrl?: string;
};

export type BookDetail = {
  slug: string;
  title: string;
  description: BlocksContent;
  isbn: string;
  issn: string;
  format: string;
  pages: number | null;
  publishingYear: number;
  autoria: string;
  collection: string;
  genres: string[];
  coverUrl?: string;
  storeUrl?: string;
};

export type BooksListResult = {
  data: Book[];
  pagination?: StrapiMetaPagination;
};

export type GetBooksParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  collectionSlug?: string;
};

export async function getBook(slug: string): Promise<BookDetail> {
  const res = await apiGet<{ data: ApiBook }>(`/book/${slug}`);
  const raw = res.data;

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description ?? [],
    isbn: raw.isbn ?? '',
    issn: raw.issn ?? '',
    format: raw.format ?? '',
    pages: raw.page_num ?? null,
    publishingYear: raw.publishing_year ?? 0,
    autoria: raw.authors?.map((a) => a.name).join(', ') ?? '',
    collection: raw.collections?.[0]?.name ?? '',
    genres: raw.genres?.map((g) => g.name) ?? [],
    coverUrl: strapiUrl(raw.cover?.url),
    storeUrl: raw.store_url ?? undefined,
  };
}

export async function getFeaturedBooks(): Promise<BooksListResult> {
  const res = await apiGet<{ data: ApiBook[] }>('/books/featured');
  return {
    data: res.data.map((book) => ({
      slug: book.slug,
      title: book.title,
      coverUrl: strapiUrl(book.cover?.url),
    })),
  };
}

export async function getRelatedBooks(slug: string, limit?: number): Promise<Book[]> {
  const qs = new URLSearchParams();
  if (limit) qs.set('limit', String(limit));
  const query = qs.toString();

  const res = await apiGet<{ data: ApiBook[] }>(
    `/books/${slug}/related${query ? `?${query}` : ''}`,
  );

  return res.data.map((book) => ({
    slug: book.slug,
    title: book.title,
    coverUrl: strapiUrl(book.cover?.url),
  }));
}

export async function getBooks(params: GetBooksParams = {}): Promise<BooksListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 24;
  const search = params.search?.trim() ?? '';
  const collectionSlug = params.collectionSlug?.trim() ?? '';

  const qs = new URLSearchParams();
  qs.set('pagination[page]', String(page));
  qs.set('pagination[pageSize]', String(pageSize));
  qs.set('fields[0]', 'title');
  qs.set('fields[1]', 'slug');
  qs.set('populate[authors][fields][0]', 'name');
  qs.set('populate[cover][fields][0]', 'url');

  // Busca livre sobre título, nome de autor e nome de coleção.
  if (search) {
    qs.set('filters[$or][0][title][$containsi]', search);
    qs.set('filters[$or][1][authors][name][$containsi]', search);
    qs.set('filters[$or][2][collections][name][$containsi]', search);
  }

  if (collectionSlug) {
    qs.set('filters[collections][slug][$eq]', collectionSlug);
  }

  const res = await apiGet<StrapiCollectionResponse<ApiBook>>(`/books?${qs.toString()}`);

  return {
    data: res.data.map((book) => ({
      slug: book.slug,
      title: book.title,
      autoria: book.authors?.map((a) => a.name).join(', ') ?? '',
      coverUrl: strapiUrl(book.cover?.url),
    })),
    pagination: res.meta?.pagination,
  };
}
