import { apiGet } from '@/api/http';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export type Publish = {
  content: BlocksContent;
};

export async function getPublish(): Promise<Publish> {
  const res = await apiGet<{ data: Publish }>('/book-submission');
  return res.data;
}
