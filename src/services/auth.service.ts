import { IHttpClient } from '../clients/http-client.interface';
import { LoginRequestDto, LoginResponseDto } from '../dto/auth.dto';

export class AuthService {
  constructor(private readonly http: IHttpClient) {}

  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await this.http
      .request({
        method: 'POST',
        path: '/login',
        body: payload,
      })
      .expectStatus(200)
      .expectJsonLike({
        message: 'Login realizado com sucesso',
        authorization: /^Bearer\s.+/,
      })
      .toss();

    return response.body as LoginResponseDto;
  }
}
