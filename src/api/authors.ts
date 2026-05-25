import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';

export type ApiAuthor = {
  nome: string;
  slug: string;
};

export type Author = {
  name: string;
  slug: string;
};

export type AuthorsListResult = {
  data: Author[];
  pagination?: StrapiMetaPagination;
};

export type GetAuthorsParams = {
  page?: number;
  pageSize?: number;
};

function convertApiAuthor(author: ApiAuthor): Author {
  return {
    slug: author.slug,
    name: author.nome,
  };
}

export async function getAuthors(params: GetAuthorsParams = {}): Promise<AuthorsListResult> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 100;

  const qs = new URLSearchParams();
  qs.set('pagination[page]', String(page));
  qs.set('pagination[pageSize]', String(pageSize));
  qs.set('fields[0]', 'nome');
  qs.set('fields[1]', 'slug');
  qs.set('sort', 'nome:asc');

  const res = await apiGet<StrapiCollectionResponse<ApiAuthor>>(`/autores?${qs.toString()}`);

  return {
    data: res.data.map(convertApiAuthor),
    pagination: res.meta?.pagination,
  };
}
