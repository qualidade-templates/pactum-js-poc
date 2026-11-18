import { IHttpClient } from './http-client.interface';
import { PactumHttpClient } from './pactum-http.client';
import { UserClient } from './user.client';
import { AuthClient } from './auth.client';
import { ProductClient } from './product.client';
import { CartClient } from './cart.client';

/**
 * Facade do domínio ServeRest.
 * Agrupa os clients e centraliza a injeção do HttpClient.
 */
export class ServeRestClient {
  readonly users: UserClient;
  readonly auth: AuthClient;
  readonly products: ProductClient;
  readonly carts: CartClient;

  constructor(httpClient: IHttpClient = new PactumHttpClient()) {
    this.users = new UserClient(httpClient);
    this.auth = new AuthClient(httpClient);
    this.products = new ProductClient(httpClient);
    this.carts = new CartClient(httpClient);
  }
}
