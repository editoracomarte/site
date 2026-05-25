export const queryKeys = {
  authors: {
    list: (params: { page: number; pageSize: number }) => ['authors', 'list', params] as const,
  },
  books: {
    list: (params: { page: number; pageSize: number }) => ['books', 'list', params] as const,
  },
};
