import assert from 'assert';
import { ServeRestClient } from '../../src/clients/serverest.client';
import { LoginResponseDto } from '../../src/dto/auth.dto';
import { UserFactory } from '../../src/factories/user.factory';

describe('ServeRest — login', () => {
  const api = new ServeRestClient();

  it('realiza login e retorna token Bearer', async () => {
    const user = UserFactory.createAdmin();

    await api.users
      .create(user)
      .expectStatus(201)
      .expectJsonLike({
        message: 'Cadastro realizado com sucesso',
        _id: /^[a-zA-Z0-9]+$/,
      })
      .toss();

    const response = await api.auth
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

    const login = response.body as LoginResponseDto;
    assert.strictEqual(login.message, 'Login realizado com sucesso');
    assert.match(login.authorization, /^Bearer\s.+/);
  });
});
