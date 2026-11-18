import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { CadastroResponseDto } from '../../src/dto/common.dto';
import { UserFactory } from '../../src/factories/user.factory';

describe('ServeRest — usuarios', () => {
  const api = new ServeRestClient();

  it('cadastra usuario administrador com dados dinamicos', async () => {
    const payload = UserFactory.createAdmin();

    const response = await api.users
      .create(payload)
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
