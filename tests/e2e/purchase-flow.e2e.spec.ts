import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { LoginResponseDto } from '../../src/dto/auth.dto';
import { CartResponseDto } from '../../src/dto/cart.dto';
import { CadastroResponseDto } from '../../src/dto/common.dto';
import { UserFactory } from '../../src/factories/user.factory';
import { ProductFactory } from '../../src/factories/product.factory';
import { CartFactory } from '../../src/factories/cart.factory';

describe('ServeRest — fluxo E2E de compra', () => {
  const api = new ServeRestClient();

  it('cadastra usuario, faz login, cria produto, adiciona ao carrinho e valida', async () => {
    const user = UserFactory.createAdmin();
    const product = ProductFactory.create({ preco: 150, quantidade: 25 });
    const quantityInCart = 1;

    const userResponse = await api.users
      .create(user)
      .expectStatus(201)
      .expectJsonLike({
        message: 'Cadastro realizado com sucesso',
        _id: /^[a-zA-Z0-9]+$/,
      })
      .toss();
    const createdUser = userResponse.body as CadastroResponseDto;
    assert.ok(createdUser._id, 'userId deve ser retornado');

    const loginResponse = await api.auth
      .login({
        email: user.email,
        password: user.password,
      })
      .expectStatus(200)
      .expectJsonLike({
        message: 'Login realizado com sucesso',
        authorization: /^Bearer\s.+/,
      })
      .toss();
    const login = loginResponse.body as LoginResponseDto;
    assert.match(login.authorization, /^Bearer\s.+/);

    const productResponse = await api.products
      .create(product, login.authorization)
      .expectStatus(201)
      .expectJsonLike({
        message: 'Cadastro realizado com sucesso',
        _id: /^[a-zA-Z0-9]+$/,
      })
      .toss();
    const createdProduct = productResponse.body as CadastroResponseDto;
    assert.ok(createdProduct._id, 'produtoId deve ser retornado');

    const cartPayload = CartFactory.withProduct(createdProduct._id, quantityInCart);
    const cartResponse = await api.carts
      .create(cartPayload, login.authorization)
      .expectStatus(201)
      .expectJsonLike({
        message: 'Cadastro realizado com sucesso',
        _id: /^[a-zA-Z0-9]+$/,
      })
      .toss();
    const createdCart = cartResponse.body as CadastroResponseDto;
    assert.ok(createdCart._id, 'carrinhoId deve ser retornado');

    const getResponse = await api.carts
      .getById(createdCart._id)
      .expectStatus(200)
      .expectJsonLike({
        _id: createdCart._id,
        idUsuario: createdUser._id,
        quantidadeTotal: quantityInCart,
        precoTotal: product.preco * quantityInCart,
      })
      .toss();

    const cart = getResponse.body as CartResponseDto;
    assert.strictEqual(cart.idUsuario, createdUser._id);
    assert.strictEqual(cart.quantidadeTotal, quantityInCart);
    assert.strictEqual(cart.precoTotal, product.preco * quantityInCart);
    assert.strictEqual(cart.produtos[0].idProduto, createdProduct._id);
    assert.strictEqual(cart.produtos[0].quantidade, quantityInCart);
  });
});
