import { IHttpClient, PactumSpec } from './http-client.interface';
import { LoginRequestDto } from '../dto/auth.dto';

export class AuthClient {
  constructor(private readonly http: IHttpClient) {}

  login(payload: LoginRequestDto): PactumSpec {
    return this.http.request({
      method: 'POST',
      path: '/login',
      body: payload,
    });
  }
}
