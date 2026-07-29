import { apiGet } from '@/api/http';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export type ContactAddress = {
  street: string | null;
  complement1: string | null;
  complement2: string | null;
  district: string | null;
  cep: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
};

export type Contact = {
  phone: string | null;
  email: string | null;
  organization: string | null;
  copyright: string | null;
  content: BlocksContent;
  address: ContactAddress | null;
};

type ApiContact = Omit<Contact, 'address'> & { address: ContactAddress[] };

export async function getContact(): Promise<Contact> {
  const res = await apiGet<{ data: ApiContact }>('/contact?populate=address');
  const { address, ...rest } = res.data;
  return { ...rest, address: address?.[0] ?? null };
}
