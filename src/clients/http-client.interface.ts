import { spec } from 'pactum';

export type PactumSpec = ReturnType<typeof spec>;
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions {
  path: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  token?: string;
}

/**
 * Abstração do cliente HTTP (Dependency Inversion).
 * Services dependem desta interface, não do Pactum diretamente.
 */
export interface IHttpClient {
  request(options: RequestOptions): PactumSpec;
}
