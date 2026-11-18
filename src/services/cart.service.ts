import { IHttpClient } from '../clients/http-client.interface';
import { CadastroResponseDto } from '../dto/common.dto';
import { CartResponseDto, CreateCartRequestDto } from '../dto/cart.dto';

export class CartService {
  constructor(private readonly http: IHttpClient) {}

  async create(payload: CreateCartRequestDto, token: string): Promise<CadastroResponseDto> {
    const response = await this.http
      .request({
        method: 'POST',
        path: '/carrinhos',
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

  async getById(cartId: string): Promise<CartResponseDto> {
    const response = await this.http
      .request({
        method: 'GET',
        path: `/carrinhos/${cartId}`,
      })
      .expectStatus(200)
      .expectJsonLike({
        _id: cartId,
        idUsuario: /^[a-zA-Z0-9]+$/,
      })
      .toss();

    return response.body as CartResponseDto;
  }
}
