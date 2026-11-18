import { CreateUserRequestDto } from '../dto/user.dto';

export class UserFactory {
  static createAdmin(overrides: Partial<CreateUserRequestDto> = {}): CreateUserRequestDto {
    const ts = Date.now();
    const suffix = Math.floor(Math.random() * 100_000);

    return {
      nome: `Usuario QA ${ts}`,
      email: `usuario.${ts}.${suffix}@qa.com.br`,
      password: `Senha@${suffix}`,
      administrador: 'true',
      ...overrides,
    };
  }
}
