import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export type ApiAuthor = {
  name: string;
  slug: string;
  description: BlocksContent;
  lattes?: string | null;
  orcid?: string | null;
  books?: { title: string; slug: string }[];
};

export type Author = {
  name: string;
  slug: string;
  description: BlocksContent;
  lattes?: string | null;
  orcid?: string | null;
  books?: { title: string; slug: string }[];
};

export type AuthorResult = {
  data: Author;
};

export type AuthorsListResult = {
  data: Author[];
  pagination?: StrapiMetaPagination;
};

export type GetAuthorParams = {
  slug: string;
};

export type GetAuthorsParams = {
  page?: number;
  pageSize?: number;
};

export async function getAuthor(params: GetAuthorParams): Promise<AuthorResult> {
  const res = await apiGet<{ data: ApiAuthor }>(`/author/${params.slug}`);
  return { data: res.data };
}

export async function getAuthors(params: GetAuthorsParams = {}): Promise<AuthorsListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 100;

  const qs = new URLSearchParams();
  qs.set('pagination[page]', String(page));
  qs.set('pagination[pageSize]', String(pageSize));
  qs.set('fields[0]', 'name');
  qs.set('fields[1]', 'slug');
  qs.set('sort', 'name:asc');

  const res = await apiGet<StrapiCollectionResponse<ApiAuthor>>(`/authors?${qs.toString()}`);

  return {
    data: res.data,
    pagination: res.meta?.pagination,
  };
}
