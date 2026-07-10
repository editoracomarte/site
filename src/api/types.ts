export type StrapiMetaPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta?: {
    pagination?: StrapiMetaPagination;
  };
};
