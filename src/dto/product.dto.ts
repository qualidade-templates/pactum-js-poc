export interface CreateProductRequestDto {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

export interface ProductResponseDto extends CreateProductRequestDto {
  _id: string;
}
