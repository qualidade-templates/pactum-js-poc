import { IHttpClient, PactumSpec } from './http-client.interface';
import { CreateUserRequestDto } from '../dto/user.dto';

export class UserClient {
  constructor(private readonly http: IHttpClient) {}

  create(payload: CreateUserRequestDto): PactumSpec {
    return this.http.request({
      method: 'POST',
      path: '/usuarios',
      body: payload,
    });
  }
}
