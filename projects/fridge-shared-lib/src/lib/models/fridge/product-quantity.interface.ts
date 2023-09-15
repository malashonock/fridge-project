import { Product } from '../product/product.interface';

export interface ProductQuantity {
  product?: Product;
  quantity: number;
}
