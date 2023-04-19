// Моделька для товара в корзине.
// Отличие от модели product - наличие поля count
// Нужна только для страницы cart
import { Product } from './product';

export interface CartProduct {
  product: Product;
  count: number;
}
