import type { ContactAddress } from '@/api/contact';

export function phoneDigits(phone: string | null | undefined): string {
  return (phone ?? '').replace(/\D/g, '');
}

export function phoneHref(phone: string | null | undefined): string {
  return `tel:+55${phoneDigits(phone)}`;
}

export function phoneAriaLabel(phone: string | null | undefined): string {
  const digits = phoneDigits(phone);
  return `DDD ${digits.slice(0, 2)} ${digits.slice(2).split('').join(' ')}`;
}

export function addressLine(address: ContactAddress): string {
  return [address.street, address.complement1, address.complement2].filter(Boolean).join(' — ');
}

export function addressLocality(address: ContactAddress): string {
  const districtCep = [address.district, address.cep ? `CEP ${address.cep}` : null]
    .filter(Boolean)
    .join(', ');
  return [districtCep, address.city, address.state, address.country].filter(Boolean).join(' — ');
}
