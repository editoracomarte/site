import booksData from '@/db/books.json';

const slugToCover: Record<string, string> = Object.fromEntries(
  booksData.map((b) => [b.slug, b.cover_url]),
);

export function getCoverUrl(slug: string, apiUrl?: string): string {
  if (apiUrl) return apiUrl;
  const filename = slugToCover[slug];
  if (filename) return `/covers/${filename}`;
  return 'https://placehold.co/600x600';
}
