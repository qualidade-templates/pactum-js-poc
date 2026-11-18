import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { LoginResponseDto } from '../../src/dto/auth.dto';
import { CartResponseDto } from '../../src/dto/cart.dto';
import { CadastroResponseDto } from '../../src/dto/common.dto';
import { UserFactory } from '../../src/factories/user.factory';
import { ProductFactory } from '../../src/factories/product.factory';
import { CartFactory } from '../../src/factories/cart.factory';

describe('ServeRest — carrinhos', () => {
  const api = new ServeRestClient();

  it('cadastra carrinho e busca por id', async () => {
    const user = UserFactory.createAdmin();

    const userResponse = await api.users.create(user).expectStatus(201).toss();
    const createdUser = userResponse.body as CadastroResponseDto;

    const loginResponse = await api.auth
      .login({
        email: user.email,
        password: user.password,
      })
      .expectStatus(200)
      .toss();
    const { authorization } = loginResponse.body as LoginResponseDto;

    const product = ProductFactory.create({ quantidade: 20 });
    const productResponse = await api.products
      .create(product, authorization)
      .expectStatus(201)
      .toss();
    const createdProduct = productResponse.body as CadastroResponseDto;

    const cartResponse = await api.carts
      .create(CartFactory.withProduct(createdProduct._id, 1), authorization)
      .expectStatus(201)
      .expectJsonLike({
        message: 'Cadastro realizado com sucesso',
        _id: /^[a-zA-Z0-9]+$/,
      })
      .toss();
    const createdCart = cartResponse.body as CadastroResponseDto;

    const getResponse = await api.carts
      .getById(createdCart._id)
      .expectStatus(200)
      .expectJsonLike({
        _id: createdCart._id,
        idUsuario: createdUser._id,
      })
      .toss();

    const cart = getResponse.body as CartResponseDto;
    assert.strictEqual(cart.idUsuario, createdUser._id);
    assert.strictEqual(cart.produtos[0].idProduto, createdProduct._id);
    assert.strictEqual(cart.quantidadeTotal, 1);
    assert.strictEqual(cart.precoTotal, product.preco);
  });
});
