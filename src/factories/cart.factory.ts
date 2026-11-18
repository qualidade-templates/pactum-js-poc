import { CreateCartRequestDto } from '../dto/cart.dto';

export class CartFactory {
  static withProduct(productId: string, quantity = 1): CreateCartRequestDto {
    return {
      produtos: [
        {
          idProduto: productId,
          quantidade: quantity,
        },
      ],
    };
  }
}
