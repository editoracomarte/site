import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse } from '@/api/types';

type ApiCollection = {
  nome: string;
  slug: string;
  obras?: { slug: string }[];
};

export type Collection = {
  name: string;
  slug: string;
};

export async function getCollections(): Promise<Collection[]> {
  const qs = new URLSearchParams();
  qs.set('fields[0]', 'nome');
  qs.set('fields[1]', 'slug');
  qs.set('populate[obras][fields][0]', 'slug');

  const res = await apiGet<StrapiCollectionResponse<ApiCollection>>(`/colecoes?${qs.toString()}`);

  return [...res.data]
    .sort((a, b) => (b.obras?.length ?? 0) - (a.obras?.length ?? 0))
    .map((c) => ({ name: c.nome, slug: c.slug }));
}
