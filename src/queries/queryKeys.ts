export const queryKeys = {
  authors: {
    get: (params: { slug: string }) => ['authors', 'get', params] as const,
    list: (params: { page: number; pageSize: number }) => ['authors', 'list', params] as const,
  },
  books: {
    get: (params: { slug: string }) => ['books', 'get', params] as const,
    list: (params: { page: number; pageSize: number }) => ['books', 'list', params] as const,
    featured: () => ['books', 'featured'] as const,
  },
};
