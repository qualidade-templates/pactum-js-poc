export type AdministradorFlag = 'true' | 'false';

export interface CreateUserRequestDto {
  nome: string;
  email: string;
  password: string;
  administrador: AdministradorFlag;
}

export interface UserResponseDto extends CreateUserRequestDto {
  _id: string;
}
