export const queryKeys = {
  books: {
    list: (params: { page: number; pageSize: number }) => ['books', 'list', params] as const,
  },
};
