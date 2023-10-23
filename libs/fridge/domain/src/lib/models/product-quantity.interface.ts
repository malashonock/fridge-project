import { Product } from 'product-domain';

export interface ProductQuantity {
  product?: Product;
  quantity: number;
}
