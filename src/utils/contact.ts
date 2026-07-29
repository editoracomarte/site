import type { ContactAddress } from '@/api/contact';

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function phoneHref(phone: string): string {
  return `tel:+55${phoneDigits(phone)}`;
}

export function phoneAriaLabel(phone: string): string {
  const digits = phoneDigits(phone);
  return `DDD ${digits.slice(0, 2)} ${digits.slice(2).split('').join(' ')}`;
}

export function addressLine(address: ContactAddress): string {
  return [address.street, address.complement1, address.complement2].filter(Boolean).join(' — ');
}

export function addressLocality(address: ContactAddress): string {
  return `${address.district}, CEP ${address.cep} — ${address.city} — ${address.state} — ${address.country}`;
}
