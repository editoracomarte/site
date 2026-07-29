import { apiGet } from '@/api/http';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export type ContactAddress = {
  street: string;
  complement1: string | null;
  complement2: string | null;
  district: string;
  cep: string;
  city: string;
  state: string;
  country: string;
};

export type Contact = {
  phone: string;
  email: string;
  organization: string;
  copyright: string;
  content: BlocksContent;
  address: ContactAddress;
};

type ApiContact = Omit<Contact, 'address'> & { address: ContactAddress[] };

export async function getContact(): Promise<Contact> {
  const res = await apiGet<{ data: ApiContact }>('/contact?populate=address');
  const { address, ...rest } = res.data;
  return { ...rest, address: address[0] };
}
