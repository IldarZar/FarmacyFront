import { Product } from './product/product';

export interface ProductOrder {
  product: Product;
  count: number;
}
