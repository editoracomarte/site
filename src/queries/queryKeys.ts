export const queryKeys = {
  aboutUs: () => ['about-us'] as const,
  publish: () => ['publish'] as const,
  instagram: {
    feed: () => ['instagram', 'feed'] as const,
  },
  collections: {
    list: () => ['collections', 'list'] as const,
  },
  authors: {
    get: (params: { slug: string }) => ['authors', 'get', params] as const,
    list: (params: { page: number; pageSize: number }) => ['authors', 'list', params] as const,
  },
  books: {
    get: (params: { slug: string }) => ['books', 'get', params] as const,
    list: (params: { page: number; pageSize: number; search: string }) =>
      ['books', 'list', params] as const,
    featured: () => ['books', 'featured'] as const,
  },
};
