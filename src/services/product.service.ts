import { IHttpClient } from '../clients/http-client.interface';
import { CadastroResponseDto } from '../dto/common.dto';
import { CreateProductRequestDto } from '../dto/product.dto';

export class ProductService {
  constructor(private readonly http: IHttpClient) {}

  async create(payload: CreateProductRequestDto, token: string): Promise<CadastroResponseDto> {
    const response = await this.http
      .request({
        method: 'POST',
        path: '/produtos',
        body: payload,
        token,
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
