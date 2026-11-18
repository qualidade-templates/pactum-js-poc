import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { LoginResponseDto } from '../../src/dto/auth.dto';
import { CadastroResponseDto } from '../../src/dto/common.dto';
import { UserFactory } from '../../src/factories/user.factory';
import { ProductFactory } from '../../src/factories/product.factory';

describe('ServeRest — produtos', () => {
  const api = new ServeRestClient();

  it('cadastra produto autenticado como administrador', async () => {
    const user = UserFactory.createAdmin();

    await api.users.create(user).expectStatus(201).toss();

    const loginResponse = await api.auth
      .login({
        email: user.email,
        password: user.password,
      })
      .expectStatus(200)
      .toss();

    const { authorization } = loginResponse.body as LoginResponseDto;
    const product = ProductFactory.create();

    const response = await api.products
      .create(product, authorization)
      .expectStatus(201)
      .expectJsonLike({
        message: 'Cadastro realizado com sucesso',
        _id: /^[a-zA-Z0-9]+$/,
      })
      .toss();

    const created = response.body as CadastroResponseDto;
    assert.strictEqual(created.message, 'Cadastro realizado com sucesso');
    assert.ok(created._id);
  });
});
