import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { UserFactory } from '../../src/factories/user.factory';

describe('ServeRest — usuarios', () => {
  const api = new ServeRestClient();

  it('cadastra usuario administrador com dados dinamicos', async () => {
    const payload = UserFactory.createAdmin();
    const created = await api.users.create(payload);

    assert.strictEqual(created.message, 'Cadastro realizado com sucesso');
    assert.ok(created._id);
  });
});
