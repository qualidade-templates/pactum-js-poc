import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { UserFactory } from '../../src/factories/user.factory';

describe('ServeRest — login', () => {
  const api = new ServeRestClient();

  it('realiza login e retorna token Bearer', async () => {
    const user = UserFactory.createAdmin();
    await api.users.create(user);

    const login = await api.auth.login({
      email: user.email,
      password: user.password,
    });

    assert.strictEqual(login.message, 'Login realizado com sucesso');
    assert.match(login.authorization, /^Bearer\s.+/);
  });
});
