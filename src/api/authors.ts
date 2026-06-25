import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse, StrapiMetaPagination } from '@/api/types';

export type ApiAuthor = {
  descricao: Record<string, unknown>;
  nome: string;
  slug: string;
};

export type Author = {
  description: Record<string, unknown>;
  name: string;
  slug: string;
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

function convertApiAuthor(author: ApiAuthor): Author {
  return {
    description: author.descricao,
    slug: author.slug,
    name: author.nome,
  };
}

export async function getAuthor(params: GetAuthorParams): Promise<AuthorResult> {
  const { slug } = params;

  const qs = new URLSearchParams();
  qs.set('filters[slug][$eq]', slug);

  const res = await apiGet<StrapiCollectionResponse<ApiAuthor>>(`/autores?${qs.toString()}`);

  return {
    data: convertApiAuthor(res.data[0]),
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
