import { CreateProductRequestDto } from '../dto/product.dto';

export class ProductFactory {
  static create(overrides: Partial<CreateProductRequestDto> = {}): CreateProductRequestDto {
    const ts = Date.now();
    const suffix = Math.floor(Math.random() * 10_000);

    return {
      nome: `Produto QA ${ts}-${suffix}`,
      preco: 50 + (suffix % 450),
      descricao: `Descricao dinamica gerada em ${ts}`,
      quantidade: 10 + (suffix % 90),
      ...overrides,
    };
  }
}
