import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { UserFactory } from '../../src/factories/user.factory';
import { ProductFactory } from '../../src/factories/product.factory';
import { CartFactory } from '../../src/factories/cart.factory';

describe('ServeRest — fluxo E2E de compra', () => {
  const api = new ServeRestClient();

  it('cadastra usuario, faz login, cria produto, adiciona ao carrinho e valida', async () => {
    const user = UserFactory.createAdmin();
    const product = ProductFactory.create({ preco: 150, quantidade: 25 });
    const quantityInCart = 1;

    const createdUser = await api.users.create(user);
    assert.ok(createdUser._id, 'userId deve ser retornado');

    const login = await api.auth.login({
      email: user.email,
      password: user.password,
    });
    assert.match(login.authorization, /^Bearer\s.+/);

    const createdProduct = await api.products.create(product, login.authorization);
    assert.ok(createdProduct._id, 'produtoId deve ser retornado');

    const cartPayload = CartFactory.withProduct(createdProduct._id, quantityInCart);
    const createdCart = await api.carts.create(cartPayload, login.authorization);
    assert.ok(createdCart._id, 'carrinhoId deve ser retornado');

    const cart = await api.carts.getById(createdCart._id);

    assert.strictEqual(cart.idUsuario, createdUser._id);
    assert.strictEqual(cart.quantidadeTotal, quantityInCart);
    assert.strictEqual(cart.precoTotal, product.preco * quantityInCart);
    assert.strictEqual(cart.produtos[0].idProduto, createdProduct._id);
    assert.strictEqual(cart.produtos[0].quantidade, quantityInCart);
  });
});
