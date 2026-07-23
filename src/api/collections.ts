import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse } from '@/api/types';

type ApiCollection = {
  name: string;
  slug: string;
  books?: { slug: string }[];
};

export type Collection = {
  name: string;
  slug: string;
};

export async function getCollections(): Promise<Collection[]> {
  const qs = new URLSearchParams();
  qs.set('fields[0]', 'name');
  qs.set('fields[1]', 'slug');
  qs.set('populate[books][fields][0]', 'slug');

  const res = await apiGet<StrapiCollectionResponse<ApiCollection>>(`/collections?${qs.toString()}`);

  return [...res.data]
    .sort((a, b) => (b.books?.length ?? 0) - (a.books?.length ?? 0))
    .map((c) => ({ name: c.name, slug: c.slug }));
}
