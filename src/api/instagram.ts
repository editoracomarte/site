import { apiGet } from '@/api/http';

export type InstagramPost = { url: string };

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const res = await apiGet<{ data: { posts: InstagramPost[] } }>('/instagram');
  return res.data.posts ?? [];
}
