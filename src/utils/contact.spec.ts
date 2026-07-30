import type { ContactAddress } from '@/api/contact';
import { addressLine, addressLocality, phoneAriaLabel, phoneDigits, phoneHref } from './contact';

describe('phoneDigits', () => {
  it('strips non-digit characters', () => {
    expect(phoneDigits('(11) 3091-4016')).toBe('1130914016');
  });

  it('returns an empty string for null or undefined', () => {
    expect(phoneDigits(null)).toBe('');
    expect(phoneDigits(undefined)).toBe('');
  });
});

describe('phoneHref', () => {
  it('builds a tel: link with the Brazil country code', () => {
    expect(phoneHref('(11) 3091-4016')).toBe('tel:+551130914016');
  });

  it('degrades to just the country code when the phone is blank', () => {
    expect(phoneHref(null)).toBe('tel:+55');
  });
});

describe('phoneAriaLabel', () => {
  it('spells out the DDD and remaining digits one by one', () => {
    expect(phoneAriaLabel('(11) 3091-4016')).toBe('DDD 11 3 0 9 1 4 0 1 6');
  });

  it('does not throw for a blank phone', () => {
    expect(phoneAriaLabel(null)).toBe('DDD  ');
  });
});

const baseAddress: ContactAddress = {
  street: 'Av. Prof. Lúcio Martins Rodrigues, 443 — Prédio 2',
  complement1: 'Sala 10',
  complement2: null,
  district: 'Cidade Universitária',
  cep: '05508-020',
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
};

describe('addressLine', () => {
  it('joins street and complements with an em dash', () => {
    expect(addressLine(baseAddress)).toBe(
      'Av. Prof. Lúcio Martins Rodrigues, 443 — Prédio 2 — Sala 10',
    );
  });

  it('skips blank complements', () => {
    expect(addressLine({ ...baseAddress, complement1: null })).toBe(
      'Av. Prof. Lúcio Martins Rodrigues, 443 — Prédio 2',
    );
  });

  it('returns an empty string when every field is blank', () => {
    expect(
      addressLine({ ...baseAddress, street: null, complement1: null, complement2: null }),
    ).toBe('');
  });
});

describe('addressLocality', () => {
  it('formats district, CEP, city, state and country', () => {
    expect(addressLocality(baseAddress)).toBe(
      'Cidade Universitária, CEP 05508-020 — São Paulo — SP — Brasil',
    );
  });

  it('drops the CEP when blank but keeps the district', () => {
    expect(addressLocality({ ...baseAddress, cep: null })).toBe(
      'Cidade Universitária — São Paulo — SP — Brasil',
    );
  });

  it('drops the district when blank but keeps the CEP', () => {
    expect(addressLocality({ ...baseAddress, district: null })).toBe(
      'CEP 05508-020 — São Paulo — SP — Brasil',
    );
  });

  it('returns an empty string when every field is blank', () => {
    expect(
      addressLocality({
        street: null,
        complement1: null,
        complement2: null,
        district: null,
        cep: null,
        city: null,
        state: null,
        country: null,
      }),
    ).toBe('');
  });
});
