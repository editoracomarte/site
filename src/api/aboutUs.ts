import { apiGet } from '@/api/http';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export type AboutUs = {
  content: BlocksContent;
};

export async function getAboutUs(): Promise<AboutUs> {
  const res = await apiGet<{ data: AboutUs }>('/about-us');
  return res.data;
}
