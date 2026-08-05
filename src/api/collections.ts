import { apiGet } from '@/api/http';
import type { StrapiCollectionResponse } from '@/api/types';

type ApiCollection = {
  name: string;
  slug: string;
  show_main_page: boolean;
  books?: { slug: string }[];
};

export type Collection = {
  name: string;
  slug: string;
};

const MAX_HOME_COLLECTIONS = 3;

export async function getCollections(): Promise<Collection[]> {
  const qs = new URLSearchParams();
  qs.set('fields[0]', 'name');
  qs.set('fields[1]', 'slug');
  qs.set('fields[2]', 'show_main_page');
  qs.set('populate[books][fields][0]', 'slug');

  const res = await apiGet<StrapiCollectionResponse<ApiCollection>>(
    `/collections?${qs.toString()}`,
  );

  const byBookCountDesc = [...res.data].sort(
    (a, b) => (b.books?.length ?? 0) - (a.books?.length ?? 0),
  );

  const selected = byBookCountDesc.filter((c) => c.show_main_page).slice(0, MAX_HOME_COLLECTIONS);

  if (selected.length < MAX_HOME_COLLECTIONS) {
    const filler = byBookCountDesc
      .filter((c) => !c.show_main_page)
      .slice(0, MAX_HOME_COLLECTIONS - selected.length);
    selected.push(...filler);
  }

  return selected.map((c) => ({ name: c.name, slug: c.slug }));
}
