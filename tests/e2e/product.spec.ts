import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { UserFactory } from '../../src/factories/user.factory';
import { ProductFactory } from '../../src/factories/product.factory';

describe('ServeRest — produtos', () => {
  const api = new ServeRestClient();

  it('cadastra produto autenticado como administrador', async () => {
    const user = UserFactory.createAdmin();
    await api.users.create(user);
    const { authorization } = await api.auth.login({
      email: user.email,
      password: user.password,
    });

    const product = ProductFactory.create();
    const created = await api.products.create(product, authorization);

    assert.strictEqual(created.message, 'Cadastro realizado com sucesso');
    assert.ok(created._id);
  });
});
