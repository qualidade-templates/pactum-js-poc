import { IHttpClient } from '../clients/http-client.interface';
import { CadastroResponseDto } from '../dto/common.dto';
import { CreateUserRequestDto } from '../dto/user.dto';

export class UserService {
  constructor(private readonly http: IHttpClient) {}

  async create(payload: CreateUserRequestDto): Promise<CadastroResponseDto> {
    const response = await this.http
      .request({
        method: 'POST',
        path: '/usuarios',
        body: payload,
      })
      .expectStatus(201)
      .expectJsonLike({
        message: 'Cadastro realizado com sucesso',
        _id: /^[a-zA-Z0-9]+$/,
      })
      .toss();

    return response.body as CadastroResponseDto;
  }
}
