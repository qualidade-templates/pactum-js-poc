import { IHttpClient, PactumSpec } from './http-client.interface';
import { CreateProductRequestDto } from '../dto/product.dto';

export class ProductClient {
  constructor(private readonly http: IHttpClient) {}

  create(payload: CreateProductRequestDto, token: string): PactumSpec {
    return this.http.request({
      method: 'POST',
      path: '/produtos',
      body: payload,
      token,
    });
  }
}
