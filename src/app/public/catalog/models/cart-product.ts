// Моделька для товара в корзине.
// Отличие от модели product - наличие поля count
import { Product } from "@app/public/catalog/models/product";

export interface CartProduct {
  product: Product;
  count: number;
}
