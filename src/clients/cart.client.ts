import { IHttpClient, PactumSpec } from './http-client.interface';
import { CreateCartRequestDto } from '../dto/cart.dto';

export class CartClient {
  constructor(private readonly http: IHttpClient) {}

  create(payload: CreateCartRequestDto, token: string): PactumSpec {
    return this.http.request({
      method: 'POST',
      path: '/carrinhos',
      body: payload,
      token,
    });
  }

  getById(cartId: string): PactumSpec {
    return this.http.request({
      method: 'GET',
      path: `/carrinhos/${cartId}`,
    });
  }
}
