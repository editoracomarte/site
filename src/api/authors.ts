import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export type Author = {
  name: string;
  slug: string;
  description: BlocksContent;
  lattes?: string | null;
  orcid?: string | null;
  books?: { title: string; slug: string }[];
};

export type AuthorsListResult = {
  data: Author[];
  pagination?: StrapiMetaPagination;
};

export async function getAuthor(slug: string): Promise<Author> {
  const res = await apiGet<{ data: Author }>(`/author/${slug}`);
  return res.data;
}

export async function getAuthors(
  params: { page?: number; pageSize?: number } = {},
): Promise<AuthorsListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 100;

  const qs = new URLSearchParams();
  qs.set('pagination[page]', String(page));
  qs.set('pagination[pageSize]', String(pageSize));
  qs.set('fields[0]', 'name');
  qs.set('fields[1]', 'slug');
  qs.set('sort', 'name:asc');

  const res = await apiGet<StrapiCollectionResponse<Author>>(`/authors?${qs.toString()}`);

  return {
    data: res.data,
    pagination: res.meta?.pagination,
  };
}
