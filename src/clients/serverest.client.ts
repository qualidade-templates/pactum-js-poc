import { IHttpClient } from './http-client.interface';
import { PactumHttpClient } from './pactum-http.client';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

/**
 * Facade do domínio ServeRest.
 * Agrupa os services e centraliza a injeção do HttpClient.
 */
export class ServeRestClient {
  readonly users: UserService;
  readonly auth: AuthService;
  readonly products: ProductService;
  readonly carts: CartService;

  constructor(httpClient: IHttpClient = new PactumHttpClient()) {
    this.users = new UserService(httpClient);
    this.auth = new AuthService(httpClient);
    this.products = new ProductService(httpClient);
    this.carts = new CartService(httpClient);
  }
}
