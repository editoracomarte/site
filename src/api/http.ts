export class ApiHttpError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'ApiHttpError';
    this.status = status;
    this.body = body;
  }
}

const API_URL = import.meta.env.VITE_API_URL as string | undefined;
const API_TOKEN = import.meta.env.VITE_API_TOKEN as string | undefined;

if (!API_URL) throw new Error('Missing VITE_API_URL');

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    },
  });

  const body = await res.json().catch(() => undefined);

  if (!res.ok) {
    const msg =
      body?.error?.message ?? body?.message ?? `Strapi request failed with status ${res.status}`;
    throw new ApiHttpError(String(msg), res.status, body);
  }

  return body as T;
}
