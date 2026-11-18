import { spec } from 'pactum';
import { env } from '../config/env';
import { IHttpClient, PactumSpec, RequestOptions } from './http-client.interface';

export class PactumHttpClient implements IHttpClient {
  constructor(private readonly baseUrl: string = env.baseUrl) {}

  request(options: RequestOptions): PactumSpec {
    const method = (options.method ?? 'GET').toLowerCase() as
      | 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'patch';

    const requestSpec = spec();
    requestSpec[method](`${this.baseUrl}${options.path}`);
    requestSpec.withHeaders({
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.token ? { Authorization: options.token } : {}),
      ...options.headers,
    });

    if (options.body !== undefined && options.body !== null) {
      requestSpec.withJson(options.body as object);
    }

    return requestSpec;
  }
}
