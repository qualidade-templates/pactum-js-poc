import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { UserFactory } from '../../src/factories/user.factory';
import { ProductFactory } from '../../src/factories/product.factory';
import { CartFactory } from '../../src/factories/cart.factory';

describe('ServeRest — carrinhos', () => {
  const api = new ServeRestClient();

  it('cadastra carrinho e busca por id', async () => {
    const user = UserFactory.createAdmin();
    const createdUser = await api.users.create(user);
    const { authorization } = await api.auth.login({
      email: user.email,
      password: user.password,
    });

    const product = ProductFactory.create({ quantidade: 20 });
    const createdProduct = await api.products.create(product, authorization);

    const createdCart = await api.carts.create(
      CartFactory.withProduct(createdProduct._id, 1),
      authorization,
    );

    const cart = await api.carts.getById(createdCart._id);

    assert.strictEqual(cart.idUsuario, createdUser._id);
    assert.strictEqual(cart.produtos[0].idProduto, createdProduct._id);
    assert.strictEqual(cart.quantidadeTotal, 1);
    assert.strictEqual(cart.precoTotal, product.preco);
  });
});
