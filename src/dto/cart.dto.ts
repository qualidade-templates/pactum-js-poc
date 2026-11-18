export interface CartProductItemDto {
  idProduto: string;
  quantidade: number;
}

export interface CreateCartRequestDto {
  produtos: CartProductItemDto[];
}

export interface CartProductDetailDto extends CartProductItemDto {
  precoUnitario: number;
}

export interface CartResponseDto {
  _id: string;
  idUsuario: string;
  precoTotal: number;
  quantidadeTotal: number;
  produtos: CartProductDetailDto[];
}
